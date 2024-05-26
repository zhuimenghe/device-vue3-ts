<script setup lang="ts">
import {fetchLeaseholderList,fetchCRMLeaseholderList} from '@/apis/modules/common'

let props = withDefaults(defineProps<{
  modelValue:string | number | boolean | unknown[] | Record<string, any> | undefined,
  valueKey?:'identifier'|'leaseholder',
  defaultFirstOption?:boolean,
  clearable?:boolean
}>(),{
  valueKey:'identifier',
  defaultFirstOption:false,
  clearable:false
})

interface LeaseOption {
  identifier:string
  leaseholder:string
}

let options = ref<LeaseOption[]>([]);
fetchLeaseholderList().then(res => {
  options.value = res;
  if(props.defaultFirstOption) {
    onChange(res[0][props.valueKey])
  }
})

let options2 = ref<LeaseOption[]>([]);
fetchCRMLeaseholderList().then(res => {
  options2.value = res;
})

// type-based (TS)
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

function onChange(v:any) {
  emit('update:modelValue',v)
}
</script>

<template>
  <el-select :model-value="props.modelValue" :clearable="props.clearable" filterable placeholder="请选择" @update:model-value="onChange">
    <div class="section text-sm text-primary border-b border-primary-300">租赁系统</div>
    <el-option v-for="op in options" :key="op.identifier" :label="op.leaseholder" :value="op[props.valueKey]" />
    <div class="section text-sm text-primary border-t border-b border-primary-300">CRM系统</div>
    <el-option v-for="op in options2" :key="op.identifier" :label="op.leaseholder" :value="op[props.valueKey]" />
  </el-select>
</template>

<style scoped lang="scss">
  .section{
    padding: 0 32px 0 20px;
    height:34px;
    line-height: 34px;
  }
</style>