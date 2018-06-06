<template>
  <div class="page">
    <comp-top-back>
      <span class="selected-title">BTC01</span></span>
    </comp-top-back>
    <div class="page-main">
      
    </div>
  </div>
</template>

<script>

import data from '@/api/data'
import compTopBack from '@/components/common/top_back'


export default {
  name:'page-wallet-gather',
  data(){
    return {
      scroll:false,
    }
  },
  created(){
    
  },
  mounted(){
    setTimeout(this.initScroll,700)
    
  },
  updated(){
    
  },
  methods:{
    initScroll(){
      var self = this
      this.scroll = new IScroll('#scroll',{
        mouseWheel:true,
        tap:true
      });
    },
  },
  components:{    
    compTopBack,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
}

</style>