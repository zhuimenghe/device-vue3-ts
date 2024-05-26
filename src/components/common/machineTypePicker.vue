<script setup lang="ts">
import {fetchMachineTypes} from '@/apis/modules/common'

type modealValueType = string | number | any[] ;

let props = withDefaults(defineProps<{
  modelValue:modealValueType,
  multiple?:boolean,
  defaultFirstOption?:boolean,
  clearable?:boolean
}>(),{
  multiple:false,
  defaultFirstOption:false,
  clearable:false
})

let options = ref<string[]>([]);

fetchMachineTypes().then(res => {
  options.value = res;
  if(props.defaultFirstOption) {
    onChange(props.multiple ? [options.value[0]] : options.value[0])
  }
})

// type-based (TS)
const emit = defineEmits<{
  (e: 'update:modelValue', value: modealValueType): void
}>()

function onChange(v:modealValueType) {
  emit('update:modelValue',v)
}
</script>

<template>
  <el-select
    :model-value="props.modelValue"
    :multiple="props.multiple"
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="1"
    :clearable="props.clearable"
    filterable
    placeholder="请选择型号"
    @update:model-value="onChange"
  >
    <el-option v-for="op in options" :key="op" :label="op" :value="op" />
  </el-select>
</template>

<style scoped lang="scss">

</style>