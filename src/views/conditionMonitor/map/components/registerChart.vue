<script setup lang="ts">
import {fetchMachineMapDeviceChart} from '@/apis/modules/condition'
import {DatePickerType} from '@/shared/constant'
import {useStore} from '../store'

let {query} = toRefs(useStore())

let form = reactive({
  date:new Date(),
  type:DatePickerType.year
})

let data = ref<any[]>([])
async function refresh() {
  let params:any = {
    ...query.value,
    year:form.date.getFullYear(),
  }
  if(form.type === DatePickerType.month) {
    params.month = form.date.getMonth() + 1
  }
  let res = await fetchMachineMapDeviceChart(params)
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
      data: data.value.map((d,i) => i + 1)
    },
    yAxis: {
      type: 'value',
      splitNumber:4,
      minInterval:1,
      splitLine:{
        lineStyle:{
          width:0.5
        }
      }
    },
    series: [
      {
        data: data.value.map(d => d.deviceNo),
        type: 'line',
        smooth: true
      }
    ]
  };
})
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="px-4 py-2 flex items-center">
      <span class="mr-10">设备注册</span>
      <div class="flex-1 flex items-center justify-end">
        <el-radio-group v-model="form.type">
          <el-radio-button class="flex-1" :label="DatePickerType.year">年</el-radio-button>
          <el-radio-button class="flex-1" :label="DatePickerType.month">月</el-radio-button>
        </el-radio-group>
        <!-- <machine-type-picker v-model="form.machineType" clearable class="w-32 ml-2" /> -->
        <el-date-picker
          v-model="form.date"
          class="w-40 ml-2"
          :type="form.type"
        />
      </div>
    </div>
    <e-chart autoresize :option="option" class="flex-1" />
  </div>
</template>

<style scoped lang="scss">

</style>