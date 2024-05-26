<script setup lang="ts">
import {useStore} from '../store'

let {stackData,chartFilter} = toRefs(useStore())

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
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: stackData.value.map(d => d.name + '次'),
        axisLabel:{
          fontSize:14
        },
        axisTick: {
          show:false,
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：台',
        nameTextStyle:{
          fontSize:16,
          color:'#fff',
          padding: [0, 0, 10, 0]
        },
        axisLabel:{
          fontSize:14
        },
        splitNumber:4,
        splitLine:{
          lineStyle:{
            width:0.5
          }
        }
      }
    ],
    series: [
      {
        name: '台数',
        type: 'bar',
        barWidth: '30%',
        color:'#63ECFF',
        data: stackData.value.map(d => d.value),
      }
    ]
  };
})

function chartClick(e:any) {
  chartFilter.value = {
    chargingTimesList:stackData.value[e.dataIndex].range
  }
}
</script>

<template>
  <div class="flex flex-col">
    <bg-title>充电次数概况</bg-title>
    <e-chart autoresize :option="option" class="flex-1 pr-20" @click="chartClick" />
  </div>
</template>

<style scoped lang="scss">

</style>