<template>
  <div class="page">
    <comp-top-back :home="true">
      <span class="selected-title" v-tap="{methods:showWalletList}">{{displayName(wallet_idx)}}</span>
    </comp-top-back>
    <div class="page-main">
      <div class="amount-container">
        <h1>{{wallet[wallet_idx] && $root.toFixed(wallet[wallet_idx].currency[currency],8)}}<span> {{currency}} </span></h1>
        <p>≈ {{getCoinSign}}{{total}}</p>
        <ul class="actions">
          <li v-if="!getUsbkeyStatus || !wallet[wallet_idx]" class="gray"><i></i>{{$t('message.walletDetail.send')}}</li>
          <router-link :to="{name:'page-wallet-payment',params:{currency:currency, idx:wallet_idx}}" tag="li" v-else><i></i>{{$t('message.walletDetail.send')}}</router-link>
          <li><span class="line"></span></li>
          <li v-if="!getUsbkeyStatus || !wallet[wallet_idx] || (wallet[wallet_idx] && wallet[wallet_idx].isAll)" class="gray"><i></i>{{$t('message.walletDetail.receive')}}</li>
          <router-link :to="{name:'page-wallet-gather',params:{currency:currency, name:displayName(wallet_idx), key:wallet[wallet_idx] && wallet[wallet_idx].publicKey}}" tag="li" v-else><i></i>{{$t('message.walletDetail.receive')}}</router-link>
        </ul>
      </div>
      <div class="trans-records-title">{{$t('message.walletDetail.lastRecord')}}</div>
      <div class="trans-records-scroll" id="scroll">
        <mt-loadmore :bottom-method="getTransList" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="$t('message.walletDetail.pullText')" :bottomDropText="$t('message.walletDetail.releaseText')" :bottomLoadingText="$t('message.walletDetail.LoadingText')" ref="loadmore">
          <ul class="trans-records-list">
            <!-- <li class="error">
              <div><i></i></div>
              <div>1MzziGBa7tNN.......wRcvSGZu5<br /><span>2018.04.23</span></div>
              <div><span>{{$t('message.walletDetail.zipedFailed')}}</span></div>
            </li> -->
            <li :class="[trans.direction===1?'in':'out']" v-for="(trans,index) in transList" :key="index" v-tap="{methods:visitBlock, txId:trans.txId}">
              <div><i></i></div>
              <div>{{displayAdress(trans)}}<br /><span>{{trans.createdTime.split(' ')[0]}}</span></div>
              <div><span>{{$root.toFixed(trans.amount,4)}}{{trans.symbol }}</span></div>
              <div class="progress" v-if="trans.status===2">
                <p>{{displayTime(trans)}}<em class="active">{{trans.confirmation}}/{{trans.blockNumber}}</em></p>
                <mt-progress :value="Math.round(trans.confirmation/trans.blockNumber*100)"></mt-progress>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
    <mask-layer :isgray="true" :show="show" @hide="hideWalletList" :style="{top: '0.9rem'}">
      <ul class="wallet-list" >
        <li v-tap="{methods:changeWallet, idx:index}" v-for="(item,index) in wallet" :key="index">{{displayName(index)}}</li>
      </ul>
    </mask-layer>
    <mask-layer :isgray="true" :show="!$store.state.usbkeyStatus && showUnlinked" @hide="hideUnlinkedLayer">
      <div class="unlinked-layer" >
        <p>{{$t('message.walletDetail.unlinkedStatus')}}</p>
        <div class="step-next">
          <mt-button type="primary" size="large" v-tap="{methods:hideUnlinkedLayer}">{{$t('message.walletDetail.ok')}}</mt-button>
        </div>
      </div>
    </mask-layer>
  </div>
</template>

<script>

import api from '@/api/data'
import { Progress } from 'mint-ui'
import maskLayer from '@/components/common/mask'
import { mapGetters, mapActions } from 'vuex'
import numUtils from '@/assets/js/numberUtils'

export default {
  name:'page-wallet-detail',
  data(){
    return {
      scroll:false,
      currency:'',
      show:false,
      showUnlinked:true,
      wallet_idx:0,
      WFSetting:{},
      page:0,
      totalPage:null,
      transList:[],
      allLoaded:false,
      serverTime:new Date(),
      timer:0,
      key:false
    }
  },
  created(){
    this.key = this.$route.params.key || false
    this.currency = this.$route.params.currency || 'BTC'
    this.wallet_idx = Number(this.$route.params.idx) || 0
    this.WFSetting = JSON.parse(localStorage.getItem('walletFrozenSetting') || '{}') //获取钱包冻结设置
    this.getTransList()
  },
  mounted(){
    setInterval(()=>{
      this.timer += 1
    },1000)
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getCoinSign','getSymbolExchange','getFiat','getWalletList','getUTXO','getFactoryCode','getERC20']),
    wallet(){ 
      var _publicKeys = [], _total = 0, _all, _wallets = JSON.parse(JSON.stringify(this.getWalletList))
      // 过滤已冻结钱包
      _wallets = _wallets.filter((item)=>{
        return !this.checkFrozen(this.currency, item.publicKey)
      })
      //符合UTXO的币种添加ALL聚合钱包
      if(_wallets.length && this.getUTXO.includes(this.currency)){
        for(let walletItem of _wallets){
          _total = numUtils.add(_total, walletItem.currency[this.currency])
          _publicKeys.push(walletItem.publicKey)
        }
        _all = {
          name:`${this.currency}_ALL`,
          currency:{},
          isAll:true
        }
        _all['publicKey'] = _publicKeys
        _all.currency[this.currency] = _total
        _wallets.push(_all)
      }
      return _wallets
    },
    total(){
      if (this.getSymbolExchange.length) {
        return numUtils.mul(this.getSymbolExchangePrice(this.currency), this.wallet[this.wallet_idx] && this.wallet[this.wallet_idx].currency[this.currency]).toFixed(2).toMoney()
      } else {
        return '0.00'
      }
    },
  },
  methods:{
    visitBlock(args){
      if(this.currency==='ETH' || this.getERC20.includes(this.currency)){
        //location.href = `https://etherscan.io/tx/${args.txId}`
        this.$router.push({name:'page-visitblock',params:{txId:args.txId}})
      }
    },
    displayTime(trans){
      var msec = this.serverTime.getTime() - new Date(trans.createdTime.replace('-','/')).getTime() + this.timer*1000
      return this.$root.humanTime(msec)
    },
    displayAdress(trans){
      let address = trans.direction===1?trans.fromAddress : trans.toAddress 
      return address.slice(0,12)+'.......'+address.slice(address.length-9)
    },
    getTransList(){ //获取交易记录
      if(this.wallet.length){
        console.log('loadBottom')
        let address = this.$root.getAddress(this.currency, this.wallet[this.wallet_idx].publicKey)
        api.getTransList([address], this.page+1).then((res)=>{
          if(res.data.rst==1){
            this.totalPage =Math.ceil(res.data.total/10)
            this.serverTime = new Date(res.data.timestamp.replace('-','/'))
            this.timer = 0
            if(res.data.data.length){
              this.transList = this.transList.concat(res.data.data)
              this.page +=1
              if(this.page===this.totalPage){
                this.allLoaded = true
              }
              this.$refs.loadmore.onBottomLoaded();
            }
          }
        })
      }
    },
    displayName(idx){ //显示钱包名称
      return (this.wallet[idx] && this.wallet[idx].name) || (this.wallet[idx] && this.currency+this.$root.fitLen(idx+1,2)) || ''
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
    checkFrozen(token, publicKey){ //检查钱包币种是否被冻结 fid 硬件id号 publicKey 公钥 token 币种
      var fid = this.getFactoryCode
      return this.WFSetting[fid] && this.WFSetting[fid][publicKey] && this.WFSetting[fid][publicKey][token]
    },
    showWalletList(args){
      this.show = !this.show
    },
    hideWalletList(){
      this.show = false
    },
    changeWallet(args){
      this.show = false
      this.wallet_idx = args.idx
      this.$router.replace({name:'page-wallet-detail', params:{currency:this.currency, idx:this.wallet_idx}})
    },
    showUnlinkedLayer(){

    },
    hideUnlinkedLayer(){
      this.showUnlinked = false
    },
  },
  components:{    
    
    maskLayer,
    'mtProgress':Progress
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
      &.gray {
        color:#ccc;
        i {
          background-image: url('../assets/img/fukuan_icon_gray@3x.png')
        }
        &:last-of-type i{
          background-image: url('../assets/img/shoukuan_gray@3x.png');
        }
      }
    }
  }
}

.trans-records-scroll {
  height:-webkit-calc(~"100vh - 4.92rem");
  height: calc(~"100vh - 4.92rem");
  background-color: #F9F9F9;
  overflow-y: auto;
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
    flex-wrap:wrap;
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
    > div:nth-of-type(4) {
      width: 100%;
      padding-left: 0.7rem;
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
  height: 100%;
  margin:auto;
  overflow-y: auto;
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

.unlinked-layer {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 6.5rem;
  height: 6rem;
  margin: auto;
  border-radius: 0.1rem;
  text-align: center;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #6c6c6c;
  background: url('../assets/img/device_unlinked.png') #fff no-repeat center 0.85rem;
  background-size: 2.1rem auto;
  p {
    margin: 3.4rem 0.5rem 0;
    color: #666;
    font-size: 0.36rem;
    text-align: center;
  }
}
.step-next {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .mint-button {
    border-radius: 0;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
}

.progress p {
  color: #98999C;
  font-size: 0.24rem;
  line-height: 0.4rem;
  position: relative;
  em {
    position: absolute;
    font-style: normal;
    right: 0;
    &.active {
      color: #4D7BF3;
    }
  }
}
</style>