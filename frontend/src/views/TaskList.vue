<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button type="primary" @click="showDialog = true" icon="el-icon-plus" title="Ctrl+N">新增任务</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button @click="loadTasks" icon="el-icon-refresh" :loading="loading" title="Ctrl+R">刷新</el-button>
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
                <el-dropdown-item command="batchPaused" icon="el-icon-video-pause">批量设为暂停</el-dropdown-item>
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <el-dropdown-item command="batchDelete" icon="el-icon-delete" divided style="color: #f56c6c">批量删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tooltip content="Ctrl+N:新增 | Ctrl+R:刷新 | ESC:关闭" placement="bottom">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button icon="el-icon-question" circle style="margin-left: 10px"></el-button>
          </el-tooltip>
        </div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div style="display: flex; gap: 10px">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="filterPriority" placeholder="筛选优先级" style="width: 120px" clearable>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="低" value="low" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="中" value="medium" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="高" value="high" />
          </el-select>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="filterStatus" placeholder="筛选状态" style="width: 120px" clearable>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="待开始" value="pending" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="进行中" value="in_progress" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="已完成" value="completed" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="暂停" value="paused" />
          </el-select>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <ColumnConfig :columns="allColumns" storage-key="taskListColumns" @change="handleColumnChange" />
        </div>
      </div>
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-if="!loading && tasks.length === 0" description="暂无任务数据">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button type="primary" @click="showDialog = true">新增任务</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-else-if="!loading && filteredTasks.length === 0 && (filterPriority || filterStatus)" description="未找到匹配的任务">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button @click="filterPriority = ''; filterStatus = ''">清空筛选</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-table
      v-else
      :data="paginatedTasks"
      v-loading="loading"
      style="margin-top: 20px"
      default-sort="{prop: 'endDate', order: 'ascending'}"
      @row-dblclick="editTask"
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
        <template v-if="col.prop === 'priority'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="getPriorityType(row.priority)">{{ getPriorityText(row.priority) }}</el-tag>
        </template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-else-if="col.prop === 'progress'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-progress :percentage="row.progress || 0" />
        </template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-else-if="col.prop === 'status'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="getStatusType(row.status)" @click="quickStatusChange(row)" style="cursor: pointer" title="点击快速更改状态">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ getStatusText(row.status) }}
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
          <el-button size="small" @click="editTask(row)" title="双击行也可编辑">编辑</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" type="danger" @click="deleteTaskItem(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="color: #909399; font-size: 14px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        共 {{ filteredTasks.length }} 条数据
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="filteredTasks.length"
        layout="sizes, prev, pager, next, jumper"
        background
      />
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog
      v-model="showDialog"
      :title="form.id ? '编辑任务' : '新增任务'"
      width="600px"
      :close-on-click-modal="false"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="taskRules" ref="taskFormRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="任务标题" prop="title">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.title" placeholder="请输入任务标题" clearable autofocus />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="描述" prop="description">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入任务描述" maxlength="500" show-word-limit />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="关联目标">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input-number v-model="form.goalId" :min="1" placeholder="目标ID" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="优先级" prop="priority">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.priority" placeholder="请选择优先级" style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="低" value="low" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="中" value="medium" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="高" value="high" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="预计工时">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input-number v-model="form.estimatedHours" :min="0" :step="0.5" :precision="1" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="状态" prop="status">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="待开始" value="pending" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="进行中" value="in_progress" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="已完成" value="completed" />
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option label="暂停" value="paused" />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="进度">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-slider v-model="form.progress" :max="100" show-input />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="开始日期" prop="startDate">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择开始日期" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="截止日期" prop="endDate">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker v-model="form.endDate" type="date" placeholder="选择截止日期" value-format="YYYY-MM-DD" style="width: 100%" :disabled-date="disabledEndDate" />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="cancelTaskForm" icon="el-icon-close">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="saveTask" :loading="saving" icon="el-icon-check">保存</el-button>
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
const tasks = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({ progress: 0, status: 'pending', priority: 'medium' })
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const taskFormRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const saving = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filterPriority = ref('')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filterStatus = ref('')

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const taskRules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  title: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入任务标题', trigger: 'blur' },
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
  priority: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择优先级', trigger: 'change' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  status: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择状态', trigger: 'change' }
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
    { required: true, message: '请选择截止日期', trigger: 'change' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// Helper functions (must be defined before column configuration)
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const sortByPriority = (a, b) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const priorityOrder = { low: 1, medium: 2, high: 3 }
  // 行注释：返回当前函数的计算结果或组件配置。
  return priorityOrder[a.priority] - priorityOrder[b.priority]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const sortByStatus = (a, b) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const statusOrder = { pending: 1, in_progress: 2, paused: 3, completed: 4 }
  // 行注释：返回当前函数的计算结果或组件配置。
  return statusOrder[a.status] - statusOrder[b.status]
// 行注释：结束当前代码块或函数调用。
}

// 列配置
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const allColumns = ref([
  // 行注释：配置对象或数组中的一项内容。
  createColumn('title', '任务标题', { sortable: true, minWidth: 200 }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('priority', '优先级', { width: 100, sortable: true, sortMethod: sortByPriority }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('progress', '进度', { width: 150, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('status', '状态', { width: 100, sortable: true, sortMethod: sortByStatus }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('startDate', '开始日期', { width: 120, sortable: true }),
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  createColumn('endDate', '截止日期', { width: 120, sortable: true })
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
const filteredTasks = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  let result = tasks.value
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (filterPriority.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    result = result.filter(task => task.priority === filterPriority.value)
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (filterStatus.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    result = result.filter(task => task.status === filterStatus.value)
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return result
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const paginatedTasks = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const start = (currentPage.value - 1) * pageSize.value
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const end = start + pageSize.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return filteredTasks.value.slice(start, end)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadTasks = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getTasks()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    tasks.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载任务列表失败')
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
const editTask = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const cancelTaskForm = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = false
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { progress: 0, status: 'pending', priority: 'medium' }
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (taskFormRef.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    taskFormRef.value.resetFields()
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveTask = async () => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!taskFormRef.value) return

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  await taskFormRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    saving.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (form.value.id) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateTask(form.value.id, form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('任务更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createTask(form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('任务添加成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelTaskForm()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadTasks()
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
const deleteTaskItem = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除任务"${row.title}"吗？此操作不可恢复。`,
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
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      dangerouslyUseHTMLString: false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteTask(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadTasks()
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
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getPriorityType = (priority) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = { low: 'info', medium: 'warning', high: 'danger' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[priority] || 'info'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getPriorityText = (priority) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const texts = { low: '低', medium: '中', high: '高' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return texts[priority] || priority
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusType = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = { pending: 'info', in_progress: 'primary', completed: 'success', paused: 'warning' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[status] || 'info'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusText = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const texts = { pending: '待开始', in_progress: '进行中', completed: '已完成', paused: '暂停' }
  // 行注释：返回当前函数的计算结果或组件配置。
  return texts[status] || status
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const quickStatusChange = async (row) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const statusFlow = {
    // 行注释：配置对象或数组中的一项内容。
    pending: 'in_progress',
    // 行注释：配置对象或数组中的一项内容。
    in_progress: 'completed',
    // 行注释：配置对象或数组中的一项内容。
    completed: 'completed',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    paused: 'in_progress'
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const newStatus = statusFlow[row.status] || 'pending'

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (row.status === 'completed') {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('任务已完成')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：等待后端接口返回结果，再继续更新页面数据。
    await api.updateTask(row.id, { ...row, status: newStatus })
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success(`状态已更改为"${getStatusText(newStatus)}"`)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadTasks()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('状态更新失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const disabledEndDate = (time) => {
  // 截止日期不能早于开始日期
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
    delete: api.deleteTask,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    update: api.updateTask
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loadTasks
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
)

// 可选择判断
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const checkSelectable = (row) => {
  // 已完成的任务不可批量操作
  // return row.status !== 'completed'
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
    // 行注释：配置对象或数组中的一项内容。
    batchCompleted: ['completed', '已完成'],
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    batchPaused: ['paused', '暂停']
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
    { prop: 'title', label: '任务标题' },
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      prop: 'priority',
      // 行注释：配置对象或数组中的一项内容。
      label: '优先级',
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      formatter: (row) => getPriorityText(row.priority)
    // 行注释：配置对象或数组中的一项内容。
    },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'progress', label: '进度' },
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      prop: 'status',
      // 行注释：配置对象或数组中的一项内容。
      label: '状态',
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      formatter: (row) => getStatusText(row.status)
    // 行注释：配置对象或数组中的一项内容。
    },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'startDate', label: '开始日期' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { prop: 'endDate', label: '截止日期' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  batchExportHelper(exportColumns, 'tasks')
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
    ElMessage.info('快捷键: Ctrl+N 新增任务')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+r': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadTasks()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+R 刷新数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'escape': () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (showDialog.value) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelTaskForm()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: ESC 关闭对话框')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadTasks)
</script>

