import { defineStore } from 'pinia';
import { fetchRentalMapData, exportRentalDeviceData } from '@/apis/modules/work'

export const useStore = defineStore('work/rental', () => {
  let form = reactive({
    region: '',
    identifier: ''
  })

  let data = ref<any>({})
  async function refresh() {
    let res = await fetchRentalMapData(form)
    res.data = res.data.map((r: any) => {
      return { ...r, index: res.data.indexOf(r) }
    })
    data.value = res
  }
  refresh()

  watch(form, refresh)

  let curPoint = ref();

  async function exportData() {
    let res = await exportRentalDeviceData(form)
    downloadBlobFile(res, '租赁商设备统计')
  }

  return { form, refresh, data, curPoint, exportData }
})