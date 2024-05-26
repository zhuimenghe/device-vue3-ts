<script setup lang="ts">
import {fetchSerialNoList} from '@/apis/modules/common'

interface Item {
  value: string
}

let props = withDefaults(defineProps<{
  modelValue:string,
  options?:Item[]
}>(),{
  options:() => []
})

// type-based (TS)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): any
}>()

let value = ref(props.modelValue)
watch(() => props.modelValue,(mv) => {
  value.value = mv
})
watch(value,() => {
  emit('update:modelValue',value.value)
})

let options = ref<Item[]>(props.options);
let loading = ref(false)

const remoteMethod = (query: string, cb: (arg: any) => void) => {
  if(!query) {
    return cb([])
  }
  loading.value = true
  fetchSerialNoList(query).then(res => {
    options.value = res.map((s:string) => ({value:s}))
    cb(options.value)
    loading.value = false
  })
}

function onSelect(v:Record<string, any>) {
  emit('update:modelValue',v.value)
}

const slots = useSlots()

</script>

<template>
  <el-autocomplete
    v-model="value"
    placeholder="请输入机号搜索"
    :trigger-on-focus="false"
    :fetch-suggestions="remoteMethod"
    @select="onSelect"
  >
    <template v-if="slots.append" #append>
      <slot name="append"></slot>

    </template>
  </el-autocomplete>
</template>

<style scoped lang="scss">

</style>