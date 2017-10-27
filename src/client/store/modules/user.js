import * as types from '../mutation-types'

// user related states can be added here.
const state = {
  userId: null,
  isLoggedin: false
}

const mutations = {
  [types.USER_LOGIN] (state, userId) {
    state.isLogin = true
    state.userId = userId
  },
  [types.USER_LOGOUT] (state) {
    state.isLogin = false
    state.userId = null
  }
}

export default {
  state,
  mutations
}
