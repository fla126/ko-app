<template>
  <div class="page">
    <div class="login-top"><i></i></div>
    <div class="login-form">
      <div>
        <p><i class="mobile"></i><input type="tel" name="account" v-model="account" maxlength="11" placeholder="输入手机号"></p>
        <p><i class="password"></i><input type="password" name="password" v-model="password" maxlength="16" placeholder="输入密码"><i class="clear-password" v-tap="{methods:resetPW}"></i></p>
        <div class="findpw"><router-link :to="{name:'reset-password'}" tag="span">忘记密码？</router-link></div>
        <div class="login-btn"><mt-button type="primary" size="large" v-tap="{methods:$root.routeTo, to:'page-wallet'}">登录</mt-button></div>
        <div class="reg-btn">没有账号? <router-link :to="{name:'register'}">点击注册</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
  
import Data from '@/api/data'


export default {
  name:'login',
  data(){
  	return {
      account:'',
  		password:'',
  	}
  },
  created(){
  	
  },
  mounted(){
  	
  },
  updated(){
  	
  },
  methods:{
    resetPW(){
      this.password = ''
    }
  },
  components:{    
   
  }
}

</script>
<style lang="less" scoped>

.login-top {
  height: 4.6rem;
  position: relative;
  i {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    left: 0;
    top: 1.3rem;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    background: url('../assets/logo.png') no-repeat center;
    background-size: contain;
  }
}
.login-form {
  padding-left: 0.45rem;
  padding-right: 0.45rem;
  p {
    padding-bottom: 0.22rem;
    padding-left: 0.75rem;
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
    &:nth-of-type(2){
      margin-top: 0.9rem;
    }
  }
  .findpw {
    text-align: right;
    color: #666;
    margin-top: 0.32rem;
  }
  .login-btn {
    margin-top: 1.1rem;

  }
  .reg-btn {
    margin-top: 0.5rem;
    text-align: center;
    color: #585858;
    a {
      color: #4D7BF3;
    }
  }
}
</style>