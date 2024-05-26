<script setup lang="ts">
import TableList from './components/table.vue'
import pie from './components/pieChart.vue'
import stack from './components/stackChart.vue'
import bar from './components/barChart.vue'
import {dateRangeShortcuts} from '@/shared/constant'
import {useStore} from './store'

const {resetForm,form,refresh} = useStore()
const {loading} = toRefs(useStore())
</script>

<template>
  <page-container v-loading="loading" title="电池总览">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12">
          <el-col :span="21">
            <el-row :gutter="12" justify="end">
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
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-row :gutter="10">
              <el-col :span="8" :offset="8" class="text-primary">
                <el-button type="info" class="w-full" @click="resetForm">重置</el-button>
              </el-col>
              <el-col :span="8" class="text-primary">
                <el-button type="primary" class="w-full" @click="refresh">筛选</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="basis-2/5 flex">
      <pie class="flex-1 h-full" />
      <stack class="flex-1 h-full" />
      <bar class="flex-1 h-full" />
    </div>
    <div class="basis-3/5 overflow-auto">
      <table-list />
    </div>
  </page-container>
</template>

<style scoped lang="scss">

</style>