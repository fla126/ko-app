<template>
  <div  class="page wrap">
    <mt-header class="all-header common-mt-header" :title="$t('message.about.aboutUs')">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>


    <div  class="common-content box1 mt90">
      <div class="inner co-text-center">
         <img  src="../../assets/img/mycenter/i_logo.png"/>
        <p class="f30 ft-c-gray mt30">{{$t('message.about.introduce')}}</p>
      </div>
    </div>

    <div class="common-content bg-white mt190 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.about.terms')}}</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.about.privacy')}}</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.about.joinus')}}</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.about.version')}}</span><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          <div class="item"></div>
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

<style type="text/css" lang="less" scoped>
.box1 img{
  width: 1.25rem;
  height: 1.24rem;
  display: inline-block;
}

.box-cont{
  display: flex;
  align-items: center;
  height: .85rem;
  border-bottom: .02rem solid #ecedee;
.item{
  width: 50%;
}
.item:nth-child(1){
  img.nav_right{
    width: .26rem;
    height: .26rem;
    margin-left: .1rem;
  }
}
}
.box-cont:last-child{
  border-bottom:0;
}




</style>
