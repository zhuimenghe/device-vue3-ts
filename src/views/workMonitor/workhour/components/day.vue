<script setup lang="ts">
import TimeBar from './timeBar.vue'
const props = withDefaults(defineProps<{
  openData?:any[],
  workData?:any[],
}>(),{
  openData:() => [],
  workData:() => []
})

</script>

<template>
  <div class="flex-col flex py-4 justify-center ml-8">
    <time-bar title="实际工作时段" color="#06F19A" :list="props.workData" class="flex-1 max-h-32" />
    <time-bar title="开机时段" color="#FE931F" :list="props.openData" class="flex-1 mt-8 max-h-32" />
  </div>
</template>

<style scoped lang="scss">

</style>