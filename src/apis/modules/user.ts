import { ListRespData } from '@/types/types'
import { AxiosResponse, CancelToken } from 'axios'
import ajax from '../request'

const moudlePath = '/awp/device/management/machine'

export const login = async (username: string, password: string): Promise<any> => {
  const result = await ajax.post<any, any>(`${moudlePath}/login`, { username, password })
  return result.token
}

export const getUserInfo = async (): Promise<any> => {
  const result = await ajax.get<any, any>(`${moudlePath}/getInfo`)
  return result
}