<script setup lang="ts">
import {fetchHistoryList,exportHistoryList} from '@/apis/modules/fault'
import {OPEN_STATUS_MAP,DEVICE_STATUS_MAP,LOCK_LEVEL_MAP} from '@/shared/constant'
import {dateRangeShortcuts} from '@/shared/constant'

const defaultForm = useRouteQueryForm<{
  dateRange:[string,string]
  [propName: string]: any
}>({
  dateRange: ['',''],
  serialNo:'',
  leaseholder:'',
  deviceType:'', //设备类型：SPS 自行剪叉车，SPA 自行曲臂车 SPT自行直臂车
  faultLevel:'',
  faultName:''
})

const {resetForm,form} = useResetForm(defaultForm)

const {sortChange} = useTableSort(form)

const {list,page,refresh,loading} = usePagination(fetchHistoryList,form,{debounceKeys:['serialNo','leaseholder','faultName']})

const table = ref()

const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportHistoryList,form,'历史故障列表','id')

const {round} = useTableFormatter();
</script>

<template>
  <page-container title="历史故障">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="21">
            <el-row :gutter="12" justify="end">
              <el-col :span="4">
                <el-form-item label="机号">
                  <serial-no-input v-model="form.serialNo" />
                  <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
                </el-form-item>
              </el-col>
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
              <el-col v-has-role="$Role.admin" :span="4">
                <el-form-item label="租赁商">
                  <lease-picker v-model="form.leaseholder" clearable class="w-full" />
                  <!-- <el-input v-model="form.leaseholder" placeholder="请输入" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="设备类型">
                  <el-select v-model="form.deviceType" class="w-full" clearable placeholder="请选择">
                    <el-option label="自行剪叉车" value="SPS" />
                    <el-option label="自行曲臂车" value="SPA" />
                    <el-option label="自行直臂车" value="SPT" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label="故障级别">
                  <el-select v-model="form.faultLevel" class="w-full" clearable placeholder="请选择">
                    <el-option label="预警" :value="1" />
                    <el-option label="轻微故障" :value="2" />
                    <el-option label="一般故障" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="故障名称">
                  <el-input v-model="form.faultName" placeholder="请输入" />
                  <!-- <el-select v-model="form.faultName" class="w-full" clearable placeholder="请选择">
                    <el-option label="自行剪叉车" value="SPS" />
                    <el-option label="自行曲臂车" value="SPA" />
                    <el-option label="自行直臂车" value="SPT" />
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row :gutter="10">
              <el-col :span="8" class="text-primary">
                <el-button type="info" class="w-full" @click="resetForm">重置</el-button>
              </el-col>
              <el-col :span="8" class="text-primary">
                <el-button type="primary" class="w-full" @click="refresh">筛选</el-button>
              </el-col>
              <el-col :span="8" class="text-primary">
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
        scrollbar-always-on
        height="100%"
        :data="list"
        stripe
        class="w-full"
        :row-key="getRowKey"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column reserve-selection type="selection" width="55" fixed />
        <el-table-column prop="serialNo" label="机号" width="240" fixed />
        <el-table-column prop="machineType" label="机型" width="160" />
        <el-table-column prop="region" label="大区" width="130" />
        <el-table-column v-if="$info.roles.includes($Role.admin)" prop="leaseholder" show-overflow-tooltip label="租赁商" width="200" />
        <el-table-column prop="totalWorktime" label="电机总工时(h)" :formatter="round(2)" width="140" sortable="custom" />
        <el-table-column prop="totalWorktimePumpMotor" label="泵电机工时(h)" :formatter="round(2)" width="140" sortable="custom" />
        <el-table-column prop="totalWorktimeTravelMotor" label="行走电机工时(h)" :formatter="round(2)" width="160" sortable="custom" />
        <el-table-column prop="faultCode" label="故障代码" width="140" />
        <el-table-column prop="faultName" show-overflow-tooltip label="故障名称" width="140" />
        <el-table-column prop="faultLevel" label="故障级别" width="140" />
        <el-table-column prop="triggerList" label="触发时间" width="300">
          <template #default="{row}">
            <el-popover v-if="row.triggerList.length>1" title="故障时间" placement="bottom" :width="360">
              <template #reference>
                <div class="flex items-center">
                  {{ row.triggerList[0].begin_time }}
                  <svg-icon icon="icongantanhao" class="ml-2 text-2xs text-warning" />
                </div>
              </template>
              <div class="whitespace-nowrap">
                <div v-for="(t,i) in row.triggerList" :key="i" class="pt-2">{{ t.begin_time }} ~ {{ t.end_time }}</div>
              </div>
            </el-popover>
            <span v-else>{{ row.triggerList[0].begin_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="triggerList" label="故障次数" width="120">
          <template #default="{row}">
            <span>
              {{ row.triggerList.length }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="during_time" label="累计时长" width="140" />
        <el-table-column prop="address" show-overflow-tooltip label="故障地点" />
        <!-- <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="120"
          >
            <el-button link type="primary">工况曲线</el-button>
          </el-table-column> -->
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