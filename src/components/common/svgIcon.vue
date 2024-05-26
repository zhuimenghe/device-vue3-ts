<script setup lang="ts">
const props = defineProps<{
    icon:string,
    color?:string
  }>()
</script>

<template>
  <svg class="icon inline-block" :style="{ color: props.color }" aria-hidden="true">
    <use :xlink:href="'#' + props.icon" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>