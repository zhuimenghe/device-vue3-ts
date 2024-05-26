<script setup lang="ts">
import {useStore} from '../store'
import whUrl from '@/assets/icons/wh-icon.png'
import consUrl from '@/assets/icons/cons-icon.png'
import { fetchDeviceCareer } from '@/apis/modules/work'

let {statistic,all} = toRefs(useStore())
let { gotoDetail} = useStore()


</script>

<template>
  <div class="flex flex-col">
    <bg-title>设备履历</bg-title>
    <div class="flex-1 flex items-center">
      <div class="grid grid-cols-2 gap-y-7  mr-4">
        <div class="flex flex-col items-center beam">
          <div class="flex-1 flex items-center">{{ statistic.homeDays }}</div>
          <span>仓库天数</span>
        </div>
        <div class="flex flex-col items-center beam">
          <div class="flex-1 flex items-center">{{ statistic.constructionDays }}</div>
          <span>施工点天数</span>
        </div>
        <div class="flex flex-col items-center beam">
          <div class="flex-1 flex items-center">{{ statistic.workTotalDays }}</div>
          <span>施工天数</span>
        </div>
        <div class="flex flex-col items-center beam">
          <div class="flex-1 flex items-center">{{ statistic.workRate }}</div>
          <span>开工率</span>
        </div>
      </div>
      <el-scrollbar always class="flex-1 ">
        <div class="flex pl-40  h-80 items-center  [&>*:nth-child(odd)>*:nth-child(2)]:bottom-9 [&>*:nth-child(even)>*:nth-child(2)]:top-9  [&>*:nth-child(odd)>*:nth-child(3)]:top-11 [&>*:nth-child(even)>*:nth-child(3)]:bottom-11">
          <div v-for="(d,i) in all" :key="i" class="item relative ml-52 first:ml-0 after:h-px after:w-52 after:absolute after:right-8 after:top-4 after:bg-gray-400 first:after:h-0">
            <img :src="d.addressCategory==0?consUrl:whUrl" class="max-w-fit w-8 h-8" alt="" />
            <div class="flex flex-col items-center left-1/2 -translate-x-1/2 absolute">
              <span class="whitespace-nowrap">{{ d.addressCategory==0 ? '施工点' :'仓库' }}</span>
              <el-button v-if=" d.addressCategory==0" type="primary" link class="text-primary text-xs whitespace-nowrap mt-1" @click="gotoDetail(d)">查看每日工况</el-button>
            </div>
            <div class="whitespace-nowrap border border-primary-300 bg-white/10  left-1/2 -translate-x-1/2 text-xs px-3 py-4 absolute">
              <div class="flex justify-between">
                <span>入{{ d.addressCategory==0?'场':'库' }}天数：{{ d.totalDays }}</span>
                <span>开工天数：{{ d.workDays }}</span>
                <span>开工率：{{ d.workRate }}</span>
              </div>
              <div class="mt-4">
                日期范围：{{ d.startDate }} ~ {{ d.endDate }}
              </div>
              <div class="mt-2">
                所在位置：{{ d.address }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .beam{
    width:117px;
    height:98px;
    background: url(@/assets/bgs/beam-light_bg.png);
    background-size: contain;
  }
</style>