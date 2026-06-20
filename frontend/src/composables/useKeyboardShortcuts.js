// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { onMounted, onUnmounted } from 'vue'

/**
 * 键盘快捷键组合工具
 * @param {Object} shortcuts - 快捷键配置对象
 * @example
 * useKeyboardShortcuts({
 *   'ctrl+n': () => openDialog(),
 *   'ctrl+r': () => refresh(),
 *   'escape': () => closeDialog()
 * })
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：组合式函数模块对外提供可复用能力，页面引入后可直接复用其中的状态和方法。
export function useKeyboardShortcuts(shortcuts) {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const handleKeyDown = (event) => {
    // 构建快捷键字符串
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const keys = []
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (event.ctrlKey) keys.push('ctrl')
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (event.altKey) keys.push('alt')
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (event.shiftKey) keys.push('shift')

    // 添加主键
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const mainKey = event.key.toLowerCase()
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    keys.push(mainKey)

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const shortcut = keys.join('+')

    // 检查是否有匹配的快捷键
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (shortcuts[shortcut]) {
      // 防止默认行为（如 Ctrl+N 打开新窗口）
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      event.preventDefault()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      event.stopPropagation()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      shortcuts[shortcut](event)
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  onMounted(() => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    window.addEventListener('keydown', handleKeyDown)
  // 行注释：结束当前代码块或函数调用。
  })

  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  onUnmounted(() => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    window.removeEventListener('keydown', handleKeyDown)
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

