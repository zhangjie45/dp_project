<template>
    <div class="main-r2-2">
        <div class="header">
            <div class="txt">旋压机-{{ dataNameMap[spinningSelect] }}#</div>
        </div>
        <div class="body">
            <div class="top">
                <div class="block">
                    <div class="left">
                        <div class="icon i1"></div>
                        <div class="content">
                            <div class="title" @click="selectTypeHandle('电压')">
                                <div class="txt">电压</div>
                                <div class="active" v-if="selectType === '电压'"></div>
                            </div>
                            <div class="item">
                                <div class="txt">电压</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.ua, 'V') }}</div>
                            </div>
                            <!-- <div class="item">
                                <div class="txt">B相电压</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.ub, 'V') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">C相电压</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.uc, 'V') }}</div>
                            </div> -->
                        </div>
                    </div>
                    <div class="right">
                        <div class="icon i2"></div>
                        <div class="content">
                            <div class="title" @click="selectTypeHandle('电流')">
                                <div class="txt">电流</div>
                                <div class="active" v-if="selectType === '电流'"></div>
                            </div>
                            <div class="item">
                                <div class="txt">电流</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.ia, 'A') }}</div>
                            </div>
                            <!-- <div class="item">
                                <div class="txt">B相电流</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.ib, 'A') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">C相电流</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.ic, 'A') }}</div>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        <div class="icon"></div>
                        <div class="content">
                            <div class="title" @click="selectTypeHandle('有功功率')">
                                <div class="txt">有功功率</div>
                                <div class="active" v-if="selectType === '有功功率'"></div>
                            </div>
                            <!-- <div class="item">
                                <div class="txt">A相有功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.pa, 'W') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">B相有功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.pb, 'W') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">C相有功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.pc, 'W') }}</div>
                            </div> -->
                            <div class="item">
                                <div class="txt">总有功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.p, 'W') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="icon i3"></div>
                        <div class="content">
                            <div class="title" @click="selectTypeHandle('无功功率')">
                                <div class="txt">无功功率</div>
                                <div class="active" v-if="selectType === '无功功率'"></div>
                            </div>
                            <!-- <div class="item">
                                <div class="txt">A相无功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.qa, 'W') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">B相无功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.qb, 'W') }}</div>
                            </div> -->
                            <!-- <div class="item">
                                <div class="txt">C相无功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.qc, 'W') }}</div>
                            </div> -->
                            <div class="item">
                                <div class="txt">总无功功率</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.q, 'W') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="left">
                        <div class="icon i4"></div>
                        <div class="content">
                            <div class="title" @click="selectTypeHandle('油箱温度')">
                                <div class="txt">油箱温度</div>
                                <div class="active" v-if="selectType === '油箱温度'"></div>
                            </div>
                            <div class="item">
                                <div class="txt">油箱温度</div>
                                <div class="num">{{ formatDisplayValue(spinLineData.temp, '°C') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="right"></div>
                </div>
            </div>
            <div class="date">
                <el-date-picker type="date" v-model="date" value-format="YYYY-MM-DD" placeholder="请选择日期" size="large"
                    popper-class="right2-2-date" @change="getChartData" />
            </div>
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, getCurrentInstance, defineProps, watch, onBeforeUnmount } from 'vue'
import { fitChartSizeHN, debounce, formatDisplayValue } from '@/utils'
// import { getSpinLineData, getSpinLineChart } from '@/api/datapick'
const charts = ref(null)
const { proxy } = getCurrentInstance()
const resizeHandler = ref(null)
let chart = null

const date = ref('')
const spinLineData = ref({})
const spinLineChartData = ref({})
const selectType = ref('电压')

const props = defineProps({
    spinningSelect: {
        type: String,
        default: ''
    }
})
let timer = null

const dataNameMap = {
    // Spinning7: '14',
    // Spinning5: '11',
    // Spinning6: '12',
    // Spinning3: '10',
    // Spinning4: '13',
    // Spinning1: '8',
    // Spinning2: '9'
    Spinning7: '7',
    Spinning5: '5',
    Spinning6: '6',
    Spinning3: '3',
    Spinning4: '4',
    Spinning1: '1',
    Spinning2: '2'
}

watch(
    () => props.spinningSelect,
    () => {
        nextTick(() => {
            getInfoData()
            getChartData()
        })
        timer = setInterval(() => {
            nextTick(() => {
                getInfoData()
                getChartData()
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

const selectTypeHandle = (val) => {
    selectType.value = val
    getChartData()
}

const getInfoData = () => {
    spinLineData.value = {
        ua: 100,
        ub: 12,
        uc: 89,
        ia: 44,
        ib: 48,
        ic: 210,
        pa: 120,
        pb: 2999,
        pc: 235,
        p: 4500,
        qa: 89,
        qb: 3500,
        qc: 1200,
        q: 350,
        wd: 200
    }
    // getSpinLineData({ deviceName: props.spinningSelect }).then((res) => {
    //     if (res.code === 200) {
    //         spinLineData.value = res.data
    //     } else {
    //         spinLineData.value = {}
    //     }
    // })
}

const getChartData = () => {
    let params = {
        deviceName: props.spinningSelect,
        chartType: selectType.value,
        date: date.value
    }
    spinLineChartData.value = {
        xdata: ['09-11', '09-12', '09-13', '09-14', '09-15', '09-16', '09-17'],
        ydata: [
            {
                name: 'a相电压',
                data: [68, 164, 164, 0, 0, 156, 168]
            },
            {
                name: 'b相电压',
                data: [163, 156, 0, 0, 156, 116, 92]
            },
            {
                name: 'c相电压',
                data: [126, 132, 119, 0, 135, 115, 69]
            }
        ]
    }
    updateChartOptions()
    // getSpinLineChart(params)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             spinLineChartData.value = res.data
    //         } else {
    //             spinLineChartData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         updateChartOptions()
    //     })
}
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }
    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
const color = ['#22fffe', '#24c9ff', '#ff9407', '#ffdf07']
const areaColor = {
    0: ['rgba(34,255,254, 0.3)', 'rgba(34,255,254, 0)'],
    1: ['rgba(36,201,255, 0.3)', 'rgba(36,201,255, 0)'],
    2: ['rgba(255,148,7, 0.3)', 'rgba(255,148,7, 0)'],
    3: ['rgba(255, 223, 7, 0.3)', 'rgba(255, 223, 7, 0)']
}
const getChartOptions = () => {
    const chartData_ = validateChartData(spinLineChartData.value)
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
            width: '60%',
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
            name: selectType.value === '电压' ? '单位:V' : selectType.value === '电流' ? '单位:A' : selectType.value === '有功功率' || selectType.value === '无功功率' ? '单位:W' : '单位:°C',
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
                    data: item.data,
                    type: 'line',
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
.main-r2-2 {
    margin-top: vh_vh(50);
    width: vw_hn(1348);

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
        width: vw_hn(1346);
        height: vh_vh(1620);

        // background-color: #e2ebf1;
        .top {
            .block {
                display: flex;
                justify-content: space-between;
                margin-bottom: vh_vh(30);

                .left {
                    display: flex;

                    // align-items: center;
                    .icon {
                        width: vw_hn(56);
                        height: vh_vh(56);
                        background-image: url('@/assets/image/huning/image/dataPick/right_7.png');
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
                            margin-top: vh_vh(40);
                            width: vw_hn(500);
                            height: vh_vh(70);

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
                            margin-top: vh_vh(40);
                            height: vh_vh(70);

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

                .i1 {
                    background-image: url('@/assets/image/huning/image/dataPick/right_10.png') !important;
                    background-size: 100% 100%;
                    background-position: center center;
                }

                .i2 {
                    background-image: url('@/assets/image/huning/image/dataPick/right_11.png') !important;
                    background-size: 100% 100%;
                    background-position: center center;
                }

                .i3 {
                    background-image: url('@/assets/image/huning/image/dataPick/right_7.png') !important;
                    background-size: 100% 100%;
                    background-position: center center;
                }

                .i4 {
                    background-image: url('@/assets/image/huning/image/dataPick/right_8.png') !important;
                    background-size: 100% 100%;
                    background-position: center center;
                }
            }

            .block:nth-child(1) {
                margin-bottom: vh_vh(150);
            }

            .block:nth-child(2) {
                margin-bottom: vh_vh(190);
            }

            .block:nth-child(3) {
                // margin-top: vh_vh(270);
            }
        }

        .date {
            margin-top: vh_vh(40);

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
            height: vh_vh(700);
            // background-color: #e2ebf1;
        }
    }
}
</style>
