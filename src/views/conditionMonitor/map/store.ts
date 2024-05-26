import { defineStore } from 'pinia';
import { fetchMachineMapData, fetchMachineMapDevices } from '@/apis/modules/condition'

export const useStore = defineStore('condition/map', () => {
  let serialNo = ref('');
  const def = {
    areas: [],
    region: '',
    identifier: '',
    machineType: '', //设备型号
    machineTypeList: [], //设备型号
  }
  const { resetForm, form } = useResetForm(def)

  let query = computed(() => {
    form.areas = form.areas || []
    return {
      ...form,
      province: form.areas[0] || '',
      city: form.areas[1] || '',
    }
  })

  let list = ref<any[]>([])
  let cur = ref();
  let statistics = ref({
    "deviceNo": 0,
    "deviceNoSps": 0,
    "deviceNoSpa": 0,
    "deviceNoSpt": 0,
    "online": 0,
    "offline": 0,
    "fault": 0,
    "onlineRte": '0.00%',
    spsPercent: 0,
    spaPercent: 0,
    sptPercent: 0,
  })
  let loading = ref(false)
  async function refresh() {
    loading.value = true
    // if (serialNo.value) {
    //   //如果有机号，清空form，请求全部，然后前端筛选
    //   resetForm();
    // }
    //统计数据
    let res = await fetchMachineMapData(query.value)
    res = res[0]
    res.onlineRte = `${(res.onlineRte * 100).toFixed(2)}%`
    res.spsPercent = (res.deviceNoSps * 100 / res.deviceNo).toFixed(0)
    res.spaPercent = (res.deviceNoSpa * 100 / res.deviceNo).toFixed(0)
    res.sptPercent = (res.deviceNoSpt * 100 / res.deviceNo).toFixed(0)
    statistics.value = res
    //列表数据
    list.value = await fetchMachineMapDevices(query.value) || []
    cur.value = serialNo.value ? list.value.find(d => d.serialNo.toLowerCase().includes(serialNo.value.toLowerCase())) : list.value.find(d => d.latitude && d.longitude)

    loading.value = false
  }
  refresh()

  let filters = ref([0, 1, 2]);
  let filteredList = ref<any[]>([])
  watchEffect(() => {
    filteredList.value = list.value.filter(d => filters.value.includes(d.deviceStatus))
    // cur.value = serialNo.value ? filteredList.value.find(d => d.serialNo.toLowerCase().includes(serialNo.value.toLowerCase())) : filteredList.value.find(d => d.latitude && d.longitude)
  })


  return { serialNo, form, query, refresh, list, filteredList, cur, statistics, filters, loading }
})