-- 模块说明：数据库结构脚本，定义系统全部业务表、索引及外键关系。
-- 员工效能管理系统数据库表结构
-- 请确保在 employee_performance 数据库中执行此脚本

-- 使用数据库
-- 行注释：选择当前脚本要操作的 MySQL 数据库。
USE employee_performance;

-- 临时禁用外键检查
-- 行注释：临时调整外键检查，便于按顺序清理或重建表数据。
SET FOREIGN_KEY_CHECKS = 0;

-- 删除已存在的表（按依赖关系逆序删除）
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS alert_record;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS operation_log;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS `user`;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS system_config;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS improvement_plan;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS feedback;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS evaluation_detail;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS evaluation;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS evaluation_cycle;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS evaluation_dimension;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS work_result;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS task;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS goal_adjustment;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS goal;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS employee;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS `position`;
-- 行注释：删除旧表，为重新创建数据库结构做准备。
DROP TABLE IF EXISTS department;

-- 恢复外键检查
-- 行注释：临时调整外键检查，便于按顺序清理或重建表数据。
SET FOREIGN_KEY_CHECKS = 1;

-- 部门表（无依赖）
-- 行注释：创建 department 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS department (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '部门ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    name VARCHAR(100) NOT NULL COMMENT '部门名称',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    parent_id BIGINT DEFAULT NULL COMMENT '父部门ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    level INT NOT NULL COMMENT '部门层级',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    function_desc TEXT COMMENT '部门职能描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_parent_id (parent_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_dept_parent FOREIGN KEY (parent_id) REFERENCES department(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门表';

-- 岗位表（无依赖）
-- 行注释：创建 position 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS `position` (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '岗位ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    name VARCHAR(100) NOT NULL COMMENT '岗位名称',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    level VARCHAR(50) DEFAULT NULL COMMENT '岗位级别',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='岗位表';

-- 员工表（依赖：position, department）
-- 行注释：创建 employee 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS employee (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    emp_no VARCHAR(50) NOT NULL UNIQUE COMMENT '员工编号',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    name VARCHAR(100) NOT NULL COMMENT '员工姓名',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    position_id BIGINT DEFAULT NULL COMMENT '岗位ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    department_id BIGINT DEFAULT NULL COMMENT '部门ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    supervisor_id BIGINT DEFAULT NULL COMMENT '上级主管ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    join_date DATE DEFAULT NULL COMMENT '入职日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    phone VARCHAR(20) DEFAULT NULL COMMENT '电话',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status TINYINT DEFAULT 1 COMMENT '状态:1-在职,0-离职',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_emp_no (emp_no),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_position_id (position_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_department_id (department_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_supervisor_id (supervisor_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_emp_position FOREIGN KEY (position_id) REFERENCES `position`(id) ON DELETE SET NULL,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_emp_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_emp_supervisor FOREIGN KEY (supervisor_id) REFERENCES employee(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工表';

-- 目标表（依赖：employee, department）
-- 行注释：创建 goal 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS goal (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '目标ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    department_id BIGINT DEFAULT NULL COMMENT '部门ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    title VARCHAR(200) NOT NULL COMMENT '目标标题',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    description TEXT COMMENT '目标描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    type VARCHAR(20) DEFAULT NULL COMMENT '目标类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    start_date DATE DEFAULT NULL COMMENT '开始日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    progress INT DEFAULT 0 COMMENT '进度百分比',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_department_id (department_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_goal_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_goal_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='目标表';

-- 目标调整记录表（依赖：goal）
-- 行注释：创建 goal_adjustment 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS goal_adjustment (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '调整记录ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    goal_id BIGINT NOT NULL COMMENT '目标ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    reason TEXT COMMENT '调整原因',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    old_content TEXT COMMENT '原内容',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    new_content TEXT COMMENT '新内容',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '审核状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_goal_id (goal_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_adjustment_goal FOREIGN KEY (goal_id) REFERENCES goal(id) ON DELETE CASCADE
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='目标调整记录表';

-- 任务表（依赖：employee, goal）
-- 行注释：创建 task 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS task (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '任务ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    goal_id BIGINT DEFAULT NULL COMMENT '关联目标ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    title VARCHAR(200) NOT NULL COMMENT '任务标题',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    description TEXT COMMENT '任务描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    priority VARCHAR(20) DEFAULT NULL COMMENT '优先级',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    estimated_hours DECIMAL(10,2) DEFAULT NULL COMMENT '预计工时',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    progress INT DEFAULT 0 COMMENT '进度百分比',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    start_date DATE DEFAULT NULL COMMENT '开始日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_goal_id (goal_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_task_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_task_goal FOREIGN KEY (goal_id) REFERENCES goal(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='任务表';

-- 工作成果表（依赖：task, employee）
-- 行注释：创建 work_result 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS work_result (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '成果ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    task_id BIGINT NOT NULL COMMENT '任务ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    title VARCHAR(200) DEFAULT NULL COMMENT '成果标题',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    file_path VARCHAR(500) DEFAULT NULL COMMENT '文件路径',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    description TEXT COMMENT '成果描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_task_id (task_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_result_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_result_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作成果表';

-- 评估维度表（无依赖）
-- 行注释：创建 evaluation_dimension 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS evaluation_dimension (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '维度ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    name VARCHAR(100) NOT NULL COMMENT '维度名称',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    weight DECIMAL(5,2) DEFAULT NULL COMMENT '权重',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    position_type VARCHAR(50) DEFAULT NULL COMMENT '适用岗位类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    description TEXT COMMENT '维度描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评估维度表';

-- 评估周期表（无依赖）
-- 行注释：创建 evaluation_cycle 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS evaluation_cycle (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '周期ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    name VARCHAR(100) NOT NULL COMMENT '周期名称',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    type VARCHAR(20) DEFAULT NULL COMMENT '周期类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    start_date DATE DEFAULT NULL COMMENT '开始日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status)
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评估周期表';

-- 评估记录表（依赖：evaluation_cycle, employee）
-- 行注释：创建 evaluation 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS evaluation (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评估ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    cycle_id BIGINT NOT NULL COMMENT '评估周期ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    self_score DECIMAL(5,2) DEFAULT NULL COMMENT '自评分数',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    supervisor_score DECIMAL(5,2) DEFAULT NULL COMMENT '主管评分',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    peer_score DECIMAL(5,2) DEFAULT NULL COMMENT '同事互评分数',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    final_score DECIMAL(5,2) DEFAULT NULL COMMENT '最终得分',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    self_comment TEXT COMMENT '自评意见',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    supervisor_comment TEXT COMMENT '主管评语',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_cycle_id (cycle_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_eval_cycle FOREIGN KEY (cycle_id) REFERENCES evaluation_cycle(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_eval_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评估记录表';

-- 评估明细表（依赖：evaluation, evaluation_dimension）
-- 行注释：创建 evaluation_detail 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS evaluation_detail (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    evaluation_id BIGINT NOT NULL COMMENT '评估ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    dimension_id BIGINT NOT NULL COMMENT '维度ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    self_score DECIMAL(5,2) DEFAULT NULL COMMENT '自评分数',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    supervisor_score DECIMAL(5,2) DEFAULT NULL COMMENT '主管评分',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    peer_score DECIMAL(5,2) DEFAULT NULL COMMENT '同事互评分数',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_evaluation_id (evaluation_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_dimension_id (dimension_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_detail_evaluation FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_detail_dimension FOREIGN KEY (dimension_id) REFERENCES evaluation_dimension(id) ON DELETE CASCADE
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评估明细表';

-- 反馈记录表（依赖：evaluation, employee）
-- 行注释：创建 feedback 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS feedback (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '反馈ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    evaluation_id BIGINT NOT NULL COMMENT '评估ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '被反馈员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    supervisor_id BIGINT NOT NULL COMMENT '反馈主管ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    content TEXT COMMENT '反馈内容',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    feedback_date DATE DEFAULT NULL COMMENT '反馈日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    confirmed TINYINT DEFAULT 0 COMMENT '是否确认:1-已确认,0-未确认',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_evaluation_id (evaluation_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_supervisor_id (supervisor_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_feedback_evaluation FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_feedback_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_feedback_supervisor FOREIGN KEY (supervisor_id) REFERENCES employee(id) ON DELETE CASCADE
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='反馈记录表';

-- 改进计划表（依赖：employee, evaluation）
-- 行注释：创建 improvement_plan 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS improvement_plan (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '计划ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT NOT NULL COMMENT '员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    evaluation_id BIGINT DEFAULT NULL COMMENT '关联评估ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    goal VARCHAR(500) DEFAULT NULL COMMENT '改进目标',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    measures TEXT COMMENT '改进措施',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    start_date DATE DEFAULT NULL COMMENT '开始日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    end_date DATE DEFAULT NULL COMMENT '结束日期',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    progress INT DEFAULT 0 COMMENT '进度百分比',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_evaluation_id (evaluation_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_plan_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_plan_evaluation FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='改进计划表';

-- 系统配置表（无依赖）
-- 行注释：创建 system_config 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS system_config (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '配置ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    config_key VARCHAR(100) NOT NULL UNIQUE COMMENT '配置键',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    config_value TEXT COMMENT '配置值',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    description VARCHAR(500) DEFAULT NULL COMMENT '配置描述',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_config_key (config_key)
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

-- 用户表（依赖：employee）
-- 行注释：创建 user 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS `user` (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    password VARCHAR(255) NOT NULL COMMENT '密码',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    employee_id BIGINT DEFAULT NULL COMMENT '关联员工ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    role VARCHAR(50) DEFAULT NULL COMMENT '角色',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status TINYINT DEFAULT 1 COMMENT '状态:1-启用,0-禁用',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_username (username),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_employee_id (employee_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_user_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 操作日志表（依赖：user）
-- 行注释：创建 operation_log 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS operation_log (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    user_id BIGINT DEFAULT NULL COMMENT '用户ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    operation VARCHAR(100) DEFAULT NULL COMMENT '操作类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    module VARCHAR(50) DEFAULT NULL COMMENT '操作模块',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    content TEXT COMMENT '操作内容',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    ip VARCHAR(50) DEFAULT NULL COMMENT 'IP地址',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_user_id (user_id),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_created_at (created_at),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE SET NULL
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- 预警记录表（无依赖）
-- 行注释：创建 alert_record 表，用于保存对应业务数据。
CREATE TABLE IF NOT EXISTS alert_record (
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '预警ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    type VARCHAR(50) DEFAULT NULL COMMENT '预警类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    target_id BIGINT DEFAULT NULL COMMENT '目标ID',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    target_type VARCHAR(50) DEFAULT NULL COMMENT '目标类型',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    message TEXT COMMENT '预警消息',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    status VARCHAR(20) DEFAULT 'unread' COMMENT '状态:unread-未读,read-已读',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_status (status),
    -- 行注释：定义字段、索引或外键约束，描述表结构规则。
    KEY idx_created_at (created_at)
-- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='预警记录表';

