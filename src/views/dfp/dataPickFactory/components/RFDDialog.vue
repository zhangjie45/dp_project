<template>
    <Dialog v-model="showDialog" customClass="dialog-custom-RFD" title="提示信息" size="medium" :show-cancel="false"
        :show-confirm="false" :show-header="false" confirm-text="确定" cancel-text="取消" @confirm="handleConfirm"
        @cancel="handleCancel" @close="handleClose">
        <div class="content">
            <div class="header">
                <div class="title"><span class="dis">热风刀装置</span>详情</div>
                <div class="close" @click="handleClose">关闭</div>
            </div>
            <div class="content-body">
                <div class="title">
                    <div class="item">编号</div>
                    <div class="line"></div>
                    <div class="item">状态</div>
                    <div class="line"></div>
                    <div class="item_u">
                        <div class="item_title">电压</div>
                        <div class="item_list">
                            <div class="item" :class="{ active: clickedColumn === 'ua' }"
                                @click="(e) => handleClickedColumn(e, 'ua')">
                                <div class="item_txt">A相<br />电压</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'ub' }"
                                @click="(e) => handleClickedColumn(e, 'ub')">
                                <div class="item_txt">B相<br />电压</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'uc' }"
                                @click="(e) => handleClickedColumn(e, 'uc')">
                                <div class="item_txt">C相<br />电压</div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="item_a">
                        <div class="item_title">电流</div>
                        <div class="item_list">
                            <div class="item" :class="{ active: clickedColumn === 'ia' }"
                                @click="(e) => handleClickedColumn(e, 'ia')">
                                <div class="item_txt">A相<br />电流</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'ib' }"
                                @click="(e) => handleClickedColumn(e, 'ib')">
                                <div class="item_txt">B相<br />电流</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'ic' }"
                                @click="(e) => handleClickedColumn(e, 'ic')">
                                <div class="item_txt">C相<br />电流</div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="item_p">
                        <div class="item_title">功率</div>
                        <div class="item_list">
                            <div class="item" :class="{ active: clickedColumn === 'pa' }"
                                @click="(e) => handleClickedColumn(e, 'pa')">
                                <div class="item_txt">A相有功<br />功率</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'pb' }"
                                @click="(e) => handleClickedColumn(e, 'pb')">
                                <div class="item_txt">B相有功<br />功率</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'pc' }"
                                @click="(e) => handleClickedColumn(e, 'pc')">
                                <div class="item_txt">C相有功<br />功率</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 'p' }"
                                @click="(e) => handleClickedColumn(e, 'p')">
                                <div class="item_txt">总有功<br />功率</div>
                            </div>
                            <div class="item" :class="{ active: clickedColumn === 's' }"
                                @click="(e) => handleClickedColumn(e, 's')">
                                <div class="item_txt">总视在<br />功率</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list_body">
                    <div class="list_body_" ref="scrolldiv">
                        <div class="list_body_item" v-for="(item, index) in hotWindDetail">
                            <div class="list_body_item_">{{ formatDisplayValue(item.machineCode, '#') }}</div>
                            <div class="line"></div>
                            <div class="list_body_item_" :class="item.status === 0 ? 'off' : 'on'">{{ item.status === 0
                                ? '停机' : '运行' }}</div>
                            <div class="line"></div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.ua) }}</div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.ub) }}</div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.uc) }}</div>
                            <div class="line"></div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.ia) }}</div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.ib) }}</div>
                            <div class="list_body_item_">{{ formatDisplayValue(item.ic) }}</div>
                            <div class="line"></div>
                            <div class="list_body_item_p">{{ formatDisplayValue(item.pa) }}</div>
                            <div class="list_body_item_p">{{ formatDisplayValue(item.pb) }}</div>
                            <div class="list_body_item_p">{{ formatDisplayValue(item.pc) }}</div>
                            <div class="list_body_item_p">{{ formatDisplayValue(item.p) }}</div>
                            <div class="list_body_item_p">{{ formatDisplayValue(item.s) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-info">
                <div class="container-info-pick">
                    <el-date-picker v-model="date" size="small" type="date" placeholder="请选择日期"
                        value-format="YYYY-MM-DD" @change="getData"></el-date-picker>
                </div>
            </div>
            <div class="container-chart">
                <div id="charts" ref="chart" v-chart-resize class="chart" />
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onBeforeUnmount, nextTick, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { debounce, fitChartSize, formatDisplayValue } from '@/utils'
// import { getHotWindDetail, getHotWindChart } from '@/api/factory'
const { proxy } = getCurrentInstance()
const showDialog = ref(false)
const hotWindDetail = ref([]) //热风刀详情

let charts = null
const resizeHandler = ref(null)
const deviceChartsData = ref({})
const chart = ref(null)
const clickedColumn = ref('ua')
const date = ref('')
import { hotAirKnifeJson, hotAirKnifeChartJson } from '../data'
const openDialog = () => {
    showDialog.value = true
    hotWindDetail.value = hotAirKnifeJson
    // getHotWindDetail().then((res) => {
    //     if (res.code === 200) {
    //         hotWindDetail.value = res.data
    //     }
    // })
}
const handleConfirm = () => {
    // console.log('确认按钮被点击')
    // 执行确认逻辑
}

const handleCancel = () => {
    // console.log('取消按钮被点击')
    // 执行取消逻辑
}

const handleClose = () => {
    date.value = ''
    clickedColumn.value = 'ua'
    showDialog.value = false

    // 执行关闭逻辑
}

onMounted(() => {
    nextTick(() => {
        // getData()
        resizeHandler.value = debounce(() => {
            if (charts) {
                charts.resize()
                updateChartOptions()
            }
        }, 100)
        window.addEventListener('resize', resizeHandler.value)
    })
})
watch(
    () => showDialog.value,
    (newVal) => {
        if (newVal) {
            getData()
        } else {
            if (!charts) {
                return
            }
            window.removeEventListener('resize', resizeHandler.value)
            charts.dispose()
            charts = null
        }
    },
    {
        deep: true
    }
)

const handleClickedColumn = (val, index) => {
    clickedColumn.value = index
    getData()
}

const getData = () => {
    deviceChartsData.value = hotAirKnifeChartJson
    nextTick(() => {
        if (charts) {
            console.log('updateChartOptions')
            updateChartOptions()
        } else {
            console.log('initBarChart')
            initBarChart()
        }
    })
    // getHotWindChart({ fieldName: clickedColumn.value, date: date.value }).then((res) => {
    //     if (res.code === 200) {
    //         deviceChartsData.value = res.data
    //         nextTick(() => {
    //             if (charts) {
    //                 console.log('updateChartOptions')
    //                 updateChartOptions()
    //             } else {
    //                 console.log('initBarChart')
    //                 initBarChart()
    //             }
    //         })
    //     }
    // })
}
onBeforeUnmount(() => {
    if (!charts) {
        return
    }
    window.removeEventListener('resize', resizeHandler.value)
    charts.dispose()
})

const switchUnit = (val) => {
    if (['ua', 'ub', 'uc'].includes(val)) return { unit: 'V', dis: '电压(V)' }
    if (['ia', 'ib', 'ic'].includes(val)) return { unit: 'A', dis: '电流(A)' }
    if (['pa', 'pb', 'pc', 'p', 's'].includes(val)) return { unit: 'W', dis: '功率(W)' }
}
// 添加数据验证函数
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }

    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
let color = ['#19E079', '#FFC748']
// 提取图表配置为函数
const getChartOptions = () => {
    const chartData_ = validateChartData(deviceChartsData.value)
    const ydata = chartData_.ydata
    const xdata = chartData_.xdata
    return {
        grid: {
            left: 10,
            right: 10,
            bottom: '50px',
            top: 30,
            containLabel: true
        },
        legend: {
            top: 'top',
            width: '60%',
            textStyle: {
                color: '#bcf0fe',
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
            },
            formatter: (params) => {
                return `${params[0].name}&nbsp;${switchUnit(clickedColumn.value).dis}<br/>${params.map((p) => `${p.marker}${p.seriesName}: ${formatDisplayValue(p.data, '', 2, false, false)}`).join('<br/>')}`
            }
        },
        xAxis: {
            type: 'category',
            data: xdata,
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#E8ECEF'
                }
            },
            axisLabel: {
                color: '#ffffff',
                fontSize: fitChartSize(12),
                fontWeight: 500
            }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                show: false
            },
            axisLabel: {
                color: '#ffffff',
                fontSize: fitChartSize(12),
                fontWeight: 400,
                formatter: '{value} ' + switchUnit(clickedColumn.value).unit
            }
        },

        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
                textStyle: {
                    color: '#ffffff',
                    fontSize: fitChartSize(12)
                }
            },
            {
                start: 0,
                end: 100,
                textStyle: {
                    color: '#ffffff',
                    fontSize: fitChartSize(12)
                }
            }
        ],
        series: [
            ...ydata.map((item, index) => ({
                ...item,
                name: item.name || '',
                data: item.data || [],
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                    color: color[index]
                },
                lineStyle: {
                    color: color[index]
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

defineExpose({
    openDialog
})
</script>
<style lang="scss" scoped>
.content {
    .header {
        display: flex;
        justify-content: space-between;
        padding: 0 vw(10);

        .title {
            font-size: vw(20);
            font-weight: 500;
            color: #ffffff;

            .dis {
                color: #fcbd2b;
            }
        }

        .close {
            cursor: pointer;
            font-weight: 500;
            font-size: vw(16);
            color: #ffffff;
        }
    }

    .content-body {
        .title {
            display: flex;
            align-items: center;
            background-color: rgba(29, 206, 250, 0.16);
            padding: vh(10) 0;

            .item {
                width: vw(70);
                color: #ffffff;
                font-size: vw(12);
                text-align: center;
                font-weight: 700;

                .item_txt {
                    margin: 0 vw(5);
                }
            }

            .active {
                .item_txt {
                    color: #00ffec;
                    background-color: rgba(0, 255, 236, 0.2);
                }
            }

            .line {
                width: 1px;
                height: vh(68);
                background-color: #0e1732;
            }

            .item_u,
            .item_a,
            .item_p {
                .item_title {
                    text-align: center;
                    color: #ffffff;
                    font-size: vw(12);
                    text-align: center;
                    margin-bottom: vh(5);
                    font-weight: 700;
                }

                .item_list {
                    display: flex;

                    .item {
                        cursor: pointer;
                    }
                }
            }

            .item_p {
                .item {
                    width: vw(80);
                }
            }
        }

        .list_body {
            height: vh(80);

            .list_body_ {
                .list_body_item {
                    height: vh(36);
                    display: flex;
                    color: #00ffec;
                    align-items: center;

                    .list_body_item_ {
                        padding: vh(10) vw(0);
                        width: vw(70);
                        text-align: center;
                        font-size: vw(12);
                    }

                    .off {
                        color: #e55757;
                    }

                    .on {
                        color: #27d106;
                    }

                    .list_body_item_:nth-child(1) {
                        color: #1dcefa;
                    }

                    .list_body_item_p {
                        padding: vh(10) vw(0);
                        text-align: center;
                        font-size: vw(12);
                        width: vw(80);
                    }
                }

                .line {
                    width: 1px;
                    height: vh(68);
                    background-color: transparent;
                }

                .list_body_item:nth-child(even) {
                    background-color: rgba(29, 206, 250, 0.16);
                }
            }
        }
    }

    .container-info {
        height: vh(35);
        display: flex;
        flex-direction: row-reverse;

        .container-info-pick {
            display: inline-block;
            text-align: left;
            font-weight: vw(400);
            font-size: vw(20);
            color: #ffffff;
            line-height: vh(28);

            :deep(.el-input__wrapper) {
                background: transparent;
                border: 1px solid rgba(0, 174, 236, 0.2);
                color: #fff;
                box-shadow: none;
            }

            :deep(.el-input__prefix) {
                .el-icon-date {
                    color: #3b8dff;
                }
            }

            :deep(.el-input__inner) {
                padding: 0 vw(10);
                height: vh(28);
                font-size: vw(12);
                color: #ffffff;
            }
        }
    }

    .container-chart {
        #charts {
            height: vh(380);
        }
    }
}
</style>
<style lang="scss">
.dialog-container.dialog-custom-RFD {
    width: vw(1141) !important;
    height: vh(740);
    background-color: transparent;
    background-image: url('@/assets/image/dfp/dataPickFactory/rfd_dialog_bg.png');
    background-size: 100% 100%;
    background-position: center;

    .dialog-body {
        margin: vh(30) vw(60) vh(60) vw(60);
    }
}
</style>
