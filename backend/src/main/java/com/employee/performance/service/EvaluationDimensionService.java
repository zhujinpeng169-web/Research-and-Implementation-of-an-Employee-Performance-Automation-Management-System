// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;

// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.EvaluationDimension;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.EvaluationDimensionRepository;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.beans.factory.annotation.Autowired;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;

// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 EvaluationDimensionService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class EvaluationDimensionService {

    // 行注释：让 Spring 自动注入需要使用的组件对象。
    @Autowired
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private EvaluationDimensionRepository evaluationDimensionRepository;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<EvaluationDimension> findAll() {
        // 行注释：返回当前方法的处理结果。
        return evaluationDimensionRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public EvaluationDimension findById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return evaluationDimensionRepository.findById(id)
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                .orElseThrow(() -> new RuntimeException("Evaluation dimension not found"));
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public List<EvaluationDimension> findByPositionType(String positionType) {
        // 行注释：返回当前方法的处理结果。
        return evaluationDimensionRepository.findByPositionType(positionType);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<EvaluationDimension> findByEnabled(Boolean enabled) {
        // 行注释：返回当前方法的处理结果。
        return evaluationDimensionRepository.findByEnabled(enabled);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public EvaluationDimension save(EvaluationDimension dimension) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (dimension.getWeight() < 0.0 || dimension.getWeight() > 1.0) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            throw new RuntimeException("Weight must be between 0.0 and 1.0");
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return evaluationDimensionRepository.save(dimension);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层删除数据时使用，通常由页面删除按钮触发。
    public void deleteById(Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        evaluationDimensionRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


