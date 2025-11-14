<template>
    <div class="main-r1-2">
        <div class="header">
            <div class="txt">RX气体发生炉</div>
        </div>
        <div class="body">
            <div class="top">
                <div class="item">
                    <div class="title">
                        <div class="icon item1"></div>
                        <div class="txt">产气量</div>
                    </div>
                    <div class="num">{{ formatDisplayValue(rxLineData.rxgasProduction) }}</div>
                </div>
                <div class="item">
                    <div class="title">
                        <div class="icon item2"></div>
                        <div class="txt">空气进气量</div>
                    </div>
                    <div class="num">{{ formatDisplayValue(rxLineData.airIntake) }}</div>
                </div>
                <div class="item">
                    <div class="title">
                        <div class="icon item3"></div>
                        <div class="txt">天然气进气量</div>
                    </div>
                    <div class="num">{{ formatDisplayValue(rxLineData.naturalGasFlow) }}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="list">
                    <div class="list-item">
                        <div class="title">露点</div>
                        <div class="content">
                            <div class="item">
                                <div class="item-value" style="color: #ff9407">{{
                                    formatDisplayValue(rxLineData.dewPointActual, '°C') }}</div>
                                <div class="item-title">当前值</div>
                            </div>
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.dewPointSet, '°C') }}</div>
                                <div class="item-title">设定值</div>
                            </div>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="title">空燃比</div>
                        <div class="content">
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.airFuelRatioActual) }}</div>
                                <div class="item-title">当前值</div>
                            </div>
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.airFuelRatioSet) }}</div>
                                <div class="item-title">设定值</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="list-item">
                        <div class="title">主炉S偶温度</div>
                        <div class="content">
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.mainFurnaceTempActual, '°C') }}
                                </div>
                                <div class="item-title">当前值</div>
                            </div>
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.mainFurnaceTempSet, '°C') }}
                                </div>
                                <div class="item-title">设定值</div>
                            </div>
                        </div>
                    </div>
                    <div class="list-item">
                        <div class="title">产气压力</div>
                        <div class="content">
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.gasPressureActual, 'MPa') }}
                                </div>
                                <div class="item-title">当前值</div>
                            </div>
                            <div class="item">
                                <div class="item-value">{{ formatDisplayValue(rxLineData.gasPressureSet, 'MPa') }}</div>
                                <div class="item-title">设定值</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { getRxLine } from '@/api/datapick'
import { formatDisplayValue } from '@/utils'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const rxLineData = ref({})
let timer = null
onMounted(() => {
    // rxLineData.value = {
    //     airIntake: 2425,
    //     naturalGasFlow: 9992425,
    //     dewPointActual: 2425,
    //     dewPointSet: 2425,
    //     airFuelRatioActual: 2425,
    //     airFuelRatioSet: 2425,
    //     mainFurnaceTempSet: 2425,
    //     mainFurnaceTempActual: 2425,
    //     gasPressureSet: 2425,
    //     gasPressureActual: 2425,
    //     rxgasProduction: 2425
    // }
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 60 * 5) // 每5分钟更新一次
})
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
import { left2Json } from '../data.js'
function getData () {
    rxLineData.value = left2Json
    // getRxLine({ deviceName: 'RxGas1' }).then((res) => {
    //     if (res.code === 200) {
    //         rxLineData.value = res.data
    //     } else {
    //         rxLineData.value = {}
    //     }
    // })
}
</script>

<style lang="scss" scoped>
.main-r1-2 {
    margin-top: vh_vh(80);
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
        margin-top: vh_vh(40);
        width: vw_hn(1346);
        height: vh_vh(910);

        // background-color: #e2ebf1;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: vw_hn(1346);
            margin-top: vh_vh(60);

            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;

                    .icon {
                        width: vw_hn(73);
                        height: vw_hn(73);
                        margin-right: vw_hn(20);
                    }

                    .txt {
                        font-size: vw_hn(36);
                        color: #24aeff;
                    }

                    .item1 {
                        background-image: url('@/assets/image/huning/image/dataPick/right_2.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .item2 {
                        background-image: url('@/assets/image/huning/image/dataPick/right_3.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .item3 {
                        background-image: url('@/assets/image/huning/image/dataPick/right_4.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }
                }

                .num {
                    margin-top: vh_vh(60);
                    width: vw_hn(363);
                    height: vh_vh(100);
                    background-image: url('@/assets/image/huning/image/dataPick/right_5.png');
                    background-size: 100% 100%;
                    background-position: center center;
                    text-align: center;
                    line-height: vh_vh(100);
                    font-family: 'huningFont';
                    font-size: vw_hn(50);
                    color: #22e3ff;
                }
            }
        }

        .bottom {
            margin-top: vh_vh(80);
            width: vw_hn(1346);
            height: vh_vh(499);
            background-image: url('@/assets/image/huning/image/dataPick/right_6.png');
            background-size: 100% 100%;
            background-position: center center;

            // padding: vh_vh(3) vw_hn(17);
            .list {
                display: flex;
                justify-content: space-between;
                margin-bottom: vh_vh(5);

                // padding: vh_vh(18.5) vw_hn(20);
                .list-item {
                    width: vw_hn(656);
                    height: vh_vh(200.7);
                    padding: vh_vh(25) vw_hn(30);

                    .title {
                        margin-top: vh_vh(30);
                        font-weight: 400;
                        font-weight: 400;
                        font-size: vw_hn(36);
                        color: #22fffe;
                        text-align: left;
                        margin-left: vw_hn(90);
                    }

                    .content {
                        display: flex;
                        justify-content: space-around;
                        margin-top: vh_vh(20);

                        .item {
                            flex: 1;
                            margin-left: vw_hn(90);

                            .item-value {
                                font-weight: 500;
                                font-size: vw_hn(40);
                                color: #0db896;
                            }

                            .item-title {
                                margin-top: vh_vh(15);
                                font-weight: 400;
                                font-size: vw_hn(34);
                                color: #ededed;
                            }
                        }

                        .item:nth-child(2) {
                            .item-value {
                                color: #24c9ff;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
