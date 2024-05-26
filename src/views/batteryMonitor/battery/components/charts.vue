<script setup lang="ts">
import {fetchBatteryChart} from '@/apis/modules/battery'
import {useStore} from '../store'

const store = useStore()
const {dailyStatus,chartData} = toRefs(store)

const option = computed(() => {
  let lowHighData:any[] = [];
  let barData = [];
  for (let i = 0; i < chartData.value.length; i++) {
    let d = chartData.value[i]
    let time = +new Date(d.date)
    lowHighData.push([
      time,
      d.minBatteryLevel,
      d.maxBatteryLevel,
    ]);
    barData.push([time,Math.round(d.dailyBatteryLevel)]);
  }
  return {
    color:['#35BBFF','#FE931F','#06F19A','#707A95'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['日耗电量', '每日最低电量','每日最高电量'],
      textStyle:{
        color:'#fff'
      },
      right:10
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '48px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'time',
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
        name: '电量(%)',
        nameTextStyle:{
          fontSize:16,
          color:'#fff',
          padding: [0, 0, 10, 0]
        },
        axisLabel:{
          fontSize:14
        },
        max:100,
        splitNumber:10,
        splitLine:{
          lineStyle:{
            width:0.5
          }
        }
      }
    ],
    dataZoom:{
      type: 'slider',
      start: 0,
      end: chartData.value.length / 30 > 1 ? 100 * 30 / chartData.value.length : 100 //初始最多显示500条
    },
    series: [
      {
        name: '日耗电量',
        type: 'bar',
        barWidth: '35%',
        data: barData
      },
      {
        type: 'custom',
        name: '每日最低电量',
        itemStyle: {
          borderWidth: 1.5
        },
        renderItem: function (params:any, api:any):any {
          let xValue = api.value(0);
          let lowPoint = api.coord([xValue, api.value(1)]);
          let halfWidth = api.size([86400000,0])[0] * 0.175; //86400000毫秒是一格
          return {
            type: 'group',
            children: [

              {
                type: 'line',
                transition: ['shape'],
                shape: {
                  x1: lowPoint[0] - halfWidth,
                  y1: lowPoint[1],
                  x2: lowPoint[0] + halfWidth,
                  y2: lowPoint[1]
                },
                style: api.style({
                  stroke: '#FE931F',
                  fill: undefined
                })
              },
              {
                type:'text',
                style: {
                  x: lowPoint[0],
                  y: lowPoint[1] + 4,
                  text: api.value(1),
                  fill: '#fff',
                  textFont: api.font({ fontSize: 14 }),
                  textAlign:'center'
                }
              }
            ]
          };
        },
        encode: {
          x: 0,
          y: [1, 2]
        },
        data: lowHighData.map(d => d.slice(0,2)),
        z: 100
      },
      {
        type: 'custom',
        name: '每日最高电量',
        itemStyle: {
          borderWidth: 1.5
        },
        renderItem: function (params:any, api:any) {
          let xValue = api.value(0);
          let lowPoint = api.coord([xValue, api.value(1)]);
          let highPoint = api.coord([xValue, api.value(2)]);
          let halfWidth = api.size([86400000, 0])[0] * 0.175;
          return {
            type: 'group',
            children: [
              {
                type: 'line',
                transition: ['shape'],
                shape: {
                  x1: highPoint[0],
                  y1: highPoint[1],
                  x2: lowPoint[0],
                  y2: lowPoint[1]
                },
                style: api.style({
                  stroke: '#707A95',
                  fill: undefined
                })
              },
              {
                type: 'line',
                transition: ['shape'],
                shape: {
                  x1: highPoint[0] - halfWidth,
                  y1: highPoint[1],
                  x2: highPoint[0] + halfWidth,
                  y2: highPoint[1]
                },
                style: api.style({
                  stroke: '#06F19A',
                  fill: undefined
                })
              },
              {
                type:'text',
                style: {
                  x: highPoint[0],
                  y: highPoint[1] - 18,//坐标点是左上角开始
                  text: api.value(2),
                  fill: '#fff',
                  textFont: api.font({ fontSize: 14 }),
                  textAlign:'center'
                }
              },
            ]
          };
        },
        encode: {
          x: 0,
          y: [1, 2]
        },
        data: lowHighData,
        z: 99
      }
    ]
  };
})
</script>

<template>
  <div class="flex flex-col">
    <bg-title>每日电量概况</bg-title>
    <div class="flex-1 flex items-end">
      <div class="basis-52 flex flex-col h-full pt-14 text-sm">
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#06F19A]">{{ dailyStatus.dailyBatteryLevel }}%</span>
          <span>日平均耗电量</span>
        </div>
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#FE931F]">{{ dailyStatus.chargingTimes }}</span>
          <span>充电次数</span>
        </div>
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#716EFC]">{{ dailyStatus.lowPowerTimes }}</span>
          <span>低电量预警次数</span>
        </div>
      </div>
      <e-chart autoresize :option="option" class="flex-1" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>