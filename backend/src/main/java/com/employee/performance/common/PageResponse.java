// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.common;

// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.Data;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 PageResponse 模块的通用模型类，用于统一接口返回结构或公共数据封装。
// 行注释：让 Lombok 自动生成常用 getter、setter 等方法。
@Data
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class PageResponse<T> {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private List<T> content;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private int page;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private int size;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private long total;
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private int totalPages;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：构造方法在创建对象时自动调用，用于初始化响应对象、异常对象或缓存管理对象。
    public PageResponse(List<T> content, int page, int size, long total) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.content = content;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.page = page;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.size = size;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.total = total;
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        this.totalPages = (int) Math.ceil((double) total / size);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

