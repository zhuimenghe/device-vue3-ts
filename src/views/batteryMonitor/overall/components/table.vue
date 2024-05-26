<script setup lang="ts">
import {fetchOverallList,exportOverallList} from '@/apis/modules/battery'
import {useStore} from '../store'
const {chartFilter,topQuery} = toRefs(useStore())

const {sortChange,sortParams} = useTableSort()

const searchKey = ref('')

let query = computed(() => {
  return {
    ...topQuery.value,
    serialNo:searchKey.value,
    ...sortParams,
    lowerPowerTimesList:[],
    chargingTimesList:[],
    dailyBatteryLevelList:[],
    ...chartFilter.value,
  }
})
const {list,page,refresh,loading} = usePagination(fetchOverallList,query,{debounceKeys:['serialNo','leaseholder'],setIndex:true})

const table = ref()
const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportOverallList,query,'电量总览列表','index')

const router = useRouter()
function gotoDetail(row:any) {
  let date = [row.dateRange.substring(0,10),row.dateRange.substring(11,21)]
  router.push({name:'batteryBattery',query:{date,serialNo:row.serialNo}})
}

</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between mb-4">
      <div class="w-80">
        <el-input v-model="searchKey" placeholder="请输入机号">
          <template #append>
            <el-button type="primary" @click="refresh">搜索</el-button>
          </template>
        </el-input>
      </div>
      <el-button type="primary" class="" plain @click="exportList">导出</el-button>
    </div>
    <div class="flex-1 overflow-auto">
      <el-table
        ref="table"
        v-loading="loading"
        scrollbar-always-on
        height="100%"
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
        <el-table-column prop="region" label="大区" min-width="120" />
        <el-table-column v-if="$info.roles.includes($Role.admin)" show-overflow-tooltip prop="leaseholder" label="租赁商" min-width="240" />
        <el-table-column show-overflow-tooltip prop="address" label="地址" min-width="220" />
        <!-- <el-table-column prop="batteryLevel" label="当前电量" min-width="140" sortable="custom" /> -->
        <el-table-column prop="dailyBatteryLevel" label="日平均用电量" min-width="160" sortable="custom" />
        <el-table-column prop="batteryCategory" label="电池类型" min-width="160" />
        <el-table-column prop="chargingTimes" label="充电次数" min-width="130" sortable="custom" />
        <el-table-column prop="lowPowerTimes" label="低电量预警次数" min-width="160" sortable="custom" />
        <el-table-column prop="batterySoc" label="电池健康度" min-width="130" />
        <el-table-column prop="dateRange" label="时间范围" min-width="200" />
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="160"
        >
          <template #default="{row}">
            <el-button link type="primary" @click="gotoDetail(row)">查看日电量概况</el-button>
          </template>
        </el-table-column>
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