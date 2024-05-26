<script setup lang="ts">
import {fetchRealtimeList,exportRealtimeList} from '@/apis/modules/fault'
import {OPEN_STATUS_MAP,DEVICE_STATUS_MAP,LOCK_LEVEL_MAP} from '@/shared/constant'
const defaultForm = {
  areas: [],
  region:'',
  leaseholder:'', //租赁商
  deviceType:'', //设备类型：SPS 自行剪叉车，SPA 自行曲臂车 SPT自行直臂车
  faultLevel:'',
  faultName:''
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

const {list,page,refresh,loading} = usePagination(fetchRealtimeList,query,{debounceKeys:['leaseholder','faultName']})

const table = ref()

const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportRealtimeList,query,'实时故障列表','id')

const router = useRouter()

</script>

<template>
  <page-container title="实时故障">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12">
          <el-col :span="21">
            <el-row :gutter="12" justify="end">
              <el-col :span="4">
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
                  <lease-picker v-model="form.leaseholder" clearable class="w-full" />
                  <!-- <el-input v-model="form.leaseholder" placeholder="请输入" /> -->
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="设备类型">
                  <el-select v-model="form.deviceType" class="w-full" clearable placeholder="请选择">
                    <el-option label="自行剪叉车" value="SPS" />
                    <el-option label="自行曲臂车" value="SPA" />
                    <el-option label="自行直臂车" value="SPT" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
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
        <el-table-column prop="serialNo" label="机号" min-width="240" fixed />
        <el-table-column prop="machineType" label="机型" min-width="160" />
        <el-table-column prop="region" label="大区" min-width="130" />
        <el-table-column v-if="$info.roles.includes($Role.admin)" prop="leaseholder" show-overflow-tooltip label="租赁商" min-width="200" />
        <el-table-column prop="deviceStatus" label="设备状态" min-width="130">
          <template #default="{row}">
            {{ DEVICE_STATUS_MAP[row.deviceStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="openStatus" label="开机状态" min-width="130">
          <template #default="{row}">
            {{ OPEN_STATUS_MAP[row.openStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="totalWorktime" label="电机总工时(h)" min-width="140" sortable="custom" />
        <el-table-column prop="faultCode" label="故障代码" min-width="140" />
        <el-table-column prop="faultName" label="故障名称" min-width="140" />
        <el-table-column prop="faultLevel" label="故障级别" min-width="140" />
        <el-table-column prop="triggerTime" label="触发时间" min-width="200" />
        <el-table-column prop="address" show-overflow-tooltip label="地址" min-width="300" />
        <!-- <el-table-column
            label="操作"
            fixed="right"
            align="center"
          >
            <el-button link type="primary" @click="gotoDetail">查看</el-button>
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