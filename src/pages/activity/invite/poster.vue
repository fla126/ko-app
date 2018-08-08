<template>
  <div class="page">
    <comp-top-back :class="'line'"><span class="rule" v-tap="{methods:$root.routeTo, to:'activity-invite-rule'}">活动规则</span></comp-top-back>
    <div class="page-main">
      <template v-if="!hasData">
        <p class="mt50 f28 ft-c-gray">您邀请的用户每购买一个Tinkey，就可以获得0.1ETH，上不封顶。</p>
        <div class="info">
          <div>已邀请人数<span>{{data.invitationRegisterNumber||0}}</span></div>
          <div>已获得奖励<span>{{data.totalAward||0}}<small>ETH</small></span></div>
        </div>
        <div class="text-center mt40 rp"><img src="../../../assets/img/activity/invite/posters@3x.jpg" class="poster"><div class="QR-block"><canvas id="canvas"></canvas></div></div>
        <div class="mt150"></div>
        <div class="step-next fixed">
          <mt-button type="primary" size="large" class="btn-copy" :data-clipboard-text="data.myInvitationUrl">分享给好友免费获取ETH</mt-button>
        </div>
      </template>
      <template v-else>
        <p class="mt50 f28 text-center ft-c-gray">抱歉：需要购买Tinkey成功才能获取推荐资格。</p>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/api/activity'
import ClipboardJS from 'clipboard'
import { Toast } from 'mint-ui'
import QRCode from 'qrcode'

export default {
  name:'activity-invite-poster',
  data(){
    return {
     data: {},
     hasRes:false
    }
  },
  created() {
    this.getInvitationActivity()
  },
  mounted(){
    this.initQRCode()
  },
  computed:{
    hasData(){
      return JSON.stringify(this.data)==='{}'
    }
  },
  methods:{
    getInvitationActivity () {
      api.getInvitationActivity((res) => {
        this.data = res || {}
        this.hasRes = true
        this.initCopy()
      })
    },
    initQRCode(){
      if(!this.data.myInvitationUrl && !this.hasRes){
        setTimeout(this.initQRCode,100)
        return
      }
      //初始化二维码
      QRCode.toCanvas(document.getElementById('canvas'), this.data.myInvitationUrl, {
        color: {
          dark: '#000',  // Black dots
          light: '#0000' // Transparent background
        },
        width:Math.round(window.innerWidth*0.174)
      }, function (error) {
        if (error) console.error(error)
      })
      $('#canvas').removeAttr('style')
    },
    initCopy(){
      //初始化复制按钮
      var self = this
      var clipboard = new ClipboardJS('.btn-copy')
      clipboard.on('success', function(e) {
        Toast(self.$t('message.walletDetail.copySuccess'))
        e.clearSelection();
      });

      clipboard.on('error', function(e) {
        Toast(self.$t('message.walletDetail.copyFailure'))
      });

    },
  },
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.rule {
  position: absolute;
  right: 0.3rem;
  font-size: 0.3rem;
}
.info {
  display: flex;
  margin-top: 0.7rem;
  color:#999;
  font-size: 0.24rem;
  > div {
    flex: 1;
    min-width: 0;
    text-align: center;
    span {
      display: block;
      margin-top: 0.2rem;
      color:#4d7bf3;
      font-size: 0.48rem;
      small {
        font-size: 0.3rem;
      }
    }
  }
}
.poster {
  width: 71.6vw;
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
.QR-block {
  position: absolute;
  width: 17.4vw;
  height: 17.4vw;
  left: 1.4rem;
  bottom: 0.43rem;
  background-color: #fff;
  z-index: 1;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
