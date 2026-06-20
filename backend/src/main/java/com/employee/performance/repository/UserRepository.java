// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.repository;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.User;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.data.jpa.repository.JpaRepository;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Repository;

// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.Optional;

// 行注释：声明这是数据访问层组件，由 Spring 容器管理。
@Repository
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
// 类注释：这是 UserRepository 模块的数据访问接口，Spring Data JPA 会根据接口与方法命名规则自动提供增删改查能力。
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 用法：登录、鉴权、注册校验时按用户名查用户。
     * 作用：通过方法名让 Spring Data JPA 自动生成查询语句。
     * 返回：Optional<User>（存在则有值，不存在为空）。
     */
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    // 方法用法：数据访问层按 Username 条件查询数据，Spring Data JPA 会根据方法名自动生成 SQL。
    Optional<User> findByUsername(String username);

    /**
     * 用法：注册前做用户名唯一性检查。
     * 作用：只判断是否存在，不加载完整用户对象，效率更高。
     * 返回：true 已存在，false 不存在。
     */
    // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
    // 方法用法：数据访问层判断 Username 是否已存在，常用于注册或唯一性校验。
    boolean existsByUsername(String username);
// 行注释：结束当前代码块。
}

