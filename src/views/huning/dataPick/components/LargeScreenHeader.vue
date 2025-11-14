<template>
    <div class="large-screen-header"></div>
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

const goHome = () => {
    window.location.href = '/dfp/factory'
}
</script>
<style lang="scss" scoped>
.large-screen-header {
    width: 100%;
    height: vh_vh(635);
    background-image: url('@/assets/image/huning/image/dataPick/header_bg.png');
    background-size: 100% 100%;
    background-position: center center;
}
</style>
