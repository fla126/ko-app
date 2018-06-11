<template>
  <div id="uinfo" class="page wrap">
    <mt-header class="common-mt-header" title="个人信息">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">账号</span></div>
          <div class="item"><span class="f30">Vivining</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">硬件钱包ID</span></div>
          <div class="item"><span class="f30">usbtkey123456</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">钱包数量</span></div>
          <div class="item"><span class="f30">27</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">常用地址</span><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          <div class="item"><img class="nav_right" src="../../assets/img/mycenter/i_nav_right.png"/></div>
        </div>
      </div>
    </div>

    <div  class="common-content bg-white mt50 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">修改登录密码</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">退出登录</span></div>
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

<style type="text/css" lang="less" scoped >
  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom: .02rem solid #ecedee;
    .item{
      width: 50%;
    }
    .item:first-child{
      img.nav_right{
        margin-left: .2rem;
        width: .26rem;
        height: .26rem;
      }
    }
    .item:nth-child(2){
      text-align: right;
      img.nav_right{
        width: .17rem;
        height: .32rem;
      }
    }
  }
  .box-cont:last-child{
    border-bottom:0;
  }

</style>
