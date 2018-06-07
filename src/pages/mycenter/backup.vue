<template>
  <div id="uinfo" class="page">
    <mt-header class="uinfo-header" title="备份">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="w-content m-box1">
      <div class="inner">
        <mt-cell class="w-item w-box4"  title="云备份"   is-link ></mt-cell>
        <mt-cell class="w-item w-box4"  title="二维码备份"   is-link ></mt-cell>
        <mt-cell class="w-item w-box4"  title="ABKEY备份"   is-link ></mt-cell>


      </div>
    </div>

    <div class="w-space"></div>

    <div class="w-content m-box2">
      <div class="inner">
        <mt-cell class="w-item w-box5" title="修改交易密码"  >
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

<style type="text/css" >
  #uinfo .uinfo-header{
    height: .95rem;
    background: white;
    border-bottom:.01rem solid #e4e5e7;
  }
  .uinfo-header .right img{
    width: .4rem;
    height: .4rem;
  }
  .uinfo-header h1{
    font-size: .36rem;
    color: #333333;
    font-weight: 600;
  }

  .uinfo-header .mintui-back{
    font-size: 0.4rem;
    color: #7f7f7f;
  }
  .uinfo-header .mint-button-text{
    font-size: .3rem;
    color: #333333;
  }

  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box1 .item{
    padding: .1rem;
    margin-top: .3rem;

  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }

  .m-box3{
    margin-top: .45rem;
  }

  .m-box3>.inner{
    padding: 0 .2rem;
  }
  .m-box3 h1{
    font-size: .24rem;
    color:#666666
  }

  .m-box3 ul li{
    font-size: .22rem;
    color:#999999;
    line-height: .5rem;
  }

  .m-box1 .item .left{
    font-size: .24rem;
    font-weight: bold;
    line-height: .4rem;
  }
  .m-box1 .item .right{
    font-size: .2rem;
    line-height: .4rem;
    float: right;
  }
  .m-box1 .item .bottom{
    font-size: .24rem;
    color: #333333;
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
