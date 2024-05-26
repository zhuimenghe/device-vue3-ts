<script setup lang="ts">
import WorkRatio from './workRatioChart.vue'
import RentRatio from './rentRatioChart.vue'
import {fetchMachineMapWorkRateChart,fetchMachineMapRentalRateChart} from '@/apis/modules/condition'
import {DatePickerType} from '@/shared/constant'
import {useStore} from '../../store'

const chartType = ref(0);

let {query} = toRefs(useStore())

let form = reactive({
  date:new Date(),
  type:DatePickerType.year
})

let workData = ref<any[]>([])
let rentalData = ref<any[]>([])
async function refresh() {
  let params:any = {
    ...query.value,
    year:form.date.getFullYear(),
  }
  if(form.type === DatePickerType.month) {
    params.month = form.date.getMonth() + 1
  }
  let res = await fetchMachineMapWorkRateChart(params)
  res.forEach((r:any) => {
    r.rate = Math.round(r.workRate * 10000) / 100
  })
  workData.value = res

  let res2 = await fetchMachineMapRentalRateChart(params)
  res2.forEach((r:any) => {
    r.rate = Math.round(r.rentalRate * 10000) / 100
  })
  rentalData.value = res2
}
watchEffect(refresh)

</script>

<template>
  <div class="h-full flex flex-col relative">
    <el-tabs v-model="chartType" class="tabs flex-1 flex flex-col">
      <el-tab-pane label="出租率" :name="0">
        <rent-ratio :data="rentalData" :type="form.type" />
      </el-tab-pane>
      <el-tab-pane label="开工率" :name="1">
        <work-ratio :data="workData" :type="form.type" />
      </el-tab-pane>
    </el-tabs>
    <div class="absolute right-4 top-2 flex items-center justify-end">
      <el-radio-group v-model="form.type">
        <el-radio-button class="flex-1" :label="DatePickerType.year">年</el-radio-button>
        <el-radio-button class="flex-1" :label="DatePickerType.month">月</el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="form.date"
        class="w-40 ml-2"
        :type="form.type"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs{
  :deep(.el-tabs__nav-wrap){
    padding:4px 16px;
    &::after{
      background: none!important;
    }

  }
  :deep(.el-tabs__item){
    background: none!important;
    font-weight: bold;
  }
  :deep(.el-tabs__content){
    flex:1;
    .el-tab-pane{
      height:100%;
    }
  }
}
</style>