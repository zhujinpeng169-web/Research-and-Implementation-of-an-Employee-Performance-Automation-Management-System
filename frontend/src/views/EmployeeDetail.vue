<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div v-if="employee">
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" :content="employee.name + ' - 员工详情'" />

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-tabs v-model="activeTab" style="margin-top: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tab-pane label="基本信息" name="basic">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions :column="2" border>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="工号">{{ employee.empNo }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="姓名">{{ employee.name }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="所属部门">{{ getDepartmentName(employee.departmentId) }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="电话">{{ employee.phone || '-' }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="邮箱">{{ employee.email || '-' }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="入职日期">{{ employee.joinDate }}</el-descriptions-item>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-descriptions-item label="状态">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag :type="employee.status === 1 ? 'success' : 'danger'">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ employee.status === 1 ? '在职' : '离职' }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tab-pane label="目标列表" name="goals">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table :data="goals" style="width: 100%">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="title" label="目标标题" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="type" label="类型" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="progress" label="进度" width="150">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <template #default="{ row }">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-progress :percentage="row.progress" />
            </template>
          </el-table-column>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="status" label="状态" width="100" />
        </el-table>
      </el-tab-pane>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tab-pane label="任务列表" name="tasks">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table :data="tasks" style="width: 100%">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="title" label="任务标题" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="priority" label="优先级" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="progress" label="进度" width="150">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <template #default="{ row }">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-progress :percentage="row.progress" />
            </template>
          </el-table-column>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="status" label="状态" width="100" />
        </el-table>
      </el-tab-pane>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tab-pane label="评估记录" name="evaluations">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table :data="evaluations" style="width: 100%">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="cycleId" label="周期ID" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="selfScore" label="自评分" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="supervisorScore" label="上级评分" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="peerScore" label="同事评分" width="100" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="finalScore" label="最终得分" width="100">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <template #default="{ row }">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <span style="font-weight: bold; color: #409EFF">{{ row.finalScore }}</span>
            </template>
          </el-table-column>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="status" label="状态" width="100" />
        </el-table>
      </el-tab-pane>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tab-pane label="改进计划" name="plans">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table :data="improvementPlans" style="width: 100%">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="goal" label="改进目标" />
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="progress" label="进度" width="150">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <template #default="{ row }">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-progress :percentage="row.progress" />
            </template>
          </el-table-column>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-table-column prop="status" label="状态" width="100" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
// 模块说明：员工详情页面，展示员工档案、关联任务与绩效相关信息。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted } from 'vue'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRoute, useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const route = useRoute()
// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const employee = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const goals = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const tasks = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const evaluations = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const improvementPlans = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeTab = ref('basic')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const departments = ref([])

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getDepartmentName = (departmentId) => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!departmentId) return '-'
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const dept = departments.value.find(d => d.id === departmentId)
  // 行注释：返回当前函数的计算结果或组件配置。
  return dept ? dept.name : '-'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const loadData = async () => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const employeeId = route.params.id

  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const [empRes, goalsRes, tasksRes, evalsRes, plansRes, deptRes] = await Promise.all([
      // 行注释：配置对象或数组中的一项内容。
      api.getEmployees(),
      // 行注释：配置对象或数组中的一项内容。
      api.getGoalsByEmployee(employeeId),
      // 行注释：配置对象或数组中的一项内容。
      api.getTasksByEmployee(employeeId),
      // 行注释：配置对象或数组中的一项内容。
      api.getEvaluationsByEmployee(employeeId),
      // 行注释：配置对象或数组中的一项内容。
      api.getImprovementPlansByEmployee(employeeId),
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      api.getDepartments()
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    ])

    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    employee.value = empRes.data.find(e => e.id == employeeId)
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    goals.value = goalsRes.data
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    tasks.value = tasksRes.data
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    evaluations.value = evalsRes.data
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    improvementPlans.value = plansRes.data
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    departments.value = deptRes.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载数据失败')
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const goBack = () => {
  // 行注释：执行路由跳转或读取路由信息。
  router.push('/dashboard')
// 行注释：结束当前代码块或函数调用。
}

// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
onMounted(loadData)
</script>

<style scoped>
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.el-page-header {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-bottom: 20px;
/* 行注释：结束当前样式规则。 */
}
</style>

