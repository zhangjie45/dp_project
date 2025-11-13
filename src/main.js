import { createApp } from 'vue'
import './assets/index.scss'
import App from './App.vue'
// import VueRouter from 'vue-router'
import router from './router/index'
import * as echarts from 'echarts' // 引入echarts
import { fitChartSize } from './utils/dataUtil'

const app = createApp(App)
app.use(router)

app.config.globalProperties.$echarts = echarts // 全局使用
app.config.globalProperties.$fitChartSize = fitChartSize

app.mount('#app')
