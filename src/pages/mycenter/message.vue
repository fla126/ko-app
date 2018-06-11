<template>
  <div id="uinfo" class="page wrap">
    <mt-header class="common-mt-header" title="消息">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button class="f30"  slot="right">全部</mt-button>
    </mt-header>

    <div class="w-content m-box1">
      <div class="inner">
             <section class="item">
                  <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
                  <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
             </section>
      </div>
    </div>

    <div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div>

    <div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div><div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div><div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div><div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div><div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
      </div>
    </div><div class="w-content m-box1">
      <div class="inner">
        <section class="item">
          <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
          <div><p class="bottom">您在2018.08.09-13:14分转账至某某某钱包已成功，请注意查看 您的转账记录。</p></div>
        </section>
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

<style type="text/css" scoped >
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
