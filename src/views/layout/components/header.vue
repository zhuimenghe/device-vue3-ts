<script setup lang="ts">
import { useRoute } from 'vue-router';
import {businessRoutes} from '@/router/routes'
import {useUserInfo} from '@/store/userInfo'

let {logout} = useUserInfo()

let initTabs = businessRoutes.map(r => ({
  path:r.path,
  label:r.meta?.title,
  active:false
})) || []
const tabs = ref(initTabs)
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
  <div class="header relative z-[100]">
    <img src="@/assets/logos/logo-title.png" alt="" class="logo" />
    <div class="tabs">
      <router-link v-for="t in tabs" :key="t.path" :class="{active:t.active}" class="tab" :to="t.path">{{ t.label }}</router-link>
    </div>
    <div class="actions">
      <svg-icon icon="icontuichu" class="text-xl cursor-pointer" @click="logout" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .header{
    background: url(@/assets/bgs/header-bg.png);
    background-size: 100% 100%;
    height:66px;
    .tabs{
      position: absolute;
      // width:100%;
      left:50%;
      transform: translateX(-50%);
      height:54px;
      // font-weight: bold;
      @include flex(row,center,center);
      font-size: theme('fontSize.lg');
      .tab{
        border-top:3px solid transparent;
        width:136px;
        height:100%;
        @include flex(row,center,center);
        &.active{
          border-top:3px solid theme('colors.primary.DEFAULT');
          background: linear-gradient(360deg, rgba(0,193,254,0.1) 0%, rgba(53,187,255,0.5) 100%);
          color:theme('colors.primary.DEFAULT')
        }
      }
    }
    .logo{
      margin-left:10px;
      margin-top:13px;
      width:250px;
      float: left;
    }
    .actions{
      float: right;
      height:100%;
      margin-right:35px;
      @include flex(row,center);
    }
  }
</style>