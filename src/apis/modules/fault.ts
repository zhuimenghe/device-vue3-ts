import { ListRespData, RealtimeConditionResp } from '@/types/types'
import { AxiosResponse } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const fetchHistoryList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getFaultStatusHistory`, data)
  return result
}

export const exportHistoryList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/faultStatusHistoryExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchRealtimeList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getFaultStatusCurrent`, data)
  return result
}

export const exportRealtimeList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/faultStatusCurrentExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const overallList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getFaultStatus${data.type}Total`, data)
  return result
}

export const exportOverallList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/faultStatus${data.type}TotalExport`, data, { responseType: 'blob', showLoading: true })
  return result
}