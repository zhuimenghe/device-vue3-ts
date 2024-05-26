<script setup lang="ts">
import {dateRangeShortcuts} from '@/shared/constant'
import Charts from './components/charts.vue'
import { fetchWorkhourList,exportWorkhourList } from '@/apis/modules/work'
import {useRouteQuery} from '@vueuse/router'

let form = reactive<{
    dateRange: [string, string]
    serialNo: string
  }>({
    serialNo: '',
    dateRange: ['', ''],
  })

form.serialNo = useRouteQuery('serialNo','').value
form.dateRange = useRouteQuery<[string, string]>('date',['','']).value

let defaultSerialOptions = form.serialNo ? [{value:form.serialNo}] : [];

let {list,page,refresh} = usePagination(fetchWorkhourList,form, { notNullableVars:['serialNo']})

let table = ref()
let {exportList,getRowKey,handleSelectionChange} = useTableExport(table,exportWorkhourList,form,'每日开机数据列表','id')

</script>

<template>
  <page-container title="每日开机数据列表">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12">
          <el-col :span="22">
            <el-row :gutter="12">
              <el-col :offset="11" :span="4">
                <el-form-item label="机号">
                  <serial-no-input v-model="form.serialNo" :options="defaultSerialOptions" />
                  <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="8">
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
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full" @click="refresh">筛选</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full" plain @click="exportList">导出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="basis-7/12 flex flex-col overflow-auto">
      <div class="flex-1 overflow-auto">
        <el-table
          ref="table"
          height="100%"
          :data="list"
          scrollbar-always-on
          stripe
          class="w-full"
          :row-key="getRowKey"
          @selection-change="handleSelectionChange"
        >
          <el-table-column reserve-selection type="selection" min-width="55" fixed />
          <el-table-column prop="serialNo" label="机号" min-width="180" fixed />
          <el-table-column prop="machineType" label="机型" min-width="160" />
          <el-table-column prop="date" label="日期" min-width="200" />
          <el-table-column prop="beginWorkTime" label="开机时间" min-width="200" />
          <el-table-column prop="endWorkTime" label="关机时间" min-width="200" />
          <el-table-column prop="beginVbat" label="开机电压(v)" min-width="160" />
          <el-table-column prop="beginBatteryLevel" label="开机电量(%)" min-width="130" />
          <el-table-column prop="endVbat" label="关机电压(V)" min-width="130" />
          <el-table-column prop="endBatteryLevel" label="关机电量(%)" min-width="130" />
          <el-table-column prop="dailyBatteryLevel" label="耗电量(%)" min-width="130" />
          <el-table-column prop="liftUpTimes" label="举升次数" min-width="130" />
          <el-table-column prop="totalWorktimePumpMotor" label="泵电机时长" min-width="150" />
          <el-table-column prop="totalWorktimeTravelMotor" label="行走电机时长" min-width="150" />
          <el-table-column prop="openTime" label="开机时长" min-width="150" />
        <!-- <el-table-column prop="warningTimes" label="行走次数" min-width="130" /> -->
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
    <charts class="basis-5/12 pt-3" />
  </page-container>
</template>

<style scoped lang="scss">

</style>