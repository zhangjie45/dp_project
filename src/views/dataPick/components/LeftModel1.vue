<template>
    <div class="chart-wrapper">
        <div class="title">综合情况</div>
        <div class="content">
            <div ref="chart" class="chart-box"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, getCurrentInstance, onBeforeUnmount } from 'vue'
import { fitChartSize, formatDisplayValue, debounce } from '@/utils'

const { proxy } = getCurrentInstance();
let charts = null
const resizeHandler = ref(null)
const chart = ref(null)

// watch(
//     () => props.projectOverview,
//     () => {
//         getData()
//     },
//     {
//         deep: true
//     }
// )
onMounted(() => {
    getData()
    nextTick(() => {
        initResizeHandler()
    })
})
const initResizeHandler = () => {
    resizeHandler.value = debounce(() => {
        if (charts) {
            charts.resize()
            updateChartOptions()
        }
    }, 100)
    window.addEventListener('resize', resizeHandler.value)
}
const getData = () => {
    nextTick(() => {
        updateChartOptions()
    })
}
onBeforeUnmount(() => {
    cleanupChart()
})
const cleanupChart = () => {
    if (charts) {
        window.removeEventListener('resize', resizeHandler.value)
        charts.dispose()
        charts = null
    }
}
// 提取图表配置为函数
const getChartOptions = () => {
    return {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#02184A',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            },
            formatter: (params) => {
                return `${params[0].name}: ${params[0].data}`
            }
        },
        grid: {
            left: '2%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(10),
                // 自定义标签格式化函数
                formatter: function (value) {
                    // 如果标签文字过长，截取部分显示
                    return value.length > 4 ? value.substring(0, 4) + '...' : value
                },
                rotate: 45, // 旋转45度
                interval: 0, // 显示所有标签
                margin: fitChartSize(10) // 增加标签与轴线的距离
            },

            data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11', '1-12']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(10)
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.32)',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        series: [
            {
                data: [20, 32, 41, 34, 90, 30, 10, 50, 60, 70, 80, 40],
                type: 'bar',
                barWidth: '20%',
                itemStyle: {
                    color: '#1DCEFA'
                }
            }
        ]
    }
}

const initBarChart = () => {
    // 防止重复初始化
    if (charts) return

    charts = proxy.$echarts.init(chart.value)
    const options = getChartOptions()
    charts.setOption(options)

    // 添加窗口大小变化监听
    window.addEventListener('resize', () => {
        charts.resize()
    })
}
const updateChartOptions = () => {
    if (!charts) {
        initBarChart()
    } else {
        // 使用 notMerge: true 确保配置完全更新
        const options = getChartOptions()
        charts.setOption(options, { notMerge: true })
    }
}
</script>

<style lang="scss" scoped>
.chart-wrapper {
    margin-top: vh(20);
    width: vw(510);
    height: vh(400);
    padding: vh(12) vw(16);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;


    .title {
        width: 100%;
        height: vh(50);
        text-align: left;
        font-size: vw(18);
        font-family: YouSheBiaoTiHei;
        color: #000;
        line-height: vw(50);
        font-weight: bold;
    }

    .content {
        background-color: #000;
        flex: 1;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .chart-box {
            width: vw(510);
            height: vh(340);
        }
    }
}
</style>
