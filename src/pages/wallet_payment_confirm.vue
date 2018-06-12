<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      
      <ul class="pament-detail">
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.review')}} {{cointype | uppercase}}</h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{cointype | uppercase}}{{$t('message.walletDetail.review')}}</h1>
          <p>{{$t('message.walletDetail.receiverAddress')}}</p>
          <p>1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5</p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.senderAddress')}}</p>
          <p>1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5</p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.miningFee')}}</p>
          <p>12.04568</p>
        </li>
        <li>
          <div>{{$t('message.walletDetail.amount')}}<span>0.002456 BTC</span></div>
          <div>{{$t('message.walletDetail.miningFee')}}<span>0.002456 BTC</span></div>
          <h3>{{$t('message.walletDetail.total')}}<span>12.24568 BTC</span></h3>
        </li>
      </ul>      
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:pwconfirm}">{{$t('message.walletDetail.ok')}}</mt-button>
      </div>
    </div>
    <password-confirm :show="showPWCLayer" :hideFunction="hidePWCLayer"></password-confirm>
  </div>
</template>

<script>
import Vue from 'vue'
import data from '@/api/data'

import { Button } from 'mint-ui';
import passwordConfirm from '@/components/common/password_confirm';

Vue.component(Button.name, Button);


export default {
  name:'page-wallet-payment-confirm',
  data(){
    return {
      showPWCLayer:false,
      cointype:''
    }
  },
  created(){
    
  },
  mounted(){
    this.cointype = this.$route.query.type || 'btc'
  },
  updated(){
    
  },
  methods:{
    pwconfirm(){
      this.showPWCLayer = true
    },
    hidePWCLayer(){
      this.showPWCLayer = false
    }
  },
  components:{    
    
    passwordConfirm,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #f9f9f9;
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
    div {
      color: #999999;
      position: relative;
      line-height: 0.4rem;
      span {
        position: absolute;
        right: 0;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
 }

.step-next {
  position: fixed;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0rem;
  padding-bottom: 0.3rem;
  background-color: #f9f9f9;
}
</style>