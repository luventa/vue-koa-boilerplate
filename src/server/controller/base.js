/*****************
* Base controller *
******************/
import _ from 'lodash'
import { getLogger } from 'log4js'

export default class BaseController {
  constructor (name) {
    this.logger = getLogger(name)
    this._ = _

    // add shotcuts for lodash methods
    Object.keys(_).forEach(key => {
      this[`_${key}`] = _[key]
    })
  }
}
