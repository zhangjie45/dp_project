<template>
    <div class="list-wrapper">
        <AutoScroll />
        <!-- <AutoScroll2 /> -->
    </div>
</template>

<script setup>
import AutoScroll from '../../components/AutoScroll.vue'
import AutoScroll2 from '../../components/AutoScroll2.vue'
</script>

<style lang="scss" scoped>
.list-wrapper {
    margin-top: vh(20);
    width: vw(510);
    height: vh(450);
    padding: vh(12) vw(16);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
}
</style>
