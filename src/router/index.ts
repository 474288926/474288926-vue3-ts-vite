import {
  createRouter,
  createWebHashHistory,
  Router,
  Route,
  RouteRecordRaw
} from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '@/views/Home.vue'
import Vuex from '@/views/Vuex.vue'
import Test from '@/views/Test.vue'

NProgress.configure({ showSpinner: false })

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
        component: () => import('@/views/Example/Example.vue'),
        children: [
          {
            path: '/table',
            name: 'table：表格',
            component: () => import('@/views/Example/comps/table.vue')
          },
          {
            path: '/input',
            name: 'input：输入框',
            component: () => import('@/views/Example/comps/input.vue')
          },
          {
            path: '/select',
            name: 'select：选择框',
            component: () => import('@/views/Example/comps/select.vue')
          },
          {
            path: '/cascader',
            name: 'cascader：级联选择器',
            component: () => import('@/views/Example/comps/cascader.vue')
          },
          {
            path: '/checkbox',
            name: 'checkbox：多选框',
            component: () => import('@/views/Example/comps/checkbox.vue')
          },
          {
            path: '/datepicker',
            name: 'datepicker：日期选择器',
            component: () => import('@/views/Example/comps/datepicker.vue')
          },
          {
            path: '/button',
            name: 'button：按钮',
            component: () => import('@/views/Example/comps/button.vue')
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

router.beforeEach(async (to: Route, from: Route, next: () => void) => {
  NProgress.start()
  next()
})

router.afterEach((to: Route) => {
  NProgress.done()
})

export default router
