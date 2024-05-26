<script setup lang="ts">
import { Color } from 'csstype';
import dayjs from 'dayjs';

const props = defineProps<{
  title:string,
  color:Color,
  list:any[]
}>()

let draws = computed(() => {
  let startTime = props.list.length ? dayjs(props.list[0].begin_time).startOf('d') : null
  return props.list.map(d => {
    let left = 100 * dayjs(d.begin_time).diff(startTime,'ms') / (24 * 60 * 60 * 1000) + '%'
    let length = 100 * dayjs(d.end_time).diff(dayjs(d.begin_time),'ms') / (24 * 60 * 60 * 1000) + '%'
    return {left,length}
  })
})

</script>

<template>
  <div class="flex flex-col pl-6">
    <span>{{ props.title }}</span>
    <div class="bar mt-7 flex-1 flex relative">
      <div v-for="(n,i) in 12" :key="i" class="flex-1 h-full mr-0.5 last:mr-0 bg-white/20 w-full">
      </div>
      <div v-for="(d,i) in draws" :key="i" class="absolute h-full" :style="{backgroundColor:props.color,width:d.length,left:d.left}"></div>
    </div>
    <div class="flex">
      <div v-for="(n,i) in 12" :key="i" class="flex-1 flex mr-0.5 last:mr-0">
        <span class="-translate-x-1/2 mt-1 text-sm">{{ (i>=5?'':'0')+i*2+':00' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>