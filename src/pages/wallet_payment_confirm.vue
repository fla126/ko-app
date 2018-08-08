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
          <div>{{$t('message.walletDetail.amount')}}<span>{{$root.toFixed(amount,8)}} {{currency}}</span></div>
          <div>{{$t('message.walletDetail.miningFee')}}<span><template v-if="feeSign=='ETH'">{{GasNumber}}gas * {{GasPrice}}gwei = </template>{{miningFeeDisplay}} {{feeSign}}</span></div>
          <h3>{{$t('message.walletDetail.total')}}<span>{{totalDisplay}} {{currency}}</span></h3>
        </li>
      </ul>      
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:pwconfirm}">{{$t('message.walletDetail.ok')}}</mt-button>
      </div>
    </div>
    <password-confirm ref='passConfirm' :show="showPWCLayer" :hideFunction="hidePWCLayer" :submitFunction="submitOrder"></password-confirm>
  </div>
</template>

<script>
import numUtils from '@/assets/js/numberUtils'
import passwordConfirm from '@/components/common/password_confirm'
import api from '@/api/data'
import Tip from '@/components/common/tip'
import { mapGetters, mapActions } from 'vuex'
import { Indicator } from 'mint-ui'
import Config from '@/api/config'

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

    if(this.$route.params.receiverAddress){ //如果有即时数据用即时数据，没有则尝试加载缓存数据
      this.receiverAddress = this.$route.params.receiverAddress
      this.senderAddress = this.$route.params.senderAddress
      this.amount = this.$route.params.amount
      this.tag = this.$route.params.tag
      this.miningFee = this.$route.params.miningFee
      this.feeSign = this.$route.params.feeSign
      this.GasPrice = this.$route.params.GasPrice
      this.GasNumber = this.$route.params.GasNumber
      this.sixteenDecimalData = this.$route.params.sixteenDecimalData
    } else if(confirm){
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
    ...mapGetters(['getFactoryCode','getContractAddr']),
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
    setFAddr(){ //统计付款地址使用情况
      var FAddr = JSON.parse(localStorage.getItem('frequentlyAddr') || '{}'), fid = this.getFactoryCode
      if(!FAddr[fid]){
        FAddr[fid] = {}
      }
      if(!FAddr[fid][this.senderAddress]){
        FAddr[fid][this.senderAddress] = {count:1 , name:this.name, token:this.currency}
      } else {
        FAddr[fid][this.senderAddress].count += 1
      }
      localStorage.setItem('frequentlyAddr',JSON.stringify(FAddr))
    },
    pwconfirm(){
      this.showPWCLayer = true
    },
    hidePWCLayer(){
      this.showPWCLayer = false
    },
    submitOrder(password){ //提交订单函数
      var params = {
        currency:this.currency,
        position:this.wallet_idx,
        toAddress:this.receiverAddress,
        fromAddress:this.senderAddress,
        network:Config.env==='dev'?'testnet':'livenet',
        value:String(this.amount),
        mineFee:this.miningFee,
        feeSign:this.feeSign,
        tag:this.tag,
        gasPrice:this.GasPrice,
        gasLimit:String(this.GasNumber),
        data:this.sixteenDecimalData
      }
      console.log(params)
      this.checkLogin(password).then((status)=>{
        if(status){ //密码验证成功
          Indicator.open({
            text: 'Loading...',
          })
          this.getSignedTrans(params).then((res)=>{
            if(res.status){ //获取交易签名成功
              var jData = {
                operateAddress:params.fromAddress,
                fromAddress:params.fromAddress,
                toAddress:params.toAddress,
                amount:Number(params.value),
                symbol:params.currency,
                direction:2,
                gasLimit:Number(params.gasLimit),
                gasPrice:Number(params.gasPrice),
                mineFee:Number(params.mineFee),
                smartContractAddress:this.getContractAddr[params.currency],
                signData:res.msg
              }
              api.createTrans(jData).then((res)=>{
                console.log('createTrans=====',jData,res.data)
                if(res.data.rst===1){
                  localStorage.removeItem('payment') 
                  localStorage.removeItem('confirm')
                  Tip({type:'success', title:this.$t('message.login.success'), message:this.$t('message.walletDetail.transSuccess')})
                  this.setFAddr() //设置钱包地址常用度
                  this.$router.replace({name:'page-wallet-detail', params:{currency:this.currency, idx:this.wallet_idx}})
                } else {
                  console.log(res.data.msg)
                }
                Indicator.close()
              })
            }
          })
        } else {
          this.$refs.passConfirm.password = ''
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
        }
      })
    },
    checkLogin(password){ //验证密码正确性
      return new Promise(function(resolve, reject){
        cordova.exec((res)=>{
          res = JSON.parse(res)
          console.log('login=====',res)
          if(res.code=='0'){
            resolve(true)
          } else {
            resolve(false)
          }
        }, (error)=>{
          console.log(error)
        }, 'WalletApi', 'login', [password])
      })
    },
    getSignedTrans(params){ //获取交易签名字符串
      return new Promise(function(resolve, reject){
        switch(params.currency){
          case 'BTC':
            api.getUtxo(params.fromAddress).then((res)=>{
              params.utxos = res.data.data
              console.log('utxos=====',params.utxos)
              cordova.exec((res)=>{
                res = JSON.parse(res)
                console.log('bitcoinjSign=====',res)
                if(res.code=='0'){
                  resolve({status:true, msg:res.msg})
                } else {
                  resolve({status:false, msg:res.msg})
                }
              }, (error)=>{
                console.log(error)
              }, 'WalletApi', 'bitcoinjSign', [JSON.stringify(params)])
            })
            break
          case 'ETH':
            api.getNonce(params.fromAddress).then((res)=>{
              params.nonce = res.data.data.nonce
              console.log('nonce=====',params.nonce)
              cordova.exec((res)=>{
                res = JSON.parse(res)
                console.log('web3jSign=====',res)
                if(res.code=='0'){
                  resolve({status:true, msg:res.msg})
                } else {
                  resolve({status:false, msg:res.msg})
                }
              }, (error)=>{
                console.log(error)
              }, 'WalletApi', 'web3jSign', [JSON.stringify(params)])
            })
            break
        }
      })
    },
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