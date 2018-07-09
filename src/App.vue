<template>
  <div id="app">
      <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
      	<router-view></router-view>
      </transition>
  </div>
</template>

<script>
import api from '@/api/data'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  created(){
    this.initRouter()
    this.getCurrency()
  },
  computed:{

  },
  methods:{
    ...mapActions(['setCurrency']),
    initRouter(){ //第一次访问路由
      let isfirst = localStorage.getItem('firstWallet')
      if(!isfirst){
        this.$router.replace({name:'guide'})
      } else {
        if(this.$route.name == 'index'){
          this.$router.replace({name:'login'})
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
      }).catch((error)=>{
        _currencyobj = {
          BTC:true,
          ETH:true,
          ZEC:false,
          SNT:false,
        }
        currency = Object.assign(_currencyobj,currencySetting)
        this.setCurrency(_currencyobj)
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