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
  const { sortChange: sortFn } = useTableSort(form)
  const { list, page, refresh: refreshTable } = usePagination(fetchBatteryList, form, { debounceKeys: ['serialNo'], watch: false, initFetch: false })

  const table = ref()
  const { getRowKey, handleSelectionChange, exportList } = useTableExport(table, exportBatteryList, form, '电量概况列表', 'id')


  //下面图表
  let dailyStatus = ref({
    "dailyBatteryLevel": 0,
    "lowPowerTimes": 0,
    "chargingTimes": 0
  })
  let chartData = ref<any[]>([])
  const refreshChart = async () => {
    let res = await fetchBatteryChart({ ...form, pageNum: 1, pageSize: 10000 });
    dailyStatus.value = res.dailyStatus
    chartData.value = res.tableData.rows
  }

  let loading = ref(false)
  const refreshAll = async () => {
    loading.value = true
    await Promise.all([refreshTable(), refreshChart()])
    loading.value = false
  }
  const sortChange = ({ prop, order }: any) => {
    sortFn({ prop, order })
    refreshTable()
  }

  return { form, resetForm, sortChange, list, page, dailyStatus, chartData, refreshAll, loading, table, getRowKey, handleSelectionChange, exportList }
})