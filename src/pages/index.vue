<template>
  <div class="wrap">
    <transition enter-active-class="animated short fadeIn" leave-active-class="animated short fadeOut">
      <router-view :class="['frames']"></router-view>
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
.frames {
  height:-webkit-calc(~"100vh - 1.14rem");
  height: calc(~"100vh - 1.14rem");
}
</style>
