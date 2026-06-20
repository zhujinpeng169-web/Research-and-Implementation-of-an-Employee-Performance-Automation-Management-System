// 定义包路径
// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.User;

// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.UserRepository;


// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;


// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;


// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;



// 类注释：这是 UserService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class UserService {

    /**
     * 用户数据访问接口
     *
     * Repository 是 DAO 层
     *
     * 负责：
     * 查询数据库
     * 保存数据
     * 删除数据
     */
    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private UserRepository userRepository;



    /**
     * BCrypt 密码加密器
     *
     * 用于：
     * 加密密码
     * 验证密码
     *
     * BCrypt 的特点：
     * 每次加密结果都不同
     * 因为会自动加入随机盐值
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



    /**
     * 查询所有用户
     *
     * 例如：
     * 用户管理页面加载列表
     *
     * 数据库执行：
     *
     * SELECT * FROM users
     */
    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<User> findAll() {

        // 行注释：返回当前方法的处理结果。
        return userRepository.findAll();
    // 行注释：结束当前代码块。
    }



    /**
     * 根据 ID 查询用户
     *
     * 例如：
     * 查看某个用户详情
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public User findById(Long id) {

        // 行注释：返回当前方法的处理结果。
        return userRepository.findById(id)

                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                .orElseThrow(() -> new RuntimeException("User not found"));
    // 行注释：结束当前代码块。
    }



    /**
     * 根据用户名查询用户
     *
     * 登录时会使用
     *
     * SQL 类似：
     *
     * SELECT * FROM users WHERE username=?
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public User findByUsername(String username) {

        // 行注释：返回当前方法的处理结果。
        return userRepository.findByUsername(username)

                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                .orElse(null);
    // 行注释：结束当前代码块。
    }



    /**
     * 注册用户
     *
     * 业务规则：
     *
     * 1 用户名必须唯一
     * 2 密码必须加密
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public User register(User user) {

        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (userRepository.existsByUsername(user.getUsername())) {

            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            throw new RuntimeException("Username already exists");
        // 行注释：结束当前代码块。
        }

        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setRole(normalizeRole(user.getRole()));

        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 行注释：返回当前方法的处理结果。
        return userRepository.save(user);
    // 行注释：结束当前代码块。
    }



    /**
     * 保存用户
     *
     * 可以用于：
     *
     * 新增用户
     * 更新用户
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public User save(User user) {

        // 行注释：返回当前方法的处理结果。
        return userRepository.save(user);
    // 行注释：结束当前代码块。
    }



    /**
     * 根据 ID 删除用户
     *
     * SQL：
     *
     * DELETE FROM users WHERE id=?
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层删除数据时使用，通常由页面删除按钮触发。
    public void deleteById(Long id) {

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        userRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }



    /**
     * 用户登录认证
     *
     * 登录流程：
     *
     * 1 查询用户
     * 2 判断是否启用
     * 3 比对密码
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层处理登录鉴权相关逻辑，用于判断用户身份并维护访问安全。
    public boolean authenticate(String username, String password) {

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        User user = findByUsername(username);

        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (user == null || !user.getEnabled()) {
            // 行注释：返回当前方法的处理结果。
            return false;
        // 行注释：结束当前代码块。
        }

        // 行注释：返回当前方法的处理结果。
        return passwordEncoder.matches(password, user.getPassword());
    // 行注释：结束当前代码块。
    }

    /**
     * 角色标准化：
     * - USER 统一映射到 EMPLOYEE（兼容历史数据）
     * - 空值默认 EMPLOYEE
     */
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层统一转换数据格式，避免前后端角色或状态值不一致。
    public String normalizeRole(String role) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (role == null || role.trim().isEmpty()) {
            // 行注释：返回当前方法的处理结果。
            return "EMPLOYEE";
        // 行注释：结束当前代码块。
        }

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        String normalized = role.trim().toUpperCase();
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if ("USER".equals(normalized)) {
            // 行注释：返回当前方法的处理结果。
            return "EMPLOYEE";
        // 行注释：结束当前代码块。
        }

        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if ("ADMIN".equals(normalized) || "MANAGER".equals(normalized) || "EMPLOYEE".equals(normalized)) {
            // 行注释：返回当前方法的处理结果。
            return normalized;
        // 行注释：结束当前代码块。
        }

        // 行注释：返回当前方法的处理结果。
        return "EMPLOYEE";
    // 行注释：结束当前代码块。
    }



    /**
     * 初始化默认管理员
     *
     * 系统启动时执行
     *
     * 如果 admin 不存在
     * 就自动创建
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public void initDefaultAdmin() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        createDefaultUser("admin", "admin", "系统管理员", "ADMIN");
    // 行注释：结束当前代码块。
    }

    /**
     * 初始化三种默认身份账号（管理员 / 主管 / 员工）
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public void initDefaultUsers() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        createDefaultUser("admin", "admin", "系统管理员", "ADMIN");
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        createDefaultUser("manager", "manager", "部门主管", "MANAGER");
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        createDefaultUser("employee", "employee", "普通员工", "EMPLOYEE");
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    private void createDefaultUser(String username, String rawPassword, String realName, String role) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        System.out.println("Checking if default user exists: " + username);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        boolean exists = userRepository.existsByUsername(username);
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (exists) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            User existing = userRepository.findByUsername(username).orElse(null);
            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (existing != null) {
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                existing.setRealName(realName);
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                existing.setRole(normalizeRole(role));
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                existing.setEnabled(true);
                // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
                existing.setPassword(passwordEncoder.encode(rawPassword));
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                userRepository.save(existing);
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                System.out.println("Default user synced: " + username + " (" + existing.getRole() + ")");
            // 行注释：结束当前代码块。
            }
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            return;
        // 行注释：结束当前代码块。
        }

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        User user = new User();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setUsername(username);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setPassword(passwordEncoder.encode(rawPassword));
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setRealName(realName);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setRole(normalizeRole(role));
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        user.setEnabled(true);

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        User savedUser = userRepository.save(user);
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        System.out.println("Default user saved: " + savedUser.getUsername() + " (" + savedUser.getRole() + ")");
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


