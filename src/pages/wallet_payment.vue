<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      <ul class="payment-detail">
        <li>
          <h1 v-if="$i18n.locale=='en'">{{$t('message.walletDetail.send')}} {{currency}}</h1>
          <h1 v-if="$i18n.locale=='zhCHS'">{{currency}}{{$t('message.walletDetail.send')}}</h1>
          <p>{{$t('message.walletDetail.receiverAddress')}}</p>
          <p><input type="text" id="receiverAddress" v-model="receiverAddress" :placeholder="$t('message.walletDetail.inputAdress')"><i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p>{{$t('message.walletDetail.amount')}}</p>
          <p><input type="number" id="amount" v-model="amount" :placeholder="$t('message.walletDetail.maxUsableAmount')+' '+Number($root.toFixed(wallet[wallet_idx] && wallet[wallet_idx].currency[currency],8))"><span class="btn" v-tap="{methods:()=>{amount=wallet[wallet_idx].currency[currency]}}">全部</span></p>
        </li>
        <li v-show="false">
          <p>{{$t('message.walletDetail.tag')}}</p>
          <p><input type="text" v-model="tag" :placeholder="$t('message.walletDetail.inputTag')"></p>
        </li>
        <li v-show="collapsed">
          <p>{{$t('message.walletDetail.miningFee')}} <i class="collapse" v-tap="{methods:collapse}" v-if="currency!='BTC'"></i></p>
          <p class="mt10"><mt-range v-model="miningFee" :bar-height="2"><div slot="start" class="mr10">慢</div> <div slot="end" class="ml10">快</div></mt-range>
          <p class="mt10 text-center">{{miningFeeDisplay}}  {{feeSign}}</p>
        </p>
        </li>
        <li v-show="!collapsed">
          <p>{{$t('message.walletDetail.miningFee')}}<i class="collapse active" v-tap="{methods:collapse}"></i></p>
          <ul v-show="!collapsed">
            <li>
              <p><input type="number" v-model="GasPrice" placeholder="Gas price："><span>gwei</span></p>
            </li>
            <li>
              <p><input type="number" v-model="GasNumber" placeholder="Gas number："></p>
            </li>
            <li>
              <textarea v-model="sixteenDecimalData" :placeholder="$t('message.walletDetail.sixteenDecimalData')"></textarea>
            </li>
          </ul>
        </li>
        <li>
          <h3>{{$t('message.walletDetail.total')}}<span>{{totalDisplay}} {{currency}}</span></h3>
        </li>
      </ul>
      <div class="step-next" :class="{fixed:collapsed && isBlur}">
        <mt-button type="primary" size="large" v-tap="{methods:checkPayment}">{{$t('message.walletDetail.next')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/data'
import { Toast } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import numUtils from '@/assets/js/numberUtils'
import Tip from '@/components/common/tip'
import util from 'ethereumjs-util'
import {Address} from 'bitcore-lib'

export default {
  name:'page-wallet-payment',
  data(){
    return {
      currency:'',
      collapsed:true,
      isBlur:true,
      receiverAddress:'',
      amount:'',
      tag:'',
      wallet_idx:0,
      miningFee:0,
      GasPrice:'',
      GasNumber:'',
      sixteenDecimalData:'',
      feeRange:{
        default:0,
        min:0,
        max:1,
      },
    }
  },
  created(){
    var payment = localStorage.getItem('payment')
    payment = payment && JSON.parse(payment)

    this.currency = this.$route.params.currency || 'BTC'
    this.wallet_idx = this.$route.params.idx || 0
    this.amount = this.$route.params.amount || ''
    this.receiverAddress = this.$route.params.address || ''
    
    if(payment && this.currency == payment.currency){ //读取缓存数据
      this.collapsed = payment.collapsed
      this.receiverAddress = payment.receiverAddress
      this.amount = payment.amount
      this.tag = payment.tag
      this.sixteenDecimalData = payment.sixteenDecimalData
      setTimeout(()=>{
        this.GasPrice = payment.GasPrice
        this.GasNumber = payment.GasNumber
      },100)
    }

    api.getFeeRange(this.currency).then((res)=>{ //回去推荐矿工费
      this.feeRange = res.data.data
      if(payment){
        this.miningFee = (payment.miningFee - this.feeRange.min)/(this.feeRange.max - this.feeRange.min)*100
      } else {
        this.miningFee = (this.feeRange.default - this.feeRange.min)/(this.feeRange.max - this.feeRange.min)*100
      }
    }).catch((error)=>{ //启用模拟数据
      this.feeRange = {
        default:0.000403,
        min:0.0000252,
        max:0.00252,
      }
      if(payment){
        this.miningFee = (payment.miningFee - this.feeRange.min)/(this.feeRange.max - this.feeRange.min)*100
      } else {
        this.miningFee = (this.feeRange.default - this.feeRange.min)/(this.feeRange.max - this.feeRange.min)*100
      }
    })
  },
  mounted(){
    $('.payment-detail input,.payment-detail textarea').focus(()=>{
      this.isBlur = false
    })
    $('.payment-detail input,.payment-detail textarea').blur(()=>{
      this.isBlur = true
    })
  },
  watch:{
    miningFee(){
      this.parseGas(this.currency, this.feeSign, this.miningFeeDisplay)
    }
  },
  computed:{
    ...mapGetters(['getWalletList','getUTXO','getERC20']),
    feeSign(){
      var _type = this.currency
      if(this.getERC20.includes(this.currency)){
        _type = 'ETH'
      }
      return _type
    },
    miningFeeDisplay(){
      if(this.collapsed){
        return ((this.feeRange.max-this.feeRange.min)/100*this.miningFee + this.feeRange.min).toFixed(8)
      } else {
        return numUtils.div(numUtils.mul(this.GasPrice, this.GasNumber),10**9).toFixed(8)
      }
    },
    totalDisplay(){ //必须是BTC 或者是ETH旷工费才计入总合
      if(this.currency == this.feeSign){
        return numUtils.add(this.amount, this.miningFeeDisplay).toFixed(8)
      } else {
        return this.amount ? Number(this.amount).toFixed(8): '0.00000000'
      }
    },
    wallet(){ //符合UTXO的币种添加ALL聚合钱包
      var _publicKeys = [], _total = 0, _all, _wallet = JSON.parse(JSON.stringify(this.getWalletList))
      if(this.getUTXO.includes(this.currency)){
        for(let walletItem of this.getWalletList){
          _total = numUtils.add(_total, walletItem.currency[this.currency])
          _publicKeys.push(walletItem.publicKey)
        }
        _all = {
          name:`${this.currency}_ALL`,
          currency:{},
        }
        _all['publicKey'] = _publicKeys
        _all.currency[this.currency] = _total
        _wallet.push(_all)
      }
      return _wallet
    },
  },
  methods:{
    parseGas(currency, feeSign, miningFee){ // 获取ERC20代币的 GasPrice、GasNumber, feeSign=='ETH' 
      var GasPrice = '', GasNumber = ''
      if(feeSign=='ETH'){
        if(currency=='ETH'){
          GasPrice = numUtils.mul(numUtils.div(miningFee, 25200), 10**9).toFixed(2)
          GasNumber = 25200
        } else {
          GasPrice = numUtils.mul(numUtils.div(miningFee, 60000), 10**9).toFixed(2)
          GasNumber = 60000
        }
      }
      this.GasPrice = GasPrice
      this.GasNumber = GasNumber
    },
    checkPayment(){ //检测转账输入各项参数是否正确
      console.log('wallets=========',this.wallet)
      if($.trim(this.receiverAddress).length==0){ //判断地址是否为空
        Tip({type:'warning', title:'提醒', message:this.$t('message.walletDetail.blankReceiverAddress')})
        $('#receiverAddress').focus()
        return
      }
      if(!this.isAddress(this.currency, this.receiverAddress)){ //收款方地址是否符合当前币种的规则
        Tip({type:'danger', title:'错误', message:this.$t('message.walletDetail.errorReceiverAddress')})
        $('#receiverAddress').focus()
        return
      }
      if($.trim(this.amount).length==0 || Number(this.amount)==0){ //判断转账金额是否为空或0
        Tip({type:'warning', title:'提醒', message:this.$t('message.walletDetail.blankAmount')})
        $('#amount').focus()
        return
      }
      if(Number(this.amount) > Number(this.$root.toFixed(this.wallet[this.wallet_idx].currency[this.currency],8))){ //判断输入是否大于该钱包币种最大可用值
        Tip({type:'danger', title:'错误', message:this.$t('message.walletDetail.overAmount')})
        $('#amount').focus()
        return
      }
      if(Number(this.miningFeeDisplay)==0){
        Tip({type:'warning', title:'提醒', message:this.$t('message.walletDetail.blankMiningFee')})
        return
      }
      var params = {
        currency: this.currency,
        idx:this.wallet[this.wallet_idx].idx,
        receiverAddress: this.receiverAddress,
        senderAddress: this.$root.getAddress(this.currency, this.wallet[this.wallet_idx].publicKey),
        amount: this.amount,
        tag: this.tag,
        miningFee: this.miningFeeDisplay,
        feeSign: this.feeSign,
        GasPrice: this.GasPrice,
        GasNumber: this.GasNumber,
        sixteenDecimalData: this.sixteenDecimalData,
      }
      //缓存当前转账数据
      var payment = {
        currency: this.currency,
        collapsed: this.collapsed,
        receiverAddress: this.receiverAddress,
        amount: this.amount,
        tag: this.tag,
        miningFee: this.miningFeeDisplay,
        GasPrice: this.GasPrice,
        GasNumber: this.GasNumber,
        sixteenDecimalData: this.sixteenDecimalData,
      }
      localStorage.setItem('confirm',JSON.stringify(params)) //缓存备用数据，用于确认页面刷新重载数据
      localStorage.setItem('payment',JSON.stringify(payment)) //缓存当前数据，用于用户回退修改，订单确认后需清除
      this.$router.push({name:'page-wallet-payment-confirm', params:params})
    },
    scanning(args){
      this.$root.scanner((data)=>{
        console.log(data)
        var QRdata = data.text.split('$$')
        if(data.format=='QR_CODE' && QRdata.length==3){
          if(this.currency==QRdata[0]){
            this.amount = QRdata[1]
            this.receiverAddress = QRdata[2]
          } else {
            Toast(this.$t('message.walletDetail.mismatchingCurrency'))
          }
        } else {
          Toast(this.$t('message.walletDetail.invalidQRAddress'))
        }
      })
    },
    collapse(args){
      this.collapsed = !this.collapsed
    },
    isAddress(currency, address){ //验证收款方地址是否符合当前币种的规则
      var result = false
      switch(currency){
        case 'BTC':
          result = Address.isValid(address)
          break
        default:
          result = util.isValidAddress(address)
          break

      }
      return result
    },
    
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
        &.btn {
          color: #4D7BF3;
        }
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