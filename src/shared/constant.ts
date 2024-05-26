export const DEVICE_STATUS_MAP: { [propName: number]: string } = {
  0: '离线',
  1: '在线'
}

export const OPEN_STATUS_MAP: { [propName: number]: string } = {
  0: '关机',
  1: '开机'
}

export const LOCK_LEVEL_MAP: { [propName: number]: string } = {
  0: '解锁',
  1: '一级锁机',
  2: '二级锁机',
  999: '永久锁机',
}

export enum Role {
  admin = 'admin',
  common = 'common'
}
export enum DatePickerType {
  day = 'date',
  month = 'month',
  year = 'year'
}

export const dateRangeShortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]