<template>
    <div class="main-r1-2">
        <div class="header">
            <div class="txt">激光焊接机-{{ laserSelect.slice(-1) }}#</div>
        </div>
        <div class="body">
            <div class="top">
                <!-- <div class="left">
                    <div class="iconW"></div>
                    <div class="content">
                        <div class="title" @click="typeHandle(1)">
                            <div class="txt">功率</div>
                            <div class="active" v-if="type === 1"></div>
                        </div>
                        <div class="item">
                            <div class="txt">环形光斑功率</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rabp, 'W') }}</div>
                        </div>
                        <div class="item">
                            <div class="txt">激光功率</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rop, 'W') }}</div>
                        </div>
                    </div>
                </div> -->
                <div class="left">
                    <div class="iconA"></div>
                    <div class="content">
                        <div class="title" @click="typeHandle(1)">
                            <div class="txt">电流</div>
                            <div class="active" v-if="type === 1"></div>
                        </div>
                        <div class="item">
                            <div class="txt">实时电流百分比</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rcs, '%') }}</div>
                        </div>
                        <!-- <div class="item">
                            <div class="txt">激光功率</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rop, 'W') }}</div>
                        </div> -->
                    </div>
                </div>
                <div class="right">
                    <div class="icon"></div>
                    <div class="content">
                        <div class="title" @click="typeHandle(2)">
                            <div class="txt">温度</div>
                            <div class="active" v-if="type === 2"></div>
                        </div>
                        <!-- <div class="item">
                            <div class="txt">控制板温度</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rbt, '°C') }}</div>
                        </div> -->
                        <div class="item">
                            <div class="txt">内部温度</div>
                            <div class="num">{{ formatDisplayValue(weldLineData.rct, '°C') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="date">
                <el-date-picker type="date" v-model="date" placeholder="请选择日期" size="large" value-format="YYYY-MM-DD"
                    @change="getWeldLineChartData" />
            </div>
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, getCurrentInstance, watch, onBeforeUnmount } from 'vue'
import { fitChartSizeHN, debounce, formatDisplayValue } from '@/utils'
// import { getWeldLineData, getWeldLineChart } from '@/api/datapick'
const charts = ref(null)
const { proxy } = getCurrentInstance()
const resizeHandler = ref(null)
let chart = null
const weldLineData = ref({})
const weldLineChartData = ref({})
const type = ref(1)
const date = ref('')
const props = defineProps({
    laserSelect: {
        type: String,
        default: ''
    }
})

onMounted(() => {
    nextTick(() => {
        resizeHandler.value = debounce(() => {
            if (chart) {
                chart.resize()
                updateChartOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})
let timer = null
watch(
    () => props.laserSelect,
    () => {
        nextTick(() => {
            getWeldLine()
            getWeldLineChartData()
        })
        timer = setInterval(() => {
            nextTick(() => {
                getWeldLine()
                getWeldLineChartData()
            })
        }, 1000 * 60 * 5) // 每5分钟更新一次
    },
    {
        immediate: true,
        deep: true
    }
)
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
const typeHandle = (val) => {
    type.value = val
    getWeldLineChartData()
}
const getWeldLine = () => {
    weldLineData.value = {
        "rcs": 41,
        "rop": null,
        "rabp1": null,
        "rabp2": null,
        "rct": 25,
        "rbt": 0
    }
    // getWeldLineData({ deviceName: props.laserSelect }).then((res) => {
    //     if (res.code === 200) {
    //         weldLineData.value = res.data
    //     } else {
    //         weldLineData.value = {}
    //     }
    // })
}
const getWeldLineChartData = () => {
    let params = {
        deviceName: props.laserSelect,
        chartType: type.value === 1 ? '电流' : '温度',
        date: date.value
    }
    weldLineChartData.value = {
        xdata: ['09-11', '09-12', '09-13', '09-14', '09-15', '09-16', '09-17'],
        ydata: [
            {
                name: '实时电流百分比',
                data: [20, 15, 0, 7, 0, 12, 35]
            }
        ]
    }
    updateChartOptions()
    // getWeldLineChart(params)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             weldLineChartData.value = res.data
    //         } else {
    //             weldLineChartData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         updateChartOptions()
    //     })
}

const color = ['#22fffe', '#24c9ff', '#ff9407']
const areaColor = {
    0: ['rgba(34,255,254, 0.3)', 'rgba(34,255,254, 0)'],
    1: ['rgba(36,201,255, 0.3)', 'rgba(36,201,255, 0)']
}
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }
    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
const getChartOptions = () => {
    const chartData_ = validateChartData(weldLineChartData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    return {
        grid: {
            top: '15%',
            left: '15%',
            right: '0%',
            bottom: '15%'
        },
        legend: {
            top: 'top',
            width: '80%',
            textStyle: {
                color: '#bcf0fe',
                fontSize: fitChartSizeHN(34)
            },
            itemWidth: fitChartSizeHN(45),
            itemHeight: fitChartSizeHN(22)
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff'
                // fontSize: fitChartSizeHN(34)
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
                    fontSize: fitChartSizeHN(34),
                    fontWeight: 600
                }
            },
            data: xdata
        },

        yAxis: {
            name: type.value === 1 ? '单位:%' : '单位:°C',
            nameTextStyle: {
                color: '#BCF0FE',
                fontSize: fitChartSizeHN(34),
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
                    fontSize: fitChartSizeHN(34),
                    fontWeight: 600
                }
            }
        },
        series: [
            ...ydata.map((item, index) => {
                return {
                    name: item.name,
                    type: 'line',
                    data: item.data,
                    itemStyle: {
                        color: color[index]
                    },
                    lineStyle: {
                        width: fitChartSizeHN(1.5)
                    },
                    areaStyle: {
                        color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: areaColor[index][0]
                            },
                            {
                                offset: 1,
                                color: areaColor[index][1]
                            }
                        ])
                    }
                }
            })
        ]
    }
}
const initChart = () => {
    chart = proxy.$echarts.init(charts.value)
    const options = getChartOptions()
    chart.setOption(options)
}
const updateChartOptions = () => {
    if (chart) {
        const options = getChartOptions()
        chart.setOption(options, { notMerge: true })
    } else {
        initChart()
    }
}
</script>

<style lang="scss" scoped>
.main-r1-2 {
    width: vw_hn(1448);

    // background-color: #20dcf9;
    .header {
        width: vw_hn(1346);
        height: vh_vh(110);
        background-image: url('@/assets/image/huning/image/dataPick/left_4.png');
        background-size: 100% 100%;
        background-position: center center;
        margin-bottom: vh_vh(40);

        .txt {
            font-weight: 500;
            font-size: vw_hn(48);
            color: #ffffff;
            line-height: vh_vh(110);
            text-align: left;
            margin-left: vw_hn(110);
        }
    }

    .body {
        margin-top: vh_vh(0);
        width: vw_hn(1346);
        height: vh_vh(950);

        // background-color: #e2ebf1;
        .top {
            display: flex;
            justify-content: space-between;

            .left {
                display: flex;

                // align-items: center;
                .iconW {
                    width: vw_hn(56);
                    height: vh_vh(56);
                    background-image: url('@/assets/image/huning/image/dataPick/right_7.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    margin-right: vw_hn(30);
                }

                .iconA {
                    width: vw_hn(56);
                    height: vh_vh(56);
                    background-image: url('@/assets/image/huning/image/dataPick/right_11.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    margin-right: vw_hn(30);
                }

                .content {
                    .title {
                        font-weight: 400;
                        font-size: vw_hn(46);
                        color: #22fffe;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .active {
                            width: vw_hn(38);
                            height: vh_vh(34);
                            margin-left: vw_hn(20);
                            background-image: url('@/assets/image/huning/image/dataPick/right_9.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }

                    .item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: vw_hn(500);
                        height: vh_vh(80);

                        // margin-bottom: vh_vh(10);
                        .txt {
                            font-weight: 400;
                            font-size: vw_hn(34);
                            color: #f3ffff;
                        }

                        .num {
                            font-weight: 500;
                            font-size: vw_hn(44);
                            color: #20dcf9;
                        }
                    }
                }
            }

            .right {
                display: flex;

                // align-items: center;
                .icon {
                    width: vw_hn(56);
                    height: vh_vh(56);
                    background-image: url('@/assets/image/huning/image/dataPick/right_8.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    margin-right: vw_hn(30);
                }

                .content {
                    .title {
                        font-weight: 400;
                        font-size: vw_hn(46);
                        color: #22fffe;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .active {
                            width: vw_hn(38);
                            height: vh_vh(34);
                            margin-left: vw_hn(20);
                            background-image: url('@/assets/image/huning/image/dataPick/right_9.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }

                    .item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: vw_hn(500);
                        height: vh_vh(80);

                        // margin-bottom: vh_vh(10);
                        .txt {
                            font-weight: 400;
                            font-size: vw_hn(34);
                            color: #f3ffff;
                        }

                        .num {
                            font-weight: 500;
                            font-size: vw_hn(44);
                            color: #20dcf9;
                        }
                    }
                }
            }
        }

        .date {
            margin-top: vh_vh(120);

            :deep(.el-date-editor.el-input) {
                width: vw_hn(625);
                height: vh_vh(72);
                background-image: url('@/assets/image/huning/image/dataPick/right_13.png');
                background-size: 100% 100%;
                background-position: center center;

                .el-input__wrapper {
                    background-color: transparent;
                }

                .el-input__inner {
                    font-size: vw_hn(36);
                    height: vh_vh(72);
                    line-height: vh_vh(72);
                    color: #e2ebf1;
                }
            }
        }

        .charts {
            margin-top: vh_vh(40);
            width: vw_hn(1346);
            height: vh_vh(600);
            // background-color: #e2ebf1;
        }
    }
}
</style>
