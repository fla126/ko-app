<template>
  <div id="app">
      <transition enter-active-class="animated short slideInRight" leave-active-class="animated short slideOutLeft">
      	<router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Vue from 'vue'

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

//小写转大写过滤器
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

export default {
  name: 'app',
  created(){
    let isfirst = localStorage.getItem('firstWallet')
    if(!isfirst){
      this.$router.push({name:'guide'})
    } else {
      if(this.$route.name == 'index'){
        this.$router.push({name:'login'})
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