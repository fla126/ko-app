<template>
  <div  class="page">
    <mt-header class="all-header common-mt-header" title="关于我们">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div  class="common-content box1 mt80">
      <div class="inner co-text-center">
         <img  src="../../assets/img/mycenter/i_logo.png"/>
        <p class="f30 ft-c-gray">软件介绍</p>
      </div>
    </div>



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
          <div class="item"><span class="f30">检查版本</span></div>
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
    name: "page-about"
  }
</script>

<style type="text/css" scoped>
.box1 img{
  width: 1.25rem;
  height: 1.24rem;
  display: inline-block;
}

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
