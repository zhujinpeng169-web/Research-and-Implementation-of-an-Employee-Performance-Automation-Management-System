// 模块说明：前端启动入口，负责创建 Vue 应用、注册路由并挂载到页面。
// 行注释：从 Vue 导入响应式、生命周期或应用创建能力。
import { createApp } from 'vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import { createPinia } from 'pinia'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import ElementPlus from 'element-plus'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import 'element-plus/dist/index.css'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import App from './App.vue'
// 行注释：导入当前模块需要使用的组件、工具或样式。
import router from './router'

// 行注释：定义变量或常量，保存页面状态、配置或业务数据。
const app = createApp(App)
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
app.use(createPinia())
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
app.use(router)
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
app.use(ElementPlus, { locale: zhCn })
// 行注释：执行当前前端语句，完成赋值、调用或注册操作。
app.mount('#app')

