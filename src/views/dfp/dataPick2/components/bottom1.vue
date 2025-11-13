<template>
    <div class="main">
        <div class="header">
            <div class="header-title" v-if="![28, 33, 32].includes(props.deviceIndex)">上收卷数据监测</div>
            <div class="header-title" v-else>上卷数据监测</div>
        </div>
        <div class="content">
            <div class="top">
                <div class="item" v-if="![28, 33, 32].includes(props.deviceIndex)">
                    <div class="item-num">{{ formatDisplayValue(props.rewindData.upperWinderCurrentTension) }}</div>
                    <div class="item-txt">上收卷当前张力(N)</div>
                </div>
                <div class="item">
                    <div class="item-num">{{ formatDisplayValue(props.rewindData.upperWinderTaper, '%') }}</div>
                    <!-- <div class="item-num" v-else>{{ formatDisplayValue(props.rewindData.aTaper) }}</div> -->
                    <div class="item-txt" v-if="![28, 33, 32].includes(props.deviceIndex)">上收卷锥度设定</div>
                    <div class="item-txt" v-else>上卷锥度</div>
                </div>
                <div class="item">
                    <div class="item-num" v-if="![28, 33, 32].includes(props.deviceIndex)">{{
                        formatDisplayValue(props.rewindData.upperWinderMaterialWidth) }}</div>
                    <div class="item-num" v-else>{{ formatDisplayValue(props.rewindData.upperWinderTensionSet) }}</div>
                    <div class="item-txt" v-if="![28, 33, 32].includes(props.deviceIndex)">A轴收卷宽度(mm)</div>
                    <div class="item-txt" v-else>上卷张力设定(N)</div>
                </div>
            </div>
            <div class="bottom">
                <div ref="chart" class="body-chart"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, getCurrentInstance, defineProps, watch } from 'vue'
import { fitChartSize, debounce, formatDisplayValue } from '@/utils'
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
    upData: {
        type: Object,
        default: () => ({
            chartData: {
                xdata: [],
                ydata: []
            }
        })
    },
    rewindData: {
        type: Object,
        default: () => ({
            upperWinderCurrentTension: null,
            upperWinderTaper: null,
            arollingWidth: null
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
    () => props.upData,
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
const line_color = ['rgba(196, 128, 21, 1)', 'rgba(0, 240, 216, 1)']

// 添加数据验证函数
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }

    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}

// 提取图表配置为函数
const getChartOptions = () => {
    const chartData = validateChartData(props.upData)
    const ydata = chartData.ydata
    const xdata = chartData.xdata
    const isAllZero = ydata[0]?.data?.every((item) => item === 0)
    return {
        grid: {
            left: ydata.length > 0 ? (isAllZero ? '8%' : '3%') : '8%',
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
            }
            // formatter: (params) => {
            //     return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].data}`
            // }
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
                name: '张力值(N)',
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
        height: vh(362);
        background-color: rgba(1, 38, 58, 0.39);
        padding: vh(25) vw(18);

        .top {
            width: vw(420);
            display: flex;
            justify-content: space-around;

            .item {
                width: vw(132);

                .item-num {
                    width: vw(132);
                    height: vh(56);
                    background-image: url('@/assets/image/dfp/dataPick2/bottom1_2.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    font-size: vw(16);
                    font-family: 'dfpFont';
                    line-height: vh(56);
                    text-align: center;
                }

                .item-txt {
                    margin-top: vh(13);
                    width: vw(132);
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

        .bottom {
            width: vw(420);
            height: vh(280);
            float: inline-start;

            .body-chart {
                margin-top: vh(10);
                width: vw(420);
                height: vh(270);
            }
        }
    }
}
</style>
