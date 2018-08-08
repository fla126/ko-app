<template>
  <div class="page">
    <comp-top-back>我的Tinkey</comp-top-back>
    <div class="page-main">
      <div class="bgc-container">
        <span>已购Tinkey数量</span>
        <span class="text-right"><strong>{{tinkeyParams.total}}</strong>个</span>
      </div>
      <div class="block" style="margin-top: 1.55rem;">
        <p>Tinkey{{$t('message.activity.myTinkey.number')}}<!--编号-->:</p>
        <p :class="{mt10:index===0}" v-for="(item, index) in datas" :key="index">{{item.tinkeyNumber}}</p>
      </div>
      <h2 class="buy-records">购买记录</h2>
      <div class="block-records" v-for="(item, index) in orderDatas" :key="index">
        <div class="clearfix">
          <div class="pull-left">
            <p>{{$t('message.activity.myTinkey.creationTime')}}<!--订单创建时间-->:{{item.createdAt}}</p>
            <p class="mt5">{{$t('message.activity.myTinkey.trackingNumber')}}<!--快递单号-->:{{item.expressNumber||'--'}}</p>
          </div>
          <div class="pull-right"><span class="status active">{{getState(item.state)}}</span></div>
        </div>
        <div class="info">
          <table>
            <thead>
              <tr>
                <th>{{$t('message.activity.myTinkey.goods')}}<!--货物--></th>
                <th>{{$t('message.activity.myTinkey.quantity')}}<!--数量--></th>
                <th>{{$t('message.activity.myTinkey.amount')}}<!--金额--></th>
                <th>{{$t('message.activity.myTinkey.tinkeyID')}}<!--Tinkey ID--></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index2) in item.orderDetailList" :key="index2">
                <td>{{data.productName}}</td>
                <td>{{data.productQuantity}}</td>
                <td>{{data.totalPrice}}ETH</td>
                <td>{{data.tinkeyId}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="address">
          <div class="clearfix">
            <span class="pull-left">{{$t('message.activity.myTinkey.name')}}<!--收货人姓名-->：{{item.receiverName}}</span>
            <span class="pull-right">{{$t('message.activity.myTinkey.phoneNumber')}}<!--电话-->：{{item.receiverPhone}}</span>
          </div>
          <p class="mt5">{{$t('message.activity.myTinkey.detailedAddress')}}<!--地址-->：{{item.receiverAddress}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tip from '@/components/common/tip'
import api from '@/api/activity'
export default {
  name:'page-mytinkey',
  data(){
    return {
      tinkeyParams: {
        page: 1,
        show: 5,
        total: 0
      },
      params: {
        page: 1,
        show: 5,
        total: 0
      },
      datas: [],
      orderDatas: []
    }
  },
  computed: {
    ...mapGetters(['getApiToken'])
  },
  created() {
     this.getMyTinkeyList()
  },
  methods:{
    getMyTinkeyList () {
      if (!this.getApiToken) {
        this.tinkeyParams.page = 1
        this.datas = []
        return
      }
      api.getMyTinkeyList(this.tinkeyParams.page, this.tinkeyParams.show, (datas, res) => {
        this.datas = datas
        this.tinkeyParams.total = res.total
        this.getMyOrderList()
      })
    },
    getMyOrderList () {
      if (!this.getApiToken) {
        this.params.page = 1
        this.orderDatas = []
        return
      }
      api.getMyOrderList(this.params.page, this.params.show, (datas, res) => {
        this.orderDatas = datas
        this.params.total = res.total
      })
    },
    getState (state) {
      state = Number(state)
      switch (state) {
        case 1:
          return this.$t('message.activity.myTinkey.unpaid') // 待确认
        case 2:
          return this.$t('message.activity.myTinkey.paidAndUnshipped') // 已付款未发货
        case 3:
          return this.$t('message.activity.myTinkey.shipped') // 已发货
        case 4:
          return this.$t('message.activity.myTinkey.delivered') // 已验收
        case 5:
          return this.$t('message.activity.myTinkey.returned') // 已退回
        default:
          return '--'
      }
    }
  },
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.bgc-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 2.65rem;
  padding: 0.7rem 0.75rem;
  background-color: #4d7bf3;
  font-size: 0.36rem;
  color:#fff;
  display: flex;
  > span {
    flex: 1;
    min-width: 0;
  }
}
.block {
  position: relative;
  margin-top: 1.55rem;
  padding: 0.4rem 0.45rem;
  border-radius: 4px;
  background-color: #fff;
  min-height: 2rem;
  font-size: 0.3rem;
  box-shadow: 0 3px 10px rgba(102,102,102,0.2);
  z-index: 1;
  p{
    color:#999;
    line-height: 0.45rem;
  }
}
.buy-records {
  margin-top: 0.7rem;
  font-size: 0.36rem;
  padding-left: 0.45rem;
}
.block-records {
  position: relative;
  margin-top: 0.35rem;
  padding: 0.25rem 0.45rem;
  border-radius: 4px;
  background-color: #fff;
  min-height: 2rem;
  font-size: 0.24rem;
  color:#999;
  box-shadow: 0 3px 10px rgba(102,102,102,0.2);
  z-index: 1;
  > div {
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.1rem;
    margin-top: 0.1rem;
    &:last-of-type {
      border-bottom: none;
    }
  }
  .status {
    font-size: 0.32rem;
    color:#ee475b;
    &.active {
      color:#00cc33;
    }
  }
  .info table {
    text-align: left;
    th {
      min-width: 1rem;
    }
    td {
      padding-top: 0.05rem;
    }
  }
}
</style>
