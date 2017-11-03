import axios from 'axios'
import { encrypt } from './crypto'

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    const config = Object.assign({}, process.env.API_CONF, options)
    Object.assign(axios.defaults, config)

    Vue.axios = axios

    const enryptAgent = axios.create()
    enryptAgent.interceptors.request.use(request => {
      let origin = request.data

      if (origin !== null) {
        request.data = {
          cipher: encrypt(origin)
        }

        if (process.env.NODE_ENV !== 'production') {
          request.data.origin = origin
        }
      }

      return request
    })

    Object.defineProperties(Vue.prototype, {
      axios: {
        get () {
          return axios
        }
      },
      $http: {
        get () {
          return axios
        }
      },
      $https: {
        get () {
          return enryptAgent
        }
      }
    })
  }
}
