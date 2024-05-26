<script setup lang="ts">
import options from './cities.js'
import {CascaderValue} from 'element-plus'

let props = defineProps<{
  modelValue:Array<any>,
}>()

const cascaderProps = {
  value:'code',
  label:'name',
  checkStrictly:true,
}

// type-based (TS)
const emit = defineEmits<{
  (e: 'update:modelValue', value: CascaderValue): void
}>()

function onChange(v:CascaderValue) {
  emit('update:modelValue',v)
}

</script>

<template>
  <el-cascader
    :model-value="props.modelValue"
    :props="cascaderProps"
    :options="options"
    placeholder="请选择"
    clearable
    @update:model-value="onChange"
  />
</template>

<style scoped lang="scss">

</style>