<template>
  <div class="page">
    <comp-wallet-top></comp-wallet-top>
    <transition enter-active-class="animated short fadeIn">
      <div class="search-container fixed" v-show="isSearchFixed">
        <input type="search" :class="{active:currencySearchText.length}" :placeholder="$t('message.wallet.currencySearch')" v-model="currencySearchTopText">
      </div>
    </transition>
    <div class="page-main" id="scroll" @click="setBlur($event)">
      <div>
        <div class="amount-container">
          <h2>{{$t('message.wallet.amount')}}</h2>
          <h1>45658<span> BTC </span><i></i></h1>
          <p>≈ ￥512,1464.22</p>
        </div>
        <div class="search-container" id="searchContainer">
          <input type="search" :class="{active:currencySearchText.length, hidden:isSearchFixed}"  :placeholder="$t('message.wallet.currencySearch')" v-model="currencySearchText">
        </div>
        <ul class="currency-list" v-tap="{methods:goWalletDetail}">
          <li data-type="btc">
            <div><img src="../assets/img/BTC-alt@3x.png"><strong>BTC</strong></div>
            <div><span>266</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="eth">
            <div><img src="../assets/img/ETH@3x.png"><strong>ETH</strong></div>
            <div><span>646</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="btc">
            <div><img src="../assets/img/BTC-alt@3x.png"><strong>BTC</strong></div>
            <div><span>266</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="eth">
            <div><img src="../assets/img/ETH@3x.png"><strong>ETH</strong></div>
            <div><span>646</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="btc">
            <div><img src="../assets/img/BTC-alt@3x.png"><strong>BTC</strong></div>
            <div><span>266</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="eth">
            <div><img src="../assets/img/ETH@3x.png"><strong>ETH</strong></div>
            <div><span>646</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="btc">
            <div><img src="../assets/img/BTC-alt@3x.png"><strong>BTC</strong></div>
            <div><span>266</span><br /><span>426,1234</span></div>
          </li>
          <li data-type="eth">
            <div><img src="../assets/img/ETH@3x.png"><strong>ETH</strong></div>
            <div><span>646</span><br /><span>426,1234</span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import compWalletTop from '@/components/top_wallet'


export default {
  name:'page-wallet',
  data(){
    return {
      currencySearchText:'',
      currencySearchTopText:'',
      currencyInitSearchPos:0,
      currencyCurrentSearchPos:0,
      scroll:false,
    }
  },
  mounted(){
    this.currencyInitSearchPos = $('#searchContainer').position().top + $('#searchContainer').height()
    console.log("坐标为："+this.currencyInitSearchPos);
    setTimeout(this.initScroll,1000)
  },
  watch:{
    currencySearchTopText(_new,_old){
      this.currencySearchText = _new
    }
  },
  computed:{
    isSearchFixed(){
      return Math.abs(this.currencyCurrentSearchPos)>this.currencyInitSearchPos ? true:false
    }
  },
  methods:{
    initScroll(){
      var self = this
      this.scroll = new IScroll('#scroll',{
        mouseWheel:true,
        click:true,
        probeType:2,
      });
      this.scroll.on('scroll',function(){
        self.currencyCurrentSearchPos = this.y
      })
      this.scroll.on('scrollEnd',function(){
        self.currencyCurrentSearchPos = this.y
      })
    },
    setBlur(e){
      if(e.target.tagName!='input'){
        $('.search-container input').blur()
      }
    },
    goWalletDetail(args){
      var _type = $(args.event.target).parents('li').data('type')
      this.$router.push({ name: 'page-wallet-detail', query:{type:_type}})
    },
  },
  components:{
    compWalletTop,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
}
.amount-container {
  height: 3rem;
  background-color: #4D7BF3;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  padding-left: 0.6rem;
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
    margin-top: 0.2rem;
    span {
      font-size: 0.4rem;
    }
    i {
      display: inline-block;
      height: 0.45rem;
      width: 0.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-image:url('../assets/img/buxianshijine@3x.png');
      margin-bottom: -0.08rem;
    }
  }
  h2 {
    font-size: 0.32rem;
  }
  p{
    margin-top: 0.1rem;
    font-size: 0.28rem;
  }
}

.search-container {
  padding: 0.2rem 0.3rem 0.15rem 0.3rem;
  background-color: #fff;
  input {
    width: 100%;
    text-align: center;
    font-size: 0.28rem;
    color: #333333;
    border: none;
    padding: 0.1rem 0.15rem;
    background: url('../assets/img/sousuo@3x.png') no-repeat center top;
    background-size: auto 0.5rem;
    &:focus {

    }
    &.active {
      background: transparent;
    }
    &.hidden {
      visibility: hidden;
    }
  }
  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
  }
}
.currency-list {
  background-color: #F9F9F9;
  li {
    border-top: 1px solid #eaebec;
    border-bottom: 1px solid #fff;
    padding: 0.48rem 0.55rem 0.3rem 0.7rem;
    list-style: none;
    display: flex;
    &:first-of-type {
      border-top-color: #e4e5e7;
    }
    > div {
      flex: 1;
      &:last-of-type {
        text-align: right;
      }
      img {
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.4rem;
        object-fit: contain;
        object-position: center;
        vertical-align: bottom;
      }
      strong {
        font-size: 0.36rem;
        color: #333;
        display: inline-block;
        padding-bottom: 0.12rem;
        font-weight: normal;
      }
      span:first-of-type {
        color: #333;
        font-size: 0.32rem;
      }
      span:last-of-type {
        color: #98999C;
        font-size: 0.24rem;
        &:before {
          content: '≈';
        }
        &:after {
          content: '￥';
        }
      }
    }
  }
 }
</style>
