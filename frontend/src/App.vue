<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <router-view v-if="isLoginPage" />

  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <el-container v-else>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-aside width="220px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div class="logo">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <i class="el-icon-office-building" style="font-size: 24px; margin-right: 10px"></i>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <span class="logo-text">效能管理</span>
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-menu
        :default-active="$route.path"
        router
        :collapse="false"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-menu-item index="/dashboard">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-s-home"></i>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <span>工作台</span>
        </el-menu-item>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-sub-menu index="1" v-if="hasAnyRole(['ADMIN', 'MANAGER'])">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #title>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-s-custom"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>组织管理</span>
          </template>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/departments" v-if="hasAnyRole(['ADMIN'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-office-building"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>部门管理</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/employees">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-user"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>员工管理</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/positions" v-if="hasAnyRole(['ADMIN'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-s-grid"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>岗位管理</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-sub-menu index="2">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #title>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-aim"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>目标任务</span>
          </template>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/goals">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-trophy"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>目标列表</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/tasks">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-tickets"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>任务管理</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/work-results">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-notebook-2"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>工作成果</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/goal-adjustments" v-if="hasAnyRole(['ADMIN', 'MANAGER'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-refresh-right"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>目标调整</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-sub-menu index="3">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #title>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-s-data"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>绩效评估</span>
          </template>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/evaluation-cycles" v-if="hasAnyRole(['ADMIN', 'MANAGER'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-calendar"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>评估周期</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/evaluations">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-document"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>评估列表</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/evaluation-dimensions" v-if="hasAnyRole(['ADMIN'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-collection"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>评估维度</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/improvement-plans">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-edit"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>改进计划</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-sub-menu index="4" v-if="hasAnyRole(['ADMIN', 'MANAGER'])">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #title>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-data-analysis"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>数据分析</span>
          </template>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/statistics">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-pie-chart"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>统计报表</span>
          </el-menu-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/operation-logs" v-if="hasAnyRole(['ADMIN'])">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-document-copy"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>操作日志</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-sub-menu index="5" v-if="hasAnyRole(['ADMIN'])">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #title>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-setting"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>系统管理</span>
          </template>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-menu-item index="/system-configs">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-tools"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span>系统配置</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-menu-item index="/alerts">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-bell"></i>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <span>预警提醒</span>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-badge :value="alertCount" :hidden="alertCount === 0" class="alert-badge" />
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-container>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-header>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div class="header-left">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <h2>员工效能管理系统</h2>
        </div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div class="header-right">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <span class="user-info">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-user-solid"></i>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span style="margin-left: 5px">{{ currentUser }}（{{ currentRoleLabel }}）</span>
          </span>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button class="logout-btn" type="danger" plain size="small" @click="confirmLogout">
            退出登录
          </el-button>
        </div>
      </el-header>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-main>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// 模块说明：根组件，承载主布局、导航容器与全局样式入口。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed, onMounted, watch } from 'vue'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRoute, useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from './api'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const route = useRoute()
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const ROLE_LABEL_MAP = {
  // 行注释：配置对象或数组中的一项内容。
  ADMIN: '管理员',
  // 行注释：配置对象或数组中的一项内容。
  MANAGER: '主管',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  EMPLOYEE: '员工'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const normalizeRole = (role) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const normalized = String(role || '').toUpperCase()
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (normalized === 'USER') return 'EMPLOYEE'
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (Object.keys(ROLE_LABEL_MAP).includes(normalized)) return normalized
  // 行注释：返回当前函数的计算结果或组件配置。
  return 'EMPLOYEE'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const alertCount = ref(0)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentUser = ref('未登录')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentRole = ref('EMPLOYEE')

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const isLoginPage = computed(() => route.path === '/login')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentRoleLabel = computed(() => ROLE_LABEL_MAP[currentRole.value] || '员工')

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：根组件判断当前用户是否拥有指定角色，用于控制菜单和页面入口是否显示。
const hasAnyRole = (roles) => roles.includes(currentRole.value)

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块清空或重置页面状态，便于用户重新筛选、选择或填写。
const clearLoginState = () => {
  // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
  localStorage.removeItem('token')
  // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
  localStorage.removeItem('user')
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  alertCount.value = 0
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentUser.value = '未登录'
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentRole.value = 'EMPLOYEE'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadUserInfo = () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const userStr = localStorage.getItem('user')
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!userStr) {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentUser.value = '未登录'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentRole.value = 'EMPLOYEE'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const user = JSON.parse(userStr)
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const normalizedRole = normalizeRole(user?.role)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentUser.value = user?.realName || user?.username || '未命名用户'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentRole.value = normalizedRole

    // 行注释：进行条件判断，控制页面逻辑分支。
    if (user?.role !== normalizedRole) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      user.role = normalizedRole
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.setItem('user', JSON.stringify(user))
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.error('解析用户信息失败:', error)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentUser.value = '未登录'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    currentRole.value = 'EMPLOYEE'
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：前端模块加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadAlerts = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const token = localStorage.getItem('token')
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!token) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      alertCount.value = 0
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getAlerts()
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (res?.data) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      alertCount.value = res.data.filter(a => a.status === 'unread').length
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.error('加载预警失败:', error)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    alertCount.value = 0
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const confirmLogout = () => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    // 行注释：配置对象或数组中的一项内容。
    confirmButtonText: '确定',
    // 行注释：配置对象或数组中的一项内容。
    cancelButtonText: '取消',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'warning'
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.logout()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.warn('退出接口调用失败，已执行本地退出:', error)
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    clearLoginState()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('已退出登录')
    // 行注释：执行路由跳转或读取路由信息。
    router.replace('/login')
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  }).catch(() => {})
// 行注释：结束当前代码块或函数调用。
}

// 行注释：开始一个代码块，下面是该结构内部逻辑。
watch(() => route.path, (newPath) => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (newPath === '/login') return
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  loadUserInfo()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  setTimeout(() => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadAlerts()
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  }, 300)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：开始一个代码块，下面是该结构内部逻辑。
onMounted(() => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (route.path === '/login') return
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  loadUserInfo()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  setTimeout(() => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadAlerts()
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  }, 300)
// 行注释：结束当前代码块或函数调用。
})
</script>

<style>
* {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin: 0;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    box-sizing: border-box;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.logo {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    height: 60px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: #002140;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: white;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 18px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-weight: bold;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.logo-text {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 16px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    letter-spacing: 2px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-header {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: white;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: space-between;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.header-left h2 {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin: 0;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-weight: 500;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.header-right {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.user-info {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 8px 12px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-radius: 4px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: rgba(255, 255, 255, 0.08);
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.logout-btn {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-left: 10px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-color: rgba(255, 255, 255, 0.75);
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #fff;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background: transparent;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.logout-btn:hover {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background: rgba(255, 255, 255, 0.15);
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #fff;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-color: #fff;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-aside {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: #001529;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    height: 100vh;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    overflow-y: auto;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-main {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: #f0f2f5;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    min-height: calc(100vh - 60px);
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.alert-badge {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-left: 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-aside::-webkit-scrollbar {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    width: 6px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-aside::-webkit-scrollbar-thumb {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: rgba(255, 255, 255, 0.2);
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-radius: 3px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-aside::-webkit-scrollbar-thumb:hover {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: rgba(255, 255, 255, 0.3);
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-menu {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-right: none;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-menu-item, .el-sub-menu__title {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    height: 48px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    line-height: 48px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-menu-item i, .el-sub-menu__title i {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-right: 8px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 16px;
/* 行注释：结束当前样式规则。 */
}
</style>

