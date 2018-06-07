<template>
  <div  class="page">
    <mt-header class="all-header common-mt-header" title="关于我们">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div  class="common-content box1 mt80">
      <div class="inner co-text-center">
         <img  src="../../assets/img/mycenter/i_logo.png"/>
        <p class="f30 ft-c-gray">软件介绍</p>
      </div>
    </div>

    <div  class="common-content bg-white mt100">
       <div class="inner">
         <mt-cell class="common-mt-cell ft-c-gray" title="用户协议"></mt-cell>
         <mt-cell class="common-mt-cell ft-c-gray" title="隐私条款"></mt-cell>
         <mt-cell class="common-mt-cell ft-c-gray" title="加入我们"></mt-cell>
         <mt-cell class="common-mt-cell ft-c-gray" title="检查版本"></mt-cell>
       </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Header } from 'mint-ui';
  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
  export default {
    name: "page-about"
  }
</script>

<style type="text/css" scoped>
.box1 img{
  width: 1.25rem;
  height: 1.24rem;
  display: inline-block;
}

</style>
