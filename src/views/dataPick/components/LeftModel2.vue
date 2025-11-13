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
        grid: {
            top: '80',
            left: '40',
            right: '40',
            bottom: '40'
        },
        xAxis: [
            {
                type: 'category',
                color: '#59588D',
                data: ['学员续费率', '试听课转换率', '课程消费率', '课后评分率', '作业完成率', '班级满班率', '排课上课率', '体验课转化率'],
                axisPointer: {
                    type: 'line'
                },
                axisLine: {
                    lineStyle: {
                        color: '#272456'
                    }
                },
                axisLabel: {
                    margin: 20,
                    color: '#59588D',
                    textStyle: {
                        fontSize: proxy.$fitChartSize(12)
                    }
                }
            }
        ],
        yAxis: [
            {
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}%',
                    color: '#59588D'
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#272456'
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: [100, 90, 10, 90, 90, 20, 56, 89],
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            // x=0,y=1,柱子的颜色在垂直方向渐变
                            x: 0,
                            y: 1,
                            colorStops: [
                                // 0%处的颜色
                                {
                                    offset: 0,
                                    color: '#41E1D4'
                                },
                                // 100%处的颜色
                                {
                                    offset: 1,
                                    color: '#10A7DB'
                                }
                            ],
                            global: false // 缺省为 false
                        },
                        barBorderRadius: [30, 30, 0, 0],
                        shadowColor: 'rgba(0,255,225,1)',
                        shadowBlur: 4
                    }
                },
                label: {
                    normal: {
                        show: true,
                        lineHeight: 30,
                        width: 80,
                        height: 30,
                        backgroundColor: '#252453',
                        borderRadius: 200,
                        position: ['-8', '-60'],
                        distance: 1,
                        formatter: ['    {d|●}', ' {a|{c}%}     \n', '    {b|}'].join(''),
                        rich: {
                            d: {
                                color: '#3CDDCF'
                            },
                            a: {
                                color: '#fff',
                                align: 'center'
                            },
                            b: {
                                width: 1,
                                height: 30,
                                borderWidth: 1,
                                borderColor: '#234e6c',
                                align: 'left'
                            }
                        }
                    }
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
    height: vh(450);
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
