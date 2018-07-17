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
    this.connect()
    window.connect = this.connect
    console.log(window.connect)
    this.getCurrency()
    this.initWebsoket()
    this.getMarketList()
    this.getUTXO()

    //一旦硬件断开，取消硬件连接状态，取消硬件登陆状态, 清除钱包数据
    window.setUnlinked = ()=>{
      
      alert('已断开连接')
    }
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getHasLogin','getIsInited']),
  },
  methods:{
    ...mapActions(['setCurrency','setBTCValuation','setUSDCNY','setBtcValues','setWalletList','setUTXO','setUsbkeyStatus','setHasLogin','setIsInited']),
    initRouter(){ 
      if(this.getHasLogin){
        if(this.$route.name == 'index'){
          this.$router.replace({name:'page-wallet'})
        }
      } else {
        this.$router.replace({name:'page-init'})
      }
    },
    connect(){ //连接硬件设备，全程检测连接状态
      try{
        cordova.exec((res)=>{
          res = JSON.parse(res)
          if(res.code=='-1'){
            if(this.getUsbkeyStatus){ //断开连接清除状态数据
              this.setUsbkeyStatus(false)
              this.setIsInited(false)
              this.setHasLogin(false)
              this.setWalletList([])
              this.$router.push({name:'page-init'})
            }
          } else {
            this.setUsbkeyStatus(true)
            if(res.code=='1'){
              this.setIsInited(true)
            } else {
              this.setIsInited(false)
            }
          }
          setTimeout(this.connect,5000)
        }, (error)=>{
          console.log(error)
        }, "WalletApi", "isImportAuthKey", [])
      } catch(err){}
    },
    getCurrency(){ //获取支持币种
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