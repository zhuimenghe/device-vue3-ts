<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import wareHouseUrl from '@/assets/icons/warehouse.png'
import constructionUrl from '@/assets/icons/construction.png'
import {useStore} from '../store'

let {data,curPoint} = toRefs(useStore())

let amapLoad = AMapLoader.load({
  "key": import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": ['AMap.MarkerCluster'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})

let map:any,AMap:any;
onMounted(async () => {
  AMap = await amapLoad;
  map = new AMap.Map('map', {
    zoom:11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    mapStyle:'amap://styles/darkblue',
    viewMode:'3D', //使用3D视图
  });
})

watch(data,() => {
  map.clearMap();
  let markers = data.value.data.map((d:any) => {
    let icon = d.isHome ? wareHouseUrl : constructionUrl
    let name = d.isHome ? '仓库' : '施工点'
    let marker = new AMap.Marker({
      map: map,
      position: [d.longitude,d.latitude],
      anchor:'bottom-center',
      offset: new AMap.Pixel(0, 20),
      content:`
        <div class="flex flex-col items-center">
          <span class="text-center py-0.5 px-3 bg-[#3D6088] rounded-full whitespace-nowrap">剪${d.spsNumber} | 臂${d.spaNumber}</span>
          <img src="${icon}" class="w-10 mt-1.5"/>
          <span class="whitespace-nowrap text-sm pr-1 mt-1.5">${name}</span>
        </div>
      `,
      extData:d
    });
    marker.on('click',markerClick)
    return marker
  });
  if(data.value.data && data.value.data.length) {
    let first = data.value.data[0]
    map.setCenter([first.longitude,first.latitude]);
  }
  // let cluster = new AMap.MarkerCluster(
  //   map, // 地图实例
  //   markers,
  //   {
  //     gridSize: 100,
  //     maxZoom: 17,
  //   }
  // );
  // map.set(cluster);
})

function markerClick(e:any) {
  let info = e.target.getExtData();
  curPoint.value = info;
  //弹窗
  let infowindow = new AMap.InfoWindow({
    isCustom:true,
    closeWhenClickMap:true,
    content: `
      <div class="text-sm bg-[rgba(11,33,67,0.8)] border-primary-300 border py-2 px-4 whitespace-nowrap">
        <div>当前设备数量：剪${info.spsNumber} | 臂${info.spaNumber}</div>
        <div class="mt-1">首次入场时间：${info.beginTime}</div>
        <div class="mt-1">地址：${info.address}</div>
      </div>
    `,
    offset: new AMap.Pixel(0, -60)
  });
  infowindow.open(map,e.target._position);
}

</script>

<template>
  <div class="border-primary-300 border ">
    <div id="map" class="h-full relative">
      <div class="absolute top-3 left-5 flex z-50">
        <div class="flex flex-col items-center py-3 px-5 border border-primary-300 bg-[#0B2143]/80">
          <span class="text-primary font-bold text-xl leading-4">{{ data.spsNumber || 0 }}</span>
          <span class="text-sm">剪叉车</span>
        </div>
        <div class="ml-4 flex flex-col items-center py-3 px-5 border border-primary-300 bg-[#0B2143]/80">
          <span class="text-primary font-bold text-xl leading-4">{{ data.spaNumber || 0 }}</span>
          <span class="text-sm">臂车</span>
        </div>
      </div>
      <div class="flex text-sm z-50 py-2 px-3 border border-primary-300 absolute bottom-3 left-5 bg-[#0B2143]/80">
        <div class="flex">
          <img :src="wareHouseUrl" alt="" class="w-5" />
          <span class="ml-3">仓库（{{ data.homeNumber }}）</span>
        </div>
        <div class="flex ml-8">
          <img :src="constructionUrl" alt="" class="w-5" />
          <span class="ml-3">施工点（{{ data.constructionSiteNumber }}）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#map :deep(.amap-marker-label){
  background:transparent;
  border:none;
}
</style>