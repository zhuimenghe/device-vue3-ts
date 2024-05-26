<script setup lang="ts">
import VoltageBattery from './components/voltageBattery.vue'
import {dateRangeShortcuts} from '@/shared/constant'
import {useStore} from './store'
import {useRouteQuery} from '@vueuse/router'

let {form} = useStore()
form.serialNo = useRouteQuery('serialNo','').value
form.dateRange = useRouteQuery<[string, string]>('date',['','']).value

let vbChart = ref()
function refresh() {
  vbChart.value.reload()
}

if(form.serialNo) {
  onMounted(refresh)
}

</script>

<template>
  <page-container title="电压概况">
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
            <el-button type="primary" class="w-full" @click="refresh()">筛选</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full" plain>导出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <voltage-battery ref="vbChart" />
  </page-container>
</template>

<style scoped lang="scss">

</style>