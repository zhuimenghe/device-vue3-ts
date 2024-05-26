<script setup lang="ts">
import { fetchRentalPointData } from '@/apis/modules/work'
import {useStore} from '../store'

let props = defineProps<{
  d:any
}>()

let {curPoint} = toRefs(useStore())
let collpased = ref(true)
watch(curPoint,() => {
  if(curPoint.value.index === props.d.index) {
    collpased.value = false
  }
})

let data = ref<any[]>([])
let {form} = useStore()
let loading = ref(true)
watch(collpased,async () => {
  if(!collpased.value && !data.value.length) {
    //加载数据
    data.value = await fetchRentalPointData({...form,address:props.d.address})
    data.value.forEach(m => {
      m.icon = m.serialNo.startsWith('SPS') ? 'iconjiancha' : m.serialNo.startsWith('SPA') ? 'iconqubi' : 'iconzhibi'
    })
    loading.value = false
  }
})

</script>

<template>
  <div>
    <div class="border border-primary-300 bg-white/10 flex py-2.5">
      <div class="basis-1/5 pr-8 pl-2 border-l-2 border-primary">
        <span>{{ d.isHome ? '仓库' : '施工点' }}（{{ d.deviceNumber }}）</span>
        <!-- <span class="ml-8">开机/关机：<span class="text-success">2</span>/1</span> -->
      </div>
      <div class="basis-4/5 mr-8">
        地址：{{ d.address }}
      </div>
      <div class="flex items-center px-6 text-primary whitespace-nowrap cursor-pointer" @click="collpased=!collpased">
        {{ collpased ? '展开':'收起' }} <svg-icon class="ml-2 transition-transform" :class="{'rotate-180':!collpased}" icon="iconarrow-down" />
      </div>
    </div>
    <div v-if="!collpased" v-loading="loading" class="grid grid-cols-3 gap-x-5 gap-y-4 mt-4" style="min-height:100px">
      <div v-for="(m,i) in data" :key="i" class="bg-white/10 rounded border border-primary-300 py-4 px-2.5">
        <div class="flex items-center">
          <svg-icon :icon="m.icon" class="text-success text-[80px] px-2" />
          <div class="flex-1">
            <div>{{ m.serialNo }}</div>
            <div class="text-sm text-white/70 mt-2">{{ m.machineType }}</div>
            <div class="text-sm text-white/70 mt-2 flex">
              <span class="flex-1">电量：<span class="text-success">{{ m.batteryLevel }}%</span></span>
              <span class="pr-4">入{{ d.isHome?'库':'场' }}：<span class="text-success">{{ m.days }}天</span></span>
            </div>
          </div>
        </div>
        <div class="mt-4 text-sm">最近入{{ d.isHome?'库':'场' }}时间：{{ m.beginTime }}</div>
        <div class="mt-2 text-sm">最近更新时间：{{ m.updateTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>