import { ListRespData } from '@/types/types'
import { AxiosResponse } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const fetchOverallChartData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getBatteryStatusChartData`, data)
  return result
}

export const fetchOverallList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getBatteryStatusTableData`, data)
  return result
}

export const exportOverallList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/batteryStatusTableDataExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchBatteryChart = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getBatteryStatusDetail`, data)
  return result
}

export const fetchBatteryList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getBatteryStatusTableDetail`, data)
  return result
}

export const exportBatteryList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/batteryStatusTableDetailExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchVoltageBatteryChartData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getVbatStatusDetail`, data)
  return result
}