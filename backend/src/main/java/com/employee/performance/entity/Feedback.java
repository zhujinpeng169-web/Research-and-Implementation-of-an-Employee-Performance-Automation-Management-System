// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.entity;


// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.persistence.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDate;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;

// 类注释：这是 Feedback 模块的实体类，用于映射数据库表结构并承载业务数据字段。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：声明这是 JPA 实体类，会映射到数据库表。
@Entity
// 行注释：指定实体类对应的数据库表名。
@Table(name = "feedback")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class Feedback {

    /**
     * 反馈主键（数据库自增）。
     */
    // 行注释：声明该字段是数据库表主键。
    @Id
    // 行注释：配置主键生成策略，通常对应数据库自增。
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long id;

    /**
     * 关联的评估记录 ID（evaluation.id）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "evaluation_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long evaluationId;

    /**
     * 被反馈员工 ID。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "employee_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long employeeId;

    /**
     * 反馈发起人（通常是主管）ID。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "supervisor_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long supervisorId;

    /**
     * 反馈正文（文本内容较长，使用 TEXT）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String content;

    /**
     * 反馈日期（业务日期，不含时分秒）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "feedback_date")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDate feedbackDate;

    /**
     * 员工确认状态：
     * 0 = 未确认，1 = 已确认。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Integer confirmed;

    /**
     * 数据创建时间。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "created_at")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime createdAt;
// 行注释：结束当前代码块。
}
