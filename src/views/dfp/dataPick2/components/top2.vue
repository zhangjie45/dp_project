<template>
    <div class="main">
        <div class="top">
            <div class="item">
                <div class="item-num">{{ formatDisplayValue(props.rewindData.currentMeter, '', 2, false, false) }}</div>
                <div class="item-txt" v-if="![28, 33, 32].includes(props.deviceIndex)">牵引总米长(米)</div>
                <div class="item-txt" v-else>长度(米)</div>
            </div>
            <div class="item">
                <div class="item-num">{{ formatDisplayValue(props.rewindData.currentLineSpeed) }}</div>
                <div class="item-txt">当前线速度(m/min)</div>
            </div>
            <div class="item" v-if="![28, 33, 32].includes(props.deviceIndex)">
                <div class="item-num">{{ formatDisplayValue(props.rewindData.setLineSpeed) }}</div>
                <div class="item-txt">设定线速度(m/min)</div>
            </div>
        </div>
        <div class="content">
            <div class="content-1" v-if="![28, 33, 32].includes(props.deviceIndex)">
                <div class="header">
                    <div class="header-title">圆刀累计使用情况</div>
                </div>
                <div class="body">
                    <div class="list">
                        <table class="list-table" rules="all">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">1#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">1#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife1TotalMeter) }}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">2#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">2#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife2TotalMeter) }}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">3#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">3#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife3TotalMeter) }}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">4#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">4#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife4TotalMeter) }}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">5#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">5#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife5TotalMeter) }}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="index">6#</span>刀编号</div>
                                            <!-- <div class="item-line-num">9087</div> -->
                                        </div>
                                        <div class="item-line">
                                            <div class="item-line-name"><span class="num">6#</span>累计米数(m)</div>
                                            <div class="item-line-num">{{
                                                formatDisplayValue(props.rewindData.roundKnife6TotalMeter) }}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div :class="![28, 33, 32].includes(props.deviceIndex) ? 'content-2' : 'content-3'">
                <div class="header">
                    <div class="header-title">设备运行效率</div>
                </div>
                <div class="body">
                    <div class="body-select">
                        <CustomSelect v-model="selectedDate" :options="dateOptions" />
                        <CustomSelect v-model="selectedShift" :options="shiftOptions" />
                    </div>
                    <div ref="chart" class="body-chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps, onUnmounted } from 'vue'
import { fitChartSize, debounce, formatDisplayValue } from '@/utils'
import CustomSelect from '@/components/Select/select.vue'
// import { getDeviceEfficiency } from '@/api/detail'
const dateOptions = ref([
    { value: 1, label: '当天' },
    { value: 7, label: '近7天' },
    { value: 30, label: '近30天' }
])
const shiftOptions = ref([
    { value: 0, label: '全部班次' },
    { value: 1, label: '白班' },
    { value: 2, label: '夜班' }
])
const selectedDate = ref(1)
const selectedShift = ref(0)
const props = defineProps({
    deviceIndex: {
        type: Number,
        default: 0
    },
    rewindData: {
        type: Object,
        default: () => ({
            totalTractionLength: null, // 牵引总米长(米)
            currentLineSpeed: null, // 当前线速度
            lineSpeedSetting: null, // 设定线速度
            roundKnife1TotalMeter: 0,
            roundKnife2TotalMeter: 0,
            roundKnife3TotalMeter: 0,
            roundKnife4TotalMeter: 0,
            roundKnife5TotalMeter: 0,
            roundKnife6TotalMeter: 0
        })
    }
})
let timer = null
watch(
    () => props.deviceIndex,
    (newVal, olVal) => {
        nextTick(() => {
            getData()
            timer = setInterval(() => {
                getData()
            }, 1000 * 1 * 60) // 每1分钟更新一次
        })
    },
    { deep: true }
)
watch(
    () => selectedShift.value,
    (newVal, olVal) => {
        nextTick(() => {
            getData()
        })
    },
    { deep: true }
)

// 监听选中值变化
watch(
    () => selectedDate.value,
    (newVal, olVal) => {
        nextTick(() => {
            getData()
        })
    },
    { deep: true }
)

const { proxy } = getCurrentInstance()
let charts = null
const resizeHandler = ref(null)
const chart = ref(null)
const chartData = ref({ xdata: [], ydata: [] })
onMounted(() => {
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
import { efficiencyDataJson } from '../data'
const getData = () => {
    chartData.value = efficiencyDataJson
    nextTick(() => {
        updateChartWithOptions()
    })
    // getDeviceEfficiency({ machineCode: props.deviceIndex, shift: selectedShift.value, recentDay: selectedDate.value })
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
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }

    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
// 提取图表配置为函数
const getChartOptions = () => {
    const chartData_ = validateChartData(chartData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    console.log('ydata', ydata)

    return {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '15%',
            containLabel: true
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
                return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].data}%`
            }
        },
        legend: {
            top: 'top',
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
            data: xdata
        },

        yAxis: [
            {
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
                    formatter: (value) => {
                        return value + '%'
                    }
                }
            }
        ],
        series: [
            {
                name: '利用率',
                data: ydata[0].data,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                lineStyle: {
                    color: 'rgba(0, 240, 216, 1)',
                    width: 1
                },
                itemStyle: {
                    color: 'rgba(0, 240, 216, 1)'
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
    width: 100%;
    height: 100%;

    .top {
        height: vh(128);
        padding: vh(32) vw(53) vh(0) vw(53);
        display: flex;
        justify-content: space-around;
        background-color: rgba(1, 38, 58, 0.39);

        .item {
            .item-num {
                width: vw(192);
                height: vh(56);
                background-image: url('@/assets/image/dfp/dataPick2/top2_1.png');
                background-size: 100% 100%;
                background-position: center center;
                font-size: vw(16);
                line-height: vh(56);
                text-align: center;
                font-family: 'dfpFont';
            }

            .item-txt {
                margin-top: vh(13);
                font-weight: 500;
                font-size: vw(12);
                color: #bcf0fe;
                text-align: center;
            }
        }

        .item:nth-child(1) {
            .item-num {
                color: #43ffee;
            }
        }

        .item:nth-child(2) {
            .item-num {
                color: #68f13e;
            }
        }

        .item:nth-child(3) {
            .item-num {
                color: #3396ff;
            }
        }
    }

    .content {
        width: 100%;
        height: vh(338);
        display: flex;
        justify-content: space-between;

        .content-1 {
            width: vw(469);

            // background-color: #3396ff;
            .header {
                width: 100%;
                height: vh(40);
                background-image: url('@/assets/image/dfp/dataPick2/top2_3.png');
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

            .body {
                height: vh(293);
                background-color: rgba(1, 38, 58, 0.39);
                margin-top: vh(7);

                .list {
                    height: vh(263);
                    padding: vh(15) vw(15);

                    .list-table {
                        height: 100%;

                        tr,
                        td {
                            border-color: rgba(188, 240, 254, 0.1);
                        }

                        tr {
                            td:nth-child(2) {
                                padding-left: vw(20);
                            }

                            td {
                                .item-line {
                                    display: flex;
                                    align-items: center;

                                    .item-line-name {
                                        font-weight: 500;
                                        font-size: vw(12);
                                        color: rgba(188, 240, 254, 1);
                                        width: vw(85);

                                        .num {
                                            color: #3396ff;
                                        }

                                        .index {
                                            color: rgba(104, 241, 62, 1);
                                        }
                                    }

                                    .item-line-num {
                                        font-family: 'dfpFont';
                                        font-size: vw(14);
                                        color: #fff;
                                        width: vw(125);
                                    }
                                }

                                .item-line:nth-child(1) {
                                    padding-bottom: vh(10);
                                }
                            }
                        }
                    }
                }
            }
        }

        .content-2 {
            width: vw(383);

            // background-color: #43ffee;
            .header {
                width: 100%;
                height: vh(40);
                background-image: url('@/assets/image/dfp/dataPick2/top2_4.png');
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

            .body {
                height: vh(293);
                background-color: rgba(1, 38, 58, 0.39);
                margin-top: vh(7);

                .body-select {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: vh(17) vw(22) 0 vw(22);
                }

                .body-chart {
                    height: vh(240);
                }
            }
        }

        .content-3 {
            width: 100%;

            // background-color: #43ffee;
            .header {
                width: 100%;
                height: vh(40);
                background-image: url('@/assets/image/dfp/dataPick2/top2_4.png');
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

            .body {
                height: vh(293);
                background-color: rgba(1, 38, 58, 0.39);
                margin-top: vh(7);

                .body-select {
                    display: flex;
                    // justify-content: space-between;
                    align-items: center;
                    padding: vh(17) vw(22) 0 vw(22);
                }

                .body-chart {
                    height: vh(240);
                }
            }
        }
    }
}
</style>
