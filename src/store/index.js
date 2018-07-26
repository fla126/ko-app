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

Vue.use(Vuex)
const last24h = {open: '0', high: '0', bottom: '0', close: '0', vol: '0', rfvol: '0', percent: '0'}
const fixed = 8
export default new Vuex.Store({
  state: {
    slogan: '学而时习之，不亦乐乎!',
    initMarket:'ETH_BTC', //初始市场
    marketList:[{currencySymbol:'ETH',baseSymbol:'BTC'},{currencySymbol:'BARK',baseSymbol:'BTC'},{currencySymbol:'BARK',baseSymbol:'ETH'}], //交易市场列表
    api_token: JsCookies.get('api_token'),
    historyLength: 0,
    factoryCode:'usbtkey-unknown', //usbkey 的硬件id
    usbkeyStatus:false, //usbKey连接状态
    isInited:false, //usbKey初始化状态
    hasLogin:false, //是否已经登录硬件
    lang: window.localStorage.getItem('lang') || 'en', //语言包
    fiat: window.localStorage.getItem('fiat') || '', //法币计量单位
    currency:{}, //币种
    contractAddr:{}, //币种对应智能合约地址
    last24h: last24h,
    USDCNY: {}, //美元与人民币汇率
    btcValuation: 0,
    btcValues: {}, //换算价格
    walletList:[], //钱包列表
    UTXO:[], //UTXO 所属币种加入ALL钱包选项
    ERC20:[], //ERC20 所属币种采用ETH结算矿工费
    SymbolExchange:[], //币种汇率
    hasMessage:true, //是否有新消息
    iconUrls:{}, //币种图标
    webThree:'',
    iconsConfig: {
      bark: 2
    },
  },
  getters:{
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
      state.factoryCode = 'usbtkey'+factoryCode
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
        JsCookies.set('api_token', apiToken)
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
