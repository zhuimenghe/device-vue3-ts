<!-- <script setup lang="ts">
const tabs = ref([
  {
    path:'/batteryMonitor/overall',
    label:'电池总览',
    active:false
  },
  {
    path:'/batteryMonitor/battery',
    label:'电量概况',
    active:false
  },
  {
    path:'/batteryMonitor/voltage',
    label:'电压概况',
    active:false
  }
])
const route = useRoute();
watchEffect(() => {
  tabs.value.forEach(t => {
    if(route.path.startsWith(t.path)) {
      t.active = true
    }else{
      t.active = false
    }
  })
});
</script>

<template>
  <div class="relative mt-3 flex items-center justify-end z-[100]">
    <tab-btn v-for="t in tabs" :key="t.path" :active="t.active" class="mr-8">
      <router-link class="w-full h-full flex items-center justify-center" :to="t.path">{{ t.label }}</router-link>
    </tab-btn>
  </div>
  <router-view />
</template>

<style scoped lang="scss">

</style> -->