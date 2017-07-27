import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: {},
    menus: []
  },
  mutations: {
    getAccount: state => state.account,
    setAccount: (state, account) => {
      state.account = account
    },
    getMenus: state => state.menus,
    setMenus: (state, menus) => {
      state.menus = menus
    }
  }
})
