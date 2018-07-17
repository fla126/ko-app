<template>
  <div class="page">
    <comp-wallet-top :isscan="false" :isset="false"></comp-wallet-top>
     <div class="box">
          <div class="inner">
              <div class="content">
                   <ul class="oneul">
                      <li>
                        <p>在线时长</p>
                        <p>150:24:36</p>
                      </li>
                      <li>
                        <p>预计挖到</p>
                        <p>150:24:36</p>
                      </li>
                   </ul>
                <section>
                   <img :src="imgurl"/>
                </section>
                <mt-progress class="setprogress" :value="30" :bar-height="10"></mt-progress>

                <p class="two">挖矿中</p>
                <hr>
                <ul class="ultwo">
                  <li>
                    <p>当前算力</p>
                    <p>100</p>
                  </li>
                  <li>
                    <p>已挖到</p>
                    <p>600TKY</p>
                  </li>
                </ul>

                <p>
                  <button class="c-button c-button-normal">暂停</button>
                </p>

              </div>
          </div>
     </div>
  </div>
</template>
<script>
import Vue from 'vue'
import compWalletTop from '@/components/top_wallet'
import { mapGetters, mapActions } from 'vuex'
import numUtils from '@/assets/js/numberUtils'
import { Progress } from 'mint-ui';
Vue.component(Progress.name, Progress);
 require('../assets/css/common/reset.css')

export default {
  name:'page-dig',
  data(){
    return {
       imgurl:require('../assets/img/ICON.png')
    }
  },
  components:{
    compWalletTop,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #F9F9F9;
}
.page .page-top {
  background-color:initial;
}

  .box{
    >.inner{
      padding: .3rem;
    }
    .content{
      padding:.3rem .66rem .6rem;
      background: #ffffff;
      ul{
        display: flex;
        justify-content: space-between;
      }
      .oneul{
         font-size: .24rem;
        li{
          p{
            line-height: .35rem;
          }
          p:first-child{
            color: #999999
          }
          p:last-child{
            color: #4d7bf3;
          }
        }
      }
      .ultwo{
        margin-top: .5rem;
        font-size: .35rem;
        li{

          p:first-child{
            color: #999999;
          }
          p:last-child{
            font-size: .6rem;
            color: #4d7bf3;
            line-height: 1rem;
          }

        }
      }
      section{
        margin-top: .3rem;
        text-align: center;
        img{
          width: 2.25rem;
          height: 1.92rem;
        }
      }
      .two{
        margin-top: .4rem;
        text-align: center;
        font-size: .4rem;
        color: #4d7bf3;
      }
      hr{
        margin-top: .4rem;
        border: .01rem solid #e5e5e5;
      }
      button{
        margin-top: .5rem;
        color: white;
        border-radius: .08rem;
      }
    }
  }

.c-button-normal{
  display: inline-block;
  padding: 0 .12rem;
  width: 100%;
  background-color: #4d7bf3;
}
.c-button{
  font-size: .26rem;
  appearance: none;
  border-radius:.01rem;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  display: block;
  height: .64rem;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
}

</style>
