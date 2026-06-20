<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="操作日志" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadLogs">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="exportLogs">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-download"></i> 导出
        </el-button>
      </template>
    </el-page-header>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :inline="true" style="margin-bottom: 20px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="模块">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="filters.module" placeholder="全部模块" clearable>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="员工管理" value="employee" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="目标管理" value="goal" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="任务管理" value="task" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="评估管理" value="evaluation" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="操作类型">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="filters.operation" placeholder="全部类型" clearable>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="创建" value="create" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="更新" value="update" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="删除" value="delete" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="查询" value="read" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button type="primary" @click="loadLogs">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table :data="logs" v-loading="loading" style="width: 100%" stripe>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column type="index" label="#" width="60" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="userId" label="用户ID" width="100" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="operation" label="操作" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag :type="getOperationType(row.operation)" size="small">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ getOperationName(row.operation) }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="module" label="模块" width="120" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="content" label="操作内容" min-width="250" show-overflow-tooltip />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="ip" label="IP地址" width="140" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="createdAt" label="操作时间" width="160" />
      </el-table>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 20px; text-align: right"
      />
    </el-card>
  </div>
</template>

<script setup>
// 模块说明：操作日志页面，用于审计系统内关键操作行为。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage } from 'element-plus'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const logs = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const total = ref(0)

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filters = ref({
  // 行注释：配置对象或数组中的一项内容。
  module: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  operation: ''
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadLogs = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const params = {}
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filters.value.module) params.module = filters.value.module
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filters.value.operation) params.operation = filters.value.operation

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getOperationLogs(params)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    logs.value = res.data
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    total.value = res.data.length
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('数据已刷新')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载日志失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件导出数据时使用，把当前列表或选中记录整理成文件。
const exportLogs = () => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessage.success('日志导出功能开发中')
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const getOperationName = (operation) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const names = {
    // 行注释：配置对象或数组中的一项内容。
    create: '创建',
    // 行注释：配置对象或数组中的一项内容。
    update: '更新',
    // 行注释：配置对象或数组中的一项内容。
    delete: '删除',
    // 行注释：配置对象或数组中的一项内容。
    read: '查询',
    // 行注释：配置对象或数组中的一项内容。
    login: '登录',
    // 行注释：配置对象或数组中的一项内容。
    login_failed: '登录失败',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    register: '注册'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return names[operation] || operation
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getOperationType = (operation) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = {
    // 行注释：配置对象或数组中的一项内容。
    create: 'success',
    // 行注释：配置对象或数组中的一项内容。
    update: 'warning',
    // 行注释：配置对象或数组中的一项内容。
    delete: 'danger',
    // 行注释：配置对象或数组中的一项内容。
    read: 'info',
    // 行注释：配置对象或数组中的一项内容。
    login: 'success',
    // 行注释：配置对象或数组中的一项内容。
    login_failed: 'danger',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    register: 'success'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[operation] || ''
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const goBack = () => {
  // 行注释：执行路由跳转或读取路由信息。
  router.push('/dashboard')
// 行注释：结束当前代码块或函数调用。
}

// 行注释：开始一个代码块，下面是该结构内部逻辑。
onMounted(() => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  loadLogs()
// 行注释：结束当前代码块或函数调用。
})
</script>

