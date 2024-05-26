<script setup lang="ts">
import TableList from './components/table.vue'
import Charts from './components/charts.vue'
import {dateRangeShortcuts} from '@/shared/constant'
import { useRouteQuery } from '@vueuse/router'
import {useStore} from './store'

const {form,refreshAll,exportList} = useStore()
const {loading} = toRefs(useStore())

//初始化query 传参
form.serialNo = useRouteQuery('serialNo','').value
form.dateRange = useRouteQuery<[string, string]>('date',['','']).value
//初始加载数据
if(form.serialNo) {
  refreshAll()
}

</script>

<template>
  <page-container v-loading="loading" title="电量概况">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12">
          <el-col :span="22">
            <el-row :gutter="12">
              <el-col :offset="11" :span="4">
                <el-form-item label="机号">
                  <serial-no-input v-model="form.serialNo" />
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
            <el-button type="primary" class="w-full" @click="refreshAll">筛选</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full" plain @click="exportList">导出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <table-list class="basis-3/5 overflow-auto" />
    <charts class="basis-2/5 pt-3" />
  </page-container>
</template>

<style scoped lang="scss">

</style>