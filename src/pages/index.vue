<template>
  <div class="wrap">
    {{ $t("message.hello") }}
    <loading :show="showLoading"></loading>
    <div style="height: 200vh;"></div>
    <comp-footer></comp-footer>
  </div>
</template>

<script>

import data from '@/api/data'
import compFooter from '@/components/common/footer'


export default {
  name:'index',
  data(){
    return {
      showLoading:false,      
    }
  },
  created(){
    
  },
  mounted(){
    
  },
  updated(){
    
  },
  methods:{
  },
  components:{    
    compFooter,
  }
}

</script>
<style lang="less" scoped>

</style>