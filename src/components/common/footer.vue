<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item id="wallet" v-tap="{methods:$root.routeTo, to:'page-wallet'}">
      <img slot="icon" src="../../assets/img/qianbao_weixz@3x.png">
      <img slot="icon" src="../../assets/img/qianbao_xuanz@3x.png">
      {{ $t("message.compFooter.wallet") }}
    </mt-tab-item>
<!--交易-->
    <mt-tab-item id="trading" v-tap="{methods:$root.routeTo, to:'page-trading'}">
      <img slot="icon" src="../../assets/img/tradeX-icon@3x.png">
      <img slot="icon" src="../../assets/img/trade@3x.png">
      {{ $t("message.trade.trade") }}
    </mt-tab-item>
<!--挖矿-->
    <mt-tab-item id="dig" v-tap="{methods:$root.routeTo, to:'page-dig'}">
      <img slot="icon" src="../../assets/img/miningX@3x.png">
      <img slot="icon" src="../../assets/img/mining@3x.png">
      {{ $t("message.mining.mining") }}
    </mt-tab-item>
<!--口令-->
    <mt-tab-item id="command" v-tap="{methods:$root.routeTo, to:'page-command'}">
      <img slot="icon" src="../../assets/img/kouling_weixz@3x.png">
      <img slot="icon" src="../../assets/img/kouling_xuanz@3x.png">
      {{ $t("message.compFooter.command") }}
    </mt-tab-item>

    <mt-tab-item id="ucenter" v-tap="{methods:$root.routeTo, to:'page-ucenter'}">
      <i class="red-dot" v-if="getHasMessage"></i>
      <img slot="icon" src="../../assets/img/my_weixz@3x.png">
      <img slot="icon" src="../../assets/img/my_xuanz@3x.png">
      {{ $t("message.compFooter.ucenter") }}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui';
import { mapGetters, mapActions } from 'vuex'

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);


export default {
  name:'comp-footer',
  data(){
    return {
      selected:'wallet'
    }
  },
  mounted(){
    this.setTab()
  },
  watch:{
    $route(){
      this.setTab()
    }
  },
   computed:{
    ...mapGetters(['getHasMessage']),
  },
  methods:{
    setTab(){
      if(this.$route.path.indexOf('wallet')>-1){
        this.selected = 'wallet'
      }
      if(this.$route.path.indexOf('trading')>-1){
        this.selected = 'trading'
      }
      if(this.$route.path.indexOf('dig')>-1){
        this.selected = 'dig'
      }
      if(this.$route.path.indexOf('command')>-1){
        this.selected = 'command'
      }
      if(this.$route.path.indexOf('ucenter')>-1){
        this.selected = 'ucenter'
      }
    }
  },
}

</script>
<style type="text/css" lang="less">
.wrap .mint-tabbar {
  border-top: 1px solid #ecf1ee;
  background-color: #fff;
  background-image: none;
  > .mint-tab-item {
    color: #666666;
    padding: 0.14rem 0;
    background-color: #fff;
    .mint-tab-item-icon {
      width: 0.5rem;
      height: 0.5rem;
      img {
        object-fit: contain;
      }
    }
    img:last-of-type {
      display: none;
    }
    &.is-selected {
      background-color: #fff;
      color: #484B5A;
      img:first-of-type {
        display: none;
      }
      img:last-of-type {
        display: block;
      }
    }
    .mint-tab-item-label {
      font-size: 0.24rem;
    }
  }

}
.red-dot {position: absolute; right: 0.4rem; top: 0.2rem; background-color: red; width: 5px; height: 5px; border-radius: 50%;}
</style>
