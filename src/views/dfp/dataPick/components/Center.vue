<template>
    <div class="main" ref="containerRef">
        <div class="header">
            <div class="item">
                <div class="item-num num1">{{ formatDisplayValue(props.statisticData.deviceTotalCount) }}</div>
                <div class="item-name">设备总数</div>
            </div>
            <div class="item">
                <div class="item-num num2">{{ formatDisplayValue(props.statisticData.deviceIngCount) }}</div>
                <div class="item-name">运行中设备</div>
            </div>
            <div class="item">
                <div class="item-num num3">{{ formatDisplayValue(props.statisticData.deviceStopCount) }}</div>
                <div class="item-name">已停机设备</div>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                <div class="header-title">一楼机台({{ props.firstFloorData.floorCount }}台)</div>
            </div>
            <div class="content-body">
                <div class="item1">
                    <div class="item-title">宽线({{ props.firstFloorData.wideLineData.areaCount }}台)</div>
                    <div class="item-content">
                        <div class="item-content-header">
                            <div class="txt">序号</div>
                            <div class="txt">状态</div>
                            <!-- <div class="txt">放卷<br />张力</div> -->
                            <div class="txt">线速度</div>
                            <div class="txt">电晕<br />总电流</div>
                            <div class="txt">电晕<br />总功率</div>
                            <div class="txt">24h<br />运行效率</div>
                            <div class="txt">当班<br />运行效率</div>
                        </div>
                        <div class="item-content-body">
                            <div class="item-content-body-item" @click="props.goDetail(item)"
                                :class="item.status === 2 ? 'on' : 'off'"
                                v-for="(item, index) in props.firstFloorData.wideLineData.itemList || 0">
                                <div class="txt">{{ item.machineCode }}#</div>
                                <div class="txt">{{ item.status === 2 ? '正常' : '停机' }}</div>
                                <!-- <div class="txt">{{ formatDisplayValue(item.tension) }}</div> -->
                                <div class="txt">{{ formatDisplayValue(item.lineSpeed) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.coronaISum) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.coronaPSum) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.efficiency, '%') }}</div>
                                <div class="txt">{{ formatDisplayValue(item.shiftEfficiency, '%') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item2">
                    <div class="item-title">窄线(东{{ props.firstFloorData.narrowLineData.areaCount }}台)</div>
                    <div class="item-content">
                        <div class="item-content-header">
                            <div class="txt">序号</div>
                            <div class="txt">状态</div>
                            <!-- <div class="txt">放卷<br />张力</div> -->
                            <div class="txt">线速度</div>
                            <div class="txt">电晕<br />总电流</div>
                            <div class="txt">电晕<br />总功率</div>
                            <div class="txt">24h<br />运行效率</div>
                            <div class="txt">当班<br />运行效率</div>
                        </div>
                        <div class="item-content-body">
                            <div class="item-content-body-item" @click="props.goDetail(item)"
                                :class="item.status === 2 ? 'on' : 'off'"
                                v-for="(item, index) in props.firstFloorData.narrowLineData.itemList || 0">
                                <div class="txt">{{ item.machineCode }}#</div>
                                <div class="txt">{{ item.status === 2 ? '正常' : '停机' }}</div>
                                <!-- <div class="txt">{{ formatDisplayValue(item.tension) }}</div> -->
                                <div class="txt">{{ formatDisplayValue(item.lineSpeed) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.coronaISum) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.coronaPSum) }}</div>
                                <div class="txt">{{ formatDisplayValue(item.efficiency, '%') }}</div>
                                <div class="txt">{{ formatDisplayValue(item.shiftEfficiency, '%') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { formatDisplayValue } from '@/utils'

const props = defineProps({
    firstFloorData: {
        type: Object,
        default: () => ({
            floorCount: 0,
            narrowLineData: {
                //窄线数据
                areaCount: 0,
                itemList: []
            },
            wideLineData: {
                //宽线数据
                areaCount: 0,
                itemList: []
            }
        })
    },
    statisticData: {
        type: Object,
        default: () => ({
            // 统计数据
            deviceIngCount: 0,
            deviceStopCount: 0,
            deviceTotalCount: 0
        })
    },
    goDetail: {
        type: Function,
        default: () => { }
    }
})
</script>

<style lang="scss" scoped>
.main {
    width: vw(966);
    height: 100%;

    .header {
        width: vw(966);
        height: vh(159);
        background-image: url('@/assets/image/dfp/dataPick/center_title.png');
        background-size: 100% 100%;
        background-position: center center;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .item {
            font-family: 'dfpFont';

            .item-num {
                font-size: vw(35);
                line-height: vw(35);
                text-align: center;
            }

            .item-name {
                font-size: vw(20);
                line-height: vw(20);
                color: #fff;
            }

            .num1 {
                color: #00a8ff;
            }

            .num2 {
                color: #00e551;
            }

            .num3 {
                color: #c2584d;
            }
        }
    }

    .content {
        width: vw(923);
        height: vh(790);

        margin: vh(7) auto 0 auto;

        .content-header {
            margin-top: vh(23);
            margin-bottom: vh(7);
            width: 100%;
            height: vh(40);
            background-image: url('@/assets/image/dfp/dataPick/content_header.png');
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

        .content-body {
            height: vh(737);
            background-image: url('@/assets/image/dfp/dataPick/center_bg.png');
            background-size: 100% 100%;
            background-position: center center;
            padding: vh(13) vw(40) vh(13) vw(18);
            display: flex;
            justify-content: space-between;

            .item1,
            .item2 {
                .item-title {
                    font-family: 'dfpFont';
                    font-weight: normal;
                    font-size: vw(16);
                    color: #bcf0fe;
                    margin-bottom: vh(9);
                }

                .item-content {
                    .item-content-header {
                        width: vw(394);
                        height: vh(40);
                        background-image: url('@/assets/image/dfp/dataPick/left_header_bg.png');
                        background-size: 100% 100%;
                        background-position: center center;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .txt {
                            font-weight: 500;
                            font-size: vw(10);
                            color: #bcf0fe;
                            text-align: center;
                        }

                        .txt:nth-child(1) {
                            width: vw(65);
                        }

                        .txt:nth-child(2) {
                            width: vw(30);
                        }

                        .txt:nth-child(3) {
                            width: vw(50);
                        }

                        .txt:nth-child(4) {
                            width: vw(50);
                        }

                        .txt:nth-child(5) {
                            width: vw(50);
                        }

                        .txt:nth-child(6) {
                            width: vw(50);
                        }

                        .txt:nth-child(7) {
                            width: vw(50);
                        }

                        // .txt:nth-child(8) {
                        //     width: vw(50);
                        // }
                    }

                    .item-content-body {
                        width: vw(394);
                        overflow-y: auto;
                        height: vh(660);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .item-content-body-item {
                            width: 100%;
                            height: vh(23);
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            cursor: pointer;
                            line-height: 1;

                            .txt {
                                font-size: vw(10);
                                color: #fff;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                // 强制垂直居中
                                height: 100%;
                            }

                            .txt:nth-child(1) {
                                width: vw(65);
                                font-family: 'dfpFont';
                            }

                            .txt:nth-child(2) {
                                width: vw(30);
                            }

                            .txt:nth-child(3) {
                                width: vw(50);
                            }

                            .txt:nth-child(4) {
                                width: vw(50);
                            }

                            .txt:nth-child(5) {
                                width: vw(50);
                            }

                            .txt:nth-child(6) {
                                width: vw(50);
                            }

                            .txt:nth-child(7) {
                                width: vw(50);
                            }

                            // .txt:nth-child(8) {
                            //     width: vw(50);
                            // }
                        }

                        .off {
                            width: 100%;
                            height: vh(22);
                            background-image: url('@/assets/image/dfp/dataPick/left_item_off.png');
                            background-size: 100%;
                            background-position: center center;
                            background-repeat: no-repeat;

                            .txt:nth-child(2) {
                                color: #ff0000;
                            }
                        }

                        .on {
                            width: 100%;
                            height: vh(22);
                            background-image: url('@/assets/image/dfp/dataPick/left_item_on.png');
                            background-size: 100%;
                            background-position: center center;
                            background-repeat: no-repeat;

                            .txt:nth-child(2) {
                                color: #00e551;
                            }
                        }
                    }
                }
            }

            .item1 {
                height: vh(737);

                .item-content {
                    .item-content-body {

                        // .item-content-body-item {
                        //     // margin-bottom: vh(30);
                        // }
                        .item-content-body-item:nth-child(1) {
                            margin-top: vh(8);
                        }
                    }
                }
            }

            .item2 {
                height: vh(737);

                .item-content {
                    .item-content-body {

                        // .item-content-body-item {
                        //     // margin-bottom: vh(17);
                        //     // margin-bottom: vh(20);
                        // }
                        .item-content-body-item:nth-child(1) {
                            margin-top: vh(8);
                        }
                    }
                }
            }
        }
    }
}
</style>
