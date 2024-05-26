import { defineStore } from 'pinia';
import { DatePickerType } from '@/shared/constant'

export const useStore = defineStore('condition/ratio', () => {
  let form = reactive<{
    date: Date
    dateType: DatePickerType
    [propName: string]: any
  }>({
    region: '',
    areas: [],
    identifier: '',
    machineType: '',
    // leaseholder: '',
    dateType: DatePickerType.year,
    date: new Date(),
  })

  let com = ref<any>({})
  let deviceQuery = computed(() => {
    return { ...form, com: com.value }
  })

  let device = ref<any>({})
  let calendarQuery = computed(() => {
    return {
      ...form, com: com.value, serialNo: device.value.serialNo,
    }
  })

  return { form, com, deviceQuery, device, calendarQuery }
})