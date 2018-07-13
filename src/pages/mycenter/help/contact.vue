<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       联系我们
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
         <p> Websit: tinkey.io</p>
         <p>Email service@tinkey.io</p>
         <p>微信 WeChat wx_tinkey</p>
         <p> Github https://github.com/tinkeyio</p>
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
    name: "page-contact",
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
    line-height: .6rem;
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
