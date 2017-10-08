import * as types from '../mutation-types'

// user related states can be added here.
const state = {
  userId: null,
  isLogin: false,
  showLogin: false
}

const mutations = {
  [types.USER_LOGIN] (state, userId) {
    state.isLogin = true
    state.userId = userId
    state.showLogin = false
  },
  [types.USER_LOGOUT] (state) {
    state.isLogin = false
    state.userId = null
  },
  [types.TOGGLE_SHOW_LOGIN] (state) {
    state.showLogin = !state.showLogin
  }
}

export default {
  state,
  mutations
}
