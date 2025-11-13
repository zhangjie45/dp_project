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
let bgColor = '#fff';
let title = '总量';
let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
let echartData = [
    {
        name: 'A类',
        value: 3720
    },
    {
        name: 'B类',
        value: 2920
    },
    {
        name: 'C类',
        value: 2200
    },
    {
        name: 'D类',
        value: 1420
    }
];
let formatNumber = function (num) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
};
let total = echartData.reduce((a, b) => {
    return a + b.value * 1;
}, 0);
// 提取图表配置为函数
const getChartOptions = () => {
    return {
        backgroundColor: bgColor,
        color: color,
        title: [
            {
                text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                top: 'center',
                left: 'center',
                textStyle: {
                    rich: {
                        name: {
                            fontSize: 14,
                            fontWeight: 'normal',
                            color: '#666666',
                            padding: [10, 0]
                        },
                        val: {
                            fontSize: fitChartSize(32),
                            fontWeight: 'bold',
                            color: '#333333'
                        }
                    }
                }
            },
            {
                text: '单位：个',
                top: 0,
                right: 0,
                textStyle: {
                    fontSize: 14,
                    color: '#666666',
                    fontWeight: 400
                }
            }
        ],
        series: [
            {
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '50%'],
                data: echartData,
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        borderColor: bgColor,
                        borderWidth: 2
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 120,
                        lineStyle: {
                            color: '#e6e6e6'
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: params => {
                            return '{icon|●}{name|' + params.name + '}{value|' + formatNumber(params.value) + '}';
                        },
                        padding: [0, -100, 25, -100],
                        rich: {
                            icon: {
                                fontSize: 16,
                                color: 'inherit'
                            },
                            name: {
                                fontSize: 14,
                                padding: [0, 10, 0, 4],
                                color: '#666666'
                            },
                            value: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333333'
                            }
                        }
                    }
                }
            }
        ]
    };
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
    height: vh(400);
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
