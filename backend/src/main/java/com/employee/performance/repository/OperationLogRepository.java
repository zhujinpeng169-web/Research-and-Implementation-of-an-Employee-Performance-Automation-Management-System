// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.repository;

// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.OperationLog;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.data.jpa.repository.JpaRepository;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Repository;

// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 OperationLogRepository 模块的数据访问接口，Spring Data JPA 会根据接口与方法命名规则自动提供增删改查能力。
// 行注释：声明这是数据访问层组件，由 Spring 容器管理。
@Repository
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public interface OperationLogRepository extends JpaRepository<OperationLog, Long> {
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    // 方法用法：数据访问层按 Module 条件查询数据，Spring Data JPA 会根据方法名自动生成 SQL。
    List<OperationLog> findByModule(String module);
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    List<OperationLog> findByOperation(String operation);
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    List<OperationLog> findByUserId(Long userId);
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    List<OperationLog> findByModuleAndOperation(String module, String operation);
// 行注释：结束当前代码块。
}

