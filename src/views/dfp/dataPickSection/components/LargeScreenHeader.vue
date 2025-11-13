<template>
    <div class="large-screen-header">
        <div class="back" @click="goBack()">
            <span class="txt">倒卷大屏</span>
        </div>
        <div class="time">
            <span class="date">{{ time }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { formatParamsDate } from '@/utils'
const time = ref(formatParamsDate())

onMounted(() => {
    setInterval(() => {
        //年月日时分秒
        const date = new Date()
        time.value = formatParamsDate()
        // time.value = new Date().toLocaleTimeString()
    }, 1000)
})
const goBack = () => {
    window.location.href = '/dfp/page1'
}
</script>
<style lang="scss" scoped>
.large-screen-header {
    width: 100%;
    height: vh(78);
    background-image: url('@/assets/image/dfp/dataPickSection/header_bg.png');
    background-size: 100% 100%;
    background-position: center center;
    display: flex;
    justify-content: space-between;

    .time {
        width: vw(409);
        height: vh(38);
        line-height: vh(38);
        background-image: url('@/assets/image/dfp/dataPick/header_time_bg.png');
        background-size: 100% 100%;
        background-position: center center;
        // float: inline-end;
        margin-top: vh(32);
        // margin-right: vw(38);

        .date {
            font-family: 'dfpFont';
            font-weight: normal;
            font-size: vw(24);
            color: #ffffff;
            margin-left: vw(60);
            font-style: normal;
            text-transform: none;
        }
    }

    .back {
        // display: inline-block;
        width: vw(204);
        height: vh(38);
        line-height: vh(38);
        background-image: url('@/assets/image/dfp/dataPick2/header_back_bg.png');
        background-size: 100% 100%;
        background-position: center center;
        margin-top: vh(32);
        margin-right: vw(38);
        cursor: pointer;

        .txt {
            display: inline-block;
            width: 100%;
            line-height: vh(38);
            font-family: 'dfpFont';
            font-weight: normal;
            font-size: vw(24);
            color: #ffffff;
            text-align: center;
        }
    }
}
</style>
