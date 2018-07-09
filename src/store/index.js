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
    publicKey:'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', //公钥
    currency:{} //币种

  },
  getters:{
    getUsbkeyStatus (state){
      return state.usbkeyStatus
    },
    getLang (state){
      return state.lang
    },
    getPublicKey (state){
      return state.publicKey
    },
    getCurrency (state){
      return state.currency
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
    updatePublicKey (state, publicKey){
      state.publicKey = publicKey
    },
    updateCurrency (state, currency){
      state.currency = currency
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
    setPublicKey({commit},publicKey){
      commit('updatePublicKey',publicKey)
    },
    setCurrency (context, currency){
      window.localStorage.setItem('currencySetting',JSON.stringify(currency))
      currency = Object.assign(context.state.currency,currency)
      context.commit('updateCurrency',currency)
    },
  },
  modules: {
    
  }
})
