<template>
    <div class="main">
        <div class="header">
            <div class="header-title">生产概览</div>
        </div>
        <div class="body">
            <div class="list">
                <div class="list-item">
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">产量曲线图</div>
                        </div>
                        <div class="title-select">
                            <div class="select-item" :class="selectDate === 1 ? 'active' : ''"
                                @click="selectDateHandle(1)">周</div>
                            <div class="select-item" :class="selectDate === 2 ? 'active' : ''"
                                @click="selectDateHandle(2)">月</div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <CustomSelect v-model="selectedType" :options="typeOptions" />
                        <div class="echarts1" ref="echart1"></div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">销售订单状态占 &nbsp;&nbsp;比</div>
                        </div>
                        <div class="title-select">
                            <!-- <div class="select-item">周</div>
                            <div class="select-item">月</div> -->
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <!-- <div class="legend">
                            <div class="legend-item">
                                <div class="legend-item-color"></div>
                                <div class="legend-item-txt">新订单:</div>
                                <div class="legend-item-num">35%</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-item-color"></div>
                                <div class="legend-item-txt">进行中</div>
                                <div class="legend-item-num">35%</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-item-color"></div>
                                <div class="legend-item-txt">已发货</div>
                                <div class="legend-item-num">35%</div>
                            </div>
                            <div class="legend-item">
                                <div class="legend-item-color"></div>
                                <div class="legend-item-txt">其他</div>
                                <div class="legend-item-num">35%</div>
                            </div>
                        </div> -->
                        <div class="echarts2" ref="echart2"></div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">销售订单概览</div>
                            <el-tooltip content="<div style='font-size:36px;padding:20px'>展示前100条数据</div>"
                                :raw-content="true" placement="top" effect="dark">
                                <div class="info"></div>
                            </el-tooltip>
                        </div>
                        <div class="title-select">
                            <!-- <div class="select-item">日</div>
                            <div class="select-item">周</div>
                            <div class="select-item">月</div> -->
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="scroll">
                            <div class="list_head">
                                <div class="list_head_item">产品编号</div>
                                <div class="list_head_item">客户名称</div>
                                <div class="list_head_item">创建时间</div>
                                <div class="list_head_item">完成时间</div>
                                <div class="list_head_item">状态</div>
                            </div>
                            <div class="list_body">
                                <div class="list_body_" ref="scrolldiv">
                                    <div class="list_body_item" v-for="(item, index) in salesOrderData">
                                        <el-tooltip :content="item.productNo" placement="top" effect="dark">
                                            <div class="list_body_item_">{{ item.productNo }}</div>
                                        </el-tooltip>
                                        <el-tooltip :content="item.customerName" placement="top" effect="dark">
                                            <div class="list_body_item_">{{ item.customerName }}</div>
                                        </el-tooltip>
                                        <div class="list_body_item_">{{ item.createDate }}</div>
                                        <div class="list_body_item_">{{ item.finishDate }}</div>
                                        <div class="list_body_item_" :class="getStatusClass(item.orderDetailStatus)">{{
                                            item.orderDetailStatus }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">本周生产周期</div>
                        </div>
                        <div class="title-num">
                            <div class="icon"></div>
                            <div class="title-num-list">
                                <div class="txt">柱塞周期</div>
                                <div class="num">{{ formatDisplayValue(productionCycleData.spinningProcess, 'h') }}
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <div class="txt">油缸周期</div>
                                <div class="num">{{ formatDisplayValue(productionCycleData.oilBoxProcess, 'h') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="ranking1">
                            <div class="ranking-title">每道工序用时排名</div>
                            <div class="ranking-content">
                                <div class="ranking-list" ref="rankingdiv1">
                                    <div class="item" v-for="(value, index) in productionCycleData.processPeriodList">
                                        <div class="item-index">No.{{ index + 1 }}</div>
                                        <div class="item-name">{{ value.processName }}</div>
                                        <el-progress :percentage="value.rate" :show-text="false" :stroke-width="12"
                                            color="#20DCF9" />
                                        <div class="item-time">
                                            <span style="color: #21e3ff">{{ value.processData }}</span>h
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="header">
                        <div class="txt">设备概览</div>
                    </div>
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">点检保养任务概览</div>
                            <el-tooltip content="<div style='font-size:36px;padding:20px'>展示前100条数据</div>"
                                :raw-content="true" placement="top" effect="dark">
                                <div class="info"></div>
                            </el-tooltip>
                        </div>
                        <div class="title-num">
                            <div class="icon"></div>
                            <div class="txt">设备平均维修时长</div>
                            <div class="num3">{{ formatDisplayValue(deviceOverviewData.avgRepairTime) }}</div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="scroll2">
                            <div class="list_head">
                                <div class="list_head_item">任务编码</div>
                                <div class="list_head_item">任务名称</div>
                                <div class="list_head_item">任务类型</div>
                                <div class="list_head_item">任务时间</div>
                                <div class="list_head_item">负责人</div>
                                <div class="list_head_item">完成时间</div>
                                <div class="list_head_item">状态</div>
                            </div>
                            <div class="list_body">
                                <div class="list_body_" ref="scrolldiv2">
                                    <div class="list_body_item" v-for="(item, index) in deviceOverviewData.itemList">
                                        <el-tooltip :content="item.taskCode" placement="top" effect="dark">
                                            <div class="list_body_item_">{{ item.taskCode }}</div>
                                        </el-tooltip>
                                        <el-tooltip :content="item.planName" placement="top" effect="dark">
                                            <div class="list_body_item_">{{ item.planName }}</div>
                                        </el-tooltip>
                                        <div class="list_body_item_">{{ item.planType === '0' ? '设备点检' : '设备保养' }}</div>
                                        <div class="list_body_item_">{{ item.taskTime }}</div>
                                        <div class="list_body_item_">{{ item.responsiblePersonName }}</div>
                                        <div class="list_body_item_">{{ item.completionTime }}</div>
                                        <div class="list_body_item_" :class="item.status === '0' ? 'off' : 'on'">{{
                                            item.status === '0' ? '未完成' : '已完成' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="header">
                        <div class="txt">质量概览</div>
                    </div>
                    <div class="title">
                        <div class="title-txt">
                            <div class="icon"></div>
                            <div class="txt">本周质检详情</div>
                        </div>
                        <div class="title-num">
                            <div class="icon2"></div>
                            <div class="title-quality-list">
                                <div class="txt-quality">整体报废率</div>
                                <div class="num2 mr_30">{{ qualityDetailData.totalProcess }}%</div>
                                <div class="txt-quality">柱塞</div>
                                <div class="num2 mr_30">{{ qualityDetailData.spinningProcess }}%</div>
                                <div class="txt-quality">油缸</div>
                                <div class="num2">{{ qualityDetailData.oilBoxProcess }}%</div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="content">
                        <div class="ranking2">
                            <div class="ranking-title">每道工序质检报废率排名</div>
                            <div class="ranking-content">
                                <div class="ranking-list" ref="rankingdiv2">
                                    <div class="item" v-for="(value, index) in qualityDetailData.processPeriodList">
                                        <div class="item-index">No.{{ index + 1 }}</div>
                                        <div class="item-name">{{ value.processName }}</div>
                                        <el-progress :percentage="value.rate" :show-text="false" :stroke-width="12"
                                            color="#20DCF9" />
                                        <div class="item-time">
                                            <span style="color: #21e3ff">{{ value.processData }}</span>%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, watch, onBeforeUnmount } from 'vue'
import CustomSelect from '@/components/select/select.vue'
import { nextTick, onMounted, ref } from 'vue'
import { formatDisplayValue, fitChartSizeHN, debounce } from '@/utils'
// import { getSalesOrderOverview, getThisWeekProductionCycle, getQualityDetail, getProductionLine, getSalesOrderRate, getDeviceOverview } from '@/api/datapick'
const { proxy } = getCurrentInstance()

const selectDate = ref(1)
const selectedType = ref(0)
const typeOptions = ref([
    {
        label: '成品',
        value: 0
    },
    {
        label: '柱塞',
        value: 1
    },
    {
        label: '油缸',
        value: 2
    }
])
const resizeHandler = ref(null)

let chart1 = null
const echart1 = ref(null)
let chart2 = null
const echart2 = ref(null)

let salesOrderData = ref([]) //销售订单概览数据
let productionCycleData = ref({}) //本周生产周期数据
let qualityDetailData = ref({}) //质量详情数据
let productionLineData = ref({}) //产量数据
let salesOrderRateData = ref([]) //销售订单完成率数据
let deviceOverviewData = ref({}) //点检保养任务概览数据

let timer = null

onMounted(() => {
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 60 * 5) // 每5分钟更新一次
    nextTick(() => {
        resizeHandler.value = debounce(() => {
            if (chart1) {
                chart1.resize()
                updateChart1Options()
            }
            if (chart2) {
                chart2.resize()
                updateChart2Options()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
import { salesOrderDataJson, productionCycleDataJson, qualityDetailDataJson, salesOrderRateDataJson, deviceOverviewDataJson, productionLineDataJson } from '../data.js'
const getData = () => {
    // 销售订单概览
    salesOrderData.value = salesOrderDataJson
    nextTick(() => {
        autoScroll()
    })
    // getSalesOrderOverview()
    //     .then((res) => {
    //         if (res.code === 200) {
    //             salesOrderData.value = res.data
    //         } else {
    //             salesOrderData.value = []
    //         }
    //     })
    //     .finally(() => {
    //         nextTick(() => {
    //             autoScroll()
    //         })
    //     })

    //本周生产周期
    productionCycleData.value = productionCycleDataJson
    nextTick(() => {
        autoRanking1()
    })
    // getThisWeekProductionCycle()
    //     .then((res) => {
    //         if (res.code === 200) {
    //             productionCycleData.value = res.data
    //         } else {
    //             productionCycleData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         nextTick(() => {
    //             autoRanking1()
    //         })
    //     })

    //本周质检详情
    qualityDetailData.value = qualityDetailDataJson
    autoRanking2()
    // getQualityDetail()
    //     .then((res) => {
    //         if (res.code === 200) {
    //             qualityDetailData.value = res.data
    //         } else {
    //             qualityDetailData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         nextTick(() => {
    //             autoRanking2()
    //         })
    //     })

    //销售订单状态占比
    salesOrderRateData.value = salesOrderRateDataJson
    updateChart2Options()
    // getSalesOrderRate()
    //     .then((res) => {
    //         if (res.code === 200) {
    //             salesOrderRateData.value = res.data
    //         } else {
    //             salesOrderRateData.value = []
    //         }
    //     })
    //     .finally(() => {
    //         nextTick(() => {
    //             updateChart2Options()
    //         })
    //     })

    //点检保养任务概览
    deviceOverviewData.value = deviceOverviewDataJson
    autoScroll2()
    // getDeviceOverview()
    //     .then((res) => {
    //         if (res.code === 200) {
    //             deviceOverviewData.value = res.data
    //         } else {
    //             deviceOverviewData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         autoScroll2()
    //     })
    getProductionLineData()
}
//产量曲线图

watch(
    () => selectedType.value,
    (val) => {
        getProductionLineData()
    }
)
const selectDateHandle = (val) => {
    selectDate.value = val
    getProductionLineData()
}

const getProductionLineData = () => {
    let params = {
        queryType: selectDate.value,
        sectionType: selectedType.value
    }
    productionLineData.value = productionLineDataJson
    updateChart1Options()
    // getProductionLine(params)
    //     .then((res) => {
    //         if (res.code === 200) {
    //             productionLineData.value = res.data
    //         } else {
    //             productionLineData.value = {}
    //         }
    //     })
    //     .finally(() => {
    //         updateChart1Options()
    //     })
}

const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }
    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
const color = ['#22fffe', '#24c9ff', '#ff9407']
const getChart1Options = () => {
    const chartData_ = validateChartData(productionLineData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    console.log('ydata', ydata)

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
                //     fontSize: fitChartSizeHN(34)
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
            name: '单位:台',
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
            {
                name: '实际产量',
                data: ydata.find((item) => item.name === '实际产量')?.data || [],
                type: 'line',
                itemStyle: {
                    color: color[0]
                },
                lineStyle: {
                    width: fitChartSizeHN(1.5)
                },
                areaStyle: {
                    color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(34,255,254, 0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(34,255,254, 0)'
                        }
                    ])
                }
            },
            {
                name: '计划产量',
                data: ydata.find((item) => item.name === '计划产量')?.data || [],
                type: 'line',
                itemStyle: {
                    color: color[1]
                },
                lineStyle: {
                    width: fitChartSizeHN(1.5)
                },
                areaStyle: {
                    color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(36,201,255, 0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(36,201,255, 0)'
                        }
                    ])
                }
            },
            {
                name: '入库量',
                data: ydata.find((item) => item.name === '入库量')?.data || [],
                type: 'line',
                itemStyle: {
                    color: color[2]
                },
                lineStyle: {
                    width: fitChartSizeHN(1.5)
                },
                areaStyle: {
                    color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(255,148,7, 0.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,148,7, 0)'
                        }
                    ])
                }
            }
        ]
    }
}
const initChart1 = () => {
    console.log('initChart1')

    chart1 = proxy.$echarts.init(echart1.value)
    const options = getChart1Options()
    chart1.setOption(options)
}

const updateChart1Options = () => {
    if (chart1) {
        const options = getChart1Options()
        chart1.setOption(options, { notMerge: true })
    } else {
        initChart1()
    }
}

//销售订单状态占比
const getChart2Options = () => {
    // const chartData_ = validateChartData(topData.value)
    // const ydata = chartData_.ydata
    // const xdata = chartData_.xdata
    // 定义颜色映射
    const colorMap = ['#0db896', '#ff9407', '#ffdf07', '#BBBBBB']
    const nameMap = ['新订单', '部分排产', '已排产', '已生产', '部分发货', '已发货', '已取消', '已暂停']
    let data = []
    salesOrderRateData.value.map((item, index) => {
        data.push({
            value: item,
            name: nameMap[index]
            // itemStyle: {
            //     color: colorMap[index]
            // }
        })
    })

    return {
        title: {
            text: '订单状态',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSizeHN(42)
            },
            left: '57.5%',
            bottom: '45%'
        },
        tooltip: {
            backgroundColor: '#01263a',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            orient: 'vertical',
            left: 10,
            top: '5%',
            bottom: 10,
            textStyle: {
                color: 'inherit',
                fontSize: fitChartSizeHN(34)
            },
            itemWidth: fitChartSizeHN(34),
            itemHeight: fitChartSizeHN(22),
            formatter: (params) => {
                return params + ':' + data.find((item) => item.name === params)?.value + '%'
            }
        },

        grid: {
            left: '5%',
            right: '5%',
            top: '50%',
            bottom: '10%'
        },
        series: [
            {
                // name: '订单状态',
                type: 'pie',
                radius: ['55%', '60%'],
                center: ['65%', '50%'], // 将圆心X坐标从默认50%调整到30%
                // minAngle: 5, // 最小的扇形角度，小于该值的扇形将被忽略显示
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{d|{d}%}\n  {b|{b}}',
                    rich: {
                        d: {
                            color: 'inherit',
                            fontSize: fitChartSizeHN(38)
                        },
                        b: {
                            color: '#fff',
                            fontSize: fitChartSizeHN(38)
                        }
                    }
                },

                labelLine: {
                    showAbove: true,
                    length: fitChartSizeHN(15),
                    length2: fitChartSizeHN(15)
                },

                data: data
            },
            {
                // name: '大环',
                type: 'gauge',
                splitNumber: 15,
                radius: '88%',
                center: ['65%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: [[1, '#1f59a7']]
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    length: fitChartSizeHN(32),
                    lineStyle: {
                        color: 'auto',
                        width: fitChartSizeHN(3.5)
                    }
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                }
            },
            {
                // name: '小环',
                type: 'gauge',
                splitNumber: 15,
                radius: '85%',
                center: ['65%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#1f59a7',
                        width: fitChartSizeHN(3)
                    },
                    length: fitChartSizeHN(20),
                    splitNumber: 5
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                }
            }
        ]
    }
}

const initChart2 = () => {
    chart2 = proxy.$echarts.init(echart2.value)
    const options = getChart2Options()
    chart2.setOption(options)
}
const updateChart2Options = () => {
    if (chart2) {
        const options = getChart2Options()
        chart2.setOption(options, { notMerge: true })
    } else {
        initChart2()
    }
}

//销售订单概览
let scrolldiv = ref()
const getStatusClass = (status) => {
    switch (status) {
        case '新订单':
            return 'status1'
        case '部分排产':
            return 'status2'
        case '已排产':
            return 'status3'
        case '已生产':
            return 'status4'
        case '部分发货':
            return 'status5'
        case '已发货':
            return 'status6'
        case '已取消':
            return 'status7'
        case '已暂停':
            return 'status8'
        default:
            return ''
    }
}
const autoScroll = () => {
    nextTick(() => {
        let length = salesOrderData.value.length
        if (length > 6) {
            // 根据数据长度设置滚动速度
            scrolldiv.value.style.animationDuration = length * 1.5 + 's'
        } else {
            scrolldiv.value.style.animationDuration = 0 + 's'
        }
    })
}

//本周生产周期

let rankingdiv1 = ref()
const autoRanking1 = () => {
    nextTick(() => {
        let length = productionCycleData.value.processPeriodList?.length || 0
        if (length > 10) {
            // 根据数据长度设置滚动速度
            rankingdiv1.value.style.animationDuration = length * 1.5 + 's'
        } else {
            rankingdiv1.value.style.animationDuration = 0 + 's'
        }
    })
}

//点检保养任务概览
let scrolldiv2 = ref()
const autoScroll2 = () => {
    nextTick(() => {
        let length = deviceOverviewData.value.itemList?.length || 0
        if (length > 6) {
            // 根据数据长度设置滚动速度
            scrolldiv2.value.style.animationDuration = length * 1.5 + 's'
        } else {
            scrolldiv2.value.style.animationDuration = 0 + 's'
        }
    })
}
//本周质检详情
let rankingdiv2 = ref()
const autoRanking2 = () => {
    nextTick(() => {
        let length = qualityDetailData.value.processPeriodList?.length || 0
        if (length > 10) {
            // 根据数据长度设置滚动速度
            rankingdiv2.value.style.animationDuration = length * 1.5 + 's'
        } else {
            rankingdiv2.value.style.animationDuration = 0 + 's'
        }
    })
}
</script>

<style lang="scss" scoped>
.main {
    // height: vw_hn(2792);
    width: 100%;

    .header {
        width: vw_hn(2792);
        height: vh_vh(110);
        background-image: url('@/assets/image/huning/image/dataPick/left_1.png');
        background-size: 100% 100%;
        background-position: center center;

        .header-title {
            font-weight: 500;
            font-size: vw_hn(48);
            color: #ffffff;
            line-height: vh_vh(110);
            text-align: left;
            margin-left: vw_hn(110);
        }
    }

    .body {
        width: vw_hn(2792);

        .list {
            display: flex;
            justify-content: space-between;

            .list-item {
                margin-top: vh_vh(40);
                width: vw_hn(1346);

                .header {
                    width: vw_hn(1346);
                    height: vh_vh(110);
                    background-image: url('@/assets/image/huning/image/dataPick/left_4.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    margin-bottom: vh_vh(20);

                    .txt {
                        font-weight: 500;
                        font-size: vw_hn(48);
                        color: #ffffff;
                        line-height: vh_vh(110);
                        text-align: left;
                        margin-left: vw_hn(110);
                    }
                }

                .title {
                    display: flex;
                    justify-content: space-between;

                    .title-txt {
                        display: flex;
                        align-items: center;

                        .icon {
                            width: vw_hn(27);
                            height: vw_hn(57);
                            background-image: url('@/assets/image/huning/image/dataPick/left_2.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            margin-left: vw_hn(30);
                            font-weight: 400;
                            font-size: vw_hn(46);
                            color: #e2ebf1;
                        }

                        .info {
                            width: vw_hn(46);
                            height: vw_hn(46);
                            background-image: url('@/assets/image/huning/image/dataPick/left_8.png');
                            background-size: 100% 100%;
                            background-position: center center;
                            margin-left: vw_hn(20);
                            margin-top: vh_vh(10);
                            cursor: pointer;
                        }

                        .info:hover {
                            background-image: url('@/assets/image/huning/image/dataPick/left_9.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }

                    .title-select {
                        display: flex;
                        height: vh_vh(87);

                        .select-item {
                            width: vw_hn(133);
                            height: vh_vh(71);
                            background-color: #062036;
                            border: 1px solid #1f99c7;
                            font-weight: 400;
                            font-size: vw_hn(36);
                            color: #1d9dce;
                            line-height: vh_vh(71);
                            text-align: center;
                            margin-left: vw_hn(20);
                            cursor: pointer;
                        }

                        .active {
                            background-color: #09334c;
                            border: 1px solid #24c9ff;
                            color: #e2ebf1;
                        }
                    }

                    .title-num {
                        display: flex;
                        line-height: vh_vh(87);

                        .icon {
                            width: vw_hn(88);
                            height: vh_vh(87);
                            background-image: url('@/assets/image/huning/image/dataPick/left_6.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-size: vw_hn(34);
                            color: #24c9ff;
                            text-align: left;
                            padding-left: vw_hn(20);
                            width: vw_hn(332);
                        }

                        .num {
                            font-family: 'huningFont';
                            font-weight: normal;
                            font-size: vw_hn(48);
                            color: #22fffe;
                        }

                        .icon2 {
                            width: vw_hn(88);
                            height: vh_vh(87);
                            background-image: url('@/assets/image/huning/image/dataPick/left_7.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .num2 {
                            font-family: 'huningFont';
                            font-weight: normal;
                            font-size: vw_hn(40);
                            color: #ffdf07;
                        }

                        .num3 {
                            font-family: 'huningFont';
                            font-weight: normal;
                            font-size: vw_hn(40);
                            color: #22fffe;
                        }

                        .title-num-list {
                            display: flex;

                            .txt {
                                width: vw_hn(150);
                            }
                        }

                        .title-quality-list {
                            display: flex;

                            .txt-quality {
                                font-size: vw_hn(34);
                                color: #24c9ff;
                                text-align: left;
                                padding-left: vw_hn(10);
                                padding-right: vw_hn(10);
                            }

                            .mr_30 {
                                margin-right: vw_hn(20);
                            }
                        }
                    }
                }

                .line {
                    margin-top: vh_vh(20);
                    margin-bottom: vh_vh(20);
                    width: vw_hn(1346);
                    height: vh_vh(3);
                    background-image: url('@/assets/image/huning/image/dataPick/left_3.png');
                    background-size: 100% 100%;
                    background-position: center center;
                }

                .content {
                    height: vh_vh(720);

                    // background-color: #e2ebf1;
                    .echarts1 {
                        margin-top: vh_vh(40);
                        width: vw_hn(1346);
                        height: vh_vh(500);
                    }

                    // .legend {
                    //     display: inline-block;
                    //     vertical-align: top;
                    //     width: vw_hn(300);
                    //     margin-top: 30%;
                    //     .legend-item {
                    //         font-weight: 400;
                    //         font-size: vw_hn(34);
                    //         color: #ffffff;
                    //         display: flex;
                    //         align-items: center;
                    //         margin-bottom: vh_vh(20);
                    //         .legend-item-txt {
                    //             margin: 0 vw_hn(10);
                    //         }
                    //     }
                    //     .legend-item:nth-child(1) {
                    //         .legend-item-color {
                    //             background: #0db896;
                    //             width: vw_hn(33);
                    //             height: vh_vh(24);
                    //         }
                    //         .legend-item-num {
                    //             color: #0db896;
                    //         }
                    //     }
                    //     .legend-item:nth-child(2) {
                    //         .legend-item-color {
                    //             background: #ff9407;
                    //             width: vw_hn(33);
                    //             height: vh_vh(24);
                    //         }
                    //         .legend-item-num {
                    //             color: #ff9407;
                    //         }
                    //     }
                    //     .legend-item:nth-child(3) {
                    //         .legend-item-color {
                    //             background: #ffdf07;
                    //             width: vw_hn(33);
                    //             height: vh_vh(24);
                    //         }
                    //         .legend-item-num {
                    //             color: #ffdf07;
                    //         }
                    //     }
                    //     .legend-item:nth-child(4) {
                    //         .legend-item-color {
                    //             background: #bbbbbb;
                    //             width: vw_hn(33);
                    //             height: vh_vh(24);
                    //         }
                    //         .legend-item-num {
                    //             color: #bbbbbb;
                    //         }
                    //     }
                    // }
                    .echarts2 {
                        // display: inline-block;
                        margin-top: vh_vh(40);
                        width: vw_hn(1346);
                        height: vh_vh(620);
                    }

                    .scroll {
                        height: vh_vh(740);
                        overflow: hidden;

                        .list_head {
                            display: flex;
                            margin-bottom: vh_vh(20);

                            .list_head_item {
                                font-weight: 400;
                                font-size: vw_hn(34);
                                color: #21e3ff;
                                text-align: left;
                                padding-left: vw_hn(40);
                            }

                            .list_head_item:nth-child(1) {
                                width: vw_hn(300);
                            }

                            .list_head_item:nth-child(2) {
                                width: vw_hn(280);
                            }

                            .list_head_item:nth-child(3) {
                                width: vw_hn(200);
                            }

                            .list_head_item:nth-child(4) {
                                width: vw_hn(200);
                            }

                            .list_head_item:nth-child(5) {
                                width: vw_hn(120);
                            }
                        }

                        .list_body {
                            // height: vh_vh(760);
                            // background-color: #1d9dce;
                            overflow: hidden;

                            &:hover {
                                .list_body_ {
                                    animation-play-state: paused;
                                }
                            }

                            .list_body_ {
                                margin-top: vh_vh(30);
                                animation: scroll linear infinite;

                                .list_body_item {
                                    width: vw_hn(1346);
                                    display: flex;
                                    height: vh_vh(96);
                                    line-height: vh_vh(96);
                                    background-image: url('@/assets/image/huning/image/dataPick/left_5.png');
                                    background-size: 100% 100%;
                                    background-position: center center;
                                    margin-bottom: vh_vh(10);

                                    .list_body_item_ {
                                        padding-left: vw_hn(40);
                                        line-height: vh_vh(96);
                                        font-size: vw_hn(34);
                                        color: #ccdcde;
                                        text-align: left;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }

                                    .list_body_item_:nth-child(1) {
                                        width: vw_hn(300);
                                    }

                                    .list_body_item_:nth-child(2) {
                                        width: vw_hn(280);
                                    }

                                    .list_body_item_:nth-child(3) {
                                        width: vw_hn(200);
                                    }

                                    .list_body_item_:nth-child(4) {
                                        width: vw_hn(200);
                                    }

                                    .list_body_item_:nth-child(5) {
                                        width: vw_hn(120);
                                    }

                                    .status1 {
                                        color: #5470c6;
                                    }

                                    .status2 {
                                        color: #91cc75;
                                    }

                                    .status3 {
                                        color: #fac858;
                                    }

                                    .status4 {
                                        color: #ee6666;
                                    }

                                    .status5 {
                                        color: #73c0de;
                                    }

                                    .status6 {
                                        color: #3ba272;
                                    }

                                    .status7 {
                                        color: #fc8452;
                                    }

                                    .status8 {
                                        color: #9a60b4;
                                    }
                                }
                            }
                        }
                    }

                    .scroll2 {
                        height: vh_vh(700);
                        overflow: hidden;

                        .list_head {
                            display: flex;
                            margin-bottom: vh_vh(20);

                            .list_head_item {
                                font-weight: 400;
                                font-size: vw_hn(34);
                                color: #21e3ff;
                                text-align: left;
                                margin-left: vw_hn(40);
                                // flex: 1;
                            }

                            .list_head_item:nth-child(1) {
                                width: vw_hn(200);
                            }

                            .list_head_item:nth-child(2) {
                                width: vw_hn(180);
                            }

                            .list_head_item:nth-child(3) {
                                width: vw_hn(180);
                            }

                            .list_head_item:nth-child(4) {
                                width: vw_hn(250);
                            }

                            .list_head_item:nth-child(5) {
                                width: vw_hn(150);
                            }

                            .list_head_item:nth-child(6) {
                                width: vw_hn(250);
                            }

                            .list_head_item:nth-child(7) {
                                width: vw_hn(150);
                            }
                        }

                        .list_body {
                            // height: vh_vh(720);
                            overflow: hidden;

                            &:hover {
                                .list_body_ {
                                    animation-play-state: paused;
                                }
                            }

                            .list_body_ {
                                margin-top: vh_vh(30);
                                animation: scroll linear infinite;

                                .list_body_item {
                                    display: flex;
                                    justify-content: space-between;
                                    width: vw_hn(1346);
                                    height: vh_vh(96);
                                    line-height: vh_vh(96);
                                    background-image: url('@/assets/image/huning/image/dataPick/left_5.png');
                                    background-size: 100% 100%;
                                    background-position: center center;
                                    margin-bottom: vh_vh(10);

                                    .list_body_item_ {
                                        // flex: 1;
                                        padding-left: vw_hn(40);
                                        font-size: vw_hn(34);
                                        color: #ccdcde;
                                        text-align: left;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }

                                    .list_body_item_:nth-child(1) {
                                        width: vw_hn(200);
                                    }

                                    .list_body_item_:nth-child(2) {
                                        width: vw_hn(180);
                                    }

                                    .list_body_item_:nth-child(3) {
                                        width: vw_hn(180);
                                    }

                                    .list_body_item_:nth-child(4) {
                                        width: vw_hn(250);
                                    }

                                    .list_body_item_:nth-child(5) {
                                        width: vw_hn(150);
                                    }

                                    .list_body_item_:nth-child(6) {
                                        width: vw_hn(250);
                                    }

                                    .list_body_item_:nth-child(7) {
                                        width: vw_hn(150);
                                    }

                                    .off {
                                        color: #ffdf07;
                                    }

                                    .on {
                                        color: #0db896;
                                    }
                                }
                            }
                        }
                    }

                    .ranking1 {
                        height: vh_vh(720);

                        .ranking-title {
                            font-weight: 400;
                            font-size: vw_hn(34);
                            color: #21e3ff;
                            // margin-top: vh_vh(70);
                            margin-bottom: vh_vh(20);
                        }

                        .ranking-content {
                            height: vh_vh(720);
                            overflow: hidden;

                            .ranking-list {
                                // margin-top: vh_vh(30);
                                animation: scroll linear infinite;

                                .item {
                                    display: flex;
                                    align-items: center;
                                    margin-bottom: vh_vh(45);

                                    .item-index {
                                        font-weight: 400;
                                        font-size: vw_hn(34);
                                        color: #c9d9db;
                                        width: vw_hn(100);
                                    }

                                    .item-name {
                                        font-weight: 400;
                                        font-size: vw_hn(34);
                                        color: #c9d9db;
                                        width: vw_hn(250);
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }

                                    :deep(.el-progress) {
                                        flex: 1;

                                        .el-progress-bar__outer {
                                            border-radius: vh_vh(0);
                                            height: vh_vh(12) !important;
                                            background-color: rgba(0, 0, 0, 0.2);

                                            .el-progress-bar__inner {
                                                background-color: #20dcf9;
                                                border-radius: 0;
                                            }
                                        }
                                    }

                                    .item-time {
                                        margin-left: vw_hn(20);
                                        width: vw_hn(180);
                                        font-size: vw_hn(36);
                                        color: #ffffff;
                                        text-align: left;
                                    }
                                }

                                .item:nth-child(1) {
                                    .item-index {
                                        color: #21e3ff;
                                    }
                                }
                            }
                        }
                    }

                    .ranking2 {
                        height: vh_vh(720);

                        .ranking-title {
                            font-weight: 400;
                            font-size: vw_hn(34);
                            color: #21e3ff;
                            margin-bottom: vh_vh(20);
                            // margin-top: vh_vh(70);
                        }

                        .ranking-content {
                            height: vh_vh(720);
                            overflow: hidden;

                            .ranking-list {
                                // margin-top: vh_vh(30);
                                animation: scroll linear infinite;

                                .item {
                                    display: flex;
                                    align-items: center;
                                    margin-bottom: vh_vh(42);

                                    .item-index {
                                        font-weight: 400;
                                        font-size: vw_hn(34);
                                        color: #c9d9db;
                                        width: vw_hn(100);
                                    }

                                    .item-name {
                                        font-weight: 400;
                                        font-size: vw_hn(34);
                                        color: #c9d9db;
                                        width: vw_hn(250);
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    }

                                    :deep(.el-progress) {
                                        flex: 1;

                                        .el-progress-bar__outer {
                                            border-radius: vh_vh(0);
                                            height: vh_vh(12) !important;
                                            background-color: rgba(0, 0, 0, 0.2);

                                            .el-progress-bar__inner {
                                                background-color: #20dcf9;
                                                border-radius: 0;
                                            }
                                        }
                                    }

                                    .item-time {
                                        margin-left: vw_hn(20);
                                        width: vw_hn(180);
                                        font-size: vw_hn(36);
                                        color: #ffffff;
                                        text-align: left;
                                    }
                                }

                                .item:nth-child(1) {
                                    .item-index {
                                        color: #21e3ff;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .list:nth-child(1) {
            .list-item {
                .content {
                    height: vh_vh(620);
                }
            }
        }

        .list:nth-child(3) {
            margin-top: vh_vh(70);

            .list-item {
                .content {
                    height: vh_vh(740);
                }
            }
        }
    }
}

@keyframes scroll {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-100%);
    }
}
</style>
