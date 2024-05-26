<script setup lang="ts">
import {overallList,exportOverallList} from '@/apis/modules/fault'
import {dateRangeShortcuts} from '@/shared/constant'
import type { TableColumnCtx } from 'element-plus'

const defaultForm:{
  dateRange:[string,string]
  [propName: string]: any
} = {
  type:'SPS',
  areas: [],
  region:'',
  identifier:'', //租赁商
  dateRange: ['',''],
}

const {resetForm,form} = useResetForm(defaultForm)

const {sortChange} = useTableSort(form)

let query = computed(() => {
  form.areas = form.areas || []
  return {
    ...form,
    province:form.areas[0] || '',
    city:form.areas[1] || '',
  }
})
const {list,page,refresh,loading} = usePagination(overallList,query,{debounceKeys:[]})
const headers = computed(() => {
  return list.value.length ? Object.keys(list.value[0]).filter(k => k !== 'faultName' && k !== 'total') : []
})
const tableData = computed(() => list.value.slice(0,-1))
interface SummaryMethodProps<T = any> {
  columns: TableColumnCtx<T>[]
  data: T[]
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = ['总计']
  let sumRow = list.value[list.value.length - 1]
  if(sumRow) {
    headers.value.forEach(h => sums.push(sumRow[h]))
    sums.push(sumRow.total)
  }

  return sums
}

const table = ref()

const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportOverallList,query,'故障统计','id')

</script>

<template>
  <page-container>
    <template #title>
      <el-tabs v-model="form.type" class="tabs">
        <el-tab-pane label="剪叉车" name="SPS" />
        <el-tab-pane label="臂车" name="SPA" />
      </el-tabs>
    </template>
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="21">
            <el-row :gutter="12" justify="end">
              <el-col :span="4" :offset="6">
                <el-form-item label="省市">
                  <region-cascader v-model="form.areas" class="w-full" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="大区">
                  <el-select v-model="form.region" class="w-full" placeholder="请选择" />
                </el-form-item>
              </el-col>
              <el-col v-has-role="$Role.admin" :span="4">
                <el-form-item label="租赁商">
                  <lease-picker v-model="form.identifier" clearable class="w-full" />
                  <!-- <el-input v-model="form.leaseholder" placeholder="请输入" /> -->
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
        :data="tableData"
        show-summary
        :summary-method="getSummaries"
        border
        class="w-full el-table"
        :row-key="getRowKey"
        @sort-change="sortChange"
      >
        <el-table-column prop="faultName" label="设备型号" width="240" fixed />
        <el-table-column v-for="h in headers" :key="h" :prop="h" :label="h" min-width="200">
          <template #default="{row}">
            <router-link :to="{name:'faultHistory',query:{faultName:row.faultName}}">{{ row[h] }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="总计"
          fixed="right"
          align="center"
          width="120"
          prop="total"
        />
      </el-table>
    </div>
  </page-container>
</template>
<style scoped lang="scss">
  .tabs{
    :deep(.el-tabs__nav-wrap::after){
      background: none!important;
    }
    :deep(.el-tabs__item){
      background: none!important;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .el-table{
    --el-table-border-color:#3D6088!important;
  }
</style>