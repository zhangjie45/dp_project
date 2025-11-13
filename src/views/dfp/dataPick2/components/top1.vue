<template>
    <div class="main">
        <div class="header">
            <div class="header-title">设备信息</div>
        </div>
        <div class="content-1">
            <div class="dis">
                <div class="icon"></div>
                <span>设备信息</span>
            </div>
            <div class="txt">设备名称:&nbsp;倒卷机{{ props.deviceIndex }}#</div>
            <div class="txt">最近活跃时间:&nbsp;{{ props.rewindData.lastActiveTime || '-' }}</div>
            <div class="txt">
                开机率:
                <span class="date-type">当天</span>
                <span class="date-val">{{ formatDisplayValue(props.rewindData.openRateRecent1, '%') }}</span>
                <span class="date-type">近7天</span>
                <span class="date-val">{{ formatDisplayValue(props.rewindData.openRateRecent7, '%') }}</span>
                <span class="date-type">近30天</span>
                <span class="date-val">{{ formatDisplayValue(props.rewindData.openRateRecent30, '%') }}</span>
            </div>
            <div class="txt">
                停机时长:
                <span class="date-type">当班</span>
                <span class="date-val">{{ formatDisplayValue(props.rewindData.shiftStopTime, '小时') }}</span>
                <span class="date-type">近24H</span>
                <span class="date-val">{{ formatDisplayValue(props.rewindData.rec24StopTime, '小时') }}</span>
            </div>
            <div class="txt">
                设备状态:&nbsp;
                <div class="status" v-if="props.rewindData.status !== null && props.rewindData.status !== undefined"
                    :class="props.rewindData.status === 2 ? 'on' : 'off'">
                    {{ props.rewindData.status === 2 ? '运行' : '停机' }}
                </div>
                <div style="display: inline-block" v-else>-</div>
            </div>
        </div>
        <div class="header">
            <div class="header-title">放卷数据监测</div>
        </div>
        <div class="content-2">
            <div class="item">
                <div class="item-num" v-if="![28, 33, 32].includes(props.deviceIndex)">{{
                    formatDisplayValue(props.rewindData.unwindCurrentTension) }}</div>
                <div class="item-num" v-else>{{ formatDisplayValue(props.rewindData.unwindCurrentDiameter) }}</div>
                <div class="item-txt" v-if="![28, 33, 32].includes(props.deviceIndex)">放卷当前张力(N)</div>
                <div class="item-txt" v-else>卷径(mm)</div>
            </div>
            <div class="item" v-if="![28, 33, 32].includes(props.deviceIndex)">
                <div class="item-num"
                    v-if="![64, 66, 11, 12, 13, 14, 5, 119, 115, 27, 34, 35, 36, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79].includes(props.deviceIndex)">
                    {{ formatDisplayValue(props.rewindData.unwindUnitTensionSet) }}</div>
                <div class="item-num" v-else>{{ formatDisplayValue(props.rewindData.unwindTensionSet) }}</div>
                <div class="item-txt">放卷{{ ![64, 66, 11, 12, 13, 14, 5, 119, 115, 27, 34, 35, 36, 70, 71, 72, 73, 74,
                    75, 76, 77, 78, 79].includes(props.deviceIndex) ? '单位' : '' }}张力设定(N)</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { formatDisplayValue } from '@/utils'
import CustomSelect from '@/components/select/select.vue'

const props = defineProps({
    deviceIndex: {
        type: Number,
        default: 0
    },
    rewindData: {
        type: Object,
        default: () => ({
            lastActiveTime: null, //最后活跃时间
            openRateRecent30: null, //近30天开机率
            status: 0, // 设备状态
            unwindingCurrentTension: null, // 放卷当前张力
            unwindingTensionSetting: null // 放卷张力设定
        })
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
        background-image: url('@/assets/image/dfp/dataPick2/top1_1.png');
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

    .content-1 {
        margin-top: vh(7);
        height: vh(173);
        background-color: rgba(1, 38, 58, 0.39);
        margin-bottom: vh(14);
        padding: vh(20) vw(40);

        .dis {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: vw(14);
            color: #bcf0fe;
            margin-bottom: vh(10);

            .icon {
                width: vw(15);
                height: vw(15);
                background-image: url('@/assets/image/dfp/dataPick2/top1_2.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center;
                margin-right: vw(12);
            }
        }

        .txt {
            font-weight: 500;
            font-size: vw(12);
            color: #bcf0fe;
            margin-bottom: vh(10);

            .status {
                display: inline-block;
                width: vw(77);
                height: vh(26);
                line-height: vh(26);
                text-align: center;
                color: #fff;
                border-radius: 5px 5px 5px 5px;
            }

            .date-type {
                margin-right: vw(5);
                margin-left: vw(15);
            }

            .date-val {
                color: #00e551;
            }

            .on {
                background: #00e551;
            }

            .off {
                background: #ff0000;
            }
        }
    }

    .content-2 {
        margin-top: vh(7);
        width: 100%;
        height: vh(178);
        background-color: rgba(1, 38, 58, 0.39);
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .item {
            .item-num {
                width: vw(134);
                height: vh(58);
                background-image: url('@/assets/image/dfp/dataPick2/top1_3.png');
                background-size: 100% 100%;
                background-position: center center;
                font-size: vw(16);
                line-height: vh(58);
                color: #43ffee;
                text-align: center;
                font-family: 'dfpFont';
            }

            .item-txt {
                margin-top: vh(13);
                font-weight: 500;
                font-size: vw(12);
                color: #bcf0fe;
                text-align: center;
            }
        }
    }
}
</style>
