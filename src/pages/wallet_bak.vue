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
            <div><i :style="{'background-image':`url(${getIconUrls[item]})`}"></i><strong>{{item}}</strong></div>
            <div><span>{{displayAmount(item)}}</span><br /><span>≈ {{getCoinSign}}{{displayFabi(item)}}</span></div>
          </li>
        </ul>
        <div style="height: 100vh"></div>
      </div>
    </div>
    <div class="refresh" id="refresh" :style="{top:refresh_y+'px'}">
      <span><span :style="rotate(-180,true)"></span></span><span><span :style="rotate(-180)"></span></span>
      <i></i>
    </div>
    <guide-layer v-if="guide"></guide-layer>
  </div>
</template>
<script>
import guideLayer from '@/pages/guide'
import compWalletTop from '@/components/top_wallet'
import { mapGetters, mapActions } from 'vuex'
import numUtils from '@/assets/js/numberUtils'

export default {
  name:'page-wallet',
  data(){
    return {
      guide:false,
      searchText:'',
      searchTopText:'',
      initSearchPos:0,
      currentSearchPos:0,
      scroll:false,
      start_y:0,
      scroll_y:0,
      refresh_key:false,
      amountShow:true,
      currency:[],
      WFSetting:{},
      fontSize:0,
    }
  },
  created(){
    var isfirst = localStorage.getItem('firstWalletView')
    if(!isfirst){ //第一次使用本app转到引导页
      this.guide = true
    }
    this.getAmountShowSetting() //获取金额显示、隐藏设置
    this.WFSetting = JSON.parse(localStorage.getItem('walletFrozenSetting') || '{}') //获取钱包冻结设置

    /*this.setUsbkeyStatus(true)
    this.setHasLogin(true)
    this.setWalletList([{
      name:'',
      idx:0,
      publicKey:'0ba1ba3b8d8f7bd4a70828ec0e749dd26ee4cdd18d058c880afa121fad60e5b6f2ee1b72d9b9a57706e5de72acc1378f92269086c4964c073593bf92d28c647d',
      currency:{
        BTC:0.03529,
        ETH:15.234,
        BARK:107.346
      }
    },{
      name:'长期投资',
      idx:3,
      publicKey:'ba2416481d6260e621d8f2b6aad3e9c51d438c1876b624303a16f2bcf8a06cd695cef87230180ceed5735e7bf6cb3f9db360f6fee50824c85f230a6bb3ca9573',
      currency:{
        BTC:4.734857,
        ETH:105.321784,
        // BARK:2018.1314
      }
    }])*/
  },
  mounted(){
    let fontSize = $('html').css('font-size')
    this.fontSize = Number(fontSize.slice(0,fontSize.length-2))
    this.initSearchPos = $('#searchContainer').position().top + $('#searchContainer').height()
    setTimeout(this.initScroll,1000)
  },
  watch:{
    searchTopText(_new,_old){
      this.searchText = _new
    },
  },
  computed:{
    ...mapGetters(['getCurrency','getShowCurrency','getCoinSign','getSymbolExchange','getWalletList','getFactoryCode','getFiat','getIconUrls']),
    refresh_y(){
      if(this.start_y<0){
        return 0
      } else {
        return this.scroll_y < 1.5*this.fontSize?this.scroll_y:1.5*this.fontSize+ (this.scroll_y-1.5*this.fontSize)/3
      }
      
    },
    isSearchFixed(){
      return Math.abs(this.currentSearchPos)>this.initSearchPos ? true:false
    },
    wallet(){
      let temp_wallet = {}
      for(let walletItem of this.getWalletList){
        for(let item in walletItem.currency){
          if(this.getShowCurrency.includes(item) && !this.checkFrozen(item, walletItem.publicKey)){ //如果钱包的币种被冻结则不计入统计
            temp_wallet[item] = numUtils.add(temp_wallet[item], walletItem.currency[item]) 
          }
        }
      }
      return temp_wallet
    },
    total(){
      if (this.getSymbolExchange.length) {
        let totalBtc = 0, totalFabi = 0
        for(let item of Object.keys(this.wallet)){
          totalFabi = numUtils.add(totalFabi, numUtils.mul(this.getSymbolExchangePrice(item), this.wallet[item]))
        }
        totalBtc = numUtils.div(totalFabi,this.getSymbolExchangePrice('BTC')).toFixed(8)
        return {fabi:totalFabi.toFixed(2).toMoney(),btc:totalBtc}
      } else {
        return {fabi:'0.00',btc:'0.00000000'}
      }
    },
  },
  methods:{
    ...mapActions(['setWalletList','setUsbkeyStatus','setHasLogin']),
    rotate(deg, key){
      let dist = Math.round((this.scroll_y-this.start_y) /(1.5*this.fontSize)*270)
      if(key){
        if(Math.abs(dist)<180){
          dist = 0
        } else {
          dist = dist-180
          dist = Math.abs(dist)>90?90:dist
        }
      } else {
        dist = dist <= 90 ? 90 : dist
        dist = dist > 180 ? 180 : dist
      }
      deg += dist || 0
      return {
        '-webkit-transform':`rotate(${deg}deg)`,
        'transform':`rotate(${deg}deg)`,
      }
    },
    checkFrozen(token, publicKey){ //检查钱包币种是否被冻结 fid 硬件id号 publicKey 公钥 token 币种
      var fid = this.getFactoryCode
      return this.WFSetting[fid] && this.WFSetting[fid][publicKey] && this.WFSetting[fid][publicKey][token]
    },
    getSymbolExchangePrice(token){ //获取币种汇率价格
      var price = 0
      let match = this.getSymbolExchange.filter((item)=>{
        return item.symbol == token
      })
      if (match.length) {
        let exchange = match[0].exchangeItemList.filter((item)=>{
          return item.currency == this.getFiat
        })
        if (exchange.length) {
          price = exchange[0].price
        }
      }
      return price
    },
    displayFabi(_type){
      return numUtils.mul(this.getSymbolExchangePrice(_type), this.wallet[_type]).toFixed(2).toMoney()
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
      //初始化滚动条以及下拉加载
      var self = this
      this.scroll = new IScroll('#scroll',{
        // mouseWheel:true,
        click:true,
        probeType:2,
      });
      this.scroll.on('scrollStart',function(){
        if(!self.refresh_key){
          self.start_y = this.y
        }
      })
      this.scroll.on('scroll',function(){
        self.currentSearchPos = this.y
        if(!self.refresh_key && this.y-self.start_y>0){
          self.scroll_y = this.y*1.5
        }
      })
      this.scroll.on('scrollEnd',function(){
        self.currentSearchPos = this.y
      })
      $('#scroll').on('touchend',()=>{
        if(!self.refresh_key && self.scroll_y-self.start_y>=1.5*self.fontSize){
          self.refresh_key = true
          $('#refresh').addClass('transition')
          self.scroll_y = 1.5*self.fontSize
          $('#refresh').one("webkitTransitionEnd", function(e){
            $(this).addClass('rotate')
            window.getSymbolExchange(true).then(()=>{
              $('#refresh').one("webkitTransitionEnd", function(e){
                $(this).removeClass('transition')
                self.refresh_key=false
                $(this).removeClass('rotate')
              })
              setTimeout(()=>{
                self.scroll_y = 0
              },1000)
            })
            window.getWalletList()
          })
        } else if(!self.refresh_key && self.scroll_y-self.start_y>=0) {
          $('#refresh').one("webkitTransitionEnd", function(e){
            $(this).removeClass('transition')
          })
          $('#refresh').addClass('transition')
          self.scroll_y = 0
        }
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
    guideLayer
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
    font-size: 0.55rem;
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
    margin-top: 0.1rem;
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
 .refresh {
  position: fixed;
  width: 42px;
  height: 42px;
  left: 50%;
  top: 0;
  margin-left: -21px;
  margin-top: -45px;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 6px #b2b2b2;
  z-index: 99999999;
  &.transition {
    transition: top ease-in 300ms;
  }
  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 28px;
    width: 14px;
    transform: translateY(-50%) translateX(-100%);
    overflow: hidden;
    &:last-of-type {
      transform: translateY(-50%) translateX(0%);
      span {
        right: 0;
        transform: rotate(-90deg);
        clip:rect(0,auto,auto,14px);
      }
    }
    span {
      position: absolute;
      width: 28px;
      height: 28px;
      background-color: #4d7bf3;
      border-radius: 50%;
      transform: rotate(-180deg);
      clip:rect(0,14px,auto,auto);
    }
  }
  > i {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
 }
.rotate {
  animation: rotate linear 800ms infinite;
}
@-webkit-keyframes rotate{
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
@keyframes rotate{
  0% {transform: rotate(0deg)}
  100% {transform: rotate(360deg);}
}
</style>
