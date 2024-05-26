<script setup lang="ts">
interface Props {
  active?: boolean
}
const props = withDefaults(defineProps<Props>(),{
  active:false
})

</script>

<template>
  <div class="btn pr-2 text-sm" :class="{active:props.active}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .btn{
    @include flex(row,center,center);
    width: 127px;
    height:32px;
    background: url(@/assets/bgs/tab-bg.png);
    background-size: contain;
    &.active{
      background: url(@/assets/bgs/tab-active-bg.png);
      background-size: contain;
      color:theme('colors.primary.DEFAULT');
    }
  }
</style>