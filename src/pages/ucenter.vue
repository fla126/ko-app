<template>
  <div id="ucenter">
    <mt-header class="all-header" title="个人中心">
      <!--<router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>-->
      <router-link class="right" to="/" slot="right">
        <img src="../assets/img/mycenter/i_right.png"/>
      </router-link>
    </mt-header>

    <mt-cell class="wallet-cell"
             title="Vivining"
             to="/uinfo"
             label="硬件：usbtkey123456"
             is-link
             value="">
      <img slot="icon" src="../assets/img/mycenter/i_b_000.png" width="24" height="24">
    </mt-cell>

    <div class="w-content m-box1">
      <div class="inner">
          <mt-cell class="w-item w-box1" title="消息"   >
            <img slot="icon" src="../assets/img/mycenter/i_b_002.png" width="24" height="24">
          </mt-cell>
          <mt-cell class="w-item w-box2" title="记录"  >
            <img slot="icon" src="../assets/img/mycenter/i_b_003.png" width="24" height="24">
          </mt-cell>
          <mt-cell class="w-item w-box3" title="钱包"  >
            <img slot="icon" src="../assets/img/mycenter/i_b_004.png" width="24" height="24">
          </mt-cell>

          <mt-cell class="w-item w-box4" title="备份"  >
            <img slot="icon" src="../assets/img/mycenter/i_b_005.png" width="24" height="24">
          </mt-cell>

      </div>
    </div>

    <div class="w-space"></div>

    <div class="w-content m-box2">
      <div class="inner">
        <mt-cell class="w-item w-box5" title="帮助"  >
          <img slot="icon" src="../assets/img/mycenter/i_b_006.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="w-item w-box6" title="关于我们"  >
          <img slot="icon" src="../assets/img/mycenter/i_b_007.png" width="24" height="24">
        </mt-cell>
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

  },
}

</script>
<style type="text/css" lang="less">
  .all-header{
    height: .95rem;
    background-color: white;
    border-bottom:.01rem solid #e4e5e7;
  }
.all-header .right img{
   width: .4rem;
  height: .4rem;
}
.all-header h1{
  font-size: .36rem;
  color: #333333;
}
  .m-box1,.m-box2{
    background-color:white;
  }
.m-box2{
  margin-top: .4rem;
}
.w-content>.inner{
  padding: 0 .2rem;
}
  .wallet-cell {
    margin-top: .4rem;
    min-height: 1.8rem;
    background-color: #4D7BF3;
    color: white;
  }

  .wallet-cell .mint-cell-title img{
    width: .54rem;
    height: .46rem;
  }
  .wallet-cell .mint-cell-title .mint-cell-text{
    font-size: .36rem;
  }
  .wallet-cell .mint-cell-title .mint-cell-label{
    font-size: .24rem;
  }
 .mint-cell-title  .mint-cell-label{
   color: #becffa;
  }
.wallet-cell .mint-cell-allow-right::after{
  width: .4rem;
  height: .4rem;
  border-color: white;
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

.w-content .mint-cell-title .mint-cell-text{
  margin-left: .3rem;
}

.w-item .mint-cell-title .mint-cell-text{
  font-size: .3rem;
}

 .w-content .mint-cell{
    min-height: .85rem;
    border-bottom: .01rem solid #ecedee;
  }

</style>
