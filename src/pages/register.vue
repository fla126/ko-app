<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="register-form">
      <h1 class="register-top">{{$t('message.register.register')}}</h1>
      <div class="form">
        <p>
          <i class="mobile"></i>
          <input type="tel" autofocus="autofocus" v-model="formData.phoneNumber" maxlength="11" :placeholder="$t('message.register.phonePlaceholder')">
        </p>
        <p>
          <i class="password"></i>
          <input type="password" v-model="formData.password" maxlength="16" :placeholder="$t('message.register.passwordPlaceholder')"><i class="clear-password" v-tap="{methods:resetPW}"></i>
        </p>
        <p>
          <i class="password"></i>
          <input type="password" v-model="formData.confirmPassword" maxlength="16" :placeholder="$t('message.register.passwordAgainPlaceholder')">
        </p>
        <p>
          <i class="code"></i>
          <input type="tel" v-model="formData.smsCode" :placeholder="$t('message.register.CodeEnterPlaceholder')" maxlength="6">
          <mt-button type="primary" size="small" v-tap="{methods:sendSms}">{{$t('message.register.acquire')}}<template v-if="disabled">({{time}}s)</template></mt-button>
        </p>
        <div class="register-btn">
          <mt-button type="primary" size="large" v-tap="{methods:register}">{{$t('message.register.register')}}</mt-button>
        </div>
      </div>
    </div>
    <p class="agreement">{{$t('message.register.agreeTip')}}<span @click="toggleAgreement">《{{$t('message.register.userProtocol')}}》</span></p>
    <mask-layer :isgray="true" :show="maskShow" @hide="hideFunction">
      <div class="content">
        <i class="close" v-tap="{methods:hideFunction}">×</i>
        <p class="title">User register protocol</p>
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
import userApi from '../api/user'
import utils from '@/assets/js/utils'
import Tip from '@/components/common/tip.js'

export default {
  name:'register',
  data(){
  	return {
  		formData: {
        registerType: 0,
        email: '',
        phoneNumberType: 1,
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        invitedCode: '',
        smsCode: ''
      },
      time: 60,
      checked: true,
      disabled: false,
      maskShow:false,
  	}
  },
  computed: {
    btnDisabled () {
      if (!$.trim(this.formData.phoneNumber)) {
        return true
      } else if (!/^1(3|4|5|7|8)\d{9}$/.test($.trim(this.formData.phoneNumber))) {
        return true
      } else {
        return this.disabled
      }
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
    hideFunction(){
      this.maskShow = false
    },
    resetPW(){
      this.password = ''
    },
    register () {
      let formData = {}
      for (let i in this.formData) {
        formData[i] = this.formData[i]
      }
      if (formData.registerType === 1) {
        delete formData.phoneNumber
        delete formData.phoneNumberType
        delete formData.smsCode
      } else {
        delete formData.email
      }
      if (!$.trim(formData.phoneNumber)) {
        Tip({type:'danger', message:this.$t('message.register.phonePlaceholder')})
        return
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test($.trim(formData.phoneNumber))) {
        Tip({type:'danger', message:this.$t('message.register.validPhone')})
        return
      }
      if (!formData.password) {
        Tip({type:'danger', message:this.$t('message.register.passwordPlaceholder')})
        return
      }
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(formData.password)) {
        Tip({type:'danger', message:this.$t('message.register.passwordPlaceholder')})
        return
      }
      if (!formData.confirmPassword) {
        Tip({type:'danger', message:this.$t('message.register.passwordAgainPlaceholder')})
        return
      }
      if (formData.password !== formData.confirmPassword) {
        Tip({type:'danger', message:this.$t('message.register.differentPassword')})
        return
      }
      if (!$.trim(formData.smsCode)) {
        Tip({type:'danger', message:this.$t('message.register.CodeEnterPlaceholder')})
        return
      }
      
      formData.password = utils.encryptPwd(formData.password)
      formData.confirmPassword = utils.encryptPwd(formData.confirmPassword)
      userApi.registerUser(formData, (res) => {
        Tip({type:'success', message:this.$t('message.register.regSuccess')})
        this.$router.push({name: 'login'})
      }, (msg) => {
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    sendSms () {
      if (this.btnDisabled) {
        return
      }
      if (this.formData.phoneNumber === '') {
        Tip({type:'danger', message:this.$t(`message.register.first`)})
        return
      }
      this.disabled = true
      userApi.sendSmsUser({
        phoneNumber: this.formData.phoneNumber,
        phoneNumberType: this.formData.phoneNumberType
      }, (res) => {
        let timeOut = () => {
          this.time--
          if (this.time === 0) {
            this.disabled = false
            this.time = 60
            return
          }
          setTimeout(timeOut, 1000)
        }
        setTimeout(timeOut, 1000)
        Tip({type:'success', message:this.$t(`message.register.codeSuccess`)})
      }, (msg) => {
        this.disabled = false
        Tip({type:'danger', message:this.$t(`message.error_code.${msg}`)})
      })
    },
    login () {
      this.$router.push({name: 'login'})
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
  border-radius: 4px;
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