<script setup lang="ts">
import {DatePickerType} from '@/shared/constant'
import {useStore} from '../store'

const {form} = useStore()

const data = ref([{"month":"2023-01","workRate":null,"rentalRate":3},{"month":"2023-02","workRate":null,"rentalRate":3},{"month":"2023-03","workRate":null,"rentalRate":3},{"month":"2023-04","workRate":null,"rentalRate":3},{"month":"2023-05","workRate":null,"rentalRate":0.0},{"month":"2023-06","workRate":null,"rentalRate":0.0},{"month":"2023-07","workRate":null,"rentalRate":0.0},{"month":"2023-08","workRate":null,"rentalRate":0.0},{"month":"2023-09","workRate":null,"rentalRate":0.0},{"month":"2023-10","workRate":null,"rentalRate":0.0},{"month":"2023-11","workRate":null,"rentalRate":0.0},{"month":"2023-12","workRate":null,"rentalRate":0.0}])

let option = computed(() => {
  let tl = form.dateType === DatePickerType.year ? '月' : '日'
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
      formatter:`{b0}${tl}<br/>{a0}：{c0}%<br/>{a1}：{c1}%`
    },
    xAxis: {
      type: 'category',
      data: data.value.map((d,i) => i + 1)
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
        name:'开工率',
        data: data.value.map((d,i) => d.rentalRate + 2),
        type: 'line',
        smooth: true
      },
      {
        name:'出租率',
        data: data.value.map((d,i) => d.rentalRate),
        type: 'line',
        smooth: true
      },

    ]
  };
})
</script>

<template>
  <e-chart autoresize :option="option" class="h-full" />
</template>

<style scoped lang="scss">
</style>