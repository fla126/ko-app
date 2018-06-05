<template>
  <div class="wrap">
    <transition enter-active-class="animated short slideInRight" leave-active-class="animated short slideOutLeft">
      <router-view></router-view>
    </transition>
    <comp-footer id="footer"></comp-footer>
  </div>
</template>

<script>

import data from '@/api/data'
import compFooter from '@/components/common/footer'


export default {
  name:'index',
  data(){
    return {
      
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
.wrap {
  height: calc(~"100vh - 1.02rem");
}
</style>