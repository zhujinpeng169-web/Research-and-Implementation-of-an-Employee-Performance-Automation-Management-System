-- ============================================
-- 正确的测试数据导入脚本（MySQL 版本）
-- 目标：让前端各模块打开即有可展示数据
-- ============================================

-- 清理旧数据（按依赖顺序倒序删除）
DELETE FROM goal_adjustment WHERE 1=1;
DELETE FROM work_result WHERE 1=1;
DELETE FROM feedback WHERE 1=1;
DELETE FROM alert_record WHERE 1=1;
DELETE FROM improvement_plan WHERE 1=1;
DELETE FROM evaluation WHERE 1=1;
DELETE FROM task WHERE 1=1;
DELETE FROM goal WHERE 1=1;
DELETE FROM employee WHERE 1=1;
DELETE FROM department WHERE 1=1;
DELETE FROM evaluation_dimension WHERE 1=1;
DELETE FROM evaluation_cycle WHERE 1=1;
DELETE FROM position WHERE 1=1;
DELETE FROM system_config WHERE 1=1;

-- 1. 岗位数据
INSERT INTO position (id, name, level, created_at) VALUES
(1, '高级前端工程师', 'manager', CURRENT_TIMESTAMP),
(2, '前端工程师', 'specialist', CURRENT_TIMESTAMP),
(3, '高级后端工程师', 'manager', CURRENT_TIMESTAMP),
(4, '后端工程师', 'specialist', CURRENT_TIMESTAMP),
(5, '测试工程师', 'specialist', CURRENT_TIMESTAMP),
(6, '高级测试工程师', 'supervisor', CURRENT_TIMESTAMP),
(7, '市场经理', 'manager', CURRENT_TIMESTAMP),
(8, '市场专员', 'specialist', CURRENT_TIMESTAMP),
(9, '销售经理', 'manager', CURRENT_TIMESTAMP),
(10, '销售代表', 'specialist', CURRENT_TIMESTAMP),
(11, 'HR经理', 'manager', CURRENT_TIMESTAMP),
(12, '财务主管', 'supervisor', CURRENT_TIMESTAMP);

-- 2. 部门数据
INSERT INTO department (id, name, level, parent_id, function_desc, created_at, updated_at) VALUES
(1, '研发部', 1, NULL, '负责公司产品研发、技术创新', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '市场部', 1, NULL, '负责市场营销、品牌推广', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '销售部', 1, NULL, '负责产品销售、客户关系维护', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '人力资源部', 1, NULL, '负责人员招聘、培训、绩效管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '财务部', 1, NULL, '负责财务管理、预算控制', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, '前端组', 2, 1, '负责前端开发、UI实现', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, '后端组', 2, 1, '负责后端服务、API开发', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '测试组', 2, 1, '负责软件测试、质量保证', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 3. 员工数据
INSERT INTO employee (id, emp_no, name, department_id, position_id, phone, email, join_date, status, created_at, updated_at) VALUES
(1, 'E001', '张三', 6, 1, '13800001001', 'zhangsan@company.com', '2023-01-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'E002', '李四', 6, 2, '13800001002', 'lisi@company.com', '2023-03-20', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'E003', '王五', 7, 3, '13800001003', 'wangwu@company.com', '2022-11-10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'E004', '赵六', 7, 4, '13800001004', 'zhaoliu@company.com', '2023-05-08', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'E005', '钱七', 8, 5, '13800001005', 'qianqi@company.com', '2023-02-14', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'E006', '孙八', 8, 6, '13800001006', 'sunba@company.com', '2022-09-25', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'E007', '周九', 2, 7, '13800001007', 'zhoujiu@company.com', '2022-06-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'E008', '吴十', 2, 8, '13800001008', 'wushi@company.com', '2023-07-01', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'E009', '郑十一', 3, 9, '13800001009', 'zhengshiyi@company.com', '2022-08-20', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'E010', '王十二', 3, 10, '13800001010', 'wangshier@company.com', '2023-04-10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'E011', '李经理', 4, 11, '13800001011', 'lijingli@company.com', '2021-12-01', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'E012', '陈会计', 5, 12, '13800001012', 'chenkuaiji@company.com', '2022-03-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 4. 评估周期
INSERT INTO evaluation_cycle (id, name, type, start_date, end_date, status, created_at) VALUES
(1, '2026年第一季度评估', 'quarterly', '2026-01-01', '2026-03-31', 'completed', CURRENT_TIMESTAMP),
(2, '2026年第二季度评估', 'quarterly', '2026-04-01', '2026-06-30', 'active', CURRENT_TIMESTAMP),
(3, '2026年第三季度评估', 'quarterly', '2026-07-01', '2026-09-30', 'pending', CURRENT_TIMESTAMP);

-- 5. 评估维度
INSERT INTO evaluation_dimension (id, name, description, weight, position_type, enabled, created_at, updated_at) VALUES
(1, '工作业绩', '目标达成质量与效率', 0.40, 'all', b'1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '协作能力', '跨团队沟通与协作表现', 0.20, 'all', b'1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '执行力', '任务推进速度与结果交付', 0.20, 'all', b'1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '创新能力', '方案创新与改进意识', 0.20, 'tech', b'1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '客户导向', '客户需求理解与满意度', 0.30, 'sales', b'1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 6. 目标数据
INSERT INTO goal (id, employee_id, title, description, type, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, 1, 'Q1前端性能优化', '提升首页加载速度至2秒以内，优化核心交互体验', 'KPI', '2026-01-01', '2026-03-31', 85, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Q1组件库开发', '完成10个通用组件开发和文档编写', 'KPI', '2026-01-01', '2026-03-31', 80, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Q1 API开发', '完成用户模块、订单模块API开发', 'OKR', '2026-01-01', '2026-03-31', 90, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 'Q1微服务拆分', '完成单体应用向微服务架构迁移', 'OKR', '2026-01-01', '2026-03-31', 60, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 'Q1自动化测试', '自动化测试覆盖率达到80%', 'KPI', '2026-01-01', '2026-03-31', 81, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 7, 'Q1品牌推广', '社交媒体粉丝增长10000人', 'KPI', '2026-01-01', '2026-03-31', 85, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 9, 'Q1销售目标', '完成季度销售额500万元', 'KPI', '2026-01-01', '2026-03-31', 84, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 1, '2026年度技术提升', '掌握3项新技术，参与2次技术分享', 'OKR', '2026-01-01', '2026-12-31', 45, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 3, '2026年度架构优化', '完成系统架构升级，性能提升50%', 'OKR', '2026-01-01', '2026-12-31', 30, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 6, '2025年度测试优化', '建立完善的测试体系和流程', 'OKR', '2025-01-01', '2025-12-31', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 7. 任务数据
INSERT INTO task (id, title, description, employee_id, goal_id, priority, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, '首页加载优化', '优化首页资源加载策略，实现懒加载', 1, 1, 'high', '2026-01-05', '2026-01-20', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '图片压缩优化', '实现图片自动压缩和WebP格式转换', 1, 1, 'medium', '2026-01-21', '2026-02-05', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '缓存策略优化', '优化浏览器缓存和CDN配置', 1, 1, 'high', '2026-02-06', '2026-02-25', 80, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Button组件开发', '开发通用Button组件及样式', 2, 2, 'high', '2026-01-08', '2026-01-15', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Form组件开发', '开发表单组件和验证逻辑', 2, 2, 'high', '2026-01-16', '2026-01-28', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Table组件开发', '开发数据表格组件', 2, 2, 'medium', '2026-01-29', '2026-02-15', 90, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, '用户登录API', '实现用户登录、注册、认证接口', 3, 3, 'high', '2026-01-10', '2026-01-25', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '订单管理API', '实现订单创建、查询、更新接口', 3, 3, 'high', '2026-01-26', '2026-02-15', 95, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, '支付接口对接', '对接第三方支付平台', 3, 3, 'medium', '2026-02-16', '2026-03-05', 60, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, '服务拆分方案设计', '设计微服务拆分方案和边界', 4, 4, 'high', '2026-01-05', '2026-01-20', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, '用户服务迁移', '将用户模块迁移到独立服务', 4, 4, 'high', '2026-01-21', '2026-02-15', 75, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, '服务间通信', '实现服务间RPC通信', 4, 4, 'medium', '2026-02-16', '2026-03-10', 40, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, '单元测试编写', '为核心模块编写单元测试', 5, 5, 'high', '2026-01-10', '2026-02-10', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, '集成测试开发', '开发接口自动化测试', 5, 5, 'high', '2026-02-11', '2026-03-05', 70, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'E2E测试搭建', '搭建端到端测试框架', 5, 5, 'medium', '2026-03-06', '2026-03-25', 30, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 8. 评估数据
INSERT INTO evaluation (id, employee_id, cycle_id, self_score, supervisor_score, peer_score, final_score, self_comment, supervisor_comment, status, created_at, updated_at) VALUES
(1, 1, 1, 85.00, 88.00, 87.00, 86.67, '完成了性能优化目标', '工作认真负责，技术能力强，性能优化成果显著', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 1, 82.00, 85.00, 84.00, 83.67, '组件开发进展顺利', '组件开发质量高，文档完善，团队协作好', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 1, 90.00, 92.00, 89.00, 90.33, 'API开发超预期完成', '技术架构能力突出，代码质量优秀', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 1, 78.00, 80.00, 82.00, 80.00, '需要加强架构设计', '工作进度稳定，需加强架构设计能力', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 1, 88.00, 86.00, 87.00, 87.00, '测试覆盖率达标', '测试覆盖全面，发现了多个关键问题', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 6, 1, 92.00, 90.00, 91.00, 91.00, '建立了测试体系', '测试经验丰富，建立了完善的测试体系', 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 7, 2, 86.00, 88.00, 85.00, 86.33, '品牌推广效果显著', '市场策划能力强，品牌推广效果好', 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 9, 2, 84.00, NULL, NULL, NULL, '销售业绩优秀，等待主管评分', NULL, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 9. 改进计划
INSERT INTO improvement_plan (id, employee_id, evaluation_id, goal, measures, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, 2, 2, '掌握前端架构设计，能独立设计大型应用架构', '1. 学习微前端架构\n2. 研究状态管理最佳实践\n3. 参与架构设计评审', '2026-02-01', '2026-05-31', 35, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 4, '提升系统架构设计能力，能设计高可用系统', '1. 学习分布式系统设计\n2. 阅读架构设计书籍\n3. 参与架构评审会议', '2026-02-01', '2026-06-30', 28, 'in_progress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 5, 5, '掌握性能测试和压测技能', '1. 学习JMeter工具\n2. 进行实战性能测试\n3. 编写性能测试报告', '2026-03-01', '2026-05-31', 15, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 8, NULL, '提升市场数据分析和报表能力', '1. 学习数据分析工具\n2. 掌握统计分析方法\n3. 输出数据分析报告', '2026-02-15', '2026-05-15', 100, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 10. 反馈记录
INSERT INTO feedback (id, evaluation_id, employee_id, supervisor_id, content, feedback_date, confirmed, created_at) VALUES
(1, 1, 1, 11, '本季度表现突出，建议继续承担核心项目。', '2026-04-02', 1, CURRENT_TIMESTAMP),
(2, 2, 2, 11, '组件交付稳定，建议加强性能优化方面训练。', '2026-04-03', 0, CURRENT_TIMESTAMP),
(3, 4, 4, 11, '架构能力有提升空间，建议增加评审参与。', '2026-04-04', 0, CURRENT_TIMESTAMP);

-- 11. 工作成果
INSERT INTO work_result (id, task_id, employee_id, title, file_path, description, created_at) VALUES
(1, 1, 1, '首页性能优化报告', '/uploads/perf/homepage-optimization.pdf', '完成首页首屏渲染优化，LCP下降35%。', CURRENT_TIMESTAMP),
(2, 4, 2, 'Button组件设计规范', '/uploads/component/button-spec.docx', '提交Button组件设计和使用规范。', CURRENT_TIMESTAMP),
(3, 7, 3, '登录接口联调记录', '/uploads/api/login-api-test.xlsx', '完成登录认证接口联调，附测试结果。', CURRENT_TIMESTAMP),
(4, 10, 4, '微服务拆分方案v1', '/uploads/arch/split-plan-v1.pptx', '完成服务边界划分和迁移路线图。', CURRENT_TIMESTAMP),
(5, 13, 5, '单元测试覆盖率报告', '/uploads/test/unit-coverage.html', '核心模块单测覆盖率达到82%。', CURRENT_TIMESTAMP);

-- 12. 目标调整
INSERT INTO goal_adjustment (id, goal_id, reason, old_content, new_content, status, applicant_id, approver_id, approval_comment, created_at, updated_at) VALUES
(1, 4, '需求范围扩大，需延后里程碑', 'Q1完成微服务拆分', 'Q1完成核心服务拆分，Q2完成全量迁移', 'pending', 3, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, '补充可访问性要求', '完成10个通用组件开发', '完成10个组件并补充无障碍能力', 'approved', 3, 2, '调整合理，按新计划执行', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 7, '市场策略调整，目标需上调', '季度销售额500万元', '季度销售额560万元', 'rejected', 3, 2, '当前资源不足，暂不调整', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 13. 预警记录
INSERT INTO alert_record (id, type, target_id, target_type, message, status, created_at) VALUES
(1, 'goal_delay', 4, 'goal', '目标「Q1微服务拆分」距离截止日期不足7天，当前进度60%。', 'unread', CURRENT_TIMESTAMP),
(2, 'task_delay', 15, 'task', '任务「E2E测试搭建」即将逾期，当前进度30%。', 'unread', CURRENT_TIMESTAMP),
(3, 'evaluation_pending', 8, 'evaluation', '员工ID:9 的评估已待处理超过7天。', 'read', CURRENT_TIMESTAMP),
(4, 'abnormal_data', 3, 'evaluation', '员工ID:3 的评估得分波动较大，建议复核。', 'read', CURRENT_TIMESTAMP);

-- 14. 系统配置
INSERT INTO system_config (id, config_key, config_value, description) VALUES
(1, 'evaluation.self.weight', '0.2', '自评权重'),
(2, 'evaluation.supervisor.weight', '0.6', '上级评分权重'),
(3, 'evaluation.peer.weight', '0.2', '同事评分权重'),
(4, 'permission.goal.adjust.approval', 'manager,admin', '目标调整审批角色'),
(5, 'permission.export.enabled', 'true', '是否允许导出'),
(6, 'system.alert.reminder_days', '3', '预警提前提醒天数'),
(7, 'system.dashboard.refresh_interval', '300', '看板自动刷新间隔（秒）');

-- 验证数据
SELECT 'position' AS table_name, COUNT(*) AS count FROM position
UNION ALL
SELECT 'department', COUNT(*) FROM department
UNION ALL
SELECT 'employee', COUNT(*) FROM employee
UNION ALL
SELECT 'evaluation_cycle', COUNT(*) FROM evaluation_cycle
UNION ALL
SELECT 'evaluation_dimension', COUNT(*) FROM evaluation_dimension
UNION ALL
SELECT 'goal', COUNT(*) FROM goal
UNION ALL
SELECT 'task', COUNT(*) FROM task
UNION ALL
SELECT 'evaluation', COUNT(*) FROM evaluation
UNION ALL
SELECT 'improvement_plan', COUNT(*) FROM improvement_plan
UNION ALL
SELECT 'feedback', COUNT(*) FROM feedback
UNION ALL
SELECT 'work_result', COUNT(*) FROM work_result
UNION ALL
SELECT 'goal_adjustment', COUNT(*) FROM goal_adjustment
UNION ALL
SELECT 'alert_record', COUNT(*) FROM alert_record
UNION ALL
SELECT 'system_config', COUNT(*) FROM system_config;
