import Vue from 'vue'
import Vuex from 'vuex'
import JsCookies from 'js-cookie'
import numUtils from '@/assets/js/numberUtils'
import methods from '@/api/methods'
import userAllInfo from './modules/user'
import marketState from './modules/market'
/**
 * @desc 导入需要的store
 * @author Ivan
 */
let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')


Vue.use(Vuex)
const last24h = {open: '0', high: '0', bottom: '0', close: '0', vol: '0', rfvol: '0', percent: '0'}
const fixed = 8
export default new Vuex.Store({
  state: {
    slogan: '学而时习之，不亦乐乎!',
    initMarket:'ETH_BTC', //初始市场
    marketList:[{currencySymbol:'ETH',baseSymbol:'BTC'},{currencySymbol:'BARK',baseSymbol:'BTC'},{currencySymbol:'BARK',baseSymbol:'ETH'}], //交易市场列表
    api_token: JsCookies.get('api_token'),
    userInfo: userInfo,
    historyLength: 0,
    factoryCode:'Tinkey-unknown', //usbkey 的硬件id
    usbkeyStatus:false, //usbKey连接状态
    isInited:false, //usbKey初始化状态
    hasLogin:false, //是否已经登录硬件
    lang: window.localStorage.getItem('lang') || 'en', //语言包
    fiat: window.localStorage.getItem('fiat') || '', //法币计量单位
    currency:{ETH: true, BTC: true}, //币种
    contractAddr:{BTC : "", ETH : ""}, //币种对应智能合约地址 last24h: last24h,
    USDCNY: {}, //美元与人民币汇率
    btcValuation: 0,
    btcValues: {}, //换算价格
    walletList:[], //钱包列表
    UTXO:["BTC"], //UTXO 所属币种加入ALL钱包选项
    ERC20:[], //ERC20 所属币种采用ETH结算矿工费
    SymbolExchange:[], //币种汇率
    hasMessage:true, //是否有新消息
    iconUrls:{BTC : "data:image/png;base64,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", ETH : "data:image/png;base64,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"}, //币种图标
    webThree:'',
    iconsConfig: {
      bark: 2
    },
  },
  getters:{
    getUserInfo (state) {
      return state.userInfo
    },
    getIconUrls (state) {
      return state.iconUrls
    },
    getContractAddr (state) {
      return state.contractAddr
    },
    getHasMessage (state) {
      return state.hasMessage
    },
    getSymbolExchange (state) {
      return state.SymbolExchange
    },
    getIconsConfig (state) {
      return state.iconsConfig
    },
    getApiToken (state) {
      return state.api_token
    },
    getLast24h (state) {
      return state.last24h
    },
    getMarketList (state){
      return state.marketList
    },
    getInitMarket (state){
      return state.initMarket
    },
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
    getFiat (state){
      return state.fiat || (state.lang=='en'?'USD':'CNY')
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
      return (state.fiat || (state.lang=='en'?'USD':'CNY')) === 'USD' ? '$' : '￥'
    },
    getUSDCNY (state) {
      if ((state.fiat || (state.lang=='en'?'USD':'CNY')) === 'USD') {
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
    getAllWalletAddress (state) {
      var currency = [], addrs = []
      for(let key in state.currency){
        if(state.currency[key]){
          currency.push(key)
        }
      }
      for(var wallet of state.walletList){
        for(var token of currency){
          addrs.push(methods.getAddress(token, wallet.publicKey))
        }
      }
      return addrs
    },
    getUTXO (state) {
      return state.UTXO
    },
    getERC20 (state) {
      return state.ERC20
    },
    getWebThree(state){
      return state.webThree
    }
  },
  mutations: {
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    updateIconUrls (state, iconUrls) {
      state.iconUrls = iconUrls
    },
    updateContractAddr (state, contractAddr) {
      state.contractAddr = contractAddr
    },
    updateHasMessage (state, hasMessage) {
      state.hasMessage = hasMessage
    },
    updateSymbolExchange (state, SymbolExchange) {
      state.SymbolExchange = SymbolExchange
    },
    updateApiToken (state, apiToken) {
      state.api_token = apiToken
    },
    updateLast24h (state, last24h) {
      state.last24h = last24h
    },
    updateMarketList (state, marketList){
      state.marketList = marketList
    },
    updateHistoryLength (state){
      state.historyLength++
      console.log('historyLength = '+state.historyLength)
    },
    updateFactoryCode(state,factoryCode){
      state.factoryCode = 'Tinkey'+factoryCode
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
    updateFiat (state, fiat){
      state.fiat = fiat
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
    updateERC20 (state, ERC20) {
      state.ERC20 = ERC20
    },
    updateWebThree(state, webThree){
      state.webThree = webThree
    }
  },
  actions: {
    setUserInfo ({commit}, userInfo) {
      if (userInfo) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      }
      commit('updateUserInfo', userInfo)
    },
    setIconUrls({commit}, iconUrls){
      commit('updateIconUrls', iconUrls)
    },
    setContractAddr({commit}, contractAddr){
      commit('updateContractAddr', contractAddr)
    },
    setHasMessage({commit}, hasMessage){
      commit('updateHasMessage', hasMessage)
    },
    setApiToken (context, apiToken) {
      if (apiToken) {
        JsCookies.set('api_token', apiToken, { expires: 30/(24*60) })
      } else {
        window.localStorage.removeItem('userInfo')
        JsCookies.remove('api_token')
      }
      context.commit('updateApiToken', apiToken)
    },
    setMarketList (context, marketList) {
      marketList = marketList.filter((market)=>{
        return market.currencySymbol != 'CYL'
      })
      context.commit('updateMarketList', marketList)
    },
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
    setSymbolExchange({commit},SymbolExchange){
      commit('updateSymbolExchange',SymbolExchange)
    },
    setLang ({commit}, lang){
      window.localStorage.setItem('lang', lang)
      commit('updateLang',lang)
    },
    setFiat ({commit}, fiat){
      window.localStorage.setItem('fiat', fiat)
      commit('updateFiat',fiat)
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
    setERC20 ({commit}, ERC20) {
      commit('updateERC20', ERC20)
    },
    setWebThree ({commit}, WebThree){
      commit('updateWebThree',WebThree)
    },
    setLast24h (context, data) {
      if (!data) {
        context.commit('updateLast24h', last24h)
        return
      }
      data = data[0].constructor === Array ? data[0] : data
      let open = numUtils.BN(data[0]).toFixed(fixed)
      let high = numUtils.BN(data[1]).toFixed(fixed)
      let bottom = numUtils.BN(data[2]).toFixed(fixed)
      let close = numUtils.BN(data[3]).toFixed(fixed)
      let direction = Number(data[8])
      context.commit('updateLast24h', {
        open: open,
        high: high, // 24h最高价
        bottom: bottom, // 24h最低价
        close: close, //  最新价
        vol: numUtils.BN(data[4]).toFixed(fixed), // 24h成交量
        rfvol: numUtils.minus(close, open).toFixed(fixed), // 涨跌幅
        percent: !numUtils.BN(open).equals(0) ? numUtils.minus(close, open).div(open).mul(100).toFixed(2) : '0.00',
        direction: direction // 价格 1 买 绿色、2 卖 红色
      })
    },
  },
  modules: {
    userAllInfo,
    marketState
  }
})
