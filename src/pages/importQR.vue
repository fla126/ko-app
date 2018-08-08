<template>
  <div class="page">
    <comp-top-back :class="'line'"><span v-tap="{methods:addWallet}" class="add-btn" v-if="false">{{$t('message.walletDetail.addWallet')}}</span></comp-top-back>
    <div class="page-main">
      <h3 class="title mt40">导入钱包</h3>
      <ul class="payment-detail">
        <li v-for="(item,index) in wallet" :key="index">
          <p>钱包{{$root.fitLen(index+1,2)}}</p>
          <p>
            <input :id="'wallet'+index" type="text" v-model="wallet[index]" placeholder="加密码">
            <i class="scanning" v-tap="{methods:scanning, idx:index}"></i>
            <i class="del" v-tap="{methods:delWallet, idx:index}">—</i>
          </p>
        </li>
      </ul>
      <div class="step-next fixed">
        <mt-button type="primary" size="large" v-tap="{methods:showImportTip}">{{$t('message.walletDetail.importWallet')}}</mt-button>
      </div>
    </div>
    <password-confirm ref='passConfirm' :show="showPWCLayer" :hideFunction="hidePWCLayer" :submitFunction="submitOrder"></password-confirm>
  </div>
</template>

<script>
import Tip from '@/components/common/tip'
import { MessageBox  } from 'mint-ui'
import passwordConfirm from '@/components/common/password_confirm'
export default {
  name:'page-importQR',
  data(){
    return {
      showPWCLayer:false,
      wallet:['']
    }
  },
  mounted(){

  },
  computed:{
    
  },
  methods:{
    scanning(args){
      this.$root.scanner((data)=>{
        // var data = {format:'QR_CODE',text:'c33d67e2e2adf43c04bfdad7e28a24fcad695c39f4f9430d5df6bdd069f6aaf5623811dd8c93b00ba5f8f766f3d4dbb26ab874ed041be4ee3153c9b1793d2ab087b132d99efdffc10e5065b490717722e16d009ee1c35fd5b173eba3df5a734edb3e11180b045a5f55f7155a40c50e6d'}
        var QRdata = data.text
        if(data.format=='QR_CODE' && QRdata.length==224){
          $('#wallet'+args.idx).val(QRdata)
          this.wallet[args.idx] = QRdata
          console.log('wallet===',this.wallet)
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.walletDetail.invalidQRAddress')})
        }
      })
    },
    delWallet(args){
      if(this.wallet.length>1){
        this.wallet.splice(args.idx,1)
      }
    },
    addWallet(args){
      if(this.wallet.length<32){
        this.wallet.push('')
      } else {
        Tip({type:'warning', title:this.$t('message.login.warning'), message:this.$t('message.walletDetail.maxImport32')})
      }
    },
    hidePWCLayer(){
      this.showPWCLayer = false
    },
    showImportTip(){
      MessageBox.confirm(this.$t('message.init.importTip'),this.$t('message.cmd.confirmTitle'),{
        cancelButtonText:this.$t('message.cmd.no'),
        confirmButtonText:this.$t('message.cmd.yes'),
      }).then(action => {
        this.showPWCLayer = true
      })
    },
    submitOrder(password){ //提交订单函数
      this.checkLogin(password).then((status)=>{
        if(status){ //密码验证成功
          cordova.exec((res)=>{
            res = JSON.parse(res)
            console.log('InputKeyCmd=====',this.wallet[0],res)
            if(res.code=='0'){
              localStorage.setItem('firstWalletLogin',1)
              this.$router.replace({name:'page-init'})
            } else {
              console.log('导入失败：',res)
            }
          }, (error)=>{
            console.log(error)
          }, 'WalletApi', 'InputKey', [password,this.wallet[0]])
        } else {
          this.$refs.passConfirm.password = ''
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
        }
      })
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
  },
  components:{
    passwordConfirm,
  }
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.title {
  font-size: 0.48rem;
  padding-bottom: 0.3rem;
}
.scanning {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0.8rem;
  top: 0;
  background: url('../assets/img/SAOYISAO_ICON@3x.png') no-repeat center;
  background-size: auto 100%;
}
.del {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  top: 0;
  border:1px solid #ef4f4f;
  border-radius: 50%;
  text-align: center;
  color:#ef4f4f;
  font-size: 0.3rem;
  line-height: 0.4rem;
}
.payment-detail {
  li {
    border-top: 1px solid #eaebec;
    border-bottom: 1px solid #fff;
    padding: 0.4rem 0 0.2rem;
    list-style: none;
    &:first-of-type {
      border-top: none;
    }
    p {
      position: relative;
      line-height: 0.5rem;
      color: #999999;
      font-size: 0.24rem;
      &:last-of-type {
        color: #666666;
      }
      input{
        width: 100%;
        font-size: 0.24rem;
        background-color: transparent;
        border: none;
        color: #666666;
        padding-right: 1.4rem;
        &:focus {
          
        }
      }
      input::placeholder {
        color: #CCC;
      }
      span {
        position: absolute;
        right: 0;
        color: #CCC;
        &.btn {
          color: #4D7BF3;
        }
      }
    }    
    &:last-of-type {
      border-bottom: none;
    }
  }
 }
 .add-btn {
  font-size: 0.32rem;
  position: absolute;
  right: 0.3rem;
 }
 .step-next {
  margin-top: 0.3rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  background-color: #f9f9f9;
  padding-bottom: 0.3rem;
  &.fixed {
    position: fixed;
    left: 0.3rem;
    right: 0.3rem;
    bottom: 0rem;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
