// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElNotification } from 'element-plus'

/**
 * 错误处理工具类
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export class ErrorHandler {
  /**
   * 处理API错误
   * @param {Error} error - 错误对象
   * @param {string} context - 操作上下文
   * @param {boolean} useNotification - 是否使用通知而非消息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static handleApiError(error, context = '操作', useNotification = false) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    let message = '操作失败，请稍后重试'
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    let detail = ''

    // 解析错误类型
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (error.response) {
      // 服务器响应错误
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const status = error.response.status
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const data = error.response.data

      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      switch (status) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 400:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = data.message || '请求参数错误'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '请检查输入的数据是否正确'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 401:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '未授权访问'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '您的登录已过期，请重新登录'
          // 可以在这里添加跳转到登录页的逻辑
          // 行注释：开始一个代码块，下面是该结构内部逻辑。
          setTimeout(() => {
            // 行注释：当前行参与完成页面交互或数据处理逻辑。
            window.location.href = '/login'
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          }, 2000)
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 403:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '权限不足'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '您没有权限执行此操作'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 404:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '资源不存在'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '请求的数据未找到'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 409:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '数据冲突'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = data.message || '该数据已存在或与现有数据冲突'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 422:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '数据验证失败'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = data.message || '请检查输入的数据格式'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 500:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '服务器内部错误'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '服务器遇到问题，请稍后重试或联系管理员'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        case 503:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = '服务暂时不可用'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = '服务器正在维护或过载，请稍后重试'
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          break
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        default:
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          message = data.message || `${context}失败`
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          detail = `错误代码: ${status}`
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else if (error.request) {
      // 请求已发送但没有收到响应
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      message = '网络连接失败'
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      detail = '无法连接到服务器,请检查网络连接'
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 其他错误
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      message = error.message || `${context}失败`
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      detail = '发生未知错误'
    // 行注释：结束当前代码块或函数调用。
    }

    // 显示错误信息
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (useNotification) {
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      ElNotification({
        // 行注释：配置对象或数组中的一项内容。
        title: `${context}失败`,
        // 行注释：配置对象或数组中的一项内容。
        message: detail ? `${message}\n${detail}` : message,
        // 行注释：配置对象或数组中的一项内容。
        type: 'error',
        // 行注释：配置对象或数组中的一项内容。
        duration: 5000,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        position: 'top-right'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error({
        // 行注释：配置对象或数组中的一项内容。
        message: message,
        // 行注释：配置对象或数组中的一项内容。
        duration: 3000,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        showClose: true
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }

    // 记录错误到控制台（开发环境）
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (process.env.NODE_ENV === 'development') {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error(`[${context}] Error:`, error)
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return { message, detail, status: error.response?.status }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 处理成功操作
   * @param {string} message - 成功消息
   * @param {boolean} useNotification - 是否使用通知
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static handleSuccess(message, useNotification = false) {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (useNotification) {
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      ElNotification({
        // 行注释：配置对象或数组中的一项内容。
        title: '操作成功',
        // 行注释：配置对象或数组中的一项内容。
        message: message,
        // 行注释：配置对象或数组中的一项内容。
        type: 'success',
        // 行注释：配置对象或数组中的一项内容。
        duration: 3000,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        position: 'top-right'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success({
        // 行注释：配置对象或数组中的一项内容。
        message: message,
        // 行注释：配置对象或数组中的一项内容。
        duration: 2000,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        showClose: true
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 处理警告信息
   * @param {string} message - 警告消息
   * @param {string} detail - 详细信息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static handleWarning(message, detail = '') {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.warning({
      // 行注释：配置对象或数组中的一项内容。
      message: detail ? `${message}\n${detail}` : message,
      // 行注释：配置对象或数组中的一项内容。
      duration: 3000,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      showClose: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 处理信息提示
   * @param {string} message - 提示消息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static handleInfo(message) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info({
      // 行注释：配置对象或数组中的一项内容。
      message: message,
      // 行注释：配置对象或数组中的一项内容。
      duration: 2000,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      showClose: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示加载状态
   * @param {string} message - 加载消息
   * @returns {Function} 关闭函数
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static showLoading(message = '加载中...') {
    // 行注释：返回当前函数的计算结果或组件配置。
    return ElMessage({
      // 行注释：配置对象或数组中的一项内容。
      message: message,
      // 行注释：配置对象或数组中的一项内容。
      type: 'info',
      // 行注释：配置对象或数组中的一项内容。
      duration: 0,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      iconClass: 'el-icon-loading'
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建带有错误处理的异步函数包装器
 * @param {Function} fn - 异步函数
 * @param {string} context - 操作上下文
 * @param {Object} options - 选项
 * @returns {Function}
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：工具模块处理异常提示，保证接口失败时用户能看到清晰反馈。
export function withErrorHandling(fn, context = '操作', options = {}) {
  // 行注释：返回当前函数的计算结果或组件配置。
  return async function(...args) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      loadingMessage = null,
      // 行注释：配置对象或数组中的一项内容。
      successMessage = null,
      // 行注释：配置对象或数组中的一项内容。
      useNotification = false,
      // 行注释：配置对象或数组中的一项内容。
      onError = null,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      onSuccess = null
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    let loadingInstance = null

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 显示加载状态
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (loadingMessage) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loadingInstance = ErrorHandler.showLoading(loadingMessage)
      // 行注释：结束当前代码块或函数调用。
      }

      // 执行函数
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const result = await fn(...args)

      // 关闭加载
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (loadingInstance) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loadingInstance.close()
      // 行注释：结束当前代码块或函数调用。
      }

      // 显示成功消息
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (successMessage) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        ErrorHandler.handleSuccess(successMessage, useNotification)
      // 行注释：结束当前代码块或函数调用。
      }

      // 执行成功回调
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onSuccess) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        onSuccess(result)
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：返回当前函数的计算结果或组件配置。
      return result
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 关闭加载
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (loadingInstance) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loadingInstance.close()
      // 行注释：结束当前代码块或函数调用。
      }

      // 处理错误
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const errorInfo = ErrorHandler.handleApiError(error, context, useNotification)

      // 执行错误回调
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (onError) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        onError(errorInfo)
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      throw error
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

