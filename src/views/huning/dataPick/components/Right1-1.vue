<template>
    <div class="main-r1-1">
        <div class="header">
            <div class="txt">正火线-{{ props.normalizingSelect === 'Normalizing1' ? '1号炉' : '2号炉' }}</div>
        </div>
        <div class="body">
            <div class="list">
                <div class="list-item">
                    <div class="title">升温1区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value" style="color: #ff9407">{{ formatDisplayValue(data.heatingZone1PV,
                                '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.heatingZone1SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">升温2区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.heatingZone2PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.heatingZone2SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">保温1区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone1PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone1SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">保温2区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone2PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone2SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">保温3区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone3PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.insulationZone3SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">快冷室</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.fastCoolingRoomPV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.fastCoolingRoomSP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">等温1区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone1PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone1SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">等温2区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone2PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone2SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">等温3区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone3PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone3SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">等温4区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone4PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone4SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">等温5区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone5PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone5SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">等温6区</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone6PV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.isothermalZone6SP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div class="title">水冷室</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.waterCoolingRoomPV, '°C') }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.waterCoolingRoomSP, '°C') }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
                <div class="list-item">
                    <div class="title">氧势</div>
                    <div class="content">
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.oxygenPotentialPV) }}</div>
                            <div class="item-title">当前值</div>
                        </div>
                        <div class="item">
                            <div class="item-value">{{ formatDisplayValue(data.oxygenPotentialSP) }}</div>
                            <div class="item-title">设定值</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, watch, ref, onBeforeUnmount } from 'vue'
// import { getHotLine } from '@/api/datapick'
import { formatDisplayValue } from '@/utils'

const data = ref({})

const props = defineProps({
    normalizingSelect: {
        type: String,
        default: ''
    }
})
let timer = null
watch(
    () => props.normalizingSelect,
    (newVal) => {
        // data.value = {
        //     heatingZone1SP: 245,
        //     heatingZone1PV: 245,
        //     heatingZone2SP: 245,
        //     heatingZone2PV: 245,
        //     insulationZone1SP: 245,
        //     insulationZone1PV: 245,
        //     insulationZone2SP: 245,
        //     insulationZone2PV: 245,
        //     insulationZone3SP: 245,
        //     insulationZone3PV: 245,
        //     oxygenPotentialSP: 245,
        //     oxygenPotentialPV: 245,
        //     fastCoolingRoomSP: 245,
        //     fastCoolingRoomPV: 245,
        //     isothermalZone1SP: 245,
        //     isothermalZone1PV: 245,
        //     isothermalZone2SP: 245,
        //     isothermalZone2PV: 245,
        //     isothermalZone3SP: 245,
        //     isothermalZone3PV: 245,
        //     isothermalZone4SP: 245,
        //     isothermalZone4PV: 245,
        //     isothermalZone5SP: 245,
        //     isothermalZone5PV: 245,
        //     isothermalZone6SP: 245,
        //     isothermalZone6PV: 245,
        //     waterCoolingRoomSP: 245,
        //     waterCoolingRoomPV: 245,
        //     normalizingTime: null,
        //     isothermalTime: null
        // }
        getData()
        timer = setInterval(() => {
            getData()
        }, 1000 * 60 * 5) // 每5分钟更新一次
    },

    { deep: true, immediate: true }
)
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
import { left1Json } from '../data.js'
function getData () {
    data.value = left1Json
    // getHotLine({ deviceName: props.normalizingSelect }).then((res) => {
    //     if (res.code === 200) {
    //         data.value = res.data
    //     } else {
    //         data.value = {}
    //     }
    // })
}
</script>

<style lang="scss" scoped>
.main-r1-1 {
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
        width: vw_hn(1346);
        height: vh_vh(1687);
        background-image: url('@/assets/image/huning/image/dataPick/right_1.png');
        background-size: 100% 100%;
        background-position: center center;
        background-size: 100% 100%;

        // padding: vh_vh(3) vw_hn(17);
        .list {
            display: flex;
            justify-content: space-between;
            margin-bottom: vh_vh(5);

            // padding: vh_vh(18.5) vw_hn(20);
            .list-item {
                width: vw_hn(656);
                height: vh_vh(200.7);
                padding: vh_vh(18) vw_hn(30);

                .title {
                    margin-top: vh_vh(30);
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
</style>
