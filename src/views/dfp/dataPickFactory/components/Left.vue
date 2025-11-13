<template>
    <div class="main">
        <div class="top">
            <div class="header">
                <div class="header-title"><span class="title-txt">B区</span>设备概览(一楼电晕机-1750#电晕处理机)</div>
            </div>
            <div class="content">
                <div class="item-content">
                    <div class="item-content-header">
                        <div class="txt">编号</div>
                        <div class="txt">状态</div>
                        <div class="txt">功率(W)</div>
                    </div>
                    <div class="item-content-body">
                        <div class="item-content-body-item" v-for="(item, index) in props.areaBOverview">
                            <div class="txt">{{ item.machineCode }}#</div>
                            <div class="txt" :class="item.status === 2 ? 'on' : 'off'">{{ item.status === 2 ? '运行' :
                                '停机' }}</div>
                            <div class="txt">{{ item.coronaPSum }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="center1">
            <div class="header">
                <div class="header-title"><span class="title-txt">C区</span>设备概览(一楼)</div>
            </div>
            <div class="content">
                <div class="item">
                    <div class="item-icon" @click="openCoatingDialog">锂电双面<br />凹版涂布机</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaCOverview.tt?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">故障</span><span class="off">{{
                            formatDisplayValue(props.areaCOverview.tt?.stopCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">待机</span><span class="error">{{
                            formatDisplayValue(props.areaCOverview.tt?.waitCount) }}台</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon" @click="jumpRewind">倒卷</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaCOverview.rewind?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">停机</span><span class="off">{{
                            formatDisplayValue(props.areaCOverview.rewind?.stopCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt"></span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon" @click="openDialog">热风刀<br />装置</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaCOverview.rfd?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">停机</span><span class="off">{{
                            formatDisplayValue(props.areaCOverview.rfd?.stopCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="center2">
            <div class="header">
                <div class="header-title"><span class="title-txt">D区</span>设备概览</div>
            </div>
            <div class="content">
                <div class="item">
                    <div class="item-icon" @click="jumpRewind" style="cursor: pointer">一楼<br />倒卷</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaDOverview.firstFloor?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">停机</span><span class="off">{{
                            formatDisplayValue(props.areaDOverview.firstFloor?.stopCount) }}台</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon" @click="jumpRewind" style="cursor: pointer">二楼<br />倒卷</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaDOverview.secondFloor?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">停机</span><span class="off">{{
                            formatDisplayValue(props.areaDOverview.secondFloor?.stopCount) }}台</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-icon" @click="jumpRewind" style="cursor: pointer">三楼<br />倒卷</div>
                    <div class="item-num">
                        <span class="txt">运行</span><span class="on">{{
                            formatDisplayValue(props.areaDOverview.thirdFloor?.runCount) }}台</span>
                    </div>
                    <div class="item-num">
                        <span class="txt">停机</span><span class="off">{{
                            formatDisplayValue(props.areaDOverview.thirdFloor?.stopCount) }}台</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="header">
                <div class="header-title">
                    <span class="title-txt">项目</span>概览
                    <el-tooltip content="展示立项总数前6名节点数据" placement="top" effect="dark">
                        <div class="header-info"></div>
                    </el-tooltip>
                </div>
            </div>
            <div class="content">
                <div class="bottom-top">
                    <div class="item">
                        <div class="item-icon"></div>
                        <div class="item-num">
                            <div class="num">{{ formatDisplayValue(props.projectOverview.projectCount) }}</div>
                            <div class="txt">项目总数</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-icon"></div>
                        <div class="item-num">
                            <div class="num">{{ formatDisplayValue(props.projectOverview.projectEstablishCount) }}</div>
                            <div class="txt">立项总数</div>
                        </div>
                    </div>
                </div>
                <div ref="chart" class="chart-box"></div>
            </div>
        </div>
        <CoatingDialog ref="coatingDialog" />
        <RFDDialog ref="rfdDialog" />
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, nextTick, getCurrentInstance, watch } from 'vue'
import { debounce, fitChartSize } from '@/utils'
import CoatingDialog from './CoatingDialog.vue'
import RFDDialog from './RFDDialog.vue'

import { formatDisplayValue } from '@/utils'
const { proxy } = getCurrentInstance()
let charts = null
const resizeHandler = ref(null)
const chart = ref(null)

const coatingDialog = ref(null)
const rfdDialog = ref(null)

const openCoatingDialog = () => {
    coatingDialog.value.openDialog()
}

const openDialog = () => {
    rfdDialog.value.openDialog()
}

const props = defineProps({
    areaBOverview: {
        type: Array,
        default: () => []
    },
    areaCOverview: {
        type: Object,
        default: () => { }
    },
    areaDOverview: {
        type: Object,
        default: () => { }
    },
    projectOverview: {
        type: Object,
        default: () => { }
    }
})
watch(
    () => props.projectOverview,
    () => {
        getData()
    },
    {
        deep: true
    }
)
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

function jumpRewind () {
    window.location.href = '/dfp/page1'
}

const getData = () => {
    nextTick(() => {
        updateChartOptions()
    })
}
onBeforeUnmount(() => {
    if (!charts) {
        return
    }
    window.removeEventListener('resize', resizeHandler.value)
    charts.dispose()
})
// 提取图表配置为函数
const getChartOptions = () => {
    return {
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#02184A',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            },
            formatter: (params) => {
                return `${params[0].name}: ${params[0].data}`
            }
        },
        grid: {
            left: '2%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(10),
                // 自定义标签格式化函数
                formatter: function (value) {
                    // 如果标签文字过长，截取部分显示
                    return value.length > 4 ? value.substring(0, 4) + '...' : value
                },
                rotate: 45, // 旋转45度
                interval: 0, // 显示所有标签
                margin: fitChartSize(10) // 增加标签与轴线的距离
            },

            data: props.projectOverview.xdata || []
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#336EB9',
                fontSize: fitChartSize(12)
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.32)',
                    width: 1,
                    type: 'solid'
                }
            }
        },
        series: [
            {
                data: props.projectOverview.ydata || [],
                type: 'bar',
                barWidth: '20%',
                itemStyle: {
                    color: '#1DCEFA'
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
    if (charts) {
        const options = getChartOptions()
        charts.setOption(options)
    } else {
        initBarChart()
    }
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    width: 100%;

    .top {
        height: vh(160);
        background-color: rgba(2, 27, 88, 0.5);
        margin-bottom: vh(30);

        .content {
            width: 100%;
            padding: vh(11) vw(12);

            .item-content {
                .item-content-header {
                    height: vh(31);
                    background-color: rgba(34, 180, 254, 0.16);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .txt {
                        font-weight: 500;
                        font-size: vw(14);
                        color: #fff;
                        text-align: left;
                        padding-left: vw(22);
                        flex: 1;
                    }
                }

                .item-content-body {
                    .item-content-body-item {
                        width: 100%;
                        height: vh(20);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin: vh(18) 0;
                        line-height: 1;

                        // cursor: pointer;
                        .txt {
                            font-size: vw(12);
                            color: #fff;
                            flex: 1;
                            text-align: left;
                            padding-left: vw(22);
                        }

                        .txt:nth-child(1) {
                            color: #1dcefa;
                        }

                        .txt:nth-child(3) {
                            color: #00ffec;
                        }

                        .on {
                            color: #27d106;
                        }

                        .off {
                            color: #e55757;
                        }
                    }
                }
            }
        }
    }

    .center1,
    .center2 {
        height: vh(194);
        background-color: rgba(2, 27, 88, 0.5);

        .content {
            padding: vh(19) vw(32);
            display: flex;
            align-items: center;
            justify-content: space-between;

            .item {
                .item-icon {
                    width: vw(97);
                    height: vh(76);
                    line-height: vh(23);
                    background-image: url('@/assets/image/dfp/dataPickFactory/left_3.png');
                    background-size: 100% 100%;
                    background-position: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                    font-size: vw(16);
                    color: #ffffff;
                    margin-bottom: vh(3);
                    text-align: center;
                }

                .item-num {
                    font-weight: 400;
                    font-size: vw(12);
                    color: #ffffff;

                    margin-bottom: vh(3);

                    .txt {
                        width: vw(28);
                        margin-left: vw(5);
                    }

                    .on {
                        color: #27d106;
                        margin-left: vw(10);
                    }

                    .off {
                        color: #e55757;
                        margin-left: vw(10);
                    }

                    .all {
                        color: #22b4fe;
                        margin-left: vw(10);
                    }

                    .error {
                        color: #fcbd2b;
                        margin-left: vw(10);
                    }
                }
            }
        }
    }

    .center1 {
        margin-bottom: vh(30);

        .content {
            padding: vh(5) vw(32);

            .item {
                .item-icon {
                    cursor: pointer;
                }
            }
        }
    }

    .bottom {
        margin-top: vh(30);
        background-color: rgba(2, 27, 88, 0.5);
        height: vh(318);

        .content {
            padding: vh(10) vw(14) 0 vw(14);

            .bottom-top {
                display: flex;
                align-items: center;

                .item {
                    flex: 1;
                    display: flex;
                    align-items: center;

                    .item-icon {
                        width: vw(102);
                        height: vw(84);
                    }

                    .item-num {
                        margin-left: vw(5);

                        .num {
                            font-weight: bold;
                            font-size: vw(20);
                            color: #22b4fe;
                        }

                        .txt {
                            margin-top: vh(5);
                            font-weight: 400;
                            font-size: vw(12);
                            color: #ffffff;
                        }
                    }
                }

                .item:nth-child(1) {
                    .item-icon {
                        background-image: url('@/assets/image/dfp/dataPickFactory/left_4.png');
                        background-size: 100% 100%;
                        background-position: center;
                    }
                }

                .item:nth-child(2) {
                    .item-icon {
                        background-image: url('@/assets/image/dfp/dataPickFactory/left_5.png');
                        background-size: 100% 100%;
                        background-position: center;
                    }
                }
            }

            .chart-box {
                width: 100%;
                height: vh(190);
            }
        }
    }

    .header {
        width: 100%;
        height: vh(30);
        background-image: url('@/assets/image/dfp/dataPickFactory/left_1.png');
        background-size: 100% 100%;
        background-position: center center;

        .header-title {
            font-weight: 700;
            font-size: vw(16);
            color: #fff;
            line-height: vh(30);
            position: relative;
            top: vh(-10);

            .title-txt {
                color: #fcbd2b;
            }

            .header-info {
                width: vw(14);
                height: vw(14);
                background-image: url('@/assets/image/dfp/dataPickFactory/left_6.png');
                background-size: 100% 100%;
                background-position: center;
                display: inline-block;
            }
        }

        .header-title::before {
            content: '';
            display: inline-block;
            margin-left: vw(14);
            margin-right: vw(9);
            line-height: vh(30);
            width: vw(22);
            height: vh(18);
            background-image: url('@/assets/image/dfp/dataPickFactory/left_2.png');
            background-size: 100% 100%;
            background-position: center center;
        }
    }
}
</style>
