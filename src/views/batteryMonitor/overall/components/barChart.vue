<script setup lang="ts">
import {useStore} from '../store'

let {barData,chartFilter} = toRefs(useStore())

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel:{
        show:false
      },
      splitLine:{
        show:false
      }
    },
    yAxis: {
      type: 'category',
      data:barData.value.map(d => d.name + '%'),
      inverse:true,
      axisLabel:{
        fontSize:14
      },
      axisTick:{
        show:false
      },
      axisLine:{
        show:false
      }
    },
    series: [
      {
        name: '台数',
        type: 'bar',
        barWidth: '50%',
        color:'#35BBFF',
        data: barData.value.map(d => d.value),
        label:{
          show:true,
          position:'right',
          color:'#fff',
          fontSize:14
        }
      }
    ]
  };
})

function chartClick(e:any) {
  chartFilter.value = {
    dailyBatteryLevelList:barData.value[e.dataIndex].range
  }
}
</script>

<template>
  <div class="flex flex-col">
    <bg-title>日平均用电量概况</bg-title>
    <e-chart autoresize :option="option" class="flex-1" @click="chartClick" />
  </div>
</template>

<style scoped lang="scss">

</style>