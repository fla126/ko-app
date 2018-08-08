<template>
  <div class="page">
    <comp-top-back :class="'line'">请填写数量及收货地址</comp-top-back>
    <div class="page-main">
      <ul class="order-form">
        <li class="order-number">
          <div>请输入购买Tinkey数量</div>
          <div>
            <div class="price-adjust">
              <div><i class="deduct" v-tap="{methods:minus}"></i></div>
              <div><input type="number" readonly="readonly" v-model="num"></div>
              <div><i class="add" v-tap="{methods:add}"></i></div>
            </div>
            <p class="mt20 text-right ft-c-gray30" style="margin-left: -1rem;">{{total}}ETH 约合人民币：{{totalRMB}}</p>
          </div>
        </li>
        <li>
          <p class="mt10 ft-c-gray30">我们将按照以下方式给您邮寄：</p>
          <p class="mt25">收货人姓名：</p>
          <input type="text" v-model="formData.username" name="name" placeholder="输入姓名">
        </li>
        <li>
          <p>联系方式：</p>
          <input type="text" v-model="formData.contactPhone" name="mobile" placeholder="输入联系方式">
        </li>
        <li>
          <p>收货地址：</p>
          <div class="address-selector">
            <div><input type="text" v-model="formData.province" name="provice" placeholder="省份"></div>
            <div><input type="text" v-model="formData.city" name="city" placeholder="城市"></div>
            <div><input type="text" v-model="formData.town" name="country" placeholder="乡镇"></div>
          </div>
          <input type="text" v-model="formData.street" name="address" placeholder="详细地址">
        </li>
      </ul>
      <div class="step-next fixed">
        <mt-button type="primary" size="large" v-tap="{methods:createOrder}">{{$t('message.walletDetail.next')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Adjust from '@/components/adjust2'
import api from '@/api/activity'
import Tip from '@/components/common/tip'
import numUtils from '@/assets/js/numberUtils'
import utils from '@/assets/js/utils'
export default {
  name:'page-order',
  data(){
    return {
     num:1,
     query: {},
     datas: [],
     carts: [],
     formData: {
       country: '中国',
       username: '',
       contactPhone: '',
       province: '',
       city: '',
       town: '',
       street: ''
     },
     price:{}
    }
  },
  computed:{
    ...mapGetters(['getLang', 'getApiToken']),
    total () {
      let t = 0
      this.carts.forEach((item) => {
        t = numUtils.mul(item.discountPrice, item.productQuantity).add(t)
      })
      return numUtils.add(t, 0).toFixed(2)
    },
    totalRMB () {
      return numUtils.mul(this.total, this.price.CNY).toFixed(0)
    }
  },
  created() {
    this.query = this.$route.query
    this.getPrice()
    this.getCartList()
  },
  methods:{
    getPrice(){
      api.price((res)=>{
        this.price = JSON.parse(res.price)
      })
    },
    getCartList () { // 获取购物车列表
      if (!this.getApiToken) {
        this.carts = []
        return
      }
      api.getCartsList((res) => {
        if (res.length === 0) {
          // 没有就自动添加个商品
          api.getProductList((datas) => {
            if (datas.length) {
              this.addToCart(datas[0])
            }
          }, (msg) => {
            Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
          })
        } else {
          this.carts = res
          this.num = res[0].productQuantity
          this.locked = false
        }
      }, (msg) => {
        this.locked = false
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    addToCart (item) {
      if (this.locked) {
        return
      }
      this.locked = true
      api.createCart({
        productId: item.productId,
        productQuantity: 1
      }, () => {
        this.getCartList()
      }, (msg) => {
        this.locked = false
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    updateCart (cartId, productQuantity) {
      if (!this.getApiToken) {
        return
      }
      api.updateCart({
        cartId: cartId,
        productQuantity: productQuantity
      }, () => {
        this.getCartList()
      }, (msg) => {
        this.locked = false
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    add () {
      if (!this.carts.length) {
        return
      }
      if (this.locked) {
        return
      }
      this.locked = true
      this.updateCart(this.carts[0].cartId, this.num + 1)
    },
    minus (item, index) {
      if (this.num === 1) {
        return
      }
      if (!this.carts.length) {
        return
      }
      if (this.locked) {
        return
      }
      this.locked = true
      this.updateCart(this.carts[0].cartId, this.num - 1)
    },
    createOrder () { // 创建订单
      let formData = {
        paytypeId: this.query.paytypeId,
        postage: 0
      }
      for (let i in this.formData) {
        formData[i] = this.formData[i]
      }
      api.createOrder(formData, (res) => {
        this.$router.push({name: 'page-qrpayment', query: {qrIndex: this.query.qrIndex, orderId: res.orderId}})
      }, (msg) => {
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    }
  },
  components:{
    Adjust,
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
      color:#999;
      background-color: transparent;
    }
    .price-adjust {
  display: flex;
  > div:nth-of-type(1) {
    width: 0.65rem;
    min-width: 0;
  }
  > div:nth-of-type(2) {
    flex: 1;
    min-width: 0;
  }
  > div:nth-of-type(3) {
    width: 0.65rem;
    min-width: 0;
  }
  .deduct, .add {
    display: block;
    height: 0.6rem;
    border:1px solid #ccc;
    background: url('../../../assets/img/deduct-icon.png') #fff  no-repeat center ;
    background-size: contain;
    &.active {
      background-color: #ccc;
    }
  }
  .add {
    background-image: url('../../../assets/img/add-icon.png');
  }
  input {
  	width: 100%;
  	height: 0.6rem;
  	line-height: 0.6rem;
  	text-align: center;
  	font-size: 0.3rem;
  	color: #333333;
  	background-color: #fff;
  	border-left: none;
  	border-right: none;
  	border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    margin-top:0!important;
  }
}
  }
}
.order-number {
  display: flex;
  > div {
    min-width: 0;
    &:first-of-type {
      flex: 5;
      line-height: 0.6rem;
    }
    &:last-of-type {
      flex: 4;
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
.address-selector {
  display: flex;
  margin-left: -0.15rem;
  margin-right: -0.15rem;
  > div {
    flex: 1;
    min-width: 0;
    padding-left: 0.15rem;
    padding-right: 0.15rem;
  }
}
</style>
