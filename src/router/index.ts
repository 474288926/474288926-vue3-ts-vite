import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Vuex from '@/views/Vuex.vue'
import Test from '@/views/Test.vue'

const layout = () => import('../views/layout/layout.vue')

// 路由字段扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  icon?: string
}

const routes = [
  {
    path: '/',
    // name: '首页',
    component: Home
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        icon: 'el-icon-menu',
        component: Home
      },
      {
        path: '/vuex',
        name: 'Vuex',
        icon: 'el-icon-menu',
        component: Vuex,
        children: [
          {
            path: '/test',
            name: 'Test',
            icon: 'el-icon-menu',
            component: Test
          }
        ]
      }
    ] as AppRouteRecordRaw[]
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
