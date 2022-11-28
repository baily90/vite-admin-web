import { defineStore } from 'pinia';
import userAPI from '@/api/user'
import router from '@/router/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),
  actions: {
    login({ username, password }: any) {
      return userAPI.login({ username, password }).then((res: any) => {
        const { data } = res
        this.token = data.token
        router.replace('/')
      })
    },
    logout() {
      this.token = ''
      router.replace('/login')
    }
  },
  persist: {
    enabled: true,
  },
})