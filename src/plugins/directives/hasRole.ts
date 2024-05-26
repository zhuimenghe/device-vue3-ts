import type {
  ComponentPublicInstance,
  DirectiveBinding,
  ObjectDirective,
} from 'vue'
import { useUserInfo } from '@/store/userInfo'

const HasRole: ObjectDirective<any, string> = {
  mounted(el, binding, vnode, prevVnode) {
    // see below for details on arguments
    let role = binding.value
    let { info } = useUserInfo()
    watchEffect(() => {
      if (!info.roles.includes(role)) {
        el.style.display = 'none'
      } else {
        el.style.display = ''
      }
    })
  },
}

export default HasRole