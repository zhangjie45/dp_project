<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main">
            <div class="top">
                <div class="top1">
                    <Top1 :deviceIndex="deviceIndex" :rewindData="rewindData"></Top1>
                </div>
                <div class="top2">
                    <Top2 :deviceIndex="deviceIndex" :rewindData="rewindData"></Top2>
                </div>
                <div class="top3">
                    <Top3 :deviceIndex="deviceIndex" :machineList="machineList"></Top3>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom1">
                    <Bottom1 :deviceIndex="deviceIndex" :upData="upData" :rewindData="rewindData"></Bottom1>
                </div>
                <div class="bottom2">
                    <Bottom2 :deviceIndex="deviceIndex" :downData="downData" :rewindData="rewindData"></Bottom2>
                </div>
                <div class="bottom3">
                    <Bottom3 :deviceIndex="deviceIndex" :deviceCheck="deviceCheck"></Bottom3>
                </div>
                <div class="bottom4">
                    <Bottom4 :deviceIndex="deviceIndex" :machineList="machineList"></Bottom4>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { getRewindData, getUpData, getDownData, getElectrodeList, getDeviceCheck } from '@/api/detail'

import LargeScreenHeader from './components/LargeScreenHeader.vue'
import Top1 from './components/top1.vue'
import Top2 from './components/top2.vue'
import Top3 from './components/top3.vue'
import Bottom1 from './components/bottom1.vue'
import Bottom2 from './components/bottom2.vue'
import Bottom3 from './components/bottom3.vue'
import Bottom4 from './components/bottom4.vue'

const deviceIndex = ref(0)
const rewindData = ref({}) //倒卷明细信息
const upData = ref({}) //上收卷数据
const downData = ref({}) //下收卷数据
const machineList = ref([]) //设备下拉框数据
const deviceCheck = ref({}) //设备状态检测

let timer = null

onMounted(() => {
    //获取url中的indx的值
    const machineCode = new URL(window.location.href).searchParams.get('machineCode')
    deviceIndex.value = machineCode ? parseInt(machineCode) : 0
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 1 * 60) // 每1分钟更新一次
})
import { rewindDataJson, upDataJson, downDataJson, machineListJson,deviceCheckJson } from './data'
const getData = () => {
    rewindData.value = rewindDataJson
    upData.value = upDataJson
    downData.value = downDataJson
    machineListJson.map((item) => {
        machineList.value.push({
            value: item.viewName,
            label: item.viewName
        })
    })
    deviceCheck.value = deviceCheckJson
    // getRewindData({ machineCode: deviceIndex.value }).then((res) => {
    //     if (res.code === 200) {
    //         rewindData.value = res.data
    //     }
    // })
    // getUpData({ machineCode: deviceIndex.value }).then((res) => {
    //     if (res.code === 200) {
    //         upData.value = res.data
    //     }
    // })
    // getDownData({ machineCode: deviceIndex.value }).then((res) => {
    //     if (res.code === 200) {
    //         downData.value = res.data
    //     }
    // })
    // getElectrodeList({ machineCode: deviceIndex.value }).then((res) => {
    //     if (res.code === 200) {
    //         //清空设备列表
    //         machineList.value = []
    //         res.data.map((item) => {
    //             machineList.value.push({
    //                 value: item.viewName,
    //                 label: item.viewName
    //             })
    //         })
    //     }
    // })
    // getDeviceCheck({ machineCode: deviceIndex.value }).then((res) => {
    //     if (res.code === 200) {
    //         deviceCheck.value = res.data
    //     }
    // })
}

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
</script>

<style lang="scss" scoped>
.large-screen-wrapper {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    background-image: url('@/assets/image/dfp/dataPick2/bg.png');
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;

    .large-screen-main {
        padding: vh(0) vw(30);
        flex: 1;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: vh(19);
            margin-bottom: vh(16);

            .top1,
            .top2,
            .top3 {
                height: vh(499);
                background-size: cover;
            }

            .top1 {
                width: vw(479);
                // background-color: aqua;
            }

            .top2 {
                width: vw(861);
                // background-color: coral;
            }

            .top3 {
                width: vw(479);
                // background-color: lightgreen;
            }
        }

        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .bottom1,
            .bottom2,
            .bottom3,
            .bottom4 {
                width: vw(448);
                height: vh(439);
                background-size: cover;
            }
        }
    }
}
</style>
