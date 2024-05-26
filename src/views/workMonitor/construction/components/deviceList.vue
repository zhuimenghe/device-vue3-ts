<script setup lang="ts">
import {fetchConstructionSiteDevices} from '@/apis/modules/work'
import {useStore} from '../store'
import { useRouteQuery } from '@vueuse/router'

let {deviceQuery,device} = toRefs(useStore())

let devices = ref<any[]>([])
let loading = ref(false)

async function refresh():Promise<any[]> {
  if(!deviceQuery.value.address) {
    return [];
  }
  loading.value = true
  devices.value = await fetchConstructionSiteDevices(deviceQuery.value)
  device.value = devices.value[0]
  loading.value = false
  return devices.value
}
defineExpose({refresh})

// let serialNo = useRouteQuery('serialNo','').value
// refresh().then(() => {
//   //第一次请求更具query address+serialNo 定位
//   device.value = devices.value && devices.value.length ? devices.value.find(d => d.serialNo === serialNo) : null
// })

// watch(deviceQuery,async () => {
//   await refresh()
//   device.value = devices.value[0]
// })
function getRowKey(row: any) {
  return row.serialNo
}
function rowClick(row:any) {
  device.value = row
}

</script>

<template>
  <el-table
    ref="table"
    v-loading="loading"
    height="100%"
    scrollbar-always-on
    :data="devices"
    stripe
    highlight-current-row
    :row-key="getRowKey"
    :current-row-key="device.serialNo"
    class="w-full"
    @row-click="rowClick"
  >
    <el-table-column prop="serialNo" label="机号" min-width="200" fixed />
    <el-table-column prop="machineType" label="设备型号" min-width="140" />
    <el-table-column prop="startDate" label="入场时间" min-width="120" />
    <el-table-column prop="endDate" label="退场时间" min-width="120" />
    <el-table-column prop="totalDays" label="总天数" min-width="70" />
    <el-table-column prop="workDays" label="开工天数" min-width="80" />
    <el-table-column prop="workRate" label="开工率" min-width="90" />
    <el-table-column
      label="查看每日情况"
      fixed="right"
      align="center"
      min-width="120"
    >
      <template #default="{row}">
        <svg-icon icon="iconarrow-right" :class="[row.serialNo==device.serialNo ? 'bg-primary':'bg-primary-300']" class="rounded-full pl-0.5 text-3xl font-bold text-black" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>