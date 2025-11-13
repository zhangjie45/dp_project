<template>
    <div class="large-screen-wrapper">
        <!-- 头部 -->
        <LargeScreenHeader></LargeScreenHeader>
        <div class="large-screen-main fb">
            <div class="large-screen-main-left">
                <!-- 左侧 模块1 -->
                <LeftModel1 />
                <LeftModel2 />
            </div>
            <div class="large-screen-main-center">
                <Center />
            </div>
            <div class="large-screen-main-right">
                <RightModel1 />
                <RightModel2 />
            </div>
        </div>
    </div>
</template>

<script setup>
import LargeScreenHeader from './components/LargeScreenHeader.vue';
import LeftModel1 from './components/LeftModel1.vue';
import LeftModel2 from './components/LeftModel2.vue';
import RightModel1 from './components/RightModel1.vue';
import RightModel2 from './components/RightModel2.vue';
import Center from './components/Center.vue';
</script>

<style lang="scss" scoped>
.large-screen-wrapper {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    // background-image: url('~@/assets/images/largeScreen/largeScreenBg.png');
    // background-size: 100% 100%;
    // background-position: center center;
    overflow: hidden;

    .large-screen-main {
        padding: vh(20) vw(20);
        flex: 1;

        &-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            width: vw(548);
            border: 1px solid #000;
            padding: 0 vw(20);
        }

        &-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            // width: vw(683);
            flex: 1;
            padding: 0 vw(20);
            border: 1px solid #000;
            height: 100%;

            .center-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
        }

        &-right {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: vw(550);
            height: 100%;
            border: 1px solid #000;
            padding: 0 vw(20);
        }
    }
}
</style>
