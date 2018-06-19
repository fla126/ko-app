<template>
  <div class="page">
<!--    <mt-header class="common-mt-header" :title="$t('message.mycenter.center')">
        <a slot="right" v-tap="{methods:$root.routeTo, to:'page-ucenter-setup'}">
        <img class="ucenter-img" src="../assets/img/mycenter/i_right.png"/>
        </a>
    </mt-header>-->
    <comp-top-back :class="'line'" :back="false" >
        {{$t('message.mycenter.center')}}
    </comp-top-back>

    <div class="common-content u-box1 mt40">
           <div class="inner" v-tap="{methods:routeTo, to:'page-uinfo'}">
                <ul >
                  <li><img src="../assets/img/mycenter/i_b_000.png"/></li>
                  <li><span class="f36">Vivining</span> <span class="f24">{{$t('message.uinfo.tinkey')}}: usbtkey123456</span></li>
                  <li><img  src="../assets/img/mycenter/i_right_nav.png"/></li>
                </ul>
           </div>
    </div>

    <div class="common-content bg-white mt40">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-msg'}">
          <div class="item"><img class="left1"  src="../assets/img/mycenter/i_b_002.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.msg')}}</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-record'}">
          <div class="item"><img class="left2"  src="../assets/img/mycenter/i_b_003.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.rec')}}</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-uwallet'}">
          <div class="item"><img class="left3"  src="../assets/img/mycenter/i_b_004.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.wallet')}}</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-backup'}">
          <div class="item"><img class="left4"  src="../assets/img/mycenter/i_b_005.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.backup')}}</span></div>
        </div>
      </div>
    </div>

    <div class="common-content bg-white mt40">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-help'}">
          <div class="item"><img class="left5"  src="../assets/img/mycenter/i_b_006.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.help')}}</span></div>
        </div>
        <div class="box-cont " v-tap="{methods:routeTo, to:'page-about'}">
          <div class="item"><img class="left6"  src="../assets/img/mycenter/i_b_007.png" ></div>
          <div class="item"><span class="f30">{{$t('message.mycenter.about')}}</span></div>
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
  name:'page-ucenter',
  data(){
    return {

    }
  },
  mounted(){

  },
  methods:{
    routeTo(args){
      this.$router.push({ name: args.to})
    }
  }
}

</script>
<style type="text/css" lang="less"  scoped >

   img.left1{
    width: .4rem;
    height: .3rem;
  }
 img.left2{
    width: .34rem;
    height: .34rem;
  }
  img.left3{
    width: .4rem;
    height: .34rem;
  }
  img.left4{
    width: .34rem;
    height: .34rem;
  }
  img.left5{
    width: .32rem;
    height: .38rem;
  }
  img.left6{
    width: .34rem;
    height: .36rem;
  }

  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom:.02rem solid #ecedee;
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
.u-box1 {
  background-color: #4d7bf3;
  ul{
     display: flex;
     padding: .55rem 0;
     justify-content: space-between;
  }
  li{
      height: .75rem;
    }
  li:nth-child(1) img{
    margin-top: .2rem;
    width: .54rem;
    height: .46rem;
  }
  li:nth-child(2){
    width: 5rem;
    height: .75rem;
    span:nth-child(1){
       color: #ffffff;
    }
    span:nth-child(2){
      color: #becffa;
      display: block;
    }
  }
  li:nth-child(3) img{
    margin-top: .2rem;
    width: .22rem;
    height: .42rem;
  }
}
</style>
