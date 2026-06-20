// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.entity;


// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.persistence.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 类注释：这是 SystemConfig 模块的实体类，用于映射数据库表结构并承载业务数据字段。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：声明这是 JPA 实体类，会映射到数据库表。
@Entity
// 行注释：指定实体类对应的数据库表名。
@Table(name = "system_config")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class SystemConfig {

    /**
     * 配置主键（数据库自增）。
     */
    // 行注释：声明该字段是数据库表主键。
    @Id
    // 行注释：配置主键生成策略，通常对应数据库自增。
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long id;

    /**
     * 配置键（业务唯一）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "config_key", unique = true)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String configKey;

    /**
     * 配置值。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "config_value")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String configValue;

    /**
     * 配置说明（TEXT）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String description;
// 行注释：结束当前代码块。
}
