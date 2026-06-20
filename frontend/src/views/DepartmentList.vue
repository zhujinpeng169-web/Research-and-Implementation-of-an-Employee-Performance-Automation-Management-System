<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="部门管理" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showDialog = true" icon="el-icon-plus" title="Ctrl+N">新增部门</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadDepartments" icon="el-icon-refresh" :loading="loading" title="Ctrl+R">刷新</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tooltip content="Ctrl+N:新增 | Ctrl+R:刷新 | ESC:关闭/返回" placement="bottom">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button icon="el-icon-question" circle></el-button>
        </el-tooltip>
      </template>
    </el-page-header>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table
        :data="paginatedDepartments"
        v-loading="loading"
        style="width: 100%"
        row-key="id"
        stripe
        highlight-current-row
        :header-cell-style="{background: '#f5f7fa', color: '#606266'}"
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="id" label="ID" width="80" sortable />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="name" label="部门名称" min-width="150" sortable>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <span style="font-weight: 500">{{ row.name }}</span>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="parentId" label="上级部门" width="120">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag v-if="row.parentId" size="small">{{ getParentName(row.parentId) }}</el-tag>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag v-else type="success" size="small">顶级部门</el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="level" label="层级" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag type="info" size="small">第 {{ row.level }} 级</el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="functionDesc" label="职能描述" min-width="200" show-overflow-tooltip />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column label="员工数" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-badge :value="row.employeeCount || 0" class="item">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-user" style="font-size: 18px"></i>
            </el-badge>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column label="操作" width="200" fixed="right">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="primary" text @click="editDepartment(row)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="danger" text @click="confirmDelete(row)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div style="color: #909399; font-size: 14px">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          共 {{ departments.length }} 个部门
        </div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="departments.length"
          layout="sizes, prev, pager, next, jumper"
          background
        />
      </div>
    </el-card>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog
      v-model="showDialog"
      :title="form.id ? '编辑部门' : '新增部门'"
      width="600px"
      :close-on-click-modal="false"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="部门名称" prop="name">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.name" placeholder="请输入部门名称" clearable autofocus />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="上级部门" prop="parentId">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.parentId" placeholder="请选择上级部门" clearable style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="无(顶级部门)" :value="null" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option
              v-for="dept in departments.filter(d => d.id !== form.id)"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
            />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="层级" prop="level">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input-number v-model="form.level" :min="1" :max="10" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="职能描述" prop="functionDesc">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="form.functionDesc"
            type="textarea"
            :rows="4"
            placeholder="请输入部门职能描述"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="cancelForm" icon="el-icon-close">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="saveDepartment" :loading="saving" icon="el-icon-check">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const departments = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({})
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const formRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const saving = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const rules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  name: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  level: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请输入层级', trigger: 'blur' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const paginatedDepartments = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const start = (currentPage.value - 1) * pageSize.value
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const end = start + pageSize.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return departments.value.slice(start, end)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getParentName = (parentId) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const parent = departments.value.find(d => d.id === parentId)
  // 行注释：返回当前函数的计算结果或组件配置。
  return parent ? parent.name : '未知'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const goBack = () => {
  // 行注释：执行路由跳转或读取路由信息。
  router.push('/dashboard')
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
const loadDepartments = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getDepartments()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    departments.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载部门数据失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const editDepartment = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const cancelForm = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = false
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = {}
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (formRef.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    formRef.value.resetFields()
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveDepartment = async () => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!formRef.value) return

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  await formRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    saving.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (form.value.id) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateDepartment(form.value.id, form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createDepartment(form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('创建成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelForm()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadDepartments()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('保存失败，请稍后重试')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } finally {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      saving.value = false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const confirmDelete = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除部门"${row.name}"吗？此操作不可恢复。`,
    // 行注释：配置对象或数组中的一项内容。
    '删除确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：配置对象或数组中的一项内容。
      type: 'warning',
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    await deleteDept(row.id)
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).catch(() => {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('已取消删除')
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const deleteDept = async (id) => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：等待后端接口返回结果，再继续更新页面数据。
    await api.deleteDepartment(id)
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('删除成功')
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadDepartments()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('删除失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 键盘快捷键配置
// 行注释：开始一个代码块，下面是该结构内部逻辑。
useKeyboardShortcuts({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+n': () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showDialog.value = true
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+N 新增部门')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+r': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadDepartments()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+R 刷新数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'escape': () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (showDialog.value) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelForm()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: ESC 关闭对话框')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      goBack()
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadDepartments)
</script>

