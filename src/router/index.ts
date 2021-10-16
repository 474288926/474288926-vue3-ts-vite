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
    redirect: '/home'
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
        component: Vuex
      },
      {
        path: '/test',
        name: 'Test',
        icon: 'el-icon-menu',
        component: Test
      },
      {
        path: '/example',
        name: '组件示例',
        icon: 'el-icon-menu',
        component: () => import('../views/Example/Example.vue'),
        children: [
          {
            path: '/table',
            name: 'table：表格',
            component: () => import('../views/Example/comps/table.vue')
          },
          {
            path: '/input',
            name: 'input：输入框',
            component: () => import('../views/Example/comps/input.vue')
          },
          {
            path: '/select',
            name: 'select：下拉框',
            component: () => import('../views/Example/comps/select.vue')
          },
          {
            path: '/cascader',
            name: 'cascader：级联选择器',
            component: () => import('../views/Example/comps/cascader.vue')
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
