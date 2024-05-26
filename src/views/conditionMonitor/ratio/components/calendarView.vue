<script setup lang="ts">

</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between">
      <bg-title>每日概况</bg-title>
      在施工点
    </div>
    <calendar>
      <template #default="{day}">
        <div class="items-center py-2 px-1 ">
          <div class="flex items-center justify-between text-sm" :class="{'text-white/50':!day.isCurMonth}">
            <span class="leading-none">{{ day.date.date() }}</span>
            <div class="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <div class="text-center py-3">
            <el-tooltip content="开机时长">
              11h
            </el-tooltip>
          </div>
        </div>
      </template>
    </calendar>
  </div>
</template>

<style scoped lang="scss">

</style>