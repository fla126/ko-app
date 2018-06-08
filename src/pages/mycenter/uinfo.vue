<template>
  <div id="uinfo" class="page">
    <mt-header class="common-mt-header" title="个人信息">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div  class="common-content bg-white mt50">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray" title="用户协议" value="Vivining"></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="隐私条款" value="usbtkey123456"></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="加入我们" value="27"></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="常用地址" icon="field-warning" is-link></mt-cell>
      </div>
    </div>

    <div  class="common-content bg-white mt50">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray" title="修改登录密码" is-link></mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="退出登录"  is-link></mt-cell>
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
  #uinfo {

  }
  #uinfo .all-header .mintui-back{
    font-size: 0.4rem;
    color: #7f7f7f;
  }


  .all-header{
    height: .95rem;
    background-color: white;
    border-bottom:.01rem solid #e4e5e7;
  }
  .all-header .right img{
    width: .4rem;
    height: .4rem;
  }
  .all-header h1{
    font-size: .36rem;
    color: #333333;
  }
  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }

  .w-content>.inner{
    padding: 0 .2rem;
  }

  .w-content a.w-box1{
    margin-top: .4rem;
  }

  .w-content a.w-box1 .mint-cell-title img{
    height:.3rem;
    width: .4rem;
  }
  .w-content  a.w-box2 .mint-cell-title img{
    height:.34rem;
    width: .34rem;
  }
  .w-content a.w-box3 .mint-cell-title img{
    height:.34rem;
    width: .4rem;
  }
  .w-content a.w-box4 .mint-cell-title img{
    height:.34rem;
    width: .34rem;
  }

  /*帮助*/
  .w-content a.w-box5 .mint-cell-title img{
    height:.38rem;
    width: .32rem;
  }
  .w-content a.w-box6 .mint-cell-title img{
    height:.36rem;
    width: .34rem;
  }
  .w-item .mint-cell-title .mint-cell-text{
    font-size: .3rem;
  }

  .w-content .mint-cell{
    min-height: .85rem;
    border-bottom: .01rem solid #ecedee;
  }

</style>
