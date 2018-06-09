<template>
  <div class="wrap">
    <mt-swipe :auto="0" :continuous="false" class="guide" @change="handleChange">
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
    </mt-swipe>
    <transition enter-active-class="animated fadeInUp">
      <mt-button type="primary" size="large" v-show="isBtn" v-tap="{methods:start}">马上开始</mt-button>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name:'guide',
  data(){
    return {
      isBtn:false
    }
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    handleChange(index) {
      if(!this.isBtn && index==2){
        this.isBtn =true;
      }
    },
    start(args){
     localStorage.setItem('firstWallet',1)
     this.$router.replace({ name: 'page-wallet'})
    }
  },
  components:{

  }
}

</script>
<style lang="less" scoped="">
.wrap {
  background-color: #2d2e5a;
  button {
    position: absolute;
    bottom: 0;
    border-radius: 0;
    height: 1.05rem;
    font-size: 0.4rem;
  }
}

</style>
<style lang="less">

.guide .mint-swipe-item {
  background: no-repeat center;
  background-size: cover;
  &:nth-of-type(1) {
    background-image: url('../assets/img/guide_1.jpg');
  }
  &:nth-of-type(2) {
    background-image: url('../assets/img/guide_2.jpg');
  }
  &:nth-of-type(3) {
    background-image: url('../assets/img/guide_3.jpg');
  }
}
.guide .mint-swipe-indicators {
  bottom: 1.5rem;
  .mint-swipe-indicator {
    width: 0.25rem;
    height: 0.25rem;
    background: #fff;
    margin: 0 0.18rem;
    &.is-active {
        background: #407cf5;
        opacity: 1;
    }
  }
}
</style>
