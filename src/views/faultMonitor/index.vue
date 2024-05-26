<!-- <script setup lang="ts">
const tabs = ref([
  // {
  //   name:'conditionMap',
  //   label:'设备地图',
  //   active:false
  // },
  {
    path:'/faultMonitor/realTime',
    label:'实时故障',
    active:false
  },
  {
    path:'/faultMonitor/history',
    label:'历史故障',
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