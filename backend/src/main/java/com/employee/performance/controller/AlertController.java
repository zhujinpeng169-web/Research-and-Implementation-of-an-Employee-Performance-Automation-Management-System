// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.controller;


// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.AlertRecord;
// 行注释：导入业务服务类，用于复用核心业务逻辑。
import com.employee.performance.service.AlertService;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.ResponseEntity;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.*;

// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 AlertController 模块的控制器类，用于接收前端请求并调用服务层返回接口结果。
// 行注释：声明这是 REST 接口控制器，返回 JSON 数据给前端。
@RestController
// 行注释：配置当前控制器或方法对应的访问路径。
@RequestMapping("/api/alerts")
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：允许跨域访问，便于前端调用后端接口。
@CrossOrigin
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class AlertController {

    /**
     * 业务服务注入（构造器注入）。
     * Lombok 的 @RequiredArgsConstructor 会为 final 字段生成构造函数。
     */
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final AlertService alertService;

    /**
     * 查询全部预警记录。
     *
     * URL：GET /api/alerts
     * 用法：管理页面加载“全部通知列表”时调用。
     * 作用：返回 AlertRecord 全量数据。
     *
     * @return 200 + 预警列表 JSON
     */
    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping
    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：接口层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public ResponseEntity<List<AlertRecord>> getAllAlerts() {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(alertService.getAllAlerts());
    // 行注释：结束当前代码块。
    }

    /**
     * 查询未读预警记录。
     *
     * URL：GET /api/alerts/unread
     * 用法：首页红点提醒、未读消息弹窗。
     * 作用：只返回“未读状态”的预警。
     *
     * @return 200 + 未读预警列表 JSON
     */
    // 行注释：声明 GET 查询接口，通常用于获取数据。
    @GetMapping("/unread")
    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：接口层按条件查询单条或多条数据时使用，答辩时可说明它负责读取业务数据。
    public ResponseEntity<List<AlertRecord>> getUnreadAlerts() {
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok(alertService.getUnreadAlerts());
    // 行注释：结束当前代码块。
    }

    /**
     * 标记预警为已读。
     *
     * URL：PUT /api/alerts/{id}/read
     * 用法：用户点击某条通知后调用。
     * 作用：把该记录状态从未读改为已读，避免重复提醒。
     *
     * @param id 预警主键 ID（路径变量）
     * @return 200（无响应体）
     */
    // 行注释：声明 PUT 更新接口，通常用于修改数据。
    @PutMapping("/{id}/read")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        alertService.markAsRead(id);
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().build();
    // 行注释：结束当前代码块。
    }

    /**
     * 删除预警记录。
     *
     * URL：DELETE /api/alerts/{id}
     * 用法：用户在通知列表中手动清理某条记录。
     * 作用：从数据库中永久移除该预警。
     *
     * @param id 预警主键 ID（路径变量）
     * @return 200（无响应体）
     */
    // 行注释：声明 DELETE 删除接口，通常用于删除数据。
    @DeleteMapping("/{id}")
    // 行注释：定义接口方法，把业务处理结果包装成 HTTP 响应返回前端。
    // 方法用法：接口层删除数据时使用，通常由页面删除按钮触发。
    public ResponseEntity<Void> deleteAlert(@PathVariable Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        alertService.deleteAlert(id);
        // 行注释：返回 HTTP 响应对象给前端。
        return ResponseEntity.ok().build();
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

