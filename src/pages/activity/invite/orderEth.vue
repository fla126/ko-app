<template>
  <div class="page">
    <comp-top-back :class="'line'">ETH购买</comp-top-back>
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
            <p class="mt20 text-right ft-c-gray30">{{total}}ETH</p>
          </div>
        </li>
        <li>
          <span class="arrow-down"></span>
          <p>选择所在地区:</p>
          <select class="mt20" v-model="formData.country">
            <option name="area" v-for="(item, index) in countries" :key="index" :value="item.code">
              {{getLang==='zhCHS'?item.cn:item.en}}
            </option>
          </select>
        </li>
        <!--
        <li>
          <p class="text-right ft-c-gray30 d20">非大陆地区收取0.05ETH邮寄费。</p>
          <p class="mt30">请填写您的官网（tinkey.io）账号：</p>
          <input type="text" v-model="formData.account" name="username" placeholder="账号名">
        </li>
        -->
        <li>
          <p class="text-right ft-c-gray30 d20">您可以在tinkey.io跟踪您的订单状态。</p>
          <p class="mt30">请填写您的ETH钱包地址：</p>
          <p class="rp"><input type="text" v-model="formData.ethurl" name="username" placeholder="钱包地址"><i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p class="text-right ft-c-gray30 d20">我们将按照此地址为您发放奖励。</p>
          <p class="mt30">我们将按照以下方式给您邮寄： </p>
          <p class="mt20">收货人姓名：</p>
          <input type="text" v-model="formData.username" name="username" placeholder="收货人姓名">
        </li>
        <li>
          <p>联系方式：</p>
          <input type="text" v-model="formData.contactPhone" name="mobile" placeholder="联系方式">
        </li>
        <li>
          <p>收货地址：</p>
          <input type="text" v-model="formData.street" name="mobile" placeholder="收货地址">
        </li>
      </ul>
      <div class="step-next">
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
import { Toast } from 'mint-ui'

export default {
  name:'page-ordereth',
  data(){
    return {
     num:1,
     paytypeId: 1,
     option: [],
     datas: [],
     carts: [],
     countries: [],
     costData: {},
     formData: {
       country: 'China',
       // account: '',
       username: '',
       ethurl: '',
       contactPhone: '',
       street: ''
     },
    }
  },
  mounted(){
    // this.initFocusEvent()
  },
  computed:{
    ...mapGetters(['getLang', 'getApiToken']),
    total () {
      let t = 0
      this.carts.forEach((item) => {
        t = numUtils.mul(item.discountPrice, item.productQuantity).add(t)
      })
      return numUtils.add(t, this.costData.postage).toFixed(2)
    },
    costsParamsChange () {
      return {
        code: this.formData.country,
        paytypeId: this.paytypeId
      }
    },
    countryName () {
      for (let i = 0; i < this.countries.length; i++) {
        let d = this.countries[i]
        if (d.code === this.formData.country) {
          return d.cn
        }
      }
      return ''
    }
  },
  watch: {
    costsParamsChange () {
      this.costsChange()
    }
  },
  created() {
    this.getCountriesList()
    this.getCartList()
    this.costsChange()
  },
  methods:{
    scanning(args){
      this.$root.scanner((data)=>{
        console.log(data)
        var QRdata = data.text
        if(data.format=='QR_CODE' && this.$root.isAddress('ETH', QRdata)){
          this.formData.ethurl = QRdata
        } else {
          Toast(this.$t('message.walletDetail.mismatchingCurrency'))
        }
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
    getCountriesList () { // 获取国家
      api.getCountriesList((res) => {
        this.countries = res
      })
    },
    createOrder () { // 创建订单
      let formData = {
        paytypeId: this.paytypeId,
        postage: this.costData.postage
      }
      for (let i in this.formData) {
        formData[i] = this.formData[i]
      }
      formData.country = this.countryName
      api.createOrder(formData, (res) => {
        this.$router.push({name: 'page-ethpayment', query: {orderId: res.orderId}})
      }, (msg) => {
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    costsChange () {
      api.conpostage(this.costsParamsChange, (res) => {
        this.costData = res
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
.d20 {margin-top: -0.2rem;}
.order-form {
  li {
    position: relative;
    padding-top: 0.35rem;
    padding-bottom: 0.15rem;
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
    select {
      width: 100%;
      border:none;
      font-size: 0.3rem;
      background-color: transparent;
      -webkit-appearance: none;
      height: 0.5rem;
      color:#999;
    }
    .arrow-down {
      position: absolute;
      width: 0.17rem;
      height: 0.32rem;
      background: url('../../../assets/img/mycenter/i_nav_right.png') no-repeat center;
      background-size: contain;
      transform: rotate(90deg);
      right: 0.1rem;
      top: 0.95rem;
      opacity: 0.6;
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
  margin-top: 0.5rem;
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
.scanning {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  bottom: 0;
  background: url('../../../assets/img/SAOYISAO_ICON@3x.png') no-repeat center;
  background-size: auto 100%;
}
</style>
