// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.controller;

// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.ResponseEntity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.*;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.*;

// 类注释：这是 StatisticsController 模块的控制器类，用于接收前端请求并调用服务层返回接口结果。
// 行注释：声明这是 REST 接口控制器，返回 JSON 数据给前端。
@RestController
// 行注释：配置当前控制器或方法对应的访问路径。
@RequestMapping("/api/statistics")
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：允许跨域访问，便于前端调用后端接口。
@CrossOrigin
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class StatisticsController {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EmployeeService employeeService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final GoalService goalService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EvaluationService evaluationService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final TaskService taskService;

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/overview")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<Map<String, Object>> getOverview() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Map<String, Object> overview = new HashMap<>();
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        overview.put("totalEmployees", employeeService.getAllEmployees().size());
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        overview.put("totalGoals", goalService.getAllGoals().size());
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        overview.put("totalTasks", taskService.getAllTasks().size());
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        overview.put("totalEvaluations", evaluationService.getAllEvaluations().size());
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(overview);
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/department-distribution")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<Map<String, Long>> getDepartmentDistribution() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Map<String, Long> distribution = new HashMap<>();
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        employeeService.getAllEmployees().forEach(emp -> {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            String key = "部门" + (emp.getDepartmentId() != null ? emp.getDepartmentId() : "未分配");
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            distribution.put(key, distribution.getOrDefault(key, 0L) + 1);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        });
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(distribution);
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/goal-completion")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<Map<String, Object>> getGoalCompletion() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        var goals = goalService.getAllGoals();
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        long completed = goals.stream().filter(g -> "completed".equals(g.getStatus())).count();
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        long inProgress = goals.stream().filter(g -> "in_progress".equals(g.getStatus())).count();
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        long pending = goals.stream().filter(g -> "pending".equals(g.getStatus())).count();

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Map<String, Object> result = new HashMap<>();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("completed", completed);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("inProgress", inProgress);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("pending", pending);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("completionRate", goals.size() > 0 ? (completed * 100.0 / goals.size()) : 0);

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(result);
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/evaluation-scores")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<Map<String, Object>> getEvaluationScores() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        var evaluations = evaluationService.getAllEvaluations();
        // 行注释：当前行参与完成该模块的业务逻辑。
        var scores = evaluations.stream()
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            .filter(e -> e.getFinalScore() != null)
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            .map(e -> e.getFinalScore().doubleValue())
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            .toList();

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Map<String, Object> result = new HashMap<>();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("scores", scores);
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("average", scores.stream().mapToDouble(Double::doubleValue).average().orElse(0.0));
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("max", scores.stream().mapToDouble(Double::doubleValue).max().orElse(0.0));
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        result.put("min", scores.stream().mapToDouble(Double::doubleValue).min().orElse(0.0));

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(result);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

