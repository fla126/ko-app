<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="register-form">
      <h1 class="register-top">注册</h1>
      <div class="form">
        <p><i class="mobile"></i><input type="tel" name="mobile" placeholder="输入手机号"></p>
        <p><i class="password"></i><input type="password" name="password" placeholder="输入密码"><i class="clear-password"></i></p>
        <p><i class="password"></i><input type="password" name="confirmPassword" placeholder="确认密码"></p>
        <p><i class="code"></i><input type="tel" name="code" placeholder="输入验证码" maxlength="6"><mt-button type="primary" size="small">获取验证码</mt-button></p>
        <div class="register-btn"><mt-button type="primary" size="large">登录</mt-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import compTopBack from '@/components/common/top_back'
import Data from '@/api/data'


export default {
  name:'register',
  data(){
  	return {
  		
  	}
  },
  created(){
  	
  },
  mounted(){
  	
  },
  updated(){
  	
  },
  methods:{
  },
  components:{    
   compTopBack,
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