import * as types from '../mutation-types'

// device related states can be added here.
const state = {
  isMobile: false
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, isMobile) {
    state.isMobile = isMobile
  }
}

export default {
  state,
  mutations
}
