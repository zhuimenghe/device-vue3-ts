<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import {fetchConstructionSiteDeviceWorks} from'@/apis/modules/work'
import {useStore} from '../store'
import {DayItem} from '@/components/common/calendar.vue'

let {calendarQuery,device} = toRefs(useStore())

let startDate = ref(dayjs())
watch(device,() => {
  startDate.value = dayjs(device.value.startDate,'YYYY-MM-DD')
})

function isWork(day:DayItem) {
  let wr = records.value.find((r:any) => r.date === day.date.format('YYYY-MM-DD HH:mm:ss'))
  return wr ? wr.workStatus === 1 : false;
}
function isWorkStartDate(day:DayItem) {
  let workStartDate = records.value.length ? dayjs(records.value[0].date) : null
  return day.date.isSame(workStartDate,'d')
}
function isWorkEndDate(day:DayItem) {
  let workEndDate = records.value.length ? dayjs(records.value[records.value.length - 1].date) : null
  return day.date.isSame(workEndDate,'d')
}

let loading = ref(false)
let records = ref<any>([])
watchDebounced(calendarQuery,async () => {
  if(!calendarQuery.value.serialNo) {
    return;
  }
  loading.value = true
  records.value = await fetchConstructionSiteDeviceWorks(calendarQuery.value)
  loading.value = false
}, { debounce: 50 },)

const router = useRouter()
function gotoDetail(d:DayItem) {
  if(isWork(d)) {
    let date = [d.date.format('YYYY-MM-DD'),d.date.format('YYYY-MM-DD')]
    router.push({name:'workhour',query:{date,serialNo:device.value.serialNo}})
  }
}

</script>

<template>
  <calendar :month-date="startDate.toDate()">
    <template #default="{day}">
      <div :class="{'bg-primary-500':isWork(day),'cursor-pointer':isWork(day)}" class="flex flex-col items-center h-24 py-2 px-1 " @click="gotoDetail(day)">
        <div class="w-full text-sm" :class="{'text-white/50':!day.isCurMonth}">{{ day.date.date() }}</div>
        <div class="flex-1 pt-4">
          <svg-icon v-if="isWorkStartDate(day)" icon="iconzl--ruchang" class="text-warning " :class="isWorkEndDate(day) ? 'text-xl':'text-4xl'" />
          <svg-icon v-if="isWorkEndDate(day)" icon="iconzl--chuchang" class="text-primary " :class="isWorkStartDate(day) ? 'text-xl':'text-4xl'" />
        </div>
      </div>
    </template>
  </calendar>
</template>

<style scoped lang="scss">

</style>