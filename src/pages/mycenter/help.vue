<template>
  <div id="uinfo" class="page wrap" >
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.help.helpName')}}
    </comp-top-back>

    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-mustRead'}" >
          <div class="item"><span class="f30">{{$t('message.help.guidence')}}</span></div><!--新手必读-->
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-walletbackup'}" >
          <div class="item"><span class="f30">{{$t('message.help.backup')}}</span></div> <!--钱包备份-->
        </div>
        <div class="box-cont "  v-tap="{methods:routeTo, to:'page-walletUse'}" >
          <div class="item"><span class="f30">{{$t('message.help.instruction')}}</span></div>
        </div>
      </div>
    </div>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-problem'}" >
          <div class="item"><span class="f30">{{$t('message.help.FAQ')}}</span></div> <!--常见问题-->
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-contact'}" ><!--联系我们-->
          <div class="item"><span class="f30">{{$t('message.help.contact')}}</span></div>
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
    name: "page-help",
    methods:{
      routeTo(args){
        this.$router.push({ name: args.to})
      }
    }
  }
</script>

<style type="text/css" lang="less"  scoped>
  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom: .02rem solid #ecedee;
  }
  .box-cont:last-child{
    border-bottom:0;
  }
</style>
