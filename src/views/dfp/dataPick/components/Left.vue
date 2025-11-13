<template>
    <div class="main">
        <div class="header">
            <div class="header-title">二楼机台({{ props.secondFloorData.floorCount }}台)</div>
        </div>
        <div class="content">
            <div class="item1">
                <div class="item-title">里面(东{{ props.secondFloorData.outerData?.areaCount || 0 }}台)</div>
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
                            v-for="(item, index) in props.secondFloorData.outerData?.itemList || 0">
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
                <div class="item-title">外面(西{{ props.secondFloorData.innerData?.areaCount || 0 }}台)</div>
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
                            v-for="(item, index) in props.secondFloorData.innerData?.itemList || 0">
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
</template>

<script setup>
import { defineProps } from 'vue'
import { formatDisplayValue } from '@/utils'

const props = defineProps({
    secondFloorData: {
        type: Object,
        default: () => ({
            floorCount: 0,
            outerData: {
                areaCount: 0,
                itemList: []
            },
            innerData: {
                areaCount: 0,
                itemList: []
            }
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
    height: 100%;
    width: 100%;

    .header {
        width: 100%;
        height: vh(40);
        background-image: url('@/assets/image/dfp/dataPick/item_header_bg.png');
        background-size: 100% 100%;
        background-position: center center;

        .header-title {
            font-family: 'dfpFont';
            font-weight: normal;
            font-size: vw(20);
            color: #fff;
            line-height: vh(40);
            text-align: center;
            // background: radial-gradient(90deg, #ffffff 0%, #9fd4dd 100%);
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
        width: 100%;
        height: vh(942);
        background-image: url('@/assets/image/dfp/dataPick/left_bg.png');
        background-size: 100% 100%;
        background-position: center center;
        margin-top: vh(7);

        .item1,
        .item2 {
            .item-title {
                font-family: 'dfpFont';
                font-weight: normal;
                font-size: vw(16);
                color: #bcf0fe;
                margin-bottom: vh(5);
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
                        width: vw(60);
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
                    // height: vh(482);
                    overflow-y: auto;

                    .item-content-body-item {
                        width: 100%;
                        height: vh(23);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        // margin: vh(10) 0;
                        line-height: 1;
                        cursor: pointer;

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
            height: vh(522);
            padding: vh(10) vw(18);

            .item-content-body {
                height: vh(462);
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .item-content-body-item:nth-child(1) {
                    margin-top: vh(8);
                }
            }
        }

        .item2 {
            height: vh(400);
            padding: vh(0) vw(18);

            .item-content-body {
                height: vh(320);
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .item-content-body-item:nth-child(1) {
                    margin-top: vh(8);
                }
            }
        }
    }
}
</style>
