<template>
  <mask-layer :isgray="true" :show="show" @hide="hideFunction">
    <div class="pwconfirm-layer" >
      <h3>请输入付款密码</h3>
      <input type="password" id="password" v-model="password"  v-focus>
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:pwconfirm}">确认</mt-button>
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
    }
  },
  data(){
    return {
      password:''
    }
  },
  mounted(){

  },
  methods:{
    routeTo(args){
     this.$router.push({ name: args.to, query:args.params})
    },
    pwconfirm(){
      this.routeTo({to:'page-wallet-detail'})
    },
    setFocus(){
      $('#password').focus()
    },
    setBlur(args){
      var $tar = $(args.event.target)
      if(!($tar.parents('.password-display').length || $tar.hasClass('password-display'))){
        $('#password').blur()
      }
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
  overflow: hidden;
  text-align: center;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #6c6c6c;
  input {
    margin: 0.35rem auto;
    width: 3.4rem;
    border:none;
    background-color: transparent;
    border-bottom: 1px solid #333;
    line-height: 0.5rem;
    font-size: 0.32rem;
    &:focus {
      outline: none;
    }
  }
  h3 {
    font-size: 0.32rem;
  }
}
.step-next {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .mint-button {
    border-radius: 0;
  }
}
</style>