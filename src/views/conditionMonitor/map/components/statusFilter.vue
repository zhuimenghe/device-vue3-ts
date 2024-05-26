<script setup lang="ts">
import {useStore} from '../store'

let {filters,statistics} = toRefs(useStore())
</script>

<template>
  <el-checkbox-group v-model="filters" class="z-50 fixed bottom-4 right-[640px] border-primary-300 border bg-[#0B2143]/80 flex px-10 py-3">
    <el-checkbox :label="1" class="flex">
      <img src="@/assets/map/SPS_1.png" class="w-6" alt="" />
      <span class="text-white ml-2">在线：</span>
      <span class="text-primary">{{ statistics.online }}</span>
    </el-checkbox>
    <el-checkbox :label="0" class="flex">
      <img src="@/assets/map/SPS_0.png" class="w-6" alt="" />
      <span class="text-white ml-2">离线：</span>
      <span class="text-primary">{{ statistics.offline }}</span>
    </el-checkbox>
    <el-checkbox :label="2" class="flex">
      <img src="@/assets/map/SPS_2.png" class="w-6" alt="" />
      <span class="text-white ml-2">故障：</span>
      <span class="text-primary">{{ statistics.fault }}</span>
    </el-checkbox>
  </el-checkbox-group>
</template>

<style scoped lang="scss">
  :deep(.el-checkbox__label){
    display: inline-flex;
    align-items: center;
  }
</style>