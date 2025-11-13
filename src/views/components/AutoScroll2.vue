<template>
  <div class="list">
    <div class="list_header">
      <div class="list_header_item" v-for="(item, index) in 5">
        {{ '标题' + item }}
      </div>
    </div>
    <div class="list_body">
      <div class="list_body_" ref="scrolldiv">
        <div class="list_body_item" v-for="(item, index) in 15">
          <div class="list_body_item_">{{ index }}'内容'</div>
          <div class="list_body_item_">'内容'</div>
          <div class="list_body_item_">'内容'</div>
          <div class="list_body_item_">'内容'</div>
          <div class="list_body_item_">'内容'</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';

let scrolldiv = ref();
function setMarqueeSpeed() {
  let length = 10;
  if (length > 4) {
    nextTick(() => {
      // 根据数据长度设置滚动速度
      scrolldiv.value.style.animationDuration = length * 2 + 's';
    });
  } else {
    scrolldiv.value.style.animationDuration = 0 + 's';
  }
}

setMarqueeSpeed();
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  .list_header {
    display: flex;
    justify-content: space-between;
    .list_header_item {
      flex: 1;
      padding: vh(10) vw(10);
      text-align: center;
    }
  }
  .list_body {
    height: vh(400);
    overflow: hidden;
    border: 1px solid #000;
    .list_body_ {
      animation: scroll linear infinite;
      .list_body_item {
        height: vh(36);
        display: flex;
        justify-content: space-between;
        .list_body_item_ {
          flex: 1;
          text-align: center;
        }
      }
    }
    .list_content:hover {
      animation-play-state: paused;
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
