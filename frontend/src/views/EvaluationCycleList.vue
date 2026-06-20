<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-button type="primary" @click="showDialog = true">新增评估周期</el-button>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-table :data="cycles" style="margin-top: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="name" label="周期名称" width="200" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="type" label="类型" width="100">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag>{{ getTypeText(row.type) }}</el-tag>
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="startDate" label="开始日期" width="120" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="endDate" label="结束日期" width="120" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="status" label="状态" width="100">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column label="操作" width="180">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" @click="editCycle(row)">编辑</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" type="danger" @click="deleteCycleItem(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="showDialog" :title="form.id ? '编辑评估周期' : '新增评估周期'" width="500px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="周期名称">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.name" placeholder="如：2024年第一季度评估" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="周期类型">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.type">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="月度" value="monthly" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="季度" value="quarterly" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="半年度" value="semi-annual" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="年度" value="annual" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="开始日期">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.startDate" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="结束日期">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.endDate" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="状态">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.status">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="待开始" value="pending" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="进行中" value="active" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="已结束" value="completed" />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="showDialog = false">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="saveCycle">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 模块说明：评估周期管理页面，用于维护绩效评估周期的增删改查。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const cycles = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({ status: 'pending', type: 'quarterly' })

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadCycles = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getEvaluationCycles()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    cycles.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载评估周期失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const editCycle = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveCycle = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (form.value.id) {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.updateEvaluationCycle(form.value.id, form.value)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.createEvaluationCycle(form.value)
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('保存成功')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showDialog.value = false
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    form.value = { status: 'pending', type: 'quarterly' }
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadCycles()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('保存失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const deleteCycleItem = async (id) => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：等待后端接口返回结果，再继续更新页面数据。
    await api.deleteEvaluationCycle(id)
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('删除成功')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadCycles()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('删除失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getTypeText = (type) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const texts = { monthly: '月度', quarterly: '季度', 'semi-annual': '半年度', annual: '年度' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return texts[type] || type
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusType = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = { pending: 'info', active: 'success', completed: 'warning' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[status] || 'info'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusText = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const texts = { pending: '待开始', active: '进行中', completed: '已结束' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return texts[status] || status
// 行注释：结束当前代码块或函数调用。
}

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadCycles)
</script>

