// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useConfirm } from './useConfirm'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { UserFeedback } from '../utils/userFeedback'

/**
 * 批量操作组合函数
 * @param {Function} apiHandler - API调用函数
 * @param {Function} refreshCallback - 刷新回调函数
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：组合式函数模块对外提供可复用能力，页面引入后可直接复用其中的状态和方法。
export function useBatchOperations(apiHandler, refreshCallback) {
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const selectedRows = ref([])
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const { confirmBatchDelete, confirmBatchAction } = useConfirm()

  /**
   * 选中行数量
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const selectedCount = computed(() => selectedRows.value.length)

  /**
   * 是否有选中项
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const hasSelection = computed(() => selectedCount.value > 0)

  /**
   * 选中的ID列表
   */
  // 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
  const selectedIds = computed(() => selectedRows.value.map(row => row.id))

  /**
   * 处理选中变化
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
  const handleSelectionChange = (selection) => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    selectedRows.value = selection
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 清空选中
   */
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  // 方法用法：组合式函数模块清空或重置页面状态，便于用户重新筛选、选择或填写。
  const clearSelection = () => {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    selectedRows.value = []
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量删除
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块删除数据时使用，通常由表格中的删除按钮或批量删除触发。
  const batchDelete = async () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!hasSelection.value) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要删除的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    await confirmBatchDelete(selectedCount.value, async () => {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const loading = UserFeedback.loading(`正在删除 ${selectedCount.value} 项...`)

      // 行注释：开始异常捕获流程，常用于接口调用。
      try {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let successCount = 0
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let failedCount = 0

        // 逐个删除并统计结果
        // 行注释：循环处理数组或列表中的每一项数据。
        for (const id of selectedIds.value) {
          // 行注释：开始异常捕获流程，常用于接口调用。
          try {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            await apiHandler.delete(id)
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            successCount++
          // 行注释：开始一个代码块，下面是该结构内部逻辑。
          } catch (error) {
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            failedCount++
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            console.error(`删除ID ${id} 失败:`, error)
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：结束当前代码块或函数调用。
        }

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()

        // 显示结果
        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.batchResult(
          // 行注释：配置对象或数组中的一项内容。
          selectedCount.value,
          // 行注释：配置对象或数组中的一项内容。
          successCount,
          // 行注释：配置对象或数组中的一项内容。
          failedCount,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          '删除'
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        )

        // 刷新数据
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (refreshCallback) {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          await refreshCallback()
        // 行注释：结束当前代码块或函数调用。
        }

        // 清空选中
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        clearSelection()
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } catch (error) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()
        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.error('delete', { detail: '批量删除过程中发生错误' })
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量更新状态
   * @param {string} status - 新状态
   * @param {string} statusName - 状态名称
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块处理批量操作，适合表格多选后统一删除、更新、分配或导出。
  const batchUpdateStatus = async (status, statusName) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!hasSelection.value) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要更新的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    await confirmBatchAction(`更新为"${statusName}"`, selectedCount.value, async () => {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const loading = UserFeedback.loading(`正在更新 ${selectedCount.value} 项...`)

      // 行注释：开始异常捕获流程，常用于接口调用。
      try {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let successCount = 0
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let failedCount = 0

        // 行注释：循环处理数组或列表中的每一项数据。
        for (const row of selectedRows.value) {
          // 行注释：开始异常捕获流程，常用于接口调用。
          try {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            await apiHandler.update(row.id, { ...row, status })
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            successCount++
          // 行注释：开始一个代码块，下面是该结构内部逻辑。
          } catch (error) {
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            failedCount++
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            console.error(`更新ID ${row.id} 失败:`, error)
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：结束当前代码块或函数调用。
        }

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()

        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.batchResult(
          // 行注释：配置对象或数组中的一项内容。
          selectedCount.value,
          // 行注释：配置对象或数组中的一项内容。
          successCount,
          // 行注释：配置对象或数组中的一项内容。
          failedCount,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          `更新为"${statusName}"`
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        )

        // 行注释：进行条件判断，控制页面逻辑分支。
        if (refreshCallback) {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          await refreshCallback()
        // 行注释：结束当前代码块或函数调用。
        }

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        clearSelection()
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } catch (error) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()
        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.error('update', { detail: '批量更新过程中发生错误' })
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量分配
   * @param {string} field - 字段名
   * @param {any} value - 分配的值
   * @param {string} fieldName - 字段显示名称
   * @param {string} valueName - 值显示名称
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块处理批量操作，适合表格多选后统一删除、更新、分配或导出。
  const batchAssign = async (field, value, fieldName, valueName) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!hasSelection.value) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要分配的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    await confirmBatchAction(`分配${fieldName}为"${valueName}"`, selectedCount.value, async () => {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const loading = UserFeedback.loading(`正在分配 ${selectedCount.value} 项...`)

      // 行注释：开始异常捕获流程，常用于接口调用。
      try {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let successCount = 0
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        let failedCount = 0

        // 行注释：循环处理数组或列表中的每一项数据。
        for (const row of selectedRows.value) {
          // 行注释：开始异常捕获流程，常用于接口调用。
          try {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            await apiHandler.update(row.id, { ...row, [field]: value })
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            successCount++
          // 行注释：开始一个代码块，下面是该结构内部逻辑。
          } catch (error) {
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            failedCount++
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            console.error(`分配ID ${row.id} 失败:`, error)
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：结束当前代码块或函数调用。
        }

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()

        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.batchResult(
          // 行注释：配置对象或数组中的一项内容。
          selectedCount.value,
          // 行注释：配置对象或数组中的一项内容。
          successCount,
          // 行注释：配置对象或数组中的一项内容。
          failedCount,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          '分配'
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        )

        // 行注释：进行条件判断，控制页面逻辑分支。
        if (refreshCallback) {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          await refreshCallback()
        // 行注释：结束当前代码块或函数调用。
        }

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        clearSelection()
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } catch (error) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()
        // 行注释：向用户展示操作成功、失败或提示信息。
        UserFeedback.error('assign', { detail: '批量分配过程中发生错误' })
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量导出
   * @param {Array} columns - 导出列配置
   * @param {string} filename - 文件名
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块处理批量操作，适合表格多选后统一删除、更新、分配或导出。
  const batchExport = async (columns, filename) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!hasSelection.value) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要导出的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const { ExportHelper } = await import('../utils/exportHelper')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    ExportHelper.exportToCSV(
      // 行注释：配置对象或数组中的一项内容。
      selectedRows.value,
      // 行注释：配置对象或数组中的一项内容。
      columns,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      `${filename}_selected`
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    )
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 自定义批量操作
   * @param {string} actionName - 操作名称
   * @param {Function} handler - 处理函数(row, index) => Promise
   * @param {Object} options - 选项
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块处理批量操作，适合表格多选后统一删除、更新、分配或导出。
  const batchCustomAction = async (actionName, handler, options = {}) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!hasSelection.value) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要操作的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      showProgress = true,
      // 行注释：配置对象或数组中的一项内容。
      confirmAction = true,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      clearAfterSuccess = true
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：进行条件判断，控制页面逻辑分支。
    if (confirmAction) {
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      await confirmBatchAction(actionName, selectedCount.value, async () => {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await executeBatchAction(actionName, handler, showProgress, clearAfterSuccess)
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      await executeBatchAction(actionName, handler, showProgress, clearAfterSuccess)
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 执行批量操作
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const executeBatchAction = async (actionName, handler, showProgress, clearAfterSuccess) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const loading = showProgress
      // 行注释：向用户展示操作成功、失败或提示信息。
      ? UserFeedback.loading(`正在${actionName} ${selectedCount.value} 项...`)
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      : null

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      let successCount = 0
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      let failedCount = 0

      // 行注释：循环处理数组或列表中的每一项数据。
      for (let i = 0; i < selectedRows.value.length; i++) {
        // 行注释：开始异常捕获流程，常用于接口调用。
        try {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          await handler(selectedRows.value[i], i)
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          successCount++

          // 更新进度
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (showProgress && loading) {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            loading.setText(`${actionName}中... ${i + 1}/${selectedCount.value}`)
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        } catch (error) {
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          failedCount++
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          console.error(`${actionName} ${selectedRows.value[i].id} 失败:`, error)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (loading) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.batchResult(
        // 行注释：配置对象或数组中的一项内容。
        selectedCount.value,
        // 行注释：配置对象或数组中的一项内容。
        successCount,
        // 行注释：配置对象或数组中的一项内容。
        failedCount,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        actionName
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (refreshCallback) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await refreshCallback()
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (clearAfterSuccess) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        clearSelection()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (loading) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.close()
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error(actionName, { detail: `批量${actionName}过程中发生错误` })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：返回当前函数的计算结果或组件配置。
  return {
    // 状态
    // 行注释：配置对象或数组中的一项内容。
    selectedRows,
    // 行注释：配置对象或数组中的一项内容。
    selectedCount,
    // 行注释：配置对象或数组中的一项内容。
    hasSelection,
    // 行注释：配置对象或数组中的一项内容。
    selectedIds,

    // 方法
    // 行注释：配置对象或数组中的一项内容。
    handleSelectionChange,
    // 行注释：配置对象或数组中的一项内容。
    clearSelection,
    // 行注释：配置对象或数组中的一项内容。
    batchDelete,
    // 行注释：配置对象或数组中的一项内容。
    batchUpdateStatus,
    // 行注释：配置对象或数组中的一项内容。
    batchAssign,
    // 行注释：配置对象或数组中的一项内容。
    batchExport,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    batchCustomAction
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

