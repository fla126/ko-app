<template>
  <!-- 记录 -->
  <div id="record" class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.rec.record')}}
    </comp-top-back>
    <div class="page-main" id="scroll">
      <div>
          <div class="re-box">
            <div class="inner">
              <section class="re-top">
                <label class=" f24 ft-c-gray">{{$t('message.mycenter.check')}}</label>
                <div class="styled-select">
                  <select class="rec-select f24"  v-model="captcha" @change="chooseIcon(captcha)" >
                    <option value="" >全部</option>
                    <option value="BTC" >BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="BARK">BARK</option>
                  </select>
                </div>
              </section>
            </div>
          </div>

          <div  v-for="(item,index) in recList" class="w-content m-box2 f24" v-tap="{methods:routeTo, to:'page-msginfo',query:item.id}" :key="index">
            <div class="inner">
               <ul >
                 <li >
                   <img :src="item.tratype===1?i_add:i_remove"/>
                 </li>
                 <li> <section class="w-c-center">
                   <p class="sender"><span>{{item.senduser}}</span></p>
                   <p> <span>{{item.tratime|date}}</span></p>
                 </section>
                 </li>
                 <li>
                   <span><i >{{item.tratype===1 ?'+':'-'}}</i>{{item.amount}}{{item.icontype}}</span>
                 </li>
               </ul>
            </div>
          </div>
        <div style="height:.7rem">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import  centerApi from '@/api/mycenter'
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
        i_add:require('../../assets/img/mycenter/i_add.png'),
        i_remove:require('../../assets/img/mycenter/i_reduction.png'),
        i_error:require('../../assets/img/mycenter/i_error.png'),
        captcha:'',
        value:[],
        recList:[],
        scroll:false,
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
        ],
        recordArrys:[{name:'BTC',address:'1MzziGBa7tNN.......wRcvSGZu5',aumont:'0.4567'}]// 记录列表
      }
    },
    mounted(){
      setTimeout(this.initScroll,700);
      this.getList(this.captcha);
    },
    methods:{
      chooseIcon(v){
        console.log(v);
        this.getList(v);
      },
      saveinfo(){ // 保存消息记录
        let msg={
           amount:'123',
           icontype:'ETH',
           senduser:'df12fd5fd13af',
           content:'测试数据'
        };
        centerApi.saveMsg(msg, (data) => {
        }, (msg) => {
        })
      },
      getList(captcha){
        let pars={
          icontype:captcha,
          tratype:4
        }
        centerApi.getMsgs(pars, (data) => {
          console.log(data);
          this.recList = data
        }, (msg) => {
        })
      },
      routeTo(args){
        this.$router.push({ name: args.to,query:{id:args.query}})
      },
      initScroll(){
        var self = this
        this.scroll = new IScroll('#scroll',{
          mouseWheel:true,
          tap:true
        });
      }
    }
  }

</script>
<style type="text/css" lang="less" scoped  >
  .styled-select  {
    overflow: hidden;
    width: 6.1rem;
    background: url("../../assets/img/i_down.png") no-repeat 5.5rem;
    background-size: .26rem .15rem;
    display: inline-block;
    border: .01rem solid #ecedee;
    padding: 0 0 0 .3rem;
    border-radius: .02rem;
    select{
      background: transparent;
      width: 100%;
      border: 0;
      height: .6rem;
      line-height: .5rem;
      -webkit-appearance: none;
    }
  }

  .rec-select:focus {
    outline:none;
    border: 0;
  }
  .page-main{
    overflow-y: hidden;
    background-color: #F9F9F9;
  }
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

  .w-content{
    ul{
      li{
        p.sender{
          span{
            width: 3rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
          }
        }
      }
    }
  }

/* #record .rec-select{
   width: 6.1rem;
   height: .5rem;
   border: .01rem solid #ececec;
   background: #f9f9f9;
 }*/
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
   position: relative;
   top: -.21rem;
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
