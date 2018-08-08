<template>
  <div class="page">
    <comp-top-back :home="true"></comp-top-back>
    <div class="page-main">
      <ul class="pament-detail">
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.receive')}} {{currency}}<span>{{name}}</span></h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{currency}}{{$t('message.walletDetail.receive')}}<span>{{name}}</span></h1>
          <p>{{$t('message.walletDetail.receiveAddress')}}</p>
          <!-- <p><input id="gatherInput" :placeholder="$t('message.walletDetail.enterAmount')" type="number" v-model="amount"></p> -->
        </li>
        <li class="text-center">
          <p>{{address}}</p>
          <p><canvas id="canvas"></canvas></p>
        </li>
      </ul>
      <div class="step-next fixed">
        <mt-button type="primary" size="large" class="btn-copy" :data-clipboard-text="address">{{$t('message.walletDetail.copyAddress')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/api/data'
import ClipboardJS from 'clipboard'
import QRCode from 'qrcode'
import { Toast } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import Config from '@/api/config'

export default {
  name:'page-wallet-gather',
  data(){
    return {
      currency:'',
      name:'',
      publicKey:'',
      amount:'0',
      address:'None'
    }
  },
  created(){
    this.currency = this.$route.params.currency
    this.name = this.$route.params.name
    this.publicKey = this.$route.params.key
    //开发模式下btc币种获取测试网络地址
    if(this.currency==='BTC' && Config.env==='dev'){
      api.getBTCTestAddress(this.publicKey).then((res)=>{
        this.address = res.data.data
        this.setFAddr()
      })
    } else {
      this.address = this.$root.getAddress(this.currency, this.publicKey)
      this.setFAddr()
    }
  },
  mounted(){
    this.initQRCode()
    this.initCopy()
  },
  watch:{
    address(n,o){
      this.initQRCode()
    },
  },
  computed:{
    ...mapGetters(['getFactoryCode']),
  },
  methods:{
    setFAddr(){ //统计收款地址使用情况
      var FAddr = JSON.parse(localStorage.getItem('frequentlyAddr') || '{}'), fid = this.getFactoryCode
      if(!FAddr[fid]){
        FAddr[fid] = {}
      }
      if(!FAddr[fid][this.address]){
        FAddr[fid][this.address] = {count:1 , name:this.name, token:this.currency}
      } else {
        FAddr[fid][this.address].count += 1
      }
      localStorage.setItem('frequentlyAddr',JSON.stringify(FAddr))
    },
    initCopy(){
      //初始化复制按钮
      var self = this
      var clipboard = new ClipboardJS('.btn-copy')
      clipboard.on('success', function(e) {
        Toast(self.$t('message.walletDetail.copySuccess'))
        e.clearSelection();
      });

      clipboard.on('error', function(e) {
        Toast(self.$t('message.walletDetail.copyFailure'))
      });

    },
    initQRCode(){
      //初始化二维码
      QRCode.toCanvas(document.getElementById('canvas'), this.address, {
        color: {
          dark: '#000',  // Black dots
          light: '#0000' // Transparent background
        },
        width:Math.round(window.innerWidth*0.6)
      }, function (error) {
        if (error) console.error(error)
      })
    },
  },
  components:{
    
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #f9f9f9;
}
.text-center {
  text-align: center;
}
.pament-detail {
   border-top: 1px solid #e4e5e7;
  li {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    border-top: 1px solid #eaebec;
    border-bottom: 1px solid #fff;
    padding: 0.4rem 0 0.2rem;
    list-style: none;
    &:first-of-type {
      border-top: none;
    }
    h1 {
      font-size: 0.48rem;
      padding-bottom: 0.3rem;
      span {
        color: #999999;
        font-size: 0.24rem;
        padding-left: 0.15rem;
      }
    }
    h3 {
      position: relative;
      font-size: 0.32rem;
      padding-top: 0.2rem;
      span {
        position: absolute;
        right: 0;
        color: #FF3366;
        font-weight: bold;
      }
    }
    p {
      position: relative;
      line-height: 0.5rem;
      color: #999999;
      font-size: 0.24rem;
      &:last-of-type {
        color: #666666;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 0.24rem;
    color: #666;
    &:focus{
      
    }
  }
  input::placeholder {
    color: #CCC;
  }
 }

.step-next {
  margin-top: 0.3rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  background-color: #f9f9f9;
  padding-bottom: 0.3rem;
  &.fixed {
    position: fixed;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0rem;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }
}

</style>
