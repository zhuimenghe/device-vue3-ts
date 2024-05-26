import { UnwrapRefSimple } from 'vue';

export interface BaseRespData {
  code: number
  msg: string
  [propName: string]: any;
}

export interface BaseResp {
  msg: string
  code: number
  data: BaseRespData
}

export interface ListRespData<T> {
  code: number
  msg: string
  total: number
  rows: UnwrapRefSimple<T>[]
  [propName: string]: UnwrapRefSimple<T>[];
}

export interface RealtimeConditionResp {
  deviceStatus: number
  openStatus: number
  lockLevel: number
}