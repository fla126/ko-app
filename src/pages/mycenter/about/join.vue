<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       加入我们
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
          <p>在欧凯链，我们不是在工作，而是选择一种生活方式！没有人会要求你必须加班，或检查你早上是否迟到，这种工作模式在欧凯链并不存在。因为在欧凯链，我们会尽全力把该做的事情做好，我们没有传统的上班下班概念，也就意味着我们随时随地都在工作。如果你已经撸起袖子准备没日没夜的工作，并下定决心一起去重新定义未来的金融世界，一起去创造历史，请继续阅读；如果你觉得这听起来太天马行空、太操劳，那你可以省点力气，不用读下去了。</p>
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
    name: "page-join",
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
