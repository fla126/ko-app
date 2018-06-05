<template>
  <div id="uinfo" class="page">
    <mt-header class="all-header" title="个人信息">
    </mt-header>

    <div class="w-content m-box1">
      <div class="inner">
        <mt-cell class="w-item w-box1" title="帐号"  value="Vivining" >
        </mt-cell>
        <mt-cell class="w-item w-box2" title="硬件钱包ID"  value="usbtkey123456">
        </mt-cell>
        <mt-cell class="w-item w-box3" title="钱包数量" value="27" >
        </mt-cell>
        <mt-cell class="w-item w-box4" icon="field-warning" title="常用地址"   is-link >
        </mt-cell>

      </div>
    </div>

    <div class="w-space"></div>

    <div class="w-content m-box2">
      <div class="inner">
        <mt-cell class="w-item w-box5" title="修改登录密码"  >
        </mt-cell>
        <mt-cell class="w-item w-box6" title="退出登录"  >
        </mt-cell>
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

<style type="text/css" scoped>
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
