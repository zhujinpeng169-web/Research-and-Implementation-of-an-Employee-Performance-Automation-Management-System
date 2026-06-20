-- ==================================================================
-- 完整数据库初始化脚本（建表+测试数据）
-- 直接在H2控制台执行，无需依赖后端自动建表
-- ==================================================================

-- 1. 创建部门表
CREATE TABLE IF NOT EXISTS department (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    parent_id BIGINT,
    level INTEGER,
    function_desc TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 2. 创建员工表
CREATE TABLE IF NOT EXISTS employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    emp_no VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    position_id BIGINT,
    department_id BIGINT,
    supervisor_id BIGINT,
    join_date DATE,
    phone VARCHAR(255),
    email VARCHAR(255),
    status INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 3. 创建目标表
CREATE TABLE IF NOT EXISTS goal (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT,
    department_id BIGINT,
    title VARCHAR(255),
    description TEXT,
    type VARCHAR(255),
    start_date DATE,
    end_date DATE,
    status VARCHAR(255),
    progress INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 4. 创建任务表
CREATE TABLE IF NOT EXISTS task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT,
    goal_id BIGINT,
    title VARCHAR(255),
    description TEXT,
    priority VARCHAR(255),
    estimated_hours DECIMAL(10,2),
    status VARCHAR(255),
    progress INTEGER,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 5. 创建评估表
CREATE TABLE IF NOT EXISTS evaluation (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cycle_id BIGINT,
    employee_id BIGINT,
    self_score DECIMAL(5,2),
    supervisor_score DECIMAL(5,2),
    peer_score DECIMAL(5,2),
    final_score DECIMAL(5,2),
    self_comment TEXT,
    supervisor_comment TEXT,
    status VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 6. 创建改进计划表
CREATE TABLE IF NOT EXISTS improvement_plan (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT,
    evaluation_id BIGINT,
    goal TEXT,
    measures TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(255),
    progress INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- 7. 创建预警记录表
CREATE TABLE IF NOT EXISTS alert_record (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255),
    target_id BIGINT,
    target_type VARCHAR(255),
    message TEXT,
    status VARCHAR(255),
    created_at TIMESTAMP
);

-- ==================================================================
-- 清理旧数据
-- ==================================================================
DELETE FROM alert_record;
DELETE FROM improvement_plan;
DELETE FROM evaluation;
DELETE FROM task;
DELETE FROM goal;
DELETE FROM employee;
DELETE FROM department;

-- ==================================================================
-- 插入测试数据
-- ==================================================================

-- 部门数据
INSERT INTO department (id, name, level, parent_id, function_desc, created_at, updated_at) VALUES
(1, '研发部', 1, NULL, '负责公司产品研发、技术创新', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '市场部', 1, NULL, '负责市场营销、品牌推广', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '销售部', 1, NULL, '负责产品销售、客户关系维护', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '人力资源部', 1, NULL, '负责人员招聘、培训、绩效管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '财务部', 1, NULL, '负责财务管理、预算控制', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, '前端组', 2, 1, '负责前端开发、UI实现', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, '后端组', 2, 1, '负责后端服务、API开发', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '测试组', 2, 1, '负责软件测试、质量保证', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 员工数据 (status: 1=在职, 0=离职)
INSERT INTO employee (id, emp_no, name, department_id, position_id, phone, email, join_date, status, created_at, updated_at) VALUES
(1, 'E001', '张三', 6, NULL, '13800001001', 'zhangsan@company.com', '2023-01-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'E002', '李四', 6, NULL, '13800001002', 'lisi@company.com', '2023-03-20', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'E003', '王五', 7, NULL, '13800001003', 'wangwu@company.com', '2022-11-10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'E004', '赵六', 7, NULL, '13800001004', 'zhaoliu@company.com', '2023-05-08', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'E005', '钱七', 8, NULL, '13800001005', 'qianqi@company.com', '2023-02-14', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'E006', '孙八', 8, NULL, '13800001006', 'sunba@company.com', '2022-09-25', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'E007', '周九', 2, NULL, '13800001007', 'zhoujiu@company.com', '2022-06-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'E008', '吴十', 2, NULL, '13800001008', 'wushi@company.com', '2023-07-01', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'E009', '郑十一', 3, NULL, '13800001009', 'zhengshiyi@company.com', '2022-08-20', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'E010', '王十二', 3, NULL, '13800001010', 'wangshier@company.com', '2023-04-10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'E011', '李经理', 4, NULL, '13800001011', 'lijingli@company.com', '2021-12-01', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'E012', '陈会计', 5, NULL, '13800001012', 'chenkuaiji@company.com', '2022-03-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 目标数据
INSERT INTO goal (id, employee_id, title, description, type, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, 1, 'Q1前端性能优化', '提升首页加载速度至2秒以内，优化核心交互体验', 'KPI', '2024-01-01', '2024-03-31', 85, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Q1组件库开发', '完成10个通用组件开发和文档编写', 'KPI', '2024-01-01', '2024-03-31', 80, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Q1 API开发', '完成用户模块、订单模块API开发', 'OKR', '2024-01-01', '2024-03-31', 90, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 'Q1微服务拆分', '完成单体应用向微服务架构迁移', 'OKR', '2024-01-01', '2024-03-31', 60, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 'Q1自动化测试', '自动化测试覆盖率达到80%', 'KPI', '2024-01-01', '2024-03-31', 81, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 7, 'Q1品牌推广', '社交媒体粉丝增长10000人', 'KPI', '2024-01-01', '2024-03-31', 85, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 9, 'Q1销售目标', '完成季度销售额500万元', 'KPI', '2024-01-01', '2024-03-31', 84, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 1, '2024年度技术提升', '掌握3项新技术，参与2次技术分享', 'OKR', '2024-01-01', '2024-12-31', 45, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 3, '2024年度架构优化', '完成系统架构升级，性能提升50%', 'OKR', '2024-01-01', '2024-12-31', 30, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 6, '2023年度测试优化', '建立完善的测试体系和流程', 'OKR', '2023-01-01', '2023-12-31', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 任务数据
INSERT INTO task (id, title, description, employee_id, goal_id, priority, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, '首页加载优化', '优化首页资源加载策略，实现懒加载', 1, 1, 'HIGH', '2024-01-05', '2024-01-20', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '图片压缩优化', '实现图片自动压缩和WebP格式转换', 1, 1, 'MEDIUM', '2024-01-21', '2024-02-05', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '缓存策略优化', '优化浏览器缓存和CDN配置', 1, 1, 'HIGH', '2024-02-06', '2024-02-25', 80, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Button组件开发', '开发通用Button组件及样式', 2, 2, 'HIGH', '2024-01-08', '2024-01-15', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Form组件开发', '开发表单组件和验证逻辑', 2, 2, 'HIGH', '2024-01-16', '2024-01-28', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Table组件开发', '开发数据表格组件', 2, 2, 'MEDIUM', '2024-01-29', '2024-02-15', 90, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, '用户登录API', '实现用户登录、注册、认证接口', 3, 3, 'HIGH', '2024-01-10', '2024-01-25', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '订单管理API', '实现订单创建、查询、更新接口', 3, 3, 'HIGH', '2024-01-26', '2024-02-15', 95, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, '支付接口对接', '对接第三方支付平台', 3, 3, 'MEDIUM', '2024-02-16', '2024-03-05', 60, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, '服务拆分方案设计', '设计微服务拆分方案和边界', 4, 4, 'HIGH', '2024-01-05', '2024-01-20', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, '用户服务迁移', '将用户模块迁移到独立服务', 4, 4, 'HIGH', '2024-01-21', '2024-02-15', 75, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, '服务间通信', '实现服务间RPC通信', 4, 4, 'MEDIUM', '2024-02-16', '2024-03-10', 40, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, '单元测试编写', '为核心模块编写单元测试', 5, 5, 'HIGH', '2024-01-10', '2024-02-10', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, '集成测试开发', '开发接口自动化测试', 5, 5, 'HIGH', '2024-02-11', '2024-03-05', 70, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'E2E测试搭建', '搭建端到端测试框架', 5, 5, 'MEDIUM', '2024-03-06', '2024-03-25', 30, 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 评估数据
INSERT INTO evaluation (id, employee_id, cycle_id, self_score, supervisor_score, peer_score, final_score, self_comment, supervisor_comment, status, created_at, updated_at) VALUES
(1, 1, NULL, 85.00, 88.00, 87.00, 86.67, '完成了性能优化目标', '工作认真负责，技术能力强，性能优化成果显著', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, NULL, 82.00, 85.00, 84.00, 83.67, '组件开发进展顺利', '组件开发质量高，文档完善，团队协作好', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, NULL, 90.00, 92.00, 89.00, 90.33, 'API开发超预期完成', '技术架构能力突出，代码质量优秀', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, NULL, 78.00, 80.00, 82.00, 80.00, '需要加强架构设计', '工作进度稳定，需加强架构设计能力', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, NULL, 88.00, 86.00, 87.00, 87.00, '测试覆盖率达标', '测试覆盖全面，发现了多个关键问题', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 6, NULL, 92.00, 90.00, 91.00, 91.00, '建立了测试体系', '测试经验丰富，建立了完善的测试体系', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 7, NULL, 86.00, 88.00, 85.00, 86.33, '品牌推广效果显著', '市场策划能力强，品牌推广效果好', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 9, NULL, 84.00, 87.00, 86.00, 85.67, '销售业绩优秀', '销售业绩优秀，客户关系维护良好', 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 改进计划数据
INSERT INTO improvement_plan (id, employee_id, evaluation_id, goal, measures, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, 2, 2, '掌握前端架构设计，能独立设计大型应用架构', '1. 学习微前端架构\n2. 研究状态管理最佳实践\n3. 参与架构设计评审', '2024-02-01', '2024-05-31', 35, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 4, '提升系统架构设计能力，能设计高可用系统', '1. 学习分布式系统设计\n2. 阅读架构设计书籍\n3. 参与架构评审会议', '2024-02-01', '2024-06-30', 28, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 5, 5, '掌握性能测试和压测技能', '1. 学习JMeter工具\n2. 进行实战性能测试\n3. 编写性能测试报告', '2024-03-01', '2024-05-31', 15, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 8, NULL, '提升市场数据分析和报表能力', '1. 学习数据分析工具\n2. 掌握统计分析方法\n3. 输出数据分析报告', '2024-02-15', '2024-05-15', 40, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 预警记录数据
INSERT INTO alert_record (id, type, target_id, target_type, message, status, created_at) VALUES
(1, 'GOAL_DELAY', 4, 'EMPLOYEE', '目标进度落后：员工赵六的"Q1微服务拆分"目标进度60%，低于预期75%', 'UNREAD', CURRENT_TIMESTAMP),
(2, 'TASK_OVERDUE', 15, 'TASK', '任务即将逾期：员工钱七的"E2E测试搭建"任务即将到期，当前进度30%', 'UNREAD', CURRENT_TIMESTAMP),
(3, 'PERFORMANCE_LOW', 4, 'EMPLOYEE', '绩效偏低预警：员工赵六本月评分80分，建议关注', 'READ', CURRENT_TIMESTAMP),
(4, 'GOAL_EXCELLENT', 3, 'EMPLOYEE', '目标完成优秀：员工王五的"Q1 API开发"进度达90%，表现优秀', 'READ', CURRENT_TIMESTAMP);

-- ==================================================================
-- 验证数据
-- ==================================================================
SELECT 'Department' as table_name, COUNT(*) as count FROM department
UNION ALL
SELECT 'Employee', COUNT(*) FROM employee
UNION ALL
SELECT 'Goal', COUNT(*) FROM goal
UNION ALL
SELECT 'Task', COUNT(*) FROM task
UNION ALL
SELECT 'Evaluation', COUNT(*) FROM evaluation
UNION ALL
SELECT 'ImprovementPlan', COUNT(*) FROM improvement_plan
UNION ALL
SELECT 'AlertRecord', COUNT(*) FROM alert_record;
