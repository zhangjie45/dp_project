<template>
    <div class="main">
        <div class="header">
            <div class="header-title">总运行效率</div>
        </div>

        <div class="item1">
            <div class="item-content">
                <div class="select" style="height: 24px">
                    <el-date-picker class="select-week" :disabled="topLoading" v-model="topWeek" type="week"
                        size="small" format="[第] ww [周]" placeholder="请选择周" value-format="YYYY-MM-DD"
                        @change="changeWeekTop" />
                </div>
                <div class="charts" ref="topCharts"></div>
            </div>
        </div>

        <div class="header">
            <div class="header-title">各区段白夜班运行效率</div>
        </div>
        <div class="item2">
            <div class="item-content">
                <div class="select">
                    <el-date-picker class="select-week" :disabled="bottomLoading" v-model="bottomWeek" type="week"
                        size="small" format="[第] ww [周]" placeholder="请选择周" value-format="YYYY-MM-DD"
                        @change="changeWeekBottom" />&nbsp;
                    <CustomSelect v-model="selectedDevice" :disabled="bottomLoading" :options="deviceOptions" />
                </div>
                <div class="charts" ref="bottomCharts"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps, watch } from 'vue'
import { fitChartSize, debounce } from '@/utils'
import CustomSelect from '@/components/Select/select.vue'
// import { getDeviceEfficiency, getLeft2 } from '@/api/section'
import { dayjs } from 'element-plus'
dayjs.en.weekStart = 1
const topWeek = ref('')
const topData = ref({})
const bottomWeek = ref('')
const bottomData = ref({})
const topLoading = ref(false)
const bottomLoading = ref(false)

const { proxy } = getCurrentInstance()
let topChart = null
let bottomChart = null
const resizeHandler = ref(null)
const topCharts = ref(null)
const bottomCharts = ref(null)
const deviceOptions = ref([
    { value: 1, label: 'D区一楼宽线' },
    { value: 2, label: 'D区一楼窄线' },
    { value: 3, label: 'D区二楼' },
    { value: 4, label: 'D区三楼' },
    { value: 5, label: 'C区' }
])
const selectedDevice = ref(1)
let timer = null
onMounted(() => {
    initTopChart()
    getTopData()
    initBottomChart()
    getBottomData()
    nextTick(() => {
        resizeHandler.value = debounce(() => {
            if (topChart) {
                topChart.resize()
                updateTopChartOptions()
            }
            if (bottomChart) {
                bottomChart.resize()
                updateBottomChartOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
        timer = setInterval(() => {
            getTopData()
            getBottomData()
        }, 1000 * 1 * 60)
    })
})

watch(
    () => selectedDevice.value,
    (val) => {
        getBottomData()
    },
    {
        deep: true
    }
)
import { left1Json, left2Json } from '../data'
function getTopData () {
    topData.value = left1Json
    updateTopChartOptions()
    // topLoading.value = true
    // topChart.showLoading({ text: '正在加载数据...', color: '#00ffec', textColor: '#fff', maskColor: 'rgba(255, 255, 255, 0.1)' })
    // getDeviceEfficiency({ weekStartDate: topWeek.value })
    //     .then((res) => {
    //         if (res.code === 200) {
    //             topData.value = res.data
    //             updateTopChartOptions()
    //         } else {
    //             topData.value = []
    //         }
    //     })
    //     .finally(() => {
    //         topChart.hideLoading()
    //         topLoading.value = false
    //     })
}
function getBottomData () {
    bottomData.value = left2Json
    updateBottomChartOptions()
    // bottomLoading.value = true
    // bottomChart.showLoading({ text: '正在加载数据...', color: '#00ffec', textColor: '#fff', maskColor: 'rgba(255, 255, 255, 0.1)' })
    // getLeft2({ weekStartDate: bottomWeek.value, sectionType: selectedDevice.value })
    //     .then((res) => {
    //         if (res.code === 200) {
    //             bottomData.value = res.data
    //             updateBottomChartOptions()
    //         } else {
    //             topData.value = []
    //         }
    //     })
    //     .finally(() => {
    //         bottomChart.hideLoading()
    //         bottomLoading.value = false
    //     })
}

function changeWeekTop (val) {
    topWeek.value = val
    getTopData()
}

function changeWeekBottom (val) {
    bottomWeek.value = val
    getBottomData()
}

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
    if (!topChart) {
        return
    }
    window.removeEventListener('resize', resizeHandler.value)
    topChart.dispose()
})
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }
    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
// 提取图表配置为函数
const getTopChartOptions = () => {
    const chartData_ = validateChartData(topData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    return {
        grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '8%'
        },
        legend: {
            top: 'top',
            width: '80%',
            textStyle: {
                color: '#bcf0fe',
                fontSize: fitChartSize(12)
            },
            itemWidth: fitChartSize(16),
            itemHeight: fitChartSize(8)
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            }
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#BCF0FE',
                    opacity: 0.2
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12),
                    fontWeight: 600
                }
            },
            data: xdata
        },

        yAxis: {
            name: '%',
            nameTextStyle: {
                color: '#BCF0FE',
                fontSize: fitChartSize(12),
                fontWeight: 500,
                align: 'left'
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#BCF0FE',
                    opacity: 0.1
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12),
                    fontWeight: 600
                }
            }
        },
        series: [
            {
                name: '总运行效率',
                data: ydata[0]?.data,
                type: 'bar',
                itemStyle: {
                    color: '#00A2FF'
                },
                barWidth: 22
            }
        ]
    }
}
const color = ['#00A2FF', '#BF7E15']
const getBottomChartOptions = () => {
    const chartData_ = validateChartData(bottomData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    return {
        grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '8%'
        },
        legend: {
            top: 'top',
            width: '80%',
            textStyle: {
                color: '#bcf0fe',
                fontSize: fitChartSize(12)
            },
            itemWidth: fitChartSize(16),
            itemHeight: fitChartSize(8)
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            }
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#BCF0FE',
                    opacity: 0.2
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12),
                    fontWeight: 600
                }
            },
            data: xdata
        },

        yAxis: {
            name: '%',
            nameTextStyle: {
                color: '#BCF0FE',
                fontSize: fitChartSize(12),
                fontWeight: 500,
                align: 'left'
            },
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#BCF0FE',
                    opacity: 0.1
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#BCF0FE',
                    fontSize: fitChartSize(12),
                    fontWeight: 600
                }
            }
        },
        series: [
            ...ydata.map((item, index) => ({
                ...item,
                name: item.name || '',
                data: item.data || [],
                type: 'bar',
                itemStyle: {
                    color: color[index]
                },
                barWidth: 22
            }))
        ]
    }
}

const initTopChart = () => {
    topChart = proxy.$echarts.init(topCharts.value)
    const options = getTopChartOptions()
    topChart.setOption(options)
}
const initBottomChart = () => {
    bottomChart = proxy.$echarts.init(bottomCharts.value)
    const options = getBottomChartOptions()
    bottomChart.setOption(options)
}

// 新增：更新图表配置
const updateTopChartOptions = () => {
    const options = getTopChartOptions()
    topChart.setOption(options)
}

const updateBottomChartOptions = () => {
    const options = getBottomChartOptions()
    bottomChart.setOption(options)
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    width: 100%;

    .header {
        width: 100%;
        height: vh(40);
        background-image: url('@/assets/image/dfp/dataPickSection/left_1.png');
        background-size: 100% 100%;
        background-position: center center;
        margin-bottom: vh(7);

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

    .item1,
    .item2 {
        .item-title {
            font-family: 'dfpFont';
            font-weight: normal;
            font-size: vw(16);
            color: #bcf0fe;
            margin-bottom: vh(9);
        }
    }

    .item1 {
        height: vh(416);
        padding: vh(10) vw(18);
        background-image: url('@/assets/image/dfp/dataPick/right_item1.png');
        background-size: 100% 100%;
        background-position: center center;
        margin-bottom: vh(16);

        .item-content {
            .select {
                display: flex;

                :deep(.select-week) {
                    width: vw(348);

                    input::-webkit-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }

                    input::-moz-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }

                    input::-ms-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }
                }

                :deep(.el-input__wrapper) {
                    background-color: transparent;
                    background-image: url(@/assets/image/dfp/dataPickSection/left_2.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    border: 0px solid rgba(0, 174, 236, 0.2);
                    color: #fff;
                    box-shadow: none;
                }

                :deep(.el-input__prefix) {
                    display: none;
                }

                :deep(.el-input__inner) {
                    padding: 0 vw(10);
                    height: vh(28);
                    font-size: vw(12);
                    color: #ffffff;
                }
            }

            .charts {
                width: 100%;
                height: vh(380);
            }
        }
    }

    .item2 {
        height: vh(416);
        padding: vh(0) vw(18);
        background-image: url('@/assets/image/dfp/dataPick/right_item2.png');
        background-size: 100% 100%;
        background-position: center center;

        .item-content {
            .select {
                display: flex;

                :deep(.select-week) {
                    width: vw(178);

                    input::-webkit-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }

                    input::-moz-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }

                    input::-ms-input-placeholder {
                        color: #fff;
                        font-weight: 600;
                    }
                }

                :deep(.el-input__wrapper) {
                    background-color: transparent;
                    background-image: url('@/components/Select/assets/select_bg.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    border: 0px solid rgba(0, 174, 236, 0.2);
                    color: #000;
                    box-shadow: none;
                }

                :deep(.el-input__prefix) {
                    display: none;
                }

                :deep(.el-input__inner) {
                    padding: 0 vw(10);
                    height: vh(28);
                    font-size: vw(12);
                    color: #ffffff;
                }

                :deep(.el-select__wrapper) {
                    background-color: transparent;
                    background-image: url('@/components/Select/assets/select_bg.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    border: 0px solid rgba(0, 174, 236, 0.2);
                    color: #fff;
                    box-shadow: none;
                }

                :deep(.el-select__inner) {
                    padding: 0 vw(10);
                    height: vh(28);
                    font-size: vw(12);
                    color: #ffffff;
                }
            }

            .charts {
                width: 100%;
                height: vh(380);
            }
        }
    }
}
</style>
