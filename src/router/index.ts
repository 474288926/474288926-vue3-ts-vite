import {
  createRouter,
  createWebHashHistory,
  Router,
  Route,
  RouteRecordRaw
} from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'js-cookie'
import { store } from '@/store'

import { filterAsyncRouter } from './filterAsyncRouter'

NProgress.configure({ showSpinner: false })

const layout = () => import('../views/layout/layout.vue')

// 路由字段扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  icon?: string
}

export const constantRoutes = [
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
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/vuex',
    name: 'Vuex',
    icon: 'el-icon-menu',
    meta: { roles: ['admin', 'user'] },
    component: 'Vuex'
  },
  {
    path: '/test',
    name: 'Test',
    icon: 'el-icon-menu',
    meta: { roles: ['admin'] },
    component: 'Test'
  },
  {
    path: '/example',
    name: '组件示例',
    icon: 'el-icon-menu',
    meta: { roles: ['user'] },
    component: 'Example/Example',
    children: [
      {
        path: '/table',
        name: 'table：表格',
        meta: { roles: ['user'] },
        component: 'Example/comps/table'
      },
      {
        path: '/input',
        name: 'input：输入框',
        meta: { roles: ['user'] },
        component: 'Example/comps/input'
      },
      {
        path: '/select',
        name: 'select：选择框',
        meta: { roles: ['user'] },
        component: 'Example/comps/select'
      },
      {
        path: '/cascader',
        name: 'cascader：级联选择器',
        meta: { roles: ['admin'] },
        component: 'Example/comps/cascader'
      },
      {
        path: '/checkbox',
        name: 'checkbox：多选框',
        meta: { roles: ['admin'] },
        component: 'Example/comps/checkbox'
      },
      {
        path: '/datepicker',
        name: 'datepicker：日期选择器',
        meta: { roles: ['admin'] },
        component: 'Example/comps/datepicker'
      },
      {
        path: '/button',
        name: 'button：按钮',
        meta: { roles: ['admin'] },
        component: 'Example/comps/button'
      }
    ]
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// eslint-disable-next-line consistent-return
router.beforeEach(async (to: Route, from: Route, next: Function) => {
  NProgress.start()
  // console.log('添加路由前', router.getRoutes())
  // if (router.getRoutes().length === 4) {
  //   let addRouterList = filterAsyncRouter(JSON.parse(JSON.stringify(asyncRoutes)))
  //   addRouterList.forEach((i) => {
  //     console.log('添加路由', i)
  //     router.addRoute('layout', i)
  //   })
  // }
  const { roles } = store.state.userModule
  const accessRoutes = await store.dispatch('permissionModule/generateRoutes', roles)
  let addRouterList = filterAsyncRouter(JSON.parse(JSON.stringify(accessRoutes)))
  console.log('权限返回的路由', addRouterList)
  addRouterList.forEach((i) => {
    console.log('添加路由', i)
    router.addRoute('layout', i)
  })
  console.log('刷新路由')
  console.log(accessRoutes)
  console.log('添加后的路由', router.getRoutes())
  if (to.path === '/login') return next()
  const tokenstr = Cookies.get('token')
  if (!tokenstr) return next({ name: 'Login' })
  next()
})

router.afterEach((to: Route) => {
  NProgress.done()
})

export default router
