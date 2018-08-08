<template>
  <div class="page">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.wallet.addWallet')}}
    </comp-top-back>
    <div class="page-main">
      <div class="common-content mt10">
         <div class="inner">
           <section class="item">
                  <h1 class="f36 mt40">{{$t('message.wallet.addWallet')}}</h1>
                  <h2 class="f24 mt60 ft-c-gray30">{{$t('message.wallet.token')}}</h2>
            <div class="styled-select mt20">
               <select class="select f30  ft-c-gray" v-model="token">
                 <option :value="item" v-for="item in Object.keys(getCurrency)">{{item}}</option>
               </select>
            </div>
           </section>
         </div>
      </div>
      <div class="common-content mt10">
        <div class="inner">
          <section class="item">
            <h2 class="f24 mt50 ft-c-gray30">{{$t('message.wallet.walletName')}}</h2>
            <input id="wname" v-model="wname" class="common-input-default f30 mt20" maxlength="20"  :placeholder="$t('message.wallet.walletName')">
          </section>
        </div>
      </div>
      <div class="step-next" :class="{fixed:isBlur}" v-tap="{methods:pwconfirm}">
        <p class="f20 ft-c-red text-center">{{$t('message.wallet.topInfo')}}</p>
        <mt-button class="mt20" size="large" type="primary">{{$t('message.wallet.add')}}</mt-button>
      </div>
    </div>
    <password-confirm ref="pconfirm" :show="showPWCLayer" :hideFunction="hidePWCLayer" :submitFunction="addWallet"></password-confirm>
  </div>
</template>

<script>
import passwordConfirm from '@/components/common/password_confirm'
import { Toast,MessageBox  } from 'mint-ui'
import Tip from '@/components/common/tip.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "page-addwallet",
  components:{
      passwordConfirm,
  },
  data(){
      return{
        showPWCLayer:false,
        cname:'',
        token:'BTC',//币种
        wname:'',//钱包名
        isBlur:true
      }
  },
  computed:{
    ...mapGetters(['getCurrency','getWalletList']),
  },
  mounted(){
    $('#wname').focus(()=>{
      this.isBlur = false
    })
    $('#wname').blur(()=>{
      this.isBlur = true
    })
  },
  methods:{
    ...mapActions(['setWalletList']),
    pwconfirm(){ //最多添加32个钱包
      if(this.getIdx()===-1){
        Tip({type:'warning',title:this.$t('message.login.warning'), message:this.$t('message.wallet.maxWallet')})
        return
      }
      if(!this.$root.trim(this.wname,1)){
        Tip({type:'danger',title:this.$t('message.login.error'), message:this.$t('message.wallet.pleasewalletName')})
      } else {
        this.showPWCLayer = true
      }
    },
    hidePWCLayer(){
      this.showPWCLayer = false
    },
    getIdx(){ //获取未占用钱包位置，总共32个钱包位置
      var idxArray = []
      for(var i=0; i<32; i++){
        idxArray.push(i)
      }
      for(var wallet of this.getWalletList){
        if(idxArray.includes(wallet.idx)){
          idxArray.splice(idxArray.indexOf(wallet.idx),1)
        }
      }
      console.log('idxArray=======',idxArray)
      return idxArray.length?idxArray[0]:-1
    },
    addWallet(password){
      cordova.exec((res)=>{
        res = JSON.parse(res)
        if(res.code=='0'){ //密码正确，创建钱包
          var idx = this.getIdx()
          cordova.exec((res)=>{
            res = JSON.parse(res)
            console.log(res)
            if(res.code=='0'){
              Tip({type:'success', title:this.$t('message.login.success'), message:this.$t('message.wallet.savesucc')})
              //本地保存钱包名称
              var walletNames = JSON.parse(localStorage.getItem('walletNames') || '{}')
              walletNames[res.msg] = this.wname
              localStorage.setItem('walletNames', JSON.stringify(walletNames))
              window.getWalletList()
              this.$router.replace({name:'page-uwallet'})
            } else {
              console.log(res.msg)
            }
          }, (error)=>{
            console.log(error)
          }, 'WalletApi', 'CreateWallet', [idx])
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
          this.$refs.pconfirm.password = ''
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'login', [password])
    }
  },
}
</script>

<style lang="less" scoped >
.page-main {
  overflow-y: hidden;
  background-color: #F9F9F9;
}
.styled-select  {
  overflow: hidden;
  background: url("../../assets/img/i_down.png") no-repeat right;
  background-size: .26rem .15rem;
  select{
    background: transparent;
    width: 100%;
    border: 0;
    height: .6rem;
    line-height: .5rem;
    -webkit-appearance: none;
  }
}

.select:focus {
  outline:none;
  border: 0;
}
.common-input-default{
  padding:.1rem 0;
  width: 100%;
  border: 0;
  background: bottom;
}

.common-input-default:focus {
  outline:none;
  border: 0;
}

.item{
  border-bottom: 1px solid #eaebec;
  &:after {
    content: '';
    display: block;
    border-top: 1px solid #fff;
  }
}

.step-next {
  margin-top: 0.5rem;
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
