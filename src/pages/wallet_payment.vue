<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      <ul class="payment-detail"  v-if="cointype=='btc'">
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.send')}} {{cointype | uppercase}}</h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{cointype | uppercase}}{{$t('message.walletDetail.send')}}</h1>
          <p>{{$t('message.walletDetail.receiverAddress')}}</p>
          <p>1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5<i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.amount')}}</p>
          <p><input type="tel" :placeholder="$t('message.walletDetail.maxUsableAmount')+135.12342"></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.miningFee')}}</p>
          <p><input type="tel"></p>
        </li>
        <li>
          <h3>{{$t('message.walletDetail.total')}}<span>12.24568 BTC</span></h3>
        </li>
      </ul>
      <ul class="payment-detail"  v-else>
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.send')}} {{cointype | uppercase}}</h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{cointype | uppercase}}{{$t('message.walletDetail.send')}}</h1>
          <p>{{$t('message.walletDetail.receiverAddress')}}</p>
          <p>1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5<i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.amount')}}</p>
          <p><input type="tel" :placeholder="$t('message.walletDetail.maxUsableAmount')+' '+135.12342"></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.tag')}}</p>
          <p><input type="tel"></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.miningFee')}}<i class="collapse" :class="{active:!collapsed}" v-tap="{methods:collapse}"></i></p>
          <ul v-show="!collapsed">
            <li>
              <p><input type="tel" placeholder="Gas price："><span>gwei</span></p>
            </li>
            <li>
              <p><input type="tel" placeholder="Gas number："></p>
            </li>
            <li>
              <textarea :placeholder="$t('message.walletDetail.sixteenDecimalData')"></textarea>
            </li>
          </ul>
        </li>
        <li>          
          <h3>{{$t('message.walletDetail.total')}}<span>12.24568 BTC</span></h3>
        </li>
      </ul>
      <div class="step-next" :class="{fixed:collapsed && isBlur}">
        <mt-button type="primary" size="large" v-tap="{methods:$root.routeTo, to:'page-wallet-payment-confirm',params:{type:cointype}}">{{$t('message.walletDetail.next')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import data from '@/api/data'
import { mapGetters, mapActions } from 'vuex'
import web3 from 'web3'
import Buffer from 'buffer'
import Tx from 'ethereumjs-tx'
import bitcore from 'bitcore-lib'


export default {
  name:'page-wallet-payment',
  data(){
    return {
      cointype:'',
      collapsed:true,
      isBlur:true,
    }
  },
  created(){
    
  },
  mounted(){
    this.cointype = this.$route.query.type || 'btc'
    $('.payment-detail input,.payment-detail textarea').focus(()=>{
      this.isBlur = false
    })
    $('.payment-detail input,.payment-detail textarea').blur(()=>{
      this.isBlur = true
    })
  },
  updated(){
    
  },
  computed:{
    ...mapGetters(['getPrivateKey']),
  },
  methods:{
    scanning(args){
      this.$root.scanner((error,data)=>{
        console.log(data)
      })
    },
    collapse(args){
      this.collapsed = !this.collapsed
    },
    /*打包签名交易，并发送到各自区块函数
    @param publicKey String 公钥
    @param currency String 币种
    @param transactionData Object 签名交易数据
    @param callback Function 回调函数*/
    sendSignedTransaction(publicKey,currency,transactionData,callback){ 
      currency = currency.toLowerCase()
      switch(currency){
        case 'btc':
          var transaction = new bitcore.Transaction()
            .from(transactionData)
            .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
            .sign(privateKey);
          break
        case 'eth':
          var tx = new Tx(transactionData);
          tx = window.getETHSign(tx,publicKey);
          var serializedTx = tx.serialize();
          web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', callback);
          break
      }
    }
  },
  components:{    
    
  }
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
}
.payment-detail {
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