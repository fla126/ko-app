<template>
  <div id="uinfo" class="page">
    <mt-header class="common-mt-header" title="备份">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-msg'}">
          <div class="item"><span class="f30">云备份</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-record'}">
          <div class="item"><span class="f30">二维码备份</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-uwallet'}">
          <div class="item"><span class="f30">ABKEY备份</span></div>
        </div>
      </div>
    </div>

    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">修改交易密码</span></div>
        </div>
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
    name: "page-backup",
    methods:{
      routeTo(args){
        this.$router.push({ name: args.to})
      }
    }
  }
</script>

<style type="text/css" scoped  >
  .m-box3{margin-top: .45rem;}
  .m-box3>.inner{padding: 0 .2rem;}
  .m-box3 h1{font-size: .24rem;color:#666666}
  .m-box3 ul li{font-size: .22rem;color:#999999;line-height: .5rem;}

  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom: .05rem solid #f9f9f9;
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
