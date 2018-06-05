<template>
  <div class="wrap">
    <transition enter-active-class="animated short slideInRight" leave-active-class="animated short slideOutLeft">
      <router-view class="auto-scroll"  :style="{height:height}"></router-view>
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
    this.setHeight()
    $(window).on('resize',this.setHeight)
  },
  updated(){
    
  },
  methods:{
    setHeight(){
      this.height = (window.innerHeight - $('#footer').height())+'px'
    },
  },
  components:{    
    compFooter,
  }
}

</script>
<style lang="less" scoped>
.auto-scroll {overflow: auto;}
</style>