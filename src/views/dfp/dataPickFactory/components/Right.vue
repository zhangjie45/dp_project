<template>
    <div class="main">
        <div class="top">
            <div class="header">
                <div class="header-title" @click="jumpMES('sell')"><span class="title-txt">生产与销售</span>概况</div>
            </div>
            <div class="content">
                <div class="content-info">
                    <div class="item3">
                        <div class="item3-type">
                            <div class="type" :class="type === '卷数' ? 'active' : ''" @click="handleSelectType('卷数')">卷数
                            </div>
                            <div class="line"></div>
                            <div class="type" :class="type === '数量' ? 'active' : ''" @click="handleSelectType('数量')">数量
                            </div>
                        </div>
                        <div class="item3-list">
                            <div class="item">
                                <div class="item-num num1">{{ formatDisplayValue(type === '卷数' ? salesOrder.cutRollCount
                                    : salesOrder.cutQuantity) }}</div>
                                <div class="item-txt">今日累计<br />分切{{ type }}</div>
                            </div>
                            <div class="item">
                                <div class="item-num num2">{{ formatDisplayValue(type === '卷数' ?
                                    salesOrder.carbonCoatedRollCount : salesOrder.carbonCoatedQuantity) }}</div>
                                <div class="item-txt">今日累计<br />涂炭{{ type }}</div>
                            </div>
                            <div class="item">
                                <div class="item-num num3">{{ formatDisplayValue(type === '卷数' ?
                                    salesOrder.packagedRollCount : salesOrder.packagedQuantity) }}</div>
                                <div class="item-txt">今日累计<br />包装{{ type }}</div>
                            </div>
                            <div class="item">
                                <div class="item-num num4">{{ formatDisplayValue(type === '卷数' ? salesOrder.djbRollCount
                                    : salesOrder.djbQuantity) }}</div>
                                <div class="item-txt">今日累计<br />电池箔{{ type }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="chart">
                    <div class="item1">
                        <div class="item1-icon">{{ formatDisplayValue(salesOrder.orderCount) }}</div>
                        <div class="dis">今日订单数量</div>
                    </div>
                    <div class="item2">
                        <!-- <div class="item2-chart" ref="pieChart"></div> -->
                        <div class="item2-icon" :class="salesOrder.dod ? (salesOrder.dod > 0 ? 'up' : 'down') : ''">
                            <div v-if="salesOrder.dod" class="icon"></div>
                            {{ salesOrder.dod ? (Math.abs(salesOrder.dod) * 100).toFixed(1) + '%' : '-' }}
                        </div>
                        <div class="dis">环比昨日</div>
                    </div>
                    <div class="chart_">
                        <!-- <div class="chart_select">
                            <CustomSelect v-model="selectedDateTop" :options="dateOptionsTop" />
                        </div> -->
                        <div class="chart_body">
                            <div ref="chartTop" class="body-chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="header">
                <div class="header-title"><span class="title-txt">今日质量</span>概况</div>
            </div>
            <!-- <GradientRing :progress="75" color="#ff6b35" track-color="#f0f0f0" /> -->
            <div class="content">
                <div class="list">
                    <div class="item" @click="jumpMES('quality_4')">
                        <div class="item-icon icon1">{{ props.quality.rolling ? props.quality.rolling + '%' : '-' }}
                        </div>
                        <div class="dis">轧制</div>
                    </div>
                    <div class="item" @click="jumpMES('quality_2')">
                        <div class="item-icon icon2">{{ props.quality.slitting ? props.quality.slitting + '%' : '-' }}
                        </div>
                        <div class="dis">分切</div>
                    </div>
                </div>
                <div class="list">
                    <div class="item" @click="jumpMES('quality_1')">
                        <div class="item-icon icon3">{{ props.quality.rewind ? props.quality.rewind + '%' : '-' }}</div>
                        <div class="dis">倒卷</div>
                    </div>
                    <div class="item" @click="jumpMES('quality_3')">
                        <div class="item-icon icon4">{{ props.quality.carbon ? props.quality.carbon + '%' : '-' }}</div>
                        <div class="dis">涂炭</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps } from 'vue'
// import { getSalesOrder } from '@/api/factory'
import { fitChartSize, debounce, formatDisplayValue } from '@/utils'
import CustomSelect from '@/components/select/select2.vue'
const type = ref('卷数')

const selectedDateTop = ref(new Date().getFullYear())
const dateOptionsTop = ref([
    { value: new Date().getFullYear(), label: new Date().getFullYear() },
    { value: new Date().getFullYear() - 1, label: new Date().getFullYear() - 1 },
    { value: new Date().getFullYear() - 2, label: new Date().getFullYear() - 2 }
])
const props = defineProps({
    quality: {
        type: Object,
        default: () => ({})
    }
})
const salesOrder = ref({})

const { proxy } = getCurrentInstance()
let chartsTop = null
const resizeHandler = ref(null)
const chartTop = ref(null)
let timer = null
onMounted(() => {
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 1 * 60) // 每1分钟更新一次
    nextTick(() => {
        resizeHandler.value = debounce(() => {
            if (chartsTop) {
                chartsTop.resize()
                updateChartTopOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})
function handleSelectType (vale) {
    type.value = vale
}

watch(
    () => selectedDateTop.value,
    (newValue) => {
        getData()
    }
)
import { salesOrderJson } from '../data'
const getData = () => {
    salesOrder.value = salesOrderJson
    nextTick(() => {
        updateChartWithOptions()
    })
    // getSalesOrder().then((res) => {
    //     if (res.code === 200) {
    //         salesOrder.value = res.data
    //         nextTick(() => {
    //             updateChartWithOptions()
    //         })
    //     }
    // })
}
const updateChartWithOptions = () => {
    nextTick(() => {
        if (chartsTop) {
            const options = getChartOptions()
            // 使用 notMerge: true 确保完全重新渲染
            chartsTop.setOption(options, { notMerge: true })
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
    if (!chartsTop) {
        return
    }
    window.removeEventListener('resize', resizeHandler.value)
    chartsTop.dispose()
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
    const chartData_ = validateChartData(salesOrder.value.chart)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    const isAllZero = ydata[0]?.data?.every((item) => item === 0)

    return {
        legend: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            },
            itemWidth: fitChartSize(16),
            itemHeight: fitChartSize(8)
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#02184A',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            }
            // formatter: (params) => {
            //     return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].data}`
            // }
        },
        grid: {
            left: ydata.length > 0 ? (isAllZero ? '8%' : '3%') : '8%',
            right: '5%',
            bottom: '0%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xdata,
            axisPointer: {
                type: 'shadow'
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(10)
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(12), // 重新计算字体大小
                fontWeight: 500
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.32)'
                }
            }
        },
        series: [
            {
                name: ydata[0].name,
                type: 'line',
                smooth: true,
                symbol: 'circle',
                lineStyle: {
                    color: 'rgba(0, 240, 216, 1)',
                    width: 1
                },
                itemStyle: {
                    color: '#fff',
                    borderColor: 'rgba(0, 240, 216, 1)'
                },
                areaStyle: {
                    color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(0, 240, 216, 1)' // 渐变色的起始颜色
                        },
                        {
                            offset: 1,
                            color: 'rgba(0, 240, 216, 0.11)' // 渐变色的结束颜色
                        }
                    ])
                },
                data: ydata[0].data
            }
        ]
    }
}

const initBarChart = () => {
    chartsTop = proxy.$echarts.init(chartTop.value)
    const options1 = getChartOptions()
    chartsTop.setOption(options1)
}

// 新增：更新图表配置
const updateChartTopOptions = () => {
    const options = getChartOptions()
    chartsTop.setOption(options)
}

//跳转至mes系统
const jumpMES = (val) => {
    switch (val) {
        case 'sell':
            window.open(import.meta.env.VITE_APP_MES_SELL_URL)
            break
        case 'quality_1':
            console.log('')
            window.open(import.meta.env.VITE_APP_MES_QUALITY_URL_1)
            break
        case 'quality_2':
            console.log('4')
            window.open(import.meta.env.VITE_APP_MES_QUALITY_URL_2)
            break
        case 'quality_3':
            console.log('涂炭')

            window.open(import.meta.env.VITE_APP_MES_QUALITY_URL_3)
            break
        case 'quality_4':
            console.log('6')
            window.open(import.meta.env.VITE_APP_MES_QUALITY_URL_4)
            break
    }

    // if (val === 1) {
    //     //跳转至销售订单
    //     window.open(import.meta.env.VITE_APP_MES_SELL_URL)
    // } else {
    //     //跳转至质量概况
    //     window.open(import.meta.env.VITE_APP_MES_QUALITY_URL)
    // }
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    width: 100%;

    .top {
        height: vh(466);
        background-color: rgba(2, 27, 88, 0.5);

        .header {
            width: 100%;
            height: vh(33);
            background-image: url('@/assets/image/dfp/dataPickFactory/center_1.png');
            background-size: 100% 100%;
            background-position: center center;

            .header-title {
                font-weight: 700;
                font-size: vw(16);
                color: #fff;
                line-height: vh(30);
                position: relative;
                top: vh(-10);
                text-align: center;
                cursor: pointer;

                .title-txt {
                    color: #fcbd2b;
                }
            }
        }

        .content {
            padding: vh(9) vw(31) 0 vw(31);

            .content-info {
                display: flex;

                .item3 {
                    width: vw(628);
                    height: vh(100);
                    background-image: url('@/assets/image/dfp/dataPickFactory/right_2.webp');
                    background-size: 100% 100%;
                    background-position: center center;
                    padding: vh(20) vw(40);

                    .item3-type {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: vh(14);

                        .type {
                            font-size: vw(12);
                            color: #ffffff;
                            font-weight: 600;
                            cursor: pointer;
                        }

                        .active {
                            color: #00e4d8;
                        }

                        .line {
                            width: vw(1);
                            height: vh(12);
                            background-color: rgba(255, 255, 255, 0.32);
                            margin: 0 vw(10);
                        }
                    }

                    .item3-list {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: vh(20);

                        .item {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;

                            .item-num {
                                font-size: vw(14);
                                font-weight: 600;
                            }

                            .item-txt {
                                margin-top: vh(10);
                                font-size: vw(12);
                                color: #ffffff;
                                text-align: center;
                                line-height: vh(16);
                            }

                            .num1 {
                                color: #31d592;
                            }

                            .num2 {
                                color: #fcbd2b;
                            }

                            .num3 {
                                color: #00e4d8;
                            }

                            .num4 {
                                color: #cc89ff;
                            }
                        }
                    }
                }
            }

            .chart {
                height: vh(260);

                display: flex;
                align-items: center;

                .item1 {
                    width: vw(140);
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .item1-icon {
                        width: vw(104);
                        height: vh(104);
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_1.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        border-radius: vw(52);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: vw(14);
                        color: #00e4d8;
                        font-weight: 700;
                    }

                    .dis {
                        width: vw(140);
                        margin-top: vh(8);
                        font-size: vw(12);
                        color: #ffffff;
                        text-align: center;
                    }
                }

                .item2 {
                    margin-left: vw(10);
                    width: vw(104);
                    margin-right: vw(20);

                    .item2-icon {
                        width: vw(104);
                        height: vh(104);
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_1.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        border-radius: vw(52);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: vw(14);
                        color: #00e4d8;
                        font-weight: 700;
                    }

                    .up {
                        color: #31d592;

                        .icon {
                            width: vw(6);
                            height: vw(10);
                            background-image: url('@/assets/image/dfp/dataPickFactory/right_8.jpg');
                            background-size: 100% 100%;
                            background-position: center center;
                            margin-right: vw(3);
                        }
                    }

                    .down {
                        color: #e55757;

                        .icon {
                            width: vw(6);
                            height: vw(10);
                            background-image: url('@/assets/image/dfp/dataPickFactory/right_7.png');
                            background-size: 100% 100%;
                            background-position: center center;
                            margin-right: vw(2);
                        }
                    }

                    .num {
                        position: relative;
                        top: -40%;
                        text-align: center;
                        font-size: vh(16);
                        color: #31d592;
                        font-weight: bold;
                    }

                    .dis {
                        margin-top: vh(8);
                        font-size: vw(12);
                        color: #ffffff;
                        text-align: center;
                    }
                }

                .chart_ {
                    width: vw(350);

                    .chart_select {
                        margin-left: vw(170);
                    }

                    .chart_body {
                        width: vw(350);
                        height: vh(240);

                        .body-chart {
                            width: vw(350);
                            height: vh(240);
                            // background-color: #00e4d8;
                        }
                    }
                }
            }
        }
    }

    .bottom {
        margin-top: vh(32);
        height: vh(457);
        background-color: rgba(2, 27, 88, 0.5);

        .header {
            width: 100%;
            height: vh(33);
            background-image: url('@/assets/image/dfp/dataPickFactory/center_1.png');
            background-size: 100% 100%;
            background-position: center center;

            .header-title {
                font-weight: 700;
                font-size: vw(16);
                color: #fff;
                line-height: vh(30);
                position: relative;
                top: vh(-10);
                text-align: center;

                .title-txt {
                    color: #fcbd2b;
                }
            }
        }

        .content {
            padding: vh(20) 0;

            .list {
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                .item {
                    cursor: pointer;

                    .item-icon {
                        width: vw(152);
                        height: vh(152);
                        font-size: vw(18);
                        font-weight: 600;
                        margin-bottom: vh(10);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .dis {
                        font-size: vw(12);
                        color: #ffffff;
                        text-align: center;
                    }

                    .icon1 {
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_3.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        color: #00e4d8;
                    }

                    .icon2 {
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_4.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        color: #fcbd2b;
                    }

                    .icon3 {
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_5.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        color: #60c5ff;
                    }

                    .icon4 {
                        background-image: url('@/assets/image/dfp/dataPickFactory/right_6.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        color: #b894ff;
                    }
                }
            }

            .list:nth-child(1) {
                margin-bottom: vh(20);
            }
        }
    }
}
</style>
