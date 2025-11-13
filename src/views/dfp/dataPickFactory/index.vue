<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main fb">
            <div class="large-screen-main-left">
                <Left :areaBOverview="areaBOverview" :areaCOverview="areaCOverview" :areaDOverview="areaDOverview"
                    :projectOverview="projectOverview" />
            </div>
            <div class="large-screen-main-center">
                <Center :protectionEquipment="protectionEquipment" :storageEquipment="storageEquipment"
                    :goDetail="goDetail" />
            </div>
            <div class="large-screen-main-right">
                <Right :quality="quality" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { getAreaBOverview, getAreaCOverview, getAreaDOverview, getProtectionEquipment, getProjectOverview, getStorageEquipment, getQualityOverview } from '@/api/factory'
import LargeScreenHeader from './components/LargeScreenHeader.vue'
import Center from './components/Center.vue'
import Left from './components/Left.vue'
import Right from './components/Right.vue'

const data = ref({})
const statisticData = ref({})
const areaBOverview = ref([]) // 区域B数据
const areaCOverview = ref({}) // 区域C数据
const areaDOverview = ref({}) // 区域D数据
const projectOverview = ref({}) // 项目概览
const protectionEquipment = ref({}) //环保设备概览
const storageEquipment = ref([]) // 储能设备概览
const quality = ref({}) // 质量概览
let timer = null
onMounted(() => {
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 1 * 60) // 每1分钟更新一次
})
import { bJson, cJson, dJson, protectionEquipmentJson, projectOverviewJson, storageEquipmentJson, qualityJson } from './data'
function getData () {
    areaBOverview.value = bJson
    areaCOverview.value = cJson
    areaDOverview.value = dJson
    protectionEquipment.value = protectionEquipmentJson
    projectOverview.value = projectOverviewJson
    storageEquipment.value = storageEquipmentJson
    quality.value = qualityJson
    // getAreaBOverview().then((res) => {
    //     if (res.code === 200) {
    //         areaBOverview.value = res.data
    //     }
    // })
    // getAreaCOverview().then((res) => {
    //     if (res.code === 200) {
    //         areaCOverview.value = res.data
    //     }
    // })
    // getAreaDOverview().then((res) => {
    //     if (res.code === 200) {
    //         areaDOverview.value = res.data
    //     }
    // })
    // getProtectionEquipment().then((res) => {
    //     if (res.code === 200) {
    //         protectionEquipment.value = res.data
    //     }
    // })
    // getProjectOverview().then((res) => {
    //     if (res.code === 200) {
    //         projectOverview.value = res.data
    //     }
    // })
    // getStorageEquipment().then((res) => {
    //     if (res.code === 200) {
    //         storageEquipment.value = res.data
    //     }
    // })
    // getQualityOverview().then((res) => {
    //     if (res.code === 200) {
    //         quality.value = res.data
    //     }
    // })
}
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
function goDetail (val) {
    // 跳转到数据采集2页面
    window.location.href = '/dataPick2?machineCode=' + val.machineCode
}
</script>

<style lang="scss" scoped>
.large-screen-wrapper {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    background-image: url('@/assets/image/dfp/dataPickFactory/bg.png');
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;

    .large-screen-main {
        padding: vh(0) vw(25);
        flex: 1;

        &-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: vw(450);
        }

        &-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: vw(692);
            height: 100%;
        }

        &-right {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: vw(692);
            height: 100%;
        }
    }
}
</style>
