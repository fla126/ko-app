<template>
  <div id="uwallet" class="page">
    <mt-header class="all-header common-mt-header" title="钱包">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>

      <router-link class="u-icon-right" to="/addwallet" slot="right">
        <img src="../../assets/img/mycenter/i_nav_add.png"/>
      </router-link>
    </mt-header>


    <div class="uwallet-box ">
      <h1 class="uwallet-h1 mt25">ETH</h1>
      <div class="uwallet-content w-content m-box1 mt25 f24">
        <div class="inner">
          <section class="one">
              <span >VIVINING</span>
              <span>V6237WTGDEIVINING</span>
              <span><mt-button size="small" type="danger">冻结</mt-button></span>
          </section>
          <section class="one">
            <span >VIVINING</span>
            <span>V6237WTGDEIVINING</span>
            <span><mt-button size="small" type="primary">解冻</mt-button></span>
          </section>
          <section class="one">
            <span >VIVINING</span>
            <span>V6237WTGDEIVINING</span>
            <span><mt-button size="small" type="danger">冻结</mt-button></span>
          </section>
        </div>
      </div>
    </div>

    <div class="uwallet-box">
      <h1 class="uwallet-h1 mt25">ETH</h1>
      <div class="uwallet-content w-content m-box1 mt25 f24">
        <div class="inner">
          <section class="one">
            <span >VIVINING</span>
            <span>V6237WTGDEIVINING</span>
            <span><mt-button size="small" type="danger">冻结</mt-button></span>
          </section>
          <section class="one">
            <span >VIVINING</span>
            <span>V6237WTGDEIVINING</span>
            <span><mt-button size="small" type="primary">解冻</mt-button></span>
          </section>
          <section class="one">
            <span >VIVINING</span>
            <span>V6237WTGDEIVINING</span>
            <span><mt-button size="small" type="danger">冻结</mt-button></span>
          </section>
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
        name: "page-uwallet"
    }
</script>

<style type="text/css" scoped >

  .uwallet-content .one{
    display: flex;
    justify-content: space-between;
    border-bottom: .01rem solid #ecedee;
    padding: 0.2rem 0rem;
  }
  .uwallet-content .one span{
     line-height: 33px;
  }
  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }

  .uwallet-box h1{
    padding-left: .2rem;
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
