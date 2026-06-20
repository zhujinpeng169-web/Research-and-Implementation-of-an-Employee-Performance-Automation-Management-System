<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showDialog = true" icon="el-icon-plus" title="Ctrl+N">新增目标</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="success" @click="exportGoals" icon="el-icon-download" title="Ctrl+E">导出目标</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadGoals" icon="el-icon-refresh" :loading="loading" title="Ctrl+R">刷新</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-divider direction="vertical" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-dropdown @command="handleBatchAction" :disabled="!hasSelection">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button type="warning" :disabled="!hasSelection">
            批量操作 <el-badge :value="selectedCount" :hidden="!hasSelection" class="item" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #dropdown>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-dropdown-menu>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchExport" icon="el-icon-download">导出选中 ({{ selectedCount }})</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchPending" icon="el-icon-time" divided>批量设为待开始</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchInProgress" icon="el-icon-video-play">批量设为进行中</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchCompleted" icon="el-icon-check">批量设为已完成</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchDelete" icon="el-icon-delete" divided style="color: #f56c6c">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tooltip content="Ctrl+N:新增 | Ctrl+R:刷新 | Ctrl+E:导出 | ESC:关闭" placement="bottom">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button icon="el-icon-question" circle style="margin-left: 10px"></el-button>
        </el-tooltip>
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="display: flex; gap: 10px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-select v-model="filterStatus" placeholder="筛选状态" style="width: 150px" clearable>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-option label="待开始" value="pending" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-option label="进行中" value="in_progress" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-option label="已完成" value="completed" />
        </el-select>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <ColumnConfig :columns="allColumns" storage-key="goalListColumns" @change="handleColumnChange" />
      </div>
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-if="!loading && goals.length === 0" description="暂无目标数据">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button type="primary" @click="showDialog = true">新增目标</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-else-if="!loading && filteredGoals.length === 0 && filterStatus" description="未找到匹配的目标">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button @click="filterStatus = ''">清空筛选</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-table
      v-else
      :data="paginatedGoals"
      v-loading="loading"
      style="margin-top: 20px"
      default-sort="{prop: 'endDate', order: 'ascending'}"
      @row-dblclick="editGoal"
      @selection-change="handleSelectionChange"
      stripe
      highlight-current-row
      :header-cell-style="{background: '#f5f7fa', color: '#606266'}"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column type="selection" width="55" :selectable="checkSelectable" />
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column
        v-for="col in visibleColumns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
        :sortable="col.sortable"
        :sort-method="col.sortMethod"
        :fixed="col.fixed"
        :align="col.align"
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-if="col.prop === 'progress'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-progress :percentage="row.progress || 0" />
        </template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-else-if="col.prop === 'status'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="row.status === 'completed' ? 'success' : row.status === 'in_progress' ? 'primary' : 'info'">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ row.status === 'completed' ? '已完成' : row.status === 'in_progress' ? '进行中' : '待开始' }}
          </el-tag>
        </template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-else-if="col.formatter" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ col.formatter(row) }}
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column label="操作" width="180" fixed="right">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" @click="editGoal(row)" title="双击行也可编辑">编辑</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" type="danger" @click="deleteGoalItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="color: #909399; font-size: 14px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        共 {{ filteredGoals.length }} 条数据
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="filteredGoals.length"
        layout="sizes, prev, pager, next, jumper"
        background
      />
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog
      v-model="showDialog"
      :title="form.id ? '编辑目标' : '新增目标'"
      width="600px"
      :close-on-click-modal="false"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="goalRules" ref="goalFormRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="目标标题" prop="title">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.title" placeholder="请输入目标标题" clearable autofocus />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="描述" prop="description">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入目标描述" maxlength="500" show-word-limit />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="类型" prop="type">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.type" placeholder="请选择目标类型" style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="KPI" value="KPI" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="OKR" value="OKR" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="开始日期" prop="startDate">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="结束日期" prop="endDate">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.endDate" type="date" placeholder="选择结束日期" value-format="YYYY-MM-DD" style="width: 100%" :disabled-date="disabledEndDate" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="进度">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-slider v-model="form.progress" :max="100" show-input />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="cancelGoalForm" icon="el-icon-close">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="saveGoal" :loading="saving" icon="el-icon-check">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useBatchOperations } from '../composables/useBatchOperations'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { createColumn } from '../composables/useTableColumns'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ExportHelper } from '../utils/exportHelper'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import ColumnConfig from '../components/ColumnConfig.vue'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const goals = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({ progress: 0 })
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const goalFormRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filterStatus = ref('')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const saving = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const goalRules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  title: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入目标标题', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 2, max: 100, message: '标题长度在 2 到 100 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  description: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { max: 500, message: '描述不能超过 500 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  type: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择目标类型', trigger: 'change' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  startDate: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择开始日期', trigger: 'change' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  endDate: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择结束日期', trigger: 'change' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// 列配置
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const allColumns = ref([
  // 行注释：配置对象或数组中的一项内容。
  createColumn('title', '目标标题', { sortable: true, minWidth: 200 }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('type', '类型', { width: 100, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('startDate', '开始日期', { width: 120, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('endDate', '结束日期', { width: 120, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('progress', '进度', { width: 180, sortable: true }),
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  createColumn('status', '状态', { width: 100, sortable: true })
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
])

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const visibleColumns = ref([...allColumns.value])

// 列配置变化处理
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleColumnChange = (columns) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  visibleColumns.value = columns
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filteredGoals = computed(() => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!filterStatus.value) return goals.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return goals.value.filter(goal => goal.status === filterStatus.value)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const paginatedGoals = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const start = (currentPage.value - 1) * pageSize.value
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const end = start + pageSize.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return filteredGoals.value.slice(start, end)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadGoals = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getGoals()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    goals.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载目标数据失败')
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
const editGoal = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const cancelGoalForm = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = false
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { progress: 0 }
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (goalFormRef.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    goalFormRef.value.resetFields()
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveGoal = async () => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!goalFormRef.value) return

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  await goalFormRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    saving.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (form.value.id) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateGoal(form.value.id, form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('目标更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createGoal(form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('目标添加成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelGoalForm()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadGoals()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('保存失败，请检查输入信息')
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
const deleteGoalItem = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除目标"${row.title}"吗？此操作不可恢复，相关的任务数据也会受到影响。`,
    // 行注释：配置对象或数组中的一项内容。
    '删除确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定删除',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：配置对象或数组中的一项内容。
      type: 'warning',
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteGoal(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadGoals()
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

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件导出数据时使用，把当前列表或选中记录整理成文件。
const exportGoals = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.exportGoals()
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const url = window.URL.createObjectURL(new Blob([res.data]))
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const link = document.createElement('a')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    link.href = url
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.setAttribute('download', `goals_${new Date().getTime()}.csv`)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    document.body.appendChild(link)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.click()
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.remove()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('导出成功')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('导出失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const disabledEndDate = (time) => {
  // 结束日期不能早于开始日期
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (form.value.startDate) {
    // 行注释：返回当前函数的计算结果或组件配置。
    return time.getTime() < new Date(form.value.startDate).getTime()
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return false
// 行注释：结束当前代码块或函数调用。
}

// 批量操作
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const {
  // 行注释：配置对象或数组中的一项内容。
  selectedRows,
  // 行注释：配置对象或数组中的一项内容。
  selectedCount,
  // 行注释：配置对象或数组中的一项内容。
  hasSelection,
  // 行注释：配置对象或数组中的一项内容。
  handleSelectionChange,
  // 行注释：配置对象或数组中的一项内容。
  batchDelete,
  // 行注释：配置对象或数组中的一项内容。
  batchUpdateStatus,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  batchExport: batchExportHelper
// 行注释：当前行参与完成页面交互或数据处理逻辑。
} = useBatchOperations(
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  {
    // 行注释：配置对象或数组中的一项内容。
    delete: api.deleteGoal,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    update: api.updateGoal
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loadGoals
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
)

// 可选择判断
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const checkSelectable = (row) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return true
// 行注释：结束当前代码块或函数调用。
}

// 批量操作命令处理
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleBatchAction = (command) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const statusMap = {
    // 行注释：配置对象或数组中的一项内容。
    batchPending: ['pending', '待开始'],
    // 行注释：配置对象或数组中的一项内容。
    batchInProgress: ['in_progress', '进行中'],
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    batchCompleted: ['completed', '已完成']
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (command === 'batchExport') {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    handleBatchExport()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } else if (command === 'batchDelete') {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    batchDelete()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } else if (statusMap[command]) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const [status, statusName] = statusMap[command]
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    batchUpdateStatus(status, statusName)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 批量导出
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleBatchExport = () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const exportColumns = [
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'title', label: '目标标题' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'type', label: '类型' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'startDate', label: '开始日期' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'endDate', label: '结束日期' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'progress', label: '进度' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { prop: 'status', label: '状态' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  batchExportHelper(exportColumns, 'goals')
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
    ElMessage.info('快捷键: Ctrl+N 新增目标')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+r': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadGoals()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+R 刷新数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+e': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    exportGoals()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+E 导出数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'escape': () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (showDialog.value) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelGoalForm()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: ESC 关闭对话框')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadGoals)
</script>

