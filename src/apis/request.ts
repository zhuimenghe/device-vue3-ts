import axios from 'axios';
import { useStorage } from '@vueuse/core'
import { ElMessage, ElLoading } from 'element-plus';
import router from '@/router'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showLoading?: boolean;
  }
}

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

let loadingInstance: any
let loadingCount = 0;

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      handleLoadingOpen()
    }
    config.headers = config.headers || {}
    // 在发送请求之前做些什么 tokenc
    let token = useStorage('access_token', '')
    config.headers.Authorization = token.value;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.config.showLoading) {
      handleLoadingClose()
    }
    // 对响应数据做点什么
    if (response.config.responseType === "blob") {
      return response.data
    }
    const res = response.data;
    if (res.code && res.code !== 200) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        let token = useStorage('access_token', '')
        token.value = ''
        // const router = useRouter();
        router.replace({ name: 'login' })
        // window.location.href = '/#/login'; // 去登录页
        ElMessage.error('你已被登出，请重新登录');
      } else if (res.msg) {
        ElMessage.error(res.msg);
      }
      return Promise.reject(response);
    }
    return response.data.data || response.data; //有的接口结构可能没有data
  },
  (error) => {
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error)
    }
    if (error.config && error.config.showLoading) {
      handleLoadingClose()
    }
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      ElMessage.error('网络超时');
    } else if (error.message === 'Network Error') {
      ElMessage.error('网络连接错误');
    } else {
      if (error.response.data) {
        ElMessage.error(error.response.statusText);
      } else {
        ElMessage.error('接口路径找不到');
      }
    }
    return Promise.reject(error);
  }
);

function handleLoadingOpen() {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service()
  }
  loadingCount++
}

function handleLoadingClose() {
  if (loadingInstance && loadingCount === 1) {
    loadingInstance.close()
    loadingInstance = null
  }
  loadingCount--
}

// 导出 axios 实例
export default service;
