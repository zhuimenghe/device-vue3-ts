<script setup lang="ts">
import {fetchVoltageBatteryChartData} from '@/apis/modules/battery'
import {useStore} from '../store'

let {form} = useStore()

let list = ref<any[]>([])
const reload = async() => {
  list.value = await fetchVoltageBatteryChartData(form)
}

let option = computed(() => {
  let vols:any[] = []
  let bats:any[] = []
  list.value.forEach(d => {
    vols.push([+new Date(d.time),d.vbat])
    bats.push([+new Date(d.time),d.batteryLevel])
  })

  return {
    color:['#06F19A','#FE931F'],
    grid: {
      left: '1%',
      right: '1%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle:{
        color:'#fff'
      },
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel:{
        fontSize:16
      },
    },
    yAxis: [{
      type: 'value',
      name:'电压',
      nameTextStyle:{
        fontSize:16,
        color:'#fff',
        padding: [0, 0, 10, 0]
      },
      axisLabel:{
        fontSize:16
      },
      axisLine:{
        show:true,
      },
      splitLine:{
        lineStyle:{
          width:0.5
        }
      },
      max:30,
      interval: 3,
    },{
      type: 'value',
      name:'电量',
      nameTextStyle:{
        fontSize:16,
        color:'#fff',
        padding: [0, 0, 10, 0]
      },
      axisLabel:{
        fontSize:16,
        formatter: '{value}%'
      },
      axisLine:{
        show:true,
      },
      max:100,
      interval: 10,
      splitLine:{
        lineStyle:{
          width:0.5
        }
      },
    }],
    dataZoom:{
      type: 'slider',
      start: 0,
      end: vols.length / 500 > 1 ? 100 * 500 / vols.length : 100 //初始最多显示500条
    },
    series: [
      {
        name: '电压',
        type: 'line',
        smooth: false,
        symbol: 'none',
        data: vols
      },
      {
        name: '电量',
        type: 'line',
        yAxisIndex: 1,
        smooth: false,
        symbol: 'none',
        data: bats
      }
    ]
  }
})

defineExpose({reload})

</script>

<template>
  <e-chart autoresize :option="option" class="flex-1" />
</template>

<style scoped lang="scss">

</style>