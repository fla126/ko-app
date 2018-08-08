<template>
  <div class="page">
    <comp-top-back :class="'line'">付款</comp-top-back>
    <div class="page-main">
      <ul class="order-form">
        <li>
          <p>请按照下面的要求付款：</p>
          <p class="order-number"><span class="mt50 ft-c-gray30">付款金额：</span><span class="mt40">￥{{orderDetail.cnyTotalPrice}}</span></p>
        </li>
        <li>
          <p><i class="icon-tip">!</i><strong>重要提示</strong></p>
          <p class="tip-text">付款时备注信息请务必填写：<br /> 您在Tinkey官方网站注册的手机号。<br /> 如：“13722200033”</p>
        </li>
        <li>
          <p class="text-center ft-c-gray">扫下面的二维码向超级节点付款</p>
          <p class="text-center mt40">
            <img class="qrpayment" :src="qrcode[`qr${query.qrIndex}`]">
          </p>
          <p class="mt50 text-center ft-c-gray">付款完成后，请点击“我已付款”按钮。 </p>
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
import qr01 from '../../../assets/img/activity/invite/wechat-cyl-02.png'
import qr02 from '../../../assets/img/activity/invite/alipay-pyp-02.jpg'
export default {
  name:'page-qrpayment',
  data(){
    return {
     collapsed:true,
     orderDetail: {},
     query: {},
     qrcode: {
       qr0: qr01,
       qr1: qr01,
       qr2: qr02,
       qr3: qr02
     }
    }
  },
  mounted(){
    
  },
  computed:{
    
  },
  created() {
    this.query = this.$route.query
    api.getOrderDetail({
      orderId: this.query.orderId
    }, (res) => {
      this.orderDetail = res
    })
  },
  methods:{
    showMsgBox(){
      MessageBox.confirm('您的订单已接受,我们将尽快核对您的付款 确认收款后，会及时短信通知您。', '提示').then((action)=>{
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
  margin-top: 0.2rem;
  padding-left: 0.5rem;
  color: #f24141;
  line-height: 0.45rem;
}
.qrpayment {width: 3.2rem;}
</style>
