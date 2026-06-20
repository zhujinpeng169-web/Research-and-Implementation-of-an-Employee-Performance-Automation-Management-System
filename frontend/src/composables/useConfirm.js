// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessageBox } from 'element-plus'

/**
 * 确认对话框组合函数
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：组合式函数模块对外提供可复用能力，页面引入后可直接复用其中的状态和方法。
export function useConfirm() {
  /**
   * 删除确认
   * @param {string} itemName - 要删除的项目名称
   * @param {Function} onConfirm - 确认回调
   * @param {Object} options - 额外选项
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块删除数据时使用，通常由表格中的删除按钮或批量删除触发。
  const confirmDelete = async (itemName, onConfirm, options = {}) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      title = '删除确认',
      // 行注释：配置对象或数组中的一项内容。
      message = `确定要删除"${itemName}"吗？此操作不可恢复。`,
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText = '确定删除',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText = '取消',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      type = 'warning'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(message, title, {
        // 行注释：配置对象或数组中的一项内容。
        confirmButtonText,
        // 行注释：配置对象或数组中的一项内容。
        cancelButtonText,
        // 行注释：配置对象或数组中的一项内容。
        type,
        // 行注释：配置对象或数组中的一项内容。
        dangerouslyUseHTMLString: false,
        // 行注释：配置对象或数组中的一项内容。
        distinguishCancelAndClose: true,
        // 行注释：配置对象或数组中的一项内容。
        closeOnClickModal: false,
        // 行注释：配置对象或数组中的一项内容。
        closeOnPressEscape: false,
        // 行注释：配置对象或数组中的一项内容。
        showClose: true,
        // 行注释：配置对象或数组中的一项内容。
        lockScroll: true,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        customClass: 'delete-confirm-box'
      // 行注释：结束当前代码块或函数调用。
      })

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (action) {
      // 用户取消或关闭
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (action === 'cancel') {
        // 行注释：返回当前函数的计算结果或组件配置。
        return 'cancel'
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } else if (action === 'close') {
        // 行注释：返回当前函数的计算结果或组件配置。
        return 'close'
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量删除确认
   * @param {number} count - 要删除的数量
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块删除数据时使用，通常由表格中的删除按钮或批量删除触发。
  const confirmBatchDelete = async (count, onConfirm) => {
    // 行注释：返回当前函数的计算结果或组件配置。
    return confirmDelete(`${count} 项`, onConfirm, {
      // 行注释：配置对象或数组中的一项内容。
      title: '批量删除确认',
      // 行注释：配置对象或数组中的一项内容。
      message: `确定要删除选中的 ${count} 项吗？此操作不可恢复。`,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      type: 'error'
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 状态更改确认
   * @param {string} itemName - 项目名称
   * @param {string} newStatus - 新状态
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const confirmStatusChange = async (itemName, newStatus, onConfirm) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(
        // 行注释：配置对象或数组中的一项内容。
        `确定要将"${itemName}"状态改为"${newStatus}"吗？`,
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
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          closeOnClickModal: false
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch {
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'cancel'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 保存确认（有未保存更改时）
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const confirmSave = async (onConfirm) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(
        // 行注释：配置对象或数组中的一项内容。
        '您有未保存的更改，确定要保存吗？',
        // 行注释：配置对象或数组中的一项内容。
        '保存确认',
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        {
          // 行注释：配置对象或数组中的一项内容。
          confirmButtonText: '保存',
          // 行注释：配置对象或数组中的一项内容。
          cancelButtonText: '不保存',
          // 行注释：配置对象或数组中的一项内容。
          type: 'warning',
          // 行注释：配置对象或数组中的一项内容。
          distinguishCancelAndClose: true,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          closeOnClickModal: false
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'save'
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (action) {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (action === 'cancel') {
        // 行注释：返回当前函数的计算结果或组件配置。
        return 'discard'
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'close'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 离开页面确认
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const confirmLeave = async (onConfirm) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(
        // 行注释：配置对象或数组中的一项内容。
        '您有未保存的更改，确定要离开吗？',
        // 行注释：配置对象或数组中的一项内容。
        '离开确认',
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        {
          // 行注释：配置对象或数组中的一项内容。
          confirmButtonText: '离开',
          // 行注释：配置对象或数组中的一项内容。
          cancelButtonText: '留在此页',
          // 行注释：配置对象或数组中的一项内容。
          type: 'warning',
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          closeOnClickModal: false
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'leave'
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch {
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'stay'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量操作确认
   * @param {string} action - 操作名称
   * @param {number} count - 操作数量
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const confirmBatchAction = async (action, count, onConfirm) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(
        // 行注释：配置对象或数组中的一项内容。
        `确定要对选中的 ${count} 项执行"${action}"操作吗？`,
        // 行注释：配置对象或数组中的一项内容。
        '批量操作确认',
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        {
          // 行注释：配置对象或数组中的一项内容。
          confirmButtonText: '确定',
          // 行注释：配置对象或数组中的一项内容。
          cancelButtonText: '取消',
          // 行注释：配置对象或数组中的一项内容。
          type: 'info',
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          closeOnClickModal: false
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch {
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'cancel'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出确认
   * @param {number} count - 导出数量
   * @param {Function} onConfirm - 确认回调
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块导出数据时使用，把当前列表或选中记录整理成文件。
  const confirmExport = async (count, onConfirm) => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(
        // 行注释：配置对象或数组中的一项内容。
        `确定要导出 ${count} 条数据吗？`,
        // 行注释：配置对象或数组中的一项内容。
        '导出确认',
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        {
          // 行注释：配置对象或数组中的一项内容。
          confirmButtonText: '确定导出',
          // 行注释：配置对象或数组中的一项内容。
          cancelButtonText: '取消',
          // 行注释：配置对象或数组中的一项内容。
          type: 'info',
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          closeOnClickModal: false
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch {
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'cancel'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 自定义确认
   * @param {string} message - 确认消息
   * @param {Function} onConfirm - 确认回调
   * @param {Object} options - 选项
   */
  // 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
  // 方法用法：组合式函数模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
  const confirm = async (message, onConfirm, options = {}) => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      title = '确认',
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText = '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText = '取消',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      type = 'info'
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      await ElMessageBox.confirm(message, title, {
        // 行注释：配置对象或数组中的一项内容。
        confirmButtonText,
        // 行注释：配置对象或数组中的一项内容。
        cancelButtonText,
        // 行注释：配置对象或数组中的一项内容。
        type,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        closeOnClickModal: false
      // 行注释：结束当前代码块或函数调用。
      })

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onConfirm) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await onConfirm()
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'confirm'
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch {
      // 行注释：返回当前函数的计算结果或组件配置。
      return 'cancel'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：返回当前函数的计算结果或组件配置。
  return {
    // 行注释：配置对象或数组中的一项内容。
    confirmDelete,
    // 行注释：配置对象或数组中的一项内容。
    confirmBatchDelete,
    // 行注释：配置对象或数组中的一项内容。
    confirmStatusChange,
    // 行注释：配置对象或数组中的一项内容。
    confirmSave,
    // 行注释：配置对象或数组中的一项内容。
    confirmLeave,
    // 行注释：配置对象或数组中的一项内容。
    confirmBatchAction,
    // 行注释：配置对象或数组中的一项内容。
    confirmExport,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    confirm
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

