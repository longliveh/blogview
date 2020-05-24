import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"
import pagination from "./modules/pagination"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    pagination
  },
  getters
})
