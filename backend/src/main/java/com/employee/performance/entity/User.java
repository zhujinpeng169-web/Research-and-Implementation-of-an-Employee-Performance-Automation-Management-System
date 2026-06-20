// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.entity;


// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.persistence.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;

// 类注释：这是 User 模块的实体类，用于映射数据库表结构并承载业务数据字段。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：声明这是 JPA 实体类，会映射到数据库表。
@Entity
// 行注释：指定实体类对应的数据库表名。
@Table(name = "users")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class User {

    /**
     * 用户主键（数据库自增）。
     *
     * <p>@GeneratedValue(strategy = IDENTITY) 表示主键由数据库自动分配。</p>
     */
    // 行注释：声明该字段是数据库表主键。
    @Id
    // 行注释：配置主键生成策略，通常对应数据库自增。
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long id;

    /**
     * 登录用户名（唯一且非空）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(unique = true, nullable = false)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String username;

    /**
     * 登录密码（存储 BCrypt 加密后的密文）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(nullable = false)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String password;

    /**
     * 用户真实姓名。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String realName;

    /**
     * 用户邮箱。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String email;

    /**
     * 用户手机号。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String phone;

    /**
     * 用户角色（ADMIN/MANAGER/EMPLOYEE）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(nullable = false)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String role = "EMPLOYEE";

    /**
     * 账号启用状态（true=启用，false=禁用）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(nullable = false)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Boolean enabled = true;

    /**
     * 账号创建时间。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime createdAt;

    /**
     * 账号更新时间。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime updatedAt;

    /**
     * 首次入库前自动写入创建时间和更新时间。
     */
    // 行注释：使用 @PrePersist 注解声明框架行为或元数据。
    @PrePersist
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：实体模型中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    protected void onCreate() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        createdAt = LocalDateTime.now();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        updatedAt = LocalDateTime.now();
    // 行注释：结束当前代码块。
    }

    /**
     * 更新前自动刷新更新时间。
     */
    // 行注释：使用 @PreUpdate 注解声明框架行为或元数据。
    @PreUpdate
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：实体模型中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    protected void onUpdate() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        updatedAt = LocalDateTime.now();
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}
