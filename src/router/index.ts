import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import permissionRouter from './modules/permission.router'

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
          title: '首页面板',
          icon: 'Watermelon'
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
  ...permissionRouter,
  {
    path: '/test',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '测试',
      icon: 'Coffee',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: () => import('@/views/test/indexAdmin.vue'),
        meta: {
          title: '测试-管理员',
          icon: 'GobletFull',
          roles: ['admin']
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/views/test/indexEditor.vue'),
        meta: {
          title: '测试-普通用户',
          icon: 'GobletFull',
          roles: ['editor']
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
  document.title = to.meta?.title as string || '管理后台'
  NProgress.start();
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
        next()
      }
    }
  } else {
    if (to.path !== '/login') {
      next('/login') 
    }else {
      next()
    }
  }
})
// 导航跳转结束
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
