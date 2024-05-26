<script setup lang="ts">
import {fetchHistoryList,exportHistoryList} from '@/apis/modules/condition'
import {dateRangeShortcuts} from '@/shared/constant'

const form = reactive<{
  dateRange:[string,string],
  serialNo:string
}>({
  dateRange: ['',''],
  serialNo:'',
})

const {sortChange} = useTableSort(form)

const {list,page,refresh,loading} = usePagination(fetchHistoryList,form,{debounceKeys:['serialNo']})

const table = ref()

const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportHistoryList,form,'历史工况列表','id')


const router = useRouter()

</script>

<template>
  <page-container title="历史工况">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="20" justify="end">
          <el-col :span="6">
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.dateRange"
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
          <el-col :span="4">
            <el-form-item label="机号">
              <serial-no-input v-model="form.serialNo" />
              <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-row :gutter="10">
              <el-col :span="6" :offset="6" class="text-primary">
                <el-button type="info" class="w-full">重置</el-button>
              </el-col>
              <el-col :span="6" class="text-primary">
                <el-button type="primary" class="w-full" @click="refresh">筛选</el-button>
              </el-col>
              <el-col :span="6" class="text-primary">
                <el-button type="primary" class="w-full" plain @click="exportList">导出</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="flex-1 overflow-auto">
      <el-table
        ref="table"
        v-loading="loading"
        height="100%"
        scrollbar-always-on
        :data="list"
        stripe
        class="w-full"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column reserve-selection type="selection" min-width="55" fixed />
        <el-table-column prop="serialNo" label="机号" min-width="180" fixed />
        <el-table-column prop="machineType" label="机型" min-width="160" />
        <el-table-column v-if="$info.roles.includes($Role.admin)" prop="leaseholder" show-overflow-tooltip label="租赁商" min-width="240" />
        <el-table-column prop="totalWorktime" label="日工时(h)" min-width="140" sortable="custom" />
        <el-table-column prop="totalWorktimePumpMotor" label="泵电机时长(h)" width="180" sortable="custom" />
        <el-table-column prop="totalWorktimeTravelMotor" label="行走电机时长(h)" width="180" sortable="custom" />
        <el-table-column prop="actualWorkTime" label="历史实际日工时(h)" min-width="180" sortable="custom" />
        <el-table-column prop="openTime" label="开机时长(h)" min-width="160" sortable="custom" />
        <el-table-column prop="dailyBatteryLevel" label="日耗电量(%)" min-width="130" sortable="custom" />
        <el-table-column prop="beginBatteryLevel" label="开始电量(%)" min-width="130" sortable="custom" />
        <el-table-column prop="endBatteryLevel" label="结束电量(%)" min-width="130" sortable="custom" />
        <el-table-column prop="liftUpTimes" label="举升次数" min-width="130" sortable="custom" />
        <el-table-column prop="faultTimes" label="故障次数" min-width="130" sortable="custom" />
        <el-table-column prop="warningTimes" label="警示次数" min-width="130" sortable="custom" />
        <el-table-column prop="overLoadTimes" label="超载次数" min-width="130" sortable="custom" />
        <el-table-column prop="address" show-overflow-tooltip label="详细地址" min-width="240" />
        <el-table-column prop="date" label="时间" min-width="180" sortable="custom" />
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="120"
        >
          <template #default="{row}">
            <el-button link type="primary" @click="router.push({name:'conditionHistoryDetail', params: { serialNo: row.serialNo },query:{date:row.date.split(' ')[0]}})">工况曲线</el-button>
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
  </page-container>
</template>

<style scoped lang="scss">

</style>