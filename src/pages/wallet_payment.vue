<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      <ul class="pament-detail">
        <li>
          <h1>{{cointype | uppercase}}转账</h1>
          <p>收款人钱包地址</p>
          <p>1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5<i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p>转账金额</p>
          <p>12.04568</p>
        </li>
        <li>
          <p>矿工费</p>
          <p>12.04568</p>
        </li>
        <li>
          <h3>合计<span>12.24568 BTC</span></h3>
        </li>
      </ul>
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:routeTo, to:'page-wallet-payment-confirm',params:{type:cointype}}">下一步</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import data from '@/api/data'
import compTopBack from '@/components/common/top_back'
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);


export default {
  name:'page-wallet-payment',
  data(){
    return {
      cointype:''
    }
  },
  created(){
    
  },
  mounted(){
    this.cointype = this.$route.query.type
  },
  updated(){
    
  },
  methods:{
    scanning(args){

    },
    routeTo(args){
     this.$router.push({ name: args.to, query:args.params})
    }
  },
  components:{    
    compTopBack,
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
    &:last-of-type {
      border-bottom: none;
    }
  }
 }
.scanning {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  background: url('../assets/img/SAOYISAO_ICON@3x.png') no-repeat center;
  background-size: auto 100%;
}
.step-next {
  position: absolute;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0.3rem;
}
</style>