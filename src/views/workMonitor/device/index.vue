<script setup lang="ts">
import { fetchDeviceCareer,exportWorkhourList } from '@/apis/modules/work'
import Charts from './components/charts.vue'
import {useStore} from './store'
import { useRouteQuery } from '@vueuse/router';

let {form,search,page,gotoDetail } = useStore()
let {list,loading} = toRefs(useStore())

//初始化query 传参
form.serialNo = useRouteQuery('serialNo','').value
//初始加载数据
if(form.serialNo) {
  search()
}

let table = ref()
let {exportList,getRowKey,handleSelectionChange} = useTableExport(table,exportWorkhourList,form,'设备运行概况','id')

</script>

<template>
  <page-container v-loading="loading" title="设备运行概况">
    <template #header>
      <div class="flex justify-end">
        <serial-no-input v-model="form.serialNo" class="w-72">
          <template #append>
            <el-button type="primary" @click="search">搜索</el-button>
          </template>
        </serial-no-input>
        <!-- <el-button class="ml-8" type="primary" plain @click="exportList">导出</el-button> -->
      </div>
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
          <el-table-column v-if="$info.roles.includes($Role.admin)" prop="leaseholder" label="租赁商" min-width="200" />
          <el-table-column prop="startDate" label="入库(场)日期" min-width="160" />
          <el-table-column prop="endDate" label="出库(场)日期" min-width="160" />
          <el-table-column label="开工/总天数" min-width="130">
            <template #default="{row}">
              {{ row.workDays }}/{{ row.totalDays }}
            </template>
          </el-table-column>
          <el-table-column label="地址类型" min-width="130">
            <template #default="{row}">
              {{ row.addressCategory==0 ? '施工点':'仓库' }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址" min-width="250" />
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="160"
          >
            <template #default="{row}">
              <el-button v-if="row.addressCategory==0" link type="primary" @click="gotoDetail(row)">查看每日情况</el-button>
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
    <charts class="basis-5/12 pt-3" />
  </page-container>
</template>

<style scoped lang="scss">

</style>