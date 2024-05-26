<script setup lang="ts">
import {useStore} from '../store'

let color = ['#06F19A','#35BBFF','#FE931F','#EA2628']

let {pieData,chartFilter} = toRefs(useStore())

const option = computed(() => {
  return {
    color,
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   top:'middle',
    //   right: 10,
    //   icon:'circle',
    //   textStyle:{
    //     color:'#fff',
    //     fontSize:14,
    //   },
    //   formatter(name:string) {
    //     let found = data.find(d => d.name === name)
    //     let count = found ? found.value : '';
    //     return `${name}  ${count}`
    //   }
    // },
    series: [
      {
        name: '预警次数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 6,
          borderColor: '#fff',
          // borderWidth: 2
        },
        label: {
          position: 'inner',
          fontSize: 14,
          formatter: '{b}',
          color:'#fff'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData.value
      }
    ]
  };
})

function chartClick(e:any) {
  chartFilter.value = {
    lowerPowerTimesList:e.data.range
  }
}

</script>

<template>
  <div class="flex flex-col">
    <bg-title>低电量预警概况</bg-title>
    <div class="flex-1 flex items-center">
      <e-chart autoresize :option="option" class="h-full flex-1" @click="chartClick" />
      <div class="legend pr-20 whitespace-nowrap">
        <div v-for="(d,i) in pieData" :key="i" class="flex mb-4 items-center">
          <div class="w-2 h-2 rounded-full" :style="{background:color[i]}"></div>
          <span class="text-gray-400 ml-2">{{ d.name }} <span>次</span></span>
          <span class="ml-6">{{ d.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>