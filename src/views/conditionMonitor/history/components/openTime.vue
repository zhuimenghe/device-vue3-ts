<script setup lang="ts">
import dayjs from 'dayjs';

let props = defineProps<{
  d:Array<any>,
  filter:{
    dateRange:Array<string>
  }
}>()
const option = computed(() => {
  let data = [[new Date(props.filter.dateRange[0]).setHours(0),0]]
  for (let i = 0; i < props.d.length; i++) {
    if (Object.prototype.hasOwnProperty.call(props.d, i)) {
      const d = props.d[i];
      data.push([dayjs(d.begin_time).subtract(1,'s').valueOf(),0])
      data.push([+new Date(d.begin_time),1])
      data.push([+new Date(d.end_time),1])
      data.push([dayjs(d.end_time).add(1,'s').valueOf(),0])
    }
  }
  data.push([dayjs(new Date(props.filter.dateRange[1])).endOf('d').valueOf(),0]);

  return {
    // tooltip: {
    //   trigger: 'axis',
    // },
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
      nameTextStyle:{
        fontSize:16,
        color:'#fff',
        padding: [0, 0, 10, 0]
      },
      max:1,
      axisLabel:{
        show:false,
        fontSize:16
      },
      splitLine:{
        show:false
      }
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
        areaStyle: {},
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