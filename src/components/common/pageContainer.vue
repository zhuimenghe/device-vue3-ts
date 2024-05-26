<script setup lang="ts">
const props = defineProps<{
  title?:string
}>()
</script>

<template>
  <div class="page-container pt-12 pb-8 px-6 max-width flex-1 mx-8 mb-8 min-h-fit flex flex-col">
    <div class="flex items-start mb-4">
      <div v-if="!$slots.title" class="text-xl basis-1/6 flex flex-col items-start">
        {{ props.title }}
        <div style="height:3px" class="mt-4 w-full bg-gradient-to-r from-primary-500 to-white/0"></div>
      </div>
      <div v-else class="basis-1/6">
        <slot name="title"></slot>
      </div>
      <div class="basis-5/6 ">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="flex-1 overflow-auto flex flex-col">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-container{
    // background:linear-gradient(270deg, rgba(93,88,255,0.1) 0%, rgba(123,224,255,0.13) 100%);
    background: url(@/assets/bgs/list-bg.png);
    background-size:100% 100%;
    overflow: auto;
  }
</style>