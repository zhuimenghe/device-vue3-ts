import { RouteRecordRaw } from 'vue-router';

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  },
];

export const businessRoutes: Array<RouteRecordRaw> = [
  {
    path: '/conditionMonitor',
    name: 'conditionMonitor',
    component: () => import('@/views/layout/subRouter.vue'),
    redirect: { name: 'conditionMap' },
    meta: {
      title: '工况监控中心',
    },
    children: [
      {
        path: 'map',
        name: 'conditionMap',
        component: () => import('@/views/conditionMonitor/map/index.vue'),
        meta: {
          title: '设备地图',
        },
      },
      {
        path: 'realTime',
        name: 'conditionRealTime',
        component: () => import('@/views/conditionMonitor/realTime/index.vue'),
        meta: {
          title: '实时工况',
        },
      },
      {
        path: 'realTimeDetail/:serialNo',
        name: 'conditionRealTimeDetail',
        component: () => import('@/views/conditionMonitor/realTime/detail.vue'),
        props: true,
        meta: {
          hide: true
        },
      },
      {
        path: 'history',
        name: 'conditionHistory',
        component: () => import('@/views/conditionMonitor/history/index.vue'),
        meta: {
          title: '历史工况',
        },
      },
      {
        path: 'historyDetail/:serialNo',
        name: 'conditionHistoryDetail',
        component: () => import('@/views/conditionMonitor/history/detail.vue'),
        props: true,
        meta: {
          hide: true
        },
      },
      {
        path: 'ratio',
        name: 'workRentRatio',
        component: () => import('@/views/conditionMonitor/ratio/index.vue'),
        meta: {
          title: '开工出租率',
        },
      },
    ]
  },
  {
    path: '/workMonitor',
    name: 'workMonitor',
    component: () => import('@/views/layout/subRouter.vue'),
    redirect: { name: 'rental' },
    meta: {
      title: '运行监控中心',
    },
    children: [
      {
        path: 'rental',
        name: 'rental',
        component: () => import('@/views/workMonitor/rental/index.vue'),
        meta: {
          title: '租赁商实时概况',
        },
      },
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/workMonitor/device/index.vue'),
        meta: {
          title: '设备运行概况',
        },
      },
      {
        path: 'construction',
        name: 'construction',
        component: () => import('@/views/workMonitor/construction/index.vue'),
        meta: {
          title: '施工点概况',
        },
      },
      {
        path: 'workhour',
        name: 'workhour',
        component: () => import('@/views/workMonitor/workhour/index.vue'),
        meta: {
          title: '工时概况',
        },
      },
    ]
  },
  {
    path: '/faultMonitor',
    name: 'faultMonitor',
    component: () => import('@/views/layout/subRouter.vue'),
    redirect: { name: 'faultOverall' },
    meta: {
      title: '故障监控中心',
    },
    children: [
      {
        path: 'overall',
        name: 'faultOverall',
        component: () => import('@/views/faultMonitor/overall/index.vue'),
        meta: {
          title: '故障统计',
        },
      },
      {
        path: 'realTime',
        name: 'faultRealTime',
        component: () => import('@/views/faultMonitor/realTime/index.vue'),
        meta: {
          title: '实时故障',
        },
      },
      {
        path: 'history',
        name: 'faultHistory',
        component: () => import('@/views/faultMonitor/history/index.vue'),
        meta: {
          title: '历史故障',
        },
      }
    ]
  },
  {
    path: '/batteryMonitor',
    name: 'batteryMonitor',
    component: () => import('@/views/layout/subRouter.vue'),
    redirect: { name: 'batteryOverall' },
    meta: {
      title: '电池监控中心',
    },
    children: [
      {
        path: 'overall',
        name: 'batteryOverall',
        component: () => import('@/views/batteryMonitor/overall/index.vue'),
        meta: {
          title: '电池总览',
        },
      },
      {
        path: 'battery',
        name: 'batteryBattery',
        component: () => import('@/views/batteryMonitor/battery/index.vue'),
        meta: {
          title: '电量概况',
        },
      },
      {
        path: 'voltage',
        name: 'batteryVoltage',
        component: () => import('@/views/batteryMonitor/voltage/index.vue'),
        meta: {
          title: '电压概况',
        },
      },
    ]
  },
]

export const allRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/conditionMonitor',
    meta: {
    },
    children: [
      ...businessRoutes,
      {
        name: '404',
        path: '/404',
        component: () => import('@/views/notFound.vue')
      }
    ]
  },
  ...staticRoutes,
];

