<template>
  <div id="setup" class="page wrap">
    <mt-header class="common-mt-header" title="设置">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30">多语言</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">货币单位</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">WEB3</span></div>
        </div>
      </div>
    </div>

    <div class="w-space"></div>

    <div class="common-content bg-white mt60">
      <div class="inner">
        <mt-field class="common-mt-field"   placeholder="管理币种" v-model="captcha">
          <img class="i-search" src="../../assets/img/mycenter/i_search.png" >
        </mt-field>
        <mt-checklist class="common-clear-style"
          align="right"
          v-model="value"
          :options="options">
        </mt-checklist>
      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Header } from 'mint-ui';
  import { Field } from 'mint-ui';
  import { Checklist } from 'mint-ui';


  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
  Vue.component(Field.name, Field);
  Vue.component(Checklist.name, Checklist);
  export default {
    name:'page-ucenter-setup',
    data(){
      return {
        captcha:'',
        value:[],
        options : [
          {
            label: 'BTC',
            value: 'BTC'
          },
          {
            label: 'ETH',
            value: 'ETH'
          },
          {
            label: 'ZEC',
            value: 'ZEC'
          },{
            label: 'SNT',
            value: 'SNT'
          }
        ]
      }
    },
    mounted(){
      $(".common-clear-style").find(".mint-cell-wrapper:last").css('border-bottom','none')
    },
    created(e){

    },
    methods:{

    },
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
