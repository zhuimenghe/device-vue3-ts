import { defineStore } from 'pinia';
import { fetchOverallChartData } from '@/apis/modules/battery'
import { number } from 'echarts/core';
import { watchDebouncedKeys } from '@/shared/utils';

interface ChartData { range: Array<number>, value: any, name: string }

function convertData(data: any): Array<ChartData> {
  return Object.entries(data).map(e => {
    let range = e[0].split('-').filter(r => r).map(d => Number(d))
    let value = e[1]
    let name = range.length === 1 ? `${range[0]}+` : range.join('~')
    return { range, value, name }
  }).sort((a, b) => a.range[0] - b.range[0])
}

export const useStore = defineStore('battery/overall', () => {
  const def: {
    dateRange: [string, string]
    [propName: string]: any
  } = {
    areas: [],
    region: '',
    leaseholder: '', //租赁商
    deviceType: '', //设备类型：SPS 自行剪叉车，SPA 自行曲臂车 SPT自行直臂车
    dateRange: ['', '']
  }
  const { resetForm, form } = useResetForm(def)

  let topQuery = computed(() => {
    form.areas = form.areas || []
    return {
      ...form,
      province: form.areas[0] || '',
      city: form.areas[1] || '',
    }
  })

  let pieData = ref<ChartData[]>([])
  let stackData = ref<ChartData[]>([])
  let barData = ref<ChartData[]>([])
  let chartFilter = ref({})
  let loading = ref(false)

  async function refresh() {
    chartFilter.value = {}
    loading.value = true
    //加载图表数据
    let res = await fetchOverallChartData(topQuery.value)
    pieData.value = convertData(res.mapLowerPowerTimes)
    stackData.value = convertData(res.mapChargingTimes)
    barData.value = convertData(res.mapDailyBatteryLevelTimes)
    //重置图表筛选
    loading.value = false
  }
  watchDebouncedKeys(
    topQuery,
    refresh,
    ['leaseholder']
  )
  refresh()

  return { form, topQuery, resetForm, refresh, loading, pieData, stackData, barData, chartFilter }
})