<template>
    <div class="main">
        <div class="top">
            <div class="header">
                <div class="header-title"><span class="title-txt">涂炭环保废气处理</span>设备概览(1台)</div>
            </div>
            <div class="content">
                <div class="list">
                    <div class="item">
                        <div class="item-icon">
                            <div class="icon1"></div>
                            <div class="title">温度(℃)</div>
                        </div>
                        <div class="item-content">
                            <div class="item-content-num">
                                冷却区出温度值:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.coolingZoneOutletTempTE0402) }}</span>
                            </div>
                            <div class="item-content-num">
                                脱附区出温度值:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.desopOutletTempTE0404) }}</span>
                            </div>
                            <div class="item-content-num">
                                催化室出口温度值:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.catalystOutletTempTE0412) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-icon">
                            <div class="icon2"></div>
                            <div class="title">压力(Pa)</div>
                        </div>
                        <div class="item-content">
                            <div class="item-content-num">
                                进气压力:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.inletPressurePT0101FB) }}</span>
                            </div>
                            <div class="item-content-num">
                                催化炉压力:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.catalystPressurePT0410FB) }}</span>
                            </div>
                            <div class="item-content-num">
                                RCO风机进风压力:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.rcofanInletPressurePT0406FB) }}</span>
                            </div>
                            <div class="item-content-num">
                                脱附风机压力:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.desorpFanInletPressurePT0401FB)
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="item">
                        <div class="item-icon">
                            <div class="icon3"></div>
                            <div class="title">电流(A)</div>
                        </div>
                        <div class="item-content">
                            <div class="item-content-num">
                                主风机电流:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.mainFanCurrentFBC0103) }}</span>
                            </div>
                            <div class="item-content-num">
                                脱附风机电流:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.desorpFanCurrentFBC0401) }}</span>
                            </div>
                            <div class="item-content-num">
                                RCO风机电流:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.rcoFanCurrentFBC0404) }}</span>
                            </div>
                            <div class="item-content-num">
                                回风风机电流:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.returnFanCurrentFBC0301) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-icon">
                            <div class="icon4"></div>
                            <div class="title">频率(Hz)</div>
                        </div>
                        <div class="item-content">
                            <div class="item-content-num">
                                主风机频率:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.mainFanFreqFBC0103) }}</span>
                            </div>
                            <div class="item-content-num">
                                脱附风机频率:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.desorpFanFreqFBC0401) }}</span>
                            </div>
                            <div class="item-content-num">
                                RCO风机频率:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.rcofanFreqFBC0404) }}</span>
                            </div>
                            <div class="item-content-num">
                                回风风机频率:<span class="num">{{
                                    formatDisplayValue(props.protectionEquipment.returnFanFreqFBC0301) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="header">
                <div class="header-title"><span class="title-txt">液态分布式储能柜</span>概览(26台)</div>
            </div>
            <div class="content">
                <div class="list">
                    <div class="list_header">
                        <div class="item">编号</div>
                        <div class="item">正向有功<br />总电能(kW·h)</div>
                        <div class="item">反向有功<br />总电能(kW·h)</div>
                        <!-- <div class="item">供电<br />总电压</div>
                        <div class="item">供电<br />总电流</div> -->
                        <div class="item">A相电流(A)</div>
                        <div class="item">B相电流(A)</div>
                        <div class="item">C相电流(A)</div>
                        <div class="item">SOC</div>
                    </div>
                    <div class="list_body">
                        <div class="list_body_" @mouseenter="pauseScroll" @mouseleave="resumeScroll" ref="scrolldiv">
                            <div class="list_body_item" v-for="(item, index) in props.storageEquipment"
                                @click="openDialog(item)">
                                <div class="list_body_item_">{{ formatDisplayValue(item.machineCode, '#') }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.gnCurrentActiveTotalEnergy, '',
                                    2, false, false) }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.gnCurrentReverseTotalEnergy, '',
                                    2, false, false) }}</div>
                                <!-- <div class="list_body_item_">{{ formatDisplayValue(item.powerSupplyVoltage) }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.powerSupplyCurrent) }}</div> -->
                                <div class="list_body_item_">{{ formatDisplayValue(item.gnPhaseACurrent, '', 2, false,
                                    false) }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.gnPhaseBCurrent, '', 2, false,
                                    false) }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.gnPhaseCCurrent, '', 2, false,
                                    false) }}</div>
                                <div class="list_body_item_">{{ formatDisplayValue(item.soc, '', 2, false, false) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CNDialog ref="cnDialog" />
    </div>
</template>
<script setup>
import { defineProps, nextTick, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { formatDisplayValue } from '@/utils'
import CNDialog from './CNDialog.vue'
let scrolldiv = ref(null)
const animationFrameId = ref(null)
const cnDialog = ref(null)

const openDialog = (val) => {
    cnDialog.value.openDialog(val)
}

const props = defineProps({
    protectionEquipment: {
        type: Object,
        default: () => ({})
    },
    storageEquipment: {
        type: Array,
        default: () => []
    }
})
// 监听数据变化
watch(
    () => props.storageEquipment,
    (newData) => {
        nextTick(() => {
            calculateScrollSpeed()
        })
    },
    { deep: true, immediate: true }
)
// 更智能的滚动速度计算
const calculateScrollSpeed = () => {
    if (!scrolldiv.value) return

    const dataLength = props.storageEquipment.length

    if (dataLength <= 10) {
        scrolldiv.value.style.animationDuration = '0s'
        scrolldiv.value.style.animationPlayState = 'paused'
        return
    }

    // 直接设置固定的时间，根据数据量调整
    let duration
    if (dataLength <= 20) {
        duration = '10s' // 10秒一圈
    } else if (dataLength <= 50) {
        duration = '15s' // 15秒一圈
    } else {
        duration = '20s' // 20秒一圈
    }

    scrolldiv.value.style.animationDuration = duration
    scrolldiv.value.style.animationPlayState = 'running'
}

// 鼠标悬停控制
const pauseScroll = () => {
    if (scrolldiv.value) {
        scrolldiv.value.style.animationPlayState = 'paused'
    }
}

const resumeScroll = () => {
    if (scrolldiv.value) {
        scrolldiv.value.style.animationPlayState = 'running'
    }
}

onMounted(() => {
    nextTick(() => {
        calculateScrollSpeed()
    })
})

onBeforeUnmount(() => {
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value)
    }
})
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

                .title-txt {
                    color: #fcbd2b;
                }
            }
        }

        .content {
            padding: vh(33) vw(31) 0 vw(31);

            .list {
                display: flex;
                justify-content: space-between;

                .item {
                    width: vw(302);
                    height: vh(170);
                    background-image: url('@/assets/image/dfp/dataPickFactory/center_2.png');
                    background-position: center;
                    background-size: 100% 100%;

                    .item-icon {
                        display: flex;
                        position: relative;
                        align-items: flex-end;
                        justify-content: center;
                        top: vh(-32);
                        left: vw(-10);

                        .icon1 {
                            display: inline-block;
                            width: vw(67);
                            height: vh(64);
                            background-image: url('@/assets/image/dfp/dataPickFactory/center_3.png');
                            background-position: center;
                            background-size: 100% 100%;
                        }

                        .icon2 {
                            display: inline-block;
                            width: vw(67);
                            height: vh(64);
                            background-image: url('@/assets/image/dfp/dataPickFactory/center_4.png');
                            background-position: center;
                            background-size: 100% 100%;
                        }

                        .icon3 {
                            display: inline-block;
                            width: vw(67);
                            height: vh(64);
                            background-image: url('@/assets/image/dfp/dataPickFactory/center_5.png');
                            background-position: center;
                            background-size: 100% 100%;
                        }

                        .icon4 {
                            display: inline-block;
                            width: vw(67);
                            height: vh(64);
                            background-image: url('@/assets/image/dfp/dataPickFactory/center_6.png');
                            background-position: center;
                            background-size: 100% 100%;
                        }

                        .title {
                            display: inline-block;
                            font-weight: 500;
                            font-size: vw(14);
                            color: #ffffff;
                        }
                    }

                    .item-content {
                        position: relative;
                        top: vh(-32);
                        height: vh(100);
                        padding: vh(17) vw(17);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .item-content-num {
                            font-weight: 400;
                            font-size: vw(12);
                            color: #22b4fe;

                            .num {
                                color: #fcbd2b;
                            }
                        }
                    }
                }
            }

            .list:nth-child(1) {
                margin-bottom: vh(35);
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
            .list {
                width: 100%;
                height: 100%;

                .list_header {
                    margin: 0 vw(15);
                    height: vh(57);
                    line-height: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: center;
                    background-color: rgba(29, 206, 250, 0.16);
                    font-weight: 400;
                    font-size: vw(12);
                    color: #ffffff;

                    .item {
                        padding: vh(10) vw(0);
                        text-align: center;
                    }

                    .item:nth-child(1) {
                        width: vw(55);
                    }

                    .item:nth-child(2) {
                        flex: 1;
                    }

                    .item:nth-child(3) {
                        flex: 1;
                    }

                    .item:nth-child(4) {
                        flex: 1;
                    }

                    .item:nth-child(5) {
                        flex: 1;
                    }

                    .item:nth-child(6) {
                        flex: 1;
                    }

                    .item:nth-child(7) {
                        flex: 1;
                    }
                }

                .list_body {
                    margin: 0 vw(15);
                    height: vh(350);
                    overflow: hidden;

                    .list_body_ {
                        animation: scroll linear infinite;

                        .list_body_item {
                            height: vh(36);
                            display: flex;
                            color: #00ffec;
                            justify-content: space-between;
                            cursor: pointer;

                            .list_body_item_ {
                                padding: vh(10) vw(0);
                                text-align: center;
                                font-size: vw(12);
                            }

                            .list_body_item_:nth-child(1) {
                                color: #1dcefa;
                                width: vw(55);
                            }

                            .list_body_item_:nth-child(2) {
                                flex: 1;
                            }

                            .list_body_item_:nth-child(3) {
                                flex: 1;
                            }

                            .list_body_item_:nth-child(4) {
                                flex: 1;
                            }

                            .list_body_item_:nth-child(5) {
                                flex: 1;
                            }

                            .list_body_item_:nth-child(6) {
                                flex: 1;
                            }

                            .list_body_item_:nth-child(7) {
                                flex: 1;
                            }
                        }
                    }

                    .list_body_:hover {
                        animation-play-state: paused;
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
        }
    }
}
</style>
