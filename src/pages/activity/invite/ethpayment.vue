<template>
  <div class="page">
    <comp-top-back :class="'line'">付款</comp-top-back>
    <div class="page-main">
      <ul class="order-form">
        <li>
          <p>请按照下面的要求付款：</p>
          <p class="order-number"><span class="mt50 ft-c-gray30">付款金额：</span><span class="mt40">{{orderDetail.totalPrice || '--'}} ETH</span></p>
        </li>
        <li>
          <p><i class="icon-tip">!</i><strong>Input data 务必填写下方6位随机数</strong></p>
          <p class="text-center mt25"><span class="tip-text">{{getMemo}}</span></p>
        </li>
        <li>
          <p class="text-center ft-c-gray">扫下面的二维码地址付款</p>
          <p class="text-center mt40 qrpayment" ref="qrcode"></p>
          <p class="mt15 text-center ft-c-gray">官方二维码地址</p>
          <p class="mt10 text-center ft-c-gray">{{address||'--'}}<i class="copy-btn ml10" @click="copyAddress"></i></p>
        </li>
      </ul>
      <div class="step-next" :class="{fixed:collapsed}">
        <mt-button type="primary" size="large" v-tap="{methods:showMsgBox}">我已付款</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {MessageBox  } from 'mint-ui'
import { mapGetters } from 'vuex'
import api from '@/api/activity'
import utils from '@/assets/js/utils'
import Tip from '@/components/common/tip'
const copyText = (str) => {
  var save = function (e) {
    e.clipboardData.setData('text/plain', str)
    e.preventDefault()
  }
  document.addEventListener('copy', save)
  document.execCommand('copy')
  document.removeEventListener('copy', save)
}
export default {
  name:'page-ethpayment',
  data(){
    return {
      collapsed:true,
      remark: '',
      query: {},
      orderDetail: {},
      payments: []
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapGetters(['getApiToken']),
    address () {
      for (let i = 0; i < this.payments.length; i++) {
        let d = this.payments[i]
        if (Number(d.paytypeId) === Number(this.orderDetail.paytypeId)) {
          return d.paytypeAddress
        }
      }
      return ''
    },
    getMemo () {
      if (this.orderDetail && this.orderDetail.orderId) {
        return this.orderDetail.orderId.substring(this.orderDetail.orderId.length - 6)
      } else {
        return null
      }
    }
  },
  watch: {
    address (val) {
      this.$nextTick(() => {
        utils.qrcode(this.$refs.qrcode, {
          text: val,
          width: 160,
          height: 160
        })
      })
    }
  },
  created () {
    this.query = this.$route.query
    api.conETHPaytype((res) => {
      this.payments = res
    }, (msg) => {
      Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
    })
    api.getOrderDetail({
      orderId: this.query.orderId
    }, (res) => {
      this.orderDetail = res
    })
  },
  methods:{
    copyAddress () {
      Tip({type:'success', message:`复制成功`}) // 复制成功
      copyText(this.address)
    },
    showMsgBox(){
      MessageBox.confirm('您的订单已接受,我们将核对您的付款信息。 付款确认后，我们将在1到2个工作日为您发货。 您可以在官网——我的Tinkey中跟踪订单状态。', '提示').then((action)=>{
        api.paid({
          orderId: this.query.orderId,
          remark: this.remark
        }, (res) => {
          Tip({type:'success', message:`支付成功`})
          this.$router.replace({name:'page-mytinkey'})
        }, (msg) => {
          Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
        })
      })
    }
  },
  components:{
    
  }
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.order-form {
  li {
    padding-top: 0.35rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #ecedee;
    font-size: 0.24rem;
    input {
      width: 100%;
      border:none;
      font-size: 0.3rem;
      margin-top: 0.25rem;
      line-height: 0.5rem;
      background-color: transparent;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
}
.order-number {
  display: flex;
  > span {
    min-width: 0;
    &:first-of-type {
      flex: 1;
    }
    &:last-of-type {
      flex: 1;
      color:#6666ff;
      font-size: 0.36rem;
      text-align: right;
    }
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
.icon-tip {
  font-style: normal;
  color:#fff;
  display: inline-block;
  width: 0.36rem;
  height: 0.36rem;
  background-color: #e86c16;
  border-radius: 50%;
  text-align: center;
  line-height: 0.36rem;
  margin-right: 0.15rem;
}
.tip-text {
  display: inline-block;
  width: 4.40rem;
  line-height: 1rem;
  background-color: #eaeaea;
  font-size: 0.48rem;
  color:#4d7bf3;
}
.qrpayment{
  display:flex;
  align-items:center;
  justify-content:center;
}
.copy-btn {
  display: inline-block;
  width: 0.26rem;
  height: 0.26rem;
  background: url('../../../assets/img/activity/invite/copy.png') no-repeat center;
  background-size: contain;
  vertical-align: middle;
}
</style>
