<template>
  <mask-layer :isgray="true" :show="show" @hide="hideFunction">
    <div class="pwconfirm-layer" >
      <i class="close" v-tap="{methods:hideFunction}">×</i>
      <h3>{{$t('message.walletDetail.payPassword')}}</h3>
      <input type="password" id="password"  v-model="password" maxlength="6" @keydown="checkInput($event)" v-focus>
      <div class="password-display" v-tap="{methods:setFocus}"><span :class="{active:getActive(1)}">&nbsp;</span><span :class="{active:getActive(2)}">&nbsp;</span><span :class="{active:getActive(3)}">&nbsp;</span><span :class="{active:getActive(4)}">&nbsp;</span><span :class="{active:getActive(5)}">&nbsp;</span><span :class="{active:getActive(6)}">&nbsp;</span></div>
      <div class="step-next">
        <mt-button type="primary" size="large" :disabled="password.length!=6" v-tap="{methods:pwconfirm}">{{$t('message.walletDetail.ok')}}</mt-button>
      </div>
    </div>
  </mask-layer>
</template>
<script>
import maskLayer from '@/components/common/mask';

export default {
  name:'comp-password-confirm',
  props:{
    show:{
      type: Boolean,
      default:false
    },
    hideFunction:{
      type: Function
    },
    submitFunction:{
      type: Function
    }
  },
  data(){
    return {
      password:''
    }
  },
  watch:{
    password(n, o){
      this.password = $.trim(n)
    }
  },
  methods:{
    setFocus(){
      $('#password').focus()
    },
    pwconfirm(){
      this.hideFunction()
      this.submitFunction(this.password)
    },
    checkInput(event){
      if(event.keyCode == 13 && this.password.length == 6){
        this.pwconfirm()
      }
    },
    getActive(len){
      return this.password.length>=len? true: false
    }
  },
  components:{  
    maskLayer,
  }
}

</script>
<style type="text/css" lang="less" scoped="">
.pwconfirm-layer {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5.4rem;
  height: 2.9rem;
  margin: auto;
  padding-top: 0.25rem;
  background-color: #fff;
  border-radius: 0.1rem;
  // overflow: hidden;
  text-align: center;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #6c6c6c;
  input {
    position: absolute;
    left: -100vw;
  }
  .password-display{
    position: relative;
    margin-top: 0.4rem;
    text-align: center;
    span {
      display: inline-block;
      width: 0.36rem;
      height: 0.5rem;
      margin: 0 0.12rem ;
      line-height: 0.5rem;
      border-bottom: 1px solid #333;
      &.active:after {
        display: inline-block;
        content: '';
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: #333;
      }
    }
  }
  h3 {
    font-size: 0.32rem;
  }
  .close {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    right: -0.2rem;
    top: -0.2rem;
    background-color: rgba(0,0,0,.5);
    border-radius: 50%;
    font-size: 0.5rem;
    color: rgba(255,255,255,.5);
    line-height: 0.5rem;
    text-align: center;
    font-style: normal;
  }
}
.step-next {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .mint-button {
    border-radius: 0;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
}
</style>