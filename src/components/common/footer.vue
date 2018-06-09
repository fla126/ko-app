<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item id="wallet" v-tap="{methods:$root.routeTo, to:'page-wallet'}">
      <img slot="icon" src="../../assets/img/qianbao_weixz@3x.png">
      <img slot="icon" src="../../assets/img/qianbao_xuanz@3x.png">
      {{ $t("message.compFooter.wallet") }}
    </mt-tab-item>
    <mt-tab-item id="command" v-tap="{methods:$root.routeTo, to:'page-command'}">
      <img slot="icon" src="../../assets/img/kouling_weixz@3x.png">
      <img slot="icon" src="../../assets/img/kouling_xuanz@3x.png">
      {{ $t("message.compFooter.command") }}
    </mt-tab-item>
    <mt-tab-item id="ucenter" v-tap="{methods:$root.routeTo, to:'page-ucenter'}">
      <img slot="icon" src="../../assets/img/my_weixz@3x.png">
      <img slot="icon" src="../../assets/img/my_xuanz@3x.png">
      {{ $t("message.compFooter.ucenter") }}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabItem } from 'mint-ui';

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

  },
  watch:{
    $route(){
      if(this.$route.name.indexOf('wallet')>-1){
        this.selected = 'wallet'
      }
      if(this.$route.name.indexOf('command')>-1){
        this.selected = 'command'
      }
      if(this.$route.name.indexOf('ucenter')>-1){
        this.selected = 'ucenter'
      }

    }
  },
  methods:{
  },
}

</script>
<style type="text/css" lang="less">
.wrap .mint-tabbar {
  border-top: 1px solid #ecf1ee;
  background-color: #fff;
  > .mint-tab-item {
    color: #666666;
    padding: 0.14rem 0;
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

</style>
