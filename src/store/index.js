import Vue from 'vue'
import Vuex from 'vuex'
/**
 * @desc 导入需要的store
 * @author Ivan
 */


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slogan: '学而时习之，不亦乐乎!',
    historyLength: 0
  },
  mutations: {
    updateHistoryLength (state){
      state.historyLength++
      console.log('historyLength = '+state.historyLength)
    }
  },
  actions: {
    updateHistoryLength({commit}){
      commit('updateHistoryLength')
    }
  },
  modules: {
    
  }
})
