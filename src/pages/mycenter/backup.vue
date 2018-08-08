b<template>
  <div class="page">

    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.backup.backupName')}}
    </comp-top-back>

    <div class="page-main">
      <div class="common-content bg-white mt40 ft-c-gray">
        <div class="inner">
          <!-- <div class="box-cont">
            <div class="item" v-tap="{methods:setBak, to:'page-yunbak'}"><span class="f30">{{$t('message.backup.cloudBackup')}}</span></div>
            <div class="item" v-tap="{methods:()=>{yunVisible=true}}"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          </div> -->
          <div class="box-cont">
            <div class="item" v-tap="{methods:setBak, to:'page-qrbak'}"><span class="f30">{{$t('message.backup.qrBackup')}}</span></div>
            <div class="item" v-tap="{methods:()=>{qrVisible=true}}"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          </div>
          <!-- <div class="box-cont">
            <div class="item" v-tap="{methods:setBak, to:'page-abkeybak'}"><span class="f30">{{$t('message.backup.abkeyBackup')}}</span></div>
            <div class="item" v-tap="{methods:()=>{abkeyVisible=true}}"><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
          </div> -->
        </div>
      </div>

      <div class="common-content bg-white mt40 ft-c-gray">
        <div class="inner" v-tap="{methods:$root.routeTo, to:'page-modify-password'}">
          <div class="box-cont " >
            <div class="item"><span class="f30 ft-c-blue">{{$t('message.backup.updatePwd')}}</span></div>
          </div>
        </div>
      </div>

      <!--  说明文字 -->
      <div class="m-box3">
          <div class="inner">
            <h1>{{$t('message.backup.alert')}}</h1>
            <ul>
              <li>{{$t('message.backup.infoOne')}}</li>
              <li>{{$t('message.backup.infoTwo')}}</li>
              <li>{{$t('message.backup.infoThree')}}</li>
            </ul>
          </div>
      </div>
      <mt-popup class="mint-popup-1" v-model="yunVisible" :style="{top:'1.2rem'}"> 云备份 </mt-popup>
      <mt-popup class="mint-popup-1" v-model="qrVisible" :style="{top:'2.1rem'}"> 二维码备份 </mt-popup>
      <mt-popup class="mint-popup-1" v-model="abkeyVisible" :style="{top:'2.9rem'}"> ABKEY备份 </mt-popup>
    </div>
    <password-confirm ref='passConfirm' :show="showPWCLayer" :hideFunction="hidePWCLayer" :submitFunction="submitOrder"></password-confirm>
  </div>
</template>

<script>
import passwordConfirm from '@/components/common/password_confirm'
import { Indicator } from 'mint-ui'
export default {
  name: "page-backup",
  data(){
    return {
      yunVisible:false,
      qrVisible:false,
      abkeyVisible:false,
      bakType:'',
      showPWCLayer:false,
    }
  },
  methods:{
    hidePWCLayer(){
      this.showPWCLayer = false
    },
    submitOrder(password){ //提交订单函数
      cordova.exec((res)=>{
        res = JSON.parse(res)
        if(res.code=='0'){ //密码正确，前往导出页面
          Indicator.open({
            text: 'Exporting...'
          })
          setTimeout(()=>{
            cordova.exec((res)=>{
              res = JSON.parse(res)
              console.log('OutputKey====',res)
              if(res.code=='0'){
                this.$router.push({name:'page-qrbak', params:{data:JSON.parse(res.msg)}})
              } else {
                console.log(res.msg)
              }
              Indicator.close()
            }, (error)=>{
              console.log(error)
            }, 'WalletApi', 'OutputKey', [password])
          },1000)
          
        } else {
          Tip({type:'danger', title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
          this.$refs.pconfirm.password = ''
        }
      }, (error)=>{
        console.log(error)
      }, 'WalletApi', 'login', [password])
    },
    setBak(args){
      /*this.bakType = args.to
      this.$router.push({name:'page-qrbak'})
      return*/
      this.showPWCLayer = true
    }
  },
  components:{
    passwordConfirm,
  }
}
</script>

<style type="text/css" lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #F9F9F9;
}
.m-box3{margin-top: .45rem;}
.m-box3>.inner{padding: 0 .2rem;}
.m-box3 h1{font-size: .24rem;color:#666666}
.m-box3 ul li{font-size: .22rem;color:#999999;line-height: .5rem;}

.box-cont{
  display: flex;
  align-items: center;
  height: .85rem;
  border-bottom: .02rem solid #ecedee;
  .item{
    flex:9;
  }
  .item:nth-child(2){
    flex:1;
    text-align: right;
    img.nav_right{
      width: .26rem;
      height: .26rem;
    }
  }
}
.box-cont:last-child{
  border-bottom:0;
}
.mint-popup-1 {
  width: 4rem;
  border-radius: 5px;
  padding: 0.2rem;
  transform: translate(-50%);
  font-size: 0.24rem;
  color:#666;
  &:before {
      display: inline-block;
      width: 0;
      height: 0;
      border: solid 0.2rem transparent;
      border-left-color:#fff;
      content: "";
      position: absolute;
      top: 0.2rem;
      right: -0.4rem;
  }
}
</style>
