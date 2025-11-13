<template>
  <div class="content" id="main1">
    <t-chart :options="options" @chart="chart" />
  </div>
</template>

<script setup>
import TChart from '../../../components/TChart.vue';
import { ref, onMounted, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const chartRef = ref(null);
const chart = dom => {
  chartRef.value = dom;
};
const data = ref({
  uploadData: [{ count: 3230 }, { count: 2986 }, { count: 3392 }, { count: 2642 }, { count: 3521 }, { count: 2573 }, { count: 3132 }, { count: 3147 }, { count: 3283 }, { count: 3336 }, { count: 3831 }, { count: 3633 }],
  updateData: [{ count: 310 }, { count: 281 }, { count: 123 }, { count: 97 }, { count: 323 }, { count: 373 }, { count: 423 }, { count: 451 }, { count: 501 }, { count: 452 }, { count: 201 }, { count: 177 }],
  viewData: [{ count: 1651 }, { count: 1842 }, { count: 2223 }, { count: 2123 }, { count: 2021 }, { count: 1812 }, { count: 1928 }, { count: 2019 }, { count: 2613 }, { count: 2754 }, { count: 2981 }, { count: 3001 }]
});
const uploadCnt = ref([]);
const updateCnt = ref([]);
const viewCnt = ref([]);

onMounted(() => {
  if (data.value.uploadData != null) {
    for (var i = 0; i < data.value.uploadData.length; i++) {
      uploadCnt.value.push(data.value.uploadData[i].count);
    }
  }
  if (data.value.updateData != null) {
    for (var i = 0; i < data.value.updateData.length; i++) {
      updateCnt.value.push(data.value.updateData[i].count);
    }
  }

  if (data.value.viewData != null) {
    for (var i = 0; i < data.value.viewData.length; i++) {
      viewCnt.value.push(data.value.viewData[i].count);
    }
  }
  options.value.series[0].data = [...uploadCnt.value];
  options.value.series[1].data = [...viewCnt.value];
  options.value.series[2].data = [...updateCnt.value];
});
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
        fontSize: proxy.$fitChartSize(14)
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
.content {
  width: 100%;
  height: 100%;
}
</style>
