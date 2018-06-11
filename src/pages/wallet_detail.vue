<template>
  <div class="page">
    <comp-top-back>
      <span class="selected-title" v-tap="{methods:showWalletList}">{{cointype | uppercase}}01</span>
    </comp-top-back>
    <div class="page-main">
      <div class="amount-container">
        <h1>45658<span> {{cointype | uppercase}} </span></h1>
        <p>≈ ￥512,1464.22</p>
        <ul class="actions">
          <li v-tap="{methods:$root.routeTo, to:'page-wallet-payment',params:{type:cointype}}"><i></i>转账</li>
          <li><span class="line"></span></li>
          <li v-tap="{methods:$root.routeTo, to:'page-wallet-gather',params:{type:cointype}}"><i></i>收款</li>
        </ul>
      </div>
      <div class="trans-records-title">最新交易记录</div>
      <div class="trans-records-scroll" id="scroll">
        <ul class="trans-records-list">
          <li class="in">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="out">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="error">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>打包失败</span></div>
          </li>
          <li class="in">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="out">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="error">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>打包失败</span></div>
          </li>
          <li class="in">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="out">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>0.4567BTC</span></div>
          </li>
          <li class="error">
            <div><i></i></div>
            <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
            <div><span>打包失败</span></div>
          </li>
        </ul>
      </div>
    </div>
    <mask-layer :isgray="true" :show="show" @hide="hideFunction" :style="{top: '0.9rem'}">
      <ul class="wallet-list" v-tap="{methods:changeWallet}">
        <li>{{cointype | uppercase}}02</li>
        <li>{{cointype | uppercase}}03</li>
        <li>{{cointype | uppercase}}04</li>
      </ul>
    </mask-layer>
  </div>
</template>

<script>

import data from '@/api/data'

import maskLayer from '@/components/common/mask'

export default {
  name:'page-wallet-detail',
  data(){
    return {
      scroll:false,
      cointype:'',
      show:false,
    }
  },
  created(){
    
  },
  mounted(){
    setTimeout(this.initScroll,700)
    this.cointype = this.$route.query.type || 'btc'
    
  },
  updated(){
    
  },
  methods:{
    initScroll(){
      var self = this
      this.scroll = new IScroll('#scroll',{
        mouseWheel:true,
        tap:true
      });
    },
    showWalletList(args){
      this.show = true
    },
    hideFunction(){
      this.show = false
    },
    changeWallet(args){
      this.show = false
    }
  },
  components:{    
    
    maskLayer,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
}
.selected-title {
  font-size: 0.36rem;
  &:after{
    content: '';
    display: inline-block;
    border-top: 0.15rem  solid #333;
    border-left: 0.13rem solid transparent;
    border-right: 0.13rem solid transparent;
    margin-left: 0.12rem;
    padding-bottom: 0.05rem;
  }
}
.amount-container {
  height: 3rem;
  background-color: #4D7BF3;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  padding-top: 0.5rem;
  border-radius: 0.3em;
  position: relative;
  color: #fff;
  letter-spacing: 1px;
  overflow: hidden;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #d4dbef;
  &:before {
    content: '';
    position: absolute;
    background-color: rgba(255,255,255,.2);
    width: 4rem;
    height: 4rem;
    top: -2rem;
    right: -2.5rem;
    transform: rotate(45deg);
  }
  &:after {
    content: '';
    position: absolute;
    background-color: rgba(255,255,255,.2);
    width: 5rem;
    height: 5rem;
    top: 1rem;
    right: -2.5rem;
    transform: rotate(45deg);
  }
  h1 {
    font-size: 0.6rem;
    text-align: center;
    span {
      font-size: 0.4rem;
    }
  }
  h2 {
    font-size: 0.32rem;
  }
  p{
    margin-top: 0.05rem;
    font-size: 0.28rem;
    text-align: center;
  }
  .actions {
    position: relative;
    z-index: 1;
    display: flex;
    margin-top: 0.3rem;
    width: 100%;
    font-size: 0.32rem;
    font-weight: bold;
    li {
      list-style: none;
      flex: 5;
      text-align: center;
      line-height: 0.8rem;
      &:nth-of-type(2){
        flex: 1;
      }
      .line {
        display: inline-block;
        border-left: 1px solid #fff;
        height: 0.8rem;
      }
      i {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        background: url('../assets/img/fukuan_icon@3x.png') no-repeat center;
        background-size: contain;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
      &:last-of-type i{
          background-image: url('../assets/img/shoukuan@3x.png');
        }
    }
  }
}

.trans-records-scroll {
  height:-webkit-calc(~"100vh - 4.92rem");
  height: calc(~"100vh - 4.92rem");
  background-color: #F9F9F9;
  overflow: hidden;
}

.trans-records-title {
  background-color: #F9F9F9;
  margin-top: 0.28rem;
  padding: 0.25rem 0.3rem;
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: #333;
}
.trans-records-list {
  li {
    border-top: 1px solid #eaebec;
    border-bottom: 1px solid #fff;
    padding: 0.3rem;
    list-style: none;
    display: flex;
    &:first-of-type {
      border-top: none;
    }
    > div:nth-of-type(1) {
      width: 0.7rem;
    }
    > div:nth-of-type(2) {
      flex: auto;
      color: #333;
      span {
        color: #98999C;
      }
    }
    > div:nth-of-type(3) {
      width: 1.80rem;
      span {
        font-size: 0.28rem;
        color: #00CC33;
        &:before {
          content: '+ ';
        }
      }
    }
    i {
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      background: url('../assets/img/shouru_icon@3x.png') no-repeat center;
      background-size: contain;
    }
    &.out i {
      background-image: url('../assets/img/zhichu_icon@3x.png');
    }
    &.error i {
      background-image: url('../assets/img/shibai_icon@3x.png');
    }
    &.out > div:nth-of-type(3) span {
      color: #FF3366;
      &:before {
        content: '- ';
      }
    }
    &.error > div:nth-of-type(3) span {
      color: #FF3366;
      &:before {
        content: '';
      }
    }
  }
 }

.wallet-list {
  width: 50%;
  margin:auto;
  li {
    line-height: 0.9rem;
    background-color: #fff;
    font-size: 0.32rem;
    text-align: center;
    border-bottom: 1px solid #CCC;
    &:hover {
      background-color: #E5E5E5;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>