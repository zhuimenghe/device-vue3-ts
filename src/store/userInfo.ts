import { defineStore } from 'pinia';
import { getUserInfo, login as loginApi } from '@/apis/modules/user'
import router from '@/router'

export interface UserInfo {
  roles: string[]
}

export const useUserInfo = defineStore('userInfo', () => {
  let info = reactive<UserInfo>({
    roles: [],
  })

  async function init() {
    const res = await getUserInfo();
    Object.assign(info, res)
  }
  init()

  let token = useStorage('access_token', '')
  async function login(username: string, password: string) {
    token.value = await loginApi(username.trim(), encrypt(password.trim()))
    init()
    router.replace({ path: '/' })
  }

  async function logout() {
    token.value = ''
    info = { roles: [] }
    router.replace({ name: 'login' })
  }

  return { info, init, login, logout }
})