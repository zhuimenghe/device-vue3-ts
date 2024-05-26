<script setup lang="ts">
import VirtualList from 'vue3-virtual-scroll-list';
import Item from './listItem.vue';
import {DynamicSizeList,FixedSizeList} from 'element-plus'
import 'element-plus/es/components/virtual-list/style/css'
import {useStore} from '../store'

let open = ref(false)
let tab = ref(1)
let {list,cur} = toRefs(useStore())
let filterList = computed(() => {
  let res = list.value.filter(d => d.deviceStatus === tab.value).map(d => {
    return{
      ...d,
      type:['warning','success','danger'][d.deviceStatus],
      typeStr:['离线','在线','故障'][d.deviceStatus],
    }
  })
  return res
})

const vlist = ref();
const listHeight = ref(0);
onMounted(() => {
  // listHeight.value = vlist.value.getBoundingClientRect().height
})
const items = ref<any[]>([])
function setItem (el:any) {
  items.value.push(el);
}
function getSize(id:number) {
  if(items.value[id]) {
    console.log(items.value[id].getBoundingClientRect().height);
    return items.value[id].getBoundingClientRect().height || 86
  }
  return 86
}

</script>

<template>
  <div :class="{'-translate-x-full':!open}" class="fixed flex flex-col top-72 bottom-24 left-0 w-72 px-3 py-4 bg-[#0B2143]/80 z-50 transition-transform ease-in-out">
    <div :class="{'rotate-180':open}" class="absolute left-full top-1/2 -translate-y-1/2 bg-primary w-3 h-20 flex items-center justify-center" @click="open=!open">
      <svg-icon icon="iconzhankai" class="text-3xl text-white -rotate-90 transition-transform ease-in-out" />
    </div>
    <el-radio-group v-model="tab" class="w-full">
      <el-radio-button class="flex-1" :label="1">在线</el-radio-button>
      <el-radio-button class="flex-1" :label="0">离线</el-radio-button>
      <el-radio-button class="flex-1" :label="2">故障</el-radio-button>
    </el-radio-group>
    <!-- <div ref="vlist" class="flex-1 overflow-auto">
      <dynamic-size-list
        v-if="filterList.length"
        :height="listHeight"
        :total="filterList.length"
        :estimated-item-size="86"
        :item-size="getSize"
      >
        <template #default="{index:i,style}">
          <div :ref="setItem" class="border-b border-dashed border-primary-300 py-4" :style="{...style,height:'auto'}" @click="cur=filterList[i]">
            <div class="flex">
              <span>{{ filterList[i].serialNo }}</span>
              <el-tag
                class="ml-2"
                :type="filterList[i].type"
                effect="light"
              >{{ filterList[i].typeStr }}</el-tag>
            </div>
            <div class="flex mt-2">
              <svg-icon icon="icondingwei3" class="mt-0.5 mr-2" />
              <span class="text-sm">{{ filterList[i].address }}</span>
            </div>
          </div>
        </template>
      </dynamic-size-list>
    </div> -->
    <virtual-list
      v-if="tab==1"
      class="flex-1 overflow-auto father"
      :estimate-size="86"
      :data-key="'serialNo'"
      :data-sources="filterList"
      :data-component="Item"
    />
    <virtual-list
      v-if="tab==0"
      class="flex-1 overflow-auto father"
      :estimate-size="86"
      :data-key="'serialNo'"
      :data-sources="filterList"
      :data-component="Item"
    />
    <virtual-list
      v-if="tab==2"
      class="flex-1 overflow-auto father"
      :estimate-size="86"
      :data-key="'serialNo'"
      :data-sources="filterList"
      :data-component="Item"
    />
    <!-- <el-scrollbar class="flex-1">
      <div v-for="d in filterList" :key="d.serialNo" class="border-b border-dashed border-primary-300 py-4">
        <div class="flex">
          <span>{{ d.serialNo }}</span>
          <el-tag
            class="ml-2"
            :type="d.type"
            effect="light"
          >{{ d.typeStr }}</el-tag>
        </div>
        <div class="flex mt-2">
          <svg-icon icon="icondingwei3" class="mt-0.5 mr-2" />
          <span class="text-sm">{{ d.address }}</span>
        </div>
      </div>
    </el-scrollbar> -->
  </div>
</template>
<style lang="scss">
  .father::-webkit-scrollbar{
        width:8px;
        height:10px;
        /**/
      }
      .father::-webkit-scrollbar-track{
        background: rgb(239, 239, 239);
        border-radius:2px;
      }
      .father::-webkit-scrollbar-thumb{
        background: #bfbfbf;
        border-radius:10px;
      }
      .father::-webkit-scrollbar-track-piece{
        background: transparent;
      }
      .father::-webkit-scrollbar-thumb:hover{
        background: #aaa;
      }
      .father::-webkit-scrollbar-corner{
        background: #179a16;
      }

</style>
<style scoped lang="scss">
</style>