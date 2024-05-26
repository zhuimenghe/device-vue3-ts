<script setup lang="ts">
import Chart from './chart.vue'
import Collapse from './collapse.vue'
import {useStore} from '../store'

let {data,curPoint} = toRefs(useStore())
let {exportData} = useStore()

watch(curPoint,() => {
  let id = `collapse_${curPoint.value.index}`
  let el = document.getElementById(id)
  el?.scrollIntoView({behavior: "smooth"})
})

</script>

<template>
  <div class="flex flex-col overflow-auto">
    <!-- <chart class="h-52 border-primary-300 border flex" /> -->
    <div class="flex-1 border-primary-300 border pt-5 px-5 flex flex-col overflow-auto">
      <div class="flex items-center justify-between">
        <bg-title>设备统计</bg-title>
        <el-button type="primary" plain @click="exportData">导出</el-button>
      </div>
      <el-scrollbar class="flex-1 overflow-auto mt-4">
        <collapse v-for="(d) in data.data" :id="'collapse_'+d.index" :key="d.address" :d="d" class="mb-4" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>