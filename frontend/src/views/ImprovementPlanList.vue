<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="改进计划管理" style="margin-bottom: 20px" />
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-button type="primary" @click="showDialog = true">新增改进计划</el-button>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-table :data="plans" style="margin-top: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="goal" label="改进目标" width="200" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="measures" label="改进措施" show-overflow-tooltip />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="startDate" label="开始日期" width="120" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="endDate" label="截止日期" width="120" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="progress" label="进度" width="150">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="scope">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-progress :percentage="scope?.row?.progress ?? 0" />
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column prop="status" label="状态" width="100">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="scope">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="getStatusType(scope?.row?.status)">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ getStatusText(scope?.row?.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column label="操作" width="180">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="scope">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" :disabled="!scope?.row" @click="scope?.row && editPlan(scope.row)">编辑</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" type="danger" :disabled="!scope?.row" @click="scope?.row && deletePlanItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="showDialog" :title="form.id ? '编辑改进计划' : '新增改进计划'" width="600px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="改进目标">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.goal" placeholder="3个月内提升项目管理能力" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="改进措施">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.measures" type="textarea" :rows="4"
                    placeholder="1. 参加项目管理培训&#10;2. 向优秀同事学习&#10;3. 实践新方法" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="关联评估">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.evaluationId" type="number" placeholder="评估ID（可选）" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="开始日期">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.startDate" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="截止日期">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.endDate" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="状态">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.status">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="待执行" value="pending" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="执行中" value="in_progress" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="完成进度">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-slider v-model="form.progress" :max="100" />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="showDialog = false">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="savePlan">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 模块说明：改进计划页面，用于跟踪低绩效改进方案及执行进度。
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
const plans = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({ progress: 0, status: 'pending' })

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadPlans = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getImprovementPlans()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    plans.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载改进计划失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const editPlan = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const savePlan = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (form.value.id) {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.updateImprovementPlan(form.value.id, form.value)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.createImprovementPlan(form.value)
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('保存成功')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showDialog.value = false
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    form.value = { progress: 0, status: 'pending' }
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadPlans()
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
const deletePlanItem = async (id) => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：等待后端接口返回结果，再继续更新页面数据。
    await api.deleteImprovementPlan(id)
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('删除成功')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadPlans()
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
const getStatusType = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = { pending: 'info', in_progress: 'primary', completed: 'success' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[status] || 'info'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusText = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const texts = { pending: '待执行', in_progress: '执行中', completed: '已完成' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return texts[status] || status
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const goBack = () => {
  // 行注释：执行路由跳转或读取路由信息。
  router.push('/dashboard')
// 行注释：结束当前代码块或函数调用。
}

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadPlans)
</script>

