// 行注释：声明当前 Java 文件所在包，帮助后端代码按模块组织。
package com.employee.performance.service;

// 行注释：导入实体类，对应数据库中的业务表。
import com.employee.performance.entity.Employee;
// 行注释：导入数据访问接口，用于调用数据库操作。
import com.employee.performance.repository.EmployeeRepository;
// 行注释：导入 Lombok 注解，用于减少 getter、setter 或构造器样板代码。
import lombok.RequiredArgsConstructor;
// 行注释：导入 Spring 框架能力，用于接口、配置、依赖注入或数据访问。
import org.springframework.stereotype.Service;
// 行注释：导入时间类型，用于记录创建、更新或业务日期。
import java.time.LocalDateTime;
// 行注释：导入集合或工具类型，用于承载多条业务数据。
import java.util.List;

// 类注释：这是 EmployeeService 模块的业务服务类，用于承载核心业务逻辑并协调数据读写。
// 行注释：声明这是业务服务层组件，由 Spring 容器管理。
@Service
// 行注释：让 Lombok 自动生成 final 字段构造器，便于依赖注入。
@RequiredArgsConstructor
// 行注释：定义当前模块的核心类型，是该文件对外提供功能的主体。
public class EmployeeService {
    // 行注释：声明成员变量，用于保存依赖对象或实体字段数据。
    private final EmployeeRepository employeeRepository;

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    // 方法用法：业务层查询全部数据时使用，通常由列表页面或下拉选择调用。
    public List<Employee> getAllEmployees() {
        // 行注释：返回当前方法的处理结果。
        return employeeRepository.findAll();
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    public Employee getEmployeeById(Long id) {
        // 行注释：返回当前方法的处理结果。
        return employeeRepository.findById(id).orElse(null);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层新增或保存数据时使用，负责把前端提交的业务对象持久化。
    public Employee createEmployee(Employee employee) {
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        employee.setCreatedAt(LocalDateTime.now());
        // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
        employee.setUpdatedAt(LocalDateTime.now());
        // 行注释：返回当前方法的处理结果。
        return employeeRepository.save(employee);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，封装一段可复用的处理逻辑。
    // 方法用法：业务层修改业务状态或内容时使用，负责校验已有数据并保存更新结果。
    public Employee updateEmployee(Long id, Employee employee) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        Employee existing = getEmployeeById(id);
        // 行注释：进行条件判断，根据业务状态决定后续处理分支。
        if (existing != null) {
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setName(employee.getName());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setPositionId(employee.getPositionId());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setDepartmentId(employee.getDepartmentId());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setSupervisorId(employee.getSupervisorId());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setPhone(employee.getPhone());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setEmail(employee.getEmail());
            // 行注释：给实体对象字段赋值，用于新增或更新业务数据。
            existing.setUpdatedAt(LocalDateTime.now());
            // 行注释：返回当前方法的处理结果。
            return employeeRepository.save(existing);
        // 行注释：结束当前代码块。
        }
        // 行注释：返回当前方法的处理结果。
        return null;
    // 行注释：结束当前代码块。
    }

    // 行注释：定义无返回值方法，通常用于删除、记录或执行流程动作。
    // 方法用法：业务层删除数据时使用，通常由页面删除按钮触发。
    public void deleteEmployee(Long id) {
        // 行注释：执行当前语句，完成一次赋值、调用或配置操作。
        employeeRepository.deleteById(id);
    // 行注释：结束当前代码块。
    }

    // 行注释：定义业务方法，返回多条数据集合供控制器或其他模块使用。
    public List<Employee> getEmployeesByDepartment(Long departmentId) {
        // 行注释：返回当前方法的处理结果。
        return employeeRepository.findByDepartmentId(departmentId);
    // 行注释：结束当前代码块。
    }
// 行注释：结束当前代码块。
}

