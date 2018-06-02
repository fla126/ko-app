<template>
  <div id="app" class="h100">
      <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
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