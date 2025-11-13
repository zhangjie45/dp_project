<template>
  <div>
    <ul class="data-label">
      <li v-for="(item, index) in items" :key="item.type" :data-type="item.type" :class="{ active: activeIndex === index }" @click="handleClick(index)">
        {{ item.name }}
      </li>
    </ul>
    <ul class="use-data">
      <li>
        <p class="data-count">5681</p>
        <span class="data-name">数据总量</span>
      </li>
      <li>
        <p class="data-count">1331</p>
        <span class="data-name">更新量</span>
      </li>
      <li>
        <p class="data-count">3753</p>
        <span class="data-name">共享次数</span>
      </li>
    </ul>
    <div id="main3" style="margin-top: 10px; width: 100%; height: 240px">
      <t-chart :options="options" @chart="chart" />
    </div>
  </div>
</template>

<script setup>
import TChart from '../../../components/TChart.vue';
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
const chartRef = ref(null);
const chart = dom => {
  console.log('dom--->', dom);

  chartRef.value = dom;
};
const items = [
  { name: '法人库', type: 1 },
  { name: '人口库', type: 2 },
  { name: '电子证照库', type: 3 }
];
// 当前激活的索引
const activeIndex = ref(0);

// 点击事件处理
const handleClick = index => {
  activeIndex.value = index;
  // 点击后清除定时器并重新启动
  clearInterval(interval);
  interval = setInterval(autoSelectNext, 3000);
};

// 自动选择下一个项
const autoSelectNext = () => {
  activeIndex.value = (activeIndex.value + 1) % items.length;
};

// 启动自动切换
let interval;
onMounted(() => {
  interval = setInterval(autoSelectNext, 3000); // 每 3 秒钟选择下一个
});

// 清理定时器
onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

watch(
  () => activeIndex.value,
  val => {
    let data = {};
    let uploadCnt = [];
    let updateCnt = [];
    let viewCnt = [];

    switch (val) {
      case 0:
        data = {
          uploadData: [{ count: 630 }, { count: 986 }, { count: 792 }, { count: 642 }, { count: 521 }, { count: 573 }, { count: 832 }, { count: 747 }, { count: 983 }, { count: 836 }, { count: 831 }, { count: 633 }],
          updateData: [{ count: 110 }, { count: 181 }, { count: 123 }, { count: 197 }, { count: 123 }, { count: 173 }, { count: 123 }, { count: 151 }, { count: 101 }, { count: 152 }, { count: 101 }, { count: 177 }],
          viewData: [{ count: 651 }, { count: 842 }, { count: 223 }, { count: 223 }, { count: 221 }, { count: 812 }, { count: 928 }, { count: 219 }, { count: 613 }, { count: 254 }, { count: 981 }, { count: 301 }]
        };
        break;
      case 1:
        data = {
          uploadData: [{ count: 1300 }, { count: 1686 }, { count: 1692 }, { count: 1742 }, { count: 1621 }, { count: 773 }, { count: 832 }, { count: 1047 }, { count: 1483 }, { count: 1336 }, { count: 831 }, { count: 973 }],
          updateData: [{ count: 103 }, { count: 281 }, { count: 203 }, { count: 197 }, { count: 173 }, { count: 154 }, { count: 223 }, { count: 251 }, { count: 201 }, { count: 252 }, { count: 201 }, { count: 277 }],
          viewData: [{ count: 651 }, { count: 842 }, { count: 223 }, { count: 223 }, { count: 221 }, { count: 812 }, { count: 928 }, { count: 219 }, { count: 613 }, { count: 254 }, { count: 981 }, { count: 301 }]
        };
        break;

      case 2:
        data = {
          uploadData: [{ count: 330 }, { count: 786 }, { count: 492 }, { count: 842 }, { count: 421 }, { count: 673 }, { count: 932 }, { count: 447 }, { count: 583 }, { count: 436 }, { count: 331 }, { count: 433 }],
          updateData: [{ count: 10 }, { count: 81 }, { count: 23 }, { count: 97 }, { count: 23 }, { count: 73 }, { count: 23 }, { count: 51 }, { count: 1 }, { count: 52 }, { count: 1 }, { count: 77 }],
          viewData: [{ count: 451 }, { count: 342 }, { count: 523 }, { count: 323 }, { count: 421 }, { count: 812 }, { count: 728 }, { count: 619 }, { count: 613 }, { count: 554 }, { count: 481 }, { count: 301 }]
        };
        break;
    }

    if (data.uploadData != null) {
      for (var i = 0; i < data.uploadData.length; i++) {
        uploadCnt.push(data.uploadData[i].count);
      }
    }
    if (data.updateData != null) {
      for (var i = 0; i < data.updateData.length; i++) {
        updateCnt.push(data.updateData[i].count);
      }
    }

    if (data.viewData != null) {
      for (var i = 0; i < data.viewData.length; i++) {
        viewCnt.push(data.viewData[i].count);
      }
    }

    nextTick(() => {
      options.value.series[0].data = [...uploadCnt];
      options.value.series[1].data = [...viewCnt];
      options.value.series[2].data = [...updateCnt];
      chartRef.value.resize();
    });
  },
  {
    deep: true,
    immediate: true
  }
);
const options = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (params, ticket, callback) {
      var res = '';
      for (var i = 0, l = params.length; i < l; i++) {
        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
      }
      return res;
    },
    transitionDuration: 0,
    backgroundColor: 'rgba(83,93,105,0.8)',
    borderColor: '#535b69',
    borderRadius: 8,
    borderWidth: 2,
    padding: [5, 10],
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: 'dashed',
        color: '#ffff00'
      }
    }
  },
  legend: {
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 10,
    top: '16',
    right: '10',
    data: ['数据总量', '共享次数', '更新量'],
    textStyle: {
      fontSize: 14,
      color: '#a0a8b9'
    }
  },
  grid: {
    top: '46',
    left: '13%',
    right: '10',
    //bottom: '10%',
    containLabel: false
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 0,
        fontSize: 14
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#a0a8b9'
        }
      },
      axisTick: {
        show: false
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
      offset: 10
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#a0a8b9'
        }
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2b3646'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '数据总量',
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }
            ],
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
            global: false // 缺省为 false
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#1cc840'
        }
      }
    },
    {
      name: '共享次数',
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }
            ],
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
            global: false // 缺省为 false
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#eb5690'
        }
      }
    },
    {
      name: '更新量',
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              },
              {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }
            ],
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
            global: false // 缺省为 false
          }
        }
      },
      itemStyle: {
        normal: {
          color: '#43bbfb'
        }
      }
    }
  ]
});
</script>

<style lang="scss" scoped>
li {
  list-style: none;
}
.data-label {
  position: absolute;
  top: 20px;
  right: 10px;
}
.data-label li {
  float: left;
  width: 120px;

  text-align: center;
  font-size: 18px;
  color: #828c9d;
}
.data-label li:hover,
.data-label li.active {
  color: #fff;
  background: url('../../../assets/image/dataPick2images/choose-item.png') center no-repeat;
}
.use-data {
  text-align: center;
  padding: 2px 0;
  margin-top: 3%;
  height: 5%;
  background: url('../../../assets/image/dataPick2images/resource-use-data.jpg') center no-repeat;
  background-size: cover;
  border: solid 1px #093552;
  border-right: 0px;
  border-left: 0;
}
.use-data li {
  width: 30%;
  font-size: 0;
  display: inline-table;
  border-right: solid 1px #1f4191;
}
.use-data li:last-child {
  border-right: 0;
}
.use-data .data-count {
  color: #fff;
  font-family: myFirstFont;
  height: 1%;
  font-size: 16px;
}
.use-data .data-name {
  color: #1bb9f9;
  font-size: 16px;
}
</style>
