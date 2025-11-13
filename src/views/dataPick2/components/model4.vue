<template>
  <div class="list">
    <div class="list_header">
      <div class="list_header_item" v-for="(item, index) in 5">
        {{ '标题' + item }}
      </div>
    </div>
    <div class="list_body">
      <div class="list_body_" ref="scrolldiv">
        <div class="maquee-container" ref="maquee">
          <div class="scroll-list">
            <div v-for="(item, index) in list" :key="index" class="scroll-item list_body_item">
              <div class="list_body_item_">{{ index }}'内容'</div>
              <div class="list_body_item_">'内容'</div>
              <div class="list_body_item_">'内容'</div>
              <div class="list_body_item_">'内容'</div>
              <div class="list_body_item_">'内容'</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
const list = ref(['项目1', '项目2', '项目3', '项目4', '项目5', '项目6', '项目7', '项目8', '项目9', '项目10', '项目9', '项目10', '项目9', '项目10', '项目9', '项目10']);

const maquee = ref(null);

const autoScroll = () => {
  nextTick(() => {
    const container = maquee.value.querySelector('.scroll-list');
    if (container) {
      const firstItem = container.querySelector('.scroll-item:first-child');
      container.style.transition = 'transform 0.5s ease';
      container.style.transform = 'translateY(-40px)';

      setTimeout(() => {
        container.style.transition = 'none';
        container.style.transform = 'translateY(0)';
        container.appendChild(firstItem);
      }, 500);
    }
  });
};

onMounted(() => {
  setInterval(autoScroll, 2000);
});
</script>

<style scoped lang="scss">
.maquee-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  color: #fff;
}

.scroll-list {
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;
}

.scroll-item {
  height: 40px;
  line-height: 40px;
}
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
      color: #fff;
    }
  }
  .list_body {
    height: vh(280);
    overflow: hidden;
    .list_body_ {
      animation: scroll linear infinite;
      .list_body_item {
        height: 100%;
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
</style>
