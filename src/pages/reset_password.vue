<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="register-form">
      <h1 class="register-top">{{$t('message.register.resetPassword')}}</h1>
      <div class="form">
        <p><i class="mobile"></i><input type="tel" name="mobile" v-model="account" maxlength="11" :placeholder="$t('message.register.phonePlaceholder')"></p>
        <p><i class="password"></i><input type="password" name="password" v-model="password" maxlength="16" :placeholder="$t('message.register.passwordPlaceholder')"><i class="clear-password" v-tap="{methods:resetPW}"></i></p>
        <p><i class="password"></i><input type="password" name="password2" v-model="password2" maxlength="16" :placeholder="$t('message.register.passwordAgainPlaceholder')"></p>
        <p><i class="code"></i><input type="tel" name="code" v-model="smsCode" :placeholder="$t('message.register.CodeEnterPlaceholder')" maxlength="6"><mt-button type="primary" size="small">{{$t('message.register.acquire')}}</mt-button></p>
        <div class="register-btn"><mt-button type="primary" size="large" v-tap="{methods:reset}">{{$t('message.register.confirm')}}</mt-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import maskLayer from '@/components/common/mask'
import Data from '@/api/data'


export default {
  name:'reset-password',
  data(){
  	return {
  		password: "",
      password2: "",
      account: "",
      smsCode: "",
      disabled: false,
      maskShow:false,
  	}
  },
  created(){
  	
  },
  mounted(){
  	
  },
  updated(){
  	
  },
  methods:{
    toggleAgreement(){
      //显示用户协议
      this.maskShow = true
    },
    reset(args){
      //注册处理函数

    },
    hideFunction(){
      this.maskShow = false
    },
    resetPW(){
      this.password = ''
    }
  },
  components:{    
   maskLayer,
  }
}

</script>
<style lang="less" scoped>

.register-top {
  margin-top: 0.5rem;
  font-size: 0.6rem;
}
.register-form {
  padding-left: 0.45rem;
  padding-right: 0.45rem;
  .form {
    margin-top: 0.95rem;
  }
  p {
    padding-bottom: 0.22rem;
    padding-left: 0.75rem;
    margin-top: 0.6rem;
    position: relative;
    line-height: 0.5rem;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid #eaebec;
      border-top: 1px solid #fff;
    }
    i {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background: no-repeat center;
      background-size: contain;
      vertical-align: middle;
      &.mobile {
        background-image: url('../assets/img/shoujihao@3x.png');
        left: 0;
      }
      &.password {
        background-image: url('../assets/img/mima@3x.png');
        left: 0;
      }
      &.clear-password {
        background-image: url('../assets/img/mimabukejian@3x.png');
        right: 0;
      }
      &.code {
        background-image: url('../assets/img/yanzheng@3x.png');
        left: 0;
      }
    }
    input {
      width: 5rem;
      border: none;
      border-left: 1px solid #666666;
      background-color: transparent;
      padding-left: 0.4rem;
      font-size: 0.28rem;
      &::placeholder {
        color: #666;
      }
    }
    button {
      position: absolute;
      right: 0;
      top: -0.1rem;
    }
    &:first-of-type{
      margin-top: 0.9rem;
    }
  }
  .register-btn {
    margin-top: 1.3rem;

  }
}
</style>