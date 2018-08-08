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
        <input type="tel" id="password"  v-model="password" maxlength="6" @keydown="checkInput($event)" v-focus>
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
        <p class="mt30"><i class="password"></i><input type="tel" class="disc-input"  maxlength="6" v-model="initPassword" :placeholder="$t('message.init.enterPassword')"><i class="clear-password" v-tap="{methods:resetPW}" v-show="showPWClear"></i></p>
        <p><i class="password"></i><input type="tel" class="disc-input" v-model="confirmPassword" maxlength="6" :placeholder="$t('message.init.confirmPassword')"></p>
        <mt-button type="primary"  @touchstart="" :disabled="initPassword.length!=6" class="mt150" size="large" v-tap="{methods:initDevice}">{{$t('message.register.confirm')}}</mt-button>
      </div>
    </div>
    </transition>
    <mt-actionsheet
      :actions="actions"
      :cancelText="$t('message.init.cancel')"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Toast,MessageBox  } from 'mint-ui'
import Tip from '@/components/common/tip'
import maskLayer from '@/components/common/mask'
import api from '@/api/data'
import Config from '@/api/config'

export default {
  name:'page-init',
  props:{
    unlinked:{
      type: Boolean,
      default:false
    }
  },
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
      actions:[],
      sheetVisible:false,
      isImport:false, //是否进入导入操作
    }
  },
  created(){
    this.isfirst = localStorage.getItem('firstWalletLogin')?false:true
    this.unlinkedShow = this.$route.params.unlinkedShow || false
    window.getWalletList = this.getWalletList //全局化获取钱包，方便刷新调用
    this.actions = [
      // {name:this.$t('message.init.fromYUN'), method:()=>{}},
      {name:this.$t('message.init.fromQR'), method:()=>{this.$router.push({name:'page-importQR'})}},
      // {name:this.$t('message.init.fromABKEY'), method:()=>{}},
    ]

    // this.setIsInited(true)
    // this.setUsbkeyStatus(true)
    // this.$root.test()
    // setTimeout(()=>{
    //   this.getWalletList()
    // },1000)
  },
  mounted(){
    if(this.unlinkedShow){
      setTimeout(()=>{
        this.$router.replace({name:'page-wallet'})
      },2000)
    }
    console.log(this.unlinked)
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getShowCurrency','getIsInited','getContractAddr','getFactoryCode']),
    showPWClear(){
      return this.initPassword.length > 0  || this.confirmPassword.length > 0 ? true : false
    }
  },
  watch:{
    unlinked(n, o ){
      this.unlinkedShow = n
    },
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
    getFacCode(){ //获取usbkey硬件ID号
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
          MessageBox.confirm(this.$t('message.init.isModifyPassword'),this.$t('message.cmd.confirmTitle'),{
            cancelButtonText:this.$t('message.cmd.no'),
            confirmButtonText:this.$t('message.cmd.yes'),
          }).then(action => {
            this.$router.push({name:'page-modify-password'})
          }).catch((action)=>{
            localStorage.setItem('firstWalletLogin',1)
            this.isfirst = false
          })
        } else {
          MessageBox.confirm(this.$t('message.init.isSetPassword'),this.$t('message.cmd.confirmTitle'),{
            cancelButtonText:this.$t('message.cmd.no'),
            confirmButtonText:this.$t('message.cmd.yes'),
          }).then(action => {
            this.isActionSheet = false
            this.isRiskTip = true
            localStorage.setItem('firstWalletLogin',1)
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
          this.getFacCode()
          let needBackup = localStorage.getItem('needBackup')
          if(needBackup){
            MessageBox.confirm(this.$t('message.init.backupMessage'),this.$t('message.cmd.confirmTitle'),{
              cancelButtonText:this.$t('message.cmd.no'),
              confirmButtonText:this.$t('message.cmd.yes'),
            }).then(action => {
              this.$router.push({name:'page-backup'})
            }).catch(action =>{
              this.$router.replace({name:'page-wallet'})
            })
            localStorage.removeItem('needBackup')
          } else {
            this.$router.replace({name:'page-wallet'})
          }
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
        var reg = new RegExp(/^\w+$/)
        if(reg.test(this.initPassword)){
          cordova.exec((res)=>{
            res = JSON.parse(res)
            console.log(res)
            if(res.code=='0'){
              if(this.isImport){ //如果是导入操作进入的初始化，则进入初始化成功后的导入操作跳转
                this.$router.push({name:'page-importQR'})
              } else{ //初始化完成并登陆成功
                this.setHasLogin(true)
                this.getWalletList()
                this.getFacCode()
                MessageBox.confirm(this.$t('message.init.backupMessage'),this.$t('message.cmd.confirmTitle'),{
                  cancelButtonText:this.$t('message.cmd.no'),
                  confirmButtonText:this.$t('message.cmd.yes'),
                }).then(action => {
                  this.$router.push({name:'page-backup'})
                }).catch(action =>{
                  this.$router.replace({name:'page-wallet'})
                })
              }
            }else{ //初始化失败
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
        if(this.getIsInited){
          this.sheetVisible = true
        } else {
          MessageBox.confirm(this.$t('message.init.isSetPassword'),this.$t('message.cmd.confirmTitle'),{
            cancelButtonText:this.$t('message.cmd.no'),
            confirmButtonText:this.$t('message.cmd.yes'),
          }).then(action => {
            this.isActionSheet = false
            this.isRiskTip = true
            this.isImport = true
          })
        }
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
          // var publicKeys = ['0ba1ba3b8d8f7bd4a70828ec0e749dd26ee4cdd18d058c880afa121fad60e5b6f2ee1b72d9b9a57706e5de72acc1378f92269086c4964c073593bf92d28c647d','ba2416481d6260e621d8f2b6aad3e9c51d438c1876b624303a16f2bcf8a06cd695cef87230180ceed5735e7bf6cb3f9db360f6fee50824c85f230a6bb3ca9573'], walletList = [], walletNames = JSON.parse(localStorage.getItem('walletNames') || '{}')
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
            for(var token of this.getShowCurrency){
              this.getTestAddress(token, wallet).then((res)=>{
                api.getBalance(res.token,res.address,res.wallet,function(rtoken, rwallet, getData){
                  getData.then((res)=>{
                    var balance = 0
                    if(res.data.rst){
                      balance = res.data.data.balance && res.data.data.balance
                    }
                    Vue.set(rwallet.currency, rtoken, balance)
                  })
                },this.getContractAddr[res.token],this.getFactoryCode.replace('Tinkey',''))
              })
            }
          }
        } else {
          this.setHasLogin(false)
          this.$router.replace({name:'page-init'})
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'GetAllEccPubKey', [])
    },
    getTestAddress(token, wallet){ //开发模式下btc币种获取测试网络地址
      var self = this, address
      return new Promise(function(resolve, reject){
        if(token==='BTC' && Config.env==='dev'){
          api.getBTCTestAddress(wallet.publicKey).then((res)=>{
            address = res.data.data
            resolve({token:token, wallet:wallet, address:address})
          })
        } else {
          address = self.$root.getAddress(token, wallet.publicKey)
          resolve({token:token, wallet:wallet, address:address})
        }
      })
    } 
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
