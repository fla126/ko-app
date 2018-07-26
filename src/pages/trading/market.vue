<template>
  <div class="page">
    <comp-top-back>
      <span class="selected-title" v-tap="{methods:toggleMarketList}">{{symbol_display}}</span>
      <router-link class="kline-btn" :to="{name:'page-kline', params:{market:business.market}}" tag="i"></router-link>
    </comp-top-back>
    <div class="page-main ">
      <section class="exchange-container clearfix">
        <div class="left">
          <div class="acBtns">
            <button type="button" class="buy" :class="{active:isBuy}" v-tap="{methods:setStatus, status:true}">{{$t('message.trade.buy')}}</button><button type="button" class="sell" :class="{active:!isBuy}" v-tap="{methods:setStatus, status:false}">{{$t('message.trade.sell')}}</button>
          </div>
          <div class="trust-type-choice">
            <span v-tap="{methods:toggleChoice}">{{$t('message.trade.Marketprice')}}</span>
            <transition enter-active-class="animated short fadeIn" leave-active-class="animated short fadeOut">
              <ul class="choices" v-show="isTrustChioce">
                <li v-tap="{methods:toggleChoice, type:'limit'}">{{$t('message.trade.limitorder')}}</li><!--限价委托-->
                <li v-tap="{methods:toggleChoice, type:'market'}">{{$t('message.trade.Marketprice')}}</li><!--市价委托-->
              </ul>
            </transition>
          </div>
          <cp-adjust :val="business.price" @callback="priceAdjust" v-show="business.trustType=='limit'"></cp-adjust>
          <p class="price-placeholder" v-show="business.trustType=='market'">{{$t('message.trade.market')}}</p><!--市价-->

          <p class="fabi">301.90</p>
          <cp-adjust style="margin-top: 0.6rem;" :val="business.originAmount" @callback="amountAdjust"></cp-adjust>
          <p class="btc-tip">{{$t('message.trade.available')}}BTC:  0.01234567 </p><!--可用-->
          <div class="range-percent">
            <p>{{business.rangeValue.toString()+'%'}}</p>
            <mt-range
              v-model="business.rangeValue"
              :bar-height="2">
              <div slot="start" class="dots d1" :class="{d2:business.rangeValue>=25,d3:business.rangeValue>=50,d4:business.rangeValue>=75,d5:business.rangeValue>=100,}"><span @click="business.rangeValue=0"></span><span @click="business.rangeValue=25"></span><span @click="business.rangeValue=50"></span><span @click="business.rangeValue=75"></span><span @click="business.rangeValue=100"></span></div>
            </mt-range>
          </div>
          <div class="ac-area">
            <div class="total-input" v-tap="{methods:setTargetAmountInput}" v-show="isBuy">
              <span>{{$t('message.trade.amount')}}</span><!--金额-->
              <div>
                <input type="number" v-model="business.targetAmount" v-focus v-if="isTargetAmountInput">
                <span v-show="!isTargetAmountInput">{{business.targetAmount}} ETH</span>
              </div>
            </div>
            <p class="fabi" style="margin-top: 0.3rem;" v-show="isBuy">301.90</p>
            <button type="button" class="buyBtn" v-show="isBuy" v-tap="{methods:buy}">{{$t('message.trade.buy')}}ETH</button>
            <button type="button" class="sellBtn" v-show="!isBuy" v-tap="{methods:sell}">{{$t('message.trade.sell')}}ETH</button>
          </div>
        </div>
        <div class="right">
          <transition enter-active-class="animated short slideInDown" leave-active-class="animated short slideOutUp">
            <div class="order-book" v-show="!showLatestDeal">
              <div><span>{{$t('message.trade.price')}}(BTC)</span><span>{{$t('message.trade.aumont')}}(ETH)</span></div>
              <div>
                <ul class="sell-list" id="sellList">
                  <li v-for="item in business.depthData.asks" :style="{'background-size':`${item.percent}% 100%`}"><span>{{$root.toFixed(item.price,8)}}</span><span>{{$root.toFixed(item.avaliableAmount,2)}}</span> </li>
                </ul>
              </div>
              <div><p :class="{sell:(getLast24h.direction!=1)}">{{getLast24h.close}}<span>{{curPrice}} {{getCoinSign}}</span></p></div>
              <div>
                <ul class="buy-list">
                  <li v-for="item in business.depthData.bids" :style="{'background-size':`${item.percent}% 100%`}"><span>{{$root.toFixed(item.price,8)}}</span><span>{{$root.toFixed(item.avaliableAmount,2)}}</span> </li>
                </ul>
              </div>
              <div @click="showLatestDeal=!showLatestDeal"><p>{{$t('message.trade.lasttrade')}}<!--最新成交--></p></div>
            </div>
          </transition>
          <transition enter-active-class="animated short slideInUp" leave-active-class="animated short slideOutDown">
            <div class="latest-deal" v-show="showLatestDeal">
              <div @click="showLatestDeal=!showLatestDeal"><p>{{$t('message.trade.lasttrade')}}<!--最新成交--></p></div>
              <div><span>{{$t('message.trade.Sernumber')}}<!--编号--></span><span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span><span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span></div>
              <div>
                <ul class="deal-list">
                  <li v-for="(item, index) in business.lastestTrades" :class="{buy:item.direction==1}"><span>{{index+1}}</span><span>{{$root.toFixed(item.price,8)}}</span><span>{{$root.toFixed(item.amount,3)}}</span></li>
                </ul>
              </div>
              <div></div>
            </div>
          </transition>
        </div>
      </section>
      <section class="entrust-container">
        <mt-navbar v-model="trustTabActive">
          <mt-tab-item id="currentTrust"><!--当前委托-->{{$t('message.trade.curentrust')}}</mt-tab-item>
          <mt-tab-item id="historyTrust"><!--历史委托-->{{$t('message.trade.hisentrust')}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="trustTabActive" :swipeable="true">
          <mt-tab-container-item id="currentTrust">
            <div class="setting">
              <div><cp-switch :val="business.hideOtherTrust" @callback="updateHideOtherSwitch">{{$t('message.trade.othertrading')}}<!--隐藏其他交易对--></cp-switch></div>
              <div class="f24">{{$t('message.trade.allcancel')}}<!--全部撤销--></div>
            </div>
            <ul class="trust-list">
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}<!--撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="sell">{{$t('message.trade.sell')}}<!--卖出--></span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}<!--撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}</span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}<!--撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}<!--撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.cancel')}}<!--撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.price')}}<!--价格-->(BTC)</span>
                    <span>{{$t('message.trade.aumont')}}<!--数量-->(ETH)</span>
                    <span>{{$t('message.trade.actualdeal')}}<!--实际成交-->(ETH)</span>
                  </div>
                  <div class="data-info">
                    <span>0.06789500 </span>
                    <span>18.67000321</span>
                    <span>17.67000321</span>
                  </div>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="historyTrust">
            <div class="setting">
              <div><cp-switch :val="business.hideOtherHistoryTrust" @callback="updateHideOtherHistorySwitch">{{$t('message.trade.othertrading')}}<!--隐藏其他交易对--></cp-switch></div>
              <div><label class="hide-canceled"><input type="checkbox" /> <i></i>{{$t('message.trade.tradingcancel')}}<!--隐藏已撤销--></label></div>
            </div>
            <ul class="trust-list">
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="title">
                  <span class="buy">{{$t('message.trade.buy')}}</span>
                  <span class="market">BTC/ETH</span>
                  <span class="time">13:14 5/20</span>
                  <span class="cancel">{{$t('message.trade.trading')}}<!--已撤销--></span>
                </div>
                <div class="data">
                  <div class="data-title">
                    <span>{{$t('message.trade.avgparice')}}<!--成交均价-->(BTC) </span>
                    <span>{{$t('message.trade.volume')}}<!--成交量-->(ETH)</span>
                    <span>{{$t('message.trade.transactionAmount')}}<!--成交金额-->(BTC)</span>
                  </div>
                  <div class="data-info">
                    <span>0.50744700</span>
                    <span>70.67004510<em>(90.0%)</em></span>
                    <span>708.67</span>
                  </div>
                </div>
              </li>
            </ul>
          </mt-tab-container-item>
        </mt-tab-container>

      </section>
    </div>
    <cp-mask :show="showMarkets" @hide="hideMarketList" :style="{'top': '0.8rem','background-color':'rgba(232, 232, 232, 0.8)'}">
      <ul class="wallet-list">
        <li v-for="market in getMarketList" v-tap="{methods:changeMarket, market:market, }">{{market.currencySymbol}}/{{market.baseSymbol}}</li>
      </ul>
    </cp-mask>
    <cp-loading :show="loading"></cp-loading>
  </div>
</template>

<script>
  import Vue from 'vue'
  import cpAdjust from '@/components/adjust'
  import cpSwitch from '@/components/switch'
  import cpMask from '@/components/common/mask' //遮罩组件
  import cpLoading from '@/components/common/loading' //加载组件
  import DataWebSocket from '@/assets/js/websocket'
  import Data from '@/api/data'
  import { mapGetters, mapActions } from 'vuex'
  import numUtils from '@/assets/js/numberUtils'
  import {
    Button,
    Range,
    Navbar,
    TabItem,
    TabContainer,
    TabContainerItem,
  } from 'mint-ui' //导入公共组件集合

  Vue.component(Button.name, Button)
  Vue.component(Range.name, Range)
  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)

  export default {
    name:'page-market',
    components:{
      cpAdjust,
      cpSwitch,
      cpMask,
      cpLoading
    },
    data(){
      return {
        loading:false,
        showMarkets:false,
        showLatestDeal:false,
        isBuy:true,
        isTrustChioce:false,
        isTargetAmountInput:false,
        trustTabActive:'currentTrust',
        dataSocket:null,
        business:{
          market:'',
          trustType:'limit',
          price:0.00033290,
          originAmount:37.79,
          targetAmount:0.01234567,
          rangeValue:0,
          hideOtherTrust:false,
          hideOtherHistoryTrust:false,
          depthData:{},
          lastestTrades:[]
        }
      }
    },
    created(){
      this.business.market = this.$route.params.market || this.getInitMarket
      this.isBuy = this.$route.params.action
      this.InitDataSoket()
    },
    mounted(){

    },
    updated(){

    },
    watch:{
      '$route.params.market'(){ //切换市场后重新初始化websoket
        this.business.market = this.$route.params.market
        // this.klineSocket.close()
        // this.loading = true
        // this.isFirstKline = true
        // this.InitKlineWebSoket()
      },
      'business.depthData'(){
        setTimeout(()=>{
          if($('#sellList').scrollTop()==0){
            $('#sellList').scrollTop(99999).addClass('active')
          }
        },100)

      }
    },
    computed:{
      ...mapGetters(['getApiToken', 'getLast24h', 'getIconsConfig', 'getCoinSign', 'getUSDCNY', 'getBtcValues','getInitMarket','getMarketList']),
      baseSymbol () {
        return this.business.market.split('_')[1]
      },
      currentSymbol () {
        return this.business.market.split('_')[0]
      },
      symbol () {
        return this.business.market.split('_').join('')
      },
      symbol_display () {
        return this.business.market.replace('_','/')
      },
      curPrice () {
        if (this.getUSDCNY && this.getLast24h.close) {
          let curMarketBtc = this.getBtcValues[this.baseSymbol]
          let curMarketPrice = curMarketBtc ? numUtils.mul(curMarketBtc, this.getUSDCNY).toFixed(2) : this.getUSDCNY
          return numUtils.mul(curMarketPrice, this.getLast24h.close).toFixed(2).toMoney()
        } else {
          return '0.00'
        }
      }
    },
    methods:{
      ...mapActions(['setLast24h', 'tiggerEvents','setMarketList']),
      toggleMarketList(args){
        this.showMarkets = !this.showMarkets
      },
      hideMarketList(){
        this.showMarkets = false
      },
      changeMarket(args){
        this.showMarkets = false
        this.$router.replace({name:'market',params:{market:`${args.market.currencySymbol}_${args.market.baseSymbol}`}})
      },
      setStatus(args){
        this.isBuy = args.status
      },
      toggleChoice(args){
        var _tar = args.event.currentTarget
        if(_tar.tagName.toLowerCase() == 'li'){
          this.business.trustType = args.type ? args.type : this.business.trustType
          _tar.className = 'active'
        } else {
          $('.choices li').removeClass('active')
        }
        this.isTrustChioce = !this.isTrustChioce
      },
      priceAdjust(price){
        this.price = price
      },
      amountAdjust(amount){
        this.amount = amount
      },
      setTargetAmountInput(){
        this.isTargetAmountInput = true
        $('.total-input').on('blur','input',()=>{
          this.isTargetAmountInput = false
        })
      },
      buy(args){
        var $_tar = $(args.event.currentTarget)

      },
      sell(args){
        var $_tar = $(args.event.currentTarget)

      },
      updateHideOtherSwitch(result){
        this.business.hideOtherTrust = result
      },
      updateHideOtherHistorySwitch(result){
        this.business.hideOtherHistoryTrust = result
      },
      processDepthData(data){ //处理深度数据
        var depthData = data, placeHolder = {avaliableAmount:'--',price:'--',percent:0}, asksAmountArray = [], bidsAmountArray = [], asksMax, bidsMax;
        depthData.asks.forEach((item)=>{
          asksAmountArray.push(Number(item.avaliableAmount))
        })
        depthData.bids.forEach((item)=>{
          bidsAmountArray.push(Number(item.avaliableAmount))
        })
        asksMax = Math.max(...asksAmountArray)
        bidsMax = Math.max(...bidsAmountArray)
        for(let i in depthData.asks){
          depthData.asks[i].percent = Math.round(asksAmountArray[i]/asksMax*100)
        }
        for(let i in depthData.bids){
          depthData.bids[i].percent = Math.round(bidsAmountArray[i]/bidsMax*100)
        }
        if(depthData.asks.length<10){
          var _len = 10 - depthData.asks.length, _arrayPlaceHolder = new Array(_len)
          for(let i=0; i< _arrayPlaceHolder.length; i++){
            _arrayPlaceHolder[i] = placeHolder
          }
          depthData.asks = depthData.asks.concat(_arrayPlaceHolder)
        }
        depthData.asks.reverse()
        if(depthData.bids.length<10){
          var _len = 10 - depthData.bids.length, _arrayPlaceHolder = new Array(_len)
          for(let i=0; i< _arrayPlaceHolder.length; i++){
            _arrayPlaceHolder[i] = placeHolder
          }
          depthData.bids = depthData.bids.concat(_arrayPlaceHolder)
        }
        this.business.depthData = depthData
      },
      InitDataSoket(){ //初始化数据websoket
        this.dataSocket = DataWebSocket({
          symbol: this.symbol,
          period:'1m',
          subscribe:['depth','market','last_price','new_transaction','user_new_orderbook','user_history_orderbook'],
          callback: (res) => {
            if (res.dataType === 'LastOrderBook') {
              // 深度数据
              this.processDepthData(res.data)
            } else if (res.dataType === 'LastPrice') {
              // 24小时最新信息
              this.setLast24h(res.data)
            } else if (res.dataType === 'LastAccounts') {
              // 用户账户余额

            } else if (res.dataType === 'LastUserOrderBook') {

              // 当前委托
            } else if (res.dataType === 'LastHistoryBook') {
              // 历史委托
            } else if (res.dataType === 'LastTrades') {
              // 最新交易记录
              this.business.lastestTrades = res.data
            } else if (res.dataType === 'markets') {
              // 市场信息
              this.setMarketList(res.data)
            }
          }
        })
      },
    },
    beforeDestroy () {
      this.dataSocket && this.dataSocket.close()
    }

  }

</script>
<style lang="less" scoped>
  .page-main{
    background-color:#f9f9f9;
  }
  .kline-btn {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    right: 0.3rem;
    background: url('../../assets/img/kline-icon.png') no-repeat center;
    background-size: contain;
  }
  .selected-title {
    font-size: 0.36rem;
    &:after{
      content: '';
      display: inline-block;
      border-top: 0.15rem  solid #cbd4ec;
      border-left: 0.13rem solid transparent;
      border-right: 0.13rem solid transparent;
      margin-left: 0.12rem;
      padding-bottom: 0.05rem;
    }
  }
  .wallet-list {
    width: 50%;
    margin:auto;
    li {
      line-height: 0.9rem;
      background-color: #f6f6f6;
      font-size: 0.32rem;
      text-align: center;
      border-bottom: .01rem solid #d4d4d4;
      &:hover {
        background-color: #1d2032;
      }
      &:last-of-type {
        border-bottom: none;
      }
    }
  }
  .exchange-container, .entrust-container {
    height:-webkit-calc(~"100vh - 0.8rem");
    height: calc(~"100vh - 0.8rem");
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    position: relative;
  }
  .exchange-container {
    padding-top: 0.3rem;
    .left {
      float: left;
      width: 48%;
      height: 100%;
      position: relative;
      .acBtns {
        button {
          width: 50%;
          height: 0.75rem;
          font-size: 0.3rem;
          border: none;
          color: #8089a3;
          &.buy.active {
            color: #fff;
            background-color: #00cc99;
          }
          &.sell.active {
            color: #fff;
            background-color: #e02121;
          }
        }
      }
      .trust-type-choice {
        margin-top: 0.45rem;
        font-size: 0.3rem;
        position: relative;
        height: 0.5rem;
        > span:after {
          display: inline-block;
          content: '';
          margin-left: 0.2rem;
          border-top: 0.15rem  solid #666666;
          border-left: 0.13rem solid transparent;
          border-right: 0.13rem solid transparent;
        }
        .choices {
          position: absolute;
          top: 0.5rem;
          left: -0.3rem;
          width: 2.2rem;
          box-shadow: 0 3px 6px #d5d5d5;
          li {
            line-height: 0.8rem;
            padding-left: 0.3rem;
            background-color: #f1f1f1;
            &:first-of-type {
              border-bottom: .01rem solid #d8d8d8;
            }
            &.active {
              background-color: #262a42;
            }
          }
        }
      }
      .price-placeholder {
        margin-top: 0.4rem;
        height: 0.88rem;
        background-color: #eaeaea;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.3rem;
      }
      .fabi {
        color: #8089a3;
        font-size: 0.26rem;
        margin-top: 0.25rem;
        &:before {
          content: '≈';
        }
        &:after {
          content: 'CNY';
        }
      }
      .btc-tip {
        color: #8089a3;
        font-size: 0.26rem;
        margin-top: 0.25rem;
      }
      .range-percent {
        margin-top: 0.6rem;
        p {
          text-align: center;
          color: #8089A3;
          font-size: 0.24rem;
          margin-bottom: 0.25rem;
        }
        .dots {
          position: absolute;
          left: 0;
          right: 0;
          top: 0.15rem;
          display: flex;
          justify-content:space-between;
          span {
            z-index: 1;
            width: 0.3rem;
            height: 0.3rem;
            background-color: #e7e7e7;
            border-radius: 100%;
          }
          &.d1 span:nth-of-type(1){
            background-color: #409cf2;
          }
          &.d2 span:nth-of-type(2){
            background-color: #409cf2;
          }
          &.d3 span:nth-of-type(3){
            background-color: #409cf2;
          }
          &.d4 span:nth-of-type(4){
            background-color: #409cf2;
          }
          &.d5 span:nth-of-type(5){
            background-color: #409cf2;
          }
        }
      }
      .ac-area {
        position: absolute;
        width: 100%;
        bottom: 0.6rem;
      }
      .actBtn {
        margin-top: 0.5rem;
        width: 100%;
        height: 0.95rem;
        color: #fff;
        border: none;
        font-size: 0.34rem;
      }
      .buyBtn {
        .actBtn;
        background-color: #00cc99;
        &:active {
          background-color: #0ee7a5;
        }
      }
      .sellBtn {
        .actBtn;
        background-color: #e02121;
        &:active {
          background-color: #ff7342;
        }
      }
      .total-input {
        color: #8089A3;
        font-size: 0.24rem;
        display: flex;
        > span {
          flex: 3;
          min-width: 0;
        }
        > div {
          flex: 8;
          min-width: 0;
          input ,span{
            font-size: 0.3rem;
            color: #cbd4ec;
            width: 100%;
            background-color: transparent;
            border: none;
          }
        }
      }
    }
    .right {
      float: right;
      width: 48%;
      height: 100%;
      position: relative;
      text-overflow: hidden;
      .order-book{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction:column;
        > div:nth-of-type(1) {
          flex: 4;
          min-height: 0;
          span {
            display: inline-block;
            width: 50%;
            text-align: center;
            color: #8089A3;
            font-size: 0.24rem;
            transform: scale(0.916);
          }
        }
        > div:nth-of-type(2), > div:nth-of-type(4) {
          flex: 40;
          min-height: 0;
        }
        > div:nth-of-type(3) {
          flex: 9;
          min-height: 0;
          font-size: 0.34rem;
          color: #666666;
          position: relative;
          p {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            span {
              display: inline-block;
              margin-left: 0.2rem;
              font-size: 0.24rem;
              transform: scale(0.916);
              color: #8089a3;
              &:before {
                content: '￥'
              }
            }
          }
        }
        > div:nth-of-type(5) {
          flex: 7;
          min-height: 0;
          position: relative;
          p {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-65%);
            font-size: 0.24rem;
            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 0.1rem;
              border-bottom: 0.15rem  solid #666666;
              border-left: 0.13rem solid transparent;
              border-right: 0.13rem solid transparent;
            }
          }
        }
        .sell-list , .buy-list {
          height: 100%;
          overflow-y: auto;
          li {
            line-height: 0.58rem;
            background: url('../../assets/img/RED.png') no-repeat right center;
            background-size: 50% 100%;
            span {
              display: inline-block;
              width: 50%;
              font-size: 0.24rem;
              transform: scale(0.916);
              &:first-of-type {
                color: #e02121;
              }
              &:last-of-type {
                color: #666666;
                text-align: right;
              }
            }
          }
        }
        .buy-list li:nth-of-type(n+2) {
          background-image: url('../../assets/img/GREED.png');
          span:first-of-type {
            color: #00cc99;
          }
        }
      }
      .latest-deal {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction:column;
        > div:nth-of-type(1) {
          flex: 5;
          min-height: 0;
          position: relative;
          p {
            position: absolute;
            left: 0;
            right: 0;
            font-size: 0.24rem;
            &:after {
              content: '';
              position: absolute;
              right: 0;
              top: 0.1rem;
              border-top: 0.15rem  solid #666666;
              border-left: 0.13rem solid transparent;
              border-right: 0.13rem solid transparent;
            }
          }
        }
        > div:nth-of-type(2) {
          flex: 4;
          min-height: 0;
          span {
            display: inline-block;
            width: 38%;
            color: #8089A3;
            font-size: 0.24rem;
            transform: scale(0.916);
            &:first-of-type {
              width: 24%;
            }
            &:last-of-type {
              text-align: right;
            }
          }
        }
        > div:nth-of-type(3) {
          flex: 87;
          min-height: 0;
        }
        > div:nth-of-type(4) {
          flex: 2;
        }
        .deal-list {
          height: 100%;
          overflow-y: auto;
          li {
            line-height: 0.6rem;
            span {
              display: inline-block;
              width: 38%;
              font-size: 0.24rem;
              transform: scale(0.916);
              &:nth-of-type(1) {
                width: 24%;
                color: #8089a3
              }
              &:nth-of-type(2) {
                color: #e02121;
              }
              &:nth-of-type(3) {
                text-align: right;
              }
            }
            &.buy span:nth-of-type(2) {
              color: #00cc99;
            }
          }
        }
      }
    }
  }
  .entrust-container {
    margin-top: 0.15rem;
    padding-right: 0;
    padding-left: 0;
  }
</style>
<style type="text/css" lang="less">
  .range-percent {
    .mt-range-runway {
      border-top-color: #e7e7e7;
    }
    .mt-range-thumb {
      border: 0.07rem solid #fff;
      background-color: #4d7bf3;
      z-index:2;
    }
  }
  .entrust-container {
    .mint-navbar {
      background-color: transparent;
      text-align: left;
      border-bottom: .01rem solid #ecedee;
      padding: 0 .3rem;
      .mint-tab-item:nth-of-type(2){
        margin-left: .5rem;
      }
      .mint-tab-item {
        color: #8089a3;
        border-bottom: .02rem solid #ecedee;
        padding: 0.26rem 0;
        flex: initial;
        width: 1.4rem;
        .mint-tab-item-label{
          font-size: 0.32rem;
        }
      }
      .mint-tab-item.is-selected {
        color: #4d7bf3;
        border-bottom-color: #4d7bf3;
        margin-bottom:0;
      }
    }
    .mint-tab-container-item {
      overflow: hidden;
      .setting {
        height: 1.1rem;
        padding: .4rem .3rem 0;
        display: flex;
        > div:first-of-type {
          flex: 1;
        }
        > div:last-of-type {
          flex: 1;
          text-align: right;
        }
        .hide-canceled {
          font-size: 0.26rem;
          input {
            display: none;
          }
          i{
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            background: url('../../assets/img/checkbox_icon.png') no-repeat center;
            background-size: contain;
            margin-right: 0.15rem;
            vertical-align: bottom;
          }
          input:checked + i {
            background-image: url('../../assets/img/selectedicon_i.png')
          }
        }
      }
    }
  }
  .trust-list {
    height:-webkit-calc(~"100vh - 3.05rem");
    height: calc(~"100vh - 3.05rem");
    overflow-y: auto;
    li {
      padding: .3rem .3rem .35rem;
      border-bottom: .01rem solid #ffffff;
      border-top: .01rem solid #e4e5e7;
      .title {
        font-size: 0.3rem;
        position: relative;
        .buy {
          color: #00cc33;
        }
        .sell {
          color: #e02121;
        }
        .market {
          color: #333333;
        }
        .time {
          color: #8089a3;
          font-size: 0.24rem;
          transform: scale(0.916);
        }
        .cancel {
          position: absolute;
          right: 0;
          font-size: 0.24rem;
        }
      }
      .data {
        margin-top: 0.3rem;
        .data-title {
          display: flex;
          span {
            flex: 1;
            min-width: 0;
            color: #8089a3;
            font-size: 0.24rem;
            &:last-of-type {
              text-align: right;
            }
          }
        }
        .data-info {
          margin-top: 0.2rem;
          font-size: 0.26rem;
          display: flex;
          span {
            flex: 1;
            min-width: 0;
            &:last-of-type {
              text-align: right;
            }
            em {
              color: #8089a3;
              font-size: 0.24rem;
              transform: scale(0.916);
              font-style: normal;
            }
          }
        }
      }
    }
    li:first-child{
      border-top: 0;
    }
  }
</style>
