<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="系统配置" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showCreateDialog">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-plus"></i> 新建配置
        </el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadConfigs">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </template>
    </el-page-header>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tabs v-model="activeTab">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tab-pane label="评估配置" name="evaluation">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table :data="filteredConfigs('evaluation')" v-loading="loading" stripe>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column type="index" label="#" width="60" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configKey" label="配置键" width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configValue" label="配置值" min-width="200" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="description" label="说明" min-width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column label="操作" width="150">
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
        </el-tab-pane>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tab-pane label="权限配置" name="permission">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table :data="filteredConfigs('permission')" v-loading="loading" stripe>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column type="index" label="#" width="60" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configKey" label="配置键" width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configValue" label="配置值" min-width="200" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="description" label="说明" min-width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column label="操作" width="150">
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
        </el-tab-pane>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tab-pane label="系统设置" name="system">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table :data="filteredConfigs('system')" v-loading="loading" stripe>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column type="index" label="#" width="60" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configKey" label="配置键" width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="configValue" label="配置值" min-width="200" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column prop="description" label="说明" min-width="250" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-table-column label="操作" width="150">
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
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 创建/编辑对话框 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" @close="resetForm">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="配置类型" prop="category">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.category" placeholder="请选择配置类型" style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="评估配置" value="evaluation" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="权限配置" value="permission" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="系统设置" value="system" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="配置键" prop="configKey">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.configKey" placeholder="例如：evaluation.self.weight" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="配置值" prop="configValue">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.configValue" placeholder="例如：0.2" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="说明" prop="description">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入配置说明"
          />
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
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const configs = ref([])
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
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeTab = ref('evaluation')

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({
  // 行注释：配置对象或数组中的一项内容。
  id: null,
  // 行注释：配置对象或数组中的一项内容。
  configKey: '',
  // 行注释：配置对象或数组中的一项内容。
  configValue: '',
  // 行注释：配置对象或数组中的一项内容。
  description: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  category: 'evaluation'
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const rules = {
  // 行注释：配置对象或数组中的一项内容。
  category: [{ required: true, message: '请选择配置类型', trigger: 'change' }],
  // 行注释：配置对象或数组中的一项内容。
  configKey: [{ required: true, message: '请输入配置键', trigger: 'blur' }],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  configValue: [{ required: true, message: '请输入配置值', trigger: 'blur' }]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const dialogTitle = computed(() => isEdit.value ? '编辑配置' : '新建配置')

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const filteredConfigs = (category) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return configs.value.filter(c => c.configKey.startsWith(category))
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
const loadConfigs = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getSystemConfigs()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    configs.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载配置失败')
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
  form.value.category = activeTab.value
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  dialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleEdit = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  isEdit.value = true
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  form.value = {
    // 行注释：配置对象或数组中的一项内容。
    id: row.id,
    // 行注释：配置对象或数组中的一项内容。
    configKey: row.configKey,
    // 行注释：配置对象或数组中的一项内容。
    configValue: row.configValue,
    // 行注释：配置对象或数组中的一项内容。
    description: row.description,
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    category: row.configKey.split('.')[0]
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  dialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const handleDelete = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除配置"${row.configKey}"吗？`,
    // 行注释：配置对象或数组中的一项内容。
    '删除确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      type: 'warning'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteSystemConfig(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadConfigs()
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
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const data = {
        // 行注释：配置对象或数组中的一项内容。
        configKey: form.value.configKey,
        // 行注释：配置对象或数组中的一项内容。
        configValue: form.value.configValue,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        description: form.value.description
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (isEdit.value) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateSystemConfig(form.value.id, data)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createSystemConfig(data)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('创建成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      dialogVisible.value = false
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadConfigs()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
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
    configKey: '',
    // 行注释：配置对象或数组中的一项内容。
    configValue: '',
    // 行注释：配置对象或数组中的一项内容。
    description: '',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    category: activeTab.value
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

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadConfigs)
</script>

