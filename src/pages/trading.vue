<template>
  <div class="page" style="color: white">
   <header>
      <div>
         <ul class="header">
            <li><button class="c-button c-button-normal " >BITARK </button></li>
            <li><button class="c-button c-button-normal " v-tap="{methods:$root.routeTo, to:'page-trading_dex'}">DEX</button></li>
         </ul>
      </div>
   </header>

    <div class=" box one">
      <div class="inner">
        <section class="coin_tab">
          <ul >
            <li :class="[active==='tab-container1'?'activation':'']" @click="whickTabFun('tab-container1')"><span>{{$t('message.trade.optional')}}</span></li>
            <li :class="[active==='tab-container2'?'activation':'']" @click="whickTabFun('tab-container2')"><span>BTC</span></li>
            <li :class="[active==='tab-container3'?'activation':'']" @click="whickTabFun('tab-container3')"><span>ETH</span></li>
            <li :class="[active==='tab-container4'?'activation':'']" @click="whickTabFun('tab-container4')"><span>BARK</span><i></i></li>
          </ul>
        </section>
        <section class="coin_header">
          <ul>
            <li>{{$t('message.trade.volume')}}<i class="up"></i></li>
            <li>{{$t('message.trade.price')}}<i class="down"></i></li>
            <li >{{$t('message.trade.twnhourupdocwn')}}<i class="down"></i></li>
          </ul>
        </section>
      </div>
    </div>

    <div class="main-content">
    <mt-tab-container v-model="active" :swipeable="true">
      <mt-tab-container-item id="tab-container1">

        <div id="scroll" class="datalist">
          <div class="box box-wrap">
              <section class="coin_content">
                <div class="item">
                  <div class="inner">
                    <ul class="item">
                      <li>
                        <h1 ><span>BTC</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>

                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-green">+4.32%</button>
                      </li>
                    </ul>

                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <ul class="item">
                      <li>
                        <h1 ><span>ETH</span>/<i>BTC</i></h1>
                        <h2>24H 256735</h2>
                      </li>
                      <li>
                        <h1>0.00003469</h1>
                        <h2>=<span>2.07CNY</span></h2>
                      </li>
                      <li>
                        <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                      </li>
                    </ul>
                    <div class="lastspace"></div>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <div id="scrolltwo" class="datalist">
          <div class="box box-wrap">
            <section class="coin_content">
              <div class="item">
                <div class="inner">
                  <ul class="item">
                    <li>
                      <h1 ><span>BTC</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-green">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <div class="lastspace"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <div id="scrollthree" class="datalist">
          <div class="box box-wrap">
            <section class="coin_content">
              <div class="item">
                <div class="inner">
                  <ul class="item">
                    <li>
                      <h1 ><span>BTC</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-green">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <div class="lastspace"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </mt-tab-container-item>


      <mt-tab-container-item id="tab-container4">
        <div id="scrollfour" class="datalist">
          <div class="box box-wrap">
            <section class="coin_content">
              <div class="item">
                <div class="inner">
                  <ul class="item">
                    <li>
                      <h1 ><span>BTC</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-green">+4.32%</button>
                    </li>
                  </ul>

                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <ul class="item">
                    <li>
                      <h1 ><span>ETH</span>/<i>BTC</i></h1>
                      <h2>24H 256735</h2>
                    </li>
                    <li>
                      <h1>0.00003469</h1>
                      <h2>=<span>2.07CNY</span></h2>
                    </li>
                    <li>
                      <button class="c-button c-button-normal c-button-orange">+4.32%</button>
                    </li>
                  </ul>
                  <div class="lastspace"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    </div> <!---->
  </div>
</template>

<script>
  import { addClass, removeClass } from 'mint-ui/src/utils/dom';
  import Vue from 'vue'
  import Tip from '@/components/common/tip.js'
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import PageWalletGather from "./wallet_gather";
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  export default {
    name:'page-trading',
    data(){
      return {
        scroll:false,
        scrolltwo:false,
        active:'tab-container1',
      }
    },
    created(){

    },
    watch:{
    },
    mounted(){
    /*  setTimeout(this.initScroll,700)*/
      $('.coin_content ul.item button').on('click',()=>{
         this.$router.push({ name:'page-market'})
      })
    },
    updated(){

    },
    methods:{
      whickTabFun(index){
        this.active=index

      },
      initScroll(){
        var self = this
        this.scroll = new IScroll('#scroll',{
          mouseWheel:true,
          tap:true
        });
      }
    },
    components:{
      PageWalletGather
    }
  }

</script>
<style lang="less" scoped>

  header{
    >div{
      padding: .3rem;
    }
    border-bottom: .01rem solid #e4e5e7;
    background: #fff;
  }
  .header{
        button{
          height: .6rem;
          border-radius: .03rem;
        }
         li:nth-of-type(1){
           button{
             background:#4d7bf3;
           }
         }
        li:nth-of-type(2){
           color: #929292;
           margin-left: .1rem;
        }
       display: flex;
       justify-content: center;
  }
  #scroll{
   /* height: 8.5rem;*/
    /* height: 8.5rem; */
    overflow: scroll;
    height: calc(~'100vh - 3.74rem');
  }
  #scrolltwo{
    /* height: 8.5rem;*/
    /* height: 8.5rem; */
    overflow: scroll;
    height: calc(~'100vh - 3.74rem');
  } #scrollthree{
    /* height: 8.5rem;*/
    /* height: 8.5rem; */
    overflow: scroll;
    height: calc(~'100vh - 3.74rem');
  } #scrollfour{
    /* height: 8.5rem;*/
    /* height: 8.5rem; */
    overflow: scroll;
    height: calc(~'100vh - 3.74rem');
  }

  @write:#ffffff;
  @write-20:#cbd4ec;




  .c-button-normal{
    display: inline-block;
    padding: 0 .12rem;
    width: 1.48rem;

  }
  .c-button{
    font-size: .26rem;
    appearance: none;
    border-radius:.01rem;
    border: 0;
    box-sizing: border-box;
    color: inherit;
    display: block;
    height: 100%;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
  }
  .c-button-green{
    color: #fff;
    background-color: #00cc33;
  }
  .c-button-orange{
    color: #fff;
    background-color: #e02021;
  }

  .box-wrap{
    /* height: 8.05rem;
     overflow-y: scroll;*/
  }
  .box{
    font-size: .3rem;
    color: #8089a3;
    &>.inner{
      padding:0 .3rem;
      color: #8089a3;

    }
  }
  .coin_tab{
    ul{
      display: flex;
      justify-content: space-between;
      li.activation{

        color: #4d7bf3;
        border-bottom: .02rem solid #4d7bf3;
      }
      li{
        position: relative;
        bottom: -0.02rem;
        line-height: .66rem;
        height: .66rem;
      }
    }
  }

  .coin_header{
    ul{
      display: flex;
      justify-content: space-between;
      li{
        font-size: .24rem;
        width: 1.8rem;
        line-height: .75rem;
        height: .75rem;
        text-align: center;
        i.down{
          display: inline-block;
          width: 0.14rem;
          height: 0.17rem;
          background: url('../assets/img/fall@3x.png') no-repeat center;
          background-size: contain;
          margin-left: .1rem;
        }
        i.up{
          display: inline-block;
          width: 0.14rem;
          height: 0.17rem;
          background: url('../assets/img/i_up.png') no-repeat center;
          background-size: contain;
          margin-left: .1rem;
        }
      }
      li:first-child{
        text-align: left;
        padding-left: .1rem;
      }
      li:nth-child(3){
        text-align: right;
        padding-right: .1rem;
      }
    }
  }

  .one{
    height: 1.4rem;
    background: #fff;
  }

  .coin_content{
    .item{

    }
    font-size: .24rem;

    ul{
      padding: .4rem .3rem;
      border-bottom: .01rem solid #ffffff;
      border-top: .01rem solid #e4e5e7;
      display: flex;
      justify-content: space-between;
      li{
        h1{
          font-size: .32rem ;
        }
        h2{
          font-size: .24rem;
        }
        i{
          height: .65rem;
          font-style: normal;
        }

      }
      li:nth-child(1){
        h1{
          font-size: .32rem;
          i{
            font-size: .2rem;
          }
        }
      }
      li:nth-child(2){
        h1{
          span{
            font-size: .32rem;
          }
          i{
            font-size: .20rem;
          }
        }
        h2{
          font-size: .24rem;
        }
      }
      li:nth-child(3){
        h1{
          font-size: .32rem;
        }
        h2{
          font-size: .24rem;
        }
      }
    }
    ul:first-child{
      border-top: 0;
    }
    ul:last-child{
      border-bottom: 0;
    }

  }

  .h_icon{
    width: 1.55rem;
    height: .23rem;
    left: 0.3rem;
    background: url('../assets/img/BITARK.png') no-repeat center;
    background-size: contain;
    display: inline-block;
  }
  .reg-account {
    font-size: 0.24rem;
    color: #AEBCE4;
  }
  .login-form {
    margin-top: 0.6rem;
    padding-left: 0.68rem;
    padding-right: 0.68rem;
    h3 {
      font-size: 0.36rem;
      color: #fff;
    }
    > div {
      margin-top: 1rem;
    }
    p {
      position: relative;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
      line-height: 0.5rem;
      border-bottom: 1px solid #8089A3;
      i {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        right: 0;
        background: url('../assets/img/reset-password@3x.png') no-repeat center;
        background-size: contain;
        vertical-align: middle;
      }
      input {
        width: 100%;
        border: none;
        background-color: transparent;
        font-size: 0.3rem;
        color: #fff;
        &::placeholder {
          color: #8089a3;
        }
      }
      &:nth-of-type(2){
        margin-top: 0.7rem;
      }
    }
    .findpw {
      color: #409FF8;
      font-size: 0.24rem;
      margin-top: 0.5rem;
    }
    .login-btn {
      margin-top: 1.1rem;
      button {
        font-size: 0.36rem;
        height: 1rem;
      }
    }
  }

  .datalist .box>.inner{
    padding: 0;
  }
</style>
