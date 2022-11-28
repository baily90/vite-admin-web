import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

export const constantRoutes: RouteRecordRaw[]  = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '数据面板'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/index.vue'),
    meta: {
      hidden: true,
      title: 'errors~'
    }
  }
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: '关于'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// 导航跳转开始
router.beforeEach(async (to, from, next) => {
  document.title = to.meta?.title || '管理后台'
  const { token } = useUserStore()
  const { roles, getUserInfo, generateRoutes } = usePermissionStore()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const hasRoles = roles && roles.length > 0
      if (!hasRoles) {
        return getUserInfo().then(({ roles }) => {
          const accessedRoutes = generateRoutes(roles)
          accessedRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          next(to.fullPath)
        })
      }else {
        NProgress.start()
        next()
      }
    }
  } else {
    if (to.path !== '/login') {
      next('/login') 
    }else {
      NProgress.start()
      next()
    }
  }
})
// 导航跳转结束
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
