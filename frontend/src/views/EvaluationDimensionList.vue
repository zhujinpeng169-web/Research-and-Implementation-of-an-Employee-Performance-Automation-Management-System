<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="评估维度配置" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showCreateDialog">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-plus"></i> 新建维度
        </el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadDimensions">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </template>
    </el-page-header>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-alert
        title="评估维度说明"
        type="info"
        :closable="false"
        style="margin-bottom: 20px"
      >
        配置不同岗位的评估维度和权重，总权重应为100%
      </el-alert>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table :data="dimensions" v-loading="loading" style="width: 100%" stripe>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column type="index" label="#" width="60" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="name" label="维度名称" width="150" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="weight" label="权重" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ (row.weight * 100).toFixed(0) }}%
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="positionType" label="适用岗位" width="150" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="description" label="说明" min-width="250" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column label="操作" width="150" fixed="right">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="primary" text @click="handleEdit(row)">
              编辑
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="danger" text @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      @close="resetForm"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="维度名称" prop="name">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.name" placeholder="如：工作业绩、协作能力" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="权重" prop="weight">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input-number v-model="form.weight" :min="0" :max="1" :step="0.1" :precision="2" style="width: 100%" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="color: #909399; font-size: 12px">输入0-1之间的小数，如0.3表示30%</div>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="适用岗位" prop="positionType">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.positionType" placeholder="请选择" style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="通用" value="all" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="技术岗" value="tech" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="销售岗" value="sales" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="管理岗" value="management" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="说明" prop="description">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.description" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="submitForm" :loading="submitting">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ isEdit ? '更新' : '创建' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 模块说明：评估维度管理页面，用于维护评分维度、权重及启用状态。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const dimensions = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const dialogVisible = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const submitting = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const formRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const isEdit = ref(false)
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({
  // 行注释：配置对象或数组中的一项内容。
  id: null,
  // 行注释：配置对象或数组中的一项内容。
  name: '',
  // 行注释：配置对象或数组中的一项内容。
  weight: 0.2,
  // 行注释：配置对象或数组中的一项内容。
  positionType: 'all',
  // 行注释：配置对象或数组中的一项内容。
  description: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  enabled: true
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const rules = {
  // 行注释：配置对象或数组中的一项内容。
  name: [{ required: true, message: '请输入维度名称', trigger: 'blur' }],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  weight: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入权重', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { type: 'number', min: 0, max: 1, message: '权重必须在0-1之间', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  positionType: [{ required: true, message: '请选择适用岗位', trigger: 'change' }]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const dialogTitle = computed(() => isEdit.value ? '编辑维度' : '新建维度')

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadDimensions = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getEvaluationDimensions()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    dimensions.value = res.data
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('数据已刷新')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载维度列表失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件打开弹窗或切换显示状态，用于配合新增、编辑、筛选等交互。
const showCreateDialog = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  isEdit.value = false
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  dialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleEdit = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  isEdit.value = true
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  dialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const handleDelete = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(`确定要删除维度"${row.name}"吗？`, '删除确认', {
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
      await api.deleteEvaluationDimension(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadDimensions()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('删除失败')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).catch(() => {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('已取消删除')
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const submitForm = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  formRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    submitting.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (isEdit.value) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateEvaluationDimension(form.value.id, form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createEvaluationDimension(form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('创建成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      dialogVisible.value = false
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadDimensions()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const message = error.response?.data?.message || (isEdit.value ? '更新失败' : '创建失败')
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error(message)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } finally {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      submitting.value = false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件清空或重置页面状态，便于用户重新筛选、选择或填写。
const resetForm = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  form.value = {
    // 行注释：配置对象或数组中的一项内容。
    id: null,
    // 行注释：配置对象或数组中的一项内容。
    name: '',
    // 行注释：配置对象或数组中的一项内容。
    weight: 0.2,
    // 行注释：配置对象或数组中的一项内容。
    positionType: 'all',
    // 行注释：配置对象或数组中的一项内容。
    description: '',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    enabled: true
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  formRef.value?.clearValidate()
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
  loadDimensions()
// 行注释：结束当前代码块或函数调用。
})
</script>

