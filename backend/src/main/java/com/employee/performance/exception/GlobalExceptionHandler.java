// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.exception;

// 行注释：导入当前类需要使用的外部类型或工具。
import com.employee.performance.common.ApiResponse;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.http.HttpStatus;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.ExceptionHandler;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.ResponseStatus;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.web.bind.annotation.RestControllerAdvice;

// 类注释：这是 GlobalExceptionHandler 模块的异常处理类，用于定义业务异常或统一处理系统异常。
// 行注释：使用 @RestControllerAdvice 注解声明框架行为或元数据。
@RestControllerAdvice
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class GlobalExceptionHandler {

    // 行注释：使用 @ExceptionHandler 注解声明框架行为或元数据。
    @ExceptionHandler(ResourceNotFoundException.class)
    // 行注释：使用 @ResponseStatus 注解声明框架行为或元数据。
    @ResponseStatus(HttpStatus.NOT_FOUND)
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务模块中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public ApiResponse<?> handleResourceNotFoundException(ResourceNotFoundException ex) {
        // 行注释：返回当前方法的处理结果。
        return ApiResponse.error(404, ex.getMessage());
    // 行注释：结束当前代码块。
    }

    // 行注释：使用 @ExceptionHandler 注解声明框架行为或元数据。
    @ExceptionHandler(IllegalArgumentException.class)
    // 行注释：使用 @ResponseStatus 注解声明框架行为或元数据。
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务模块中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public ApiResponse<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        // 行注释：返回当前方法的处理结果。
        return ApiResponse.error(400, ex.getMessage());
    // 行注释：结束当前代码块。
    }

    // 行注释：使用 @ExceptionHandler 注解声明框架行为或元数据。
    @ExceptionHandler(Exception.class)
    // 行注释：使用 @ResponseStatus 注解声明框架行为或元数据。
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务模块中的功能方法，封装一段可复用逻辑，供控制器、服务或框架在对应场景调用。
    public ApiResponse<?> handleException(Exception ex) {
        // 行注释：返回当前方法的处理结果。
        return ApiResponse.error("系统错误: " + ex.getMessage());
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

