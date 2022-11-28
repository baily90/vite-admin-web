import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  baseURL: '/api'
})

/**
 * 每次请求在 header 中带上 token
 */
service.interceptors.request.use((config: any) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

/**
 * 拦截每一次响应，判断是否 token 失效
 * 如果 token 失效就退出登录并提示信息
 */
service.interceptors.response.use(response => {
  if(response.status && response.status === 200) {
    if(response.data.code === 401){
      ElMessage({
        message: response.data.message || '登录凭证失效，请重新登录',
        type: 'warning',
        duration: 5000
      })
    }else if(response.data.code !== 200){
      ElMessage({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5000
      })
    }
    return response.data
  }else {
    ElMessage({
      message: response.data.message,
      type: 'error',
      duration: 5000
    })
  }
}, err => {
  ElMessage({
    message: err.message || '服务器异常',
    type: 'error',
    duration: 5000
  })
})

export default service