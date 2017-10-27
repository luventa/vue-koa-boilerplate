import axios from 'axios'
import { cookie } from 'js-cookie'
import _ from 'lodash'
// import other 3rd dependencies

Object.assign(axios.defaults, process.env.AXIOS)
axios.defaults.headers['x-requested-by'] = 'axios'

export default Vue => {
  Vue.prototype.$http = axios
  Vue.prototype.$cookie = cookie
  Vue.prototype.$_ = {
    get: _.get
  }

  Vue.prototype.$debug = msg => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Debug]', msg)
    }
  }
}
