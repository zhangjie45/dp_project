<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main fb">
            <div class="large-screen-main-left">
                <Left :secondFloorData="data.secondFloor" />
            </div>
            <div class="large-screen-main-center">
                <Center :firstFloorData="data.firstFloor" :statisticData="data.statistic" />
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

const data = ref({})
const statisticData = ref({})
let timer = null

onMounted(() => {
    // getData()
    // timer = setInterval(() => {
    //     getData()
    // }, 1000 * 60 * 1) // 每1分钟更新一次
})

const getData = () => {
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


</script>

<style lang="scss" scoped>
.large-screen-wrapper {
    display: flex;
    flex-direction: column;
    width: vw_hn(9600);
    height: vh_vh(3240);
    max-width: 100%;
    max-height: 100%;
    background-image: url('@/assets/image/huning/image/dataPick/bg.png');
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;
    // transform: scale(1.3);

    .large-screen-main {
        position: absolute;
        width: 100%;
        // height: 100%;
        top: vh_vh(238);

        &-left {
            margin-top: vh_vh(7);
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: vw_hn(2792);
            padding: 0 vw_hn(65);
        }

        &-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            // background-color: aliceblue;
            flex: 1;
            height: 100%;
        }
    }
}
</style>
