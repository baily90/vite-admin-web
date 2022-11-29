export default [
  {
    path: '/permission',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Pear',
      roles: ['admin']
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/permission/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'Smoking',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Mug',
          roles: ['admin']
        }
      },
      {
        path: 'source',
        name: 'source',
        component: () => import('@/views/permission/source/index.vue'),
        meta: {
          title: '资源管理',
          icon: 'Sugar',
          roles: ['admin']
        }
      }
    ]
  }
]