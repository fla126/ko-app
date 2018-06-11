<template>
  <div  class="page wrap">
    <mt-header class=" common-mt-header" title="添加钱包">
      <a  slot="left" v-tap="{methods:routeTo, to:'page-uwallet'}">
        <mt-button v-tap="{methods:routeTo, to:'page-uwallet'}" icon="back"></mt-button>
      </a>
    </mt-header>

    <div class="common-content mt10">
       <div class="inner">
         <section class="item">
                <h1 class="f36 mt30">添加钱包</h1>
                <h2 class="f24 mt40 ft-c-gray30">币种</h2>
             <select class="select f24 mt30 ft-c-gray">
               <option>BTC</option>
               <option>ETH</option>
               <option>BARK</option>
             </select>
         </section>
       </div>
    </div>

    <div class="common-content mt10">
      <div class="inner">
        <section class="item">
          <h2 class="f24 mt40 ft-c-gray30">钱包名</h2>
          <input class="common-input-default f30 mt30"  placeholder="请输入要增加的信息" />
        </section>
      </div>
    </div>

    <footer>

        <div class="common-content footer mt100">
           <div class="inner">
              <p class="f20 ft-red">提示：为了创建钱包,你需要连接高清设备。</p>
              <mt-button class="mt20" size="large" type="primary" >添加</mt-button>
           </div>
        </div>
    </footer>

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
        name: "page-addwallet",
      methods:{
        routeTo(args){
          this.$router.push({ name: args.to})
        }
      },
    }
</script>

<style type="text/css" scoped >


.select{
  width:100%;
  height: .5rem;
  border:0;
  background: #f9f9f9;
  padding: .1rem;
}
.select:focus {
  outline:none;
  border: 0;
}
.common-input-default{
  padding:.1rem 0;
  width: 100%;
  border: 0;
  background: bottom;
}

.common-input-default:focus {
  outline:none;
  border: 0;
}

  .item{
    border-bottom: .01rem solid #e4e5e7;
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: .3rem;
    text-align: center;
  }
.footer button{
background-color: #4d7bf3;
}
</style>
