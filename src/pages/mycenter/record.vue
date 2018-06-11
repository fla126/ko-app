<template>
  <!-- 记录 -->
  <div id="record" class="page wrap">
    <mt-header class="common-mt-header" title="记录">
      <router-link to="/ucenter" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="re-box">
      <div class="inner">
        <section class="re-top">
          <label class=" f24 ft-c-gray">钱包</label>
          <select class="rec-select f24">
            <option>BTC</option>
            <option>ETH</option>
            <option>BARK</option>
          </select>
        </section>
      </div>
    </div>

    <div class="w-content m-box2 f24">
      <div class="inner">
         <ul >
           <li><img src="../../assets/img/mycenter/i_add.png"/></li>
           <li> <section class="w-c-center">
             <p>1MzziGBa7tNN.......wRcvSGZu5</p>
             <p>2018.04.23</p>
           </section>
           </li>
           <li>
             <span>+0.4567BTC</span>
           </li>
         </ul>
      </div>
    </div>

    <div class="w-content m-box2 f24">
      <div class="inner">
        <ul >
          <li><img src="../../assets/img/mycenter/i_reduction.png"/></li>
          <li> <section class="w-c-center">
            <p>1MzziGBa7tNN.......wRcvSGZu5</p>
            <p>2018.04.23</p>
          </section>
          </li>
          <li>
            <span>+0.4567BTC</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-content m-box2 f24">
      <div class="inner">
        <ul >
          <li><img src="../../assets/img/mycenter/i_error.png"/></li>
          <li> <section class="w-c-center">
            <p>1MzziGBa7tNN.......wRcvSGZu5</p>
            <p>2018.04.23</p>
          </section>
          </li>
          <li>
            <span>+0.4567BTC</span>
          </li>
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
  import { Field } from 'mint-ui';
  import { Checklist } from 'mint-ui';


  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
  Vue.component(Field.name, Field);
  Vue.component(Checklist.name, Checklist);
  export default {
    name:'page-record',
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
<style type="text/css" lang="less" scoped  >

  .re-box>.inner{
    padding: 0 .2rem;
  }
  .re-top{
    padding: .3rem 0;
  }
 #record .all-header{
    height: .95rem;
    background-color: white;
    color:#333333;
    border-bottom:.01rem solid #ececec;
  }

  #record .all-header .mintui-back{
    font-size: 0.4rem;
    color: #7f7f7f;
  }
 #record .all-header .right img{
    width: .4rem;
    height: .4rem;
  }
 #record .all-header h1{
    font-size: .36rem;
    color: #333333;
  }

 #record .rec-select{
   width: 6.1rem;
   height: .5rem;
   border: .01rem solid #ececec;
   background: #f9f9f9;
 }
 #record .m-box1,.m-box2{
    background-color:white;
  }
 #record .m-box2{
    margin-top: .4rem;
  }

 .m-box2{
   img{
     width: .38rem;
     height: .38rem;
   }
 }
.m-box2 ul{
  padding: .3rem .1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
  .m-box2 ul li:nth-child(1){
    width: .6rem;
  }
  .m-box2 ul li:nth-child(2){
    width: 4.1rem;
  }

  .m-box2>.inner{

  }
 .re-top {
   width: 7.1rem;
 }
 .re-top label{
   width:.8rem;
   display: inline-block;
 }
 #record .b-manger .mint-field-core{
    font-size: .3rem;
  }
 #record .b-manger .mint-checkbox-label{
    font-size: .24rem;
    color: #333333;
  }

 #record .b-manger .mint-checkbox-input:checked + .mint-checkbox-core{
    background-color: #00cc33;
    border-color: #00cc33;
  }
 #record  .b-manger .i-search{
    width: .34rem;
    height: .33rem;
  }
 #record .w-content>.inner{
    padding: 0 .2rem;
  }
 #record .wallet-cell {
    margin-top: .4rem;
    min-height: 1.8rem;
    background-color: #4D7BF3;
    color: white;
  }

 #record  .wallet-cell .mint-cell-title img{
    width: .54rem;
    height: .46rem;
  }
 #record .wallet-cell .mint-cell-title .mint-cell-text{
    font-size: .36rem;
  }
 #record  .wallet-cell .mint-cell-title .mint-cell-label{
    font-size: .24rem;
  }
 #record  .mint-cell-title  .mint-cell-label{
    color: #becffa;
  }
 #record .wallet-cell .mint-cell-allow-right::after{
    width: .31rem;
    height: .31rem;
    border-color: white;
  }
 #record .w-content a.w-box1{
    margin-top: .4rem;
  }

 #record  .w-content a.w-box1 .mint-cell-title img{
    height:.3rem;
    width: .4rem;
  }
 #record .w-content  a.w-box2 .mint-cell-title img{
    height:.34rem;
    width: .34rem;
  }
 #record .w-content a.w-box3 .mint-cell-title img{
    height:.34rem;
    width: .4rem;
  }
 #record .w-content a.w-box4 .mint-cell-title img{
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
