/**
 * 缓存管理器
 * 提供数据缓存、过期管理、本地持久化等功能
 */

// 行注释：开始一个代码块，下面是该结构内部逻辑。
class CacheManager {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：构造方法在创建缓存管理器对象时自动调用，用于初始化缓存容器和默认配置。
  constructor() {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.memoryCache = new Map() // 内存缓存
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.cacheConfig = new Map() // 缓存配置
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.timers = new Map() // 过期定时器
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 设置缓存
   * @param {string} key - 缓存键
   * @param {any} value - 缓存值
   * @param {Object} options - 选项
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：缓存写入方法，页面或接口请求成功后可把结果保存起来。
  set(key, value, options = {}) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      ttl = 5 * 60 * 1000, // 默认5分钟过期
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      persist = false,      // 是否持久化到localStorage
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      tag = null            // 缓存标签（用于批量清除）
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    } = options

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const cacheItem = {
      // 行注释：配置对象或数组中的一项内容。
      value,
      // 行注释：配置对象或数组中的一项内容。
      timestamp: Date.now(),
      // 行注释：配置对象或数组中的一项内容。
      ttl,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      tag
    // 行注释：结束当前代码块或函数调用。
    }

    // 设置内存缓存
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.memoryCache.set(key, cacheItem)

    // 持久化到localStorage
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (persist) {
      // 行注释：开始异常捕获流程，常用于接口调用。
      try {
        // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
        localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem))
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      } catch (error) {
        // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
        console.warn('localStorage写入失败:', error)
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }

    // 设置过期定时器
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (ttl > 0) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.clearTimer(key)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const timer = setTimeout(() => {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        this.delete(key)
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      }, ttl)
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.timers.set(key, timer)
    // 行注释：结束当前代码块或函数调用。
    }

    // 保存配置
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.cacheConfig.set(key, { persist, ttl, tag })
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @param {Function} defaultValueFn - 默认值函数（缓存不存在时调用）
   * @returns {any} 缓存值
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：缓存读取方法，优先从缓存取数据，减少重复请求。
  get(key, defaultValueFn = null) {
    // 尝试从内存获取
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    let cacheItem = this.memoryCache.get(key)

    // 内存中不存在，尝试从localStorage恢复
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!cacheItem) {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const config = this.cacheConfig.get(key)
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (config && config.persist) {
        // 行注释：开始异常捕获流程，常用于接口调用。
        try {
          // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
          const stored = localStorage.getItem(`cache_${key}`)
          // 行注释：进行条件判断，控制页面逻辑分支。
          if (stored) {
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            cacheItem = JSON.parse(stored)
            // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
            this.memoryCache.set(key, cacheItem)
          // 行注释：结束当前代码块或函数调用。
          }
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        } catch (error) {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          console.warn('localStorage读取失败:', error)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }

    // 检查是否过期
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (cacheItem) {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const isExpired = cacheItem.ttl > 0 &&
                       // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
                       Date.now() - cacheItem.timestamp > cacheItem.ttl

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (isExpired) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        this.delete(key)
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        cacheItem = null
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }

    // 返回缓存值或默认值
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (cacheItem) {
      // 行注释：返回当前函数的计算结果或组件配置。
      return cacheItem.value
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：进行条件判断，控制页面逻辑分支。
    if (defaultValueFn && typeof defaultValueFn === 'function') {
      // 行注释：返回当前函数的计算结果或组件配置。
      return defaultValueFn()
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return null
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 检查缓存是否存在且未过期
   * @param {string} key - 缓存键
   * @returns {boolean}
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：判断缓存是否存在，用于决定是否需要重新请求数据。
  has(key) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const value = this.get(key)
    // 行注释：返回当前函数的计算结果或组件配置。
    return value !== null
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 删除缓存
   * @param {string} key - 缓存键
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：删除指定缓存项，用于数据更新后清除旧结果。
  delete(key) {
    // 清除内存缓存
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.memoryCache.delete(key)

    // 清除localStorage
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.removeItem(`cache_${key}`)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      console.warn('localStorage删除失败:', error)
    // 行注释：结束当前代码块或函数调用。
    }

    // 清除定时器
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.clearTimer(key)

    // 清除配置
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.cacheConfig.delete(key)
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 清除定时器
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：清理缓存数据或定时器，用于释放资源并避免使用过期数据。
  clearTimer(key) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const timer = this.timers.get(key)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (timer) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      clearTimeout(timer)
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      this.timers.delete(key)
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 清空所有缓存
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：清理缓存数据或定时器，用于释放资源并避免使用过期数据。
  clear() {
    // 清除内存缓存
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.memoryCache.clear()

    // 清除所有定时器
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.timers.forEach(timer => clearTimeout(timer))
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.timers.clear()

    // 清除localStorage中的缓存
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const keys = Object.keys(localStorage)
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      keys.forEach(key => {
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (key.startsWith('cache_')) {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          localStorage.removeItem(key)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      })
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      console.warn('清除localStorage失败:', error)
    // 行注释：结束当前代码块或函数调用。
    }

    // 清除配置
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    this.cacheConfig.clear()
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 根据标签清除缓存
   * @param {string} tag - 缓存标签
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：清理缓存数据或定时器，用于释放资源并避免使用过期数据。
  clearByTag(tag) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const keysToDelete = []

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    this.memoryCache.forEach((item, key) => {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (item.tag === tag) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        keysToDelete.push(key)
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    keysToDelete.forEach(key => this.delete(key))
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 清除过期缓存
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：清理缓存数据或定时器，用于释放资源并避免使用过期数据。
  clearExpired() {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const now = Date.now()
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const keysToDelete = []

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    this.memoryCache.forEach((item, key) => {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (item.ttl > 0 && now - item.timestamp > item.ttl) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        keysToDelete.push(key)
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    keysToDelete.forEach(key => this.delete(key))
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 更新缓存（只更新值，不更新时间戳）
   * @param {string} key - 缓存键
   * @param {any} value - 新值
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：更新已有缓存内容，使页面读取到最新状态。
  update(key, value) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const cacheItem = this.memoryCache.get(key)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (cacheItem) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      cacheItem.value = value

      // 同步更新localStorage
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const config = this.cacheConfig.get(key)
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (config && config.persist) {
        // 行注释：开始异常捕获流程，常用于接口调用。
        try {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem))
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        } catch (error) {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          console.warn('localStorage更新失败:', error)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 刷新缓存（重新设置时间戳）
   * @param {string} key - 缓存键
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：刷新缓存项，常用于用户手动刷新或数据过期后的重新加载。
  refresh(key) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const cacheItem = this.memoryCache.get(key)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (cacheItem) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cacheItem.timestamp = Date.now()

      // 重新设置过期定时器
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const config = this.cacheConfig.get(key)
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (config && config.ttl > 0) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        this.clearTimer(key)
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const timer = setTimeout(() => {
          // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
          this.delete(key)
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        }, config.ttl)
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        this.timers.set(key, timer)
      // 行注释：结束当前代码块或函数调用。
      }

      // 同步更新localStorage
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (config && config.persist) {
        // 行注释：开始异常捕获流程，常用于接口调用。
        try {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem))
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        } catch (error) {
          // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
          console.warn('localStorage刷新失败:', error)
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取缓存信息
   * @param {string} key - 缓存键
   * @returns {Object} 缓存信息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：获取缓存信息或统计数据，便于调试和查看缓存运行状态。
  getInfo(key) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const cacheItem = this.memoryCache.get(key)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!cacheItem) return null

    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const config = this.cacheConfig.get(key)
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const age = Date.now() - cacheItem.timestamp
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const remaining = cacheItem.ttl > 0 ? cacheItem.ttl - age : Infinity

    // 行注释：返回当前函数的计算结果或组件配置。
    return {
      // 行注释：配置对象或数组中的一项内容。
      key,
      // 行注释：配置对象或数组中的一项内容。
      age,
      // 行注释：配置对象或数组中的一项内容。
      remaining,
      // 行注释：配置对象或数组中的一项内容。
      ttl: cacheItem.ttl,
      // 行注释：配置对象或数组中的一项内容。
      tag: cacheItem.tag,
      // 行注释：配置对象或数组中的一项内容。
      persist: config?.persist || false,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      isExpired: remaining <= 0
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取所有缓存信息
   * @returns {Array} 缓存信息列表
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：获取缓存信息或统计数据，便于调试和查看缓存运行状态。
  getAllInfo() {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const info = []
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    this.memoryCache.forEach((item, key) => {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      info.push(this.getInfo(key))
    // 行注释：结束当前代码块或函数调用。
    })
    // 行注释：返回当前函数的计算结果或组件配置。
    return info
  // 行注释：结束当前代码块或函数调用。
  }

  /**
   * 获取缓存统计
   * @returns {Object} 统计信息
   */
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  // 方法用法：获取缓存信息或统计数据，便于调试和查看缓存运行状态。
  getStats() {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const all = this.getAllInfo()

    // 行注释：返回当前函数的计算结果或组件配置。
    return {
      // 行注释：配置对象或数组中的一项内容。
      total: all.length,
      // 行注释：配置对象或数组中的一项内容。
      persisted: all.filter(i => i.persist).length,
      // 行注释：配置对象或数组中的一项内容。
      expired: all.filter(i => i.isExpired).length,
      // 行注释：配置对象或数组中的一项内容。
      memory: this.memoryCache.size,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      timers: this.timers.size
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 创建单例
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const cacheManager = new CacheManager()

// 定期清理过期缓存（每5分钟）
// 行注释：开始一个代码块，下面是该结构内部逻辑。
setInterval(() => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  cacheManager.clearExpired()
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
}, 5 * 60 * 1000)

// 行注释：导出函数或对象，供其他前端模块复用。
export default cacheManager

/**
 * 缓存装饰器（用于API请求）
 * @param {string} key - 缓存键
 * @param {Object} options - 缓存选项
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：工具模块处理缓存读写，减少重复请求并提升页面响应速度。
export function withCache(key, options = {}) {
  // 行注释：返回当前函数的计算结果或组件配置。
  return function(target, propertyKey, descriptor) {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const originalMethod = descriptor.value

    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    descriptor.value = async function(...args) {
      // 检查缓存
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const cached = cacheManager.get(key)
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (cached !== null) {
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        console.log(`[Cache Hit] ${key}`)
        // 行注释：返回当前函数的计算结果或组件配置。
        return cached
      // 行注释：结束当前代码块或函数调用。
      }

      // 调用原方法
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.log(`[Cache Miss] ${key}`)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const result = await originalMethod.apply(this, args)

      // 存入缓存
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      cacheManager.set(key, result, options)

      // 行注释：返回当前函数的计算结果或组件配置。
      return result
    // 行注释：结束当前代码块或函数调用。
    }

    // 行注释：返回当前函数的计算结果或组件配置。
    return descriptor
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

/**
 * 创建缓存键
 * @param {string} prefix - 前缀
 * @param {Array} params - 参数
 * @returns {string} 缓存键
 */
// 行注释：导出函数或对象，供其他前端模块复用。
// 方法用法：工具模块处理缓存读写，减少重复请求并提升页面响应速度。
export function createCacheKey(prefix, ...params) {
  // 行注释：返回当前函数的计算结果或组件配置。
  return `${prefix}:${params.join(':')}`
// 行注释：结束当前代码块或函数调用。
}

