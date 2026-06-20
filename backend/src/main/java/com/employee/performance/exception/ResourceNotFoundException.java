// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.exception;

// 类注释：这是 ResourceNotFoundException 模块的异常处理类，用于定义业务异常或统一处理系统异常。
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class ResourceNotFoundException extends RuntimeException {
    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：构造方法在创建对象时自动调用，用于初始化响应对象、异常对象或缓存管理对象。
    public ResourceNotFoundException(String message) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        super(message);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public ResourceNotFoundException(String resource, Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        super(resource + " with id " + id + " not found");
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

