<script setup lang="ts">
import {useStore} from '../store'
let {cur} = toRefs(useStore())

let props = withDefaults(defineProps<{
  index:number,
  source:any
}>(),{
  source:() => ({}),
})
</script>

<template>
  <div class="border-b border-dashed border-primary-300 py-4" @click="cur=source">
    <div class="flex">
      <span>{{ source.serialNo }}</span>
      <el-tag
        class="ml-2"
        :type="source.type"
        effect="light"
      >{{ source.typeStr }}</el-tag>
    </div>
    <div class="flex mt-2">
      <svg-icon icon="icondingwei3" class="mt-0.5 mr-2" />
      <span class="text-sm flex-1">{{ source.address }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>