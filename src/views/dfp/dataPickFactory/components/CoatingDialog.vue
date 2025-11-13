<template>
    <Dialog v-model="showDialog" customClass="dialog-custom-coating" title="提示信息" size="medium" :show-cancel="false"
        :show-confirm="false" :show-header="false" confirm-text="确定" cancel-text="取消" @confirm="handleConfirm"
        @cancel="handleCancel" @close="handleClose">
        <div class="content">
            <div class="header">
                <div class="title"><span class="dis">锂电双面凹版涂布机</span>详情</div>
                <div class="close" @click="handleClose">关闭</div>
            </div>
            <div class="content-body">
                <div class="container">
                    <div class="card-container-top">
                        <div class="list_1" v-for="(item, index) in deviceList" :key="item.machineryId">
                            <div class="list_1_dis">{{ item.deviceTitle }}</div>
                            <div :class="[item.status == 2 ? 'list_1_img_ing' : item.status == 1 ? 'list_1_img_standby' : 'list_1_img_error', index === selectMachineryIndex ? 'active' : '']"
                                @click="clickBtn(item, index)">
                                <div class="list_num">{{ item.machineCode }}#</div>
                            </div>
                        </div>
                    </div>
                    <div class="container-table2">
                        <div class="container-table2-left">
                            <div class="container-table2-left-header">涂碳速度 m/min</div>
                            <!-- <el-tooltip :content="tableData.currentSpeed" placement="top" effect="dark"> -->
                            <div class="container-table2-left-body" :class="clickedColumn === 0 ? 'active' : ''"
                                style="cursor: pointer" @click="(e) => handleClickedColumn(e, 0)">{{
                                    formatDisplayValue(tableData.currentSpeed) }}</div>
                            <!-- </el-tooltip> -->
                        </div>
                        <div class="container-table2-right">
                            <div class="container-table2-right-item">
                                <div class="item_header">
                                    <div class="item_header_title">预烘箱（℃）</div>
                                    <div class="item_header_body">
                                        <div class="item_header_body_i">预烘箱1</div>
                                        <div class="item_header_body_i">预烘箱2</div>
                                        <div class="item_header_body_i">预烘箱3</div>
                                    </div>
                                </div>
                                <div class="item_body">
                                    <!-- <el-tooltip :content="tableData.preheatOven1" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 1 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 1)">{{
                                            formatDisplayValue(tableData.preheatOven1) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.preheatOven2" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 2 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 2)">{{
                                            formatDisplayValue(tableData.preheatOven2) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.preheatOven3" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 3 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 3)">{{
                                            formatDisplayValue(tableData.preheatOven3) }}</div>
                                    <!-- </el-tooltip> -->
                                </div>
                            </div>
                            <div class="container-table2-right-item">
                                <div class="item_header">
                                    <div class="item_header_title">烘箱温度（℃）</div>
                                    <div class="item_header_body">
                                        <div class="item_header_body_i">上一区</div>
                                        <div class="item_header_body_i">上二区</div>
                                        <div class="item_header_body_i">上三区</div>
                                        <div class="item_header_body_i">上四区</div>
                                        <div class="item_header_body_i">上五区</div>
                                        <div class="item_header_body_i">下一区</div>
                                        <div class="item_header_body_i">下二区</div>
                                        <div class="item_header_body_i">下三区</div>
                                        <div class="item_header_body_i">下四区</div>
                                    </div>
                                </div>
                                <div class="item_body">
                                    <!-- <el-tooltip :content="tableData.upperOven1" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 4 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 4)">{{
                                            formatDisplayValue(tableData.upperOven1) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.upperOven2" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 5 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 5)">{{
                                            formatDisplayValue(tableData.upperOven2) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.upperOven3" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 6 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 6)">{{
                                            formatDisplayValue(tableData.upperOven3) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.upperOven4" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 7 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 7)">{{
                                            formatDisplayValue(tableData.upperOven4) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.upperOven5" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 8 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 8)">{{
                                            formatDisplayValue(tableData.upperOven5) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.lowerOven1" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 9 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 9)">{{
                                            formatDisplayValue(tableData.lowerOven1) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.lowerOven2" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 10 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 10)">{{
                                            formatDisplayValue(tableData.lowerOven2) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.lowerOven3" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 11 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 11)">{{
                                            formatDisplayValue(tableData.lowerOven3) }}</div>
                                    <!-- </el-tooltip> -->

                                    <!-- <el-tooltip :content="tableData.lowerOven4" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 12 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 12)">{{
                                            formatDisplayValue(tableData.lowerOven4) }}</div>
                                    <!-- </el-tooltip> -->
                                </div>
                            </div>
                            <div class="container-table2-right-item">
                                <div class="item_header">
                                    <div class="item_header_title">收卷张力</div>
                                    <div class="item_header_body">
                                        <div class="item_header_body_i">S%</div>
                                        <div class="item_header_body_i">L%</div>
                                        <div class="item_header_body_i">实时</div>
                                    </div>
                                </div>
                                <div class="item_body">
                                    <!-- <el-tooltip :content="tableData.taperStart" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 13 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 13)">{{
                                            formatDisplayValue(tableData.taperStart) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.taperEnd" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 14 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 14)">{{
                                            formatDisplayValue(tableData.taperEnd) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.windingTension" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 15 ? 'active' : ''"
                                        @click="(e) => handleClickedColumn(e, 15)">{{
                                            formatDisplayValue(tableData.windingTension) }}</div>
                                    <!-- </el-tooltip> -->
                                </div>
                            </div>
                            <div class="container-table2-right-item">
                                <div class="item_header">
                                    <div class="item_header_title">实时米数 (m)</div>
                                    <div class="item_header_body">
                                        <div class="item_header_body_i" v-if="deviceName === '城堡'">A轴</div>
                                        <div class="item_header_body_i" v-if="deviceName === '城堡'">B轴</div>
                                        <div class="item_header_body_i" v-if="deviceName === '捷盟'">放卷</div>
                                        <div class="item_header_body_i" v-if="deviceName === '捷盟'">收卷</div>
                                    </div>
                                </div>
                                <div class="item_body">
                                    <!-- <el-tooltip :content="tableData.axisAMeter" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 16 ? 'active' : ''"
                                        v-if="deviceName === '城堡'" @click="(e) => handleClickedColumn(e, 16)">{{
                                            formatDisplayValue(tableData.axisAMeter) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.axisBMeter" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 17 ? 'active' : ''"
                                        v-if="deviceName === '城堡'" @click="(e) => handleClickedColumn(e, 17)">{{
                                            formatDisplayValue(tableData.axisBMeter) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.ZHOU" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 16 ? 'active' : ''"
                                        v-if="deviceName === '捷盟'" @click="(e) => handleClickedColumn(e, 16)">{{
                                            formatDisplayValue(tableData.axisAMeter) }}</div>
                                    <!-- </el-tooltip> -->
                                    <!-- <el-tooltip :content="tableData.FANG" placement="top" effect="dark"> -->
                                    <div class="item_body_i_body" :class="clickedColumn === 17 ? 'active' : ''"
                                        style="border-right: 0px" v-if="deviceName === '捷盟'"
                                        @click="(e) => handleClickedColumn(e, 17)">{{
                                            formatDisplayValue(tableData.axisBMeter) }}</div>
                                    <!-- </el-tooltip> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-info">
                        <div class="container-info-pick">
                            <el-date-picker v-model="date" size="small" value-format="YYYY-MM-DD" type="date"
                                placeholder="请选择日期" @change="getData"></el-date-picker>
                        </div>
                    </div>
                    <div class="container-chart">
                        <div id="device_charts" ref="chart" v-chart-resize class="chart" />
                    </div>
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onBeforeUnmount, nextTick, getCurrentInstance, watch } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { debounce, fitChartSize, formatDisplayValue } from '@/utils'
// import { getCarbonDetail, getCoatingChart } from '@/api/factory'
let DEVICE_MAP = {
    捷盟: {
        0: 'main_machine_running_speed',
        1: 'preheat_oven1_real_time_temperature',
        2: 'preheat_oven2_real_time_temperature',
        3: 'preheat_oven3_real_time_temperature',
        4: 'reverse_coating1_oven_realtime_temperature',
        5: 'reverse_coating2_oven_realtime_temperature',
        6: 'reverse_coating3_oven_realtime_temperature',
        7: 'reverse_coating4_oven_realtime_temperature',
        8: 'reverse_coating5_oven_realtime_temperature',
        9: 'positive_coating1_oven_realtime_temperature',
        10: 'positive_coating2_oven_realtime_temperature',
        11: 'positive_coating3_oven_realtime_temperature',
        12: 'positive_coating4_oven_realtime_temperature',
        13: 'taper_start',
        14: 'taper_end',
        15: 'winding_realtime_tension',
        16: 'unwinding_current_meter',
        17: 'winding_current_meter'
    },
    城堡: {
        0: 'current_speed',
        1: 'preheat_oven1',
        2: 'preheat_oven2',
        3: 'preheat_oven3',
        4: 'upper_oven1',
        5: 'upper_oven2',
        6: 'upper_oven3',
        7: 'upper_oven4',
        8: 'upper_oven5',
        9: 'lower_oven1',
        10: 'lower_oven2',
        11: 'lower_oven3',
        12: 'lower_oven4',
        13: 'taper_start',
        14: 'taper_end',
        15: 'winding_tension',
        16: 'axis_a_meter',
        17: 'axis_b_meter'
    }
}
const { proxy } = getCurrentInstance()
const showDialog = ref(false)
const deviceName = ref('') //选中设备的类型 城堡还是捷盟  用于表格显示
const selectMachineryIndex = ref(0) //选中设备的下标 用于高亮显示
const date = ref('')
const deviceList = ref([])
const tableData = ref({})
let charts = null
const resizeHandler = ref(null)
const deviceChartsData = ref()
const chart = ref(null)
const clickedColumn = ref(0) //选中表格的下标
const clickedColumnId = ref('') //选中表格的id 用于查询下方的对应图表
const openDialog = () => {
    showDialog.value = true
}
const handleConfirm = () => {
    console.log('确认按钮被点击')
    // 执行确认逻辑
}

const handleCancel = () => {
    console.log('取消按钮被点击')
    // 执行取消逻辑
}

const handleClose = () => {
    selectMachineryIndex.value = 0
    clickedColumn.value = 0
    clickedColumnId.value = ''
    date.value = ''
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
import { carbonCoatingJson, carbonCoatingChartJson } from '../data'
watch(
    () => showDialog.value,
    (newVal) => {
        if (newVal) {
            //获取涂炭详情
            deviceList.value = carbonCoatingJson
            tableData.value = { ...carbonCoatingJson[selectMachineryIndex.value] }
            deviceName.value = carbonCoatingJson[0].deviceTitle
            clickedColumnId.value = DEVICE_MAP[deviceName.value][clickedColumn.value]
            getData()
            // getCarbonDetail().then((res) => {
            //     if (res.code === 200) {
            //         deviceList.value = res.data
            //         tableData.value = { ...res.data[selectMachineryIndex.value] }
            //         deviceName.value = res.data[0].deviceTitle
            //         clickedColumnId.value = DEVICE_MAP[deviceName.value][clickedColumn.value]
            //         getData()
            //     }
            // })
        } else {
            if (!charts) {
                return
            }
            console.log('销毁图表')
            window.removeEventListener('resize', resizeHandler.value)
            charts.dispose()
            charts = null
        }
        // getData()
    },
    {
        deep: true
    }
)

function clickBtn (item, index) {
    deviceName.value = item.deviceTitle
    selectMachineryIndex.value = index
    tableData.value = { ...deviceList.value[selectMachineryIndex.value] }
    clickedColumnId.value = DEVICE_MAP[deviceName.value][clickedColumn.value]
    getData()
}

const getData = () => {
    let params = {
        date: date.value,
        fieldName: clickedColumnId.value,
        machineCode: tableData.value.machineCode
    }
    deviceChartsData.value = carbonCoatingChartJson
    nextTick(() => {
        if (charts) {
            updateChartOptions()
        } else {
            initBarChart()
        }
    })
    // getCoatingChart(params).then((res) => {
    //     if (res.code === 200) {
    //         deviceChartsData.value = res.data
    //         nextTick(() => {
    //             if (charts) {
    //                 updateChartOptions()
    //             } else {
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

const handleClickedColumn = (val, index) => {
    clickedColumn.value = index
    clickedColumnId.value = DEVICE_MAP[deviceName.value][index]
    getData()
}

const switchUnit = (val) => {
    if (val < 1) return { unit: 'm/min', dis: '涂碳速度(m/min)' }
    if (val < 4) return { unit: '℃', dis: '预烘箱（℃）' }
    if (val < 13) return { unit: '℃', dis: '烘箱温度（℃）' }
    if (val > 15) return { unit: 'm', dis: '实时米数(m)' }
    return { unit: '', dis: '收卷张力' }
}
const validateChartData = (chartData) => {
    if (!chartData) return { xdata: [], ydata: [] }

    return {
        xdata: Array.isArray(chartData.xdata) ? chartData.xdata : [],
        ydata: Array.isArray(chartData.ydata) ? chartData.ydata : []
    }
}
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
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#02184A',
            borderColor: '#00ffec',
            textStyle: {
                color: '#fff',
                fontSize: fitChartSize(12)
            },
            formatter: (param) => {
                return param[0].name + '<br/>' + param[0].marker + switchUnit(clickedColumn.value).dis + ': ' + formatDisplayValue(param[0].value, '', 2, false, false)
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
            {
                data: ydata[0].data,
                name: ydata[0].name,
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                    color: '#00F9FF'
                },
                lineStyle: {
                    color: '#00F9FF'
                },
                areaStyle: {
                    opacity: 0.7,
                    color: new proxy.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(31, 195, 206, 1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(216, 216, 216, 0)'
                        }
                    ])
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
}

.container {
    width: 100%;

    // padding: vh(15) vw(30) vh(30) vw(30);
    .card-container-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        margin-left: vw(1);

        .list_1 {
            width: vw(114);
            height: vh(31);
            display: inline-block;
            // margin-right: vw(24);

            //运行
            .list_1_img_ing {
                width: 100%;
                height: vh(31);
                border-radius: 4px;
                background: #0aa364;
                justify-content: center;
                /* 水平居中 */
                align-items: center;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                .list_num {
                    font-weight: 400;
                    font-size: vw(13);
                    color: #ffffff;
                    margin: 0 auto;
                }
            }

            .list_1_img_ing.active {
                background: #00d980;
            }

            /**故障 */
            .list_1_img_error {
                width: 100%;
                height: vh(31);
                border-radius: 4px;
                background: #c44444;

                justify-content: center;
                /* 水平居中 */
                align-items: center;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                .list_num {
                    font-weight: 400;
                    font-size: vw(13);
                    color: #ffffff;
                    margin: 0 auto;
                }
            }

            .list_1_img_error.active {
                background: #f97d7d;
            }

            .list_1_img_q {
                width: 100%;
                height: vh(31);
                background: linear-gradient(0, #2f2955 0%, #8b7bed 100%);
                box-shadow: inset 0px 0px 20px 0px #7669cc;
                border: 1px solid;
                border-image: linear-gradient(360deg, #312b5a, #a69ce9, #a69ce9) 1 1;
                justify-content: center;
                /* 水平居中 */
                align-items: center;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                .list_num {
                    font-weight: 400;
                    font-size: vw(13);
                    color: #ffffff;
                    margin: 0 auto;
                }
            }

            /**待机 */
            .list_1_img_standby {
                width: 100%;
                height: vh(31);
                border-radius: 4px;
                background: #828282;

                justify-content: center;
                /* 水平居中 */
                align-items: center;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                .list_num {
                    font-weight: 400;
                    font-size: vw(13);
                    color: #ffffff;
                    margin: 0 auto;
                }
            }

            .list_1_img_standby.active {
                background: #b1b1b1;
            }

            .list_1_dis {
                width: 100%;
                height: vh(28);
                text-align: center;
                margin-top: vh(10);
                font-weight: 500;
                font-size: vw(16);
                color: #ffffff;
            }
        }
    }

    .container-info {
        margin-top: vh(10);
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

    .container-table2 {
        display: flex;
        width: 100%;
        height: vh(160);
        margin-top: vh(50);
        background: transparent;
        border: 1px solid #00a8f2;

        &-left {
            width: vw(85);
            border-right: 1px solid #00a8f2;

            &-header {
                text-align: center;
                height: vh(45);
                font-weight: 500;
                font-size: vw(12);
                color: #e8f0ff;
                padding: vh(30) vw(5);
                border-bottom: 1px solid #00a8f2;
            }

            &-body {
                text-align: center;
                font-weight: 500;
                font-size: vw(12);
                color: #fff;
                height: vh(55);
                line-height: vh(55);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .active {
                color: #00f9ff;
            }
        }

        &-right {
            width: calc(100% - vw(85));
            display: flex;

            &-item {
                .item_header {
                    font-weight: 500;
                    font-size: vw(12);
                    color: #ffffff;
                    text-align: center;
                    height: vh(105);
                    border-bottom: 1px solid #00a8f2;
                    border-right: 1px solid #00a8f2;

                    &_title {
                        line-height: vh(58);
                        border-bottom: 1px solid #00a8f2;
                    }

                    &_body {
                        display: flex;

                        &_i {
                            font-size: vw(12);
                            line-height: vh(46);
                            border-right: 1px solid #00a8f2;
                            flex: 1;
                        }

                        &_i:last-child {
                            border-right: 0px;
                        }
                    }
                }

                .item_body {
                    display: flex;
                    border-right: 1px solid #019fe6;

                    .item_body_i_body {
                        font-weight: 500;
                        font-size: vw(12);
                        color: #fff;
                        text-align: center;
                        border-right: 1px solid #00a8f2;
                        flex: 1;
                        height: vh(55);
                        line-height: vh(55);
                        overflow: hidden; //表示不显示超过对象尺寸的内容
                        white-space: nowrap; //表示文本不换行,除非遇到<br>
                        text-overflow: ellipsis; //表示当对象内文本溢出时显示省略标记（...）
                        cursor: pointer;
                    }

                    .active {
                        color: #00f9ff;
                    }

                    .item_body_i_body:last-child {
                        border-right: 0px;
                    }
                }
            }

            &-item:nth-child(1) {
                width: vw(255);
            }

            &-item:nth-child(2) {
                width: vw(608);
            }

            &-item:nth-child(3) {
                width: vw(179);
            }

            &-item:nth-child(4) {
                width: vw(183);
            }

            &-item:last-child {

                .item_header,
                .item_body {
                    border-right: 0;
                }
            }
        }
    }

    .container-chart {
        #device_charts {
            height: vh(300);
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
<style lang="scss">
.dialog-container.dialog-custom-coating {
    width: vw(1466) !important;
    height: vh(740);
    background-color: transparent;
    background-image: url('@/assets/image/dfp/dataPickFactory/tt_dialog_bg.png');
    background-size: 100% 100%;
    background-position: center;

    .dialog-body {
        margin: vh(30) vw(60) vh(30) vw(60);
    }
}
</style>
