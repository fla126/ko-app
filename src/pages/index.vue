<template>
  <div class="wrap">
    <transition enter-active-class="animated short slideInRight" leave-active-class="animated short slideOutLeft">
      <router-view style="overflow-y: auto;" :style="{height:height}"></router-view>
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
      height:'auto'
    }
  },
  created(){
    
  },
  mounted(){
    this.height = (window.innerHeight - $('#footer').height())+'px'
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