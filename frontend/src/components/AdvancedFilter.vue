<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <el-drawer
    v-model="visible"
    :title="title"
    direction="rtl"
    :size="size"
    :before-close="handleClose"
  >
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <div class="filter-container">
      <!-- 筛选条件列表 -->
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div class="filter-items">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form :model="filterForm" label-width="100px" label-position="top">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-form-item
            v-for="(item, index) in filters"
            :key="index"
            :label="item.label"
          >
            <!-- 文本输入 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-input
              v-if="item.type === 'text'"
              v-model="filterForm[item.field]"
              :placeholder="`请输入${item.label}`"
              clearable
            />

            <!-- 数字输入 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-input-number
              v-else-if="item.type === 'number'"
              v-model="filterForm[item.field]"
              :placeholder="`请输入${item.label}`"
              style="width: 100%"
            />

            <!-- 数字范围 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div v-else-if="item.type === 'numberRange'" class="range-input">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input-number
                v-model="filterForm[item.field + 'Min']"
                placeholder="最小值"
                style="width: 48%"
              />
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <span style="margin: 0 2%">~</span>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input-number
                v-model="filterForm[item.field + 'Max']"
                placeholder="最大值"
                style="width: 48%"
              />
            </div>

            <!-- 下拉选择 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-select
              v-else-if="item.type === 'select'"
              v-model="filterForm[item.field]"
              :placeholder="`请选择${item.label}`"
              clearable
              style="width: 100%"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <!-- 多选 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-select
              v-else-if="item.type === 'multiSelect'"
              v-model="filterForm[item.field]"
              :placeholder="`请选择${item.label}`"
              multiple
              clearable
              collapse-tags
              style="width: 100%"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <!-- 日期选择 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-date-picker
              v-else-if="item.type === 'date'"
              v-model="filterForm[item.field]"
              type="date"
              :placeholder="`请选择${item.label}`"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />

            <!-- 日期范围 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-date-picker
              v-else-if="item.type === 'dateRange'"
              v-model="filterForm[item.field]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              style="width: 100%"
            />

            <!-- 时间范围 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-date-picker
              v-else-if="item.type === 'datetimeRange'"
              v-model="filterForm[item.field]"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />

            <!-- 开关 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-switch
              v-else-if="item.type === 'switch'"
              v-model="filterForm[item.field]"
              :active-text="item.activeText || '是'"
              :inactive-text="item.inactiveText || '否'"
            />

            <!-- 单选组 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-radio-group
              v-else-if="item.type === 'radio'"
              v-model="filterForm[item.field]"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-radio
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
              >
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                {{ option.label }}
              </el-radio>
            </el-radio-group>

            <!-- 复选框组 -->
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-checkbox-group
              v-else-if="item.type === 'checkbox'"
              v-model="filterForm[item.field]"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-checkbox
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
              >
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <!-- 快捷筛选 -->
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div v-if="quickFilters && quickFilters.length > 0" class="quick-filters">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-divider content-position="left">快捷筛选</el-divider>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div class="quick-filter-tags">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag
            v-for="(quick, index) in quickFilters"
            :key="index"
            :type="isQuickFilterActive(quick) ? 'primary' : 'info'"
            effect="plain"
            style="margin: 5px; cursor: pointer"
            @click="applyQuickFilter(quick)"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ quick.label }}
          </el-tag>
        </div>
      </div>

      <!-- 已应用的筛选条件 -->
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div v-if="hasActiveFilters" class="active-filters">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-divider content-position="left">已应用筛选</el-divider>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div class="active-filter-tags">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag
            v-for="(value, key) in activeFilterTags"
            :key="key"
            closable
            @close="removeFilter(key)"
            style="margin: 5px"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ value }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <template #footer>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div class="drawer-footer">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="resetFilters" icon="el-icon-refresh-left">重置</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="applyFilters" icon="el-icon-check">应用筛选</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed, watch } from 'vue'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const props = defineProps({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  modelValue: {
    // 行注释：配置对象或数组中的一项内容。
    type: Boolean,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    default: false
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  title: {
    // 行注释：配置对象或数组中的一项内容。
    type: String,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    default: '高级筛选'
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  size: {
    // 行注释：配置对象或数组中的一项内容。
    type: String,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    default: '400px'
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  filters: {
    // 行注释：配置对象或数组中的一项内容。
    type: Array,
    // 行注释：配置对象或数组中的一项内容。
    required: true,
    // 格式: [{ field, label, type, options }]
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  quickFilters: {
    // 行注释：配置对象或数组中的一项内容。
    type: Array,
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    default: () => []
    // 格式: [{ label, filters: { field: value } }]
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const emit = defineEmits(['update:modelValue', 'apply', 'reset'])

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const visible = computed({
  // 行注释：配置对象或数组中的一项内容。
  get: () => props.modelValue,
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  set: (val) => emit('update:modelValue', val)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filterForm = ref({})

// 初始化筛选表单
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const initFilterForm = () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const form = {}
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  props.filters.forEach(filter => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filter.type === 'multiSelect' || filter.type === 'checkbox') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      form[filter.field] = []
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'numberRange') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      form[filter.field + 'Min'] = null
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      form[filter.field + 'Max'] = null
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'switch') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      form[filter.field] = false
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      form[filter.field] = null
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  filterForm.value = form
// 行注释：结束当前代码块或函数调用。
}

// 监听filters变化，重新初始化
// 行注释：开始一个代码块，下面是该结构内部逻辑。
watch(() => props.filters, () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  initFilterForm()
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
}, { immediate: true })

// 是否有激活的筛选条件
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const hasActiveFilters = computed(() => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return Object.values(filterForm.value).some(value => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (Array.isArray(value)) {
      // 行注释：返回当前函数的计算结果或组件配置。
      return value.length > 0
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：返回当前函数的计算结果或组件配置。
    return value !== null && value !== undefined && value !== ''
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
})

// 已激活的筛选标签
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeFilterTags = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const tags = {}
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  props.filters.forEach(filter => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const value = filterForm.value[filter.field]

    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filter.type === 'numberRange') {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const min = filterForm.value[filter.field + 'Min']
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const max = filterForm.value[filter.field + 'Max']
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (min !== null || max !== null) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        tags[filter.field] = `${filter.label}: ${min || '∞'} ~ ${max || '∞'}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'dateRange' || filter.type === 'datetimeRange') {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (value && value.length === 2) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        tags[filter.field] = `${filter.label}: ${value[0]} ~ ${value[1]}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'multiSelect' || filter.type === 'checkbox') {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (value && value.length > 0) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const labels = value.map(v => {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const option = filter.options?.find(opt => opt.value === v)
          // 行注释：返回当前函数的计算结果或组件配置。
          return option?.label || v
        // 行注释：结束当前代码块或函数调用。
        })
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        tags[filter.field] = `${filter.label}: ${labels.join(', ')}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'select' || filter.type === 'radio') {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (value !== null && value !== undefined && value !== '') {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const option = filter.options?.find(opt => opt.value === value)
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        tags[filter.field] = `${filter.label}: ${option?.label || value}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'switch') {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (value) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        tags[filter.field] = `${filter.label}: ${filter.activeText || '是'}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (value !== null && value !== undefined && value !== '') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      tags[filter.field] = `${filter.label}: ${value}`
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
  // 行注释：返回当前函数的计算结果或组件配置。
  return tags
// 行注释：结束当前代码块或函数调用。
})

// 移除单个筛选条件
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const removeFilter = (field) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const filter = props.filters.find(f => f.field === field)
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (filter) {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filter.type === 'numberRange') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[field + 'Min'] = null
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[field + 'Max'] = null
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'multiSelect' || filter.type === 'checkbox') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[field] = []
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (filter.type === 'switch') {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[field] = false
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[field] = null
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 应用筛选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const applyFilters = () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const activeFilters = {}

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  props.filters.forEach(filter => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filter.type === 'numberRange') {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const min = filterForm.value[filter.field + 'Min']
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const max = filterForm.value[filter.field + 'Max']
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (min !== null || max !== null) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        activeFilters[filter.field] = { min, max }
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const value = filterForm.value[filter.field]
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (filter.type === 'multiSelect' || filter.type === 'checkbox') {
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (value && value.length > 0) {
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          activeFilters[filter.field] = value
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else if (value !== null && value !== undefined && value !== '' && value !== false) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        activeFilters[filter.field] = value
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  emit('apply', activeFilters)
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  visible.value = false
// 行注释：结束当前代码块或函数调用。
}

// 重置筛选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块清空或重置页面状态，便于用户重新筛选、选择或填写。
const resetFilters = () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  initFilterForm()
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  emit('reset')
// 行注释：结束当前代码块或函数调用。
}

// 关闭抽屉
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleClose = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  visible.value = false
// 行注释：结束当前代码块或函数调用。
}

// 判断快捷筛选是否激活
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const isQuickFilterActive = (quick) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return Object.entries(quick.filters).every(([key, value]) => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return filterForm.value[key] === value
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 应用快捷筛选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
const applyQuickFilter = (quick) => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  Object.entries(quick.filters).forEach(([key, value]) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (filterForm.value.hasOwnProperty(key)) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      filterForm.value[key] = value
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}
</script>

<style scoped>
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.filter-container {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0 20px 20px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.filter-items {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-bottom: 20px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.range-input {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：当前行属于页面样式定义。 */
.quick-filters,
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.active-filters {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-top: 20px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：当前行属于页面样式定义。 */
.quick-filter-tags,
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.active-filter-tags {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    flex-wrap: wrap;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.drawer-footer {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: flex-end;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    gap: 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
:deep(.el-drawer__header) {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-bottom: 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding-bottom: 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-bottom: 1px solid #ebeef5;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
:deep(.el-drawer__footer) {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 20px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-top: 1px solid #ebeef5;
/* 行注释：结束当前样式规则。 */
}
</style>

