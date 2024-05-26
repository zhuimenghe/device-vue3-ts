<script setup lang="ts">
import {exportBatteryList} from '@/apis/modules/battery'
import {useStore} from '../store'
const store = useStore()
const {sortChange,page,getRowKey,handleSelectionChange} = store
const {list,table} = toRefs(store)

</script>

<template>
  <div class="flex flex-col">
    <div class="flex-1 overflow-auto">
      <el-table
        ref="table"
        height="100%"
        scrollbar-always-on
        :data="list"
        stripe
        class="w-full"
        :row-key="getRowKey"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column reserve-selection type="selection" min-width="55" fixed />
        <el-table-column prop="serialNo" label="机号" min-width="180" fixed />
        <el-table-column prop="machineType" label="机型" min-width="160" />
        <el-table-column prop="date" label="日期" min-width="160" />
        <el-table-column prop="maxBatteryLevel" label="最高电量" min-width="140" />
        <el-table-column prop="minBatteryLevel" label="最低电量" min-width="160" />
        <el-table-column prop="dailyBatteryLevel" label="日放电量" min-width="160" sortable="custom" />
        <el-table-column prop="maxVbat" label="最高电压(V)" min-width="130" />
        <el-table-column prop="minVbat" label="最低电压(V)" min-width="130" />
        <el-table-column prop="totalWorktime" label="日电机工作时长(h)" min-width="180" sortable="custom" />
        <el-table-column prop="actualWorkTime" label="日实际工作时长(h)" min-width="180" sortable="custom" />
        <el-table-column prop="liftUpTimes" label="举升次数" min-width="130" sortable="custom" />
        <!-- <el-table-column prop="warningTimes" label="行走次数" min-width="130" sortable="custom" /> -->
      </el-table>
    </div>
    <el-pagination
      v-model:currentPage="page.current"
      v-model:page-size="page.size"
      class="pt-6 justify-end"
      :page-sizes="[10, 20, 40, 80]"
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    />
  </div>
</template>

<style scoped lang="scss">

</style>