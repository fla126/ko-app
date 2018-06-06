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

export default {
  name: 'app',
  components:{

  }
}
</script>
<style lang="less">
@import './assets/css/common/common.less';
</style>