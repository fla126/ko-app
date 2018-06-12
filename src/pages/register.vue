<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="register-form">
      <h1 class="register-top">注册</h1>
      <div class="form">
        <p><i class="mobile"></i><input type="tel" name="mobile" v-model="account" maxlength="11" placeholder="输入手机号"></p>
        <p><i class="password"></i><input type="password" name="password" v-model="password" maxlength="16" placeholder="输入密码,6-16位英文或数字"><i class="clear-password" v-tap="{methods:resetPW}"></i></p>
        <p><i class="password"></i><input type="password" name="password2" v-model="password2" maxlength="16" placeholder="请再次输入密码"></p>
        <p><i class="code"></i><input type="tel" name="code" v-model="smsCode" placeholder="请输入验证码" maxlength="6"><mt-button type="primary" size="small">获取验证码</mt-button></p>
        <div class="register-btn"><mt-button type="primary" size="large" v-tap="{methods:register}">注册</mt-button></div>
      </div>
    </div>
    <p class="agreement">点击注册按钮，即同意凯欧琏<span @click="toggleAgreement">《用户协议》</span></p>
    <mask-layer :isgray="true" :show="maskShow" @hide="hideFunction">
      <div class="content">
        <i class="close" v-tap="{methods:hideFunction}">×</i>
        <p class="title">用户注册协议</p>
        <div class="scroll">
          <p>用户协议</p>
        </div>
      </div>
    </mask-layer>
  </div>
</template>

<script>
import maskLayer from '@/components/common/mask'
import Data from '@/api/data'


export default {
  name:'register',
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
    register(args){
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
.agreement {
  margin-top: 0.5rem;
  font-size: 0.24rem;
  text-align: center;
  color: #585858;
  span {
    color: #4D7BF3;
  }
}
.content {
  position: absolute;
  left: 0.65rem;
  right: 0.65rem;
  top:2.5rem;
  bottom: 2rem;
  border-radius: 10px;
  background-color: #fff;
  .title {
    font-size: 0.32rem;
    font-weight: 600;
    text-align: center;
    padding: 0.3rem;
  }
  .scroll {
    position: absolute;
    top: 0.92rem;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0.3rem;
    color: #323232;
    font-size: 0.24rem;
    overflow-y: scroll;
    line-height: 0.5rem;
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
</style>