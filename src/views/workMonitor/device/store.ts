import { defineStore } from 'pinia';
import { fetchDeviceCareer } from '@/apis/modules/work'

export const useStore = defineStore('work/device', () => {
  let form = reactive<{
    serialNo: string
    isDesc: boolean
  }>({
    serialNo: '',
    isDesc: true,
  })

  let { list, page, refresh } = usePagination(fetchDeviceCareer, form, { watch: false, initFetch: false, listKey: 'data' })

  let loading = ref(false)
  let statistic = ref<any>({})
  let all = ref<any[]>([])
  async function search() {
    if (form.serialNo) {
      loading.value = true
      refresh()
      let res = await fetchDeviceCareer({ ...form, current: 1, size: 10000 })
      statistic.value = res
      all.value = res.data
      loading.value = false
    }
  }

  const router = useRouter()
  function gotoDetail(d: any) {
    let dateRange = [d.startDate, d.endDate]
    router.push({ name: 'construction', query: { dateRange, identifier: d.identifier, leaseholder: d.leaseholder, address: d.address, serialNo: d.serialNo } })
  }

  return { form, list, page, refresh, search, statistic, all, loading, gotoDetail }
})