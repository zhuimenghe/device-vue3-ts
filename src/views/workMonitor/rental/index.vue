<script setup lang="ts">
import HouseMap from './components/map.vue'
import Detail from './components/detail.vue'
import {useStore} from './store'

let {form,refresh} = useStore();

</script>

<template>
  <page-container title="租赁商实时概况">
    <template #header>
      <el-form class="" :model="form">
        <el-row :gutter="12" justify="end">
          <el-col :span="3" :offset="15">
            <el-form-item label="大区">
              <el-select v-model="form.region" class="w-full" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col v-has-role="$Role.admin" :span="5">
            <el-form-item label="租赁商">
              <lease-picker v-model="form.identifier" class="w-full" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" class="w-full" @click="refresh">筛选</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="h-full flex pb-3">
      <div class="pr-5 h-full basis-2/5">
        <house-map class=" h-full " />
      </div>
      <detail class="basis-3/5 h-full" />
    </div>
  </page-container>
</template>

<style scoped lang="scss">

</style>