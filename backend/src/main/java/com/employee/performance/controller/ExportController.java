// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.controller;

// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.*;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.HttpHeaders;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.MediaType;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.ResponseEntity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.*;

// 行注释：导入当前类需要使用的外部类型或工具。
import java.io.ByteArrayOutputStream;
// 行注释：导入当前类需要使用的外部类型或工具。
import java.nio.charset.StandardCharsets;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.format.DateTimeFormatter;

// 类注释：这是 ExportController 模块的控制器类，用于接收前端请求并调用服务层返回接口结果。
// 行注释：声明这是 REST 接口控制器，返回 JSON 数据给前端。
@RestController
// 行注释：配置当前控制器或方法对应的访问路径。
@RequestMapping("/api/export")
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：允许跨域访问，便于前端调用后端接口。
@CrossOrigin
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class ExportController {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EmployeeService employeeService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final GoalService goalService;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EvaluationService evaluationService;

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/employees")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层导出数据时使用，把业务数据整理成文件响应给前端下载。
    public ResponseEntity<byte[]> exportEmployees() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        var employees = employeeService.getAllEmployees();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        StringBuilder csv = new StringBuilder();

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        csv.append("工号,姓名,部门ID,岗位ID,上级ID,电话,邮箱,入职日期,状态\n");

        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        employees.forEach(emp -> {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            csv.append(emp.getEmpNo()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getName()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getDepartmentId() != null ? emp.getDepartmentId() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getPositionId() != null ? emp.getPositionId() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getSupervisorId() != null ? emp.getSupervisorId() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getPhone() != null ? emp.getPhone() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getEmail() != null ? emp.getEmail() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getJoinDate() != null ? emp.getJoinDate() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(emp.getStatus() != null ? emp.getStatus() : "").append("\n");
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        });

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        HttpHeaders headers = new HttpHeaders();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentDispositionFormData("attachment",
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            "employees_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".csv");

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().headers(headers).body(bytes);
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/goals")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层导出数据时使用，把业务数据整理成文件响应给前端下载。
    public ResponseEntity<byte[]> exportGoals() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        var goals = goalService.getAllGoals();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        StringBuilder csv = new StringBuilder();

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        csv.append("ID,员工ID,部门ID,标题,类型,开始日期,结束日期,进度,状态\n");

        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        goals.forEach(goal -> {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            csv.append(goal.getId()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getEmployeeId()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getDepartmentId() != null ? goal.getDepartmentId() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append("\"").append(goal.getTitle() != null ? goal.getTitle() : "").append("\"").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getType() != null ? goal.getType() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getStartDate() != null ? goal.getStartDate() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getEndDate() != null ? goal.getEndDate() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getProgress() != null ? goal.getProgress() : "0").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(goal.getStatus() != null ? goal.getStatus() : "").append("\n");
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        });

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        HttpHeaders headers = new HttpHeaders();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentDispositionFormData("attachment",
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            "goals_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".csv");

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().headers(headers).body(bytes);
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/evaluations")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层导出数据时使用，把业务数据整理成文件响应给前端下载。
    public ResponseEntity<byte[]> exportEvaluations() {
        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        var evaluations = evaluationService.getAllEvaluations();
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        StringBuilder csv = new StringBuilder();

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        csv.append("ID,员工ID,周期ID,自评分,上级评分,同事评分,最终得分,状态\n");

        // 行注释：开始一个代码块，下面是该结构内部的具体逻辑。
        evaluations.forEach(eval -> {
            // 行注释：读取对象字段值，用于条件判断或组装返回结果。
            csv.append(eval.getId()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getEmployeeId()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getCycleId()).append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getSelfScore() != null ? eval.getSelfScore() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getSupervisorScore() != null ? eval.getSupervisorScore() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getPeerScore() != null ? eval.getPeerScore() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getFinalScore() != null ? eval.getFinalScore() : "").append(",")
               // 行注释：读取对象字段值，用于条件判断或组装返回结果。
               .append(eval.getStatus() != null ? eval.getStatus() : "").append("\n");
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        });

        // 行注释：读取对象字段值，用于条件判断或组装返回结果。
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        HttpHeaders headers = new HttpHeaders();
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        headers.setContentDispositionFormData("attachment",
            // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
            "evaluations_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + ".csv");

        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().headers(headers).body(bytes);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}


