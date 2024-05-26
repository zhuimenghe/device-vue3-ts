import './styles/main.scss';
import { router } from '@/router'
import plugins from '@/plugins'
import pinia from '@/store'
import Particles from "vue3-particles";
import { createApp } from 'vue'
import App from './App.vue'
import zh from "dayjs/locale/zh-cn.js";
import dayjs from "dayjs";
dayjs.locale(zh)

import ECharts from 'vue-echarts'
import { use } from "echarts/core"
// import ECharts modules manually to reduce bundle size
import {
  SVGRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart,
  CustomChart,
  LineChart,
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'

use([
  SVGRenderer,
  BarChart,
  PieChart,
  GridComponent,
  CustomChart,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart
])

import '@/libs/iconfont.js'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Particles)
app.use(plugins)
// app.use(directives)
// app.use(functions)
app.component('EChart', ECharts)

app.mount('#app')
