// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed } from 'vue'

/**
 * 高级筛选组合函数
 * @param {Array} data - 原始数据
 * @param {Object} options - 选项
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：组合式函数模块对外提供可复用能力，页面引入后可直接复用其中的状态和方法。
export function useAdvancedFilter(data, options = {}) {
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const showFilterDrawer = ref(false)
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const activeFilters = ref({})
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const { customFilterFn } = options

  /**
   * 筛选后的数据
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const filteredData = computed(() => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (Object.keys(activeFilters.value).length === 0) {
      // 行注释：返回当前函数的计算结果或组件配置。
      return data.value
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return data.value.filter(item => {
      // 使用自定义筛选函数
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (customFilterFn) {
        // 行注释：返回当前函数的计算结果或组件配置。
        return customFilterFn(item, activeFilters.value)
      // 行注释：结束当前代码块或函数调用。
      }

      // 默认筛选逻辑
      // 行注释：返回当前函数的计算结果或组件配置。
      return Object.entries(activeFilters.value).every(([field, value]) => {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const itemValue = item[field]

        // 范围筛选（数字）
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (value && typeof value === 'object' && ('min' in value || 'max' in value)) {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const { min, max } = value
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (min !== null && min !== undefined && itemValue < min) return false
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (max !== null && max !== undefined && itemValue > max) return false
          // 行注释：返回当前函数的计算结果或组件配置。
          return true
        // 行注释：结束当前代码块或函数调用。
        }

        // 数组筛选（多选）
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (Array.isArray(value)) {
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (value.length === 0) return true
          // 行注释：返回当前函数的计算结果或组件配置。
          return value.includes(itemValue)
        // 行注释：结束当前代码块或函数调用。
        }

        // 日期范围筛选
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (Array.isArray(value) && value.length === 2) {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const [start, end] = value
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const itemDate = new Date(itemValue).getTime()
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const startDate = new Date(start).getTime()
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const endDate = new Date(end).getTime()
          // 行注释：返回当前函数的计算结果或组件配置。
          return itemDate >= startDate && itemDate <= endDate
        // 行注释：结束当前代码块或函数调用。
        }

        // 文本模糊匹配
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (typeof value === 'string' && typeof itemValue === 'string') {
          // 行注释：返回当前函数的计算结果或组件配置。
          return itemValue.toLowerCase().includes(value.toLowerCase())
        // 行注释：结束当前代码块或函数调用。
        }

        // 精确匹配
        // 行注释：返回当前函数的计算结果或组件配置。
        return itemValue === value
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  })

  /**
   * 是否有激活的筛选
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const hasActiveFilters = computed(() => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return Object.keys(activeFilters.value).length > 0
  // 行注释：结束当前代码块或函数调用。
  })

  /**
   * 激活的筛选数量
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const activeFilterCount = computed(() => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return Object.keys(activeFilters.value).length
  // 行注释：结束当前代码块或函数调用。
  })

  /**
   * 打开筛选抽屉
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块打开弹窗或切换显示状态，用于配合新增、编辑、筛选等交互。
  const openFilter = () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showFilterDrawer.value = true
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 关闭筛选抽屉
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
  const closeFilter = () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    showFilterDrawer.value = false
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 应用筛选
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
  const applyFilter = (filters) => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    activeFilters.value = { ...filters }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 重置筛选
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块清空或重置页面状态，便于用户重新筛选、选择或填写。
  const resetFilter = () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    activeFilters.value = {}
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 移除单个筛选
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
  const removeFilter = (field) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const newFilters = { ...activeFilters.value }
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    delete newFilters[field]
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    activeFilters.value = newFilters
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出筛选配置（用于保存用户偏好）
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块导出数据时使用，把当前列表或选中记录整理成文件。
  const exportFilterConfig = () => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return JSON.stringify(activeFilters.value)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导入筛选配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块执行筛选或搜索逻辑，帮助用户快速定位目标数据。
  const importFilterConfig = (config) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      activeFilters.value = JSON.parse(config)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('导入筛选配置失败:', error)
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：返回当前函数的计算结果或组件配置。
  return {
    // 状态
    // 行注释：配置对象或数组中的一项内容。
    showFilterDrawer,
    // 行注释：配置对象或数组中的一项内容。
    activeFilters,
    // 行注释：配置对象或数组中的一项内容。
    filteredData,
    // 行注释：配置对象或数组中的一项内容。
    hasActiveFilters,
    // 行注释：配置对象或数组中的一项内容。
    activeFilterCount,

    // 方法
    // 行注释：配置对象或数组中的一项内容。
    openFilter,
    // 行注释：配置对象或数组中的一项内容。
    closeFilter,
    // 行注释：配置对象或数组中的一项内容。
    applyFilter,
    // 行注释：配置对象或数组中的一项内容。
    resetFilter,
    // 行注释：配置对象或数组中的一项内容。
    removeFilter,
    // 行注释：配置对象或数组中的一项内容。
    exportFilterConfig,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    importFilterConfig
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建常用的筛选配置
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const createFilterConfigs = {
  /**
   * 文本筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  text: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'text'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 数字筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  number: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'number'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 数字范围筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  numberRange: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'numberRange'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 下拉选择筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  select: (field, label, options) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    type: 'select',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    options
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 多选筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  multiSelect: (field, label, options) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    type: 'multiSelect',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    options
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 日期筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  date: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'date'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 日期范围筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  dateRange: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'dateRange'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 时间范围筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  datetimeRange: (field, label) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'datetimeRange'
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 开关筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  switch: (field, label, activeText = '是', inactiveText = '否') => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    type: 'switch',
    // 行注释：配置对象或数组中的一项内容。
    activeText,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    inactiveText
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 单选组筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  radio: (field, label, options) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    type: 'radio',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    options
  // 行注释：配置对象或数组中的一项内容。
  }),

  /**
   * 复选框组筛选
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  checkbox: (field, label, options) => ({
    // 行注释：配置对象或数组中的一项内容。
    field,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    type: 'checkbox',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    options
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

