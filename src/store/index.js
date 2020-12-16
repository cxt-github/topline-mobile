import Vue from 'vue'
import Vuex from 'vuex'
//引入token
// import {setToken,getToken} from '../utils/token' 
import *as token from '../utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: token.getToken(),
    person: {}
  },
  mutations: {
    // 设置 use
    setUse(state,use){
      token.setToken(use)
      //更新给user
      state.user = use
    },
    setPerson(state,data){
      state.person = data
    }
  },
  actions: {
  },
  modules: {
  }
})
