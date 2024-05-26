<script setup lang="ts">
let props = defineProps<{
  d:Array<any>,
}>()
const option = computed(() => {
  let data = props.d.map(e => {
    return [+new Date(e.time),e.vbat]
  })
  return {
    color:['#18DDDB'],
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel:{
        fontSize:16
      },
    },
    yAxis: {
      type: 'value',
      name: '电压：%',
      nameTextStyle:{
        fontSize:16,
        color:'#fff',
        padding: [0, 0, 10, 0]
      },
      max:100,
      axisLabel:{
        fontSize:16
      },
      splitNumber:4
    },
    dataZoom:{
      type: 'slider',
      start: 0,
      end: props.d.length / 500 > 1 ? 100 * 500 / props.d.length : 100 //初始最多显示500条
    },
    series: [
      {
        name: '电压',
        type: 'line',
        smooth: false,
        symbol: 'none',
        data: data
      }
    ]
  }
})

</script>

<template>
  <e-chart :option="option" autoresize />
</template>

<style scoped lang="scss">

</style>