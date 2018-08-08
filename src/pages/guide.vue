<template>
  <div class="guide">
    <mt-swipe :auto="0" :continuous="false" :class="{en:$i18n.locale=='en'}"  @change="handleChange">
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
      <mt-swipe-item></mt-swipe-item>
    </mt-swipe>
    <transition enter-active-class="animated fadeInUp">
      <mt-button type="primary" size="large" v-show="isBtn" @click="start">{{$t('message.start')}}</mt-button>
    </transition>
  </div>
</template>

<script>

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
     localStorage.setItem('firstWalletView',1)
     this.$parent.guide = false
    }
  },
  components:{

  }
}

</script>
<style lang="less">
.page .guide .mint-button.mint-button--large {
  height: 1.05rem;
    font-size: 0.4rem;
}
.guide {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999999;
  background-color: #fff;
  button {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 0;
  }
}
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
.guide.en .mint-swipe-item {
  &:nth-of-type(1) {
    background-image: url('../assets/img/guide_en_1.jpg');
  }
  &:nth-of-type(2) {
    background-image: url('../assets/img/guide_en_2.jpg');
  }
  &:nth-of-type(3) {
    background-image: url('../assets/img/guide_en_3.jpg');
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
