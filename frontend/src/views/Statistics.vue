<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <h3>数据统计分析</h3>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="12">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div ref="chartDept" style="height: 350px"></div>
        </el-card>
      </el-col>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="12">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div ref="chartGoal" style="height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-row :gutter="20">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="12">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div ref="chartScore" style="height: 350px"></div>
        </el-card>
      </el-col>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-col :span="12">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-card>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <h4>评分统计</h4>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <div style="margin-top: 20px">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <p>平均分：<span style="color: #409EFF; font-size: 24px; font-weight: bold">{{ scoreStats.average }}</span></p>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <p>最高分：{{ scoreStats.max }}</p>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <p>最低分：{{ scoreStats.min }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref, onMounted } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import * as echarts from 'echarts'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const chartDept = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const chartGoal = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const chartScore = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const scoreStats = ref({ average: 0, max: 0, min: 0 })

// 行注释：开始一个代码块，下面是该结构内部逻辑。
onMounted(async () => {
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const [deptDist, goalComp, scoreData] = await Promise.all([
      // 行注释：配置对象或数组中的一项内容。
      api.getDepartmentDistribution(),
      // 行注释：配置对象或数组中的一项内容。
      api.getGoalCompletion(),
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      api.getEvaluationScores()
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    ])

    // 部门人数分布
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const deptChart = echarts.init(chartDept.value)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    deptChart.setOption({
      // 行注释：配置对象或数组中的一项内容。
      title: { text: '部门人数分布' },
      // 行注释：配置对象或数组中的一项内容。
      tooltip: {},
      // 行注释：配置对象或数组中的一项内容。
      xAxis: { type: 'category', data: Object.keys(deptDist.data) },
      // 行注释：配置对象或数组中的一项内容。
      yAxis: { type: 'value' },
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      series: [{
        // 行注释：配置对象或数组中的一项内容。
        type: 'bar',
        // 行注释：配置对象或数组中的一项内容。
        data: Object.values(deptDist.data),
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        itemStyle: { color: '#409EFF' }
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      }]
    // 行注释：结束当前代码块或函数调用。
    })

    // 目标完成情况
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const goalChart = echarts.init(chartGoal.value)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    goalChart.setOption({
      // 行注释：配置对象或数组中的一项内容。
      title: { text: '目标完成情况' },
      // 行注释：配置对象或数组中的一项内容。
      tooltip: { trigger: 'item' },
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      series: [{
        // 行注释：配置对象或数组中的一项内容。
        type: 'pie',
        // 行注释：配置对象或数组中的一项内容。
        radius: '60%',
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        data: [
          // 行注释：配置对象或数组中的一项内容。
          { value: goalComp.data.completed, name: '已完成' },
          // 行注释：配置对象或数组中的一项内容。
          { value: goalComp.data.inProgress, name: '进行中' },
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          { value: goalComp.data.pending, name: '待开始' }
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        ]
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      }]
    // 行注释：结束当前代码块或函数调用。
    })

    // 评分分布
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const scoreChart = echarts.init(chartScore.value)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    scoreChart.setOption({
      // 行注释：配置对象或数组中的一项内容。
      title: { text: '评分分布趋势' },
      // 行注释：配置对象或数组中的一项内容。
      tooltip: {},
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      xAxis: {
        // 行注释：配置对象或数组中的一项内容。
        type: 'category',
        // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
        data: scoreData.data.scores.map((_, i) => `评估${i + 1}`)
      // 行注释：配置对象或数组中的一项内容。
      },
      // 行注释：配置对象或数组中的一项内容。
      yAxis: { type: 'value' },
      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      series: [{
        // 行注释：配置对象或数组中的一项内容。
        type: 'line',
        // 行注释：配置对象或数组中的一项内容。
        data: scoreData.data.scores,
        // 行注释：配置对象或数组中的一项内容。
        smooth: true,
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        itemStyle: { color: '#67C23A' }
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      }]
    // 行注释：结束当前代码块或函数调用。
    })

    // 更新评分统计
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    scoreStats.value = {
      // 行注释：配置对象或数组中的一项内容。
      average: scoreData.data.average.toFixed(2),
      // 行注释：配置对象或数组中的一项内容。
      max: scoreData.data.max.toFixed(2),
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      min: scoreData.data.min.toFixed(2)
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    console.error('Failed to load statistics:', error)
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
})
</script>

