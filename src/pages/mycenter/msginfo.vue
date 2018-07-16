<template>
  <div id="uinfo" class="page wrap ">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.rec.tradingrec')}}
    </comp-top-back>
    <div class="box one">
           <div class="inner">
                <h1><span>{{msginfo.amount}}</span> <span>{{msginfo.icontype}}</span></h1>
           </div>
    </div>

    <div class="box two">
      <div class="inner">
         <div >
            <h1><span>{{$t('message.rec.sender')}}:</span></h1><!--发送方-->
            <h2><span class="msg-eplise"> {{msginfo.senduser}}</span></h2>
            <h1><span>{{$t('message.rec.receiver')}}:</span></h1><!--接收方-->
            <h2><span class="msg-eplise">{{msginfo.recuser}}</span></h2>
            <h1><span>{{$t('message.rec.cost')}}:</span></h1><!--矿工费用 -->
            <h2>{{msginfo.minersfee}}</h2>
            <h1><span>{{$t('message.rec.remarks')}}</span></h1><!--备注-->
            <h2>{{msginfo.note}}</h2>
         </div>
      </div>
    </div>

    <div class="box three">
      <div class="inner">
        <h1><span>{{$t('message.rec.trannumer')}}:</span></h1><!--交易号-->
        <h2><span class="msg-eplise">{{msginfo.transaction}}</span></h2>
        <h1><span>{{$t('message.rec.block')}}：</span></h1><!--区块-->
        <h2>{{msginfo.block}}</h2>
        <h1><span>{{$t('message.rec.trantime')}}:</span></h1><!--交易时间-->
        <h2>{{msginfo.tratime|date}}</h2>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Header } from 'mint-ui';
  import  centerApi from '@/api/mycenter'
  import  utils from '@/assets/js/utils'
  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
  export default {
    name: "page-msginfo",
    data(){
      return {
        scroll:false,
        msginfo:{}
      }
    },
    created(){
      this.msgsinfo(this.$route.query.id);
    },
    mounted(){

    },
    methods:{
      msgsinfo(id){
        centerApi.getmsginfo(id, (data) => {
          console.log(data)
          this.msginfo = data
        }, (msg) => {
        })
      }
    }
  }
</script>

<style type="text/css" lang="less" scoped >
  .msg-eplise{
    width: 3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  .box{
    >.inner{
      color:#98999C;
      padding: 0 .3rem;
      h2{
        color: #333333;
      }
    }
  }

  .one{
    margin-top: .2rem;
      h1{
        border-bottom: .01rem solid #ecedee;
        text-align: center;
        line-height: .6rem;
        span:nth-of-type(1){
           font-size: .4rem;
           color: #333333;
         }
        span:nth-of-type(2){
          font-size: .2rem;
        }
      }
  }

  .two{
    margin-top: .2rem;

.inner{
  >div{
    padding-bottom: .3rem;
    border-bottom: .01rem solid #ecedee;
  }
}
    h1{
      span:nth-of-type(1){
        font-size: .24rem;
      }
      span:nth-of-type(2){
        font-size: .24rem;
      }
    }
    h1,h2{
      margin-top: .2rem;
    }
  }

  .three{
    margin-top: .4rem;
    h1,h2{
      margin-top: .2rem;
      font-size: .24rem;
    }
  }


</style>
