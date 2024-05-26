import { useRouteQuery, useRouteParams } from '@vueuse/router'

type QForm = Record<string, null | undefined | string | string[]>

export function useRouteQueryForm<T extends QForm>(defaultForm: T): T {
  let form = { ...defaultForm }
  Object.entries(defaultForm).forEach(([k, v]) => {
    let qv = useRouteQuery(k, v).value || useRouteParams(k, v).value;
    (form as QForm)[k] = qv;
  })
  return form
}
