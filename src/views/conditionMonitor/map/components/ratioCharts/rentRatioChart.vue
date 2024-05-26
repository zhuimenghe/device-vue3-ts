<script setup lang="ts">
import {DatePickerType} from '@/shared/constant'

const props = defineProps<{
  data:any[],
  type:DatePickerType
}>()

let option = computed(() => {
  let tl = props.type === DatePickerType.year ? '月' : '日'
  return {
    color:['#FF0000'],
    grid: {
      left: '3%',
      right: '4%',
      top:'10',
      bottom: '20',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter:`{b0}${tl}<br/>出租率：{c0}%`
    },
    xAxis: {
      type: 'category',
      data: props.data.map((d,i) => i + 1)
    },
    yAxis: {
      type: 'value',
      splitNumber:4,
      splitLine:{
        lineStyle:{
          width:0.5
        }
      },
      axisLabel:{
        formatter: (v:any) => v + '%'
      }
    },
    series: [
      {
        data: props.data.map((d,i) => d.rate),
        type: 'line',
        smooth: true
      }
    ]
  };
})
</script>

<template>
  <e-chart autoresize :option="option" class="h-full" />
</template>

<style scoped lang="scss">
</style>