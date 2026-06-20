# 员工效能自动化管理系统

本项目是一个面向企业员工绩效与效能管理的前后端分离系统，用于完成员工信息、部门岗位、绩效目标、任务成果、考核评价、反馈改进、预警提醒和统计分析等业务流程的管理。

## 功能概览

- 用户登录与权限认证
- 员工、部门、岗位基础信息管理
- 绩效目标、任务、工作成果管理
- 评价周期、评价维度、绩效评价管理
- 反馈记录、改进计划、目标调整管理
- 预警提醒、操作日志、系统配置管理
- 数据统计分析与导出演示

## 技术栈

- 前端：Vue 3、Vite、Element Plus、Pinia、Vue Router、Axios、ECharts
- 后端：Spring Boot、Spring Security、Spring Data JPA、JWT
- 数据库：MySQL
- 构建与运行：Maven、npm、本地 Shell 脚本

## 目录结构

```text
.
├── backend/                  # Spring Boot 后端服务
├── frontend/                 # Vue 前端应用
├── database/                 # 数据库建表和演示数据脚本
├── scripts/                  # 本地启动、停止、初始化脚本
└── 员工效能自动化管理系统研究与实现演示.pdf
```

## 本地运行

项目已经提供一键启动脚本，会依次启动 MySQL、后端服务和前端开发服务器。

```bash
./scripts/start-all.sh
```

启动成功后访问：

- 前端：http://localhost:3001
- 后端：http://localhost:8080
- MySQL：127.0.0.1:3306

默认演示账号：

```text
用户名：admin
密码：admin
```

停止服务：

```bash
./scripts/stop-all.sh
```

## 环境配置

运行脚本默认读取 `scripts/env.sh` 中的配置：

- `JAVA_HOME`：默认指向 `$HOME/.local/tools/jdk-17.0.12.jdk/Contents/Home`
- `MAVEN_HOME`：默认指向 `$HOME/.local/tools/apache-maven-3.9.11`
- `MYSQL_HOME`：默认指向 `$HOME/.local/tools/mysql-8.4.9-macos15-arm64`
- `BACKEND_PORT`：默认 `8080`
- `FRONTEND_PORT`：默认 `3001`
- `MYSQL_DATABASE`：默认 `employee_performance_db`

如果本机工具路径不同，可以在运行脚本前通过环境变量覆盖。

## 开发命令

前端开发：

```bash
cd frontend
npm install
npm run dev
```

前端构建：

```bash
cd frontend
npm run build
```

后端开发：

```bash
cd backend
mvn spring-boot:run
```

## 注意事项

- `frontend/node_modules/`、`frontend/dist/`、`backend/target/`、运行日志和本地数据库文件不会提交到 Git。
- 当前配置适合本地演示；正式部署前请修改默认管理员密码、JWT 密钥和数据库账号密码。
- 如需重新初始化演示数据，可参考 `database/` 和 `backend/src/main/resources/` 下的 SQL 文件。
