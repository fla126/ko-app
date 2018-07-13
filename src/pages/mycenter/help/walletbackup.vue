<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       钱包备份
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
         <p><a>推荐软文</a></p>
         <p>imToken 测评通关攻略</p>
         <p>基本概念解释</p>
         <p>路径</p>
         <p>钱包</p>
         <p>Keystore</p>
         <p>助记词</p>
         <p>明文私钥</p>
         <p>地址</p>
         <p>查看所有 9 篇文章</p>
         <p>基础操作教程</p>
         <p>如何添加自定义代币</p>
         <p>如何冷钱包进行离线签名</p>
         <p>如何导入钱包？</p>
         <p>如何备份钱包？</p>
         <p>为什么搜索不到某 Token</p>
         <p>风险评测无法通过, 如何导出钱包备份</p>
         <p>查看所有 18 篇文章</p>
         <p>高级进阶教程</p>
         <p>如何使用 imToken 高级模式</p>
         <p>创建钱包 json 文件</p>
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
    name: "page-walletbackup",
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
