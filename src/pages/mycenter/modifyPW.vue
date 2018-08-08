<template>
  <div class="page">
    <comp-top-back  :back="true" ></comp-top-back>
    <div class="page-main">
      <!-- 密码风险提示 -->
      <div class="page-rec" v-if="isRiskTip">
        <div class="form">
          <h1>{{$t('message.init.riskTipTitle')}}</h1>
          <p class="riskContent" v-html="$t('message.init.riskTipContent')"></p>
        </div>
        <div class="step-next">
          <mt-button type="primary" size="large" v-tap="{methods:()=>{isRiskTip=false,isModifyPassword=true}}">{{$t('message.walletDetail.next')}}</mt-button>
        </div>
      </div>
      <!-- 修改密码 -->
      <div class="page-rec" v-if="isModifyPassword">
        <div class="form init-form">
          <h1>{{$t('message.init.modifyPasswordTitle')}}</h1>
          <p class="mt30"><i class="password"></i><input type="tel" class="disc-input"  maxlength="6" v-model="password" :placeholder="$t('message.init.oldPassword')"></p>
          <p><i class="password"></i><input type="tel" class="disc-input" v-model="initPassword" maxlength="6" :placeholder="$t('message.init.enterPassword')"><i class="clear-password" v-tap="{methods:resetPW}" v-show="showPWClear"></i></p>
          <p><i class="password"></i><input type="tel" class="disc-input" v-model="confirmPassword" maxlength="6" :placeholder="$t('message.init.confirmPassword')"></p>
          <mt-button type="primary"  @touchstart="" :disabled="initPassword.length!=6 || password.length!=6" class="mt150" size="large" v-tap="{methods:modifyPassword}">{{$t('message.register.confirm')}}</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tip from '@/components/common/tip'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "page-modify-password",
  data(){
    return {
      isModifyPassword:false, //显示密码修改界面
      isRiskTip:true, //显示密码设置风险提示界面
      password:'',
      initPassword:'',
      confirmPassword:'',
    }
  },
  computed:{
    showPWClear(){
      return this.initPassword.length > 0  || this.confirmPassword.length > 0 ? true : false
    }
  },
  watch:{
    password(n, o){
      this.password = $.trim(n)
    },
    initPassword(n, o){
      this.initPassword = $.trim(n)
    },
    confirmPassword(n, o){
      this.confirmPassword = $.trim(n)
    }
  },
  methods:{
    ...mapActions(['setHasLogin','setWalletList']),
    resetPW(){
      this.initPassword = ''
      this.confirmPassword = ''
    },
    modifyPassword(){ //修改交易密码
      if(this.initPassword === this.confirmPassword){
        var reg = new RegExp(/^\w+$/)
        if(reg.test(this.initPassword)){
          this.checkLogin(this.password).then((status)=>{
            if(status){ //密码验证成功
              cordova.exec((res)=>{
                console.log('updateAuthKey=====',res)
                res = JSON.parse(res)
                if(res.code=='0'){
                  Tip({type:'success', title:this.$t('message.login.success'), message:this.$t('message.init.modifySuccess')})
                  localStorage.setItem('firstWalletLogin',1) //是否第一次使用app操作值
                  localStorage.setItem('needBackup',1) //提示需要备份操作值
                  this.setHasLogin(false)
                  this.setWalletList([])
                  this.$router.replace({name:'page-init'})
                }
              }, (error)=>{
                console.log(error)
              }, 'WalletApi', 'updateAuthKey', [this.password, this.initPassword])
            } else {
              this.password = ''
              Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.modifyFailure')})
            }
          })
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.nonstandardPassword')})
        }
      } else {
        Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.register.differentPassword')})
      }
    },
    checkLogin(password){ //验证密码正确性
      return new Promise(function(resolve, reject){
        cordova.exec((res)=>{
          res = JSON.parse(res)
          console.log('login=====',res)
          if(res.code=='0'){
            resolve(true)
          } else {
            resolve(false)
          }
        }, (error)=>{
          console.log(error)
        }, 'WalletApi', 'login', [password])
      })
    },
  }
}
</script>

<style lang="less"  scoped>
.page-main {
  overflow-y: hidden;
}
.page-rec {position: absolute; left: 0; right: 0; top: 0; bottom: 0;}
.form {
  padding-left: 0.45rem; 
  padding-right: 0.45rem;
  h1 {
    margin-top: 0.5rem;
    font-size: 0.6rem;
  }
  .riskContent {
    font-size: 0.24rem;
    line-height: 0.5rem;
  }
}
.init-form {
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
        background-image: url('../../assets/img/shoujihao@3x.png');
        left: 0;
      }
      &.password {
        background-image: url('../../assets/img/mima@3x.png');
        left: 0;
      }
      &.clear-password {
        background-image: url('../../assets/img/mimabukejian@3x.png');
        right: 0;
      }
      &.code {
        background-image: url('../../assets/img/yanzheng@3x.png');
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

.step-next {
  position: absolute;
  left: 0.3rem;
  right: 0.3rem;
  bottom: 0rem;
  padding-bottom: 0.3rem;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
}
</style>
