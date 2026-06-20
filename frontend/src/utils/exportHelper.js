// 行注释：导入当前模块需要使用的组件、工具或样式。
import { UserFeedback } from './userFeedback'

/**
 * 数据导出助手类
 */
// 行注释：导出函数或对象，供其他前端模块复用。
export class ExportHelper {
  /**
   * 导出CSV文件
   * @param {Array} data - 要导出的数据
   * @param {Array} columns - 列配置
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportToCSV(data, columns, filename = 'export') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!data || data.length === 0) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.noData('可导出的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.exportProgress('preparing')

      // 构建CSV内容
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const headers = columns.map(col => col.label).join(',')
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const rows = data.map(row => {
        // 行注释：返回当前函数的计算结果或组件配置。
        return columns.map(col => {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          let value = row[col.prop]

          // 处理格式化函数
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (col.formatter) {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            value = col.formatter(row, col, value)
          // 行注释：结束当前代码块或函数调用。
          }

          // 处理特殊字符
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (typeof value === 'string') {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            value = `"${value.replace(/"/g, '""')}"`
          // 行注释：结束当前代码块或函数调用。
          }

          // 行注释：返回当前函数的计算结果或组件配置。
          return value ?? ''
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        }).join(',')
      // 行注释：结束当前代码块或函数调用。
      })

      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const csv = [headers, ...rows].join('\n')

      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.exportProgress('generating')

      // 添加BOM以支持Excel中的中文
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const BOM = '\uFEFF'
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })

      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.exportProgress('downloading')

      // 下载文件
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.downloadFile(blob, `${filename}_${this.getTimestamp()}.csv`)

      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.success('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: `已成功导出 ${data.length} 条数据`
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('Export error:', error)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: error.message || '导出过程中出现错误'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出Excel文件（需要后端支持或使用xlsx库）
   * @param {Blob} blob - 文件Blob
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportToExcel(blob, filename = 'export') {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.downloadFile(blob, `${filename}_${this.getTimestamp()}.xlsx`)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.success('export')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('Export error:', error)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: error.message || '导出过程中出现错误'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出JSON文件
   * @param {Array|Object} data - 要导出的数据
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportToJSON(data, filename = 'export') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!data || (Array.isArray(data) && data.length === 0)) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.noData('可导出的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const json = JSON.stringify(data, null, 2)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })

      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.downloadFile(blob, `${filename}_${this.getTimestamp()}.json`)

      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const count = Array.isArray(data) ? data.length : 1
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.success('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: `已成功导出 ${count} 条数据`
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('Export error:', error)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: error.message || '导出过程中出现错误'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 下载文件
   * @param {Blob} blob - 文件Blob
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static downloadFile(blob, filename) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const url = window.URL.createObjectURL(blob)
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const link = document.createElement('a')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    link.href = url
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.setAttribute('download', filename)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    link.style.display = 'none'

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    document.body.appendChild(link)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    link.click()

    // 清理
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    document.body.removeChild(link)
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    window.URL.revokeObjectURL(url)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取时间戳字符串
   * @returns {string}
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static getTimestamp() {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const now = new Date()
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const year = now.getFullYear()
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const month = String(now.getMonth() + 1).padStart(2, '0')
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const day = String(now.getDate()).padStart(2, '0')
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const hours = String(now.getHours()).padStart(2, '0')
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const minutes = String(now.getMinutes()).padStart(2, '0')
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const seconds = String(now.getSeconds()).padStart(2, '0')

    // 行注释：返回当前函数的计算结果或组件配置。
    return `${year}${month}${day}_${hours}${minutes}${seconds}`
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 批量导出（带进度）
   * @param {Array} data - 要导出的数据
   * @param {Array} columns - 列配置
   * @param {string} filename - 文件名
   * @param {number} batchSize - 每批次大小
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static async exportLargeDataset(data, columns, filename = 'export', batchSize = 1000) {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!data || data.length === 0) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.noData('可导出的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const loading = UserFeedback.loading(`正在导出数据... 0/${data.length}`)

    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const totalBatches = Math.ceil(data.length / batchSize)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      let csvContent = columns.map(col => col.label).join(',') + '\n'

      // 行注释：循环处理数组或列表中的每一项数据。
      for (let i = 0; i < totalBatches; i++) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const start = i * batchSize
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const end = Math.min(start + batchSize, data.length)
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const batch = data.slice(start, end)

        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const rows = batch.map(row => {
          // 行注释：返回当前函数的计算结果或组件配置。
          return columns.map(col => {
            // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
            let value = row[col.prop]
            // 行注释：进行条件判断，控制页面逻辑分支。
            if (col.formatter) {
              // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
              value = col.formatter(row, col, value)
            // 行注释：结束当前代码块或函数调用。
            }
            // 行注释：进行条件判断，控制页面逻辑分支。
            if (typeof value === 'string') {
              // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
              value = `"${value.replace(/"/g, '""')}"`
            // 行注释：结束当前代码块或函数调用。
            }
            // 行注释：返回当前函数的计算结果或组件配置。
            return value ?? ''
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          }).join(',')
        // 行注释：结束当前代码块或函数调用。
        })

        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        csvContent += rows.join('\n') + '\n'

        // 更新进度
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        loading.setText(`正在导出数据... ${end}/${data.length}`)

        // 让UI有机会更新
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        await new Promise(resolve => setTimeout(resolve, 0))
      // 行注释：结束当前代码块或函数调用。
      }

      // 生成并下载文件
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const BOM = '\uFEFF'
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.downloadFile(blob, `${filename}_${this.getTimestamp()}.csv`)

      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loading.close()
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.success('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: `已成功导出 ${data.length} 条数据`
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loading.close()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('Export error:', error)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error('export', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: error.message || '导出过程中出现错误'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 从后端下载文件
   * @param {Response} response - fetch响应对象
   * @param {string} defaultFilename - 默认文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static async downloadFromResponse(response, defaultFilename = 'download') {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 从响应头获取文件名
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const contentDisposition = response.headers.get('content-disposition')
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      let filename = defaultFilename

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (contentDisposition) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (filenameMatch && filenameMatch[1]) {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          filename = filenameMatch[1].replace(/['"]/g, '')
          // 解码URL编码的文件名
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          filename = decodeURIComponent(filename)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      }

      // 如果没有扩展名，根据content-type添加
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (!filename.includes('.')) {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const contentType = response.headers.get('content-type')
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const ext = this.getExtensionFromContentType(contentType)
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        filename += ext
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const blob = await response.blob()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.downloadFile(blob, filename)

      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.success('download')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('Download error:', error)
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.error('download', {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        detail: error.message || '下载过程中出现错误'
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 根据Content-Type获取文件扩展名
   * @param {string} contentType - Content-Type
   * @returns {string}
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static getExtensionFromContentType(contentType) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const typeMap = {
      // 行注释：配置对象或数组中的一项内容。
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
      // 行注释：配置对象或数组中的一项内容。
      'application/vnd.ms-excel': '.xls',
      // 行注释：配置对象或数组中的一项内容。
      'text/csv': '.csv',
      // 行注释：配置对象或数组中的一项内容。
      'application/pdf': '.pdf',
      // 行注释：配置对象或数组中的一项内容。
      'application/json': '.json',
      // 行注释：配置对象或数组中的一项内容。
      'text/plain': '.txt',
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      'application/zip': '.zip'
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return typeMap[contentType] || ''
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出选中数据
   * @param {Array} selectedRows - 选中的行
   * @param {Array} allData - 所有数据
   * @param {Array} columns - 列配置
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportSelected(selectedRows, allData, columns, filename = 'export') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!selectedRows || selectedRows.length === 0) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.info('请先选择要导出的数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.exportToCSV(selectedRows, columns, `${filename}_selected`)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 导出当前页数据
   * @param {Array} currentPageData - 当前页数据
   * @param {Array} columns - 列配置
   * @param {string} filename - 文件名
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  static exportCurrentPage(currentPageData, columns, filename = 'export') {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!currentPageData || currentPageData.length === 0) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      UserFeedback.noData('当前页数据')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      return
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.exportToCSV(currentPageData, columns, `${filename}_page`)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 便捷导出
// 行注释：导出函数或对象，供其他前端模块复用。
export const {
  // 行注释：配置对象或数组中的一项内容。
  exportToCSV,
  // 行注释：配置对象或数组中的一项内容。
  exportToExcel,
  // 行注释：配置对象或数组中的一项内容。
  exportToJSON,
  // 行注释：配置对象或数组中的一项内容。
  downloadFile,
  // 行注释：配置对象或数组中的一项内容。
  exportLargeDataset,
  // 行注释：配置对象或数组中的一项内容。
  downloadFromResponse,
  // 行注释：配置对象或数组中的一项内容。
  exportSelected,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  exportCurrentPage
// 行注释：当前行参与完成页面交互或数据处理逻辑。
} = ExportHelper

