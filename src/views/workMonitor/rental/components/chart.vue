<script setup lang="ts">
let option = computed(() => {
  return {
    color:['#06F19A','#FE931F'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      itemGap:30,
      right:0,
      textStyle:{
        color:'#fff'
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      top:'50',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月','二月','3月','1月','二月','3月','1月','二月','3月','1月','二月','12月'],
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
          fontSize:14,
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
        name: '剪叉总数',
        type: 'bar',
        barWidth: '15%',
        data: [14,56,34,76,14,56,34,76,14,56,34,76],
      },
      {
        name: '臂车总数',
        type: 'bar',
        barWidth: '15%',
        data: [23,65,43,12,23,65,43,12,23,65,43,12],
      },
    ]
  };
})
</script>

<template>
  <div class="flex py-4 px-6">
    <div class="flex flex-col h-full justify-evenly mr-20 whitespace-nowrap">
      <div class="flex items-center">
        <img src="@/assets/icons/warehouse.png" class="w-10" alt="" />
        <div class="ml-5">
          <div class="text-sm">仓库数量：</div>
          <div class="text-success text-xl">20</div>
        </div>
      </div>
      <div class="flex items-center">
        <img src="@/assets/icons/construction.png" class="w-10" alt="" />
        <div class="ml-5">
          <div class="text-sm">施工点数量：</div>
          <div class="text-warning text-xl">20</div>
        </div>
      </div>
    </div>
    <e-chart class="flex-1" :option="option" />
  </div>
</template>

<style scoped lang="scss">

</style>