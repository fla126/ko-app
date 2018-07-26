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
    window.getCurrency = this.getCurrency //设置为全局化，方便刷新时调用
    this.getSymbolExchange()
    
    //一旦硬件断开，取消硬件连接状态，取消硬件登陆状态, 清除钱包数据
    window.setUnlinked = ()=>{
      console.log('Unlinked')
      this.setUsbkeyStatus(false)
      this.setIsInited(false)
      this.setHasLogin(false)
      this.setWalletList([])
      this.$router.push({name:'page-init',params:{unlinkedShow:true}})
    }
    // 一旦硬件连接，启用硬件连接函数
    window.setLinked = this.connect
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getHasLogin','getIsInited']),
  },
  methods:{
    ...mapActions(['setCurrency','setSymbolExchange','setWalletList','setUTXO','setERC20','setUsbkeyStatus','setHasLogin','setIsInited','setContractAddr','setIconUrls']),
    initRouter(){ 
      if(this.getHasLogin){
        if(this.$route.name == 'index'){
          this.$router.replace({name:'page-wallet'})
        }
      } else {
        this.$router.replace({name:'page-init'})
      }
    },
    connect(key){ //连接硬件设备，全程检测连接状态
      console.log('Linked')
      cordova.exec((res)=>{
        res = JSON.parse(res)
        if(res.code!='-1'){
          this.setUsbkeyStatus(true)
          if(res.code=='-2'){
            this.setIsInited(true)
          } else {
            this.setIsInited(false)
          }
          this.$router.replace({name:'page-init'})
        } else {
          if(!key){
            setTimeout(this.connect,1000)
          }
        }
      }, (error)=>{
        console.log(error)
      }, "WalletApi", "isImportAuthKey", [])
    },
    getCurrency(){ //获取支持币种
      return api.getCurrency().then((res)=>{
        if(res.data.rst==1){
          //获取支持币种以及币种对应智能合约地址
          var currency, _currencyobj = {}, contractAddr = {}, _iconUrls = {}, currencySetting = JSON.parse(window.localStorage.getItem('currencySetting') || '{}')
          for(let i=0, _temp; i<res.data.data.support.length; i++){
            _temp = (res.data.data.support[i].symbolSymbol).toUpperCase()
            _currencyobj[_temp] = true
            contractAddr[_temp] = res.data.data.support[i].contractAddr?res.data.data.support[i].contractAddr:''
            _iconUrls[_temp] = res.data.data.support[i].iconUrl
          }
          currency = Object.assign(_currencyobj,currencySetting)
          this.setCurrency(_currencyobj)
          this.setContractAddr(contractAddr)
          this.setIconUrls(_iconUrls)
          //获取UTXO币种
          var _UTXO = []
          for(let i=0, _temp; i<res.data.data.utxo.length; i++){
            _temp = (res.data.data.utxo[i].symbolSymbol).toUpperCase()
            _UTXO.push(_temp)
          }
          this.setUTXO(_UTXO)
          //获取ERC20币种
          var _ERC20 = []
          for(let i=0, _temp; i<res.data.data.erc20.length; i++){
            _temp = (res.data.data.erc20[i].symbolSymbol).toUpperCase()
            _ERC20.push(_temp)
          }
          this.setERC20(_ERC20)
        }
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
    getSymbolExchange(key){
      //获取币种汇率
      api.getSymbolExchange().then((res)=>{
        if (res.data.rst == 1) {
          this.setSymbolExchange(res.data.data)
        }
      })
      if(!key){
        setTimeout(()=>{this.getSymbolExchange()},5*60*1000)
      }
    },

  },
  components:{

  }
}
</script>
<style lang="less">
@import './assets/css/common/common.less';
</style>