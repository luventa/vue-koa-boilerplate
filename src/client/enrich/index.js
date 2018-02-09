import axios from './axios'
import cookie from './cookie'
import crypto from './crypto'
import helper from './helper'
// import other 3rd dependencies

export default Vue => {
  Vue.use(axios)
  Vue.use(cookie)
  Vue.use(crypto)
  Vue.use(helper)
}
