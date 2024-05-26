import { defineStore } from 'pinia';
import { fetchBatteryChart, fetchBatteryList, exportBatteryList } from '@/apis/modules/battery'

export const useStore = defineStore('battery/battery', () => {
  const def: {
    dateRange: [string, string]
    serialNo: string
  } = {
    serialNo: '',
    dateRange: ['', '']
  }
  //表格相关
  const { resetForm, form } = useResetForm(def)

  return { form, resetForm }
})