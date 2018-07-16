<template>
  <div class="page">
    <template v-if="getUsbkeyStatus && !isInited && !loading">
      <div class="login-top"><i></i></div>
      <div class="action-sheet">
        <mt-button type="primary" size="large" v-tap="{methods:showIPLayer}">{{$t('message.init.createWallet')}}</mt-button>
        <mt-button type="primary" class="mt40" size="large" v-tap="{methods:importWallet}">{{$t('message.init.importWallet')}}</mt-button>
        <mt-button type="primary" class="mt40" size="large" v-tap="{methods:$root.routeTo,to:'page-wallet'}">{{$t('message.init.skip')}}</mt-button>
      </div>
    </template>
    <template v-if="!getUsbkeyStatus && !loading">
      <div class="unlinked">
        <h1>{{$t('message.usbkeyStatus.disconnect')}}</h1>
        <div class="reconnect-container">
          <p class="tip-text">{{$t('message.usbkeyStatus.tip')}}</p>
          <mt-button type="primary" @touchstart="" class="mt50" size="large" v-tap="{methods:connect}">{{$t('message.usbkeyStatus.reconnect')}}</mt-button>
        </div>
      </div>
    </template>
    <template v-if="getUsbkeyStatus && isInited && !loading">
      <div class="login-top"><i></i></div>
      <div class="login-form">
        <h4>{{$t('message.init.inputPassword')}}</h4>
        <input type="password" id="password"  v-model="password" maxlength="6" @keydown="checkInput($event)" v-focus>
        <div class="password-display" v-tap="{methods:setFocus}"><span :class="{active:getActive(1)}">&nbsp;</span><span :class="{active:getActive(2)}">&nbsp;</span><span :class="{active:getActive(3)}">&nbsp;</span><span :class="{active:getActive(4)}">&nbsp;</span><span :class="{active:getActive(5)}">&nbsp;</span><span :class="{active:getActive(6)}">&nbsp;</span></div>
        <mt-button type="primary" @touchstart="" :disabled="password.length!=6" class="login-btn" size="large" v-tap="{methods:login}">{{$t('message.login.login')}}</mt-button>
      </div>
    </template>
    <mask-layer :show="isIPLayer" :isgray="true" @hide="hideIPLayer">
      <div class="init-form">
        <i class="close" v-tap="{methods:hideIPLayer}">×</i>
        <h3>{{$t('message.init.passwordLayerTitle')}}</h3>
        <p class="mt30"><input type="password"  maxlength="6" v-model="initPassword" :placeholder="$t('message.init.enterPassword')"><i class="clear-password" v-tap="{methods:resetPW}" v-show="showPWClear"></i></p>
        <p><input type="password" v-model="confirmPassword" maxlength="16" :placeholder="$t('message.init.confirmPassword')"></p>
        <mt-button type="primary"  @touchstart="" :disabled="initPassword.length!=6" class="mt40" size="large" v-tap="{methods:initDevice}">{{$t('message.register.confirm')}}</mt-button>
      </div>
    </mask-layer>
    <loading :show="loading"></loading>
  </div>
</template>

<script>
// import cordova from '@/assets/js/cordovaApi'
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
import loading from '@/components/common/loading'
import Tip from '@/components/common/tip'
import maskLayer from '@/components/common/mask'

export default {
  name:'page-init',
  data(){
    return {
      isInited:false, //设备是否已经初始化
      password:'',
      isIPLayer:false,
      initPassword:'',
      confirmPassword:'',
      loading:false
    }
  },
  created(){
    // this.setUsbkeyStatus(true)
    this.connect()
  },
  mounted(){

  },
  computed:{
    ...mapGetters(['getUsbkeyStatus']),
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
    ...mapActions(['setUsbkeyStatus','setHasLogin']),
    showIPLayer(){
      this.isIPLayer = true
    },
    resetPW(){
      this.initPassword = ''
      this.confirmPassword = ''
    },
    login(){ //登录硬件钱包
      cordova.plugins.WalletApi.login(this.password,(res)=>{
        res = JSON.parse(res)
        console.log(res)
        if(res.code==1){
          this.setHasLogin(true)
          this.getWalletList()
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.invalidPassword.init')})
        }
      })
    },
    checkInput(event){
      if(event.keyCode == 13 && this.password.length == 6){
        this.login()
      }
    },
    setFocus(){
      $('#password').focus()
    },
    getActive(len){
      return this.password.length>=len? true: false
    },
    initDevice(args){ //初始化硬件钱包
      if(this.initPassword === this.confirmPassword){
        cordova.plugins.WalletApi.importAuth(this.initPassword, (res)=>{
          res = JSON.parse(res)
          console.log(res)
          if(res.code==1){
            this.isInited =true
            this.setHasLogin(true)
            this.getWalletList()
            this.isIPLayer = false
          } else if(res.code==2){
            this.isInited =true
            this.isIPLayer = false
          } else{
            Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.initializeFailure')})
          }
        })
      } else {
        Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.register.differentPassword')})
      }
    },
    importWallet(args){ //导入已初始化钱包
      alert('此功能有待完善')
    },
    getWalletList(){ //获取硬件钱包列表
      cordova.plugins.WalletApi.getWalletList((res)=>{
        res = JSON.parse(res)
        console.log(res)
        this.$router.replace({name:'page-wallet'})
      })
    },
    connect(){ //连接硬件设备
      cordova.plugins.WalletApi.isImportAuth((res)=>{
        res = JSON.parse(res)
        if(res.code==1){
          this.setUsbkeyStatus(true)
          this.isInited = true
        } else if(res.code==0){
          this.setUsbkeyStatus(true)
        } else {
          Toast(this.$t('message.init.checkException'))
          setTimeout(this.connect,10000)
        }
        this.loading = false
      })
    },
    hideIPLayer(){
      this.isIPLayer = false
    }
  },
  components:{
    loading,
    maskLayer,
  }
}

</script>
<style lang="less" scoped="">
.html {background-color: #f9f9f9;}
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
.action-sheet {
  position: absolute;
  left: 0.5rem;
  right: 0.3rem;
  bottom: 1.45rem;
}
.unlinked {
  height: 100%;
  background: url('../assets/img/device_unlinked.png') no-repeat center 40%;
  background-size: 4rem;
  h1 {padding-top: 0.6rem; font-size: 0.6rem; text-align: center; color: #2e2e2e;}
  .reconnect-container {
    position: absolute; left:0.3rem; right: 0.3rem; bottom: 1rem;
    .tip-text {width: 80vw; padding: 0.1rem 0.15rem; line-height: 0.4rem; font-size: 0.24rem; background-color: #f5f5f5; border-radius: 5px; color: #a8a8a8; word-break: break-all; margin: auto; text-align: center;}
  }
  
}
.login-form {
   position: relative;
   width: 70%;
   margin: auto;
   text-align: center;
  h4 {padding-top: 0.5rem; font-size: 0.28rem; text-align: center; color: #707070;}
  input {
    position: absolute;
    left: -100vw;
  }
  .password-display{
    position: relative;
    width: 4.26rem;
    height: 0.7rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.6rem;
    border-radius: 4px;
    border: 1px solid #9b9b9b;
    overflow: hidden;
    span {
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      line-height: 0.82rem;
      border-right: 1px solid #9b9b9b;
      &:last-of-type{
        border-right: none;
      }
      &.active:after {
        display: inline-block;
        content: '';
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background-color: #333;
      }
    }
  }
  .login-btn {
    margin-top: 1.2rem;
    width: 4.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}
.init-form {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5.4rem;
  height: 3.9rem;
  margin: auto;
  padding-top: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #fff;
  border-radius: 0.1rem;
  // overflow: hidden;
  text-align: center;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #6c6c6c;
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
  p {
    padding-bottom: 0.12rem;
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
      width: 0.6rem;
      height: 0.5rem;
      background:#fff no-repeat center;
      background-size: contain;
      vertical-align: middle;
      top: 0;
      &.clear-password {
        background-image: url('../assets/img/mimabukejian@3x.png');
        right: 0;
      }
    }
    input {
      width: 5rem;
      border: none;
      background-color: transparent;
      font-size: 0.28rem;
      &::placeholder {
        color: #666;
      }
    }
    &:nth-of-type(2){
      margin-top: 0.2rem;
    }
  }
}

</style>
