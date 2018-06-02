<template>
  <div id="app">
      <transition enter-active-class="animated short slideInRight" leave-active-class="animated short slideOutLeft">
      	<router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import Loading from '@/components/common/loading'

Vue.component(Loading.name,Loading);

export default {
  name: 'app',
  components:{

  }
}
</script>
<style lang="less">
@import './assets/css/common/common.less';
</style>