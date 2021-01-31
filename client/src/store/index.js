import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('user-token') || '',
    darsId: 0
  },
  mutations: {
    increment (state) {
      state.darsId++
    },
    accessToken(state, newToken) {
      state.accessToken = newToken
      localStorage.setItem('user-token', newToken)
    }
  },

})

export default store
