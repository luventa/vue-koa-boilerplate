import _ from 'lodash'
import { getLogger } from 'log4js'

const setNativeProperty = (target, key, value) => {
  Object.defineProperty(target, key, {
    value: value,
    enumerable: false,
    configurable: true,
    writable: false
  })
}

export default class BaseController {
  constructor (name) {
    setNativeProperty(this, 'logger', getLogger(name))

    // setup lodash shortcuts
    Object.keys(_).forEach(key => setNativeProperty(this, `_${key}`, _[key]))
  }
}
