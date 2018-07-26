<template>
	<div class="page">
    <comp-top-back>
      <span class="selected-title" v-tap="{methods:toggleMarketList}">{{symbol_display}}</span>
    </comp-top-back>
    <div class="page-main ">
      <div class="info">
        <div>
          <p class="price" :class="{up:(getLast24h.direction!=2)}">{{getLast24h.close}}<span>{{getLast24h.percent}}%</span></p>
          <p class="fabi"> {{curPrice}} {{getCoinSign}}</p>
        </div>
        <div>
          <p>{{$t('message.kline.height')}}<!--最高价--><span>{{getLast24h.high}}</span></p>
          <p>{{$t('message.kline.lower')}}<!--最低价--><span>{{getLast24h.bottom}}</span></p>
          <p>{{$t('message.kline.twetrade')}}<!--24H成交量--><span>{{$root.toFixed(getLast24h.vol, 2)}} {{baseSymbol}}</span></p>
        </div>
      </div>
      <div class="acpanel">
        <button type="button" class="buy" v-tap="{methods:buyOrSell, t:true}">{{$t('message.kline.buy')}}<!--买入--></button>
        <button type="button" class="sell" v-tap="{methods:buyOrSell, t:false}">{{$t('message.kline.sell')}}<!--卖出--></button>
        <button type="button" class="depth" v-tap="{methods:toggleDepth, type:false}" v-show="isKline">{{$t('message.kline.deph')}}<!--深度--></button>
        <button type="button" class="depth" v-tap="{methods:toggleDepth, type:true}" v-show="!isKline">{{$t('message.kline.kline')}}<!--K线--></button>
      </div>
      <div class="kline-container" id="klineContainer" v-show="isKline"></div>
      <div class="kline-container active" id="depthContainer" v-show="!isKline"></div>
      <div class="kine-select" v-show="isKline">
        <span v-tap="{methods:setPeriod, t:'1m'}" :class="{active:period=='1m'}">{{$t('message.kline.timesharing')}}<!--分时--></span>
        <span v-tap="{methods:setPeriod, t:'5m'}" :class="{active:period=='5m'}">{{$t('message.kline.fiveminut')}}<!--5分钟--></span>
        <span v-tap="{methods:setPeriod, t:'15m'}" :class="{active:period=='15m'}">{{$t('message.kline.tenfivmiu')}}<!--15分钟--></span>
        <span v-tap="{methods:setPeriod, t:'1h'}" :class="{active:period=='1h'}">{{$t('message.kline.onehour')}}<!--1小时--></span>
        <span v-tap="{methods:setPeriod, t:'6h'}" :class="{active:period=='6h'}">{{$t('message.kline.sixhour')}}<!--6小时--></span>
        <span v-tap="{methods:setPeriod, t:'1d'}" :class="{active:period=='1d'}">{{$t('message.kline.oneday')}}<!--一天--></span>
        <span class="more" @click="isMore=!isMore">
	  			<transition enter-active-class="animated short fadeIn" leave-active-class="animated short fadeOut">
	  			  <ul class="choices" v-show="isMore">
	  			    <li v-tap="{methods:setIndice, t:'MACD'}" :class="{active:indice=='MACD'}">MACD</li>
	  			    <li v-tap="{methods:setIndice, t:'KDJ'}" :class="{active:indice=='KDJ'}">KDJ</li>
	  			    <li v-tap="{methods:setIndice, t:'StochRSI'}" :class="{active:indice=='StochRSI'}">StochRSI</li>
	  			  </ul>
	  			</transition>
	  		{{$t('message.kline.more')}}<!--更多--></span>
      </div>
    </div>
    <cp-mask :show="showMarkets" @hide="hideMarketList" :style="{'top': '0.9rem','background-color':'rgba(232, 232, 232, 0.8)'}">
      <ul class="wallet-list">
        <li v-for="market in getMarketList" v-tap="{methods:changeMarket, market:market, }">{{market.currencySymbol}}/{{market.baseSymbol}}</li>
      </ul>
    </cp-mask>
    <!--<cp-loading :show="loading"></cp-loading>-->
	</div>
</template>
<script>
  import cpMask from '@/components/common/mask' //遮罩组件
  import cpLoading from '@/components/common/loading' //加载组件
  import ECharts from '@/assets/js/echarts.min'
  import KLineChart from '@/assets/js/kline.draw'
  import KLineWebSocket from '@/assets/js/websocket'
  import getDepthOption from '@/assets/js/depth'
  import { mapGetters, mapActions } from 'vuex'
  import numUtils from '@/assets/js/numberUtils'

  let chartSettings = window.localStorage.getItem('chartSettings')
  chartSettings && (chartSettings = JSON.parse(chartSettings))

export default {
  name:'page-kline',
  components:{
    cpMask,
    cpLoading
  },
  data(){
    return {
      loading:true,
      showMarkets:false,
      kLineChart: null,
      depthChart: null,
      isMore:false,
      period:chartSettings ? chartSettings.charts.period : '1m', //分时线时期
      indice:'MACD', //技术指标
      isKline:true, //当前是否是K线图
      isFirstKline: true, //是否第一次加载K线数据
      klineSocket: null,
      klineData: [], // k线数据
      depthData:{},
      business:{
        market:'',
      }
    }
  },
  created(){
    this.business.market = this.$route.params.market || this.getInitMarket
    this.InitKlineWebSoket()
  },
  mounted(){
    this.initECharts()
  },
  watch:{
    '$route.params.market'(){ //切换市场后重新初始化websoket
      this.business.market = this.$route.params.market
      this.klineSocket.close()
      this.loading = true
      this.isFirstKline = true
      this.InitKlineWebSoket()
    },
    isKline(n,o){ //切换K线图、深度图
      setTimeout(this.initECharts,0)
    },
    klineData(n,o){ //如果K线数据有变化，更新K线图数据
      this.loading = false
      if(this.isKline){
        this.kLineChart.updateKlienDatas(JSON.parse(JSON.stringify(n)))
      }
    },
    depthData(n,o){ //如果深度数据有变化，更新深度图数据
      if(!this.isKline){
        this.depthChart.setOption(getDepthOption(JSON.parse(JSON.stringify(n))))
      }
    },
    period(n,o){ //如果K线周期变化，重新请求周期数据
      this.loading = true
      this.isFirstKline = true
      this.kLineChart.switch_period(n)
      this.klineSocket.switchPeriod(n)
    },
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
      this.$router.replace({name:'kline',params:{market:`${args.market.currencySymbol}_${args.market.baseSymbol}`}})
    },
    buyOrSell(args){
      this.$router.push({name:'page-market',params:{market:this.business.market,action:args.t}})
    },
    toggleDepth(args){
      this.isKline = args.type
    },
    initECharts(){
      if(this.isKline && !this.kLineChart){
        this.kLineChart= KLineChart({
          container: document.getElementById('klineContainer'),
          klineType: 'eosbtc',
          scale: 2,
          hideDepth: true,
          fixedNumber: 8,
        })
        this.kLineChart.switch_indic(this.indice)
        this.kLineChart.updateKlienDatas(JSON.parse(JSON.stringify(this.klineData)))

      }
      if(!this.isKline && !this.depthChart){
        this.depthChart = ECharts.init(document.getElementById('depthContainer'),'light');
        this.depthChart.setOption(getDepthOption(JSON.parse(JSON.stringify(this.depthData))))
      }
    },
    toggleQualification(args){
      this.isMore = false
      this.qualification = args.type
    },
    InitKlineWebSoket(){ //初始化K线websoket
      this.klineSocket = KLineWebSocket({
        symbol: this.symbol,
        period: this.period,
        callback: (res) => {
          // K线图数据
          if (res.dataType === 'kline') { // K线图数据
            let klineDatas = JSON.parse(JSON.stringify(this.klineData))
            let datas = res.data && res.data.constructor === Array ? res.data : []
            let newArray = []
            datas.forEach((item) => {
              newArray.push([Number(item[0]), parseFloat(item[1]) || 0, parseFloat(item[2]) || 0, parseFloat(item[3]) || 0, parseFloat(item[4]) || 0, parseFloat(item[5]) || 0])
            })
            if (!this.isFirstKline) {
              let tempObj = {}
              newArray.forEach((item) => {
                tempObj[String(item[0])] = item
              })
              for (let i = 0; i < klineDatas.length; i++) {
                let td = klineDatas[i]
                if (tempObj[String(td[0])]) {
                  klineDatas.splice(i, 1, tempObj[String(td[0])])
                  delete tempObj[String(td[0])]
                }
              }
              newArray.forEach((item) => {
                if (tempObj[String(item[0])]) {
                  klineDatas.push(item)
                }
              })
              this.klineData = klineDatas
            } else {
              this.isFirstKline = false
              this.klineData = newArray
            }

          } else if (res.dataType === 'LastOrderBook') {
            // 深度数据
            this.depthData = res.data
          } else if (res.dataType === 'LastPrice') {
            // 24小时最新信息
            this.setLast24h(res.data)
          } else if (res.dataType === 'markets') {
            // 市场信息
            this.setMarketList(res.data)
          }
        },
        onClose: () => {
          this.isFirstKline = true
        }
      })
    },
    setPeriod(args){ //设置K线周期
      this.period = args.t
    },
    setIndice(args){ //设置技术指标
      this.isMore = false
      if(this.isKline){
        this.kLineChart.switch_indic(args.t);
      }
      this.indice = args.t
    },
  },
  beforeDestroy () {
    this.klineSocket && this.klineSocket.close()
  }
}
</script>
<style lang="less" scoped>
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
.info {
	padding: 0.3rem;
	display: flex;
	> div:first-of-type {
		flex: 3;
		min-width: 0;
		.price {
			color: #e76d42;
			font-size: 0.4rem;
			padding-top: 0.08rem;
			span {
				font-size: 0.28rem;
				display: inline-block;
				margin-left: 0.25rem;
				&:before {
					content: '-';
				}
			}
			&.up {
				color: #e02121;
				span:before {
					content: '+';
				}
			}
		}
		.fabi {
			color: #8089a3;
			font-size: 0.3rem;
			margin-top: 0.2rem;
			&:before {
				content: '≈';
			}
		}
	}
	> div:last-of-type {
		flex: 2;
		min-width: 0;
		text-align: right;
		color: #8089a3;
		font-size: 0.24rem;
		line-height: 0.4rem;
		span {
			color: #666666;
			font-size: 0.28rem;
			display: inline-block;
			margin-left: 0.2rem;
		}
	}
}
.acpanel {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0.2rem 0.3rem;
	display: flex;
	justify-content:space-between;
	align-items:center;
	button {
		border: none;
		font-size: 0.3rem;
		color: #fff;
		&.buy, &.sell {
			width: 2.7rem;
			height: 0.85rem;
			background-color: #00cc33;
			&:active {
				background-color: #0ee7a5;
			}
		}
		&.sell  {
			background-color: #e02121;
			&:active {
				background-color: #ff7342;
			}
		}
		&.depth {
			width: 0.95rem;
			height: 0.6rem;
			font-size: 0.24rem;
      color: #666666;
			&:active {
				background-color: #353b5c;
			}
		}
	}
}
.kline-container {
	height:-webkit-calc(~"100vh - 4.69rem");
	height: calc(~"100vh - 4.69rem");
	margin: 0.15rem 0.3rem;
	background-color: #e8e8e8;
	position: relative;
	overflow:hidden;
	&.active {
		height:-webkit-calc(~"100vh - 4.15rem");
		height: calc(~"100vh - 4.15rem");
	}
}
.kine-select {
	position: absolute;
	bottom: 1.15rem;
	left: 0.3rem;
	right: 0.3rem;
	height: 0.55rem;
	line-height: 0.55rem;
	background-color: #eaeaea;
	display: flex;
	justify-content:space-between;
	z-index: 3;
	span {
		padding: 0 0.15rem;
		color: #8089a3;
		font-size: 0.24rem;
		&.active {
			color: #333333;
		}
		&.more:after {
		  content: '';
		  display: inline-block;
		  border-bottom: 0.12rem  solid #8089A3;
		  border-left: 0.10rem solid transparent;
		  border-right: 0.10rem solid transparent;
		  margin-left: 0.12rem;
		  padding-bottom: 0.05rem;
		}
	}
	.choices {
	  position: absolute;
	  right: 0;
	  bottom: 0.5rem;
	  width: 1.8rem;
	  box-shadow: 0 3px 6px #bbbcc1;
	  li {
	    line-height: 0.8rem;
	    padding-left: 0.3rem;
	    background-color: #eaeaea;
	    border-bottom: 1px solid #d0d0d0;
	    &:last-of-type {
	      border-bottom: none;
	    }
	    &.active {
	      background-color: #eaeaea;
	    }
	  }
	}
}
</style>
