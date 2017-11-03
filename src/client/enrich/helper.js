/****************************************
* All helpers can be added in this file *
****************************************/

import _ from 'lodash'

const lodashFn = {
  '_get': _.get,
  '_merge': _.merge,
  '_trim': _.trim
}

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, lodashFn)
  }
}
