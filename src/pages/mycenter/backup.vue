<template>
  <div id="uinfo" class="page">
    <mt-header class="common-mt-header" title="备份">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="common-content bg-white">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray"  title="云备份"   is-link ></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray"  title="二维码备份"   is-link ></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray"  title="ABKEY备份"   is-link ></mt-cell>
      </div>
    </div>
    <div class="common-content bg-white mt60">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray" title="修改交易密码"  >
        </mt-cell>
      </div>
    </div>

    <!--  说明文字 -->
    <div class="m-box3">
        <div class="inner">
          <h1>重要提示：</h1>
          <ul>
            <li>1. 软件和服务器不保存您的交易密码，一旦丢失将无法找回。</li>
            <li>2. 三种备份均需要记住交易密码。交易密码一旦丢失备份也将失效。</li>
            <li>3. 请妥善保管交易密码。</li>
          </ul>
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

<style type="text/css" scoped  >
  .m-box3{margin-top: .45rem;}
  .m-box3>.inner{padding: 0 .2rem;}
  .m-box3 h1{font-size: .24rem;color:#666666}
  .m-box3 ul li{font-size: .22rem;color:#999999;line-height: .5rem;}
</style>
