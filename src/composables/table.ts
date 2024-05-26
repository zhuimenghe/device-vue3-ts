import { Ref, UnwrapNestedRefs } from 'vue';
import { ListRespData } from './../types/types.d';
import { watchDebouncedKeys } from '@/shared/utils'

interface PageData {
  current: number,
  size: number,
  total: number
}

interface paginationOptions {
  listKey?: string,
  debounceKeys?: string[]
  setIndex?: boolean
  watch?: boolean
  initFetch?: boolean
  notNullableVars?: string[]
  initPageSize?: number
}

export const usePagination = <T>(handler: (data: any) => Promise<ListRespData<T>>, query: any, options: paginationOptions = {}) => {
  options = Object.assign({ watch: true, initFetch: true, listKey: 'rows' }, options)
  const list = ref<T[]>([]);

  //pagination
  const page = reactive<PageData>({
    current: 1,
    size: options.initPageSize || 20,
    total: 0
  })

  const params = computed(() => {
    let data = unref(query)
    return {
      pageNum: page.current,
      pageSize: page.size,
      ...data
    }
  })

  let loading = ref(false);
  const refresh = async () => {
    if (!options.notNullableVars || options.notNullableVars.every(v => params.value[v])) {
      loading.value = true
      const res = await handler(params.value)
      page.total = res.total
      let rows = res[options.listKey || 'rows']
      if (options.setIndex) {
        rows.forEach(r => {
          r.index = (page.current - 1) * page.size + rows.indexOf(r)
        })
      }
      list.value = rows
      loading.value = false
    }
  }

  // const debouncedRefresh = useDebounceFn(refresh, 500, { maxWait: 5000 })

  // watchEffect(async () => {
  //   console.log('fetching data...')
  //   params.value = {
  //     current: page.current,
  //     size: page.size,
  //     ...query
  //   }
  //   debouncedFn()
  // })
  // watch(
  //   query,
  //   (q, old) => {
  //     //如果变化是在需要debounce的字段，
  //     let needDebounce = debounceKeys.some(k => q[k] !== old[k])
  //     if (needDebounce) {
  //       debouncedRefresh()
  //     } else {
  //       refresh()
  //     }
  //   },
  // )

  if (options.watch) {
    watchDebouncedKeys(
      query,
      refresh,
      options.debounceKeys || [],
      { sms: 50 }
    )
  }
  watch([() => page.current, () => page.size], () => {
    refresh()
  })
  if (options.initFetch) {
    refresh()
  }

  return {
    page,
    list,
    refresh,
    loading
  }
}

export function useResetForm<T extends object>(defaultForm: T): { form: UnwrapNestedRefs<T>, resetForm: any } {
  const form = reactive<T>({ ...defaultForm })
  function resetForm() {
    Object.assign(form, defaultForm)
  }
  return { form, resetForm }
}

export function useTableSort(form?: UnwrapNestedRefs<any>) {
  let sortParams = form || reactive({})
  const sortChange = ({ prop, order }: any) => {//{column,prop,order}
    if (order) {
      sortParams.orderBy = prop
      sortParams.isDesc = order === 'descending'
    } else {
      sortParams.orderBy = ''
    }
  }
  return { sortChange, sortParams }
}

export function useTableExport(tableRef: Ref, handler: Function, query: any, fileName: string, idKey: string = 'id') {
  const selections = ref<Array<any>>([])
  const handleSelectionChange = (val: []) => {
    selections.value = val
  }
  function getRowKey(row: any) {
    return row[idKey]
  }
  async function exportList() {
    let params = unref(query)
    let res = await handler({ ...params, [idKey + 'List']: selections.value.map(s => s[idKey]) })
    downloadBlobFile(res, fileName)
  }
  //筛选条件变了清空selections
  onMounted(() => {
    watch(query, () => {
      tableRef.value!.clearSelection()
    })
  })

  return { handleSelectionChange, getRowKey, exportList }
}

export function useTableFormatter() {
  const round = (fractionDigits: number) => {
    return (row: any, col: any, v: any) => {
      return v && v.toFixed(fractionDigits)
    }
  }
  return { round }
}