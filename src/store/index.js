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
    factoryCode:'', //usbkey 的硬件id
    usbkeyStatus:false, //usbKey连接状态
    isInited:false, //usbKey初始化状态
    hasLogin:false, //是否已经登录硬件
    lang: window.localStorage.getItem('lang') || 'en', //语言包
    publicKey:'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', //公钥
    currency:{}, //币种
    USDCNY: {}, //美元与人民币汇率
    btcValuation: 0,
    btcValues: {}, //换算价格
    walletList:[], //钱包列表
    UTXO:[], //UTXO 所属币种加入ALL钱包选项
    webThree:''
  },
  getters:{
    getFactoryCode (state){
      return state.factoryCode
    },
    getUsbkeyStatus (state){
      return state.usbkeyStatus
    },
    getIsInited (state){
      return state.isInited
    },
    getHasLogin (state){
      return state.hasLogin
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
    getShowCurrency (state){
      var currency = []
      for(let key in state.currency){
        if(state.currency[key]){
          currency.push(key)
        }
      }
      return currency
    },
    getCoinSign (state) {
      return state.lang === 'en' ? '$' : '￥'
    },
    getUSDCNY (state) {
      if (state.lang === 'en') {
        return state.USDCNY && state.USDCNY.USD
      } else {
        return state.USDCNY && state.USDCNY.CNY
      }
    },
    getBTCValuation (state) {
      return state.btcValuation
    },
    getBtcValues (state) {
      return state.btcValues
    },
    getWalletList (state) {
      return state.walletList
    },
    getUTXO (state) {
      return state.UTXO
    },
       getWebThree(state){
      return state.webThree
    }
  },
  mutations: {
    updateHistoryLength (state){
      state.historyLength++
      console.log('historyLength = '+state.historyLength)
    },
    updateFactoryCode(state,factoryCode){
      state.factoryCode = factoryCode
    },
    updateIsInited(state,status){ //注册更新usbkey初始化函数
      state.isInited = status
    },
    updateUsbkeyStatus(state,status){ //注册更新usbkey连接函数
      state.usbkeyStatus = status
    },
    updateHasLogin(state,status){ //注册更新usbkey登陆函数
      state.hasLogin = status
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
    updateUSDCNY (state, USDCNY) {
      state.USDCNY = USDCNY
    },
    updateBTCValuation (state, btcValuation) {
      state.btcValuation = btcValuation
    },
    updateBtcValues (state, btcValues) {
      state.btcValues = btcValues
    },
    updateWalletList (state, walletList) {
      state.walletList = walletList
    },
    updateUTXO (state, UTXO) {
      state.UTXO = UTXO
    },
       updateWebThree(state, webThree){
      state.webThree = webThree
    }
  },
  actions: {
    setHistoryLength({commit}){
      commit('updateHistoryLength')
    },
    setFactoryCode({commit},factoryCode){
      commit('updateFactoryCode',factoryCode)
    },
    setUsbkeyStatus({commit},status){
      commit('updateUsbkeyStatus',status)
    },
    setIsInited({commit},status){
      commit('updateIsInited',status)
    },
    setHasLogin({commit},status){
      commit('updateHasLogin',status)
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
      currency = Object.assign(JSON.parse(JSON.stringify(context.state.currency)),currency)
      context.commit('updateCurrency',currency)
    },
    setUSDCNY ({commit}, USDCNY) {
      commit('updateUSDCNY', USDCNY)
    },
    setBTCValuation ({commit}, btcValuation) {
      commit('updateBTCValuation', btcValuation)
    },
    setBtcValues ({commit}, data) {
      let btcValues = {}
      data.forEach((item) => {
        if (item.baseSymbol === 'BTC') {
          btcValues[item.currencySymbol] = item.lastPrice
        }
      })
      commit('updateBtcValues', btcValues)
    },
    setWalletList ({commit}, walletList) {
      commit('updateWalletList', walletList)
    },
    setUTXO ({commit}, UTXO) {
      commit('updateUTXO', UTXO)
    },
      setWebThree ({commit}, WebThree){
      commit('updateWebThree',WebThree)
    }
  },
  modules: {
    
  }
})
