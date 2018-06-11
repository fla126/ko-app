<template>
  <div  class="page">
    <comp-top-back :class="'line'"></comp-top-back>
    <div class="common-content common-content-bg-gray">
      <div class="inner">
        <h1 class="f36 font-blod pt45">添加动态口令</h1>
        <div class="common-form-item mt60">
           <label  class="f24 ft-c-gray30">账号名</label>
           <input class="input-default mt40" placeholder="请输入用户名"/>
           <div class="common-line mt20">
               <div class="up"></div>
               <div class="down"></div>
           </div>
        </div>
        <div class="common-form-item mt60">
          <label  class="f24 ft-c-gray30">账号名</label>
          <input class="input-default mt40" placeholder="请输入用户名"/>
          <div class="common-line mt20">
            <div class="up"></div>
            <div class="down"></div>
          </div>
        </div>
    <!--  <div class="common-form-item">
        <label class="f24">钥匙</label>
        <mt-field class="common-mt-field"  placeholder="管理币种" v-model="captcha"></mt-field>
      </div>-->
      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Field } from 'mint-ui';
  import { Checklist } from 'mint-ui';


  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Field.name, Field);
  Vue.component(Checklist.name, Checklist);
  export default {
    name:'page-command-add',
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
