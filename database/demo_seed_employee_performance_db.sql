-- 模块说明：数据库种子数据脚本，提供初始化与重置时的基础样例数据。
-- 行注释：设置数据库连接字符集，保证中文数据正常写入和读取。
SET NAMES utf8mb4;
-- 行注释：选择当前脚本要操作的 MySQL 数据库。
USE employee_performance_db;

-- 行注释：开启事务，确保一组数据操作可以整体提交。
START TRANSACTION;

-- 清理业务数据（保留 users 用户表）
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM alert_record;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM operation_log;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM system_config;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM improvement_plan;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM feedback;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM evaluation;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM evaluation_cycle;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM evaluation_dimension;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM work_result;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM task;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM goal_adjustment;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM goal;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM employee;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM position;
-- 行注释：清理该表中的旧数据，避免重复导入演示数据。
DELETE FROM department;

-- 部门数据
-- 行注释：向 department 表插入演示数据。
INSERT INTO department (id, name, parent_id, level, function_desc, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, '研发部', NULL, 1, '负责公司产品研发、技术创新', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, '市场部', NULL, 1, '负责市场营销、品牌推广', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, '销售部', NULL, 1, '负责产品销售、客户关系维护', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, '人力资源部', NULL, 1, '负责人员招聘、培训、绩效管理', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, '财务部', NULL, 1, '负责财务管理、预算控制', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, '前端组', 1, 2, '负责 Web 前端开发与交互实现', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, '后端组', 1, 2, '负责后端服务、接口与数据处理', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, '测试组', 1, 2, '负责测试体系建设与质量保障', NOW(), NOW());

-- 岗位数据
-- 行注释：向 position 表插入演示数据。
INSERT INTO position (id, name, level, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, '高级前端工程师', 'manager', NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, '前端工程师', 'specialist', NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, '高级后端工程师', 'manager', NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, '后端工程师', 'specialist', NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, '测试工程师', 'specialist', NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, '高级测试工程师', 'supervisor', NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, '市场经理', 'manager', NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, '市场专员', 'specialist', NOW()),
-- 行注释：定义一条演示记录的字段值。
(9, '销售经理', 'manager', NOW()),
-- 行注释：定义一条演示记录的字段值。
(10, '销售代表', 'specialist', NOW()),
-- 行注释：定义一条演示记录的字段值。
(11, '人力资源经理', 'manager', NOW()),
-- 行注释：定义一条演示记录的字段值。
(12, '财务主管', 'supervisor', NOW());

-- 员工数据
-- 行注释：向 employee 表插入演示数据。
INSERT INTO employee (id, emp_no, name, position_id, department_id, supervisor_id, join_date, phone, email, status, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 'E001', '张三', 1, 6, NULL, '2023-01-15', '13800001001', 'zhangsan@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 'E002', '李四', 2, 6, 1, '2023-03-20', '13800001002', 'lisi@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 'E003', '王五', 3, 7, 1, '2022-11-10', '13800001003', 'wangwu@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 'E004', '赵六', 4, 7, 3, '2023-05-08', '13800001004', 'zhaoliu@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 'E005', '钱七', 5, 8, 3, '2023-02-14', '13800001005', 'qianqi@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 'E006', '孙八', 6, 8, 5, '2022-09-25', '13800001006', 'sunba@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 'E007', '周九', 7, 2, 1, '2022-06-15', '13800001007', 'zhoujiu@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 'E008', '吴十', 8, 2, 7, '2023-07-01', '13800001008', 'wushi@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(9, 'E009', '郑十一', 9, 3, 1, '2022-08-20', '13800001009', 'zhengshiyi@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(10, 'E010', '王十二', 10, 3, 9, '2023-04-10', '13800001010', 'wangshier@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(11, 'E011', '李经理', 11, 4, 1, '2021-12-01', '13800001011', 'lijingli@company.com', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(12, 'E012', '陈会计', 12, 5, 1, '2022-03-15', '13800001012', 'chenkuaiji@company.com', 1, NOW(), NOW());

-- 目标数据
-- 行注释：向 goal 表插入演示数据。
INSERT INTO goal (id, employee_id, department_id, title, description, type, start_date, end_date, status, progress, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 6, 'Q1前端性能优化', '提升首页加载速度至2秒以内，优化核心交互体验', 'KPI', '2026-01-01', '2026-03-31', 'in_progress', 85, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 2, 6, 'Q1组件库开发', '完成10个通用组件开发和文档编写', 'KPI', '2026-01-01', '2026-03-31', 'in_progress', 80, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 3, 7, 'Q1 API开发', '完成用户模块、订单模块API开发', 'OKR', '2026-01-01', '2026-03-31', 'in_progress', 90, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 4, 7, 'Q1微服务拆分', '完成单体应用向微服务架构迁移', 'OKR', '2026-01-01', '2026-03-31', 'in_progress', 60, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 5, 8, 'Q1自动化测试', '自动化测试覆盖率达到80%', 'KPI', '2026-01-01', '2026-03-31', 'in_progress', 81, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 7, 2, 'Q1品牌推广', '社交媒体粉丝增长10000人', 'KPI', '2026-01-01', '2026-03-31', 'in_progress', 85, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 9, 3, 'Q1销售目标', '完成季度销售额500万元', 'KPI', '2026-01-01', '2026-03-31', 'in_progress', 84, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 1, 6, '2026年度技术提升', '掌握3项新技术，参与2次技术分享', 'OKR', '2026-01-01', '2026-12-31', 'in_progress', 45, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(9, 3, 7, '2026年度架构优化', '完成系统架构升级，性能提升50%', 'OKR', '2026-01-01', '2026-12-31', 'in_progress', 30, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(10, 6, 8, '2025年度测试优化', '建立完善的测试体系和流程', 'OKR', '2025-01-01', '2025-12-31', 'completed', 100, NOW(), NOW());

-- 目标调整记录
-- 行注释：向 goal_adjustment 表插入演示数据。
INSERT INTO goal_adjustment (id, goal_id, applicant_id, approver_id, reason, old_content, new_content, status, approval_comment, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 4, 3, 11, '需求范围扩大，需延后里程碑', 'Q1完成微服务拆分', 'Q1完成核心服务拆分，Q2完成全量迁移', 'pending', NULL, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 2, 2, 1, '补充可访问性要求', '完成10个通用组件开发', '完成10个组件并补充无障碍能力', 'approved', '调整合理，按新计划执行', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 7, 9, 1, '市场策略调整，目标需上调', '季度销售额500万元', '季度销售额560万元', 'rejected', '当前资源不足，暂不调整', NOW(), NOW());

-- 任务数据
-- 行注释：向 task 表插入演示数据。
INSERT INTO task (id, employee_id, goal_id, title, description, priority, estimated_hours, status, progress, start_date, end_date, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 1, '首页加载优化', '优化首页资源加载策略，实现懒加载', 'high', 20.00, 'completed', 100, '2026-01-05', '2026-01-20', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 1, 1, '图片压缩优化', '实现图片自动压缩和WebP格式转换', 'medium', 24.00, 'completed', 100, '2026-01-21', '2026-02-05', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 1, 1, '缓存策略优化', '优化浏览器缓存和CDN配置', 'high', 32.00, 'in_progress', 80, '2026-02-06', '2026-02-25', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 2, 2, 'Button组件开发', '开发通用Button组件及样式', 'high', 24.00, 'completed', 100, '2026-01-08', '2026-01-15', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 2, 2, 'Form组件开发', '开发表单组件和验证逻辑', 'high', 32.00, 'completed', 100, '2026-01-16', '2026-01-28', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 2, 2, 'Table组件开发', '开发数据表格组件', 'medium', 36.00, 'in_progress', 90, '2026-01-29', '2026-02-15', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 3, 3, '用户登录API', '实现用户登录、注册、认证接口', 'high', 30.00, 'completed', 100, '2026-01-10', '2026-01-25', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 3, 3, '订单管理API', '实现订单创建、查询、更新接口', 'high', 40.00, 'in_progress', 95, '2026-01-26', '2026-02-15', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(9, 3, 3, '支付接口对接', '对接第三方支付平台', 'medium', 36.00, 'in_progress', 60, '2026-02-16', '2026-03-05', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(10, 4, 4, '服务拆分方案设计', '设计微服务拆分方案和边界', 'high', 30.00, 'completed', 100, '2026-01-05', '2026-01-20', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(11, 4, 4, '用户服务迁移', '将用户模块迁移到独立服务', 'high', 45.00, 'in_progress', 75, '2026-01-21', '2026-02-15', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(12, 4, 4, '服务间通信', '实现服务间RPC通信', 'medium', 38.00, 'in_progress', 40, '2026-02-16', '2026-03-10', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(13, 5, 5, '单元测试编写', '为核心模块编写单元测试', 'high', 42.00, 'completed', 100, '2026-01-10', '2026-02-10', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(14, 5, 5, '集成测试开发', '开发接口自动化测试', 'high', 48.00, 'in_progress', 70, '2026-02-11', '2026-03-05', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(15, 5, 5, 'E2E测试搭建', '搭建端到端测试框架', 'medium', 40.00, 'pending', 30, '2026-03-06', '2026-03-25', NOW(), NOW());

-- 工作成果数据
-- 行注释：向 work_result 表插入演示数据。
INSERT INTO work_result (id, task_id, employee_id, title, file_path, description, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 1, '首页性能优化报告', '/uploads/perf/homepage-optimization.pdf', '完成首页首屏渲染优化，LCP下降35%。', NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 4, 2, 'Button组件设计规范', '/uploads/component/button-spec.docx', '提交Button组件设计和使用规范。', NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 7, 3, '登录接口联调记录', '/uploads/api/login-api-test.xlsx', '完成登录认证接口联调，附测试结果。', NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 10, 4, '微服务拆分方案v1', '/uploads/arch/split-plan-v1.pptx', '完成服务边界划分和迁移路线图。', NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 13, 5, '单元测试覆盖率报告', '/uploads/test/unit-coverage.html', '核心模块单测覆盖率达到82%。', NOW());

-- 评估维度数据
-- 行注释：向 evaluation_dimension 表插入演示数据。
INSERT INTO evaluation_dimension (id, name, weight, position_type, description, enabled, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, '工作业绩', 0.40, 'all', '目标达成质量与效率', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, '协作能力', 0.20, 'all', '跨团队沟通与协作表现', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, '执行力', 0.20, 'all', '任务推进速度与结果交付', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, '创新能力', 0.20, 'tech', '方案创新与改进意识', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, '客户导向', 0.30, 'sales', '客户需求理解与满意度', 1, NOW(), NOW());

-- 评估周期数据
-- 行注释：向 evaluation_cycle 表插入演示数据。
INSERT INTO evaluation_cycle (id, name, type, start_date, end_date, status, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, '2026年第一季度评估', 'quarterly', '2026-01-01', '2026-03-31', 'completed', NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, '2026年第二季度评估', 'quarterly', '2026-04-01', '2026-06-30', 'active', NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, '2026年第三季度评估', 'quarterly', '2026-07-01', '2026-09-30', 'pending', NOW());

-- 评估记录数据
-- 行注释：向 evaluation 表插入演示数据。
INSERT INTO evaluation (id, cycle_id, employee_id, self_score, supervisor_score, peer_score, final_score, self_comment, supervisor_comment, status, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 1, 85.00, 88.00, 87.00, 86.67, '完成了性能优化目标', '工作认真负责，技术能力强，性能优化成果显著', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 1, 2, 82.00, 85.00, 84.00, 83.67, '组件开发进展顺利', '组件开发质量高，文档完善，团队协作好', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 1, 3, 90.00, 92.00, 89.00, 90.33, 'API开发超预期完成', '技术架构能力突出，代码质量优秀', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 1, 4, 78.00, 80.00, 82.00, 80.00, '需要加强架构设计', '工作进度稳定，需加强架构设计能力', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 1, 5, 88.00, 86.00, 87.00, 87.00, '测试覆盖率达标', '测试覆盖全面，发现了多个关键问题', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 1, 6, 92.00, 90.00, 91.00, 91.00, '建立了测试体系', '测试经验丰富，建立了完善的测试体系', 'completed', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 2, 7, 86.00, 88.00, 85.00, 86.33, '品牌推广效果显著', '市场策划能力强，品牌推广效果好', 'in_progress', NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 2, 9, 84.00, NULL, NULL, NULL, '销售业绩优秀，等待主管评分', NULL, 'pending', NOW(), NOW());

-- 反馈数据
-- 行注释：向 feedback 表插入演示数据。
INSERT INTO feedback (id, evaluation_id, employee_id, supervisor_id, content, feedback_date, confirmed, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 1, 11, '本季度表现突出，建议继续承担核心项目。', '2026-04-02', 1, NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 2, 2, 11, '组件交付稳定，建议加强性能优化方面训练。', '2026-04-03', 0, NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 4, 4, 11, '架构能力有提升空间，建议增加评审参与。', '2026-04-04', 0, NOW());

-- 改进计划数据
-- 行注释：向 improvement_plan 表插入演示数据。
INSERT INTO improvement_plan (id, employee_id, evaluation_id, goal, measures, start_date, end_date, status, progress, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 2, 2, '掌握前端架构设计，能独立设计大型应用架构', '1. 学习微前端架构\n2. 研究状态管理最佳实践\n3. 参与架构设计评审', '2026-02-01', '2026-05-31', 'in_progress', 35, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 4, 4, '提升系统架构设计能力，能设计高可用系统', '1. 学习分布式系统设计\n2. 阅读架构设计书籍\n3. 参与架构评审会议', '2026-02-01', '2026-06-30', 'in_progress', 28, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 5, 5, '掌握性能测试和压测技能', '1. 学习JMeter工具\n2. 进行实战性能测试\n3. 编写性能测试报告', '2026-03-01', '2026-05-31', 'pending', 15, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 8, NULL, '提升市场数据分析和报表能力', '1. 学习数据分析工具\n2. 掌握统计分析方法\n3. 输出数据分析报告', '2026-02-15', '2026-05-15', 'completed', 100, NOW(), NOW());

-- 系统配置数据
-- 行注释：向 system_config 表插入演示数据。
INSERT INTO system_config (id, config_key, config_value, description) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 'evaluation.remind_days', '7', '评估截止前提醒天数'),
-- 行注释：定义一条演示记录的字段值。
(2, 'goal.warning_threshold', '60', '目标进度预警阈值'),
-- 行注释：定义一条演示记录的字段值。
(3, 'task.overdue.alert_enabled', 'true', '是否开启任务逾期提醒'),
-- 行注释：定义一条演示记录的字段值。
(4, 'evaluation.weight.self', '0.2', '自评分权重'),
-- 行注释：定义一条演示记录的字段值。
(5, 'evaluation.weight.supervisor', '0.6', '上级评分权重'),
-- 行注释：定义一条演示记录的字段值。
(6, 'evaluation.weight.peer', '0.2', '同事评分权重'),
-- 行注释：定义一条演示记录的字段值。
(7, 'work.hours_per_day', '8', '标准每日工时'),
-- 行注释：定义一条演示记录的字段值。
(8, 'work.days_per_week', '5', '标准每周工作日');

-- 预警记录数据
-- 行注释：向 alert_record 表插入演示数据。
INSERT INTO alert_record (id, type, target_id, target_type, message, status, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 'goal_delay', 4, 'goal', '目标「Q1微服务拆分」当前进度低于预期，请及时关注。', 'unread', NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 'goal_delay', 5, 'goal', '目标「Q1自动化测试」存在交付风险。', 'read', NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 'evaluation_pending', 8, 'evaluation', '员工ID:9 的评估已待处理超过7天。', 'unread', NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 'evaluation_pending', 7, 'evaluation', '员工ID:7 的评估仍处于待处理状态。', 'unread', NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 'task_overdue', 15, 'task', '任务「E2E测试搭建」临近截止且进度偏低。', 'read', NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 'abnormal_data', 2, 'evaluation', '评估分数波动较大，建议人工复核。', 'read', NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 'goal_delay', 8, 'goal', '年度技术提升目标需要跟进推进。', 'unread', NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 'task_overdue', 9, 'task', '任务「支付接口对接」排期较紧，请注意风险。', 'unread', NOW());

-- 操作日志数据
-- 行注释：向 operation_log 表插入演示数据。
INSERT INTO operation_log (id, user_id, username, operation, module, content, ip, user_agent, created_at) VALUES
-- 行注释：定义一条演示记录的字段值。
(1, 1, 'admin', 'login', 'auth', '管理员登录成功', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(2, 1, 'admin', 'create', 'department', '新增部门：前端组', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(3, 1, 'admin', 'create', 'employee', '新增员工：张三', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(4, 1, 'admin', 'create', 'goal', '新增目标：Q1前端性能优化', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(5, 1, 'admin', 'update', 'goal', '更新目标进度：Q1组件库开发', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(6, 1, 'admin', 'create', 'task', '新增任务：用户登录API', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(7, 1, 'admin', 'update', 'task', '更新任务状态：支付接口对接', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(8, 1, 'admin', 'read', 'statistics', '查看仪表盘总览', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(9, 1, 'admin', 'read', 'statistics', '查看目标完成率图表', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(10, 1, 'admin', 'approve', 'goal_adjustment', '通过目标调整申请 #2', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(11, 1, 'admin', 'reject', 'goal_adjustment', '驳回目标调整申请 #3', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(12, 1, 'admin', 'create', 'evaluation', '创建第二季度评估草稿', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(13, 1, 'admin', 'update', 'evaluation', '更新评估状态为已完成', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(14, 1, 'admin', 'create', 'feedback', '新增员工反馈记录', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(15, 1, 'admin', 'create', 'improvement_plan', '新增改进计划：架构设计能力提升', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(16, 1, 'admin', 'update', 'system_config', '更新配置：评估提醒天数', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(17, 1, 'admin', 'read', 'alert', '查看未读预警列表', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(18, 1, 'admin', 'confirm', 'feedback', '确认反馈记录 #1', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(19, 1, 'admin', 'export', 'employee', '导出员工列表', '127.0.0.1', 'Mozilla/5.0', NOW()),
-- 行注释：定义一条演示记录的字段值。
(20, 1, 'admin', 'logout', 'auth', '管理员退出登录', '127.0.0.1', 'Mozilla/5.0', NOW());

-- 用于演示账号切换的额外用户（密码哈希对应明文 "admin"）
-- 行注释：向 users 表插入演示数据。
INSERT INTO users (username, password, real_name, email, phone, role, enabled, created_at, updated_at) VALUES
-- 行注释：定义一条演示记录的字段值。
('manager', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '演示主管', 'manager@company.local', '13800000100', 'MANAGER', 1, NOW(), NOW()),
-- 行注释：定义一条演示记录的字段值。
('employee', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '演示员工', 'employee@company.local', '13800000101', 'USER', 1, NOW(), NOW())
-- 行注释：主键或唯一键冲突时执行更新，避免重复插入失败。
ON DUPLICATE KEY UPDATE
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
real_name = VALUES(real_name),
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
email = VALUES(email),
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
phone = VALUES(phone),
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
role = VALUES(role),
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
enabled = VALUES(enabled),
-- 行注释：结束当前 SQL 语句。
updated_at = NOW();

-- 保持演示账号与当前 admin 密码一致
-- 行注释：更新已有记录，使演示账号或业务数据保持一致。
UPDATE users
-- 行注释：定义字段、索引或外键约束，描述表结构规则。
SET password = (SELECT password FROM (SELECT password FROM users WHERE username = 'admin') x),
    -- 行注释：当前 SQL 行参与完成数据库结构或演示数据初始化。
    updated_at = NOW()
-- 行注释：限定更新或查询影响的数据范围。
WHERE username IN ('manager', 'employee');

-- 行注释：提交事务，让前面的数据变更正式生效。
COMMIT;
