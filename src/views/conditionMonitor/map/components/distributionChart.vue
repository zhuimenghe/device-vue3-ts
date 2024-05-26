<script setup lang="ts">
import { graphic } from 'echarts'
import {fetchMachineMapDistributionChart} from '@/apis/modules/condition'
import {useStore} from '../store'

let {query} = toRefs(useStore())

let type = ref<string>('1')

// watch(type,refresh)

let data = ref<any[]>([])
async function refresh() {
  const params = {
    ...query.value,
    type:type.value
  }
  let res = await fetchMachineMapDistributionChart(params)
  data.value = res
}
watchEffect(refresh)

let option = computed(() => {
  return {
    color:['#35BBFF'],
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
      }
    },
    xAxis: {
      type: 'category',
      data: data.value.map(d => d.area)
    },
    yAxis: {
      type: 'value',
      splitNumber:4,
      splitLine:{
        lineStyle:{
          width:0.5
        }
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: '35%',
        itemStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#35BBFF' },
            { offset: 1, color: 'rgba(0,193,254,0)' }
          ])
        },
        data:data.value.map(d => d.deviceNo)
      }
    ]
  };
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="px-4 py-3 flex">
      <span class="mr-10">设备分布</span>
      <div class="flex-1 flex items-center justify-end">
        <el-radio-group v-model="type">
          <el-radio-button class="flex-1" label="1">省</el-radio-button>
          <el-radio-button class="flex-1" label="2">市</el-radio-button>
          <el-radio-button class="flex-1" label="0">大区</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <e-chart autoresize :option="option" class="flex-1" />
  </div>
</template>

<style scoped lang="scss">

</style>