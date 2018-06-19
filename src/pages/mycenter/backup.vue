<template>
  <div id="uinfo" class="page wrap">

    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.backup.backupName')}}
    </comp-top-back>


    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-msg'}">
          <div class="item"><span class="f30">{{$t('message.backup.cloudBackup')}}</span></div>
          <div class="item"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-record'}">
          <div class="item"><span class="f30">{{$t('message.backup.qrBackup')}}</span></div>
          <div class="item"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-uwallet'}">
          <div class="item"><span class="f30">{{$t('message.backup.abkeyBackup')}}</span></div>
          <div class="item"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
        </div>
      </div>
    </div>

    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " >
          <div class="item"><span class="f30 ft-c-blue">{{$t('message.backup.updatePwd')}}</span></div>
        </div>
      </div>
    </div>

    <!--  说明文字 -->
    <div class="m-box3">
        <div class="inner">
          <h1>{{$t('message.backup.alert')}}</h1>
          <ul>
            <li>{{$t('message.backup.infoOne')}}</li>
            <li>{{$t('message.backup.infoTwo')}}</li>
            <li>{{$t('message.backup.infoThree')}}</li>
          </ul>
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
    name: "page-backup",
    methods:{
      routeTo(args){
        this.$router.push({ name: args.to})
      }
    }
  }
</script>

<style type="text/css" lang="less" scoped  >
  .m-box3{margin-top: .45rem;}
  .m-box3>.inner{padding: 0 .2rem;}
  .m-box3 h1{font-size: .24rem;color:#666666}
  .m-box3 ul li{font-size: .22rem;color:#999999;line-height: .5rem;}

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
        width: .26rem;
        height: .26rem;
      }
    }
  }
  .box-cont:last-child{
    border-bottom:0;
  }
</style>
