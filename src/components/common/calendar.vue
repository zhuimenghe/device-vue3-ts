<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'

let props = withDefaults(defineProps<{
  monthDate:Date,
}>(),{
  monthDate:() => new Date()
})

const month = ref(dayjs())
watchEffect(() => {
  month.value = dayjs(props.monthDate)
})

export interface DayItem{
  date:dayjs.Dayjs,
  isCurMonth:boolean
}
let days = computed(() => {
  let firstWeekStart = month.value.startOf('M').startOf('w')
  let lastWeekEnd = month.value.endOf('M').endOf('w')
  let days:DayItem[] = []
  while(firstWeekStart.valueOf() <= lastWeekEnd.valueOf()) {
    days.push({
      date:firstWeekStart,
      isCurMonth:firstWeekStart.month() === month.value.month()
    })
    firstWeekStart = firstWeekStart.add(1,'d')
  }
  return days
})

</script>

<template>
  <div class="border border-primary-300 bg-white/10">
    <div class="px-4 py-4 flex justify-between border-b border-primary-300 items-center">
      <span>{{ month.format('YYYY年MM月') }}</span>
      <el-button-group class="text-sm">
        <el-button class="text-sm" @click="month=month.subtract(1,'M')">上个月</el-button>
        <el-button class="text-sm " @click="month=month.add(1,'M')">下个月</el-button>
      </el-button-group>
    </div>
    <div class="px-6 py-7 ">
      <div class="grid grid-cols-7 border-t border-l border-primary-300">
        <div v-for="(d,i) in days" :key="i" class="border-b border-r border-primary-300">
          <slot :day="d">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>