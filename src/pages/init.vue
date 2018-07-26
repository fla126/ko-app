<template>
  <div class="page">
    <!-- 引导-->
    <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
    <div class="page-rec" v-if="(isfirst || !getIsInited) && !unlinkedShow && isActionSheet">
      <div class="login-top"><i></i></div>
      <div class="action-sheet">
        <mt-button type="primary" size="large" v-tap="{methods:guideWallet}">{{$t('message.init.createWallet')}}</mt-button>
        <mt-button type="primary" class="mt40" size="large" v-tap="{methods:importWallet}">{{$t('message.init.importWallet')}}</mt-button>
        <mt-button type="primary" class="mt40" size="large" v-tap="{methods:$root.routeTo,to:'page-wallet'}">{{$t('message.init.skip')}}</mt-button>
      </div>
    </div>
    </transition>
    <!-- 硬件未连接-->
    <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
    <div class="page-rec" v-if="!getUsbkeyStatus && unlinkedShow">
      <div class="unlinked">
        <comp-top-back :back="false"><span class="btn-back" v-tap="{methods:()=>{unlinkedShow=false}}"></span></comp-top-back>
        <h1>{{$t('message.usbkeyStatus.disconnect')}}</h1>
        <div class="reconnect-container">
          <p class="tip-text">{{$t('message.usbkeyStatus.tip')}}</p>
        </div>
      </div>
    </div>
    </transition>
    <!-- 硬件登陆-->
    <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
    <div class="page-rec" v-if="getUsbkeyStatus && getIsInited && !isfirst">
      <div class="page-rec"></div>
      <div class="login-top"><i></i></div>
      <div class="login-form">
        <h4>{{$t('message.init.inputPassword')}}</h4>
        <input type="password" id="password"  v-model="password" maxlength="6" @keydown="checkInput($event)" v-focus>
        <div class="password-display" v-tap="{methods:setFocus}"><span :class="{active:getActive(1)}">&nbsp;</span><span :class="{active:getActive(2)}">&nbsp;</span><span :class="{active:getActive(3)}">&nbsp;</span><span :class="{active:getActive(4)}">&nbsp;</span><span :class="{active:getActive(5)}">&nbsp;</span><span :class="{active:getActive(6)}">&nbsp;</span></div>
        <!-- <mt-button type="primary" @touchstart="" :disabled="password.length!=6" class="login-btn" size="large" v-tap="{methods:login}">{{$t('message.login.login')}}</mt-button> -->
      </div>
    </div>
    </transition>
    <!-- 密码风险提示 -->
    <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
    <div class="page-rec" v-if="isRiskTip">
      <comp-top-back :back="false"><span class="btn-back" v-tap="{methods:()=>{isRiskTip=false,isActionSheet=true}}"></span></comp-top-back>
      <div class="form">
        <h1>{{$t('message.init.riskTipTitle')}}</h1>
        <p class="riskContent" v-html="$t('message.init.riskTipContent')"></p>
      </div>
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:()=>{isRiskTip=false,isSetPassword=true}}">{{$t('message.walletDetail.next')}}</mt-button>
      </div>
    </div>
    </transition>
    <!-- 密码设置 -->
    <transition enter-active-class="animated short myFadeIn" leave-active-class="animated short fadeOut">
    <div class="page-rec" v-if="isSetPassword">
      <comp-top-back :back="false"><span class="btn-back" v-tap="{methods:()=>{isSetPassword=false,isActionSheet=true}}"></span></comp-top-back>
      <div class="form init-form">
        <h1>{{$t('message.init.passwordTitle')}}</h1>
        <p class="mt30"><i class="password"></i><input type="password"  maxlength="6" v-model="initPassword" :placeholder="$t('message.init.enterPassword')"><i class="clear-password" v-tap="{methods:resetPW}" v-show="showPWClear"></i></p>
        <p><i class="password"></i><input type="password" v-model="confirmPassword" maxlength="6" :placeholder="$t('message.init.confirmPassword')"></p>
        <mt-button type="primary"  @touchstart="" :disabled="initPassword.length!=6" class="mt150" size="large" v-tap="{methods:initDevice}">{{$t('message.register.confirm')}}</mt-button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Toast,MessageBox  } from 'mint-ui'
import Tip from '@/components/common/tip'
import maskLayer from '@/components/common/mask'
import api from '@/api/data'

export default {
  name:'page-init',
  data(){
    return {
      isfirst:true, //是否第一次使用本APP
      unlinkedShow:false, //显示设备未连接界面
      isSetPassword:false, //显示密码设置界面
      isRiskTip:false, //显示密码设置风险提示界面
      isActionSheet:true, //显示引导主页界面
      password:'',
      initPassword:'',
      confirmPassword:'',
    }
  },
  created(){
    this.isfirst = localStorage.getItem('firstWalletLogin')?false:true
    this.unlinkedShow = this.$route.params.unlinkedShow || false
    
    this.$root.test()
  },
  mounted(){

  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getShowCurrency','getIsInited']),
    showPWClear(){
      return this.initPassword.length > 0  || this.confirmPassword.length > 0 ? true : false
    }
  },
  watch:{
    getUsbkeyStatus(n, o){
      if(n){this.unlinkedShow = false}
    },
    password(n, o){
      this.password = $.trim(n)
      if(this.password.length==6){
        $('#password').blur()
        setTimeout(this.login,300)
      }
    },
    initPassword(n, o){
      this.initPassword = $.trim(n)
    },
    confirmPassword(n, o){
      this.confirmPassword = $.trim(n)
    }
  },
  methods:{
    ...mapActions(['setUsbkeyStatus','setHasLogin','setIsInited','setFactoryCode','setWalletList']),
    getFactoryCode(){ //获取usbkey硬件ID号
      cordova.exec((res)=>{
        res = JSON.parse(res)
        console.log(res)
        if(res.code=='0'){
          this.setFactoryCode(res.msg)
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'getFactoryCode', [])
    },
    guideWallet(){ //引导新建或修改
      if(this.getUsbkeyStatus){
        if(this.isfirst && this.getIsInited){ //第一次登陆如果已初始化，提示是否需要改密
          MessageBox({
            title:this.$t('message.cmd.confirmTitle'),
            message:this.$t('message.init.isModifyPassword'),
            showCancelButton: true,
            showConfirmButton:true,
            cancelButtonText:this.$t('message.cmd.no'),
            confirmButtonText:this.$t('message.cmd.yes'),
          }).then(action => {
            
            if(action=='confirm'){
              this.$router.push({name:'page-modify-password'})
            } else {
              localStorage.setItem('firstWalletLogin',1)
              this.isfirst = false
            }
          })
        } else {
          MessageBox({
            title:this.$t('message.cmd.confirmTitle'),
            message:this.$t('message.init.isSetPassword'),
            showCancelButton: true,
            showConfirmButton:true,
            cancelButtonText:this.$t('message.cmd.no'),
            confirmButtonText:this.$t('message.cmd.yes'),
          }).then(action => {
            if(action=='confirm'){
              this.isActionSheet = false
              this.isRiskTip = true
              localStorage.setItem('firstWalletLogin',1)
            } 
          })
          
        }
      } else {
        this.unlinkedShow = true
      }
    },
    resetPW(){
      this.initPassword = ''
      this.confirmPassword = ''
    },
    login(){ //登录硬件钱包
      cordova.exec((res)=>{
        res = JSON.parse(res)
        console.log(res)
        if(res.code=='0'){
          this.setHasLogin(true)
          this.getWalletList()
          this.getFactoryCode()
        } else {
          this.password = ''
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'login', [this.password])
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
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
        if(reg.test(this.initPassword)){
          cordova.exec((res)=>{
            res = JSON.parse(res)
            console.log(res)
            if(res.code=='0'){ //初始化完成并登陆成功
              this.setHasLogin(true)
              this.getWalletList()
              this.getFactoryCode()
            } else if(res.code=='-5'){ //初始化完成但登陆失败,显示登陆界面
              this.isSetPassword = false
              this.getIsInited =true
            } else{ //初始化失败
              Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.initializeFailure')})
            }
          }, (error)=>{
            console.log(error)
          }, 'WalletApi', 'importAuthKey', [this.initPassword])
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.nonstandardPassword')})
        }
      } else {
        Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.register.differentPassword')})
      }
    },
    importWallet(args){ //导入已初始化钱包
      if(this.getUsbkeyStatus){
        alert('此功能有待完善')
      } else {
        this.unlinkedShow = true
      }
    },
    getWalletList(){ //获取硬件钱包列表
      var self = this
      cordova.exec((res)=>{
        res = JSON.parse(res)
        console.log(res)
        if(res.code=='0'){
          var publicKeys = JSON.parse(res.msg), walletList = [], walletNames = JSON.parse(localStorage.getItem('walletNames') || '{}')
          //解析钱包列表
          for(let i=0; i<publicKeys.length;  i++){ 
            if(publicKeys[i]){
              let wallet={}
              wallet.name = walletNames[publicKeys[i]] || ''
              wallet.publicKey = publicKeys[i]
              wallet.idx = i
              wallet.currency = {}
              walletList.push(wallet)
            }
          }
          this.setWalletList(walletList)
          //解析钱包列表里每种币种的数量
          for(var wallet of walletList){
            for(let token of this.getShowCurrency){
              var address = this.$root.getAddress(token, wallet.publicKey)
              api.getBalance(token,address,wallet,function(token, wallet, getData){
                getData.then((res)=>{
                  var balance = 0
                  if(res.data.rst){
                    balance = res.data.data.balance && res.data.data.balance
                  }
                  Vue.set(wallet.currency, token, balance)
                })
              })
            }
          }
          this.$router.replace({name:'page-wallet'})
        } else {
          this.setHasLogin(false)
          this.$router.replace({name:'page-init'})
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'GetAllEccPubKey', [])
    },

  },
  components:{
    maskLayer,
  }
}

</script>
<style lang="less" scoped="">
.html {background-color: #f9f9f9;}
.page-rec {position: absolute; left: 0; right: 0; top: 0; height: 100vh;}
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
  left: 0.3rem;
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
  h4 {padding-top: 0.7rem; font-size: 0.28rem; text-align: center; color: #707070;}
  input {
    position: absolute;
    left: -100vw;
  }
  .password-display{
    position: relative;
    width: 4.86rem;
    height: 0.8rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0.6rem;
    border-radius: 4px;
    border: 1px solid #9b9b9b;
    overflow: hidden;
    span {
      display: inline-block;
      width: 0.8rem;
      height: 0.8rem;
      line-height: 0.92rem;
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
