// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.util;


// 行注释：导入当前类需要使用的外部类型或工具。
import io.jsonwebtoken.Claims;
// 行注释：导入当前类需要使用的外部类型或工具。
import io.jsonwebtoken.Jwts;
// 行注释：导入当前类需要使用的外部类型或工具。
import io.jsonwebtoken.SignatureAlgorithm;
// 行注释：导入当前类需要使用的外部类型或工具。
import io.jsonwebtoken.security.Keys;
// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.annotation.PostConstruct;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Value;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Component;

// 行注释：导入当前类需要使用的外部类型或工具。
import javax.crypto.SecretKey;
// 行注释：导入当前类需要使用的外部类型或工具。
import java.nio.charset.StandardCharsets;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.Date;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.HashMap;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.Map;

// 类注释：这是 JwtUtil 模块的工具类，用于封装通用算法、格式处理或基础能力方法。
// 行注释：使用 @Component 注解声明框架行为或元数据。
@Component
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class JwtUtil {

    /**
     * JWT 签名密钥。
     *
     * 使用配置文件中的 jwt.secret，保证服务重启后 token 仍可验证。
     */
    // 行注释：使用 @Value 注解声明框架行为或元数据。
    @Value("${jwt.secret}")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String secret;

    /**
     * token 过期时间：24 小时（毫秒）。
     */
    // 行注释：使用 @Value 注解声明框架行为或元数据。
    @Value("${jwt.expiration:86400000}")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private long expirationTime;

    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private SecretKey secretKey;

    // 行注释：使用 @PostConstruct 注解声明框架行为或元数据。
    @PostConstruct
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：工具类中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public void init() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    // 行注释：结束当前代码块。
    }

    /**
     * 生成 JWT。
     *
     * 用法：登录成功后调用，把身份信息返回给前端。
     * 写入内容：
     * - subject：username（标准字段）
     * - claims：userId、role（自定义字段）
     * - issuedAt：签发时间
     * - expiration：过期时间
     *
     * @param username 用户名（通常作为 token 主体）
     * @param userId 用户主键 ID
     * @param role 角色（如 ADMIN/USER）
     * @return 生成后的 JWT 字符串
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类处理登录鉴权相关逻辑，用于判断用户身份并维护访问安全。
    public String generateToken(String username, Long userId, String role) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Map<String, Object> claims = new HashMap<>();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        claims.put("userId", userId);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        claims.put("role", role);

        // 行注释：返回当前方法的处理结果。
        return Jwts.builder()
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                .setClaims(claims)
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                .setSubject(username)
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                .setIssuedAt(new Date())
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                // 行注释：当前行参与完成该模块的业务逻辑。
                .signWith(secretKey, SignatureAlgorithm.HS256)
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                .compact();
    // 行注释：结束当前代码块。
    }

    /**
     * 从 token 提取用户名。
     *
     * 用法：鉴权流程中识别“当前是谁”。
     *
     * @param token JWT 字符串
     * @return 用户名
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public String extractUsername(String token) {
        // 行注释：返回当前方法的处理结果。
        return extractClaims(token).getSubject();
    // 行注释：结束当前代码块。
    }

    /**
     * 从 token 提取 userId。
     *
     * 用法：后端需要按用户 ID 做数据过滤或审计时。
     *
     * @param token JWT 字符串
     * @return 用户 ID
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public Long extractUserId(String token) {
        // 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
        return extractClaims(token).get("userId", Long.class);
    // 行注释：结束当前代码块。
    }

    /**
     * 从 token 提取角色。
     *
     * 用法：权限判断（例如仅 ADMIN 可访问某些接口）。
     *
     * @param token JWT 字符串
     * @return 角色字符串
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public String extractRole(String token) {
        // 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
        return extractClaims(token).get("role", String.class);
    // 行注释：结束当前代码块。
    }

    /**
     * 校验 token 是否有效。
     *
     * 校验条件：
     * 1) token 中用户名是否与期望用户名一致；
     * 2) token 是否未过期。
     *
     * @param token JWT 字符串
     * @param username 期望用户名
     * @return true=有效；false=无效
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类处理登录鉴权相关逻辑，用于判断用户身份并维护访问安全。
    public boolean validateToken(String token, String username) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        final String tokenUsername = extractUsername(token);
        // 行注释：返回当前方法的处理结果。
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    // 行注释：结束当前代码块。
    }

    /**
     * 判断 token 是否过期。
     *
     * @param token JWT 字符串
     * @return true=已过期；false=未过期
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类处理登录鉴权相关逻辑，用于判断用户身份并维护访问安全。
    private boolean isTokenExpired(String token) {
        // 行注释：返回当前方法的处理结果。
        return extractClaims(token).getExpiration().before(new Date());
    // 行注释：结束当前代码块。
    }

    /**
     * 统一解析 token 并提取 Claims。
     *
     * 作用：
     * - 校验签名是否正确；
     * - 校验 token 格式是否正确；
     * - 解析出 payload 中的字段。
     *
     * 如果 token 非法（篡改、格式错误、过期等），这里会抛异常，由上层捕获处理。
     *
     * @param token JWT 字符串
     * @return Claims 载荷对象
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：工具类中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    private Claims extractClaims(String token) {
        // 行注释：返回当前方法的处理结果。
        return Jwts.parserBuilder()
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                .setSigningKey(secretKey)
                // 行注释：当前行参与完成该模块的业务逻辑。
                .build()
                // 行注释：当前行参与完成该模块的业务逻辑。
                .parseClaimsJws(token)
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                .getBody();
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

