<template>
  <el-popover
    placement="bottom-end"
    :width="300"
    trigger="click"
  >
    <template #reference>
      <el-button icon="el-icon-setting" circle title="列配置"></el-button>
    </template>

    <div class="column-config">
      <div class="config-header">
        <span style="font-weight: 500">列显示设置</span>
        <el-button type="text" @click="resetColumns" icon="el-icon-refresh-left" size="small">
          重置
        </el-button>
      </div>

      <el-divider style="margin: 10px 0" />

      <!-- 全选/反选 -->
      <div class="select-all">
        <el-checkbox
          v-model="allSelected"
          :indeterminate="isIndeterminate"
          @change="handleSelectAll"
        >
          全选
        </el-checkbox>
      </div>

      <el-divider style="margin: 10px 0" />

      <!-- 列选择列表 -->
      <div class="column-list">
        <draggable
          v-model="localColumns"
          item-key="prop"
          handle=".drag-handle"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <div class="column-item">
              <div class="column-item-left">
                <i class="el-icon-rank drag-handle" style="cursor: move; color: #909399; margin-right: 8px"></i>
                <el-checkbox
                  v-model="element.visible"
                  :disabled="element.fixed"
                  @change="handleColumnChange"
                >
                  {{ element.label }}
                </el-checkbox>
              </div>
              <div class="column-item-right">
                <el-tag v-if="element.fixed" size="small" type="info">固定</el-tag>
              </div>
            </div>
          </template>
        </draggable>
      </div>

      <el-divider style="margin: 10px 0" />

      <!-- 操作按钮 -->
      <div class="config-footer">
        <el-button size="small" @click="saveConfig">保存配置</el-button>
        <el-button size="small" type="primary" @click="applyConfig">应用</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, computed, watch } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import draggable from 'vuedraggable'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { UserFeedback } from '../utils/userFeedback'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const props = defineProps({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  columns: {
    // 行注释：配置对象或数组中的一项内容。
    type: Array,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    required: true
    // 格式: [{ prop, label, visible, fixed, width }]
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  storageKey: {
    // 行注释：配置对象或数组中的一项内容。
    type: String,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    default: 'tableColumnConfig'
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const emit = defineEmits(['change'])

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const localColumns = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const originalColumns = ref([])

// 初始化列配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const initColumns = () => {
  // 从localStorage加载配置
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const savedConfig = localStorage.getItem(props.storageKey)

  // 行注释：进行条件判断，控制页面逻辑分支。
  if (savedConfig) {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const config = JSON.parse(savedConfig)
      // 合并保存的配置和当前列配置
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      localColumns.value = props.columns.map(col => {
        // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
        const saved = config.find(c => c.prop === col.prop)
        // 行注释：返回当前函数的计算结果或组件配置。
        return {
          // 行注释：配置对象或数组中的一项内容。
          ...col,
          // 行注释：配置对象或数组中的一项内容。
          visible: saved ? saved.visible : col.visible !== false,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          order: saved ? saved.order : 999
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      }).sort((a, b) => (a.order || 999) - (b.order || 999))
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      console.error('加载列配置失败:', error)
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      localColumns.value = props.columns.map(col => ({
        // 行注释：配置对象或数组中的一项内容。
        ...col,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        visible: col.visible !== false
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      }))
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } else {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    localColumns.value = props.columns.map(col => ({
      // 行注释：配置对象或数组中的一项内容。
      ...col,
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      visible: col.visible !== false
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    }))
  // 行注释：结束当前代码块或函数调用。
  }

  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  originalColumns.value = JSON.parse(JSON.stringify(localColumns.value))
// 行注释：结束当前代码块或函数调用。
}

// 监听columns变化
// 行注释：开始一个代码块，下面是该结构内部逻辑。
watch(() => props.columns, () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  initColumns()
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
}, { immediate: true })

// 全选状态
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const allSelected = computed({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  get: () => {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const visibleCount = localColumns.value.filter(col => col.visible && !col.fixed).length
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const totalCount = localColumns.value.filter(col => !col.fixed).length
    // 行注释：返回当前函数的计算结果或组件配置。
    return visibleCount === totalCount && totalCount > 0
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  set: (val) => {
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    localColumns.value.forEach(col => {
      // 行注释：进行条件判断，控制页面逻辑分支。
      if (!col.fixed) {
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        col.visible = val
      // 行注释：结束当前代码块或函数调用。
      }
    // 行注释：结束当前代码块或函数调用。
    })
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 半选状态
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const isIndeterminate = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const visibleCount = localColumns.value.filter(col => col.visible && !col.fixed).length
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const totalCount = localColumns.value.filter(col => !col.fixed).length
  // 行注释：返回当前函数的计算结果或组件配置。
  return visibleCount > 0 && visibleCount < totalCount
// 行注释：结束当前代码块或函数调用。
})

// 全选/反选
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleSelectAll = (val) => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  localColumns.value.forEach(col => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!col.fixed) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      col.visible = val
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  handleColumnChange()
// 行注释：结束当前代码块或函数调用。
}

// 列变化
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleColumnChange = () => {
  // 实时预览效果
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  emit('change', localColumns.value.filter(col => col.visible))
// 行注释：结束当前代码块或函数调用。
}

// 拖拽结束
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleDragEnd = () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  handleColumnChange()
// 行注释：结束当前代码块或函数调用。
}

// 应用配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const applyConfig = () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  emit('change', localColumns.value.filter(col => col.visible))
  // 行注释：向用户展示操作成功、失败或提示信息。
  UserFeedback.success('应用列配置')
// 行注释：结束当前代码块或函数调用。
}

// 保存配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块提交表单或保存数据时使用，负责校验输入并调用后端接口。
const saveConfig = () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const config = localColumns.value.map((col, index) => ({
    // 行注释：配置对象或数组中的一项内容。
    prop: col.prop,
    // 行注释：配置对象或数组中的一项内容。
    visible: col.visible,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    order: index
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  }))

  // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
  localStorage.setItem(props.storageKey, JSON.stringify(config))
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  emit('change', localColumns.value.filter(col => col.visible))
  // 行注释：向用户展示操作成功、失败或提示信息。
  UserFeedback.success('保存列配置', { detail: '配置已保存到本地' })
// 行注释：结束当前代码块或函数调用。
}

// 重置配置
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：前端模块清空或重置页面状态，便于用户重新筛选、选择或填写。
const resetColumns = () => {
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  localColumns.value = JSON.parse(JSON.stringify(originalColumns.value))
  // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
  localStorage.removeItem(props.storageKey)
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  handleColumnChange()
  // 行注释：向用户展示操作成功、失败或提示信息。
  UserFeedback.info('已重置为默认配置')
// 行注释：结束当前代码块或函数调用。
}
</script>

<style scoped>
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-config {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 10px 0;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.config-header {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: space-between;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.select-all {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-list {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    max-height: 400px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    overflow-y: auto;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-item {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: space-between;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 8px 10px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-radius: 4px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    transition: background-color 0.2s;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-item:hover {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background-color: #f5f7fa;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-item-left {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    flex: 1;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.column-item-right {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-left: 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.config-footer {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: flex-end;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    gap: 10px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 0 10px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.drag-handle {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 16px;
/* 行注释：结束当前样式规则。 */
}
</style>

