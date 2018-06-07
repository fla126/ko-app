<template>
  <div id="setup" class="page">
    <mt-header class="all-header common-mt-header" title="设置">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="w-content m-box1">
      <div class="inner">
        <mt-cell class="w-item w-box1" title="多语言"   is-link   to="/message" >
        </mt-cell>
        <mt-cell class="w-item w-box2" title="货币单位"  >
        </mt-cell>
        <mt-cell class="w-item w-box3" title="WEB3"  >
        </mt-cell>
      </div>
    </div>

    <div class="w-space"></div>

    <div class="w-content m-box2 b-manger">
      <div class="inner">
        <mt-field   placeholder="管理币种" v-model="captcha">
          <img class="i-search" src="../../assets/img/mycenter/i_search.png" >
        </mt-field>
        <mt-checklist
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
    name:'page-ucenter',
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

    },
    methods:{

    },
  }

</script>
<style type="text/css" lang="less" >
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
  }
  .b-manger .mint-field-core{
    font-size: .3rem;
  }
  .b-manger .mint-checkbox-label{
    font-size: .24rem;
    color: #333333;
  }

  .b-manger .mint-checkbox-input:checked + .mint-checkbox-core{
    background-color: #00cc33;
    border-color: #00cc33;
  }
  .b-manger .i-search{
    width: .34rem;
    height: .33rem;
  }
  .w-content>.inner{
    padding: 0 .2rem;
  }
  .wallet-cell {
    margin-top: .4rem;
    min-height: 1.8rem;
    background-color: #4D7BF3;
    color: white;
  }

  .wallet-cell .mint-cell-title img{
    width: .54rem;
    height: .46rem;
  }
  .wallet-cell .mint-cell-title .mint-cell-text{
    font-size: .36rem;
  }
  .wallet-cell .mint-cell-title .mint-cell-label{
    font-size: .24rem;
  }
  .mint-cell-title  .mint-cell-label{
    color: #becffa;
  }
  .wallet-cell .mint-cell-allow-right::after{
    width: .31rem;
    height: .31rem;
    border-color: white;
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

  .w-content .mint-cell-title .mint-cell-text{
    margin-left: 0rem;
  }

  .w-item .mint-cell-title .mint-cell-text{
    font-size: .3rem;
  }

  .w-content .mint-cell{
    min-height: .85rem;
    border-bottom: .01rem solid #ecedee;
  }

</style>
