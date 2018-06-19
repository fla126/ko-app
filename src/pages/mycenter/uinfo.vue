<template>
  <div id="uinfo" class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.uinfo.userInfo')}}
    </comp-top-back>

    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.uinfo.account')}}</span></div>
          <div class="item"><span class="f30">Vivining</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.uinfo.tinkeyId')}}</span></div>
          <div class="item"><span class="f30">usbtkey123456</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.uinfo.walletNum')}}</span></div>
          <div class="item"><span class="f30">27</span></div>
        </div>
        <div class="box-cont " @click="isdown=!isdown" >
          <div class="item"><span class="f30">{{$t('message.uinfo.addr')}}</span><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          <div class="item" > <img  :class="[{nav_right:true},{isdown:isdown}]" src="../../assets/img/mycenter/i_nav_right.png"/></div>

        </div>

      </div>
    </div>
    <transition enter-active-class="animated short fadeIn" >
        <ul v-show="isdown" class="address_ul f24 mt10" >
          <li><span>大壳子</span><span>BTC2</span><span>dweyfwef......sd123456</span></li>
          <li><span>大壳子</span><span>BTC2</span><span>dweyfwef......sd123456</span></li>
          <li><span>大壳子</span><span>BTC2</span><span>dweyfwef......sd123456</span></li>
        </ul>
    </transition>
    <div  class="common-content bg-white  ft-c-gray " :class="[isdown ? 'mt10' : 'mt40']">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">{{$t('message.uinfo.updatePwd')}}</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">{{$t('message.uinfo.logOut')}}</span></div>
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
        name: "page-uinfo",
       data(){
          return {
            isdown:false,
          }
       },
      methods:{
       /* isdownFun(){

        }*/
      }
    }
</script>

<style type="text/css" lang="less" scoped >
  img{}
  img.isdown{
    transform: rotate(90deg);
    transform-origin: 25% 50%;
    transition: transform .2s ease-in;
  }



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
        transform-origin: 25% 50%;
        transition: transform .2s ease-in;
        width: .17rem;
        height: .32rem;
      }
    }
  }
  .box-cont:last-child{
    border-bottom:0;
  }

  .address_ul{
    padding: 0 .3rem;

    li{
      display: flex;
      justify-content: space-between;

      span{
        line-height: .45rem;
      }
    }

  }

</style>
