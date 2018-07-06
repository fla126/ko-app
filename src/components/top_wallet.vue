<template>
  <div class="page-top">
  	<transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
  	<div class="connect-status" v-show="!$store.state.usbkeyStatus"><span></span>{{$t("message.usbkeyStatus.disconnect")}}</div>
  	</transition>
  	<transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
    <div class="connect-status" v-show="$store.state.usbkeyStatus"><span class="active"></span>{{$t("message.usbkeyStatus.connected")}}</div>
	</transition>
    <span class="scanning" v-tap="{methods:scanning}"></span>
    <span class="setting" v-tap="{methods:$root.routeTo, to:'page-ucenter-setup'}"></span>
  </div>
</template>
<script>
import store from '@/store'

export default {
  name:'comp-wallet-top',
  data(){
  	return {
  		
  	}
  },
  mounted(){
  	setTimeout(()=>{
  		this.$store.commit('updateUsbkeyStatus',true)
  	},2000)
  },
  methods:{
  	scanning(args){
  		this.$root.scanner((error,data)=>{
  		  console.log(data)
  		})
  	},
  }

  
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