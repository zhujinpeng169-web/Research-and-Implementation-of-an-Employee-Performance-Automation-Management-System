// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.config;

// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.User;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.UserService;
// 行注释：导入当前类需要使用的外部类型或工具。
import com.employee.performance.util.JwtUtil;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.FilterChain;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.ServletException;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.http.HttpServletRequest;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.http.HttpServletResponse;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.core.authority.SimpleGrantedAuthority;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.core.context.SecurityContextHolder;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Component;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.filter.OncePerRequestFilter;

// 行注释：导入当前类需要使用的外部类型或工具。
import java.io.IOException;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.Collections;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 JwtAuthenticationFilter 模块的配置类，用于声明系统安全、初始化或框架相关配置。
// 行注释：使用 @Component 注解声明框架行为或元数据。
@Component
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private JwtUtil jwtUtil;

    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private UserService userService;

    // 行注释：使用 @Override 注解声明框架行为或元数据。
    @Override
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    protected void doFilterInternal(HttpServletRequest request,
                                    // 行注释：当前行参与完成该模块的业务逻辑。
                                    HttpServletResponse response,
                                    // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
                                    FilterChain filterChain) throws ServletException, IOException {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        String authHeader = request.getHeader("Authorization");

        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            String token = authHeader.substring(7).trim();

            // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
            try {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                String username = jwtUtil.extractUsername(token);

                // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                    User user = userService.findByUsername(username);

                    // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                    if (user != null && Boolean.TRUE.equals(user.getEnabled()) && jwtUtil.validateToken(token, username)) {
                        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                        String normalizedRole = userService.normalizeRole(user.getRole());
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        List<SimpleGrantedAuthority> authorities = normalizedRole == null
                                // 行注释：当前行参与完成该模块的业务逻辑。
                                ? Collections.emptyList()
                                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                                : List.of(new SimpleGrantedAuthority("ROLE_" + normalizedRole));

                        // 行注释：当前行参与完成该模块的业务逻辑。
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                // 行注释：当前行参与完成该模块的业务逻辑。
                                username,
                                // 行注释：当前行参与完成该模块的业务逻辑。
                                null,
                                // 行注释：当前行参与完成该模块的业务逻辑。
                                authorities
                        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                        );
                        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    // 行注释：结束当前代码块。
                    }
                // 行注释：结束当前代码块。
                }
            // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
            } catch (Exception ex) {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                SecurityContextHolder.clearContext();
            // 行注释：结束当前代码块。
            }
        // 行注释：结束当前代码块。
        }

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        filterChain.doFilter(request, response);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

