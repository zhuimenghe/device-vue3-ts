import { useUserInfo, UserInfo } from '@/store/userInfo'
import { Ref } from 'vue'

export default {
  install(Vue: any) {
    const { info } = useUserInfo()
    Vue.config.globalProperties.$info = info
    Vue.config.globalProperties.$Role = Role
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $info: UserInfo;
    $Role: typeof Role;
  }
}