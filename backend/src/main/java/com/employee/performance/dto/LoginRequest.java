// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.dto;

// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;

// 类注释：这是 LoginRequest 模块的数据传输类，用于封装接口请求或响应的数据结构。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class LoginRequest {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String username;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private String password;
// 行注释：结束当前代码块。
}

