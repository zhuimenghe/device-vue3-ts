<script setup lang="ts">
import Statistics from './components/statistics.vue'
import StatusList from './components/statusList.vue'
import RegisterChart from './components/registerChart.vue'
import DistributionChart from './components/distributionChart.vue'
import RatioCharts from './components/ratioCharts/index.vue'
import StatusFilter from './components/statusFilter.vue'
import {LOCK_LEVEL_MAP} from '@/shared/constant'
import { fetchMachineMapDeviceDetail } from '@/apis/modules/condition'
import AMapLoader from '@amap/amap-jsapi-loader';
import {useStore} from './store'

function getIconUrl(name: string) {
  return new URL(`../../../assets/map/${name}`, import.meta.url).href
}

let {form,refresh} = useStore()
let {serialNo,statistics,loading,filteredList,cur} = toRefs(useStore())

let amapLoad = AMapLoader.load({
  "key": import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": ['AMap.MarkerCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})
let map:any,AMap:any,cluster:any;
onMounted(async () => {
  AMap = await amapLoad;
  map = new AMap.Map('map', {
    zoom:11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    mapStyle:'amap://styles/darkblue',
    viewMode:'3D', //使用3D视图
    resizeEnable: true,
  });
  watch(filteredList,async () => {
    if (cluster) {
      cluster.setMap(null);
    }
    let points = filteredList.value.map(d => ({lnglat:[d.longitude,d.latitude],ext:d}))

    cluster = new AMap.MarkerCluster(map, points, {
      gridSize: 100, // 设置网格像素大小
      renderClusterMarker: renderCluster, // 自定义聚合点样式
      renderMarker: renderMarker, // 自定义非聚合点样式
      zoomOnClick:true,
    });
    cluster.on('click',clusterClick)
  },{immediate:true})
})

watch(cur,() => {
  if(cur.value) {
    map.setCenter([cur.value.longitude,cur.value.latitude]);
    //如果是筛选了机号，打开window
    if(serialNo.value && cur.value === serialNo.value) {
      markerClick({target:{ext:cur.value,_position:[cur.value.longitude,cur.value.latitude]}})
    }
  }
})

function clusterClick(data:any) {
  if(data.clusterData.length <= 1) {
    return
  }
  let alllng = 0, alllat = 0;
  for(const mo of data.clusterData) {
    alllng += mo.lnglat.lng;
    alllat += mo.lnglat.lat;
  }
  const lat = alllat / data.clusterData.length;
  const lng = alllng / data.clusterData.length;
  map.setZoomAndCenter(map.getZoom() + 2, [lng, lat]);
}

function renderMarker(context:any) {
  let ext = context.data[0].ext
  context.marker.setIcon(new AMap.Icon({
    image:getIconUrl(`${ext.machineType.substr(0,3)}_${ext.deviceStatus}.png`),
    size:new AMap.Size(30,40),
    imageSize:new AMap.Size(30,40),
  }))
  context.marker.setAnchor('bottom-center')
  context.marker.on('click',markerClick)
  context.marker.setExtData(ext)
}

function renderCluster(context:any) {
  let div = document.createElement("div");
  let size, fontSize;
  if (context.count > 500) {
    size = 65 ;
    fontSize = 26 ;
  } else if (context.count > 100) {
    size = 50 ;
    fontSize = 22 ;
  } else if (context.count > 10) {
    size = 35 ;
    fontSize = 20 ;
  } else {
    size = 20 ;
    fontSize = 18 ;
  }
  let waveA = document.createElement("div");
  waveA.style.position = "absolute";
  waveA.style.zIndex = "-1";
  waveA.style.bottom = "0";
  waveA.style.left = "0";
  waveA.style.borderRadius = "100%";
  waveA.style.boxShadow = `0px 0px ${6 }px ${4}px #35BBFF`;
  waveA.style.background = "#35BBFF";
  waveA.style.width = size + "px";
  waveA.style.height = size + "px";
  waveA.style.transform = "translate3d(0,50%,0) rotateX(55deg)";
  waveA.style.animation = "db-wave ease-out 1.5s 0s";
  waveA.style.animationIterationCount = "infinite";

  let waveB = document.createElement("div");
  waveB.style.position = "absolute";
  waveB.style.zIndex = "-1";
  waveB.style.bottom = "0";
  waveB.style.left = -size / 2 + "px";
  waveB.style.borderRadius = "100%";
  waveB.style.background = "rgba(53, 187, 255,0.5)";
  waveB.style.width = 2 * size + "px";
  waveB.style.height = 1.4 * size + "px";
  waveB.style.transform = "translate3d(0,50%,0) rotateX(50deg)";
  waveB.style.animation = "db-wave2 ease-out 1.5s 0s";
  waveB.style.animationIterationCount = "infinite";

  div.innerText = context.count;
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";
  div.style.position = "relative";
  div.style.width = size + "px";
  div.style.height = 2 * size + "px";
  div.style.lineHeight = 2 * size + "px";
  div.style.textAlign = "center";
  div.style.color = "#fff";
  div.style.fontSize = fontSize + "px";
  div.style.background =
      "linear-gradient(360deg, rgba(53,187,255,0.6) 0%, rgba(255,255,255,0) 100%)";
  div.appendChild(waveB);
  div.appendChild(waveA);
  context.marker.setOffset(new AMap.Pixel(-size / 2, -2 * size));
  context.marker.setContent(div);
}

async function markerClick(e:any) {
  // let info = e.target.getExtData();
  // curPoint.value = info;
  //弹窗
  let info = e.target.getExtData ? e.target.getExtData() : e.target.ext;
  if(!info.detail) {
    info.detail = await fetchMachineMapDeviceDetail(info.serialNo)
  }
  let modalCls = ['off','on','mal'][info.deviceStatus] + '-modal'
  let d = info.detail
  let infowindow = new AMap.InfoWindow({
    isCustom:true,
    closeWhenClickMap:true,
    content: `
      <div class="text-sm px-4 pt-4 pb-5 ${modalCls} w-[340px]">
        <div class="text-lg">${d.serialNo}</div>
        <div class="text-white/70 mt-1 text-xs">${d.machineType} | ${LOCK_LEVEL_MAP[d.lockLevel] || ''}</div>
        <div class="line my-1.5"></div>
        <div class="text-sm">
          <span class="text-white/70">${d.deviceStatus === 2 ? '故障类型' : d.deviceStatus === 1 ? '在线时长' : '离线时长'}</span>  
          <span class="text-success">${(d.deviceStatus === 2 ? d.fault : d.duringTime) || ''}</span>
        </div>
        <div class="mt-2">最近回传：${d.updateTime || ''}</div>
        <div class="mt-2">公司：${d.leaseholder || ''}</div>
        <div class="mt-2">位置：${d.address || ''}</div>
        <div class="line my-2"></div>
        <div class="flex text-primary justify-evenly">
            <a class="" href="/#/conditionMonitor/realTime?serialNo=${d.serialNo}">设备工况</a>
            <a class="" href="/#/workMonitor/device?serialNo=${d.serialNo}">设备履历</a>
        </div>
      </div>
    `,
    offset: new AMap.Pixel(0, -40)
  });
  infowindow.open(map,e.target._position);
}

</script>

<template>
  <div id="map" v-loading="loading" class="fixed inset-0 bg-page">
    <div class="fixed top-32 left-0 px-8 w-[calc(100%_-_624px)] z-50">
      <el-form class="flex">
        <el-row :gutter="12" class="mr-3 flex-1" justify="end">
          <el-col :span="5">
            <el-form-item label="机号">
              <serial-no-input v-model="serialNo" class="w-full" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="大区">
              <el-select v-model="form.region" class="w-full" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="省市">
              <region-cascader v-model="form.areas" class="w-full" />
            </el-form-item>
          </el-col>
          <el-col v-has-role="$Role.admin" :span="5">
            <el-form-item label="租赁商">
              <lease-picker v-model="form.identifier" clearable value-key="identifier" class="w-full" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="设备型号">
              <machine-type-picker v-model="form.machineTypeList" multiple clearable class="w-full" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" @click="refresh">查询</el-button>
      </el-form>
      <div class="flex">
        <router-link :to="{name:'conditionRealTime'}" class="flex-1 mr-12 h-20 border border-primary-200 bg-[#0B2143]/50 flex items-center justify-center">
          <div class="flex flex-col items-center">
            <span class="text-primary font-bold text-[28px] leading-tight">{{ statistics.deviceNo }}</span>
            <span class="text-sm">设备数量</span>
          </div>
        </router-link>
        <router-link :to="{name:'conditionRealTime',query:{deviceType:'SPS'}}" class="flex-1 mr-12 h-20 border border-primary-200 bg-[#0B2143]/50 flex items-center justify-center">
          <el-progress
            class="mr-5"
            type="circle"
            color="#63ECFF"
            :percentage="statistics.spsPercent"
            :stroke-width="3"
            :width="50"
          />
          <div class="flex flex-col items-center">
            <span class="text-[#63ECFF] font-bold text-[28px] leading-tight">{{ statistics.deviceNoSps }}</span>
            <span class="text-sm">剪叉车</span>
          </div>
        </router-link>
        <router-link :to="{name:'conditionRealTime',query:{deviceType:'SPA'}}" class="flex-1 mr-12 h-20 border border-primary-200 bg-[#0B2143]/50 flex items-center justify-center">
          <el-progress
            class="mr-5"
            type="circle"
            color="rgb(6 241 154 / 1)"
            :percentage="statistics.spaPercent"
            :stroke-width="3"
            :width="50"
          />
          <div class="flex flex-col items-center">
            <span class="text-success font-bold text-[28px] leading-tight">{{ statistics.deviceNoSpa }}</span>
            <span class="text-sm">曲臂车</span>
          </div>
        </router-link>
        <router-link :to="{name:'conditionRealTime',query:{deviceType:'SPT'}}" class="flex-1 mr-12 h-20 border border-primary-200 bg-[#0B2143]/50 flex items-center justify-center">
          <el-progress
            class="mr-5"
            type="circle"
            color="rgb(234 38 40 / 1)"
            :percentage="statistics.sptPercent"
            :stroke-width="3"
            :width="50"
          />
          <div class="flex flex-col items-center">
            <span class="text-error font-bold text-[28px] leading-tight">{{ statistics.deviceNoSpt }}</span>
            <span class="text-sm">直臂车</span>
          </div>
        </router-link>
        <router-link :to="{name:'conditionRealTime'}" class="flex-1 h-20 border border-primary-200 bg-[#0B2143]/50 flex items-center justify-center">
          <div class="flex flex-col items-center">
            <span class="text-[#716EFC] font-bold text-[28px] leading-tight">{{ statistics.onlineRte }}</span>
            <span class="text-sm">在线率</span>
          </div>
        </router-link>
      </div>
    </div>
    <status-list />
    <status-filter />
    <div class="fixed top-32 right-0 bottom-0 w-[624px] pr-8  z-50">
      <div class="h-1/3 pb-6">
        <register-chart class="h-full bg-[#0B2143]/80" />
      </div>
      <div class="h-1/3 pb-6">
        <distribution-chart class="h-full bg-[#0B2143]/80" />
      </div>
      <div class="h-1/3 pb-6">
        <ratio-charts class="h-full bg-[#0B2143]/80" />
      </div>
    </div>
    <!-- <div class="fixed top-32 h-[calc((100%_-_13rem)/3)]"></div> -->
    <!-- <div class="h-full w-full pt-32 flex relative z-50">
      <div class="basis-8/12 relative bg-slate-300"></div>
      <div class="basis-4/12 relative"></div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
:deep(.on-modal){
  background: url(@/assets/map/on_modal_bg.png);
  background-size: 100% 100%;
  .line{
    border-bottom: 1px solid;
    border-image: linear-gradient(270deg, rgba(6, 241, 154, 0), rgba(6, 241, 154, 1)) 1 1;
  }
}
:deep(.off-modal){
  background: url(@/assets/map/off_modal_bg.png);
  background-size: 100% 100%;
  .line{
    border-bottom: 1px solid;
    border-image: linear-gradient(270deg, rgba(176, 176, 176, 0), rgba(176, 176, 176, 1)) 1 1;
  }
}
:deep(.mal-modal){
  background: url(@/assets/map/mal_modal_bg.png);
  background-size: 100% 100%;
  .line{
    border-bottom: 1px solid;
    border-image: linear-gradient(270deg, rgba(255, 255, 255, 0), rgba(234, 38, 40, 1)) 1 1;
  }
}
</style>
<style lang="scss">
  @keyframes db-wave {
    0% {
      // box-shadow: 0px 0px 5px 0px rgb(244,233,37);
      transform: translate3d(0,50%,0) rotateX(55deg) scale(1);
    }
    // 10% {
    //   box-shadow: 0px 0px 5px 0px rgb(244,233,37);
    // }
    100% {
      transform: translate3d(0,50%,0) rotateX(55deg) scale(1.1);
      // box-shadow: 0px 0px 10px 2px rgb(244,233,37);
    }
  }
  @keyframes db-wave2 {
    0% {
      transform: translate3d(0,50%,0) rotateX(50deg) scale(0.5);
      opacity: 1;
    }
    // 10% {
    //   transform: translateY(50%) rotateX(55deg) scale(0.5);
    // }
    100% {
      transform: translate3d(0,50%,0) rotateX(50deg) scale(1.5);
      opacity: 0.3;
    }
  }
  .el-progress__text{
    font-size: 14px!important;
  }
</style>