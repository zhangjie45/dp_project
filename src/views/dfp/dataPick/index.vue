<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main fb">
            <div class="large-screen-main-left">
                <Left :secondFloorData="data.secondFloor" :goDetail="goDetail" />
            </div>
            <div class="large-screen-main-center">
                <Center :firstFloorData="data.firstFloor" :statisticData="data.statistic" :goDetail="goDetail" />
            </div>
            <div class="large-screen-main-right">
                <Right :thirdFloorData="data.thirdFloor" :areaCData="data.areaCData" :goDetail="goDetail" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import { getDataPickList } from '../../api/datapick'

import LargeScreenHeader from './components/LargeScreenHeader.vue'
import Center from './components/Center.vue'
import Left from './components/Left.vue'
import Right from './components/Right.vue'
import { dataJson } from './data'

const data = ref({})
const statisticData = ref({})
let timer = null

onMounted(() => {
    getData()
    timer = setInterval(() => {
        getData()
    }, 1000 * 60 * 1) // 每1分钟更新一次
})

const getData = () => {
    data.value = dataJson
    // getDataPickList().then((res) => {
    //     if (res.code === 200) {
    //         data.value = res.data
    //     }
    // })
    // getStatistic().then((res) => {
    //     if (res.code === 200) {
    //         statisticData.value = res.data
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
    window.location.href = '/dfp/page2?machineCode=' + val.machineCode
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
    background-image: url('@/assets/image/dfp/dataPick/bg.png');
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;

    .large-screen-main {
        padding: vh(0) vw(30);
        flex: 1;

        &-left {
            margin-top: vh(7);
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: vw(430);
        }

        &-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            // width: vw(683);
            flex: 1;
            padding: 0 vw(20);

            height: 100%;

            .center-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
        }

        &-right {
            margin-top: vh(7);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: vw(430);
            height: 100%;
        }
    }
}
</style>
