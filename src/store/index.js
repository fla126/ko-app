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
    historyLength: 0,
    usbkeyStatus:false, //usbKey连接状态
    lang: window.localStorage.getItem('lang') || 'en', //语言包

  },
  getters:{
    getUsbkeyStatus (state){
      return state.usbkeyStatus
    },
    getLang (state){
      return state.lang
    },
  },
  mutations: {
    updateHistoryLength (state){
      state.historyLength++
      console.log('historyLength = '+state.historyLength)
    },
    updateUsbkeyStatus(state,status){ //注册更新usbkey连接函数
      state.usbkeyStatus = status
    },
    updateLang (state, lang){
      state.lang = lang
    },
  },
  actions: {
    setHistoryLength({commit}){
      commit('updateHistoryLength')
    },
    setUsbkeyStatus({commit},status){
      commit('updateHistoryLength',status)
    },
    setLang ({commit}, lang){
      window.localStorage.setItem('lang', lang)
      commit('updateLang',lang)
    },
    
  },
  modules: {
    
  }
})
