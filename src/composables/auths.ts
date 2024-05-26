import { useUserInfo } from '@/store/userInfo'

export function hasRole(role: string) {
  let { info } = useUserInfo()
  let has = computed(() => {
    return info.roles.includes(role)
  })
  return has
}