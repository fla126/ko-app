<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       常见问题
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
         <p>如何添加自定义代币如何冷钱包进行离线签名如何导入钱包？</p>
         <p>如何备份钱包？</p>
         <p>如何使用 imToken 高级模式密码忘记了怎么办？</p>
         <p>如何安全使用</p>
         <p> KeystoreimToken 2.0 超级节点投票指南如何下载使用 imToken 才安全?</p>
         <p>交易所提币到 imToken 长时间未到账</p>
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
    name: "page-problem",
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
          // mouseWheel:true,
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
