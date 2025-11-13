<template>
    <div class="large-screen-header">
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
    }, 1000)
})
</script>
<style lang="scss" scoped>
.large-screen-header {
    width: 100%;
    height: vh(93);
    background-image: url('@/assets/image/dfp/dataPickFactory/header.webp');
    background-size: 100% 100%;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .time {
        height: vh(19);
        line-height: vh(19);
        margin-right: vw(56);

        .date {
            font-weight: normal;
            font-size: vw(19);
            color: #ffffff;
            margin-left: vw(60);
            font-style: normal;
            text-transform: none;
        }
    }
}
</style>
