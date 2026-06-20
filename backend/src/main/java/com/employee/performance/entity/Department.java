// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.entity;


// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.persistence.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;

// 类注释：这是 Department 模块的实体类，用于映射数据库表结构并承载业务数据字段。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：声明这是 JPA 实体类，会映射到数据库表。
@Entity
// 行注释：指定实体类对应的数据库表名。
@Table(name = "department")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class Department {

    /**
     * 部门主键。
     *
     * <p>@GeneratedValue(strategy = IDENTITY) 表示主键由数据库自增生成，
     * 与 MySQL 的 AUTO_INCREMENT 对应。</p>
     */
    // 行注释：声明该字段是数据库表主键。
    @Id
    // 行注释：配置主键生成策略，通常对应数据库自增。
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long id;

    /**
     * 部门名称（例如：研发部、市场部）。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String name;

    /**
     * 上级部门 ID，用于构建组织树。
     * 根节点部门通常为 null。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "parent_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long parentId;

    /**
     * 组织层级（1=一级部门，2=二级部门...）。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Integer level;

    /**
     * 部门职能描述，使用 TEXT 便于存储较长说明。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "function_desc", columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String functionDesc;

    /**
     * 记录创建时间。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "created_at")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime createdAt;

    /**
     * 记录最后修改时间。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "updated_at")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime updatedAt;
// 行注释：结束当前代码块。
}
