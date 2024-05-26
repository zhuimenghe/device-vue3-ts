<script setup lang="ts">
import SPS from '@/assets/icons/SPS.png'
import SPT from '@/assets/icons/SPT.png'
import SPA from '@/assets/icons/SPA.png'
import {fetchRealtimeDetail} from '@/apis/modules/condition'

const IMGS:Record<string,string> = {
  'SPS':SPS,
  'SPT':SPT,
  'SPA':SPA
}

const STATIC_MAP: { [propName: string]: string } = {
  dataVersion:'协议号',
  controllerVersion:'控制器版本号',
  truVersion:'TRU版本号',
  truSerialNo:'TRU序列号',
  controllerSerialNo:'控制器序列号',
  controller1Version:'控制器1版本号',
  displayVersionNumber:'显示屏版本号',
  controller2Version:'控制器2版本号',
  displaySerialNo:'显示屏序列号',
}

const DYNAMIC_MAP: { [propName: string]: string } = {
  serialNo:'机号',
  machineType:'机型',
  region:'大区',
  leaseholder:'租赁商',
  deviceStatus:'设备状态',
  openStatus:'开机状态',
  totalWorktime:'总工作时间h',
  totalWorktimePumpMotor:'泵电机工作时间',
  totalWorktimeTravelMotor:'行走电机工作时间',
  openTime:'开机时长',
  actualWorkTime:'实际工作时长',
  batteryLevel:'剪叉车电池电量',
  lockLevel:'传送锁机级别',
  lastCloseTime:'最近关机时间 东八区',
  address:'详细地址',
  lastGpsTime:'定位时间 东八区',
  thisMonthWorktime:'当月工时',
  lastMonthWorktime:'上月工时',
  yesterdayWorkTime:'昨日工时 h',
  todayWorkTime:'今日工时 h',
  dataVersion:'协议号',
  controllerVersion:'控制器版本号',
  truVersion:'TRU版本号',
  truSerialNo1:'TRU序列号1(前8位)',
  truSerialNo2:'TRU序列号2(后8位)',
  controllerSerialNo1:'控制器序列号1',
  controllerSerialNo2:'控制器序列号2',
  vbat:'电压',
  shearForkliftAngle:'剪叉车角度',
  shearForkliftPressure:'剪叉车压力',
  overloadTimes:'超载次数',
  uTime:'更新时间',
  controller1Version:'控制器1版本号',
  displayVersionNumber:'显示屏版本号',
  controller2Version:'控制器2版本号',
  oilPressure:'机油压力',
  coolingWaterTemperature:'冷却水温',
  workBarHeight:'工作栏高度',
  foldingArmAngle:'折臂角度',
  boomAngle:'主臂角度',
  boomLength:'主臂长度',
  flyJibAngle:'飞臂角度',
  engineSpeed:'泵站转速/发动机转速',
  remainingFuel:'电池电量/剩余油量',
  platformLoad:'平台载重',
  frontLeftWheelDriveTemperature:'左前轮驱动器温度',
  frontRightWheelDriveTemperature:'右前轮驱动器温度',
  rearLeftWheelDriveTemperature:'左后轮驱动器温度',
  rearRightWheelDriveTemperature:'右后轮驱动器温度',
  pumpMotorDriverTemperature:'泵电机驱动器温度',
  displacementSpeed:'车辆行走速度',
  turningRadius:'专向半径',
  platformDipSensor:'平台倾角传感器',
  amplitudeValue:'幅度值',
  frontWheelLeftTurnProportionalValve:'前轮左转比例阀',
  frontWheelRightTurnProportionalValve:'前轮右转比例阀',
  worktime:'本次工作时长',
  lockTimeLeft:'锁机剩余时间',
  displaySerialNo1:'显示屏序列号1 前8位',
  displaySerialNo2:'显示屏序列号2 后8位',
  rearLeftWheelLeftTurnProportionalValve:'左后轮左转比例阀',
  rearLeftWheelRightTurnProportionalValve:'左后轮右转比例阀',
  rearRightWheelLeftTurnProportionalValve:'右后轮左转比例阀',
  rearRightWheelRightTurnProportionalValve:'右后轮右转比例阀',
  upperArmLuffUpProportionalValve:'上臂变幅起比例阀',
  upperArmLuffDownProportionalValve:'上臂变幅落比例阀',
  lowerArmLuffUpProportionalValve:'下臂变幅起比例阀',
  lowerArmLuffDownProportionalValve:'下臂变幅落比例阀',
  upperArmExtensionProportionalValve:'上臂伸比例阀',
  upperArmContractionProportionalValve:'上臂缩比例阀',
  turntableClockwiseRotationProportionalValve:'转台顺回传比例阀',
  turntableAntiClockwiseRotationProportionalValve:'转台逆回传比例阀',
  flyJibUpProportionalValve:'飞臂起比例阀',
  flyJibDownProportionalValve:"飞臂落比例阀",
  communicationFaultCode:'通讯故障码',
  safetyFunctionFaultCode:'安全功能故障码',
  sensorFaultCode:'传感器故障码',
  operateComponentFaultCode:'操作元件故障码',
  executeComponentFaultCode:'执行元件故障码',
  travelMotor1FaultCode:'行走电机1故障码',
  travelMotor2FaultCode:'行走电机2故障码',
  travelMotor3FaultCode:'行走电机3故障码',
  travelMotor4FaultCode:'行走电机4故障码',
  lithiumCellVoltageMax:'锂电池最高单体电压',
  lithiumCellVoltageMin:'锂电池最低单体电压',
  batterySoc:'SOC',
  chargeTimeRemain:'剩余充电时间',
  chargingCycles:'充电循环次数',
  dischargeCycles:'放电循环次数',
  shearForkliftFaultWord1:'剪叉车故障字1',
  shearForkliftFaultWord2:'剪叉车故障字2',
  shearForkliftFaultWord3:'剪叉车故障字3',
  breakValveCurrent:'刹车阀电流值',
  steerRightValveCurrent:'右转阀电流值',
  steerLeftValveCurrent:'左转阀电流值',
  liftDownValve1Current:'下降阀1电流值',
  liftUpValveCurrent:'起升阀电流值',
  backwardValveCurrent:'后退阀电流值',
  forwardValveCurrent:'前进阀电流值',
  travelMotorSpeed:'行走电机速度',
  dropProportionalValveOpening:'下降比例阀开度',
  loadRate:'负载率',
}

let props = defineProps<{
  serialNo:string,
}>()

const img = IMGS[props.serialNo.substring(0,3)];

const linfo = ref<any>({})
const statics = ref<Array<any>>([])
const dynamics = ref<Array<any>>([])
const faults = ref<Array<any>>([])
const faultClasses = ['border-white text-white','border-yellow-300 text-yellow-300','border-warning text-warning','border-error text-error']

//加载数据
fetchRealtimeDetail(props.serialNo).then(res => {
  linfo.value = res.machineLeftParams
  statics.value = res.machineStaticParams
  dynamics.value = res.machineDynamicParams
  faults.value = res.machineFaultList || []//[{'fault_name':'系统通信故障','fault_level':0},{'fault_name':'系统通信故障','fault_level':1},{'fault_name':'系统通信故障','fault_level':2},{'fault_name':'系统通信故障','fault_level':3}]
})

const router = useRouter()
</script>

<template>
  <page-container :title="serialNo">
    <template #header>
      <div class="w-full flex justify-end">
        <el-button type="primary" plain @click="router.back()">返回</el-button>
      </div>
    </template>
    <div class="flex flex-1 h-full">
      <div class="pr-36 basis-1/3">
        <div class="flex flex-col h-full pb-11">
          <div class="flex-1 flex flex-col items-center">
            <img :src="img" alt="" class="my-4 flex-1 object-contain" />
            <div class="flex justify-center items-center">
              <span class="text-xl">{{ serialNo }}</span>
              <div class="px-3 py-1 bg-success ml-3">在线</div>
            </div>
          </div>
          <div class="flex mb-3 mt-4">
            <div class="w-28 text-right">机型：</div>
            <div class="flex-1">{{ linfo.machineType }}</div>
          </div>
          <div class="flex mb-3">
            <div class="w-28 text-right">地址：</div>
            <div class="flex-1">{{ linfo.address }}</div>
          </div>
          <div class="flex mb-3">
            <div class="w-28 text-right">更新时间：</div>
            <div class="flex-1">{{ linfo.lastGpsTime }}</div>
          </div>
        </div>
      </div>
      <div class="overflow-auto pr-16 basis-2/3">
        <div class="">
          <bg-title class="mb-4">静态参数</bg-title>
          <div class="grid grid-cols-3 gap-x-16 gap-y-5 mt-5 mb-6">
            <div v-for="s in statics" :key="s.name" class="basis-1/3 flex">
              <div class="w-28 text-right text-gray-400">{{ STATIC_MAP[s.name] }}</div>
              <div class="flex-1 ml-4">{{ s.value }}</div>
            </div>
          </div>
        </div>
        <div>
          <bg-title>动态参数</bg-title>
          <div class="grid grid-cols-3 gap-x-16 gap-y-5 mt-5 mb-6">
            <div v-for="d in dynamics" :key="d.name" class="basis-1/3 flex items-center">
              <div class="w-40 text-right text-gray-400">{{ DYNAMIC_MAP[d.name] }}</div>
              <div class="flex-1 ml-2 h-10 leading-10 px-3 border border-primary-300 rounded bg-white/10">{{ d.value }}</div>
            </div>
          </div>
        </div>
        <div>
          <bg-title>当前异常</bg-title>
          <div class="flex mt-7">
            <div v-for="f in faults" :key="f['fault_name']" :class="[`${faultClasses[f['fault_level']]}`]" class="border rounded py-1 px-3 bg-white/10 mr-8">{{ f['fault_name'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </page-container>
</template>

<style scoped lang="scss">

</style>