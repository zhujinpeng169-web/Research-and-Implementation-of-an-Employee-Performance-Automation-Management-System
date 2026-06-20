// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.Task;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.TaskRepository;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
// 类注释：这是 TaskService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
public class TaskService {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final TaskRepository taskRepository;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final AlertService alertService;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<Task> getAllTasks() {
        // 行注释：返回当前方法的处理结果。
        return taskRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public Task getTaskById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return taskRepository.findById(id).orElse(null);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public Task createTask(Task task) {
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        task.setCreatedAt(LocalDateTime.now());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        task.setUpdatedAt(LocalDateTime.now());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        task.setStatus(task.getStatus() != null ? task.getStatus() : "pending");
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        task.setProgress(task.getProgress() != null ? task.getProgress() : 0);
        // 行注释：返回当前方法的处理结果。
        return taskRepository.save(task);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层修改业务状态或内容时使用，负责校验已有数据并保存更新结果。
    public Task updateTask(Long id, Task task) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Task existing = getTaskById(id);
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (existing != null) {
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setTitle(task.getTitle());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setDescription(task.getDescription());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setPriority(task.getPriority());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setEstimatedHours(task.getEstimatedHours());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setStatus(task.getStatus());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setProgress(task.getProgress());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setStartDate(task.getStartDate());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setEndDate(task.getEndDate());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setUpdatedAt(LocalDateTime.now());

            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            checkTaskAlert(existing);

            // 行注释：返回当前方法的处理结果。
            return taskRepository.save(existing);
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return null;
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层删除数据时使用，通常由页面删除按钮触发。
    public void deleteTask(Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        taskRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<Task> getTasksByEmployee(Long employeeId) {
        // 行注释：返回当前方法的处理结果。
        return taskRepository.findByEmployeeId(employeeId);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public List<Task> getTasksByGoal(Long goalId) {
        // 行注释：返回当前方法的处理结果。
        return taskRepository.findByGoalId(goalId);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    private void checkTaskAlert(Task task) {
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (task.getEndDate() != null && task.getProgress() != null) {
            // 行注释：当前行参与完成该模块的业务逻辑。
            long daysToDeadline = java.time.temporal.ChronoUnit.DAYS.between(
                // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                java.time.LocalDate.now(), task.getEndDate()
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            );

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (daysToDeadline <= 3 && task.getProgress() < 50) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    task.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "任务「" + task.getTitle() + "」距离截止日期不足3天，但完成率仅" + task.getProgress() + "%"
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                );
            // 行注释：结束当前代码块。
            }
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 批量检查所有任务的延期风险
     */
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkTaskDelayAlerts() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        List<Task> tasks = taskRepository.findAll();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        java.time.LocalDate today = java.time.LocalDate.now();

        // 行注释：遍历集合数据，逐条处理业务记录。
        for (Task task : tasks) {
            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (task.getEndDate() == null || "completed".equals(task.getStatus())) {
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                continue;
            // 行注释：结束当前代码块。
            }

            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            long daysToDeadline = java.time.temporal.ChronoUnit.DAYS.between(today, task.getEndDate());

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (daysToDeadline <= 3 && daysToDeadline >= 0 && task.getProgress() < 50) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    task.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "任务「" + task.getTitle() + "」距离截止日期剩余" + daysToDeadline + "天，但完成率仅" + task.getProgress() + "%"
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                );
            // 行注释：结束当前代码块。
            }

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if (daysToDeadline < 0 && !"completed".equals(task.getStatus())) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    task.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "任务「" + task.getTitle() + "」已超期" + Math.abs(daysToDeadline) + "天，当前完成率" + task.getProgress() + "%"
                // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
                );
            // 行注释：结束当前代码块。
            }

            // 行注释：进行条件判断，根据业务状态决定后续处理分支。
            if ("high".equals(task.getPriority()) && daysToDeadline <= 5 && task.getProgress() < 70) {
                // 行注释：当前行参与完成该模块的业务逻辑。
                alertService.createAlert(
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task_delay",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    task.getId(),
                    // 行注释：当前行参与完成该模块的业务逻辑。
                    "task",
                    // 行注释：读取对象字段值，用于条件判断或组装返回结果。
                    "【高优先级】任务「" + task.getTitle() + "」需要重点关注，距离截止日期" + daysToDeadline + "天，完成率" + task.getProgress() + "%"
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


