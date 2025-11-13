<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main fb">
            <div class="large-screen-main-left">
                <Left />
            </div>
            <div class="large-screen-main-right">
                <Right />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import LargeScreenHeader from './components/LargeScreenHeader.vue'
import Left from './components/Left.vue'
import Right from './components/Right.vue'

const data = ref({})
const statisticData = ref({})

onMounted(() => { })

function goDetail () {
    // 跳转到数据采集2页面
    window.location.href = '/dataPick2'
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
    background-image: url('@/assets/image/dfp/dataPick2/bg.png');
    background-size: 100% 100%;
    background-position: center center;
    overflow: hidden;

    .large-screen-main {
        padding: vh(22) vw(30);
        flex: 1;

        &-left {
            margin-top: vh(7);
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: vw(922);
        }

        &-right {
            margin-top: vh(7);
            display: flex;
            flex-direction: column;
            align-items: center;
            width: vw(922);
            height: 100%;
        }
    }
}
</style>
