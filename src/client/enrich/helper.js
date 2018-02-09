/****************************************
* All helpers can be added in this file *
****************************************/

import _ from 'lodash'
import moment from 'moment'

const lodashFn = {
  '_get': _.get,
  '_merge': _.merge,
  '_trim': _.trim
}

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    moment.locale('zh-cn')

    Object.defineProperties(Vue.prototype, _.mapValues(lodashFn, fn => {
      return {
        get () {
          return fn
        }
      }
    }))

    Object.defineProperties(Vue.prototype, {
      $moment: {
        get () {
          return moment
        }
      }
    })
  }
}
