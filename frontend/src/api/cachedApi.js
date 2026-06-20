// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from './index'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import cacheManager, { createCacheKey } from '../utils/cacheManager'

/**
 * 带缓存的API封装
 * 为GET请求自动添加缓存功能
 */

// 缓存配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const CACHE_CONFIG = {
  // 列表数据缓存5分钟
  // 行注释：配置对象或数组中的一项内容。
  list: { ttl: 5 * 60 * 1000, persist: false, tag: 'list' },
  // 详情数据缓存10分钟
  // 行注释：配置对象或数组中的一项内容。
  detail: { ttl: 10 * 60 * 1000, persist: false, tag: 'detail' },
  // 统计数据缓存3分钟
  // 行注释：配置对象或数组中的一项内容。
  statistics: { ttl: 3 * 60 * 1000, persist: false, tag: 'statistics' },
  // 系统配置缓存30分钟
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  config: { ttl: 30 * 60 * 1000, persist: true, tag: 'config' }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建带缓存的API方法
 * @param {Function} apiFn - 原始API函数
 * @param {string} cacheKey - 缓存键
 * @param {Object} cacheOptions - 缓存选项
 */
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：接口封装模块处理缓存读写，减少重复请求并提升页面响应速度。
const withCache = (apiFn, cacheKey, cacheOptions = CACHE_CONFIG.list) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return async (...args) => {
    // 生成带参数的缓存键
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const fullCacheKey = args.length > 0
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      ? createCacheKey(cacheKey, ...args)
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      : cacheKey

    // 尝试从缓存获取
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const cached = cacheManager.get(fullCacheKey)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (cached !== null) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.log(`[Cache Hit] ${fullCacheKey}`)
      // 行注释：返回当前函数的计算结果或组件配置。
      return cached
    // 行注释：结束当前代码块或函数调用。
    }

    // 缓存未命中，调用API
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.log(`[Cache Miss] ${fullCacheKey}`)
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await apiFn(...args)

    // 存入缓存
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    cacheManager.set(fullCacheKey, result, cacheOptions)

    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 清除指定标签的缓存
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const clearCacheByTag = (tag) => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  cacheManager.clearByTag(tag)
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  console.log(`[Cache Clear] Tag: ${tag}`)
// 行注释：结束当前代码块或函数调用。
}

/**
 * 清除所有缓存
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const clearAllCache = () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  cacheManager.clear()
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  console.log('[Cache Clear] All cache cleared')
// 行注释：结束当前代码块或函数调用。
}

/**
 * 刷新指定缓存
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const refreshCache = (key) => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  cacheManager.refresh(key)
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  console.log(`[Cache Refresh] ${key}`)
// 行注释：结束当前代码块或函数调用。
}

/**
 * 获取缓存统计
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const getCacheStats = () => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return cacheManager.getStats()
// 行注释：结束当前代码块或函数调用。
}

// 导出带缓存的API
// 行注释：导出函数或对象，供其他前端模块复用。
export default {
  // 部门 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getDepartments: withCache(api.getDepartments, 'departments', CACHE_CONFIG.list),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createDepartment: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createDepartment(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateDepartment: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateDepartment(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteDepartment: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteDepartment(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 员工 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getEmployees: withCache(api.getEmployees, 'employees', CACHE_CONFIG.list),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createEmployee: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createEmployee(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateEmployee: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateEmployee(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteEmployee: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteEmployee(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 目标 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getGoals: withCache(api.getGoals, 'goals', CACHE_CONFIG.list),
  // 行注释：配置对象或数组中的一项内容。
  getGoalsByEmployee: withCache(api.getGoalsByEmployee, 'goals:employee', CACHE_CONFIG.detail),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createGoal: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createGoal(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateGoal: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateGoal(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteGoal: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteGoal(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 评估 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getEvaluations: withCache(api.getEvaluations, 'evaluations', CACHE_CONFIG.list),
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationsByEmployee: withCache(api.getEvaluationsByEmployee, 'evaluations:employee', CACHE_CONFIG.detail),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createEvaluation: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createEvaluation(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateEvaluation: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateEvaluation(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 任务 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getTasks: withCache(api.getTasks, 'tasks', CACHE_CONFIG.list),
  // 行注释：配置对象或数组中的一项内容。
  getTasksByEmployee: withCache(api.getTasksByEmployee, 'tasks:employee', CACHE_CONFIG.detail),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createTask: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createTask(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateTask: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateTask(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteTask: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteTask(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 反馈 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getFeedbacks: withCache(api.getFeedbacks, 'feedbacks', CACHE_CONFIG.list),
  // 行注释：配置对象或数组中的一项内容。
  getFeedbacksByEmployee: withCache(api.getFeedbacksByEmployee, 'feedbacks:employee', CACHE_CONFIG.detail),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createFeedback: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createFeedback(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  confirmFeedback: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.confirmFeedback(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 改进计划 - 使用缓存
  // 行注释：配置对象或数组中的一项内容。
  getImprovementPlans: withCache(api.getImprovementPlans, 'improvement-plans', CACHE_CONFIG.list),
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  getImprovementPlansByEmployee: withCache(
    // 行注释：配置对象或数组中的一项内容。
    api.getImprovementPlansByEmployee,
    // 行注释：配置对象或数组中的一项内容。
    'improvement-plans:employee',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    CACHE_CONFIG.detail
  // 行注释：配置对象或数组中的一项内容。
  ),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createImprovementPlan: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createImprovementPlan(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateImprovementPlan: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateImprovementPlan(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('list')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('detail')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 预警 - 使用短期缓存
  // 行注释：配置对象或数组中的一项内容。
  getAlerts: withCache(api.getAlerts, 'alerts', { ttl: 1 * 60 * 1000, tag: 'alerts' }),
  // 行注释：配置对象或数组中的一项内容。
  getUnreadAlerts: withCache(api.getUnreadAlerts, 'alerts:unread', { ttl: 30 * 1000, tag: 'alerts' }),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  markAlertAsRead: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.markAlertAsRead(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('alerts')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteAlert: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteAlert(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('alerts')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 统计 - 使用统计缓存
  // 行注释：配置对象或数组中的一项内容。
  getOverview: withCache(api.getOverview, 'statistics:overview', CACHE_CONFIG.statistics),
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  getDepartmentDistribution: withCache(
    // 行注释：配置对象或数组中的一项内容。
    api.getDepartmentDistribution,
    // 行注释：配置对象或数组中的一项内容。
    'statistics:department',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    CACHE_CONFIG.statistics
  // 行注释：配置对象或数组中的一项内容。
  ),
  // 行注释：配置对象或数组中的一项内容。
  getGoalCompletion: withCache(api.getGoalCompletion, 'statistics:goal-completion', CACHE_CONFIG.statistics),
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationScores: withCache(api.getEvaluationScores, 'statistics:evaluation-scores', CACHE_CONFIG.statistics),

  // 评估周期 - 使用配置缓存
  // 行注释：配置对象或数组中的一项内容。
  getEvaluationCycles: withCache(api.getEvaluationCycles, 'evaluation-cycles', CACHE_CONFIG.config),
  // 行注释：配置对象或数组中的一项内容。
  getActiveCycles: withCache(api.getActiveCycles, 'evaluation-cycles:active', CACHE_CONFIG.config),
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  createEvaluationCycle: async (data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.createEvaluationCycle(data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('config')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  updateEvaluationCycle: async (id, data) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.updateEvaluationCycle(id, data)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('config')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  deleteEvaluationCycle: async (id) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const result = await api.deleteEvaluationCycle(id)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearCacheByTag('config')
    // 行注释：返回当前函数的计算结果或组件配置。
    return result
  // 行注释：配置对象或数组中的一项内容。
  },

  // 数据导出 - 不使用缓存（每次都需要最新数据）
  // 行注释：配置对象或数组中的一项内容。
  exportEmployees: api.exportEmployees,
  // 行注释：配置对象或数组中的一项内容。
  exportGoals: api.exportGoals,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  exportEvaluations: api.exportEvaluations
// 行注释：结束当前代码块或函数调用。
}

