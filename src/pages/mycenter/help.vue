<template>
  <div id="uinfo" class="page wrap" >
    <mt-header class="common-mt-header" title="帮助">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">新手必读</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">钱包备份</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">钱包使用</span></div>
        </div>
      </div>
    </div>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">常见问题</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">联系我们</span></div>
        </div>
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
    name: "page-help"
  }
</script>

<style type="text/css"  scoped>
  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom: .02rem solid #ecedee;
  .item:first-child{
    width: .4rem;
  }
  .item{
    height: .4rem;
  span{
    line-height: .4rem;
    margin-left: .3rem;
  }
  }
  }
  .box-cont:last-child{
    border-bottom:0;
  }
</style>
