<template>
  <div id="uinfo" class="page">
    <mt-header class="common-mt-header" title="帮助">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="common-content   bg-white mt40">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray"  title="新手必读"   is-link ></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray"  title="钱包备份"   is-link ></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray"  title="钱包使用"   is-link ></mt-cell>
      </div>
    </div>


    <div class="common-content  bg-white mt40">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray" title="常见问题"  > </mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="联系我们"  > </mt-cell>
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
    name: "page-msg"
  }
</script>

<style type="text/css"  scoped>

</style>
