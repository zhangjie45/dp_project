import { createApp } from 'vue'
import './assets/index.scss'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router/index'
import * as echarts from 'echarts' // 引入echarts
import { fitChartSize } from './utils/dataUtil'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(router)

app.config.globalProperties.$echarts = echarts // 全局使用
app.config.globalProperties.$fitChartSize = fitChartSize
app.use(ElementPlus, {
    locale: locale
})

app.mount('#app')
