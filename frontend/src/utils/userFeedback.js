// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElNotification, ElLoading } from 'element-plus'

/**
 * 用户反馈工具类
 * 提供统一、友好的用户反馈信息
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export class UserFeedback {
  /**
   * 操作成功消息映射表
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static successMessages = {
    // 行注释：配置对象或数组中的一项内容。
    create: '创建成功',
    // 行注释：配置对象或数组中的一项内容。
    update: '更新成功',
    // 行注释：配置对象或数组中的一项内容。
    delete: '删除成功',
    // 行注释：配置对象或数组中的一项内容。
    save: '保存成功',
    // 行注释：配置对象或数组中的一项内容。
    export: '导出成功',
    // 行注释：配置对象或数组中的一项内容。
    import: '导入成功',
    // 行注释：配置对象或数组中的一项内容。
    upload: '上传成功',
    // 行注释：配置对象或数组中的一项内容。
    download: '下载成功',
    // 行注释：配置对象或数组中的一项内容。
    send: '发送成功',
    // 行注释：配置对象或数组中的一项内容。
    submit: '提交成功',
    // 行注释：配置对象或数组中的一项内容。
    approve: '审批成功',
    // 行注释：配置对象或数组中的一项内容。
    reject: '拒绝成功',
    // 行注释：配置对象或数组中的一项内容。
    assign: '分配成功',
    // 行注释：配置对象或数组中的一项内容。
    copy: '复制成功',
    // 行注释：配置对象或数组中的一项内容。
    move: '移动成功',
    // 行注释：配置对象或数组中的一项内容。
    restore: '恢复成功',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    archive: '归档成功'
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 操作失败消息映射表
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static errorMessages = {
    // 行注释：配置对象或数组中的一项内容。
    create: '创建失败',
    // 行注释：配置对象或数组中的一项内容。
    update: '更新失败',
    // 行注释：配置对象或数组中的一项内容。
    delete: '删除失败',
    // 行注释：配置对象或数组中的一项内容。
    save: '保存失败',
    // 行注释：配置对象或数组中的一项内容。
    export: '导出失败',
    // 行注释：配置对象或数组中的一项内容。
    import: '导入失败',
    // 行注释：配置对象或数组中的一项内容。
    upload: '上传失败',
    // 行注释：配置对象或数组中的一项内容。
    download: '下载失败',
    // 行注释：配置对象或数组中的一项内容。
    send: '发送失败',
    // 行注释：配置对象或数组中的一项内容。
    submit: '提交失败',
    // 行注释：配置对象或数组中的一项内容。
    approve: '审批失败',
    // 行注释：配置对象或数组中的一项内容。
    reject: '拒绝失败',
    // 行注释：配置对象或数组中的一项内容。
    assign: '分配失败',
    // 行注释：配置对象或数组中的一项内容。
    copy: '复制失败',
    // 行注释：配置对象或数组中的一项内容。
    move: '移动失败',
    // 行注释：配置对象或数组中的一项内容。
    restore: '恢复失败',
    // 行注释：配置对象或数组中的一项内容。
    archive: '归档失败',
    // 行注释：配置对象或数组中的一项内容。
    load: '加载失败',
    // 行注释：配置对象或数组中的一项内容。
    connect: '连接失败',
    // 行注释：配置对象或数组中的一项内容。
    timeout: '请求超时',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    network: '网络错误'
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示操作成功消息
   * @param {string} action - 操作类型或自定义消息
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static success(action, options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const message = this.successMessages[action] || action
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const { detail = '', duration = 2000, showClose = true } = options

    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success({
      // 行注释：配置对象或数组中的一项内容。
      message: detail ? `${message}：${detail}` : message,
      // 行注释：配置对象或数组中的一项内容。
      duration,
      // 行注释：配置对象或数组中的一项内容。
      showClose,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      grouping: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示操作失败消息
   * @param {string} action - 操作类型或自定义消息
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static error(action, options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const message = this.errorMessages[action] || action
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const { detail = '', duration = 3000, showClose = true } = options

    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error({
      // 行注释：配置对象或数组中的一项内容。
      message: detail ? `${message}：${detail}` : message,
      // 行注释：配置对象或数组中的一项内容。
      duration,
      // 行注释：配置对象或数组中的一项内容。
      showClose,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      grouping: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示警告消息
   * @param {string} message - 消息内容
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static warning(message, options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const { detail = '', duration = 3000, showClose = true } = options

    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.warning({
      // 行注释：配置对象或数组中的一项内容。
      message: detail ? `${message}：${detail}` : message,
      // 行注释：配置对象或数组中的一项内容。
      duration,
      // 行注释：配置对象或数组中的一项内容。
      showClose,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      grouping: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示信息消息
   * @param {string} message - 消息内容
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static info(message, options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const { duration = 2000, showClose = true } = options

    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info({
      // 行注释：配置对象或数组中的一项内容。
      message,
      // 行注释：配置对象或数组中的一项内容。
      duration,
      // 行注释：配置对象或数组中的一项内容。
      showClose,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      grouping: true
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示通知
   * @param {string} title - 标题
   * @param {string} message - 消息内容
   * @param {string} type - 类型
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static notify(title, message, type = 'info', options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      duration = 4500,
      // 行注释：配置对象或数组中的一项内容。
      position = 'top-right',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      showClose = true
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    ElNotification({
      // 行注释：配置对象或数组中的一项内容。
      title,
      // 行注释：配置对象或数组中的一项内容。
      message,
      // 行注释：配置对象或数组中的一项内容。
      type,
      // 行注释：配置对象或数组中的一项内容。
      duration,
      // 行注释：配置对象或数组中的一项内容。
      position,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      showClose
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示成功通知
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static notifySuccess(title, message, options = {}) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.notify(title, message, 'success', options)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示错误通知
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static notifyError(title, message, options = {}) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.notify(title, message, 'error', { duration: 6000, ...options })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示警告通知
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static notifyWarning(title, message, options = {}) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.notify(title, message, 'warning', options)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示信息通知
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static notifyInfo(title, message, options = {}) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.notify(title, message, 'info', options)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 显示加载中
   * @param {string} text - 加载文本
   * @param {Object} options - 选项
   * @returns {Object} loading实例
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static loading(text = '加载中...', options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：配置对象或数组中的一项内容。
      lock = true,
      // 行注释：配置对象或数组中的一项内容。
      background = 'rgba(0, 0, 0, 0.7)',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      target = document.body
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：返回当前函数的计算结果或组件配置。
    return ElLoading.service({
      // 行注释：配置对象或数组中的一项内容。
      lock,
      // 行注释：配置对象或数组中的一项内容。
      text,
      // 行注释：配置对象或数组中的一项内容。
      background,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      target
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量操作反馈
   * @param {number} total - 总数
   * @param {number} success - 成功数
   * @param {number} failed - 失败数
   * @param {string} action - 操作名称
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static batchResult(total, success, failed, action = '操作') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (failed === 0) {
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      this.success(`批量${action}`, {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: `成功处理 ${success}/${total} 项`
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      this.warning(`批量${action}完成`, {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: `成功 ${success} 项，失败 ${failed} 项`
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 进度提示
   * @param {number} current - 当前进度
   * @param {number} total - 总数
   * @param {string} action - 操作名称
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static progress(current, total, action = '处理') {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const percentage = Math.round((current / total) * 100)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.info(`${action}中... ${current}/${total} (${percentage}%)`)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 验证错误提示
   * @param {string} field - 字段名
   * @param {string} rule - 规则描述
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static validationError(field, rule) {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    this.warning('数据验证失败', {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      detail: `${field}${rule}`
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 网络错误提示
   * @param {string} detail - 详细信息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static networkError(detail = '请检查网络连接后重试') {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.error('network', { detail })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 权限错误提示
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static permissionError() {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    this.error('您没有权限执行此操作', {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      detail: '请联系管理员获取相应权限'
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 操作取消提示
   * @param {string} action - 操作名称
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static cancelled(action = '操作') {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.info(`已取消${action}`)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 数据为空提示
   * @param {string} dataType - 数据类型
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static noData(dataType = '数据') {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.info(`暂无${dataType}`)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出进度提示
   * @param {string} status - 状态
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportProgress(status) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const messages = {
      // 行注释：配置对象或数组中的一项内容。
      preparing: '正在准备导出数据...',
      // 行注释：配置对象或数组中的一项内容。
      processing: '正在处理数据...',
      // 行注释：配置对象或数组中的一项内容。
      generating: '正在生成文件...',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      downloading: '正在下载文件...'
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.info(messages[status] || status)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 便捷导出
// 行注释：导出函数或对象，供其他前端模块复用。
export const {
  // 行注释：配置对象或数组中的一项内容。
  success,
  // 行注释：配置对象或数组中的一项内容。
  error,
  // 行注释：配置对象或数组中的一项内容。
  warning,
  // 行注释：配置对象或数组中的一项内容。
  info,
  // 行注释：配置对象或数组中的一项内容。
  notify,
  // 行注释：配置对象或数组中的一项内容。
  notifySuccess,
  // 行注释：配置对象或数组中的一项内容。
  notifyError,
  // 行注释：配置对象或数组中的一项内容。
  notifyWarning,
  // 行注释：配置对象或数组中的一项内容。
  notifyInfo,
  // 行注释：配置对象或数组中的一项内容。
  loading,
  // 行注释：配置对象或数组中的一项内容。
  batchResult,
  // 行注释：配置对象或数组中的一项内容。
  progress,
  // 行注释：配置对象或数组中的一项内容。
  validationError,
  // 行注释：配置对象或数组中的一项内容。
  networkError,
  // 行注释：配置对象或数组中的一项内容。
  permissionError,
  // 行注释：配置对象或数组中的一项内容。
  cancelled,
  // 行注释：配置对象或数组中的一项内容。
  noData,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  exportProgress
// 行注释：向用户展示操作成功、失败或提示信息。
} = UserFeedback

