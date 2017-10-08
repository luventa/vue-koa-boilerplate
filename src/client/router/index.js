import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Count from '@/views/Count'
import Notfound from '@/views/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/count',
    name: 'Count',
    component: Count
  }, {
    path: '/404',
    name: '404',
    component: Notfound
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '*',
    redirect: '/404'
  }]
})
