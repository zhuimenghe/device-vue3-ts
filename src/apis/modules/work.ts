import { ListRespData } from '@/types/types'
import { AxiosResponse, CancelToken } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const fetchWorkhourList = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getDeviceOpenStatus`, data)
  return result
}

export const exportWorkhourList = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/deviceOpenStatusExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchDeviceBatteryLevels = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getDeviceDailyBatteryLevel`, data)
  return result
}

let fcsCtrl: AbortController | null
export const fetchConstructionSites = async (data: any): Promise<any> => {
  if (fcsCtrl) {
    fcsCtrl.abort();
  }
  fcsCtrl = new AbortController();
  const result = await ajax.post<any, any>(`${moudlePath}/getConstructionSite`, data, { signal: fcsCtrl.signal })
  fcsCtrl = null
  return result
}

export const fetchConstructionSiteDevices = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getConstructionSiteDeviceStatus`, data)
  return result
}

export const fetchConstructionSiteDeviceWorks = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getConstructionSiteDeviceWorkStatus`, data)
  return result
}

export const fetchDeviceCareer = async (data: any): Promise<ListRespData<any>> => {
  const result = await ajax.post<any, ListRespData<any>>(`${moudlePath}/getDeviceCareer`, data)
  return result
}

export const fetchRentalMapData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getLeaseholderConstructionStatus`, data)
  return result
}
export const exportRentalDeviceData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/machineHomeAndConstructionStatusExport`, data, { responseType: 'blob', showLoading: true })
  return result
}

export const fetchRentalPointData = async (data: any): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getMachineHomeAndConstructionStatus`, data)
  return result
}