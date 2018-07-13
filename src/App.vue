<template>
  <div id="app">
      <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
      	<router-view></router-view>
      </transition>
  </div>
</template>

<script>
import api from '@/api/data'
import GlobalWebSocket from '@/assets/js/websocket'
import numUtils from '@/assets/js/numberUtils'
import utils from '@/assets/js/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data(){
    return {
      gws: null,
    }
  },
  created(){
    this.initRouter()
    this.getCurrency()
    this.initWebsoket()
    this.getMarketList()
    this.getWalletList()
    this.getUTXO()
  },
  computed:{

  },
  methods:{
    ...mapActions(['setCurrency','setBTCValuation','setUSDCNY','setBtcValues','setWalletList','setUTXO']),
    initRouter(){ //第一次访问路由
      let isfirst = localStorage.getItem('firstWallet')
      if(!isfirst){
        this.$router.replace({name:'guide'})
      } else {
        if(this.$route.name == 'index'){
          this.$router.replace({name:'page-wallet'})
        }
      }
    },
    getCurrency(){
      var currency, _currencyobj = {}, currencySetting = JSON.parse(window.localStorage.getItem('currencySetting') || '{}')
      api.getCurrency().then((res)=>{
        for(let i=0, _temp, _active; i<res.data.data.length; i++){
          _temp = (res.data.data[i]).toUpperCase()
          _active = (_temp=='BTC' || _temp=='ETH')? true : false
          _currencyobj[_temp] = _active
        }
        currency = Object.assign(_currencyobj,currencySetting)
        this.setCurrency(_currencyobj)
      }).catch((error)=>{ //启用模拟数据
        _currencyobj = {
          BTC:true,
          ETH:true,
          BARK:false
        }
        currency = Object.assign(_currencyobj,currencySetting)
        this.setCurrency(_currencyobj)
      })
    },
    initWebsoket(){
      //建立全局推送，初始化数据
      this.gws = new GlobalWebSocket({
        type: 'global',
        callback: (res) => {
          if (res.dataType === 'LastValuation') {
            this.setUSDCNY({
              USD: numUtils.BN(res.USD).toFixed(2),
              CNY: numUtils.BN(res.USDCNY).toFixed(2)
            })
            this.setBTCValuation(numUtils.BN(res.totalAmount).toFixed(8)) // 当前转换人民币
          }
        }
      })
    },
    getMarketList(){
      //获取市场列表并初始化BTC币种与其它币种最新交易价格
      api.getMarketList().then((res)=>{
        if (res.data.rst === 1) {
          this.setBtcValues(res.data.data)
        }
      })
    },
    getWalletList(){
      //获取硬件钱包列表
      api.getWalletList().then((res)=>{
        if (res.data.rst === 1) {
          this.setWalletList(res.data.data)
        }
      }).catch((error)=>{ //启用模拟数据
        this.setWalletList([{
          name:'零花钱',
          publicKey:'040ba1ba3b8d8f7bd4a70828ec0e749dd26ee4cdd18d058c880afa121fad60e5b6f2ee1b72d9b9a57706e5de72acc1378f92269086c4964c073593bf92d28c647d',
          currency:{
            BTC:0.03529,
            ETH:15.234,
            BARK:107.346
          }
        },{
          name:'长期投资',
          publicKey:'04ba2416481d6260e621d8f2b6aad3e9c51d438c1876b624303a16f2bcf8a06cd695cef87230180ceed5735e7bf6cb3f9db360f6fee50824c85f230a6bb3ca9573',
          currency:{
            BTC:4.734857,
            ETH:105.321784,
            BARK:2018.1314
          }
        }])      
      })
    },
    getUTXO(){
      //获取UTXO列表 所属币种加入ALL钱包选项
      api.getUTXO().then((res)=>{
        if (res.data.rst === 1) {
          this.setUTXO(res.data.data)
        }
      }).catch((error)=>{ //启用模拟数据
        this.setUTXO(['BTC','ZEC'])
      })
    },
  },
  components:{

  }
}
</script>
<style lang="less">
@import './assets/css/common/common.less';
</style>