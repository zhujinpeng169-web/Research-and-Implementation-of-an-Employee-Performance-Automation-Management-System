// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.config;

// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.http.HttpServletResponse;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.context.annotation.Bean;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.context.annotation.Configuration;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.HttpMethod;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.config.http.SessionCreationPolicy;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.crypto.password.PasswordEncoder;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.web.SecurityFilterChain;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// 类注释：这是 SecurityConfig 模块的配置类，用于声明系统安全、初始化或框架相关配置。
// 行注释：声明这是配置类，用于集中配置系统行为。
@Configuration
// 行注释：开启 Spring Security Web 安全配置。
@EnableWebSecurity
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class SecurityConfig {

    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    // 行注释：把方法返回对象注册为 Spring 容器中的 Bean。
    @Bean
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：配置层中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 行注释：当前行参与完成该模块的业务逻辑。
        http
                // 行注释：当前行参与完成该模块的业务逻辑。
                .csrf(csrf -> csrf.disable())
                // 行注释：当前行参与完成该模块的业务逻辑。
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 行注释：当前行参与完成该模块的业务逻辑。
                .authorizeHttpRequests(auth -> auth
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        .requestMatchers("/api/auth/**").permitAll()
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        .requestMatchers("/error").permitAll()
                        // 行注释：当前行参与完成该模块的业务逻辑。
                        .anyRequest().authenticated()
                // 行注释：当前行参与完成该模块的业务逻辑。
                )
                // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
                .exceptionHandling(exception -> exception.authenticationEntryPoint((request, response, authException) -> {
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setContentType("application/json;charset=UTF-8");
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    response.getWriter().write("{\"message\":\"Unauthorized\"}");
                // 行注释：当前行参与完成该模块的业务逻辑。
                }))
                // 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 行注释：返回当前方法的处理结果。
        return http.build();
    // 行注释：结束当前代码块。
    }

    // 行注释：把方法返回对象注册为 Spring 容器中的 Bean。
    @Bean
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：配置层处理密码相关配置或校验，用于保障账号安全。
    public PasswordEncoder passwordEncoder() {
        // 行注释：返回当前方法的处理结果。
        return new BCryptPasswordEncoder();
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

