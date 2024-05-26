import { defineStore } from 'pinia';

export const useStore = defineStore('work/construction', () => {
  let form = reactive<{
    dateRange: [string, string]
    [propName: string]: any
  }>({
    region: '',
    identifier: '',
    // leaseholder: '',
    dateRange: ['', ''],
    orderBy: 'deviceNumber',
    isDesc: true,
    orderByTime: true
  })

  let site = ref<any>({})
  let deviceQuery = computed(() => {
    return { ...form, address: site.value.address }
  })

  let device = ref<any>({})
  let calendarQuery = computed(() => {
    let dateRange = [device.value.startDate, device.value.endDate]
    return {
      ...form, address: site.value.address, serialNo: device.value.serialNo,
      dateRnage: dateRange
    }
  })

  return { form, site, deviceQuery, device, calendarQuery }
})