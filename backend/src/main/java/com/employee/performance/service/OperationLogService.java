// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.OperationLog;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.OperationLogRepository;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;

// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
// 类注释：这是 OperationLogService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
public class OperationLogService {

    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private OperationLogRepository operationLogRepository;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<OperationLog> findAll() {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public OperationLog findById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findById(id)
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                .orElseThrow(() -> new RuntimeException("Operation log not found"));
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public List<OperationLog> findByModule(String module) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findByModule(module);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<OperationLog> findByOperation(String operation) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findByOperation(operation);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public List<OperationLog> findByUserId(Long userId) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findByUserId(userId);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<OperationLog> findByModuleAndOperation(String module, String operation) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.findByModuleAndOperation(module, operation);
    // 行注释：结束当前代码块。
    }

    /**
     * 记录操作日志
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    public OperationLog log(Long userId, String username, String operation,
                           // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
                           String module, String content, String ip, String userAgent) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        OperationLog log = new OperationLog();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setUserId(userId);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setUsername(username);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setOperation(operation);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setModule(module);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setContent(content);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setIp(ip);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        log.setUserAgent(userAgent);
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.save(log);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public OperationLog save(OperationLog log) {
        // 行注释：返回当前方法的处理结果。
        return operationLogRepository.save(log);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    public void deleteById(Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        operationLogRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

