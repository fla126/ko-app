<template>
  <div class="page">
    <comp-top-back :class="'line'">购买Tinkey</comp-top-back>
    <div class="page-main">
      <div class="node-list">
        <div class="eth" v-tap="{methods:$root.routeTo, to:'page-ordereth'}">ETH钱包支付</div>
        <div class="node" v-tap="{methods:$root.routeTo, to:'page-nodes-select'}">超级节点代付 <p class="f24 mt5 ft-c-gray30">仅支持中国大陆地区、支付宝和微信支付</p></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'page-mall',
  data(){
    return {
     account:''
    }
  },
  computed:{
    
  },
  methods:{
    
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
    padding: 0.6rem 0.9rem;
    color:#666;
    font-size: 0.32rem;
    &.eth {
      background: url('../../../assets/img//activity/invite/ETH.png') #fff no-repeat 90% center;
      background-size: auto 70%;
    }
    &.node {
      background: url('../../../assets/img//activity/invite/node.png') #fff no-repeat 90% center;
      background-size: auto 70%;
    }
  }
}

</style>
