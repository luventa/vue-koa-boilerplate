import { cookie } from 'js-cookie'

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, {
      $cookie: {
        get () {
          return cookie
        }
      },
      $c: {
        get () {
          return cookie
        }
      }
    })
  }
}
