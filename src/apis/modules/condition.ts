import { ListRespData, RealtimeConditionResp } from '@/types/types'
import { AxiosResponse } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const fetchRealtimeList = async (data: any): Promise<ListRespData<RealtimeConditionResp>> => {
  const result = await ajax.post<any, ListRespData<RealtimeConditionResp>>(`${moudlePath}/getWorkingConditionCurrent`, data)
  // return { rows: [{ deviceStatus: 1, openStatus: 1, lockLevel: 1 }, { deviceStatus: 1, openStatus: 1, lockLevel: 1 }], total: 1, code: 0, msg: '' }
  return result
}

export const exportRealtimeList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/workConditionCurrentExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchRealtimeDetail = async (serialNo: String): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getWorkingConditionCurrentDetails`, { serialNo })
  return result
}

export const fetchHistoryList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getWorkingConditionHistory`, data)
  return result
}

export const fetchHistoryDetail = async ({ serialNo, dateRange, category }: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getWorkingConditionHistoryDetails`, { serialNo, dateRange, category })
  return result
}

export const exportHistoryList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/workConditionHistoryExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchMachineMapData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineMapTotal`, data)
  return result
}

export const fetchMachineMapDevices = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineMapDevice`, data)
  return result
}

export const fetchMachineMapDeviceDetail = async (serialNo: string): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineMapDeviceStatus`, { serialNo })
  return result[0]
}

export const fetchMachineMapDeviceChart = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineRegister`, data)
  return result
}

export const fetchMachineMapDistributionChart = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineDistribution`, data)
  return result
}

export const fetchMachineMapWorkRateChart = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineMapDeviceWorkRate`, data)
  return result
}

export const fetchMachineMapRentalRateChart = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`/awp/device/management/machine/getMachineMapDeviceRentalRate`, data)
  return result
}
