import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

const lazyLoad = (name, index = false) => () => import(`@view/${name}${index ? '/index' : ''}.vue`)

// const generateRoutes = (items, needAuth, routes = []) => {
//   for (let i = 0, l = items.length; i < l; i++) {
//     let route
//     let item = items[i]
//     if ((item.name || item.file) && !item.labelOnly) {
//       route = {
//         name: item.name,
//         path: item.path || `/${item.name.toLowerCase()}`,
//         alias: item.alias,
//         component: lazyLoad(item.file || item.name, item.useIdx),
//         meta: {
//           label: item.label || item.routeLabel,
//           icon: item.icon,
//           needAuth: (item.needAuth === null) ? needAuth : item.needAuth,
//           parent: item.parent
//         }
//       }
//     }
//     if (route) {
//       if (item.children) {
//         route.children = generateRoutes(item.children, route.meta.needAuth)
//       }
//       routes.push(route)
//     }
//   }
//   return routes
// }

export default new Router({
  mode: process.env.ROUTE_MODE,
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/httpDemo',
    name: 'HttpDemo',
    component: lazyLoad('HttpDemo')
  }, {
    path: '/404',
    name: '404',
    component: lazyLoad('404')
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '*',
    redirect: '/404'
  }]
})
