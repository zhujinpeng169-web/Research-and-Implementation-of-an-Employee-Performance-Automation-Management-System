<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <h3>工作台</h3>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-skeleton :loading="loading" animated>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #template>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-row :gutter="20">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-col :span="6" v-for="i in 4" :key="i">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-skeleton-item variant="h3" style="width: 100%; height: 120px" />
          </el-col>
        </el-row>
      </template>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #default>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-row :gutter="20">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-col :span="6">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-card shadow="hover" class="stat-card-container">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div class="stat-card">
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-icon" style="background: #409EFF">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <i class="el-icon-user" style="font-size: 30px; color: white"></i>
                </div>
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-info">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-value">{{ stats.totalEmployees }}</div>
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-label">员工总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-col :span="6">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-card shadow="hover" class="stat-card-container">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div class="stat-card">
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-icon" style="background: #67C23A">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <i class="el-icon-aim" style="font-size: 30px; color: white"></i>
                </div>
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-info">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-value">{{ stats.totalGoals }}</div>
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-label">目标总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-col :span="6">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-card shadow="hover" class="stat-card-container">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div class="stat-card">
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-icon" style="background: #E6A23C">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <i class="el-icon-document" style="font-size: 30px; color: white"></i>
                </div>
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-info">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-value">{{ stats.pendingEvaluations }}</div>
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-label">待评估</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-col :span="6">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-card shadow="hover" class="stat-card-container">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <div class="stat-card">
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-icon" style="background: #F56C6C">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <i class="el-icon-star-on" style="font-size: 30px; color: white"></i>
                </div>
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <div class="stat-info">
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-value">{{ stats.avgScore }}</div>
                  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                  <div class="stat-label">平均得分</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
// 模块说明：仪表盘页面，汇总展示关键业务指标与系统概览信息。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const stats = ref({
  // 行注释：配置对象或数组中的一项内容。
  totalEmployees: 0,
  // 行注释：配置对象或数组中的一项内容。
  totalGoals: 0,
  // 行注释：配置对象或数组中的一项内容。
  pendingEvaluations: 0,
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  avgScore: 0
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(true)

// 行注释：开始一个代码块，下面是该结构内部逻辑。
onMounted(async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const [overview, scoreData] = await Promise.all([
      // 行注释：配置对象或数组中的一项内容。
      api.getOverview(),
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      api.getEvaluationScores()
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    ])
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    stats.value.totalEmployees = overview.data.totalEmployees
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    stats.value.totalGoals = overview.data.totalGoals
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    stats.value.pendingEvaluations = overview.data.totalEvaluations
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    stats.value.avgScore = scoreData.data.average ? scoreData.data.average.toFixed(2) : 0
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.error('Failed to load dashboard data:', error)
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载数据失败，请稍后重试')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})
</script>

<style scoped>
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-card-container {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    cursor: pointer;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    transition: transform 0.3s;
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-card-container:hover {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    transform: translateY(-5px);
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-card {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    padding: 20px;
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-icon {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    width: 60px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    height: 60px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    border-radius: 10px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-right: 15px;
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-info {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    flex: 1;
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-value {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 32px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-weight: bold;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #303133;
/* 行注释：结束当前样式规则。 */
}
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.stat-label {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-top: 5px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #909399;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 14px;
/* 行注释：结束当前样式规则。 */
}
</style>

