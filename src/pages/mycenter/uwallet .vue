<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.mycenter.wallet')}}
      <span class="header-right"><img v-tap="{methods:routeTo, to:'page-addwallet'}" class="uwallet-right-img" src="../../assets/img/mycenter/i_nav_add.png"/></span>
    </comp-top-back>

    <div class="page-main" id="scroll">
      <section>
            <div v-for="(item,key) in walletList" class="uwallet-box ">
              <h1 class="uwallet-h1 mt25 f30">{{key}}</h1>
              <div class="uwallet-content w-content m-box1 mt25 f24">
                <div class="inner">
                  <section v-for="child in  item" class="one">
                    <span >{{child.name}}</span>
                    <span>{{child.address}}</span>
                    <span> <button :class="[{'tin-btn-default':true},child.statue===0?'tin-btn-blue': 'tin-btn-green']"  v-tap="{methods:changeStaue,query:{ id:child.id,statue:child.statue}}">{{child.statue===0? $t('message.wallet.unfrozen'):$t('message.wallet.frozen')}}</button>
                     </span>
                  </section>
                </div>
              </div>
            </div>
        <div style="height:.7rem">
        </div>
      </section>
    </div>





  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Header } from 'mint-ui';
  import { MessageBox,Toast,Indicator} from 'mint-ui';
  import  centerApi from '@/api/mycenter'
  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
    export default {
        name: "page-uwallet",  data(){
        return {
          scroll:false,
          walletList:{}
        }
      },
      mounted(){
        setTimeout(this.initScroll,700);
        this.getlist()
      },
        methods:{
          changeStaue(args){//改变钱包地址状态
            console.log(args)
        MessageBox.confirm(this.$t('message.wallet.info'),this.$t('message.wallet.wok'),{confirmButtonText:this.$t('message.wallet.ok'),cancelButtonText:this.$t('message.wallet.no')}).then(action => {
          Indicator.open();
          centerApi.wupdate({id:args.query.id,statue:args.query.statue===0?1:0},(data) => {
                  Indicator.close();
                  Toast(this.$t('message.wallet.updatesuccess'));
                  this.getlist();
              }, (msg) => {
                 Indicator.close();
                  Toast(this.$t('message.wallet.updatefailed'));
              })
            });

          },
          getlist(){
            centerApi.getwallsList((data) => {
              this.walletList = data
            }, (msg) => {
            })
          },
          initScroll(){
            var self = this
            this.scroll = new IScroll('#scroll',{
              mouseWheel:true,
              tap:true
            });
           },
          routeTo(args){
            this.$router.push({ name: args.to})
          }
        }
    }
</script>

<style type="text/css" lang="less" scoped >
  .page-main{
    overflow-y: hidden;
    background-color: #F9F9F9;
  }
  .header-right{
    position: absolute;
    right: .3rem;
    img.uwallet-right-img{
      width: .4rem;
      height: .4rem;
      margin-top: .07rem;
    }
  }

  .uwallet-content .one{
    display: flex;
    justify-content: space-between;
    border-bottom:.02rem solid #ecedee;
    padding: 0.2rem 0rem;
    span:nth-of-type(1){
      width: 1rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    span:nth-of-type(2){
       width: 3rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
  }
  .uwallet-content .one span{
     line-height: .45rem;
  }
  .uwallet-content .one:last-child{
    border-bottom: 0;
  }
  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }

  .uwallet-box h1{
    padding-left: .3rem;
  }
  .w-content>.inner{
    padding: 0 .3rem;
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
