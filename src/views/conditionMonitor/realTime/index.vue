<script setup lang="ts">
import {OPEN_STATUS_MAP,DEVICE_STATUS_MAP,LOCK_LEVEL_MAP} from '@/shared/constant'
import { ListRespData, RealtimeConditionResp } from '@/types/types';
import {fetchRealtimeList,exportRealtimeList} from '@/apis/modules/condition'

const defaultForm = useRouteQueryForm({
  serialNo: '', //优先使用query的值，默认''
  areas: [],
  region:'',
  leaseholder:'', //租赁商:
  identifier:'',
  deviceType:'', //设备类型：SPS 自行剪叉车，SPA 自行曲臂车 SPT自行直臂车
  deviceStatus:'',//设备状态：0代表离线，1代表在线
  openStatus: '', //开机状态;0代表关机，1代表开机
  startTotalWorkTime: undefined,
  endTotalWorkTime: undefined,
  lockLevel:'',//1代表一级锁机，2代表二级锁机，999代表永久锁机，0代表解锁
  batteryLevel: "", //电量筛选 "0,20"
})

const {form,resetForm} = useResetForm(defaultForm)

const showMoreFilter = ref(false);

const {sortChange} = useTableSort(form)

let query = computed(() => {
  form.areas = form.areas || []
  return {
    ...form,
    province:form.areas[0] || '',
    city:form.areas[1] || '',
    startTotalWorkTime:form.startTotalWorkTime || null,
    endTotalWorkTime:form.endTotalWorkTime || null,
    // date:'2022-10-27'
  }
})

const {list,page,refresh,loading} = usePagination(fetchRealtimeList,query,{debounceKeys:['serialNo','leaseholder']})

const table = ref()

const {getRowKey,handleSelectionChange,exportList} = useTableExport(table,exportRealtimeList,query,'实时工况列表','serialNo')


const router = useRouter()
function gotoDetail(item:any) {
  router.push({name:'conditionRealTimeDetail', params: { serialNo: item.serialNo }})
}

</script>

<template>
  <page-container title="实时工况">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="4">
            <el-form-item label="机号">
              <serial-no-input v-model="form.serialNo" />
              <!-- <el-input v-model="form.serialNo" placeholder="请输入机号" /> -->
            </el-form-item>
          </el-col>
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
              <lease-picker v-model="form.identifier" clearable value-key="identifier" class="w-full" />
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
            <el-row :gutter="10">
              <el-col
                :span="6"
                class="whitespace-nowrap text-primary flex items-center justify-center cursor-pointer select-none"
                @click="showMoreFilter=!showMoreFilter"
              >
                {{ showMoreFilter ? '收起':'展开' }}
                <el-icon class="ml-1 transition-transform duration-200" :class="{'rotate-180':showMoreFilter}">
                  <i-ep-arrow-down />
                </el-icon>
              </el-col>
              <el-col :span="6" class="text-primary">
                <el-button type="info" class="w-full" @click="resetForm">重置</el-button>
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
        <el-row v-show="showMoreFilter" :gutter="12">
          <el-col :offset="4" :span="4">
            <el-form-item label="设备状态">
              <el-select v-model="form.deviceStatus" placeholder="请选择" clearable class="w-full">
                <el-option v-for="(n,v) in DEVICE_STATUS_MAP" :key="v" :label="n" :value="v" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="开机状态">
              <el-select v-model="form.openStatus" placeholder="请选择" clearable class="w-full">
                <el-option v-for="(n,v) in OPEN_STATUS_MAP" :key="v" :label="n" :value="v" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="总工时(h)">
              <el-row :gutter="0">
                <el-col :span="11">
                  <el-input-number v-model="form.startTotalWorkTime" :max="form.endTotalWorkTime" :controls="false" placeholder="请输入" />
                </el-col>
                <el-col :span="2" class="text-center">-</el-col>
                <el-col :span="11">
                  <el-input-number v-model="form.endTotalWorkTime" :min="form.startTotalWorkTime" :controls="false" placeholder="请输入" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="锁机状态">
              <el-select v-model="form.lockLevel" placeholder="请选择" clearable class="w-full">
                <el-option v-for="(n,v) in LOCK_LEVEL_MAP" :key="v" :label="n" :value="v" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="电量(%)">
              <el-select v-model="form.batteryLevel" placeholder="请选择" clearable class="w-full">
                <el-option label="0-20" value="0,20" />
                <el-option label="21-40" value="21,40" />
                <el-option label="41-60" value="41,60" />
                <el-option label="61-80" value="61,80" />
                <el-option label="81-100" value="81,100" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="flex-1 overflow-auto">
      <el-table
        ref="table"
        v-loading="loading"
        height="100%"
        :data="list"
        scrollbar-always-on
        stripe
        class="w-full"
        :row-key="getRowKey"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column reserve-selection type="selection" width="55" fixed>
          <!-- <template #header>
              <el-checkbox v-model="checkAll" />
            </template>
            <template #default="{row}">
              <el-checkbox :model-value="selections[row.serialNo] || checkAll" @update:modelValue="checked => searchText = newValue"/>
            </template> -->
        </el-table-column>
        <el-table-column prop="serialNo" label="机号" width="180" fixed />
        <el-table-column prop="machineType" label="机型" width="160" />
        <el-table-column prop="region" label="大区" width="130" />
        <el-table-column v-if="$info.roles.includes($Role.admin)" prop="leaseholder" show-overflow-tooltip label="租赁商" width="240" />
        <el-table-column prop="deviceStatus" label="设备状态" width="130">
          <template #default="{row}:{row:RealtimeConditionResp}">
            {{ DEVICE_STATUS_MAP[row.deviceStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="openStatus" label="开机状态" width="130">
          <template #default="{row}:{row:RealtimeConditionResp}">
            {{ OPEN_STATUS_MAP[row.openStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="totalWorktime" label="总工时(h)" width="140" sortable="custom" />
        <el-table-column prop="openTime" label="开机时长(h)" width="140" sortable="custom" />
        <el-table-column prop="totalWorktimePumpMotor" label="举升工时(h)" width="130" sortable="custom" />
        <el-table-column prop="totalWorktimeTravelMotor" label="行走工时(h)" width="130" sortable="custom" />
        <el-table-column prop="actualWorkTime" label="实际工时(h)" width="130" sortable="custom" />
        <el-table-column prop="lastMonthWorkTime" label="上月工时(h)" width="130" sortable="custom" />
        <el-table-column prop="thisMonthWorkTime" label="当月工时(h)" width="130" sortable="custom" />
        <el-table-column prop="yesterdayWorkTime" label="昨日工时(h)" width="130" sortable="custom" />
        <el-table-column prop="todayWorkTime" label="当日工时(h)" width="130" sortable="custom" />
        <el-table-column prop="batteryLevel" label="电量" width="130" sortable="custom" />
        <el-table-column prop="lockLevel" label="锁机状态" width="130">
          <template #default="{row}:{row:RealtimeConditionResp}">
            {{ LOCK_LEVEL_MAP[row.lockLevel] }}
          </template>
        </el-table-column>
        <el-table-column prop="lastCloseTime" label="最近关机时间" width="180" sortable="custom" />
        <el-table-column prop="updateTime" label="更新时间" width="180" sortable="custom" />
        <el-table-column prop="address" show-overflow-tooltip label="详细地址" width="240" />
        <el-table-column prop="lastGpsTime" label="定位时间" width="180" sortable="custom" />
        <el-table-column prop="totalOpenTime" label="出厂后开机时间" width="180" sortable="custom" />
        <el-table-column prop="registerTime" label="出厂时间" width="180" sortable="custom" />
        <!-- <el-table-column prop="offlineTime" label="离线时长(h)" width="180" sortable="custom" /> -->
        <!-- <el-table-column prop="offTime" label="关机时长(h)" width="180" sortable="custom" /> -->
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
        >
          <template #default="{row}">
            <el-button link type="primary" @click="gotoDetail(row)">查看</el-button>
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