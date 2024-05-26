<script setup lang="ts">
import LayoutHeader from './components/header.vue'

</script>

<template>
  <div class="flex flex-col h-full">
    <layout-header />
    <router-view />
  </div>
</template>

<style scoped lang="scss">

</style>