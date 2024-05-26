<script setup lang="ts">
import {fetchHistoryDetail} from '@/apis/modules/condition'
import battery from './components/battery.vue'
import voltage from './components/voltage.vue'
import openTime from './components/openTime.vue'
import workTime from './components/workTime.vue'
import dayjs from 'dayjs'

let props = defineProps<{
  serialNo:string,
}>()


//form和数据加载
let route = useRoute()
const form = reactive<{
  dateRange:[string,string],
  serialNo:string,
  category:string
}>({
  dateRange: route.query.date ? [route.query.date as string,route.query.date as string] : ['',''],
  serialNo: props.serialNo,
  category:'batteryLevel'//分类  batteryLevel 电量  vbat电压  actualWorkTime 实际工作时长  openTime开机市场
})
let data = ref([])
async function refresh() {
  data.value = await fetchHistoryDetail(form) || [];
}
refresh()
watch(form,refresh)

//动态图表配置
let charts: { [propName: string]: any } = {
  batteryLevel:battery,
  vbat:voltage,
  openTime:openTime,
  actualWorkTime:openTime,
}

//日历最多选一个月逻辑处理
let firstPickDate:Date | null
watch(() => form.dateRange,(range) => {
  firstPickDate = null
})
function dateRangeChange(dates:Array<any>) {
  if(dates && dates.length) {
    firstPickDate = dates[0]
  }
}
const disabledDate = (time: Date) => {
  if(firstPickDate) {
    return Math.abs(dayjs(firstPickDate).diff(time,'M')) >= 1
  }
  return false;
}

//router
const router = useRouter()
</script>

<template>
  <page-container :title="serialNo">
    <template #header>
      <div class="w-full flex justify-end">
        <el-button type="primary" plain @click="router.back()">返回</el-button>
      </div>
    </template>
    <el-form class="" :model="form">
      <el-row :gutter="20" justify="end">
        <el-col :span="4">
          <el-form-item label="机号">
            <serial-no-input v-model="form.serialNo" />
            <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.dateRange"
              type="daterange"
              unlink-panels
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD"
              class="w-full"
              :disabled-date="disabledDate"
              @calendar-change="dateRangeChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="选择参数">
            <el-select v-model="form.category" class="w-full" placeholder="请选择">
              <el-option label="电量" value="batteryLevel" />
              <el-option label="电压" value="vbat" />
              <!-- <el-option label="实际工作时长" value="actualWorkTime" />
              <el-option label="开机时长" value="openTime" /> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1" :offset="10">
          <el-button type="primary" class="w-full" @click="refresh">查看</el-button>
        </el-col>
      </el-row>
    </el-form>
    <component :is="charts[form.category]" :d="data" :filter="form" class="flex-1 flex flex-col" />
  </page-container>
</template>

<style scoped lang="scss">
</style>