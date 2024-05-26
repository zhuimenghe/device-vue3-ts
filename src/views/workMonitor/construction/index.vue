<script setup lang="ts">
import {fetchConstructionSites} from '@/apis/modules/work'
import DeviceList from './components/deviceList.vue'
import CalendarView from './components/calendarView.vue'
import {dateRangeShortcuts} from '@/shared/constant'
import {useStore} from './store'
import { useRouteQuery } from '@vueuse/router'

let {form} = useStore()
let {site,device} = toRefs(useStore())

//初始化query 传参
form.identifier = useRouteQuery('identifier','').value
form.dateRange = useRouteQuery<[string, string]>('dateRange',['','']).value

let defaultFirstLea = !form.identifier

let loading = ref(false)
let sites = ref<any[]>([]);

async function refresh() {
  loading.value = true
  sites.value = await fetchConstructionSites(form)
  loading.value = false
}

let address = useRouteQuery('address','').value
let serialNo = useRouteQuery('serialNo','').value
let deviceList = ref()
onMounted(async () => {
  await refresh()
  //第一次请求更具query address+serialNo 定位
  if(address) {
    site.value = sites.value && sites.value.length ? sites.value.find(s => s.address === address) : {}
  }else{
    site.value = sites.value && sites.value.length ? sites.value[0] || {} : {}
  }
  let devices = await deviceList.value.refresh()
  if(serialNo) {
    device.value = devices.find((d:any) => d.serialNo === serialNo) || {}
  }else{
    device.value = devices[0]
  }
}),

watch(form,async() => {
  await refresh()
  if(!sites.value.find((s:any) => s.address === site.value.address)) {
    site.value = sites.value && sites.value.length ? sites.value[0] || {} : {}
  }
  deviceList.value.refresh()
})

function siteClick(s:any) {
  site.value = s
  deviceList.value.refresh()
}

</script>

<template>
  <page-container title="施工点概况">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="3">
            <el-form-item label="大区">
              <el-select v-model="form.region" class="w-full" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col v-has-role="$Role.admin" :span="5">
            <el-form-item label="租赁商">
              <lease-picker v-model="form.identifier" class="w-full" :default-first-option="defaultFirstLea" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.dateRange"
                :clearable="false"
                type="daterange"
                unlink-panels
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :shortcuts="dateRangeShortcuts"
                value-format="YYYY-MM-DD"
                class="w-full"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full">筛选</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div v-loading="loading" class="h-full flex items-start">
      <div class="h-full basis-1/4 flex flex-col overflow-auto">
        <el-button-group class="text-sm">
          <el-button class=" text-sm focus:bg-primary focus:text-white" :type="form.orderByTime?'primary':''" @click="form.orderByTime=true">时间排序</el-button>
          <el-button class=" text-sm focus:bg-primary focus:text-white" :type="!form.orderByTime?'primary':''" @click="form.orderByTime=false">设备排序</el-button>
        </el-button-group>
        <el-scrollbar class="flex-1 mt-4">
          <div
            v-for="s in sites"
            :key="s.address"
            class="cursor-pointer border border-primary-300 mb-3 py-2 px-6 flex items-center"
            :class="[site.address==s.address?'bg-gradient-to-b from-[rgba(0,193,254,0.1)] to-[rgba(53,187,255,0.5)]':'bg-white/10']"
            @click="siteClick(s)"
          >
            <img src="@/assets/icons/construction.png" class="w-10 mr-5" alt="" />
            <div>
              <div>{{ s.address }}</div>
              <div class="mt-1 text-sm text-white/60">
                <span>施工天数：{{ s.days }}天</span>
                <span class="ml-12">设备数量：{{ s.deviceNumber }}台</span>
              </div>
              <div class="mt-1 text-sm text-white/60">施工周期：{{ s.dateRange }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <device-list ref="deviceList" class="basis-1/2 px-10" />
      <calendar-view class="basis-1/4" />
    </div>
  </page-container>
</template>

<style scoped lang="scss">

</style>