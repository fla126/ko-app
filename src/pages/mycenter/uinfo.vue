<template>
  <div id="uinfo" class="page">
    <mt-header class="common-mt-header" title="个人信息">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">用户协议</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">隐私条款</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">加入我们</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">常用地址</span></div>
        </div>
      </div>
    </div>

    <div  class="common-content bg-white mt50 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">修改登录密码</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">退出登录</span></div>
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
        name: "page-uinfo"
    }
</script>

<style type="text/css" scoped >
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
