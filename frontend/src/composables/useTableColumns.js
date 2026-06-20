// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed } from 'vue'

/**
 * 表格列管理组合函数
 * @param {Array} defaultColumns - 默认列配置
 * @param {Object} options - 选项
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：组合式函数模块对外提供可复用能力，页面引入后可直接复用其中的状态和方法。
export function useTableColumns(defaultColumns, options = {}) {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const { storageKey = 'tableColumns' } = options

  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const allColumns = ref([...defaultColumns])
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const visibleColumns = ref([])

  /**
   * 初始化列配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const initColumns = () => {
    // 从localStorage加载配置
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const savedConfig = localStorage.getItem(storageKey)

    // 行注释：进行条件判断，控制页面逻辑分支。
    if (savedConfig) {
      // 行注释：开始异常捕获流程，常用于接口调用。
      try {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const config = JSON.parse(savedConfig)

        // 合并保存的配置
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const columnMap = new Map(config.map(c => [c.prop, c]))

        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        allColumns.value = defaultColumns.map((col, index) => {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const saved = columnMap.get(col.prop)
          // 行注释：返回当前函数的计算结果或组件配置。
          return {
            // 行注释：配置对象或数组中的一项内容。
            ...col,
            // 行注释：配置对象或数组中的一项内容。
            visible: saved ? saved.visible : (col.visible !== false),
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            order: saved ? saved.order : index
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        }).sort((a, b) => a.order - b.order)

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        updateVisibleColumns()
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } catch (error) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        console.error('加载列配置失败:', error)
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        resetToDefault()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      resetToDefault()
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 重置为默认配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块清空或重置页面状态，便于用户重新筛选、选择或填写。
  const resetToDefault = () => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    allColumns.value = defaultColumns.map((col, index) => ({
      // 行注释：配置对象或数组中的一项内容。
      ...col,
      // 行注释：配置对象或数组中的一项内容。
      visible: col.visible !== false,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      order: index
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    }))
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    updateVisibleColumns()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 更新可见列
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const updateVisibleColumns = () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    visibleColumns.value = allColumns.value.filter(col => col.visible)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 切换列可见性
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const toggleColumn = (prop) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const column = allColumns.value.find(col => col.prop === prop)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (column && !column.fixed) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      column.visible = !column.visible
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      updateVisibleColumns()
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 设置列可见性
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const setColumnVisible = (prop, visible) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const column = allColumns.value.find(col => col.prop === prop)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (column && !column.fixed) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      column.visible = visible
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      updateVisibleColumns()
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量设置列可见性
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const setColumnsVisible = (props, visible) => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    props.forEach(prop => {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const column = allColumns.value.find(col => col.prop === prop)
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (column && !column.fixed) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        column.visible = visible
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    updateVisibleColumns()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示所有列
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块打开弹窗或切换显示状态，用于配合新增、编辑、筛选等交互。
  const showAllColumns = () => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    allColumns.value.forEach(col => {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      col.visible = true
    // 行注释：结束当前代码块或函数调用。
    })
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    updateVisibleColumns()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 隐藏所有列（保留固定列）
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const hideAllColumns = () => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    allColumns.value.forEach(col => {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (!col.fixed) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        col.visible = false
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    updateVisibleColumns()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 重新排序列
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const reorderColumns = (newOrder) => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    allColumns.value = newOrder.map((col, index) => ({
      // 行注释：配置对象或数组中的一项内容。
      ...col,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      order: index
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    }))
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    updateVisibleColumns()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 保存列配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块提交表单或保存数据时使用，负责校验输入并调用后端接口。
  const saveColumnConfig = () => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const config = allColumns.value.map((col, index) => ({
      // 行注释：配置对象或数组中的一项内容。
      prop: col.prop,
      // 行注释：配置对象或数组中的一项内容。
      visible: col.visible,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      order: index
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    }))

    // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
    localStorage.setItem(storageKey, JSON.stringify(config))
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 清除列配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块清空或重置页面状态，便于用户重新筛选、选择或填写。
  const clearColumnConfig = () => {
    // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
    localStorage.removeItem(storageKey)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    resetToDefault()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出列配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块导出数据时使用，把当前列表或选中记录整理成文件。
  const exportColumnConfig = () => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return JSON.stringify(allColumns.value.map((col, index) => ({
      // 行注释：配置对象或数组中的一项内容。
      prop: col.prop,
      // 行注释：配置对象或数组中的一项内容。
      visible: col.visible,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      order: index
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    })))
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导入列配置
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const importColumnConfig = (configStr) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const config = JSON.parse(configStr)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const columnMap = new Map(config.map(c => [c.prop, c]))

      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      allColumns.value = allColumns.value.map(col => {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const saved = columnMap.get(col.prop)
        // 行注释：返回当前函数的计算结果或组件配置。
        return {
          // 行注释：配置对象或数组中的一项内容。
          ...col,
          // 行注释：配置对象或数组中的一项内容。
          visible: saved ? saved.visible : col.visible,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          order: saved ? saved.order : col.order
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      }).sort((a, b) => a.order - b.order)

      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      updateVisibleColumns()
      // 行注释：返回当前函数的计算结果或组件配置。
      return true
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('导入列配置失败:', error)
      // 行注释：返回当前函数的计算结果或组件配置。
      return false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取列宽度
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
  const getColumnWidth = (prop) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const column = allColumns.value.find(col => col.prop === prop)
    // 行注释：返回当前函数的计算结果或组件配置。
    return column?.width
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 设置列宽度
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const setColumnWidth = (prop, width) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const column = allColumns.value.find(col => col.prop === prop)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (column) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      column.width = width
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 可见列数量
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const visibleColumnCount = computed(() => visibleColumns.value.length)

  /**
   * 是否有隐藏列
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const hasHiddenColumns = computed(() => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return allColumns.value.some(col => !col.visible && !col.fixed)
  // 行注释：结束当前代码块或函数调用。
  })

  // 初始化
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  initColumns()

  // 行注释：返回当前函数的计算结果或组件配置。
  return {
    // 状态
    // 行注释：配置对象或数组中的一项内容。
    allColumns,
    // 行注释：配置对象或数组中的一项内容。
    visibleColumns,
    // 行注释：配置对象或数组中的一项内容。
    visibleColumnCount,
    // 行注释：配置对象或数组中的一项内容。
    hasHiddenColumns,

    // 方法
    // 行注释：配置对象或数组中的一项内容。
    toggleColumn,
    // 行注释：配置对象或数组中的一项内容。
    setColumnVisible,
    // 行注释：配置对象或数组中的一项内容。
    setColumnsVisible,
    // 行注释：配置对象或数组中的一项内容。
    showAllColumns,
    // 行注释：配置对象或数组中的一项内容。
    hideAllColumns,
    // 行注释：配置对象或数组中的一项内容。
    reorderColumns,
    // 行注释：配置对象或数组中的一项内容。
    saveColumnConfig,
    // 行注释：配置对象或数组中的一项内容。
    clearColumnConfig,
    // 行注释：配置对象或数组中的一项内容。
    exportColumnConfig,
    // 行注释：配置对象或数组中的一项内容。
    importColumnConfig,
    // 行注释：配置对象或数组中的一项内容。
    getColumnWidth,
    // 行注释：配置对象或数组中的一项内容。
    setColumnWidth,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    resetToDefault
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建列配置
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const createColumn = (prop, label, options = {}) => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return {
    // 行注释：配置对象或数组中的一项内容。
    prop,
    // 行注释：配置对象或数组中的一项内容。
    label,
    // 行注释：配置对象或数组中的一项内容。
    visible: options.visible !== false,
    // 行注释：配置对象或数组中的一项内容。
    fixed: options.fixed || false,
    // 行注释：配置对象或数组中的一项内容。
    width: options.width,
    // 行注释：配置对象或数组中的一项内容。
    minWidth: options.minWidth,
    // 行注释：配置对象或数组中的一项内容。
    sortable: options.sortable || false,
    // 行注释：配置对象或数组中的一项内容。
    formatter: options.formatter,
    // 行注释：配置对象或数组中的一项内容。
    align: options.align || 'left',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    ...options
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建常用列配置
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export const commonColumns = {
  // 选择列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  selection: () => createColumn('selection', '', {
    // 行注释：配置对象或数组中的一项内容。
    type: 'selection',
    // 行注释：配置对象或数组中的一项内容。
    width: 55,
    // 行注释：配置对象或数组中的一项内容。
    fixed: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 索引列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  index: (label = '#') => createColumn('index', label, {
    // 行注释：配置对象或数组中的一项内容。
    type: 'index',
    // 行注释：配置对象或数组中的一项内容。
    width: 60,
    // 行注释：配置对象或数组中的一项内容。
    fixed: false,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 操作列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  actions: (label = '操作', width = 180) => createColumn('actions', label, {
    // 行注释：配置对象或数组中的一项内容。
    type: 'actions',
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    fixed: 'right',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // ID列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  id: (label = 'ID', width = 80) => createColumn('id', label, {
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    sortable: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 名称列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  name: (label = '名称', width = 150) => createColumn('name', label, {
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    sortable: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 状态列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  status: (label = '状态', width = 100) => createColumn('status', label, {
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    sortable: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 日期列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  date: (prop, label, width = 120) => createColumn(prop, label, {
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    sortable: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 日期时间列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  datetime: (prop, label, width = 160) => createColumn(prop, label, {
    // 行注释：配置对象或数组中的一项内容。
    width,
    // 行注释：配置对象或数组中的一项内容。
    sortable: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: true
  // 行注释：配置对象或数组中的一项内容。
  }),

  // 备注列
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  remark: (label = '备注', minWidth = 200) => createColumn('remark', label, {
    // 行注释：配置对象或数组中的一项内容。
    minWidth,
    // 行注释：配置对象或数组中的一项内容。
    showOverflowTooltip: true,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    visible: false  // 默认隐藏
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

