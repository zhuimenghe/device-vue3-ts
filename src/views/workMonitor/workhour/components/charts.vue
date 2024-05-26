<script setup lang="ts">
import {fetchDeviceBatteryLevels} from '@/apis/modules/work'
import Year from './year.vue'
import Month from './month.vue'
import Day from './day.vue'
import {DatePickerType} from '@/shared/constant'
import { useRouteQuery } from '@vueuse/router'

let form = reactive({
  serialNo:'',
  date: new Date(),
  type:DatePickerType.year
})


let query = computed<any>(() => {
  let q:any = {
    serialNo:form.serialNo,
    year:form.date.getFullYear(),
  }
  if(form.type === DatePickerType.month) {
    q.month = form.date.getMonth() + 1
  }
  if(form.type === DatePickerType.day) {
    q.month = form.date.getMonth() + 1
    q.day = form.date.getDate()
  }
  return q
})

let d = ref<any>({data:[],openData:[],workData:[]})
watchDebouncedKeys(query,async () => {
  if(query.value.serialNo) {
    d.value = await fetchDeviceBatteryLevels(query.value)
  }
},['serialNo'])

let dateQuery = useRouteQuery<[string,string]>('date',['','']).value[0]
form.serialNo = useRouteQuery<string>('serialNo','').value
form.date = dateQuery ? new Date(dateQuery) : new Date()
form.type = dateQuery ? DatePickerType.day : DatePickerType.year

</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <bg-title>每日电量概况</bg-title>
      <el-form class="flex" :model="form">
        <el-button-group class="ml-4">
          <el-button type="primary" :plain="form.type!==DatePickerType.year" @click="form.type=DatePickerType.year">年</el-button>
          <el-button type="primary" :plain="form.type!==DatePickerType.month" @click="form.type=DatePickerType.month">月</el-button>
          <el-button type="primary" :plain="(form.type!==DatePickerType.day)" @click="form.type=DatePickerType.day">日</el-button>
        </el-button-group>
        <el-form-item class="ml-6" label="机号">
          <serial-no-input v-model="form.serialNo" />
          <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
        </el-form-item>
        <el-form-item class="ml-6" label="年份">
          <el-date-picker
            v-model="form.date"
            :type="form.type"
          />
        </el-form-item>
        <el-button type="primary" class="w-16 ml-6">查询</el-button>
      </el-form>
    </div>
    <div class="flex-1 flex items-end">
      <div class="basis-52 flex flex-col h-full pt-14 text-sm">
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#06F19A]">{{ d.ActualWorkTime }}</span>
          <span>实际工作总时长(h)</span>
        </div>
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#FE931F]">{{ d.openTime }}</span>
          <span>开机总时长(h)</span>
        </div>
        <div class="bg-white/5 flex-1 mb-6 flex flex-col items-center justify-center leading-tight">
          <span class="text-4xl text-[#716EFC]">{{ d.workTime }}</span>
          <span>电机总时长(h)</span>
        </div>
      </div>
      <year v-if="form.type==DatePickerType.year" :list="d.data" class="flex-1 h-full" />
      <month v-if="form.type==DatePickerType.month" :list="d.data" class="flex-1 h-full" />
      <day v-if="form.type==DatePickerType.day" :open-data="d.openData" :work-data="d.workData" class="flex-1 h-full" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>