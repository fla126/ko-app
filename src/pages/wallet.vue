<template>
  <div class="page">
    <comp-wallet-top></comp-wallet-top>
    <transition enter-active-class="animated short fadeIn">
      <div class="search-container fixed" v-show="isSearchFixed">
        <input type="search" :class="{active:searchText.length}" :placeholder="$t('message.wallet.currencySearch')" v-model="searchTopText" @keydown="hideKeyboard($event)">
        <i class="close" v-tap="{methods:delSearch}" v-show="searchText.length>0">+</i>
      </div>
    </transition>
    <div class="page-main" id="scroll" @click="setBlur($event)">
      <div>
        <div class="bg-white">
          <div class="amount-container">
            <h2>{{$t('message.wallet.amount')}}</h2>
            <h1><template v-if="amountShow">{{total.btc}}</template><template v-else>****</template><span> BTC </span><i :class="{hide:!amountShow}" v-tap="{methods:setAmountShow}"></i></h1>
            <p>≈ {{getCoinSign}}<template v-if="amountShow">{{total.fabi}}</template><template v-else>****</template></p>
          </div>
        </div>
        <div class="search-container" id="searchContainer">
          <input type="search" :class="{active:searchText.length, hidden:isSearchFixed}"  :placeholder="$t('message.wallet.currencySearch')" v-model="searchText" @keydown="hideKeyboard($event)">
          <i class="close" v-tap="{methods:delSearch}" v-show="searchText.length>0">+</i>
        </div>
        <ul class="currency-list">
          <li :data-type="item" v-tap="{methods:goWalletDetail,t:item}" v-for="item in filterCurrency(getShowCurrency)">
            <div><i :class="item"></i><strong>{{item}}</strong></div>
            <div><span>{{displayAmount(item)}}</span><br /><span>≈ {{getCoinSign}}{{displayFabi(item)}}</span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import compWalletTop from '@/components/top_wallet'
import { mapGetters, mapActions } from 'vuex'
import numUtils from '@/assets/js/numberUtils'
var isfirst = localStorage.getItem('firstWalletView')

export default {
  name:'page-wallet',
  data(){
    return {
      searchText:'',
      searchTopText:'',
      initSearchPos:0,
      currentSearchPos:0,
      scroll:false,
      amountShow:true,
      currency:[],
    }
  },
  created(){
    if(!isfirst){ //第一次使用本app转到引导页
      this.$router.replace({name:'guide'})
    }
    this.getAmountShowSetting()
  },
  mounted(){
    this.initSearchPos = $('#searchContainer').position().top + $('#searchContainer').height()
    setTimeout(this.initScroll,1000)
  },
  watch:{
    searchTopText(_new,_old){
      this.searchText = _new
    },
  },
  computed:{
    ...mapGetters(['getCurrency','getShowCurrency','getCoinSign','getUSDCNY','getBtcValues','getWalletList']),
    isSearchFixed(){
      return Math.abs(this.currentSearchPos)>this.initSearchPos ? true:false
    },
    wallet(){
      let temp_wallet = {}
      for(let walletItem of this.getWalletList){
        for(let item in walletItem.currency){
          temp_wallet[item] = numUtils.add(temp_wallet[item], walletItem.currency[item]) 
        }
      }
      return temp_wallet
    },
    total(){
      if (this.getUSDCNY && this.getBtcValues.ETH) {
        let totalBtc = 0, totalFabi = 0
        for(let item of Object.keys(this.wallet)){
          let curMarketBtc = this.getBtcValues[item]
          let curMarketPrice = curMarketBtc ? numUtils.mul(curMarketBtc, this.getUSDCNY).toFixed(2) : this.getUSDCNY
          totalFabi = numUtils.add(totalFabi, numUtils.mul(curMarketPrice, this.wallet[item]))
        }
        totalBtc = numUtils.div(totalFabi,this.getUSDCNY).toFixed(8)
        return {fabi:totalFabi.toFixed(2).toMoney(),btc:totalBtc}
      } else {
        return {fabi:'0.00',btc:'0.00000000'}
      }
    },
  },
  methods:{
    displayFabi(_type){
      if (this.getUSDCNY && this.getBtcValues.ETH) {
        let curMarketBtc = this.getBtcValues[_type]
        let curMarketPrice = curMarketBtc ? numUtils.mul(curMarketBtc, this.getUSDCNY).toFixed(2) : this.getUSDCNY
        return numUtils.mul(curMarketPrice, this.wallet[_type]).toFixed(2).toMoney()
      } else {
        return '0.00'
      }
    },
    displayAmount(_type){
      return this.wallet[_type]?this.wallet[_type].toFixed(8):0
    },
    filterCurrency(currency){
      var str = $.trim(this.searchText).toUpperCase()
      return currency.filter((item)=>{
        return item.indexOf(str)>-1
      })
    },
    getAmountShowSetting(){
      //获取金额显示、隐藏设置
      var _amountShow = localStorage.getItem('amount_show') || 'true'
      this.amountShow = _amountShow == 'true' ? true : false
    },
    setAmountShow(){
      //设置金额显示、隐藏
      this.amountShow = !this.amountShow
      localStorage.setItem('amount_show',this.amountShow)
    },
    initScroll(){
      //初始化滚动条
      var self = this
      this.scroll = new IScroll('#scroll',{
        mouseWheel:true,
        click:true,
        probeType:2,
      });
      this.scroll.on('scroll',function(){
        self.currentSearchPos = this.y
      })
      this.scroll.on('scrollEnd',function(){
        self.currentSearchPos = this.y
      })
    },
    setBlur(e){
      if(e.target.tagName!='input'){
        $('.search-container input').blur()
      }
    },
    delSearch(){
      this.searchText = ''
    },
    goWalletDetail(args){
      $(args.event.currentTarget).addClass('active')
      setTimeout(()=>{
        this.$router.push({ name: 'page-wallet-detail', params:{currency:args.t}})
      },200)
    },
    hideKeyboard(event){
      if(event.keyCode == 13){
        $('.search-container input').blur()
      }
    }
  },
  components:{
    compWalletTop,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #F9F9F9;
}
.bg-white {background-color: #fff;}
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
    position: relative;
    z-index: 1;
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
      &.hide {
        background-image:url('../assets/img/xianshijine@3x.png');
      }
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
  position: relative;
  input {
    width: 100%;
    text-align: center;
    font-size: 0.28rem;
    color: #333333;
    border: none;
    padding: 0.1rem 0.15rem;
    background: url('../assets/img/sousuo@3x.png') no-repeat center top;
    background-size: auto 0.5rem;
    &::-webkit-search-cancel-button {
    display: none;
    }
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
  i {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    top: 0.25rem;
    right: 0.3rem;
    color: #4D7BF3;
    font-size: 0.36rem;
    font-style: normal;
    border-radius: 50%;
    text-align: center;
    line-height: 0.45rem;
    z-index: 1;
    transform: rotate(45deg);
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
    &:last-of-type {
      border-bottom: none;
    }
    &.active {
      background-color: #f1f1f1;
    }
    > div {
      flex: 1;
      &:last-of-type {
        text-align: right;
      }
      i {
        display: inline-block;
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.4rem;
        background-repeat: none;
        background-position: center;
        background-size: contain;
        vertical-align: bottom;
        &.BTC {
          background-image: url('../assets/img/BTC-alt@3x.png');
        }
        &.ETH {
          background-image: url('../assets/img/ETH@3x.png');
        }
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
      }
    }
  }
 }
</style>
