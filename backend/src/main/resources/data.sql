-- 初始化管理员账号
-- 账号: admin, 密码: admin (BCrypt加密)
-- 注意：此文件由 DataInitializer.java 自动处理，这里只是备份
INSERT INTO users (username, password, real_name, email, role, enabled, created_at, updated_at)
SELECT 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '系统管理员', 'admin@example.com', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');
