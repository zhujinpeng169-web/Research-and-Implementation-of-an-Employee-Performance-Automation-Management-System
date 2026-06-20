<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="预警提醒管理" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="loadAlerts" icon="el-icon-refresh" size="small">
          刷新
        </el-button>
      </template>
    </el-page-header>

    <!-- 统计卡片 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="6">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="display: flex; align-items: center; justify-content: space-between">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="color: #909399; font-size: 14px; margin-bottom: 8px">总预警数</div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="font-size: 28px; font-weight: bold; color: #303133">{{ alerts.length }}</div>
            </div>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-bell" style="font-size: 40px; color: #409EFF; opacity: 0.3"></i>
          </div>
        </el-card>
      </el-col>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="6">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="display: flex; align-items: center; justify-content: space-between">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="color: #909399; font-size: 14px; margin-bottom: 8px">未读预警</div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="font-size: 28px; font-weight: bold; color: #F56C6C">{{ unreadCount }}</div>
            </div>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-warning" style="font-size: 40px; color: #F56C6C; opacity: 0.3"></i>
          </div>
        </el-card>
      </el-col>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="6">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="display: flex; align-items: center; justify-content: space-between">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="color: #909399; font-size: 14px; margin-bottom: 8px">任务延期</div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="font-size: 28px; font-weight: bold; color: #E6A23C">{{ alertTypeCount.task_delay }}</div>
            </div>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-time" style="font-size: 40px; color: #E6A23C; opacity: 0.3"></i>
          </div>
        </el-card>
      </el-col>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="6">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card shadow="hover" :body-style="{ padding: '20px' }">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="display: flex; align-items: center; justify-content: space-between">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="color: #909399; font-size: 14px; margin-bottom: 8px">待评估</div>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div style="font-size: 28px; font-weight: bold; color: #909399">{{ alertTypeCount.evaluation_pending }}</div>
            </div>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <i class="el-icon-document" style="font-size: 40px; color: #909399; opacity: 0.3"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #header>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div style="display: flex; justify-content: space-between; align-items: center">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <span style="font-weight: bold">预警列表</span>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button-group>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-button
                :type="activeTab === 'all' ? 'primary' : 'default'"
                @click="switchTab('all')"
                size="small"
              >
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                全部 ({{ alerts.length }})
              </el-button>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-button
                :type="activeTab === 'unread' ? 'danger' : 'default'"
                @click="switchTab('unread')"
                size="small"
              >
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                未读 ({{ unreadCount }})
              </el-button>
            </el-button-group>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button
              v-if="unreadCount > 0"
              type="success"
              @click="markAllAsRead"
              size="small"
              style="margin-left: 10px"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-check"></i> 全部已读
            </el-button>
          </div>
        </div>
      </template>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-empty v-if="!loading && alerts.length === 0" description="暂无预警提醒" />

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-empty v-else-if="!loading && filteredAlerts.length === 0 && activeTab === 'unread'" description="暂无未读预警">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="switchTab('all')">查看全部</el-button>
      </el-empty>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table
        v-else
        :data="paginatedAlerts"
        v-loading="loading"
        style="width: 100%"
        stripe
        highlight-current-row
        :header-cell-style="{background: '#f5f7fa', color: '#606266'}"
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column type="index" label="#" width="60" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="type" label="类型" width="120" sortable>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag :type="getAlertTypeTag(row.type)" size="small">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ getAlertTypeName(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="message" label="预警内容" min-width="300">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <div :style="{ fontWeight: row.status === 'unread' ? 'bold' : 'normal' }">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-bell" v-if="row.status === 'unread'" style="color: #F56C6C; margin-right: 5px"></i>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ row.message }}
            </div>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="targetType" label="关联对象" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag size="small" type="info">{{ row.targetType || '-' }}</el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="createdAt" label="创建时间" width="160" sortable />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="status" label="状态" width="90" sortable>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag :type="row.status === 'unread' ? 'danger' : 'success'" size="small" effect="dark">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ row.status === 'unread' ? '未读' : '已读' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column label="操作" width="180" fixed="right">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button
              v-if="row.status === 'unread'"
              size="small"
              type="primary"
              text
              @click="markAsRead(row.id)"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-check"></i> 已读
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="danger" text @click="deleteAlert(row)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div style="color: #909399; font-size: 14px">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          共 {{ filteredAlerts.length }} 条预警，其中未读 {{ unreadCount }} 条
        </div>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="filteredAlerts.length"
          layout="sizes, prev, pager, next, jumper"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted, computed } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage, ElMessageBox } from 'element-plus'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const alerts = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeTab = ref('unread')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentPage = ref(1)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pageSize = ref(10)
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const unreadCount = computed(() => {
  // 行注释：返回当前函数的计算结果或组件配置。
  return alerts.value.filter(a => a.status === 'unread').length
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const alertTypeCount = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const counts = {
    // 行注释：配置对象或数组中的一项内容。
    task_delay: 0,
    // 行注释：配置对象或数组中的一项内容。
    goal_delay: 0,
    // 行注释：配置对象或数组中的一项内容。
    evaluation_pending: 0,
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    abnormal_data: 0
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  alerts.value.forEach(alert => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (counts.hasOwnProperty(alert.type)) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      counts[alert.type]++
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
  // 行注释：返回当前函数的计算结果或组件配置。
  return counts
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filteredAlerts = computed(() => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (activeTab.value === 'unread') {
    // 行注释：返回当前函数的计算结果或组件配置。
    return alerts.value.filter(a => a.status === 'unread')
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return alerts.value
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const paginatedAlerts = computed(() => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const start = (currentPage.value - 1) * pageSize.value
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const end = start + pageSize.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return filteredAlerts.value.slice(start, end)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const switchTab = (tab) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  activeTab.value = tab
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentPage.value = 1
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadAlerts = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getAlerts()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    alerts.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载预警失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const markAsRead = async (id) => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：等待后端接口返回结果，再继续更新页面数据。
    await api.markAlertAsRead(id)
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success('已标记为已读')
    // 更新本地数据
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const alert = alerts.value.find(a => a.id === id)
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (alert) {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      alert.status = 'read'
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('操作失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const markAllAsRead = () => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定将所有 ${unreadCount.value} 条未读预警标记为已读吗？`,
    // 行注释：配置对象或数组中的一项内容。
    '批量已读确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：配置对象或数组中的一项内容。
      type: 'info',
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 批量标记已读
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const unreadIds = alerts.value
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        .filter(a => a.status === 'unread')
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        .map(a => a.id)

      // 行注释：循环处理数组或列表中的每一项数据。
      for (const id of unreadIds) {
        // 行注释：等待后端接口返回结果，再继续更新页面数据。
        await api.markAlertAsRead(id)
      // 行注释：结束当前代码块或函数调用。
      }

      // 更新本地数据
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      alerts.value.forEach(alert => {
        // 行注释：进行条件判断，控制页面逻辑分支。
        if (alert.status === 'unread') {
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          alert.status = 'read'
        // 行注释：结束当前代码块或函数调用。
        }
      // 行注释：结束当前代码块或函数调用。
      })

      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success(`已标记 ${unreadIds.length} 条预警为已读`)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('批量标记失败')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).catch(() => {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('已取消操作')
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const deleteAlert = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm(
    // 行注释：配置对象或数组中的一项内容。
    `确定要删除这条预警吗？`,
    // 行注释：配置对象或数组中的一项内容。
    '删除确认',
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    {
      // 行注释：配置对象或数组中的一项内容。
      confirmButtonText: '确定',
      // 行注释：配置对象或数组中的一项内容。
      cancelButtonText: '取消',
      // 行注释：配置对象或数组中的一项内容。
      type: 'warning',
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  ).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteAlert(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadAlerts()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('删除失败')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).catch(() => {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('已取消删除')
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getAlertTypeName = (type) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const names = {
    // 行注释：配置对象或数组中的一项内容。
    task_delay: '任务延期',
    // 行注释：配置对象或数组中的一项内容。
    goal_delay: '目标延期',
    // 行注释：配置对象或数组中的一项内容。
    evaluation_pending: '待评估',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    abnormal_data: '异常数据'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return names[type] || type
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getAlertTypeTag = (type) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const tags = {
    // 行注释：配置对象或数组中的一项内容。
    task_delay: 'warning',
    // 行注释：配置对象或数组中的一项内容。
    goal_delay: 'danger',
    // 行注释：配置对象或数组中的一项内容。
    evaluation_pending: 'info',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    abnormal_data: 'danger'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return tags[type] || 'info'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const goBack = () => {
  // 行注释：执行路由跳转或读取路由信息。
  router.push('/dashboard')
// 行注释：结束当前代码块或函数调用。
}

// 键盘快捷键配置
// 行注释：开始一个代码块，下面是该结构内部逻辑。
useKeyboardShortcuts({
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+r': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadAlerts()
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.info('快捷键: Ctrl+R 刷新数据')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  'ctrl+a': () => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (unreadCount.value > 0) {
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      markAllAsRead()
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.info('快捷键: Ctrl+A 全部已读')
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  '1': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    switchTab('all')
  // 行注释：配置对象或数组中的一项内容。
  },
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  '2': () => {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    switchTab('unread')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadAlerts)
</script>

