<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div>
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-page-header @back="goBack" title="返回" content="目标调整管理" style="margin-bottom: 20px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #extra>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button-group>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button
            :type="activeTab === 'all' ? 'primary' : 'default'"
            @click="switchTab('all')"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            全部 ({{ adjustments.length }})
          </el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button
            :type="activeTab === 'pending' ? 'warning' : 'default'"
            @click="switchTab('pending')"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            待审批 ({{ pendingCount }})
          </el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button
            :type="activeTab === 'approved' ? 'success' : 'default'"
            @click="switchTab('approved')"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            已批准 ({{ approvedCount }})
          </el-button>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-button
            :type="activeTab === 'rejected' ? 'danger' : 'default'"
            @click="switchTab('rejected')"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            已拒绝 ({{ rejectedCount }})
          </el-button>
        </el-button-group>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="showCreateDialog" style="margin-left: 10px">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-plus"></i> 申请调整
        </el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="loadAdjustments">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <i class="el-icon-refresh"></i> 刷新
        </el-button>
      </template>
    </el-page-header>

    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card shadow="never">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-table
        :data="filteredAdjustments"
        v-loading="loading"
        style="width: 100%"
        stripe
      >
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column type="index" label="#" width="60" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="goalId" label="目标ID" width="100" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="reason" label="调整原因" min-width="200" show-overflow-tooltip />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="oldContent" label="原内容" width="150" show-overflow-tooltip />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="newContent" label="新内容" width="150" show-overflow-tooltip />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="status" label="状态" width="100">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-tag :type="getStatusType(row.status)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              {{ getStatusName(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column prop="createdAt" label="申请时间" width="160" />
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-table-column label="操作" width="250" fixed="right">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <template #default="{ row }">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button
              v-if="row.status === 'pending'"
              size="small"
              type="success"
              text
              @click="handleApprove(row)"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-check"></i> 批准
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button
              v-if="row.status === 'pending'"
              size="small"
              type="danger"
              text
              @click="handleReject(row)"
            >
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-close"></i> 拒绝
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="primary" text @click="viewDetail(row)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-view"></i> 详情
            </el-button>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-button size="small" type="danger" text @click="handleDelete(row)">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 创建调整对话框 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="createDialogVisible" title="申请目标调整" width="600px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="目标ID" prop="goalId">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input-number v-model="form.goalId" :min="1" style="width: 100%" />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="调整原因" prop="reason">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="form.reason"
            type="textarea"
            :rows="3"
            placeholder="请输入调整原因"
          />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="原内容" prop="oldContent">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="form.oldContent"
            type="textarea"
            :rows="3"
            placeholder="请输入原目标内容"
          />
        </el-form-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="新内容" prop="newContent">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="form.newContent"
            type="textarea"
            :rows="3"
            placeholder="请输入调整后的目标内容"
          />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="createDialogVisible = false">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button type="primary" @click="submitAdjustment" :loading="submitting">
          提交申请
        </el-button>
      </template>
    </el-dialog>

    <!-- 审批对话框 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="approvalDialogVisible" :title="approvalTitle" width="500px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-form label-width="100px">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-form-item label="审批意见">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-input
            v-model="approvalComment"
            type="textarea"
            :rows="4"
            placeholder="请输入审批意见（可选）"
          />
        </el-form-item>
      </el-form>
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #footer>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button @click="approvalDialogVisible = false">取消</el-button>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-button
          :type="approvalAction === 'approve' ? 'success' : 'danger'"
          @click="confirmApproval"
          :loading="submitting"
        >
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          确认{{ approvalAction === 'approve' ? '批准' : '拒绝' }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-dialog v-model="detailDialogVisible" title="调整详情" width="700px">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-descriptions :column="1" border v-if="currentAdjustment">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="目标ID">{{ currentAdjustment.goalId }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="调整原因">{{ currentAdjustment.reason }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="原内容">{{ currentAdjustment.oldContent }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="新内容">{{ currentAdjustment.newContent }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="状态">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-tag :type="getStatusType(currentAdjustment.status)">
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            {{ getStatusName(currentAdjustment.status) }}
          </el-tag>
        </el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="申请人ID">{{ currentAdjustment.applicantId }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="申请时间">{{ currentAdjustment.createdAt }}</el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="审批人ID" v-if="currentAdjustment.approverId">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ currentAdjustment.approverId }}
        </el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="审批意见" v-if="currentAdjustment.approvalComment">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ currentAdjustment.approvalComment }}
        </el-descriptions-item>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-descriptions-item label="审批时间" v-if="currentAdjustment.updatedAt !== currentAdjustment.createdAt">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          {{ currentAdjustment.updatedAt }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
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

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const adjustments = ref([])
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeTab = ref('pending')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const createDialogVisible = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const approvalDialogVisible = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const detailDialogVisible = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const submitting = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const formRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const currentAdjustment = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const approvalAction = ref('approve')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const approvalComment = ref('')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const approvalTitle = computed(() => approvalAction.value === 'approve' ? '批准调整' : '拒绝调整')

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const form = ref({
  // 行注释：配置对象或数组中的一项内容。
  goalId: null,
  // 行注释：配置对象或数组中的一项内容。
  reason: '',
  // 行注释：配置对象或数组中的一项内容。
  oldContent: '',
  // 行注释：配置对象或数组中的一项内容。
  newContent: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  applicantId: 1 // 临时使用固定值，实际应从登录用户获取
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const rules = {
  // 行注释：配置对象或数组中的一项内容。
  goalId: [{ required: true, message: '请输入目标ID', trigger: 'blur' }],
  // 行注释：配置对象或数组中的一项内容。
  reason: [{ required: true, message: '请输入调整原因', trigger: 'blur' }],
  // 行注释：配置对象或数组中的一项内容。
  oldContent: [{ required: true, message: '请输入原内容', trigger: 'blur' }],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  newContent: [{ required: true, message: '请输入新内容', trigger: 'blur' }]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const pendingCount = computed(() => adjustments.value.filter(a => a.status === 'pending').length)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const approvedCount = computed(() => adjustments.value.filter(a => a.status === 'approved').length)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const rejectedCount = computed(() => adjustments.value.filter(a => a.status === 'rejected').length)

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const filteredAdjustments = computed(() => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (activeTab.value === 'all') return adjustments.value
  // 行注释：返回当前函数的计算结果或组件配置。
  return adjustments.value.filter(a => a.status === activeTab.value)
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const switchTab = (tab) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  activeTab.value = tab
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
const loadAdjustments = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  loading.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const res = await api.getGoalAdjustments()
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    adjustments.value = res.data
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('加载目标调整记录失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loading.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件打开弹窗或切换显示状态，用于配合新增、编辑、筛选等交互。
const showCreateDialog = () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  createDialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const submitAdjustment = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  formRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    submitting.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.createGoalAdjustment(form.value)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('调整申请已提交')
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      createDialogVisible.value = false
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadAdjustments()
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      resetForm()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error('提交失败')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } finally {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      submitting.value = false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleApprove = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentAdjustment.value = row
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalAction.value = 'approve'
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalComment.value = ''
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalDialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件处理用户交互事件，例如点击、选择、筛选、分页或表格变化。
const handleReject = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentAdjustment.value = row
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalAction.value = 'reject'
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalComment.value = ''
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  approvalDialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义异步函数，用于调用接口或处理需要等待的操作。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const confirmApproval = async () => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  submitting.value = true
  // 行注释：开始异常捕获流程，常用于接口调用。
  try {
    // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
    const payload = {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      approverId: 1, // 临时使用固定值，实际应从登录用户获取
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      comment: approvalComment.value
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (approvalAction.value === 'approve') {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.approveGoalAdjustment(currentAdjustment.value.id, payload)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } else {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.rejectGoalAdjustment(currentAdjustment.value.id, payload)
    // 行注释：结束当前代码块或函数调用。
    }
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.success(approvalAction.value === 'approve' ? '已批准' : '已拒绝')
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    approvalDialogVisible.value = false
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    loadAdjustments()
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } catch (error) {
    // 行注释：向用户展示操作成功、失败或提示信息。
    ElMessage.error('操作失败')
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  } finally {
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    submitting.value = false
  // 行注释：结束当前代码块或函数调用。
  }
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const viewDetail = (row) => {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  currentAdjustment.value = row
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  detailDialogVisible.value = true
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件删除数据时使用，通常由表格中的删除按钮或批量删除触发。
const handleDelete = (row) => {
  // 行注释：向用户展示操作成功、失败或提示信息。
  ElMessageBox.confirm('确定要删除这条调整记录吗？', '删除确认', {
    // 行注释：配置对象或数组中的一项内容。
    confirmButtonText: '确定',
    // 行注释：配置对象或数组中的一项内容。
    cancelButtonText: '取消',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    type: 'warning'
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  }).then(async () => {
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.deleteGoalAdjustment(row.id)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('删除成功')
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      loadAdjustments()
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
// 方法用法：页面组件清空或重置页面状态，便于用户重新筛选、选择或填写。
const resetForm = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  form.value = {
    // 行注释：配置对象或数组中的一项内容。
    goalId: null,
    // 行注释：配置对象或数组中的一项内容。
    reason: '',
    // 行注释：配置对象或数组中的一项内容。
    oldContent: '',
    // 行注释：配置对象或数组中的一项内容。
    newContent: '',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    applicantId: 1
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  formRef.value?.clearValidate()
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusName = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const names = {
    // 行注释：配置对象或数组中的一项内容。
    pending: '待审批',
    // 行注释：配置对象或数组中的一项内容。
    approved: '已批准',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    rejected: '已拒绝'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return names[status] || status
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件加载数据时使用，通常在页面初始化或点击刷新时调用后端接口。
const getStatusType = (status) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const types = {
    // 行注释：配置对象或数组中的一项内容。
    pending: 'warning',
    // 行注释：配置对象或数组中的一项内容。
    approved: 'success',
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    rejected: 'danger'
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：返回当前函数的计算结果或组件配置。
  return types[status] || ''
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
onMounted(loadAdjustments)
</script>

