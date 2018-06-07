<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      <ul class="pament-detail"  v-if="cointype=='btc'">
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
      <ul class="pament-detail"  v-else>
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
          <p>标签</p>
          <p>标签一,&nbsp;&nbsp;标签二</p>
        </li>
        <li>
          <p>矿工费<i class="collapse" :class="{active:!collapsed}" v-tap="{methods:collapse}"></i></p>
          <ul v-show="!collapsed">
            <li>
              <p><input type="number" placeholder="Gas price："><span>gwei</span></p>
            </li>
            <li>
              <p><input type="number" placeholder="Gas number："></p>
            </li>
            <li>
              <textarea placeholder="十六进制数据" res></textarea>
            </li>
          </ul>
        </li>
        <li>          
          <h3>合计<span>12.24568 BTC</span></h3>
        </li>
      </ul>
      <div class="step-next" :class="{fixed:collapsed}">
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
      cointype:'',
      collapsed:true
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
    scanning(args){

    },
    collapse(args){
      this.collapsed = !this.collapsed
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
      input{
        width: 100%;
        font-size: 0.24rem;
        background-color: transparent;
        border: none;
        color: #666666;
        &:focus {
          outline: none;
        }
      }
      input::placeholder {
        color: #CCC;
      }
      span {
        position: absolute;
        right: 0;
        color: #CCC;
      }
    }    
    &:last-of-type {
      border-bottom: none;
    }
    > ul > li {
      margin-left: 0;
      margin-right: 0;
    }
    textarea {
      width: 100%;
      font-size: 0.24rem;
      background-color: transparent;
      border: 1px solid #ccc;
      color: #666666;
      padding: 0.15rem 0.1rem;
      height: 1.5rem;
      resize:none;
      &:focus {
        outline: none;
      }
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
.collapse {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  background: url('../assets/img/zhankai@3x.png') no-repeat center;
  background-size: auto 100%;
  &.active {
    background-image: url('../assets/img/shouqi@3x.png')
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