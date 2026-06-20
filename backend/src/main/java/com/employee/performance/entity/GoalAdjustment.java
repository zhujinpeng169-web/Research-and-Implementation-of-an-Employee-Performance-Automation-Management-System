// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.entity;


// 行注释：导入当前类需要使用的外部类型或工具。
import jakarta.persistence.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;

// 类注释：这是 GoalAdjustment 模块的实体类，用于映射数据库表结构并承载业务数据字段。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：声明这是 JPA 实体类，会映射到数据库表。
@Entity
// 行注释：指定实体类对应的数据库表名。
@Table(name = "goal_adjustment")
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class GoalAdjustment {

    /**
     * 调整记录主键（数据库自增）。
     */
    // 行注释：声明该字段是数据库表主键。
    @Id
    // 行注释：配置主键生成策略，通常对应数据库自增。
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long id;

    /**
     * 被调整的目标 ID（关联 goal 表主键）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "goal_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long goalId;

    /**
     * 调整原因（为什么需要调整目标）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String reason;

    /**
     * 调整前内容快照，便于审批对比。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "old_content", columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String oldContent;

    /**
     * 调整后内容（申请人希望改成什么）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "new_content", columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String newContent;

    /**
     * 审批状态：
     * pending（待审批）/ approved（已批准）/ rejected（已驳回）。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String status;

    /**
     * 申请人用户 ID。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "applicant_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long applicantId;

    /**
     * 审批人用户 ID。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "approver_id")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private Long approverId;

    /**
     * 审批意见（批准或驳回时填写）。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "approval_comment", columnDefinition = "TEXT")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String approvalComment;

    /**
     * 记录创建时间。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "created_at")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime createdAt;

    /**
     * 记录最后更新时间。
     */
    // 行注释：配置字段与数据库列之间的映射关系。
    @Column(name = "updated_at")
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime updatedAt;
// 行注释：结束当前代码块。
}
