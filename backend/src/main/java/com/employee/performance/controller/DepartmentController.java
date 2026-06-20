// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.controller;

// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.Department;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.DepartmentService;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.ResponseEntity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.*;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 DepartmentController 模块的控制器类，用于接收前端请求并调用服务层返回接口结果。
// 行注释：声明这是 REST 接口控制器，返回 JSON 数据给前端。
@RestController
// 行注释：配置当前控制器或方法对应的访问路径。
@RequestMapping("/api/departments")
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：允许跨域访问，便于前端调用后端接口。
@CrossOrigin
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class DepartmentController {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final DepartmentService departmentService;

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping
    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：接口层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public ResponseEntity<List<Department>> getAllDepartments() {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(departmentService.getAllDepartments());
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/{id}")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 POST 新增接口，通常用于创建数据。
    @PostMapping
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(departmentService.createDepartment(department));
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 PUT 更新接口，通常用于修改数据。
    @PutMapping("/{id}")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层修改业务状态或内容时使用，负责校验已有数据并保存更新结果。
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 DELETE 删除接口，通常用于删除数据。
    @DeleteMapping("/{id}")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层删除数据时使用，通常由页面删除按钮触发。
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        departmentService.deleteDepartment(id);
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().build();
    // 行注释：结束当前代码块。
    }

    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/sub/{parentId}")
    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<List<Department>> getSubDepartments(@PathVariable Long parentId) {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(departmentService.getSubDepartments(parentId));
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

