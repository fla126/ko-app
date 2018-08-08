<template>
  <div  class="page">
    <comp-top-back></comp-top-back>
    <div class="page-main">
      <ul class="addcmd-detail">
        <li>
          <h1>{{$t('message.cmd.addPasscode')}}</h1>
          <p>{{$t('message.cmd.account')}}</p>
          <p><input id="account" maxlength="25" :placeholder="$t('message.cmd.inputAmount')" type="text" v-model="account"><i class="scanning" v-tap="{methods:scanning}"></i></p>
        </li>
        <li>
          <p>{{$t('message.cmd.privateKey')}}</p>
          <p><input id="key" :placeholder="$t('message.cmd.inputKey')" type="text" v-model="key"></p>
        </li>
      </ul>
      <div class="step-next" :class="{fixed:collapsed}">
        <mt-button type="primary" size="large" v-tap="{methods:addCmd}">{{$t('message.cmd.add')}}</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import Tip from '@/components/common/tip.js'
import api from '@/api/data'
import { Toast,MessageBox  } from 'mint-ui'
export default {
  name:'page-command-add',
  data(){
    return {
      collapsed:true,
      account:'',
      key:''
    }
  },
  mounted(){
    $('#account, #key').focus(()=>{
      this.collapsed = false
    })
    $('#account, #key').blur(()=>{
      setTimeout(()=>{
        this.collapsed = true
      },100)
    })


  },
  methods:{
    addCmd(args){
      if(!this.$root.trim(this.account,1)){
        Tip({type:'danger',title:this.$t('message.login.error'), message:"请输入账号名"})
        $('#account').focus()
        return
      }else if(!this.$root.trim(this.key,1)){
        Tip({type:'danger',title:this.$t('message.login.error'), message:"请输入钥匙"})
        $('#key').focus()
        return
      }else{
        let com={
          comname:this.account,
          keycode:this.key
        }
        commandApi.save(com, (data) => {
           MessageBox.alert('保存成功').then(action => {
              this.$router.push({name:'page-command'})
            });
        }, (msg) => { })
      }
    },
    saveCmd(){

    },
    scanning(args){
      this.$root.scanner((data)=>{
        console.log(data)
        var QRdata = data.text.split('$$')
        if(data.format=='QR_CODE'){
          
        } else {
          Toast(this.$t('message.walletDetail.invalidQRAddress'))
        }
      })
    },
  },
}

</script>
<style type="text/css" lang="less" scoped >
.addcmd-detail {
   border-top: 1px solid #e4e5e7;
  li {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    border-top: 1px solid #eaebec;
    border-bottom: 1px solid #fff;
    padding: 0.4rem 0 0.2rem;
    list-style: none;
    &:first-of-type {
      border-top: none;
    }
    h1 {
      font-size: 0.48rem;
      padding-bottom: 0.3rem;
      span {
        color: #999999;
        font-size: 0.24rem;
        padding-left: 0.15rem;
      }
    }
    h3 {
      position: relative;
      font-size: 0.32rem;
      padding-top: 0.2rem;
      span {
        position: absolute;
        right: 0;
        color: #FF3366;
        font-weight: bold;
      }
    }
    p {
      position: relative;
      line-height: 0.5rem;
      color: #999999;
      font-size: 0.24rem;
      &:last-of-type {
        color: #666666;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 0.24rem;
    color: #666;
    &:focus{

    }
  }
  input::placeholder {
    color: #CCC;
  }
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
.scanning {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: 0;
  background: url('../../assets/img/SAOYISAO_ICON@3x.png') no-repeat center;
  background-size: auto 100%;
}
</style>
