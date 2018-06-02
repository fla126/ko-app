<template>
  <mt-tabbar v-model="selected" :fixed="true">
    <mt-tab-item id="wallet">
      <img slot="icon" src="../../assets/img/qianbao_xuanzhong@3x.png">
      tab1
    </mt-tab-item>
    <mt-tab-item id="command">
      <img slot="icon" src="../../assets/img/qianbao_xuanzhong@3x.png">
      tab2
    </mt-tab-item>
    <mt-tab-item id="ucenter">
      <img slot="icon" src="../../assets/img/qianbao_xuanzhong@3x.png">
      tab3
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
}

</script>
<style type="text/css" lang="less">
.mint-tabbar {
  background-color: #ff0;
}
</style>