<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showDialog = true" icon="el-icon-plus" title="Ctrl+N">新增员工</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="success" @click="exportData" icon="el-icon-download" title="Ctrl+E">导出数据</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadEmployees" icon="el-icon-refresh" :loading="loading" title="Ctrl+R">刷新</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-divider direction="vertical" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-dropdown @command="handleBatchAction" :disabled="!hasSelection">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button type="warning" :disabled="!hasSelection">
            批量操作 <el-badge :value="selectedCount" :hidden="!hasSelection" class="item" style="margin-left: 10px" />
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
              <el-dropdown-item command="batchActive" icon="el-icon-check" divided>批量设为在职</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchInactive" icon="el-icon-close">批量设为离职</el-dropdown-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-dropdown-item command="batchDelete" icon="el-icon-delete" divided style="color: #f56c6c">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tooltip content="Ctrl+N:新增 | Ctrl+R:刷新 | Ctrl+E:导出 | Ctrl+F:搜索 | ESC:关闭" placement="bottom">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button icon="el-icon-question" circle style="margin-left: 10px"></el-button>
        </el-tooltip>
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="display: flex; gap: 10px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-input v-model="searchText" placeholder="搜索员工姓名或工号(Ctrl+F)" style="width: 280px" clearable @keyup.enter="currentPage = 1">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #prefix>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-search"></i>
          </template>
        </el-input>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="openFilter" icon="el-icon-setting">
          高级筛选
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-badge v-if="activeFilterCount > 0" :value="activeFilterCount" class="item" style="margin-left: 5px" />
        </el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <ColumnConfig :columns="allColumns" storage-key="employeeListColumns" @change="handleColumnChange" />
      </div>
    </div>

    <!-- 激活的筛选标签 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div v-if="hasActiveFilters" style="margin-bottom: 10px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tag
        v-for="(value, key) in activeFilters"
        :key="key"
        closable
        @close="removeFilter(key)"
        style="margin-right: 8px"
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        {{ getFilterLabel(key) }}
      </el-tag>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button type="text" @click="resetFilter" icon="el-icon-refresh-left" style="margin-left: 10px">清空筛选</el-button>
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-if="!loading && employees.length === 0" description="暂无员工数据">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button type="primary" @click="showDialog = true">新增员工</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-empty v-else-if="!loading && filteredEmployees.length === 0 && searchText" description="未找到匹配的员工">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-button @click="searchText = ''">清空搜索</el-button>
    </el-empty>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-table
      v-else
      :data="paginatedEmployees"
      v-loading="loading"
      style="margin-top: 20px"
      default-sort="{prop: 'joinDate', order: 'descending'}"
      @row-dblclick="viewDetail"
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
        <template v-if="col.prop === 'status'" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="row.status === 1 ? 'success' : 'info'" @click="toggleStatus(row)" style="cursor: pointer">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ row.status === 1 ? '在职' : '离职' }}
          </el-tag>
        </template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template v-else-if="col.formatter" #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ col.formatter(row) }}
        </template>
      </el-table-column>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table-column label="操作" width="250" fixed="right">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <template #default="{ row }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" @click="viewDetail(row)" title="双击行也可查看详情">详情</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" @click="editEmployee(row)">编辑</el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button size="small" type="danger" @click="deleteEmp(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="color: #909399; font-size: 14px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        共 {{ filteredEmployees.length }} 条数据
      </div>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="filteredEmployees.length"
        layout="sizes, prev, pager, next, jumper"
        background
      />
    </div>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog
      v-model="showDialog"
      :title="form.id ? '编辑员工' : '新增员工'"
      width="600px"
      :close-on-click-modal="false"
      @open="handleDialogOpen"
    >
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="employeeRules" ref="employeeFormRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="工号" prop="empNo">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.empNo" placeholder="请输入员工工号" clearable autofocus />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="姓名" prop="name">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.name" placeholder="请输入员工姓名" clearable />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="电话" prop="phone">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.phone" placeholder="请输入联系电话" clearable maxlength="11" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="邮箱" prop="email">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input v-model="form.email" placeholder="请输入电子邮箱" clearable />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="所属部门" prop="departmentId">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-select v-model="form.departmentId" placeholder="请选择部门" clearable style="width: 100%">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-option
              v-for="dept in departments"
              :key="dept.id"
              :label="dept.name"
              :value="dept.id"
            />
          </el-select>
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="入职日期" prop="joinDate">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-date-picker
            v-model="form.joinDate"
            type="date"
            placeholder="选择入职日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="状态" prop="status">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-radio-group v-model="form.status">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-radio :label="1">在职</el-radio>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-radio :label="0">离职</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="cancelEmployeeForm" icon="el-icon-close">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="saveEmployee" :loading="saving" icon="el-icon-check">保存</el-button>
      </template>
    </el-dialog>

    <!-- 高级筛选抽屉 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <AdvancedFilter
      v-model="showFilterDrawer"
      title="员工高级筛选"
      :filters="filterConfigs"
      :quick-filters="quickFilters"
      @apply="applyFilter"
      @reset="resetFilter"
    />
  </div>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useBatchOperations } from '../composables/useBatchOperations'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useAdvancedFilter, createFilterConfigs } from '../composables/useAdvancedFilter'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { createColumn } from '../composables/useTableColumns'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ExportHelper } from '../utils/exportHelper'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import AdvancedFilter from '../components/AdvancedFilter.vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import ColumnConfig from '../components/ColumnConfig.vue'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const employees = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const showDialog = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({})
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const employeeFormRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const searchText = ref('')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const saving = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const employeeRules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  empNo: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入员工工号', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 3, max: 20, message: '工号长度在 3 到 20 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  name: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 2, max: 50, message: '姓名长度在 2 到 50 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  phone: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  email: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  joinDate: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择入职日期', trigger: 'change' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// 状态排序方法
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const sortByStatus = (a, b) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return (a.status || 0) - (b.status || 0)
// 行注释：结束当前代码块或函数调用。
}

// 列配置
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const allColumns = ref([
  // 行注释：配置对象或数组中的一项内容。
  createColumn('empNo', '工号', { width: 120, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('name', '姓名', { width: 120, sortable: true }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('departmentId', '所属部门', { width: 150, formatter: (row) => getDepartmentName(row.departmentId) }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('phone', '电话', { width: 150 }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('email', '邮箱', { width: 200 }),
  // 行注释：配置对象或数组中的一项内容。
  createColumn('joinDate', '入职日期', { width: 120, sortable: true }),
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  createColumn('status', '状态', { width: 100, sortable: true, sortMethod: sortByStatus })
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
])

// 获取部门名称
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const departments = ref([])
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getDepartmentName = (departmentId) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const dept = departments.value.find(d => d.id === departmentId)
  // 行注释：返回当前函数的计算结果或组件配置。
  return dept ? dept.name : '-'
// 行注释：结束当前代码块或函数调用。
}

// 加载部门数据
// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadDepartments = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getDepartments()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    departments.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.error('加载部门数据失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

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

// filteredEmployees 移到高级筛选部分定义

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const paginatedEmployees = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const start = (currentPage.value - 1) * pageSize.value
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const end = start + pageSize.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return filteredEmployees.value.slice(start, end)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadEmployees = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getEmployees()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    employees.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载员工数据失败')
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
const editEmployee = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = { ...row, status: row.status || 1 }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const cancelEmployeeForm = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  showDialog.value = false
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  form.value = {}
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (employeeFormRef.value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    employeeFormRef.value.resetFields()
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveEmployee = async () => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!employeeFormRef.value) return

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  await employeeFormRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    saving.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (form.value.id) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.updateEmployee(form.value.id, form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('员工信息更新成功')
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.createEmployee(form.value)
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.success('员工添加成功')
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelEmployeeForm()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadEmployees()
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
const deleteEmp = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除员工"${row.name}"吗？此操作不可恢复。`,
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
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteEmployee(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadEmployees()
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
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const viewDetail = (row) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const id = row.id || row
  // 行注释：执行路由跳转或读取路由信息。
  router.push(`/employees/${id}`)
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const toggleStatus = async (row) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const newStatus = row.status === 1 ? 0 : 1
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const statusText = newStatus === 1 ? '在职' : '离职'

  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要将员工"${row.name}"状态改为"${statusText}"吗？`,
    // 行注释：配置对象或数组中的一项内容。
    '状态更改确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：配置对象或数组中的一项内容。
      type: 'info',
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.updateEmployee(row.id, { ...row, status: newStatus })
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('状态更新成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadEmployees()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('状态更新失败')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  }).catch(() => {})
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件导出数据时使用，把当前列表或选中记录整理成文件。
const exportData = async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.exportEmployees()
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const url = window.URL.createObjectURL(new Blob([res.data]))
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const link = document.createElement('a')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    link.href = url
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.setAttribute('download', `employees_${new Date().getTime()}.csv`)
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
const disabledDate = (time) => {
  // 禁止选择未来日期
  // 行注释：返回当前函数的计算结果或组件配置。
  return time.getTime() > Date.now()
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleDialogOpen = () => {
  // 对话框打开时的处理，可以添加焦点设置等
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!form.value.id) {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    form.value.status = 1 // 新增时默认在职
  // 行注释：结束当前代码块或函数调用。
  }
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
    delete: api.deleteEmployee,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    update: api.updateEmployee
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loadEmployees
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
)

// 可选择判断（可自定义规则）
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const checkSelectable = (row) => {
  // 例如：离职员工不可选择
  // return row.status === 1
  // 行注释：返回当前函数的计算结果或组件配置。
  return true
// 行注释：结束当前代码块或函数调用。
}

// 批量操作命令处理
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleBatchAction = (command) => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  switch (command) {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    case 'batchExport':
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      handleBatchExport()
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      break
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    case 'batchActive':
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      batchUpdateStatus(1, '在职')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      break
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    case 'batchInactive':
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      batchUpdateStatus(0, '离职')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      break
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    case 'batchDelete':
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      batchDelete()
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      break
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
    { prop: 'empNo', label: '工号' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'name', label: '姓名' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'phone', label: '电话' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'email', label: '邮箱' },
    // 行注释：配置对象或数组中的一项内容。
    { prop: 'joinDate', label: '入职日期' },
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      prop: 'status',
      // 行注释：配置对象或数组中的一项内容。
      label: '状态',
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      formatter: (row) => row.status === 1 ? '在职' : '离职'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  batchExportHelper(exportColumns, 'employees')
// 行注释：结束当前代码块或函数调用。
}

// 高级筛选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const {
  // 行注释：配置对象或数组中的一项内容。
  showFilterDrawer,
  // 行注释：配置对象或数组中的一项内容。
  activeFilters,
  // 行注释：配置对象或数组中的一项内容。
  filteredData: advancedFilteredData,
  // 行注释：配置对象或数组中的一项内容。
  hasActiveFilters,
  // 行注释：配置对象或数组中的一项内容。
  activeFilterCount,
  // 行注释：配置对象或数组中的一项内容。
  openFilter,
  // 行注释：配置对象或数组中的一项内容。
  applyFilter,
  // 行注释：配置对象或数组中的一项内容。
  resetFilter,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  removeFilter
// 行注释：开始一个代码块，下面是该结构内部逻辑。
} = useAdvancedFilter(employees, {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  customFilterFn: (item, filters) => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return Object.entries(filters).every(([field, value]) => {
      // 状态筛选
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (field === 'status') {
        // 行注释：返回当前函数的计算结果或组件配置。
        return item.status === value
      // 行注释：结束当前代码块或函数调用。
      }

      // 入职日期范围
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (field === 'joinDate' && Array.isArray(value) && value.length === 2) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const itemDate = new Date(item.joinDate).getTime()
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const startDate = new Date(value[0]).getTime()
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const endDate = new Date(value[1]).getTime()
        // 行注释：返回当前函数的计算结果或组件配置。
        return itemDate >= startDate && itemDate <= endDate
      // 行注释：结束当前代码块或函数调用。
      }

      // 部门筛选（多选）
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (field === 'department' && Array.isArray(value)) {
        // 行注释：返回当前函数的计算结果或组件配置。
        return value.includes(item.department)
      // 行注释：结束当前代码块或函数调用。
      }

      // 文本搜索（姓名、工号、电话、邮箱）
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (field === 'keyword' && value) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const keyword = value.toLowerCase()
        // 行注释：返回当前函数的计算结果或组件配置。
        return (
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          (item.name && item.name.toLowerCase().includes(keyword)) ||
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          (item.empNo && item.empNo.toLowerCase().includes(keyword)) ||
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          (item.phone && item.phone.includes(keyword)) ||
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          (item.email && item.email.toLowerCase().includes(keyword))
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        )
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：返回当前函数的计算结果或组件配置。
      return true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 筛选配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const filterConfigs = [
  // 行注释：配置对象或数组中的一项内容。
  createFilterConfigs.text('keyword', '关键词'),
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  createFilterConfigs.select('status', '员工状态', [
    // 行注释：配置对象或数组中的一项内容。
    { label: '在职', value: 1 },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { label: '离职', value: 0 }
  // 行注释：配置对象或数组中的一项内容。
  ]),
  // 行注释：配置对象或数组中的一项内容。
  createFilterConfigs.dateRange('joinDate', '入职日期'),
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  createFilterConfigs.multiSelect('department', '所属部门', [
    // 行注释：配置对象或数组中的一项内容。
    { label: '技术部', value: '技术部' },
    // 行注释：配置对象或数组中的一项内容。
    { label: '产品部', value: '产品部' },
    // 行注释：配置对象或数组中的一项内容。
    { label: '市场部', value: '市场部' },
    // 行注释：配置对象或数组中的一项内容。
    { label: '销售部', value: '销售部' },
    // 行注释：配置对象或数组中的一项内容。
    { label: '人事部', value: '人事部' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { label: '财务部', value: '财务部' }
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  ])
// 行注释：当前行参与完成页面交互或数据处理逻辑。
]

// 快捷筛选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const quickFilters = [
  // 行注释：配置对象或数组中的一项内容。
  { label: '在职员工', filters: { status: 1 } },
  // 行注释：配置对象或数组中的一项内容。
  { label: '离职员工', filters: { status: 0 } },
  // 行注释：配置对象或数组中的一项内容。
  { label: '本月入职', filters: { joinDate: [getMonthStart(), getMonthEnd()] } },
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  { label: '本年入职', filters: { joinDate: [getYearStart(), getYearEnd()] } }
// 行注释：当前行参与完成页面交互或数据处理逻辑。
]

// 获取月初日期
// 行注释：定义可复用函数，封装一段前端业务逻辑。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
function getMonthStart() {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const now = new Date()
  // 行注释：返回当前函数的计算结果或组件配置。
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
// 行注释：结束当前代码块或函数调用。
}

// 获取月末日期
// 行注释：定义可复用函数，封装一段前端业务逻辑。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
function getMonthEnd() {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const now = new Date()
  // 行注释：返回当前函数的计算结果或组件配置。
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
// 行注释：结束当前代码块或函数调用。
}

// 获取年初日期
// 行注释：定义可复用函数，封装一段前端业务逻辑。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
function getYearStart() {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const now = new Date()
  // 行注释：返回当前函数的计算结果或组件配置。
  return new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]
// 行注释：结束当前代码块或函数调用。
}

// 获取年末日期
// 行注释：定义可复用函数，封装一段前端业务逻辑。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
function getYearEnd() {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const now = new Date()
  // 行注释：返回当前函数的计算结果或组件配置。
  return new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0]
// 行注释：结束当前代码块或函数调用。
}

// 获取筛选标签文本
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getFilterLabel = (key) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const filterConfig = filterConfigs.find(f => f.field === key)
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!filterConfig) return key

  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const value = activeFilters.value[key]

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (key === 'status') {
    // 行注释：返回当前函数的计算结果或组件配置。
    return `${filterConfig.label}: ${value === 1 ? '在职' : '离职'}`
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (key === 'joinDate' && Array.isArray(value)) {
    // 行注释：返回当前函数的计算结果或组件配置。
    return `${filterConfig.label}: ${value[0]} ~ ${value[1]}`
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (key === 'department' && Array.isArray(value)) {
    // 行注释：返回当前函数的计算结果或组件配置。
    return `${filterConfig.label}: ${value.join(', ')}`
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (key === 'keyword') {
    // 行注释：返回当前函数的计算结果或组件配置。
    return `${filterConfig.label}: ${value}`
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：返回当前函数的计算结果或组件配置。
  return `${filterConfig.label}: ${value}`
// 行注释：结束当前代码块或函数调用。
}

// 合并搜索和高级筛选的数据
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filteredEmployees = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  let result = advancedFilteredData.value

  // 应用简单搜索
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (searchText.value) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const search = searchText.value.toLowerCase()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    result = result.filter(emp =>
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      (emp.name && emp.name.toLowerCase().includes(search)) ||
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      (emp.empNo && emp.empNo.toLowerCase().includes(search))
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    )
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：返回当前函数的计算结果或组件配置。
  return result
// 行注释：结束当前代码块或函数调用。
})

// 键盘快捷键配置
// 行注释：开始一个代码块，下面是该结构内部逻辑。
useKeyboardShortcuts({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+n': () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showDialog.value = true
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+N 新增员工')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+r': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadEmployees()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+R 刷新数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+e': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    exportData()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+E 导出数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+f': () => {
    // 聚焦搜索框
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const searchInput = document.querySelector('input[placeholder*="搜索"]')
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (searchInput) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      searchInput.focus()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: Ctrl+F 搜索')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'escape': () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (showDialog.value) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cancelEmployeeForm()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: ESC 关闭对话框')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：开始一个代码块，下面是该结构内部逻辑。
onMounted(() => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  loadDepartments()
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  loadEmployees()
// 行注释：结束当前代码块或函数调用。
})
</script>

