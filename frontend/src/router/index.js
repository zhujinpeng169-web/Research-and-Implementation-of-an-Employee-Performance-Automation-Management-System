// 行注释：导入路由能力，用于页面跳转和访问控制。
import { createRouter, createWebHistory } from 'vue-router'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const ALL_ROLES = ['ADMIN', 'MANAGER', 'EMPLOYEE']

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：路由模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const normalizeRole = (role) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const normalized = String(role || '').toUpperCase()
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (normalized === 'USER') return 'EMPLOYEE'
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (ALL_ROLES.includes(normalized)) return normalized
  // 行注释：返回当前函数的计算结果或组件配置。
  return 'EMPLOYEE'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const routes = [
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    redirect: '/dashboard'
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/login',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/Login.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { public: true }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/dashboard',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/Dashboard.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/departments',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/DepartmentList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/employees',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/EmployeeList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN', 'MANAGER'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/employees/:id',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/EmployeeDetail.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN', 'MANAGER'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/positions',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/PositionList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/system-configs',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/SystemConfigList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/goals',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/GoalList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/goal-adjustments',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/GoalAdjustmentList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN', 'MANAGER'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/evaluations',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/EvaluationList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/statistics',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/Statistics.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN', 'MANAGER'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/tasks',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/TaskList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/work-results',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/WorkResultList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/improvement-plans',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/ImprovementPlanList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/alerts',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/AlertList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ALL_ROLES }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/evaluation-cycles',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/EvaluationCycleList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN', 'MANAGER'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/evaluation-dimensions',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/EvaluationDimensionList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN'] }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    path: '/operation-logs',
    // 行注释：配置对象或数组中的一项内容。
    component: () => import('../views/OperationLogList.vue'),
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    meta: { roles: ['ADMIN'] }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：当前行参与完成页面交互或数据处理逻辑。
]

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = createRouter({
  // 行注释：配置对象或数组中的一项内容。
  history: createWebHistory(),
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  routes
// 行注释：结束当前代码块或函数调用。
})

// Route guard: unauthenticated users can only access /login.
// 行注释：执行路由跳转或读取路由信息。
router.beforeEach((to, from, next) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const token = localStorage.getItem('token')

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (to.path === '/login') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (token) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      next('/dashboard')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      next()
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!token) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    next('/login')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  let role = 'EMPLOYEE'
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const userStr = localStorage.getItem('user')
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (userStr) {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const user = JSON.parse(userStr)
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      role = normalizeRole(user?.role)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (e) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      role = 'EMPLOYEE'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const allowedRoles = to.meta?.roles
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    next('/dashboard')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  next()
// 行注释：结束当前代码块或函数调用。
})

// 行注释：导出函数或对象，供其他前端模块复用。
export default router

