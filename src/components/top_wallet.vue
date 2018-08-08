<template>
  <div class="page-top">
  	<transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
  	<div class="connect-status" v-show="!getUsbkeyStatus"><span></span>{{$t("message.usbkeyStatus.disconnect")}}</div>
  	</transition>
  	<transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
    <div class="connect-status" v-show="getUsbkeyStatus"><span class="active"></span>{{$t("message.usbkeyStatus.connected")}}</div>
	</transition>
    <span v-if="isscan" class="scanning" v-tap="{methods:scanning}"></span>
    <span v-if="isset" class="setting" v-tap="{methods:$root.routeTo, to:'page-ucenter-setup'}"></span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  name:'comp-wallet-top',
  props:{
    isscan:{
      type: Boolean,
      default:true
    },
    isset:{
      type: Boolean,
      default:true
    }
  },
  data(){
  	return {

  	}
  },
  mounted(){
  	
  },
  computed:{
  	...mapGetters(['getUsbkeyStatus']),
  },
  methods:{
  	...mapActions(['setUsbkeyStatus']),
  	scanning(args){
      this.$root.scanner((data)=>{
      	console.log(data)
        var QRdata = data.text
        if(data.format=='QR_CODE'){
	        var currency = this.$root.getAddressToken(QRdata)
	        var receiverAddress = QRdata
	        this.$router.push({name:'page-wallet-payment', params:{currency:currency,address:receiverAddress}})
        } else {
        	Toast(this.$t('message.walletDetail.invalidQRAddress'))
        }
      })
    },
  },
}

</script>
<style type="text/css" lang="less" scoped="">
.page-top {
	text-align: right;
	line-height: 0.5rem;
	overflow: hidden;
	span {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 100%;
		vertical-align: middle;
		&.scanning {
			background-image: url('../assets/img/SAOYISAO_ICON@3x.png');
		}
		&.setting {
			margin-left: 0.3rem;
			background-image: url('../assets/img/shezhi_icon@3x.png');
		}
	}

}
.connect-status {
	position: absolute;
	left: 0.3rem;
	top: 0.2rem;
	right: 1.5rem;
	bottom: 0.2rem;
	text-align: left;
	font-size: 0.24rem;
	color: #333333;
	span {
		background-image: url('../assets/img/shebeiweilianjie@3x.png');
		margin-right: 0.15rem;
		&.active {
			background-image: url('../assets/img/shebeiyilianjie@3x.png');
		}
	}
}
</style>
