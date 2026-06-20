// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.controller;


// 行注释：导入当前类需要使用的外部类型或工具。
import com.employee.performance.dto.LoginRequest;
// 行注释：导入当前类需要使用的外部类型或工具。
import com.employee.performance.dto.LoginResponse;
// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.User;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.OperationLogService;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.UserService;
// 行注释：导入当前类需要使用的外部类型或工具。
import com.employee.performance.util.JwtUtil;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.servlet.http.HttpServletRequest;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.ResponseEntity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.*;

// 类注释：这是 AuthController 模块的控制器类，用于接收前端请求并调用服务层返回接口结果。
// 行注释：声明这是 REST 接口控制器，返回 JSON 数据给前端。
@RestController
// 行注释：配置当前控制器或方法对应的访问路径。
@RequestMapping("/api/auth")
// 行注释：允许跨域访问，便于前端调用后端接口。
@CrossOrigin(origins = "*")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class AuthController {

    /**
     * 用户业务服务：负责用户查询、注册、密码校验。
     * 来源：Service 层（UserService）。
     */
    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private UserService userService;

    /**
     * JWT 工具：负责 token 的生成、解析、有效性校验。
     * 来源：工具层（JwtUtil）。
     */
    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private JwtUtil jwtUtil;

    /**
     * 操作日志服务：记录登录成功/失败、注册等关键操作。
     * 来源：Service 层（OperationLogService）。
     */
    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private OperationLogService operationLogService;

    /**
     * 用户登录接口。
     *
     * URL：POST /api/auth/login
     * 请求体示例：{"username":"admin","password":"admin"}
     *
     * 方法作用：
     * 1) 校验前端是否传入用户名和密码；
     * 2) 调用 userService.authenticate 进行账号密码验证；
     * 3) 校验用户是否启用；
     * 4) 登录成功后签发 JWT；
     * 5) 记录操作日志；
     * 6) 返回 token 和用户信息。
     *
     * 对前端意义：
     * 前端拿到 token 后保存到 localStorage，后续请求通过 Authorization: Bearer <token> 访问受保护接口。
     *
     * @param request 登录请求体（包含 username/password）
     * @param httpRequest 原始 HTTP 请求（用于提取 IP 和 User-Agent 写日志）
     * @return 登录成功返回 200 + token/userInfo；失败返回 400 或 401
     */
    // 行注释：声明 POST 新增接口，通常用于创建数据。
    @PostMapping("/login")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层处理登录鉴权相关逻辑，用于判断用户身份并维护访问安全。
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (request.getUsername() == null || request.getPassword() == null) {
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.badRequest().body(new LoginResponse("\u7528\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a"));
        // 行注释：结束当前代码块。
        }

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        boolean authenticated = userService.authenticate(request.getUsername(), request.getPassword());
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (!authenticated) {
            // 行注释：当前行参与完成该模块的业务逻辑。
            operationLogService.log(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    null,
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    request.getUsername(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "login_failed",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "auth",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "\u767b\u5f55\u5931\u8d25\uff1a\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    getClientIP(httpRequest),
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    httpRequest.getHeader("User-Agent")
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            );
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.status(401).body(new LoginResponse("\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef"));
        // 行注释：结束当前代码块。
        }

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        User user = userService.findByUsername(request.getUsername());
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (user == null || !user.getEnabled()) {
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.status(401).body(new LoginResponse("\u8d26\u53f7\u5df2\u88ab\u7981\u7528"));
        // 行注释：结束当前代码块。
        }

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        String normalizedRole = userService.normalizeRole(user.getRole());

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        String token = jwtUtil.generateToken(user.getUsername(), user.getId(), normalizedRole);

        // 行注释：当前行参与完成该模块的业务逻辑。
        operationLogService.log(
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                user.getId(),
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                user.getUsername(),
                // 行注释：当前行参与完成该模块的业务逻辑。
                "login",
                // 行注释：当前行参与完成该模块的业务逻辑。
                "auth",
                // 行注释：当前行参与完成该模块的业务逻辑。
                "\u7528\u6237\u767b\u5f55\u6210\u529f",
                // 行注释：当前行参与完成该模块的业务逻辑。
                getClientIP(httpRequest),
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                httpRequest.getHeader("User-Agent")
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        );

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        LoginResponse response = new LoginResponse();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setToken(token);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setUserId(user.getId());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setUsername(user.getUsername());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setRealName(user.getRealName());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setRole(normalizedRole);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        response.setMessage("\u767b\u5f55\u6210\u529f");

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(response);
    // 行注释：结束当前代码块。
    }

    /**
     * token 校验接口（前端刷新页面/进入系统时常调用）。
     *
     * URL：GET /api/auth/validate
     * 请求头：Authorization: Bearer <token>
     *
     * 方法作用：
     * 1) 从请求头取出 token；
     * 2) 解析出用户名、用户ID、角色；
     * 3) 校验 token 签名与过期时间；
     * 4) 校验该用户是否仍启用；
     * 5) 返回用户信息（有效）或 401（无效）。
     *
     * 设计意义：
     * 避免“前端本地 token 还在，但后端用户已禁用”的安全漏洞。
     *
     * @param authHeader Authorization 请求头
     * @return token 有效返回 200 + 用户信息；无效返回 401
     */
    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/validate")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    public ResponseEntity<LoginResponse> validateToken(@RequestHeader("Authorization") String authHeader) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.status(401).body(new LoginResponse("Token无效"));
        // 行注释：结束当前代码块。
        }

        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            String token = authHeader.replace("Bearer ", "");
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            String username = jwtUtil.extractUsername(token);
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            Long userId = jwtUtil.extractUserId(token);

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (jwtUtil.validateToken(token, username)) {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                User user = userService.findByUsername(username);

                // 行注释：进行条件判断，根据业务状态决定后续处理分支。
                if (user != null && user.getEnabled()) {
                    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                    LoginResponse response = new LoginResponse();
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setUserId(userId);
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setUsername(username);
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setRealName(user.getRealName());
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setRole(userService.normalizeRole(user.getRole()));
                    // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                    response.setMessage("Token\u6709\u6548");
                    // 行注释：返回 HTTP 响应对象给前端。
                    return ResponseEntity.ok(response);
                // 行注释：结束当前代码块。
                }
            // 行注释：结束当前代码块。
            }
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.status(401).body(new LoginResponse("Token\u65e0\u6548"));
        // 行注释：结束当前代码块。
        }
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.status(401).body(new LoginResponse("Token\u65e0\u6548"));
    // 行注释：结束当前代码块。
    }

    /**
     * 退出登录接口（JWT 无状态场景下主要用于记录审计日志）。
     *
     * URL：POST /api/auth/logout
     * 请求头：Authorization: Bearer <token>（可选）
     */
    // 行注释：声明 POST 新增接口，通常用于创建数据。
    @PostMapping("/logout")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    public ResponseEntity<LoginResponse> logout(
            // 行注释：使用 @RequestHeader 注解声明框架行为或元数据。
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            // 行注释：当前行参与完成该模块的业务逻辑。
            HttpServletRequest httpRequest
    // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
    ) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Long userId = null;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        String username = "anonymous";

        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
            try {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                String token = authHeader.replace("Bearer ", "");
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                username = jwtUtil.extractUsername(token);
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                userId = jwtUtil.extractUserId(token);
            // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
            } catch (Exception ignored) {
            // 行注释：结束当前代码块。
            }
        // 行注释：结束当前代码块。
        }

        // 行注释：当前行参与完成该模块的业务逻辑。
        operationLogService.log(
                // 行注释：当前行参与完成该模块的业务逻辑。
                userId,
                // 行注释：当前行参与完成该模块的业务逻辑。
                username,
                // 行注释：当前行参与完成该模块的业务逻辑。
                "logout",
                // 行注释：当前行参与完成该模块的业务逻辑。
                "auth",
                // 行注释：当前行参与完成该模块的业务逻辑。
                "\u7528\u6237\u9000\u51fa\u767b\u5f55",
                // 行注释：当前行参与完成该模块的业务逻辑。
                getClientIP(httpRequest),
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                httpRequest.getHeader("User-Agent")
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        );

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(new LoginResponse("\u9000\u51fa\u6210\u529f"));
    // 行注释：结束当前代码块。
    }

    /**
     * 用户注册接口。
     *
     * URL：POST /api/auth/register
     * 请求体：User 对象（至少包含 username、password）
     *
     * 方法作用：
     * 1) 调用 userService.register 做用户名唯一性检查；
     * 2) 对密码进行 BCrypt 加密后入库；
     * 3) 记录注册日志；
     * 4) 返回注册结果。
     *
     * @param user 注册用户数据
     * @param httpRequest 原始 HTTP 请求（用于日志）
     * @return 注册成功返回 200，失败返回 400 + 错误信息
     */
    // 行注释：声明 POST 新增接口，通常用于创建数据。
    @PostMapping("/register")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public ResponseEntity<LoginResponse> register(@RequestBody User user, HttpServletRequest httpRequest) {
        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            User newUser = userService.register(user);

            // 行注释：当前行参与完成该模块的业务逻辑。
            operationLogService.log(
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    newUser.getId(),
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    newUser.getUsername(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "register",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "auth",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "\u7528\u6237\u6ce8\u518c\u6210\u529f",
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    getClientIP(httpRequest),
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    httpRequest.getHeader("User-Agent")
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            );

            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.ok(new LoginResponse("\u6ce8\u518c\u6210\u529f"));
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：返回 HTTP 响应对象给前端。
            return ResponseEntity.badRequest().body(new LoginResponse(e.getMessage()));
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 提取客户端 IP 的工具方法（控制器内部私有）。
     *
     * 使用场景：登录/注册日志记录时，保存请求来源地址。
     * 提取优先级：
     * 1) X-Forwarded-For（有反向代理时通常由代理传递真实 IP）
     * 2) X-Real-IP
     * 3) request.getRemoteAddr()（兜底）
     *
     * @param request 原始 HTTP 请求
     * @return 客户端 IP 字符串
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    private String getClientIP(HttpServletRequest request) {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        String ip = request.getHeader("X-Forwarded-For");
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            ip = request.getHeader("X-Real-IP");
        // 行注释：结束当前代码块。
        }
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            ip = request.getRemoteAddr();
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return ip;
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


