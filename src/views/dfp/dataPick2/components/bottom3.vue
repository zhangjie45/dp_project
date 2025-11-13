<template>
    <div class="main">
        <div class="header">
            <div class="header-title" v-if="![28, 33, 32].includes(props.deviceIndex)">设备状态监测</div>
            <div class="header-title" v-else>设备状态监测</div>
        </div>
        <div class="content">
            <div class="left">
                <div ref="chart" class="body-chart"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps, watch } from 'vue'
import { fitChartSize, debounce } from '@/utils'
const { proxy } = getCurrentInstance()
let charts = null
const resizeHandler = ref(null)
const chart = ref(null)

onMounted(() => {
    getData()
    nextTick(() => {
        resizeHandler.value = debounce(() => {
            if (charts) {
                charts.resize()
                updateChartOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})

const props = defineProps({
    deviceCheck: {
        type: Object,
        default: () => ({
            chartData: {
                xdata: [],
                ydata: []
            }
        })
    },
    deviceIndex: {
        type: Number,
        default: 0
    }
})
const getData = () => {
    nextTick(() => {
        if (charts) {
            updateChartOptions()
        } else {
            initBarChart()
        }
    })
}
watch(
    () => props.deviceCheck,
    () => {
        getData()
    },
    {
        deep: true
    }
)
onBeforeUnmount(() => {
    if (!charts) {
        return
    }
    window.removeEventListener('resize', resizeHandler.value)
    charts.dispose()
})

// 添加数据验证函数
const validateChartData = (chartData) => {
    console.log('chartData', chartData)

    if (!chartData) return { xdata: [], ydata: [] }
    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
// 提取图表配置为函数
const getChartOptions = () => {
    const chartData = validateChartData(props.deviceCheck)
    const xdata = chartData.xdata
    const ydata = chartData.ydata
    return {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '35%',
            containLabel: true
        },
        legend: {
            show: true,
            icon: 'circle',
            itemWidth: fitChartSize(10),
            itemHeight: fitChartSize(10),
            textStyle: {
                color: '#bcf0fe',
                fontSize: fitChartSize(12)
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            },
            formatter: (params) => {
                if (typeof params?.[0]?.data?.[1] !== 'undefined' && params?.[0]?.data?.[1] !== null) {
                    return `${params[0].name}<br/>${params[0].seriesName}`
                } else {
                    return `${params[0].name}`
                }
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'rgba(188, 240, 254, 0.1)'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#BCF0FE',
                fontSize: fitChartSize(12), // 重新计算字体大小
                fontWeight: 500,
                formatter: function (value) {
                    return value.split(' ')[1]
                }
            },
            data: xdata
        },
        yAxis: {
            type: 'value',

            minInterval: 1,
            axisLabel: {
                color: '#BCF0FE',
                fontSize: fitChartSize(12),
                fontWeight: 500,
                formatter: function (value) {
                    if (value === 0) return '停机'
                    if (value === 1) return '运行'
                    return value
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(188, 240, 254, 0.1)'
                }
            }
        },
        series: [
            {
                name: '运行',
                symbolSize: 8,
                data: ydata[0]?.data,
                type: 'scatter',
                itemStyle: {
                    color: '#00f0d8' // 开机颜色
                }
            },
            {
                name: '停机',
                symbolSize: 8,
                data: ydata[1]?.data,
                type: 'scatter',
                itemStyle: {
                    color: '#c48015' // 关机颜色
                }
            }
        ]
    }
}

const initBarChart = () => {
    charts = proxy.$echarts.init(chart.value)
    const options = getChartOptions()
    charts.setOption(options)
}

// 新增：更新图表配置
const updateChartOptions = () => {
    const options = getChartOptions()
    charts.setOption(options)
}
</script>

<style lang="scss" scoped>
.main {
    .header {
        width: 100%;
        height: vh(40);
        background-image: url('@/assets/image/dfp/dataPick2/bottom1_1.png');
        background-size: 100% 100%;
        background-position: center center;

        .header-title {
            font-family: 'dfpFont';
            font-weight: normal;
            font-size: vw(20);
            color: #fff;
            line-height: vh(40);
            text-align: center;
        }

        .header-title::before {
            content: '';
            display: inline-block;
            margin-bottom: vh(4);
            line-height: vh(40);
            width: vw(30);
            height: vh(10);
            background-image: url('@/assets/image/dfp/dataPick/item_header_left.png');
            background-size: 100% 100%;
            background-position: center center;
        }

        .header-title::after {
            content: '';
            display: inline-block;
            margin-bottom: vh(4);
            line-height: vh(40);
            width: vw(30);
            height: vh(10);
            background-image: url('@/assets/image/dfp/dataPick/item_header_right.png');
            background-size: 100% 100%;
            background-position: center center;
        }
    }

    .content {
        margin-top: vh(7);
        height: vh(382);
        background-color: rgba(1, 38, 58, 0.39);
        padding: vh(25) vw(18);
        display: flex;
        justify-content: space-between;

        .left {
            width: vw(420);
            height: vh(382);
            float: inline-start;

            .body-chart {
                width: vw(420);
                height: vh(382);
            }
        }
    }
}
</style>
