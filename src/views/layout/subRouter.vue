<script setup lang="ts">
import {businessRoutes} from '@/router/routes'

const route = useRoute();

const tabs = computed(() => {
  let busRoute = businessRoutes.find(r => route.path.startsWith(r.path)) || {children:[],path:''}
  let subRoutes = busRoute.children || []
  return subRoutes.filter(r => !r.meta?.hide).map(r => ({
    path:busRoute.path + '/' + r.path,
    name:r.name,
    label:r.meta?.title,
    active:false
  }))
})

// const tabs = ref([
//   // {
//   //   name:'conditionMap',
//   //   label:'设备地图',
//   //   active:false
//   // },
//   {
//     path:'/conditionMonitor/realTime',
//     label:'实时工况',
//     active:false
//   },
//   {
//     path:'/conditionMonitor/history',
//     label:'历史工况',
//     active:false
//   }
// ])
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

</style>