import { constantRoutes, asyncRoutes } from '@/router';
import userAPI from '@/api/user'
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    roles: [],
    accessedRoutes: []
  }),
  getters: {
    routes: (state) => [...constantRoutes, ...state.accessedRoutes]
  },
  actions: {
    getUserInfo() {
      return userAPI.getUserInfo().then(({ data }: any) => {
        this.roles = data.roles
        return data
      })
    },
    hasPermission(roles: string[], route: any) {
      if (route.meta && route.meta.roles) {
        return roles.some((role: any) => route.meta.roles.includes(role))
      } else {
        return true
      }
    },

    filterAsyncRoutes(routes: any, roles: string[]) {
      const res: any = []
      routes.forEach((route: any) => {
        const tmp = {...route}
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })
      return res
    },

    // 根据角色过滤动态路由
    // 如果角色包含 admin，则拥有全部路由权限
    generateRoutes(roles: string[]) {
      if (roles.includes('admin')) {
        this.accessedRoutes = asyncRoutes as any || []
      } else {
        this.accessedRoutes = this.filterAsyncRoutes(asyncRoutes, roles)
      }
      return this.accessedRoutes
    }
  }


})