<template>
  <div class="content" id="main1">
    <t-chart :options="options" @chart="chart" />
  </div>
</template>

<script setup>
import TChart from '../../../components/TChart.vue';
import { ref, onMounted } from 'vue';
const chartRef = ref(null);
const chart = dom => {
  chartRef.value = dom;
};
onMounted(() => {
  // options.value.xAxis.data = [1, 2, 3, 4];
  // options.value.series[0].data = [4, 3, 2, 1];
});
const options = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  color: ['#8fc31f', '#f35833', '#00ccff', '#ffcc00', '#f5e965', '#a74faf', '#ff9668'],

  series: [
    {
      name: '资源总量构成',
      type: 'pie',
      radius: '40%',
      center: ['50%', '50%'],
      data: [
        { value: 435, name: '公安局' },
        { value: 679, name: '民政局' },
        { value: 848, name: '气象局' },
        { value: 348, name: '统计局' },
        { value: 679, name: '交通局' },
        { value: 848, name: '人社局' },
        { value: 1348, name: '其他' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      itemStyle: {
        normal: {
          label: {
            show: true,
            //	                            position:'inside',
            formatter: '{b} : {c} ({d}%)',
            fontSize: 14 //文字的字体大小
          }
        },
        labelLine: { show: true }
      },
      label: {
        normal: {
          show: true,
          color: 'inherit'
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
