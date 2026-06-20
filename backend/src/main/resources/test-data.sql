-- ============================================
-- 测试数据 - 员工效能管理系统
-- ============================================

-- 清理旧数据（可选）
-- DELETE FROM improvement_plans;
-- DELETE FROM evaluations;
-- DELETE FROM tasks;
-- DELETE FROM goals;
-- DELETE FROM employees;
-- DELETE FROM departments;

-- ============================================
-- 1. 部门数据
-- ============================================
INSERT INTO departments (id, name, level, parent_id, function_desc, created_at, updated_at) VALUES
(1, '研发部', 1, NULL, '负责公司产品研发、技术创新', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '市场部', 1, NULL, '负责市场营销、品牌推广', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '销售部', 1, NULL, '负责产品销售、客户关系维护', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '人力资源部', 1, NULL, '负责人员招聘、培训、绩效管理', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '财务部', 1, NULL, '负责财务管理、预算控制', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, '前端组', 2, 1, '负责前端开发、UI实现', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, '后端组', 2, 1, '负责后端服务、API开发', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '测试组', 2, 1, '负责软件测试、质量保证', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 2. 员工数据
-- ============================================
INSERT INTO employees (id, emp_id, name, department_id, position, phone, email, entry_date, status, created_at, updated_at) VALUES
-- 研发部
(1, 'E001', '张三', 6, '高级前端工程师', '13800001001', 'zhangsan@company.com', '2023-01-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'E002', '李四', 6, '前端工程师', '13800001002', 'lisi@company.com', '2023-03-20', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'E003', '王五', 7, '高级后端工程师', '13800001003', 'wangwu@company.com', '2022-11-10', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'E004', '赵六', 7, '后端工程师', '13800001004', 'zhaoliu@company.com', '2023-05-08', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'E005', '钱七', 8, '测试工程师', '13800001005', 'qianqi@company.com', '2023-02-14', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'E006', '孙八', 8, '高级测试工程师', '13800001006', 'sunba@company.com', '2022-09-25', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 市场部
(7, 'E007', '周九', 2, '市场经理', '13800001007', 'zhoujiu@company.com', '2022-06-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'E008', '吴十', 2, '市场专员', '13800001008', 'wushi@company.com', '2023-07-01', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 销售部
(9, 'E009', '郑十一', 3, '销售经理', '13800001009', 'zhengshiyi@company.com', '2022-08-20', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'E010', '王十二', 3, '销售代表', '13800001010', 'wangshier@company.com', '2023-04-10', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 人力资源部
(11, 'E011', '李经理', 4, 'HR经理', '13800001011', 'lijingli@company.com', '2021-12-01', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 财务部
(12, 'E012', '陈会计', 5, '财务主管', '13800001012', 'chenkuaiji@company.com', '2022-03-15', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 3. 目标数据 (KPI + OKR)
-- ============================================
INSERT INTO goals (id, employee_id, title, description, type, start_date, end_date, target_value, current_value, progress, status, created_at, updated_at) VALUES
-- Q1 季度目标
(1, 1, 'Q1前端性能优化', '提升首页加载速度至2秒以内，优化核心交互体验', 'KPI', '2024-01-01', '2024-03-31', 100, 85, 85, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Q1组件库开发', '完成10个通用组件开发和文档编写', 'KPI', '2024-01-01', '2024-03-31', 10, 8, 80, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Q1 API开发', '完成用户模块、订单模块API开发', 'OKR', '2024-01-01', '2024-03-31', 100, 90, 90, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 'Q1微服务拆分', '完成单体应用向微服务架构迁移', 'OKR', '2024-01-01', '2024-03-31', 100, 60, 60, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 'Q1自动化测试', '自动化测试覆盖率达到80%', 'KPI', '2024-01-01', '2024-03-31', 80, 65, 81, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 7, 'Q1品牌推广', '社交媒体粉丝增长10000人', 'KPI', '2024-01-01', '2024-03-31', 10000, 8500, 85, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 9, 'Q1销售目标', '完成季度销售额500万元', 'KPI', '2024-01-01', '2024-03-31', 5000000, 4200000, 84, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 年度目标
(8, 1, '2024年度技术提升', '掌握3项新技术，参与2次技术分享', 'OKR', '2024-01-01', '2024-12-31', 100, 45, 45, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 3, '2024年度架构优化', '完成系统架构升级，性能提升50%', 'OKR', '2024-01-01', '2024-12-31', 100, 30, 30, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 已完成目标
(10, 6, '2023年度测试优化', '建立完善的测试体系和流程', 'OKR', '2023-01-01', '2023-12-31', 100, 100, 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 4. 任务数据
-- ============================================
INSERT INTO tasks (id, title, description, employee_id, goal_id, priority, start_date, end_date, progress, status, created_at, updated_at) VALUES
-- 张三的任务
(1, '首页加载优化', '优化首页资源加载策略，实现懒加载', 1, 1, 'HIGH', '2024-01-05', '2024-01-20', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '图片压缩优化', '实现图片自动压缩和WebP格式转换', 1, 1, 'MEDIUM', '2024-01-21', '2024-02-05', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '缓存策略优化', '优化浏览器缓存和CDN配置', 1, 1, 'HIGH', '2024-02-06', '2024-02-25', 80, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 李四的任务
(4, 'Button组件开发', '开发通用Button组件及样式', 2, 2, 'HIGH', '2024-01-08', '2024-01-15', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Form组件开发', '开发表单组件和验证逻辑', 2, 2, 'HIGH', '2024-01-16', '2024-01-28', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Table组件开发', '开发数据表格组件', 2, 2, 'MEDIUM', '2024-01-29', '2024-02-15', 90, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 王五的任务
(7, '用户登录API', '实现用户登录、注册、认证接口', 3, 3, 'HIGH', '2024-01-10', '2024-01-25', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, '订单管理API', '实现订单创建、查询、更新接口', 3, 3, 'HIGH', '2024-01-26', '2024-02-15', 95, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, '支付接口对接', '对接第三方支付平台', 3, 3, 'MEDIUM', '2024-02-16', '2024-03-05', 60, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 赵六的任务
(10, '服务拆分方案设计', '设计微服务拆分方案和边界', 4, 4, 'HIGH', '2024-01-05', '2024-01-20', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, '用户服务迁移', '将用户模块迁移到独立服务', 4, 4, 'HIGH', '2024-01-21', '2024-02-15', 75, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, '服务间通信', '实现服务间RPC通信', 4, 4, 'MEDIUM', '2024-02-16', '2024-03-10', 40, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 钱七的任务
(13, '单元测试编写', '为核心模块编写单元测试', 5, 5, 'HIGH', '2024-01-10', '2024-02-10', 100, 'COMPLETED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, '集成测试开发', '开发接口自动化测试', 5, 5, 'HIGH', '2024-02-11', '2024-03-05', 70, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'E2E测试搭建', '搭建端到端测试框架', 5, 5, 'MEDIUM', '2024-03-06', '2024-03-25', 30, 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 5. 评估数据
-- ============================================
INSERT INTO evaluations (id, employee_id, evaluation_date, self_score, superior_score, colleague_score, final_score, comment, created_at, updated_at) VALUES
(1, 1, '2024-01-31', 85, 88, 87, 86.67, '工作认真负责，技术能力强，性能优化成果显著', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, '2024-01-31', 82, 85, 84, 83.67, '组件开发质量高，文档完善，团队协作好', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, '2024-01-31', 90, 92, 89, 90.33, '技术架构能力突出，代码质量优秀', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, '2024-01-31', 78, 80, 82, 80.00, '工作进度稳定，需加强架构设计能力', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, '2024-01-31', 88, 86, 87, 87.00, '测试覆盖全面，发现了多个关键问题', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 6, '2024-01-31', 92, 90, 91, 91.00, '测试经验丰富，建立了完善的测试体系', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 7, '2024-01-31', 86, 88, 85, 86.33, '市场策划能力强，品牌推广效果好', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 9, '2024-01-31', 84, 87, 86, 85.67, '销售业绩优秀，客户关系维护良好', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 6. 改进计划
-- ============================================
INSERT INTO improvement_plans (id, employee_id, title, improvement_goal, improvement_measures, start_date, end_date, progress, status, created_at, updated_at) VALUES
(1, 2, '前端架构能力提升', '掌握前端架构设计，能独立设计大型应用架构',
    '1. 学习微前端架构\n2. 研究状态管理最佳实践\n3. 参与架构设计评审',
    '2024-02-01', '2024-05-31', 35, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(2, 4, '架构设计能力培养', '提升系统架构设计能力，能设计高可用系统',
    '1. 学习分布式系统设计\n2. 阅读架构设计书籍\n3. 参与架构评审会议',
    '2024-02-01', '2024-06-30', 28, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(3, 5, '性能测试技能提升', '掌握性能测试和压测技能',
    '1. 学习JMeter工具\n2. 进行实战性能测试\n3. 编写性能测试报告',
    '2024-03-01', '2024-05-31', 15, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(4, 8, '数据分析能力强化', '提升市场数据分析和报表能力',
    '1. 学习数据分析工具\n2. 掌握统计分析方法\n3. 输出数据分析报告',
    '2024-02-15', '2024-05-15', 40, 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- 7. 预警记录
-- ============================================
INSERT INTO alert_record (id, type, target_id, target_type, message, status, created_at) VALUES
(1, 'GOAL_DELAY', 4, 'EMPLOYEE', '目标进度落后：员工赵六的"Q1微服务拆分"目标进度60%，低于预期75%', 'UNREAD', CURRENT_TIMESTAMP),
(2, 'TASK_OVERDUE', 15, 'TASK', '任务即将逾期：员工钱七的"E2E测试搭建"任务即将到期，当前进度30%', 'UNREAD', CURRENT_TIMESTAMP),
(3, 'PERFORMANCE_LOW', 4, 'EMPLOYEE', '绩效偏低预警：员工赵六本月评分80分，建议关注', 'READ', CURRENT_TIMESTAMP),
(4, 'GOAL_EXCELLENT', 3, 'EMPLOYEE', '目标完成优秀：员工王五的"Q1 API开发"进度达90%，表现优秀', 'READ', CURRENT_TIMESTAMP);

-- ============================================
-- 数据统计验证
-- ============================================
-- SELECT 'Departments' as table_name, COUNT(*) as count FROM departments
-- UNION ALL
-- SELECT 'Employees', COUNT(*) FROM employees
-- UNION ALL
-- SELECT 'Goals', COUNT(*) FROM goals
-- UNION ALL
-- SELECT 'Tasks', COUNT(*) FROM tasks
-- UNION ALL
-- SELECT 'Evaluations', COUNT(*) FROM evaluations
-- UNION ALL
-- SELECT 'Improvement Plans', COUNT(*) FROM improvement_plans
-- UNION ALL
-- SELECT 'Alerts', COUNT(*) FROM alert_record;
