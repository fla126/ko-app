<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      
      <ul class="pament-detail">
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.review')}} {{currency}}</h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{currency}}{{$t('message.walletDetail.review')}}</h1>
          <p>{{$t('message.walletDetail.receiverAddress')}}</p>
          <p>{{receiverAddress}}</p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.senderAddress')}}</p>
          <p>{{senderAddress}}</p>
        </li>
        <li>
          <div>{{$t('message.walletDetail.amount')}}<span>{{amount}} {{currency}}</span></div>
          <div>{{$t('message.walletDetail.miningFee')}}<span><template v-if="feeSign=='ETH'">{{GasNumber}}gas * {{GasPrice}}gwei = </template>{{miningFeeDisplay}} {{feeSign}}</span></div>
          <h3>{{$t('message.walletDetail.total')}}<span>{{totalDisplay}} {{currency}}</span></h3>
        </li>
      </ul>      
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:pwconfirm}">{{$t('message.walletDetail.ok')}}</mt-button>
      </div>
    </div>
    <password-confirm :show="showPWCLayer" :hideFunction="hidePWCLayer" :submitFunction="submitOrder"></password-confirm>
  </div>
</template>

<script>
import numUtils from '@/assets/js/numberUtils'
import passwordConfirm from '@/components/common/password_confirm';
import web3 from 'web3'
import Tx from 'ethereumjs-tx'
import bitcore from 'bitcore-lib'

export default {
  name:'page-wallet-payment-confirm',
  data(){
    return {
      showPWCLayer:false,
      currency:'',
      wallet_idx:0,
      receiverAddress: '',
      senderAddress: '',
      amount: '',
      tag: '',
      miningFee: '',
      feeSign: '',
      GasPrice: '',
      GasNumber: '',
      sixteenDecimalData: '',
    }
  },
  created(){
    var confirm = localStorage.getItem('confirm')
    confirm = confirm && JSON.parse(confirm)

    this.currency = this.$route.params.currency
    this.wallet_idx = this.$route.params.idx

    if(this.$route.params.receiverAddress){
      this.receiverAddress = this.$route.params.receiverAddress
      this.senderAddress = this.$route.params.senderAddress
      this.amount = this.$route.params.amount
      this.tag = this.$route.params.tag
      this.miningFee = this.$route.params.miningFee
      this.feeSign = this.$route.params.feeSign
      this.GasPrice = this.$route.params.GasPrice
      this.GasNumber = this.$route.params.GasNumber
      this.sixteenDecimalData = this.$route.params.sixteenDecimalData
    } else {
      this.receiverAddress = confirm.receiverAddress
      this.senderAddress = confirm.senderAddress
      this.amount = confirm.amount
      this.tag = confirm.tag
      this.miningFee = confirm.miningFeeDisplay
      this.feeSign = confirm.feeSign
      this.GasPrice = confirm.GasPrice
      this.GasNumber = confirm.GasNumber
      this.sixteenDecimalData = confirm.sixteenDecimalData
    }
  },
  mounted(){
    
  },
  computed:{
    miningFeeDisplay(){
      if(this.feeSign == 'ETH'){
        return numUtils.div(numUtils.mul(this.GasPrice, this.GasNumber),10**9).toFixed(8)
      } else {
        return this.miningFee
      }
    },
    totalDisplay(){
      if(this.currency == this.feeSign){
        return numUtils.add(this.amount, this.miningFee).toFixed(8)
      } else {
        return this.amount
      }
    }
  },
  methods:{
    pwconfirm(){
      this.showPWCLayer = true
    },
    hidePWCLayer(){
      this.showPWCLayer = false
    },
    submitOrder(password){ //提交订单函数
      var params = {
        password,
        currency:this.currency,
        receiverAddress:this.receiverAddress,
        senderAddress:this.senderAddress,
        amount:this.amount,
        miningFee:this.miningFee,
        feeSign:this.feeSign,
        tag:this.tag,
        GasPrice:this.GasPrice,
        GasNumber:this.GasNumber,
        sixteenDecimalData:this.sixteenDecimalData
      }
      localStorage.removeItem('payment')
      localStorage.removeItem('confirm')
      console.log(params)
      this.$router.replace({name:'page-wallet-detail', params:{currency:this.currency, idx:this.wallet_idx}})
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
    
    passwordConfirm,
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
      word-break: break-all;
      &:last-of-type {
        color: #666666;
      }
    }
    div {
      color: #999999;
      position: relative;
      line-height: 0.4rem;
      span {
        position: absolute;
        right: 0;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
 }

.step-next {
  position: fixed;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0rem;
  padding-bottom: 0.3rem;
  background-color: #f9f9f9;
}
</style>