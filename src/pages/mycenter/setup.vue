<template>
  <div id="setup" class="page">
    <mt-header class="all-header common-mt-header" title="设置">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="common-content bg-white">
      <div class="inner">
        <mt-cell class="common-mt-cell ft-c-gray" title="多语言"   is-link   to="/message" >
        </mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="货币单位"  >
        </mt-cell>
        <mt-cell class="common-mt-cell ft-c-gray" title="WEB3"  >
        </mt-cell>
      </div>
    </div>

    <div class="w-space"></div>

    <div class="common-content bg-white mt60">
      <div class="inner">
        <mt-field class="common-mt-field"   placeholder="管理币种" v-model="captcha">
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

    },
    methods:{

    },
  }

</script>
<style type="text/css" lang="less" scoped >

</style>
