<template>
  <div  class="page wrap">
    <comp-top-back :class="'line'" :back="true" >
       新手必读
    </comp-top-back>
    <div class="box page-main" id="scroll" >
      <div class="inner" >
       <section>
          <p>为什么一定要备份助记词！如何妥善备份助记词怀疑自己助记词泄露怎么办？在导入助记词时，输入提示无效是什么原因？导入助记词后, 发现生成的钱包地址和之前的地址不一样, 是怎么回事?</p>
         <p>如何妥善备份助记词</p>
         <p> 助记词是未经任何加密措施保护的私钥, 一旦有人得到了你的助记词, 那就等同于掌控了你的钱包, 在使用助记词时候需要注意以下几点:</p>
         <p>  1. 在 Tinkey 创建钱包之后, 一定要及时备份助记词</p>
         <p>  2. 备份助记词时, 要尽量采用物理介质备份, 比如手抄在一张纸上, 然后收藏好这张纸。尽可能不要使用截屏</p>
         <p>  3. 要确保备份的助记词准确, 多次校对助记词是否正确, 并且可以使用其他支持助记词的钱包, 导入你所备份的助记词, 检验备份的助记词是否正确</p>
         <p>  4. 一定要妥善保管好你所备份的助记词, 一是做好网络隔绝措施, 二是要好防丢措施</p>
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
    name: "page-mustRead",
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
