<!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
<template>
  <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
  <div class="login-container">
    <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
    <el-card class="login-card" shadow="always">
      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <template #header>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <div class="login-header">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <h2>员工效能管理系统</h2>
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <p>登录或注册后开始使用</p>
        </div>
      </template>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <el-tabs v-model="activeTab" stretch>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tab-pane label="登录" name="login">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            @keyup.enter="handleLogin"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="username">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="loginForm.username"
                placeholder="用户名"
                size="large"
                prefix-icon="el-icon-user"
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="password">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码"
                size="large"
                prefix-icon="el-icon-lock"
                show-password
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-button
                type="primary"
                size="large"
                style="width: 100%"
                :loading="loginLoading"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <el-tab-pane label="注册" name="register">
          <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            @keyup.enter="handleRegister"
          >
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="username">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="registerForm.username"
                placeholder="设置用户名"
                size="large"
                prefix-icon="el-icon-user"
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="realName">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="registerForm.realName"
                placeholder="真实姓名"
                size="large"
                prefix-icon="el-icon-user-solid"
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="role">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-select
                v-model="registerForm.role"
                size="large"
                style="width: 100%"
                placeholder="请选择身份"
              >
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <el-option label="管理员" value="ADMIN" />
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <el-option label="主管" value="MANAGER" />
                <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
                <el-option label="员工" value="EMPLOYEE" />
              </el-select>
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="password">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="设置密码"
                size="large"
                prefix-icon="el-icon-lock"
                show-password
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item prop="confirmPassword">
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="确认密码"
                size="large"
                prefix-icon="el-icon-lock"
                show-password
              />
            </el-form-item>
            <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
            <el-form-item>
              <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
              <el-button
                type="success"
                size="large"
                style="width: 100%"
                :loading="registerLoading"
                @click="handleRegister"
              >
                注册账号
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
      <div class="login-footer">
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <p>员工效能管理系统 v8.0</p>
        <!-- 行注释：模板结构行，用于渲染页面元素、绑定数据或响应用户操作。 -->
        <p>演示账号：管理员 admin/admin，主管 manager/manager，员工 employee/employee</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 模块说明：登录/注册页面，处理用户身份认证、表单校验与登录态初始化。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { ref } from 'vue'
// 行注释：导入路由能力，用于页面跳转和访问控制。
import { useRouter } from 'vue-router'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { ElMessage } from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import api from '../api'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const router = useRouter()

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const activeTab = ref('login')
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loginFormRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const registerFormRef = ref(null)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loginLoading = ref(false)
// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const registerLoading = ref(false)

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const loginForm = ref({
  // 行注释：配置对象或数组中的一项内容。
  username: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  password: ''
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义 Vue 响应式数据，页面会随数据变化自动更新。
const registerForm = ref({
  // 行注释：配置对象或数组中的一项内容。
  username: '',
  // 行注释：配置对象或数组中的一项内容。
  realName: '',
  // 行注释：配置对象或数组中的一项内容。
  role: 'EMPLOYEE',
  // 行注释：配置对象或数组中的一项内容。
  password: '',
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  confirmPassword: ''
// 行注释：结束当前代码块或函数调用。
})

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const normalizeRole = (role) => {
  // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
  const normalized = String(role || '').toUpperCase()
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (normalized === 'USER') return 'EMPLOYEE'
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (['ADMIN', 'MANAGER', 'EMPLOYEE'].includes(normalized)) return normalized
  // 行注释：返回当前函数的计算结果或组件配置。
  return 'EMPLOYEE'
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件中的功能函数，封装页面交互、数据处理或工具逻辑，供当前模块调用。
const validateConfirmPassword = (rule, value, callback) => {
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (!value) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    callback(new Error('请再次输入密码'))
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：进行条件判断，控制页面逻辑分支。
  if (value !== registerForm.value.password) {
    // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
    callback(new Error('两次输入密码不一致'))
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    return
  // 行注释：结束当前代码块或函数调用。
  }
  // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
  callback()
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const loginRules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  username: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请输入用户名', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  password: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请输入密码', trigger: 'blur' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const registerRules = {
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  username: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 3, max: 30, message: '用户名长度需在 3-30 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  realName: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  role: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, message: '请选择身份', trigger: 'change' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  password: [
    // 行注释：配置对象或数组中的一项内容。
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { min: 6, max: 30, message: '密码长度需在 6-30 个字符', trigger: 'blur' }
  // 行注释：配置对象或数组中的一项内容。
  ],
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  confirmPassword: [
    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  // 行注释：当前行参与完成页面交互或数据处理逻辑。
  ]
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const handleLogin = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  loginFormRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    loginLoading.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const payload = {
        // 行注释：配置对象或数组中的一项内容。
        username: loginForm.value.username.trim(),
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        password: loginForm.value.password
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const res = await api.login(payload)
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const { token, userId, username, realName, role } = res.data
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const normalizedRole = normalizeRole(role)

      // 行注释：进行条件判断，控制页面逻辑分支。
      if (!token) {
        // 行注释：向用户展示操作成功、失败或提示信息。
        ElMessage.error('登录失败：未获取到令牌')
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        return
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.setItem('token', token)
      // 行注释：读写浏览器本地存储，用于保存登录状态或用户信息。
      localStorage.setItem(
        // 行注释：配置对象或数组中的一项内容。
        'user',
        // 行注释：开始一个代码块，下面是该结构内部逻辑。
        JSON.stringify({
          // 行注释：配置对象或数组中的一项内容。
          userId,
          // 行注释：配置对象或数组中的一项内容。
          username,
          // 行注释：配置对象或数组中的一项内容。
          realName,
          // 行注释：当前行参与完成页面交互或数据处理逻辑。
          role: normalizedRole
        // 行注释：结束当前代码块或函数调用。
        })
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      )

      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('登录成功')
      // 行注释：执行路由跳转或读取路由信息。
      router.push('/dashboard')
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const message = error.response?.data?.message || '登录失败，请检查用户名和密码'
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error(message)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } finally {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      loginLoading.value = false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
// 方法用法：页面组件提交表单或保存数据时使用，负责校验输入并调用后端接口。
const handleRegister = () => {
  // 行注释：开始一个代码块，下面是该结构内部逻辑。
  registerFormRef.value.validate(async (valid) => {
    // 行注释：进行条件判断，控制页面逻辑分支。
    if (!valid) return

    // 行注释：当前行参与完成页面交互或数据处理逻辑。
    registerLoading.value = true
    // 行注释：开始异常捕获流程，常用于接口调用。
    try {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const payload = {
        // 行注释：配置对象或数组中的一项内容。
        username: registerForm.value.username.trim(),
        // 行注释：配置对象或数组中的一项内容。
        realName: registerForm.value.realName.trim(),
        // 行注释：配置对象或数组中的一项内容。
        role: normalizeRole(registerForm.value.role),
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        password: registerForm.value.password
      // 行注释：结束当前代码块或函数调用。
      }

      // 行注释：等待后端接口返回结果，再继续更新页面数据。
      await api.register(payload)
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.success('注册成功，请登录')

      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      loginForm.value.username = payload.username
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      loginForm.value.password = ''
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      activeTab.value = 'login'

      // 行注释：开始一个代码块，下面是该结构内部逻辑。
      registerForm.value = {
        // 行注释：配置对象或数组中的一项内容。
        username: '',
        // 行注释：配置对象或数组中的一项内容。
        realName: '',
        // 行注释：配置对象或数组中的一项内容。
        role: 'EMPLOYEE',
        // 行注释：配置对象或数组中的一项内容。
        password: '',
        // 行注释：当前行参与完成页面交互或数据处理逻辑。
        confirmPassword: ''
      // 行注释：结束当前代码块或函数调用。
      }
      // 行注释：执行当前前端语句，完成赋值、调用或注册操作。
      registerFormRef.value?.clearValidate()
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } catch (error) {
      // 行注释：定义变量或常量，保存页面状态、配置或业务数据。
      const message = error.response?.data?.message || '注册失败，请稍后再试'
      // 行注释：向用户展示操作成功、失败或提示信息。
      ElMessage.error(message)
    // 行注释：开始一个代码块，下面是该结构内部逻辑。
    } finally {
      // 行注释：当前行参与完成页面交互或数据处理逻辑。
      registerLoading.value = false
    // 行注释：结束当前代码块或函数调用。
    }
  // 行注释：结束当前代码块或函数调用。
  })
// 行注释：结束当前代码块或函数调用。
}
</script>

<style scoped>
/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-container {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    display: flex;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    justify-content: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    align-items: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    min-height: 100vh;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-card {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    width: 420px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-header {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    text-align: center;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-header h2 {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin: 0 0 8px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #303133;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-header p {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin: 0;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #909399;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 14px;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-footer {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    text-align: center;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin-top: 16px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    color: #606266;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    font-size: 12px;
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    line-height: 1.8;
/* 行注释：结束当前样式规则。 */
}

/* 行注释：定义一组样式规则，控制对应元素的显示效果。 */
.login-footer p {
    /* 行注释：设置 CSS 样式属性，调整布局、颜色、间距或交互效果。 */
    margin: 0;
/* 行注释：结束当前样式规则。 */
}
</style>

