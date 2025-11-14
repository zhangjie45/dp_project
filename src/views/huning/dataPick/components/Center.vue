<template>
    <div class="main" ref="containerRef">
        <div class="left">
            <div class="header">
                <!-- <div class="item">
                    <div class="item-num num1">{{ formatDisplayValue(overviewData.powerOnTotal) }}</div>
                    <div class="item-name">开机台数</div>
                </div> -->
                <div class="item">
                    <div class="item-num num2">{{ formatDisplayValue(overviewData.todayActualOutput, '', false, false,
                        false) }}</div>
                    <div class="item-name">当天实际产量</div>
                </div>
                <div class="item">
                    <div class="item-num num3">{{ formatDisplayValue(overviewData.orderPlanTotal, '%') }}</div>
                    <div class="item-name">订单按计划完成率</div>
                </div>
                <div class="item">
                    <div class="item-num num4">{{ formatDisplayValue(overviewData.monthOrderTotal) }}</div>
                    <div class="item-name">本月订单总数</div>
                </div>
            </div>
            <div class="content">
                <div class="item1">
                    <div class="item1-1"></div>
                    <div class="item1-2">
                        <div class="icon"></div>
                        <div class="txt">油缸生产线</div>
                        <div class="img">
                            <div>
                                <div class="imgL"></div>
                                <!-- <div class="txt offLine">1#</div> -->
                            </div>
                            <div>
                                <div class="imgL"></div>
                                <!-- <div class="txt offLine">2#</div> -->
                            </div>
                        </div>
                    </div>
                    <div class="item1-3">
                        <div class="icon"></div>
                        <div class="txt">清洗车间</div>
                        <div class="img"></div>
                    </div>
                </div>
                <div class="item2">
                    <div class="item2-1">
                        <div class="title">
                            <div class="icon"></div>
                            <div class="txt">焊接车间</div>
                        </div>

                        <div class="list">
                            <div class="list_item" :class="{ active: LaserSelect === 'Laser1' }"
                                @click="LaserHandle('Laser1')">
                                <div class="icon"></div>
                                <div class="txt" :class="deviceStatus.Laser1 === 2 ? 'on' : 'off'">1#</div>
                            </div>
                            <div class="list_item" :class="{ active: LaserSelect === 'Laser2' }"
                                @click="LaserHandle('Laser2')">
                                <div class="icon"></div>
                                <div class="txt" :class="deviceStatus.Laser2 === 2 ? 'on' : 'off'">2#</div>
                            </div>
                            <div class="list_item" :class="{ active: LaserSelect === 'Laser3' }"
                                @click="LaserHandle('Laser3')">
                                <div class="icon"></div>
                                <div class="txt" :class="deviceStatus.Laser3 === 2 ? 'on' : 'off'">3#</div>
                            </div>
                        </div>
                    </div>
                    <div class="item2-2">
                        <div class="item2-2-1">
                            <div class="icon"></div>
                            <div class="txt">清洗车间</div>
                            <div class="img"></div>
                        </div>
                        <div class="item2-2-2">
                            <div class="icon"></div>
                            <div class="txt">柱塞生产线</div>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="item2-3">
                        <div class="txt">天井</div>
                    </div>
                    <div class="item2-4">
                        <div class="title">
                            <div class="icon"></div>
                            <div class="txt">焊接车间</div>
                        </div>

                        <div class="list">
                            <!-- :class="{ active: LaserSelect === 'Laser4' }" @click="LaserHandle('Laser4')" -->
                            <div class="list_item">
                                <div class="icon"></div>
                                <!-- <div class="txt offLine">4#</div> -->
                            </div>
                            <!-- :class="{ active: LaserSelect === 'Laser5' }" @click="LaserHandle('Laser5')" -->
                            <div class="list_item">
                                <div class="icon"></div>
                                <!-- <div class="txt offLine">5#</div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item3">
                    <div class="item3-1">
                        <div class="title">
                            <div class="icon"></div>
                            <div class="txt">旋压车间</div>
                        </div>
                        <div class="bg"></div>
                        <div class="device item1">
                            <div class="icon">
                                <!-- <div class="txt offLine">1#</div> -->
                            </div>
                        </div>
                        <div class="device item2">
                            <div class="icon">
                                <!-- <div class="txt offLine">2#</div> -->
                            </div>
                        </div>
                        <div class="device item3">
                            <div class="icon">
                                <!-- <div class="txt offLine">3#</div> -->
                            </div>
                        </div>
                        <div class="device item4">
                            <div class="icon">
                                <!-- <div class="txt offLine">6#</div> -->
                            </div>
                        </div>
                        <div class="device item5">
                            <div class="icon">
                                <!-- <div class="txt offLine">4#</div> -->
                            </div>
                        </div>
                        <div class="device item6">
                            <div class="icon">
                                <!-- <div class="txt offLine">5#</div> -->
                            </div>
                        </div>
                        <div class="device item7">
                            <div class="icon">
                                <!-- <div class="txt offLine">7#</div> -->
                            </div>
                        </div>
                    </div>
                    <div class="item3-2">
                        <div class="title">
                            <div class="icon"></div>
                            <div class="txt">旋压车间</div>
                        </div>
                        <div class="bg"></div>
                        <div class="device item1" :class="{ active: spinningSelect === 'Spinning7' }"
                            @click="handleSpinningSelect('Spinning7')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning7 === 2 ? 'on' : 'off'">7#</div>
                            </div>
                        </div>
                        <div class="device item2" :class="{ active: spinningSelect === 'Spinning5' }"
                            @click="handleSpinningSelect('Spinning5')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning5 === 2 ? 'on' : 'off'">5#</div>
                            </div>
                        </div>
                        <div class="device item3" :class="{ active: spinningSelect === 'Spinning6' }"
                            @click="handleSpinningSelect('Spinning6')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning6 === 2 ? 'on' : 'off'">6#</div>
                            </div>
                        </div>
                        <div class="device item4" :class="{ active: spinningSelect === 'Spinning3' }"
                            @click="handleSpinningSelect('Spinning3')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning3 === 2 ? 'on' : 'off'">3#</div>
                            </div>
                        </div>
                        <div class="device item5" :class="{ active: spinningSelect === 'Spinning4' }"
                            @click="handleSpinningSelect('Spinning4')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning4 === 2 ? 'on' : 'off'">4#</div>
                            </div>
                        </div>
                        <div class="device item6" :class="{ active: spinningSelect === 'Spinning1' }"
                            @click="handleSpinningSelect('Spinning1')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning1 === 2 ? 'on' : 'off'">1#</div>
                            </div>
                        </div>
                        <div class="device item7" :class="{ active: spinningSelect === 'Spinning2' }"
                            @click="handleSpinningSelect('Spinning2')">
                            <div class="icon">
                                <div class="txt" :class="deviceStatus.Spinning2 === 2 ? 'on' : 'off'">2#</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item4">
                    <div class="item4-1">
                        <div class="item4-1-1">
                            <div class="item4-1-1-1">
                                <div class="item4-1-1-1-1">
                                    <div class="txt">仓库</div>
                                </div>
                                <div class="item4-1-1-1-2">
                                    <div class="icon"></div>
                                    <div class="txt" :class="deviceStatus.RxGas1 === 2 ? 'on' : 'off'">RX气体发生炉</div>
                                </div>
                            </div>
                            <div class="item4-1-1-2">
                                <div class="txt">仓库</div>
                            </div>
                            <div class="item4-1-1-3">
                                <div class="txt">天井</div>
                            </div>
                        </div>
                        <div class="item4-1-2">
                            <div class="icon"></div>
                        </div>
                        <div class="item4-1-3">
                            <div class="title">
                                <div class="icon"></div>
                                <div class="txt">正火线</div>
                            </div>
                            <div class="list">
                                <div class="item" @click="normalizingHandle('Normalizing1')">
                                    <div class="txt"
                                        :class="{ active: normalizingSelect === 'Normalizing1', on: deviceStatus.Normalizing1 === 2, off: deviceStatus.Normalizing1 != 2 }">
                                        1号炉</div>
                                    <div class="icon"></div>
                                </div>
                                <div class="item" @click="normalizingHandle('Normalizing2')">
                                    <div class="txt off"
                                        :class="{ active: normalizingSelect === 'Normalizing2', on: deviceStatus.Normalizing2 === 2, off: deviceStatus.Normalizing2 != 2 }">
                                        2号炉</div>
                                    <div class="icon"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item4-2">
                        <div class="txt">仓库</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="right1">
                <Right11 :normalizingSelect="normalizingSelect" />
                <Right12 />
            </div>
            <div class="right2">
                <Right21 :laserSelect="LaserSelect" />
                <Right22 :spinningSelect="spinningSelect" />
            </div>
        </div>
    </div>
</template>
<script setup>
// import { getOverviewData, getDeviceStatus } from '@/api/datapick.js'
import { formatDisplayValue } from '@/utils'
import Right11 from './Right1-1.vue'
import Right12 from './Right1-2.vue'
import Right21 from './Right2-1.vue'
import Right22 from './Right2-2.vue'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const overviewData = ref({})
const deviceStatus = ref({})

const LaserSelect = ref('Laser1') //焊接车间
const normalizingSelect = ref('Normalizing1') //正火线选择
const spinningSelect = ref('Spinning7') //旋压选择

let timer = null
onMounted(() => {
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 60 * 5) // 每5分钟更新一次
})

const normalizingHandle = (val) => {
    normalizingSelect.value = val
}
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
import { deviceStatusJson } from '../data.js'
const getData = () => {
    overviewData.value = {
        powerOnTotal: 3,
        todayActualOutput: 392,
        orderPlanTotal: 100,
        monthOrderTotal: 18975
    }
    deviceStatus.value = deviceStatusJson
    // getOverviewData().then((res) => {
    //     if (res.code === 200) {
    //         overviewData.value = res.data
    //     } else {
    //         overviewData.value = {}
    //     }
    // })
    // getDeviceStatus().then((res) => {
    //     if (res.code === 200) {
    //         deviceStatus.value = res.data
    //     } else {
    //         deviceStatus.value = {}
    //     }
    // })
}

//焊接车间选中
const LaserHandle = (val) => {
    LaserSelect.value = val
}

//旋压机选中
const handleSpinningSelect = (val) => {
    spinningSelect.value = val
}
</script>

<style lang="scss" scoped>
.main {
    width: vw_hn(6600);
    height: 100%;
    display: flex;
    justify-content: center;

    // align-items: center;
    .left {
        width: vw_hn(3566);
        height: 100%;
        margin-top: vh_vh(80);

        // background-color: #bcf0fe;
        .header {
            width: vw_hn(3510);
            height: vh_vh(556);
            background-image: url('@/assets/image/huning/image/dataPick/center_1.png');
            background-size: 100% 100%;
            background-position: center center;
            margin-left: vw_hn(28);
            display: flex;
            align-items: center;
            justify-content: space-around;

            .item {
                font-family: 'huningFont';

                .item-num {
                    text-align: center;
                    font-weight: normal;
                    font-size: vw_hn(120);
                    color: #22fffe;
                    line-height: vh_vh(108);
                    margin-bottom: vh_vh(50);
                }

                .item-name {
                    font-weight: normal;
                    font-size: vw_hn(72);
                    color: #ffffff;
                    line-height: vh_vh(63);
                }
            }
        }

        .content {
            margin-top: vh_vh(20);
            width: vw_hn(3566);

            .item1 {
                display: flex;
                justify-content: space-between;
                margin-bottom: vh_vh(20);

                .item1-1 {
                    width: vw_hn(1270);
                    height: vh_vh(209);
                    background-color: rgba(0, 56, 89, 0.14);
                }

                .item1-2 {
                    width: vw_hn(1442);
                    height: vh_vh(209);
                    background-color: rgba(0, 56, 89, 0.24);
                    display: flex;
                    align-items: center;

                    .icon {
                        width: vw_hn(75);
                        height: vh_vh(74);
                        margin-left: vw_hn(50);
                        background-image: url('@/assets/image/huning/image/dataPick/center_2.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .txt {
                        font-weight: 500;
                        font-size: vw_hn(46);
                        color: #21a1ed;
                        line-height: vh_vh(74);
                        margin-left: vw_hn(20);
                    }

                    .img {
                        width: vw_hn(916);
                        // height: vh_vh(98);
                        margin-left: vw_hn(100);
                        // background-image: url('@/assets/image/huning/image/dataPick/center_3.png');
                        // background-size: 100% 100%;
                        // background-position: center center;
                        display: flex;
                        justify-content: space-evenly;

                        .imgL {
                            width: vw_hn(439);
                            height: vh_vh(127);
                            background-image: url('@/assets/image/huning/image/dataPick/center_18.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .offLine {
                            line-height: inherit;
                            text-align: center;
                            color: #909aa5;
                        }
                    }
                }

                .item1-3 {
                    width: vw_hn(813);
                    height: vh_vh(209);
                    background-color: rgba(0, 56, 89, 0.24);
                    display: flex;
                    align-items: center;

                    .icon {
                        width: vw_hn(75);
                        height: vh_vh(74);
                        margin-left: vw_hn(50);
                        background-image: url('@/assets/image/huning/image/dataPick/center_4.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .txt {
                        font-weight: 500;
                        font-size: vw_hn(46);
                        color: #21a1ed;
                        line-height: vh_vh(74);
                        margin-left: vw_hn(20);
                    }

                    .img {
                        width: vw_hn(253);
                        height: vh_vh(191);
                        margin-left: vw_hn(100);
                        // background-image: url('@/assets/image/huning/image/dataPick/center_5.png');
                        background-image: url('@/assets/image/huning/image/dataPick/center_19.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }
                }
            }

            .item2 {
                display: flex;
                justify-content: space-between;
                margin-bottom: vh_vh(20);

                .item2-1 {
                    width: vw_hn(818);
                    height: vh_vh(365);
                    background-color: rgba(0, 56, 89, 0.7);

                    .title {
                        display: flex;
                        margin-top: vh_vh(30);
                        margin-bottom: vh_vh(20);

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_7.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }
                    }

                    .list {
                        display: flex;
                        justify-content: space-between;
                        margin-left: vw_hn(20);

                        .list_item {
                            width: vw_hn(240);
                            height: vh_vh(218);
                            cursor: pointer;

                            .icon {
                                display: inline-block;
                                margin-top: vh_vh(23);
                                margin-left: vw_hn(36);
                                width: vw_hn(120);
                                height: vh_vh(170);
                                background-image: url('@/assets/image/huning/image/dataPick/center_26.png');
                                background-size: 100% 100%;
                                background-position: center center;
                            }

                            .txt {
                                position: relative;
                                left: vw_hn(170);
                                bottom: vh_vh(40);
                                font-weight: 500;
                                font-size: vw_hn(46);
                            }

                            .on {
                                color: #0db896;
                            }

                            .off {
                                color: rgba(255, 80, 80, 1);
                            }
                        }

                        .active {
                            border-radius: vw_hn(25);
                            background-color: rgba(140, 216, 255, 0.41);
                        }
                    }
                }

                .item2-2 {
                    display: flex;
                    width: vw_hn(862);
                    height: vh_vh(365);
                    flex-direction: column;
                    justify-content: space-between;

                    .item2-2-1 {
                        width: vw_hn(862);
                        height: vh_vh(158);
                        background-color: rgba(0, 56, 89, 0.24);
                        display: flex;
                        align-items: center;

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_4.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }

                        .img {
                            width: vw_hn(186);
                            height: vh_vh(141);
                            margin-left: vw_hn(180);
                            background-image: url('@/assets/image/huning/image/dataPick/center_21.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }

                    .item2-2-2 {
                        width: vw_hn(862);
                        height: vh_vh(187);
                        background-color: rgba(0, 56, 89, 0.24);
                        display: flex;
                        align-items: center;

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_10.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }

                        .img {
                            width: vw_hn(439);
                            height: vh_vh(127);
                            margin-left: vw_hn(30);
                            background-image: url('@/assets/image/huning/image/dataPick/center_18.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }
                }

                .item2-3 {
                    width: vw_hn(1012);
                    height: vh_vh(365);
                    background-color: rgba(0, 56, 89, 0.14);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .txt {
                        font-weight: 500;
                        font-size: vw_hn(46);
                        color: #e2ebf1;
                        line-height: vh_vh(36);
                    }
                }

                .item2-4 {
                    width: vw_hn(813);
                    height: vh_vh(365);
                    background-color: rgba(0, 56, 89, 0.24);

                    .title {
                        display: flex;
                        margin-top: vh_vh(30);
                        margin-bottom: vh_vh(20);

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_7.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }
                    }

                    .list {
                        display: flex;
                        justify-content: space-around;
                        margin-left: vw_hn(20);

                        .list_item {
                            width: vw_hn(240);
                            height: vh_vh(218);

                            //cursor: pointer;
                            .icon {
                                display: inline-block;
                                margin-top: vh_vh(23);
                                margin-left: vw_hn(36);
                                width: vw_hn(120);
                                height: vh_vh(170);
                                background-image: url('@/assets/image/huning/image/dataPick/center_26.png');
                                background-size: 100% 100%;
                                background-position: center center;
                            }

                            .txt {
                                position: relative;
                                left: vw_hn(170);
                                bottom: vh_vh(40);
                                font-weight: 500;
                                font-size: vw_hn(46);
                            }

                            .on {
                                color: #0db896;
                            }

                            .off {
                                color: rgba(255, 80, 80, 1);
                            }

                            .offLine {
                                color: #909aa5;
                            }
                        }

                        .active {
                            border-radius: vw_hn(25);
                            background-color: rgba(140, 216, 255, 0.41);
                        }
                    }
                }
            }

            .item3 {
                display: flex;
                justify-content: space-between;
                margin-bottom: vh_vh(20);

                .item3-1 {
                    width: vw_hn(1780);
                    height: vh_vh(550);
                    background-color: rgba(0, 56, 89, 0.24);

                    .title {
                        position: relative;
                        top: vh_vh(30);
                        display: flex;

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_11.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }
                    }

                    .bg {
                        position: relative;
                        top: vh_vh(-15);
                        left: vw_hn(400);
                        width: vw_hn(970);
                        height: vh_vh(456);
                        background-image: url('@/assets/image/huning/image/dataPick/center_22.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .device {
                        width: vw_hn(225);
                        height: vh_vh(218);

                        .icon {
                            display: inline-block;
                            margin-top: vh_vh(26);
                            margin-left: vw_hn(31);
                            width: vw_hn(178);
                            height: vh_vh(150);
                            background-image: url('@/assets/image/huning/image/dataPick/center_23.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            position: relative;
                            left: vw_hn(130);
                            top: vh_vh(145);
                            font-weight: 500;
                            font-size: vw_hn(46);
                            width: vw_hn(100);
                            height: vh_vh(53);
                        }

                        .on {
                            color: #0db896;
                        }

                        .off {
                            color: rgba(255, 80, 80, 1);
                        }

                        .offLine {
                            color: #909aa5;
                        }
                    }

                    .item1 {
                        position: absolute;
                        top: vh_vh(1400);
                        left: vw_hn(3150);
                    }

                    .item2 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(3150);
                    }

                    .item3 {
                        position: absolute;
                        top: vh_vh(1330);
                        left: vw_hn(3500);
                    }

                    .item4 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(3500);
                    }

                    .item5 {
                        position: absolute;
                        top: vh_vh(1330);
                        left: vw_hn(3900);
                    }

                    .item6 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(3900);
                    }

                    .item7 {
                        position: absolute;
                        top: vh_vh(1450);
                        left: vw_hn(4350);
                    }

                    .active {
                        border-radius: vw_hn(25);
                        background-color: rgba(140, 216, 255, 0.41);
                    }
                }

                .item3-2 {
                    width: vw_hn(1765);
                    height: vh_vh(550);
                    background-color: rgba(0, 56, 89, 0.7);

                    .title {
                        position: relative;
                        top: vh_vh(30);
                        display: flex;

                        .icon {
                            width: vw_hn(75);
                            height: vh_vh(74);
                            margin-left: vw_hn(50);
                            background-image: url('@/assets/image/huning/image/dataPick/center_11.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            font-weight: 500;
                            font-size: vw_hn(46);
                            color: #21a1ed;
                            line-height: vh_vh(74);
                            margin-left: vw_hn(20);
                        }
                    }

                    .bg {
                        position: relative;
                        top: vh_vh(-15);
                        left: vw_hn(438);
                        width: vw_hn(970);
                        height: vh_vh(456);
                        background-image: url('@/assets/image/huning/image/dataPick/center_22.png');
                        background-size: 100% 100%;
                        background-position: center center;
                    }

                    .device {
                        width: vw_hn(225);
                        height: vh_vh(218);
                        cursor: pointer;

                        .icon {
                            display: inline-block;
                            margin-top: vh_vh(26);
                            margin-left: vw_hn(31);
                            width: vw_hn(178);
                            height: vh_vh(150);
                            background-image: url('@/assets/image/huning/image/dataPick/center_23.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }

                        .txt {
                            position: relative;
                            left: vw_hn(130);
                            top: vh_vh(145);
                            font-weight: 500;
                            font-size: vw_hn(46);
                            width: vw_hn(100);
                            height: vh_vh(53);
                        }

                        .on {
                            color: #0db896;
                        }

                        .off {
                            color: rgba(255, 80, 80, 1);
                        }
                    }

                    .item1 {
                        position: absolute;
                        top: vh_vh(1450);
                        left: vw_hn(4950);
                    }

                    .item2 {
                        position: absolute;
                        top: vh_vh(1330);
                        left: vw_hn(5300);
                    }

                    .item3 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(5300);
                    }

                    .item4 {
                        position: absolute;
                        top: vh_vh(1330);
                        left: vw_hn(5800);
                    }

                    .item5 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(5800);
                    }

                    .item6 {
                        position: absolute;
                        top: vh_vh(1330);
                        left: vw_hn(6150);
                    }

                    .item7 {
                        position: absolute;
                        top: vh_vh(1600);
                        left: vw_hn(6150);
                    }

                    .active {
                        border-radius: vw_hn(25);
                        background-color: rgba(140, 216, 255, 0.41);
                    }
                }
            }

            .item4 {
                display: flex;
                justify-content: space-between;

                .item4-1 {
                    height: vh_vh(1037);

                    .item4-1-1 {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: vh_vh(20);

                        .item4-1-1-1 {
                            display: flex;
                            justify-content: space-between;
                            flex-direction: column;

                            .item4-1-1-1-1 {
                                width: vw_hn(610);
                                height: vh_vh(232);
                                background-color: rgba(0, 56, 89, 0.14);
                                margin-bottom: vh_vh(20);
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                .txt {
                                    font-weight: 500;
                                    font-size: vw_hn(46);
                                    color: #e2ebf1;
                                    line-height: vh_vh(36);
                                }
                            }

                            .item4-1-1-1-2 {
                                width: vw_hn(610);
                                height: vh_vh(307);
                                background-color: rgba(0, 56, 89, 0.7);
                                display: flex;

                                .icon {
                                    width: vw_hn(106);
                                    height: vh_vh(276);
                                    margin-left: vw_hn(100);
                                    margin-top: vh_vh(20);
                                    background-image: url('@/assets/image/huning/image/dataPick/center_24.png');
                                    background-size: 100% 100%;
                                    background-position: center center;
                                }

                                .txt {
                                    font-weight: 500;
                                    font-size: vw_hn(42);
                                    position: relative;
                                    top: vh_vh(200);
                                    left: vw_hn(50);
                                }

                                .on {
                                    color: #0db896;
                                }

                                .off {
                                    color: rgba(255, 80, 80, 1);
                                }
                            }
                        }

                        .item4-1-1-2 {
                            width: vw_hn(704);
                            height: vh_vh(450);
                            background-color: rgba(0, 56, 89, 0.14);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .txt {
                                font-weight: 500;
                                font-size: vw_hn(46);
                                color: #e2ebf1;
                                line-height: vh_vh(36);
                            }
                        }

                        .item4-1-1-3 {
                            width: vw_hn(1461);
                            height: vh_vh(450);
                            background-color: rgba(0, 56, 89, 0.14);
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .txt {
                                font-weight: 500;
                                font-size: vw_hn(46);
                                color: #e2ebf1;
                                line-height: vh_vh(36);
                            }
                        }
                    }

                    .item4-1-2 {
                        width: vw_hn(2815);
                        height: vh_vh(99);
                        background-color: rgba(0, 56, 89, 0.7);
                        margin-bottom: vh_vh(20);

                        .icon {
                            width: vw_hn(2815);
                            height: vh_vh(99);
                            background-image: url('@/assets/image/huning/image/dataPick/center_15.png');
                            background-size: 100% 100%;
                            background-position: center center;
                        }
                    }

                    .item4-1-3 {
                        width: vw_hn(2815);
                        height: vh_vh(336);
                        background-color: rgba(0, 56, 89, 0.7);
                        margin-bottom: vh_vh(20);

                        .title {
                            position: relative;
                            top: vh_vh(30);
                            display: inline-flex;

                            .icon {
                                width: vw_hn(75);
                                height: vh_vh(74);
                                margin-left: vw_hn(50);
                                background-image: url('@/assets/image/huning/image/dataPick/center_16.png');
                                background-size: 100% 100%;
                                background-position: center center;
                            }

                            .txt {
                                font-weight: 500;
                                font-size: vw_hn(46);
                                color: #21a1ed;
                                line-height: vh_vh(74);
                                margin-left: vw_hn(20);
                            }
                        }

                        .list {
                            display: inline-flex;
                            justify-content: space-between;
                            margin-left: vw_hn(100);

                            .item {
                                display: flex;
                                align-items: center;
                                width: vw_hn(1200);
                                height: vh_vh(117);
                                margin: 0 auto;
                                margin-top: vh_vh(20);
                                cursor: pointer;

                                .txt {
                                    font-weight: 500;
                                    font-size: vw_hn(42);
                                    padding: vh_vh(10) vw_hn(20);
                                    margin-right: vw_hn(50);
                                }

                                .on {
                                    color: #0db896;
                                }

                                .off {
                                    color: rgba(255, 80, 80, 1);
                                }

                                .active {
                                    border-radius: vw_hn(15);
                                    background-color: rgba(140, 216, 255, 0.41);
                                }

                                .icon {
                                    width: vw_hn(526);
                                    height: vh_vh(282);
                                    background-image: url('@/assets/image/huning/image/dataPick/center_25.png');
                                    background-size: 100% 100%;
                                    background-position: center center;
                                    margin-top: vh_vh(180);
                                }
                            }
                        }
                    }
                }

                .item4-2 {
                    width: vw_hn(730);
                    height: vh_vh(1037);
                    background-color: rgba(0, 56, 89, 0.14);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .txt {
                        font-weight: 500;
                        font-size: vw_hn(46);
                        color: #e2ebf1;
                        line-height: vh_vh(36);
                    }
                }
            }
        }
    }

    .right {
        width: vw_hn(3000);
        // margin-left: vw_hn(100);
        // background-color: #00e551;
        display: flex;
        justify-content: space-evenly;

        .right1,
        .right2 {
            width: vw_hn(1348);
            // background-color: #e2ebf1;
            // height: vh_vh(1800);
        }
    }
}
</style>
