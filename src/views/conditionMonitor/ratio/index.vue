<script setup lang="ts">
import deviceList from './components/deviceList.vue';
import calendarView from './components/calendarView.vue';
import chart from './components/chart.vue';
import {DatePickerType} from '@/shared/constant'

import {useStore} from './store'

const {form} = useStore()

let loading = ref(false)

</script>

<template>
  <page-container title="开工、出租率">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="3">
            <el-form-item label="大区">
              <el-select v-model="form.region" class="w-full" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="省市">
              <region-cascader v-model="form.areas" class="w-full" />
            </el-form-item>
          </el-col>
          <el-col v-has-role="$Role.admin" :span="5">
            <el-form-item label="租赁商">
              <lease-picker v-model="form.identifier" class="w-full" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备型号">
              <machine-type-picker v-model="form.machineTypeList" clearable class="w-full" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-radio-group v-model="form.dateType" class="w-full">
                <el-radio-button class="flex-1" :label="DatePickerType.year">年</el-radio-button>
                <el-radio-button class="flex-1" :label="DatePickerType.month">月</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.date"
                :type="form.dateType"
                class="w-full"
              />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="info" class="w-full">重置</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full">筛选</el-button>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" plain class="w-full">导出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div v-loading="loading" class="h-full flex items-start">
      <div class="h-full basis-1/4 flex flex-col overflow-auto">
        <el-button-group class="text-sm">
          <el-button class=" text-sm focus:bg-primary focus:text-white" :type="form.orderByTime?'primary':''" @click="form.orderByTime=true">开工率排序</el-button>
          <el-button class=" text-sm focus:bg-primary focus:text-white" :type="!form.orderByTime?'primary':''" @click="form.orderByTime=false">出租率排序</el-button>
        </el-button-group>
        <!-- <el-radio-group v-model="tab" class="w-full">
          <el-radio-button class="flex-1" :label="1">在线</el-radio-button>
          <el-radio-button class="flex-1" :label="0">离线</el-radio-button>
          <el-radio-button class="flex-1" :label="2">故障</el-radio-button>
        </el-radio-group> -->
        <el-scrollbar class="flex-1 mt-4">
          <div
            class="cursor-pointer border border-primary-300 mb-3 py-2 px-6 flex items-center bg-gradient-to-b from-[rgba(0,193,254,0.1)] to-[rgba(53,187,255,0.5)]"
          >
            <div>
              <div>陕西韩云腾设备租赁有限公司</div>
              <div class="mt-1 text-sm text-white/60">
                <span>年度开工率：61.4%</span>
                <span class="ml-12">年度出租率：60.2%</span>
              </div>
            </div>
          </div>
          <div
            class="cursor-pointer border border-primary-300 mb-3 py-2 px-6 flex items-center bg-white/10"
          >
            <div>
              <div>陕西韩云腾设备租赁有限公司</div>
              <div class="mt-1 text-sm text-white/60">
                <span>年度开工率：61.4%</span>
                <span class="ml-12">年度出租率：60.2%</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="basis-3/4 h-full flex flex-col">
        <chart class="basis-1/3" />
        <div class="basis-2/3 flex">
          <device-list ref="deviceList" class="flex-1 px-10" />
          <calendar-view class="w-[490px]" />
        </div>
      </div>
    </div>
  </page-container>
</template>

<style scoped lang="scss">

</style>