<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       钱包使用
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
        <p> 助记词安全</p>
         <p>为什么一定要备份助记词！</p>
         <p> 如何妥善备份助记词</p>
         <p> 怀疑自己助记词泄露怎么办？</p>
         <p> 在导入助记词时，输入提示无效是什么原因？</p>
         <p> 导入助记词后, 发现生成的钱包地址和之前的地址不一样, 是怎么回事?</p>
         <p>密码钱包安全</p>
         <p> 密码忘记了怎么办？</p>
         <p> 如何安全使用 Keystore</p>
         <p>钱包安全指南</p>
         <p>苹果手机提醒 SSL 是怎么回事？</p>
         <p> 安卓手机提示手机 Root 是怎么回事?</p>
         <p> 防盗策略</p>
         <p>防丢策略</p>
         <p>私钥泄露, 钱包被盗, 能请求冻结账户吗？</p>

       </section>
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
    name: "page-walletUse",
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

<style type="text/css" lang="less" scoped>

  .page-main{
    overflow-y: hidden;
    background-color: #F9F9F9;
    padding-bottom: .2rem;
  }
.box{
  >.inner{
    padding:.3rem;
    font-size: .24rem;
  }
}
section{
  margin-top: .2rem;
  h1{
    font-size: .3rem;
    color:black;
    font-weight: bold;
  }
  p{
    line-height: .46rem;
  }
  .bottomcon{
    margin-top: .2rem;
    font-weight: bold;

  }
  .bottom{
    text-align: right;
    font-size: .3rem;
    font-weight: bold;
  }
}
</style>
