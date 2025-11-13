<template>
    <div class="main">
        <div class="header">
            <div class="header-title">电晕总功率监测</div>
        </div>
        <div class="content">
            <div class="select">
                <CustomSelect v-model="selectedDevice" :options="deviceOptions" />
            </div>
            <div class="charts">
                <div ref="chart" class="body-chart"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps, watch, onUnmounted } from 'vue'
import { fitChartSize, debounce } from '@/utils'
import CustomSelect from '@/components/Select/select.vue'
// import { getElectrodePower } from '@/api/detail'

const deviceOptions = ref([{ value: 'all', label: '全部设备' }])

const props = defineProps({
    deviceIndex: {
        type: Number,
        default: 0
    },
    machineList: {
        type: Array,
        default: () => []
    }
})

const selectedDevice = ref('all')

const { proxy } = getCurrentInstance()
let charts = null
const resizeHandler = ref(null)
const chart = ref(null)
const chartData = ref({ xdata: [], ydata: [] })

onMounted(() => {
    nextTick(() => {
        initBarChart()
        resizeHandler.value = debounce(() => {
            if (charts) {
                charts.resize()
                updateChartOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})

watch(
    () => props.machineList,
    (newMachineList) => {
        // 数据验证
        if (!Array.isArray(newMachineList)) {
            deviceOptions.value = [{ value: 'all', label: '全部设备' }]
            return
        }

        // 构建设备选项列表
        const options = [{ value: 'all', label: '全部设备' }, ...newMachineList.filter((item) => item && typeof item === 'object' && item.value && item.label)]

        deviceOptions.value = options
    },
    {
        immediate: true,
        deep: true
    }
)

// 设备选择变化监听器
watch(
    () => selectedDevice.value,
    (newVal, oldVal) => {
        if (newVal !== oldVal) {
            console.log('选中设备变化:', newVal)
            // 触发数据更新
            getData()
        }
    },
    {
        flush: 'post' // 在DOM更新后执行
    }
)
let timer = null
watch(
    () => props.deviceIndex,
    () => {
        getData()
        timer = setInterval(() => {
            getData()
        }, 1000 * 1 * 60) // 每5分钟更新一次
    },
    {
        deep: true
    }
)
import { powerDataJson } from '../data'
const getData = () => {
    chartData.value = powerDataJson
    nextTick(() => {
        updateChartWithOptions()
    })
    // getElectrodePower({ machineCode: props.deviceIndex, viewName: selectedDevice.value === 'all' ? undefined : selectedDevice.value })
    //     .then((res) => {
    //         if (res.code === 200) {
    //             chartData.value = res.data
    //             nextTick(() => {
    //                 updateChartWithOptions()
    //             })
    //         }
    //     })
    //     .catch((error) => {
    //         updateChartWithOptions()
    //     })
}
const updateChartWithOptions = () => {
    nextTick(() => {
        if (charts) {
            const options = getChartOptions()
            // 使用 notMerge: true 确保完全重新渲染
            charts.setOption(options, { notMerge: true })
        } else {
            // 如果图表未初始化，则初始化
            initBarChart()
        }
    })
}
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
    if (!charts) {
        return
    }

    window.removeEventListener('resize', resizeHandler.value)
    charts.dispose()
})
// 添加数据验证函数
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }

    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
const line_color = ['rgba(196, 128, 21, 1)', 'rgba(0, 240, 216, 1)']
// 提取图表配置为函数
const getChartOptions = () => {
    const chartData_ = validateChartData(chartData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    const isAllZero = ydata[0]?.data?.every((item) => item === 0)
    return {
        grid: {
            left: ydata.length > 0 ? (isAllZero ? '8%' : '3%') : '8%',
            right: '5%',
            bottom: '5%',
            top: ydata.length > 4 ? '25%' : '15%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            }
            // formatter: (params) => {
            //     return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].data}`
            // }
        },
        legend: {
            top: 'top',
            width: '60%',
            textStyle: {
                color: '#bcf0fe',
                fontSize: fitChartSize(12)
            },
            itemWidth: fitChartSize(16),
            itemHeight: fitChartSize(8)
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
                fontWeight: 500
            },
            splitNumber: 5,
            data: xdata
        },

        yAxis: [
            {
                name: '功率(kW)',
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12),
                    fontWeight: 500,
                    align: 'left'
                },
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(188, 240, 254, 0.1)'
                    }
                },

                axisLabel: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12), // 重新计算字体大小
                    fontWeight: 500,
                    width: 50,
                    overflow: 'truncate'
                }
            }
        ],
        series: [
            ...ydata.map((item, index) => ({
                ...item,
                name: item.name || '',
                data: item.data || [],
                type: 'line',
                smooth: true,
                symbol: 'circle',
                lineStyle: {
                    color: line_color[index],
                    width: 1
                },
                itemStyle: {
                    color: line_color[index]
                }
            }))
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
    if (charts) {
        const options = getChartOptions()
        // 使用 replaceMerge 确保系列数据正确更新
        charts.setOption(options, { replaceMerge: ['series'] })
    }
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
        padding: vh(15) vw(18);

        .select {
            float: inline-end;
        }

        .charts {
            margin-top: vh(45);
            width: 100%;
            height: vh(345);

            .body-chart {
                width: 100%;
                height: vh(345);
            }
        }
    }
}
</style>
