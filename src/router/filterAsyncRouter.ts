/* eslint-disable array-callback-return */
/* eslint-disable import/no-dynamic-require */
export const loadView = (view: any) => {
  // 路由懒加载
  // return (resolve) => require([`@/views/${view}`], resolve) router3版本
  // console.log(view, () => import(`../views/${view}.vue`))
  // eslint-disable-next-line global-require
  return () => import(`../views/${view}.vue`) // router4版本
}
// 为权限路由异步添加组件
export const filterAsyncRouter = (routeList: any) => {
  // eslint-disable-next-line array-callback-return
  // eslint-disable-next-line consistent-return
  return routeList.filter((route: any) => {
    // console.log(9, route)
    if (route.component) {
      // 如果不是布局组件就只能是页面的引用了
      // 利用懒加载函数将实际页面赋值给它
      // eslint-disable-next-line no-param-reassign
      route.component = loadView(route.component)
      // 判断是否存在子路由，并递归调用自己
      if (route.children && route.children.length) {
        // eslint-disable-next-line no-param-reassign
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}
