<template>
  <div id="uinfo" class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.msg.message')}}
       <span class="header-right">全部</span>
    </comp-top-back>

    <div class="page-main" id="scroll"> <!--content start-->
       <div>
        <div class="w-content m-box1">
          <div class="inner">
                 <section class="item">
                      <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
                      <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
                 </section>
          </div>
        </div>

        <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>

        <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>
          <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>
          <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>
          <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>
          <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>
       <div class="w-content m-box1">
          <div class="inner">
            <section class="item">
              <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
              <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
            </section>
          </div>
        </div>

         <div class="w-content m-box1">
           <div class="inner">
             <section class="item">
               <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
               <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
             </section>
           </div>
         </div>
         <div class="w-content m-box1">
           <div class="inner">
             <section class="item">
               <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
               <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
             </section>
           </div>
         </div>
         <div class="w-content m-box1">
           <div class="inner">
             <section class="item">
               <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
               <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
             </section>
           </div>
         </div>
         <div class="w-content m-box1">
           <div class="inner">
             <section class="item">
               <div><span class="left ft-c-gray" >BTC2:</span><span class="right ft-c-gray">2018.08.09-15:20</span></div>
               <div><p class="bottom">{{$t('message.msg.content')}}</p></div>
             </section>
           </div>
         </div>

    </div>
    </div> <!-- content end -->
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
         name: "page-msg",
         data(){
          return {
            scroll:false
          }
          },
      mounted(){
        setTimeout(this.initScroll,700)
      },
      methods:{
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

<style type="text/css" lang="less" scoped >
  .header-right{
    position: absolute;
    right: .3rem;
    font-size: .3rem;
  }
  .page-main{
    overflow-y: hidden;
    background-color: #F9F9F9;
  }
  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box1 .item{
     padding: .1rem;
    margin-top: .3rem;

  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }
  .m-box1 .item .left{
    font-size: .24rem;
    line-height: .4rem;
  }
 .m-box1 .item .right{
   font-size: .2rem;
   line-height: .4rem;
   float: right;
 }
 .m-box1 .item .bottom{
   font-size: .24rem;
   color: #333333;
 }
  .w-content>.inner{
    padding: 0 .2rem;
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
  .w-item .mint-cell-title .mint-cell-text{
    font-size: .3rem;
  }

  .w-content .mint-cell{
    min-height: .85rem;
    border-bottom: .01rem solid #ecedee;
  }

</style>
