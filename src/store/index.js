import Vue from 'vue'
import Vuex from 'vuex'
import users from './users/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
	  users,
  }
})
