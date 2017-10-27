import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// import { cookie } from 'js-cookie'
import App from './App'
import router from './router'
import store from './store'
import enrich from './enrich'

enrich(Vue)

Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

sync(store, router)
// const { state, dispatch } = store

router.beforeEach((route, redirect, next) => {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
