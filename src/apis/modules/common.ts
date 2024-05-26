import { ListRespData } from '@/types/types'
import { AxiosResponse } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const fetchLeaseholderList = async (leaseholder = ''): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getLeaseholderList`, { leaseholder })
  return result
}
export const fetchCRMLeaseholderList = async (leaseholder = ''): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getCrmTenantName`, { leaseholder })
  return result
}

export const fetchSerialNoList = async (serialNo: string): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getSerialNoList`, { serialNo })
  return result
}

export const fetchMachineTypes = async (machineType = ''): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/getMachineTypeList`, { machineType })
  return result
}