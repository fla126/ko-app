<template>
  <div id="app">
      <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
      	<router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'app',
  created(){
    let isfirst = localStorage.getItem('firstWallet')
    if(!isfirst){
      this.$router.replace({name:'guide'})
    } else {
      if(this.$route.name == 'index'){
        this.$router.replace({name:'login'})
      }
    }
  },
  components:{

  }
}
</script>
<style lang="less">
@import './assets/css/common/common.less';
</style>