<script setup lang="ts">

const props = withDefaults(defineProps<{
  list?:any[]
}>(),{
  list:() => []
})

let option = computed(() => {
  let d = props.list
  return {
    color:['#06F19A','#FE931F','#716EFC'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      itemGap:50,
      textStyle:{
        color:'#fff'
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top:'50',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: d.map(d => d.time),
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
        name: '单位：h',
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
        name: '实际工作时长',
        type: 'bar',
        barWidth: '15%',
        data: d.map(d => d.actualWorkTime),
      },
      {
        name: '开机时长',
        type: 'bar',
        barWidth: '15%',
        data: d.map(d => d.openTime),
      },
      {
        name: '电机工作时长',
        type: 'bar',
        barWidth: '15%',
        data:d.map(d => d.workTime),
      }
    ]
  };
})

</script>

<template>
  <e-chart autoresize :option="option" class="flex-1" />
</template>

<style scoped lang="scss">

</style>