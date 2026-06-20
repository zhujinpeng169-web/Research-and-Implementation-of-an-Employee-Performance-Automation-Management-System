// 行注释：导入 Axios，用于前端向后端发送 HTTP 请求。
import axios from 'axios'

// 全局 API 网关：前端所有页面统一从这里发起请求。
// 各模块通用调用链：
// 页面(Vue) -> 本文件方法 -> 后端URL -> JSON响应。
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const api = axios.create({
  // 行注释：配置对象或数组中的一项内容。
  baseURL: '/api',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  timeout: 10000
// 行注释：结束当前代码块或函数调用。
})

// 请求拦截器：登录后自动附带 JWT。
// 行注释：当前行参与完成页面交互或数据处理逻辑。
api.interceptors.request.use(
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  config => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const token = localStorage.getItem('token')
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (token) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      config.headers.Authorization = `Bearer ${token}`
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：返回当前函数的计算结果或组件配置。
    return config
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  error => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return Promise.reject(error)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
)

// 响应拦截器：统一输出接口错误日志。
// 行注释：当前行参与完成页面交互或数据处理逻辑。
api.interceptors.response.use(
  // 行注释：配置对象或数组中的一项内容。
  response => response,
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  error => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const status = error.response?.status
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.log('API Error:', status, error.message)

    // 登录态失效：统一清理本地信息并回到登录页。
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (status === 401) {
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.removeItem('token')
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.removeItem('user')

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (window.location.pathname !== '/login') {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        window.location.href = '/login'
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return Promise.reject(error)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
)

// 行注释：导出函数或对象，供其他前端模块复用。
export default {
  // 认证模块（代表性模块）
  // login：POST /api/auth/login，用法=提交用户名密码，作用=获取 token。
  // register：POST /api/auth/register，用法=提交注册信息，作用=创建新账号。
  // validateToken：GET /api/auth/validate，用法=请求头携带 Bearer token，作用=验证登录态。
  // 行注释：配置对象或数组中的一项内容。
  login: (data) => api.post('/auth/login', data),
  // 行注释：配置对象或数组中的一项内容。
  logout: () => api.post('/auth/logout'),
  // 行注释：配置对象或数组中的一项内容。
  register: (data) => api.post('/auth/register', data),
  // 行注释：配置对象或数组中的一项内容。
  validateToken: () => api.get('/auth/validate'),

  // Operation log
  // 行注释：配置对象或数组中的一项内容。
  getOperationLogs: (params) => api.get('/operation-logs', { params }),
  // 行注释：配置对象或数组中的一项内容。
  getOperationLogsByUser: (userId) => api.get(`/operation-logs/user/${userId}`),
  // 行注释：配置对象或数组中的一项内容。
  deleteOperationLog: (id) => api.delete(`/operation-logs/${id}`),

  // Department
  // 行注释：配置对象或数组中的一项内容。
  getDepartments: () => api.get('/departments'),
  // 行注释：配置对象或数组中的一项内容。
  createDepartment: (data) => api.post('/departments', data),
  // 行注释：配置对象或数组中的一项内容。
  updateDepartment: (id, data) => api.put(`/departments/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteDepartment: (id) => api.delete(`/departments/${id}`),

  // Employee
  // 行注释：配置对象或数组中的一项内容。
  getEmployees: () => api.get('/employees'),
  // 行注释：配置对象或数组中的一项内容。
  createEmployee: (data) => api.post('/employees', data),
  // 行注释：配置对象或数组中的一项内容。
  updateEmployee: (id, data) => api.put(`/employees/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteEmployee: (id) => api.delete(`/employees/${id}`),

  // Position
  // 行注释：配置对象或数组中的一项内容。
  getPositions: () => api.get('/positions'),
  // 行注释：配置对象或数组中的一项内容。
  createPosition: (data) => api.post('/positions', data),
  // 行注释：配置对象或数组中的一项内容。
  updatePosition: (id, data) => api.put(`/positions/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deletePosition: (id) => api.delete(`/positions/${id}`),

  // System config
  // 行注释：配置对象或数组中的一项内容。
  getSystemConfigs: () => api.get('/system-configs'),
  // 行注释：配置对象或数组中的一项内容。
  createSystemConfig: (data) => api.post('/system-configs', data),
  // 行注释：配置对象或数组中的一项内容。
  updateSystemConfig: (id, data) => api.put(`/system-configs/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteSystemConfig: (id) => api.delete(`/system-configs/${id}`),

  // Goal
  // 行注释：配置对象或数组中的一项内容。
  getGoals: () => api.get('/goals'),
  // 行注释：配置对象或数组中的一项内容。
  getGoalsByEmployee: (employeeId) => api.get(`/goals/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createGoal: (data) => api.post('/goals', data),
  // 行注释：配置对象或数组中的一项内容。
  updateGoal: (id, data) => api.put(`/goals/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteGoal: (id) => api.delete(`/goals/${id}`),

  // Goal adjustment
  // 行注释：配置对象或数组中的一项内容。
  getGoalAdjustments: () => api.get('/goal-adjustments'),
  // 行注释：配置对象或数组中的一项内容。
  getGoalAdjustmentsByGoal: (goalId) => api.get(`/goal-adjustments/goal/${goalId}`),
  // 行注释：配置对象或数组中的一项内容。
  getGoalAdjustmentsByStatus: (status) => api.get(`/goal-adjustments/status/${status}`),
  // 行注释：配置对象或数组中的一项内容。
  createGoalAdjustment: (data) => api.post('/goal-adjustments', data),
  // 行注释：配置对象或数组中的一项内容。
  approveGoalAdjustment: (id, data) => api.put(`/goal-adjustments/${id}/approve`, data),
  // 行注释：配置对象或数组中的一项内容。
  rejectGoalAdjustment: (id, data) => api.put(`/goal-adjustments/${id}/reject`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteGoalAdjustment: (id) => api.delete(`/goal-adjustments/${id}`),

  // Evaluation
  // 行注释：配置对象或数组中的一项内容。
  getEvaluations: () => api.get('/evaluations'),
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationsByEmployee: (employeeId) => api.get(`/evaluations/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createEvaluation: (data) => api.post('/evaluations', data),
  // 行注释：配置对象或数组中的一项内容。
  updateEvaluation: (id, data) => api.put(`/evaluations/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteEvaluation: (id) => api.delete(`/evaluations/${id}`),

  // Evaluation dimension
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationDimensions: (params) => api.get('/evaluation-dimensions', { params }),
  // 行注释：配置对象或数组中的一项内容。
  createEvaluationDimension: (data) => api.post('/evaluation-dimensions', data),
  // 行注释：配置对象或数组中的一项内容。
  updateEvaluationDimension: (id, data) => api.put(`/evaluation-dimensions/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteEvaluationDimension: (id) => api.delete(`/evaluation-dimensions/${id}`),

  // Task
  // 行注释：配置对象或数组中的一项内容。
  getTasks: () => api.get('/tasks'),
  // 行注释：配置对象或数组中的一项内容。
  getTasksByEmployee: (employeeId) => api.get(`/tasks/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createTask: (data) => api.post('/tasks', data),
  // 行注释：配置对象或数组中的一项内容。
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteTask: (id) => api.delete(`/tasks/${id}`),

  // Work result
  // 行注释：配置对象或数组中的一项内容。
  getWorkResults: () => api.get('/work-results'),
  // 行注释：配置对象或数组中的一项内容。
  getWorkResultsByTask: (taskId) => api.get(`/work-results/task/${taskId}`),
  // 行注释：配置对象或数组中的一项内容。
  getWorkResultsByEmployee: (employeeId) => api.get(`/work-results/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createWorkResult: (data) => api.post('/work-results', data),
  // 行注释：配置对象或数组中的一项内容。
  updateWorkResult: (id, data) => api.put(`/work-results/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteWorkResult: (id) => api.delete(`/work-results/${id}`),

  // Feedback
  // 行注释：配置对象或数组中的一项内容。
  getFeedbacks: () => api.get('/feedbacks'),
  // 行注释：配置对象或数组中的一项内容。
  getFeedbacksByEmployee: (employeeId) => api.get(`/feedbacks/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createFeedback: (data) => api.post('/feedbacks', data),
  // 行注释：配置对象或数组中的一项内容。
  confirmFeedback: (id) => api.put(`/feedbacks/${id}/confirm`),

  // Improvement plan
  // 行注释：配置对象或数组中的一项内容。
  getImprovementPlans: () => api.get('/improvement-plans'),
  // 行注释：配置对象或数组中的一项内容。
  getImprovementPlansByEmployee: (employeeId) => api.get(`/improvement-plans/employee/${employeeId}`),
  // 行注释：配置对象或数组中的一项内容。
  createImprovementPlan: (data) => api.post('/improvement-plans', data),
  // 行注释：配置对象或数组中的一项内容。
  updateImprovementPlan: (id, data) => api.put(`/improvement-plans/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteImprovementPlan: (id) => api.delete(`/improvement-plans/${id}`),

  // Alert
  // 行注释：配置对象或数组中的一项内容。
  getAlerts: () => api.get('/alerts'),
  // 行注释：配置对象或数组中的一项内容。
  getUnreadAlerts: () => api.get('/alerts/unread'),
  // 行注释：配置对象或数组中的一项内容。
  markAlertAsRead: (id) => api.put(`/alerts/${id}/read`),
  // 行注释：配置对象或数组中的一项内容。
  deleteAlert: (id) => api.delete(`/alerts/${id}`),

  // Statistics
  // 行注释：配置对象或数组中的一项内容。
  getOverview: () => api.get('/statistics/overview'),
  // 行注释：配置对象或数组中的一项内容。
  getDepartmentDistribution: () => api.get('/statistics/department-distribution'),
  // 行注释：配置对象或数组中的一项内容。
  getGoalCompletion: () => api.get('/statistics/goal-completion'),
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationScores: () => api.get('/statistics/evaluation-scores'),

  // Evaluation cycle
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationCycles: () => api.get('/evaluation-cycles'),
  // 行注释：配置对象或数组中的一项内容。
  getActiveCycles: () => api.get('/evaluation-cycles/active'),
  // 行注释：配置对象或数组中的一项内容。
  createEvaluationCycle: (data) => api.post('/evaluation-cycles', data),
  // 行注释：配置对象或数组中的一项内容。
  updateEvaluationCycle: (id, data) => api.put(`/evaluation-cycles/${id}`, data),
  // 行注释：配置对象或数组中的一项内容。
  deleteEvaluationCycle: (id) => api.delete(`/evaluation-cycles/${id}`),

  // Export
  // 行注释：配置对象或数组中的一项内容。
  exportEmployees: () => api.get('/export/employees', { responseType: 'blob' }),
  // 行注释：配置对象或数组中的一项内容。
  exportGoals: () => api.get('/export/goals', { responseType: 'blob' }),
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  exportEvaluations: () => api.get('/export/evaluations', { responseType: 'blob' })
// 行注释：结束当前代码块或函数调用。
}


