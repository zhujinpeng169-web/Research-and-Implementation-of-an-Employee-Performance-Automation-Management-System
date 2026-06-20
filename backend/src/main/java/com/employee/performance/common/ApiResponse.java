// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.common;

// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;

// 类注释：这是 ApiResponse 模块的通用模型类，用于统一接口返回结构或公共数据封装。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class ApiResponse<T> {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private int code;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String message;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private T data;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private LocalDateTime timestamp;

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：构造方法在创建对象时自动调用，用于初始化响应对象、异常对象或缓存管理对象。
    public ApiResponse() {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.timestamp = LocalDateTime.now();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public ApiResponse(int code, String message, T data) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.code = code;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.message = message;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.data = data;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.timestamp = LocalDateTime.now();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务模块中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public static <T> ApiResponse<T> success(T data) {
        // 行注释：返回当前方法的处理结果。
        return new ApiResponse<>(200, "操作成功", data);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public static <T> ApiResponse<T> success(String message, T data) {
        // 行注释：返回当前方法的处理结果。
        return new ApiResponse<>(200, message, data);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务模块中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public static <T> ApiResponse<T> error(String message) {
        // 行注释：返回当前方法的处理结果。
        return new ApiResponse<>(500, message, null);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public static <T> ApiResponse<T> error(int code, String message) {
        // 行注释：返回当前方法的处理结果。
        return new ApiResponse<>(code, message, null);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

