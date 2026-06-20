// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.Goal;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.GoalRepository;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDate;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.temporal.ChronoUnit;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
// 类注释：这是 GoalService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
public class GoalService {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final GoalRepository goalRepository;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final AlertService alertService;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<Goal> getAllGoals() {
        // 行注释：返回当前方法的处理结果。
        return goalRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public Goal getGoalById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return goalRepository.findById(id).orElse(null);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public Goal createGoal(Goal goal) {
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        goal.setCreatedAt(LocalDateTime.now());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        goal.setUpdatedAt(LocalDateTime.now());
        // 行注释：返回当前方法的处理结果。
        return goalRepository.save(goal);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层修改业务状态或内容时使用，负责校验已有数据并保存更新结果。
    public Goal updateGoal(Long id, Goal goal) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Goal existing = getGoalById(id);
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (existing != null) {
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setTitle(goal.getTitle());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setDescription(goal.getDescription());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setType(goal.getType());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setStartDate(goal.getStartDate());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setEndDate(goal.getEndDate());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setStatus(goal.getStatus());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setProgress(goal.getProgress());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setUpdatedAt(LocalDateTime.now());
            // 行注释：返回当前方法的处理结果。
            return goalRepository.save(existing);
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return null;
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层删除数据时使用，通常由页面删除按钮触发。
    public void deleteGoal(Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        goalRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<Goal> getGoalsByEmployee(Long employeeId) {
        // 行注释：返回当前方法的处理结果。
        return goalRepository.findByEmployeeId(employeeId);
    // 行注释：结束当前代码块。
    }

    /**
     * 检查目标延期风险并创建预警
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkGoalDelayAlerts() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        List<Goal> goals = goalRepository.findAll();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        LocalDate today = LocalDate.now();

        // 行注释：遍历集合数据，逐条处理业务记录。
        for (Goal goal : goals) {
            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (goal.getEndDate() == null || "completed".equals(goal.getStatus())) {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                continue;
            // 行注释：结束当前代码块。
            }

            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            LocalDate endDate = goal.getEndDate();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            long daysToDeadline = ChronoUnit.DAYS.between(today, endDate);

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (daysToDeadline <= 7 && daysToDeadline >= 0 && goal.getProgress() < 60) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "goal_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    goal.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "goal",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "目标「" + goal.getTitle() + "」距离截止日期剩余" + daysToDeadline + "天，但完成率仅" + goal.getProgress() + "%"
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                );
            // 行注释：结束当前代码块。
            }

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (daysToDeadline < 0 && !"completed".equals(goal.getStatus())) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "goal_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    goal.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "goal",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "目标「" + goal.getTitle() + "」已超期" + Math.abs(daysToDeadline) + "天，当前完成率" + goal.getProgress() + "%"
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                );
            // 行注释：结束当前代码块。
            }
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


