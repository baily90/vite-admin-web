import request from '@/utils/request'

export default {
  login(data: { username: string, password: string }) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  getUserInfo() {
    return request({
      url: '/user/info',
      method: 'get'
    })
  }
}