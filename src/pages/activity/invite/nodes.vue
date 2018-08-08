<template>
  <div class="page">
    <comp-top-back :class="'line'">超级节点选择</comp-top-back>
    <div class="page-main">
      <div class="node-list">
        <div v-for="(item, index) in datas" :key="index">
          <div v-tap="{methods:$root.routeTo, to:'page-order', params:{qrIndex:index,paytypeId:item.paytypeId}}">
            <span>超级节点{{index+1}}</span>
            <span v-if="index<=1">仅支持微信支付<i class="wechat"></i></span>
            <span v-if="index>=2">仅支持支付宝支付<i class="zfb"></i></span>
          </div>
          <div v-if="index<=1"  @click.stop="wechat=true"><i class="add"></i></div>
          <div v-if="index>=2" @click.stop="zfb=true"><i class="add"></i></div>
        </div>
      </div>
    </div>
    <mask-layer :isgray="true" :show="wechat" @hide="()=>{wechat=false}">
      <div class="qr-container">
        <img src="../../../assets/img/activity/invite/qr_wechat_add.jpg">
        <p class="mt35 f28 text-center ft-c-gray">扫码添加超级节点好友 </p>
      </div>
    </mask-layer>
    <mask-layer :isgray="true" :show="zfb" @hide="()=>{zfb=false}">
      <div class="qr-container">
        <img src="../../../assets/img/activity/invite/qr_zfb_add.jpg">
        <p class="mt35">扫码添加超级节点好友 </p>
      </div>
    </mask-layer>
  </div>
</template>

<script>
import api from '@/api/activity'
import Tip from '@/components/common/tip'
export default {
  name:'page-nodes-select',
  data(){
    return {
     wechat:false,
     zfb:false,
     datas: []
    }
  },
  computed:{
    
  },
  created() {
    this.getSuperNode()
  },
  methods:{
    getSuperNode () {
      api.conSuperNode((res) => {
        this.datas = res
      }, (msg) => {
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    }
  },
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
}
.node-list {
  > div {
    margin-top: 0.2rem;
    padding: 0.35rem 0.4rem;
    color:#666;
    font-size: 0.32rem;
    background-color: #fff;
    display: flex;
    > div:first-of-type {
      display: flex;
      flex: 1
    }
    > div:last-of-type {
      width: 0.55rem;
    }
    span {
      min-width: 0;
    }
    span:first-of-type {
      flex: 2;
      position: relative;
      padding-left: 0.5rem;
      &:before{
        content: '';
        position: absolute;
        left: 0;
        top: 0.06rem;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #4d7bf3;
        border-radius: 50%;
      }
      &:after{
        content: '';
        position: absolute;
        left: 0.07rem;
        top: 0.134rem;
        width: 0.15rem;
        height: 0.15rem;
        background-color: #fff;
        border-radius: 50%;
      }
    }
    span:last-of-type {
      flex: 3;
      text-align: right;
      font-size: 0.24rem;
    }
    i{
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      vertical-align: middle;
      &.wechat {
        width: 0.55rem;
        height: 0.45rem;
        background-image: url('../../../assets/img//activity/invite/wechat.png')
      }
      &.zfb {
        width: 0.4rem;
        height: 0.4rem;
        margin-left: 0.08rem;
        margin-right: 0.07rem;
        background-image: url('../../../assets/img//activity/invite/zfb.png')
      }
      &.add {
        width: 0.45rem;
        height: 0.45rem;
        margin-left: 0.1rem;
        background-image: url('../../../assets/img//activity/invite/add-friend.png')
      }
    }
  }
}
.qr-container {
  position: absolute;
  width: 3.75rem;
  height: 4.5rem;
  padding: 0.3rem 0.4rem 0.2rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-70%);
  background-color: #fff;
  border-radius: 5px;
  img {
    width: 100%;
    display: block;
  }
}
</style>
