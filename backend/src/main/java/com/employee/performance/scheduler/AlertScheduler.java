// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.scheduler;


// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.AlertService;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.GoalService;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.TaskService;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.EvaluationService;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.extern.slf4j.Slf4j;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.scheduling.annotation.Scheduled;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Component;

// 类注释：这是 AlertScheduler 模块的定时任务类，用于按计划触发后台任务并执行自动化处理。
// 行注释：使用 @Slf4j 注解声明框架行为或元数据。
@Slf4j
// 行注释：使用 @Component 注解声明框架行为或元数据。
@Component
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class AlertScheduler {

    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final TaskService taskService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final GoalService goalService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EvaluationService evaluationService;

    /**
     * 每天凌晨2点检查任务延期风险
     */
    // 行注释：使用 @Scheduled 注解声明框架行为或元数据。
    @Scheduled(cron = "0 0 2 * * ?")
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：定时任务模块执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkTaskDelays() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        log.info("开始检查任务延期风险...");
        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            taskService.checkTaskDelayAlerts();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.info("任务延期检查完成");
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.error("任务延期检查失败", e);
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 每天凌晨2点15分检查目标延期风险
     */
    // 行注释：使用 @Scheduled 注解声明框架行为或元数据。
    @Scheduled(cron = "0 15 2 * * ?")
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：定时任务模块执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkGoalDelays() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        log.info("开始检查目标延期风险...");
        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            goalService.checkGoalDelayAlerts();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.info("目标延期检查完成");
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.error("目标延期检查失败", e);
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 每天凌晨2点30分检查待评估项
     */
    // 行注释：使用 @Scheduled 注解声明框架行为或元数据。
    @Scheduled(cron = "0 30 2 * * ?")
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：定时任务模块执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void checkPendingEvaluations() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        log.info("开始检查待评估项...");
        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            evaluationService.checkPendingEvaluationAlerts();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.info("待评估项检查完成");
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.error("待评估项检查失败", e);
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }

    /**
     * 每小时执行一次综合检查（工作时间：9-18点）
     */
    // 行注释：使用 @Scheduled 注解声明框架行为或元数据。
    @Scheduled(cron = "0 0 9-18 * * ?")
    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：定时任务模块执行业务检查并生成提醒，用于发现目标、任务或评估中的风险。
    public void hourlyCheck() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        log.info("执行每小时预警检查...");
        // 行注释：开始异常捕获流程，避免单个错误影响整体请求。
        try {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            taskService.checkTaskDelayAlerts();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            goalService.checkGoalDelayAlerts();
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.info("每小时检查完成");
        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        } catch (Exception e) {
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            log.error("每小时检查失败", e);
        // 行注释：结束当前代码块。
        }
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

