<template>
  <div class="page" >
    <comp-top-back :back="true" > </comp-top-back>
    <div class="page-main">
      <div class="form">
        <h1>{{$t('message.backup.qrBackup')}}</h1>
        <template v-if="data">
          <div class="QRcontainer mt70">
            <p class="title">Tinkey ID</p>
            <p>{{getFactoryCode}}</p>
            <p class="title mt30">{{$t('message.backup.backupTime')}}</p>
            <p>{{new Date().format()}}</p>
            <p class="title mt30">{{$t('message.backup.keyTotal')}}</p>
            <p>{{data.length}}</p>
            <div class="mt20 text-right">
              <i class="icon-tinkey"></i>
            </div>
          </div>
          <div class="QRcontainer mt40">
            <img :src="QRimg">
          </div>
          <div class="mt60 tip-text">截图保存，或者点击下方按钮保存到相册</div>
          <div class="mt80 mb30 pb50"></div>
        </template>
        <div class="QRcontainer mt70" v-else>
          <h3>抱歉！ 备份数据读取错误。</h3>
        </div>
      </div>
      <div class="step-next fixed">
        <mt-button type="primary" size="large" v-tap="{methods:saveQRBak}">{{$t('message.backup.save')}}</mt-button>
      </div>
    </div>
    <div style="display: none;">
      <canvas id="canvas"></canvas>
      <canvas id="QRContainer" :width="width" :height="height"></canvas>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QRCode from 'qrcode'
import symbol from '@/assets/img/icon_tinkey.png'
import Tip from '@/components/common/tip'
export default {
  name: "page-qrbak",
  data(){
    return {
      data:[],
      fontSize:0,
      initY:0,
      QRimg:''
    }
  },
  created(){
    this.data = this.$route.params.data || []
    console.log(this.data)
  },
  mounted(){
    let fontSize = $('html').css('font-size')
    this.fontSize = Number(fontSize.slice(0,fontSize.length-2))
    this.initQRCode()

  },
  computed:{
    ...mapGetters(['getFactoryCode']),
    width(){
      return this.fontSize*6.1
    },
    height(){
      return this.data.length*this.fontSize *(6.1+0.4)+this.initY*this.fontSize
    }
  },
  methods:{
    saveQRBak(){
      this.initY = 3
      setTimeout(()=>{
        this.initQRCode(true)
        this.setInfoMap()
        setTimeout(()=>{
          let imgData = document.getElementById('QRContainer').toDataURL('image/png')
          this.downloadFile(`${this.$t('message.backup.qrBackup')}_${this.getFactoryCode}_${new Date().format()}.png`,imgData)
          Tip({type:'success', title:this.$t('message.login.success'), message:this.$t('message.backup.bakSuccess')})
          this.$router.replace({name:'page-backup'})
        },0)
      },0)
    },
    downloadFile(fileName, imgURL){
      var MIME_TYPE = "image/png"
      var dlLink = document.createElement('a')
          dlLink.download = fileName
          dlLink.href = imgURL
          dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')
          document.body.appendChild(dlLink)
          dlLink.click()
          document.body.removeChild(dlLink)
    },
    setInfoMap(){
      const ctx = document.getElementById('QRContainer').getContext('2d'), small = this.fontSize*0.24, large = this.fontSize*0.3, typeface = this.getLang=='en'?'Arial':'Microsoft YaHei', symbolImg = new Image()
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.font = `normal ${small}px ${typeface}`
      ctx.fillStyle = '#666'
      ctx.fillText("Tinkey ID", 4, 4)
      ctx.fillText(this.$t('message.backup.backupTime'), 4, 0.9*this.fontSize)
      ctx.fillText(this.$t('message.backup.keyTotal'), 4, 0.9*this.fontSize*2)
      ctx.font = `normal ${large}px ${typeface}`
      ctx.fillStyle = '#2e2e2e'
      ctx.fillText(this.getFactoryCode, 4, 0.3*this.fontSize)
      ctx.fillText(new Date().format(), 4, (0.3+0.9)*this.fontSize)
      ctx.fillText(this.data.length, 4, (0.3+0.9*2)*this.fontSize)
      symbolImg.src = symbol
      ctx.drawImage(symbolImg, 4.6*this.fontSize,4, 1.4*this.fontSize, 0.4*this.fontSize)
    },
    initQRCode(key){
      self = this
      //初始化二维码
      const canvas = document.getElementById('canvas')
      const ctx = document.getElementById('QRContainer').getContext('2d');
      const width = 6.1
      var QRdatas = []
      ctx.fillStyle = '#fff'
      ctx.fillRect(0,0, this.width, this.height)
      for(let i=0; i<this.data.length; i++){
        QRCode.toCanvas(canvas, this.data[i], {
          color: {
            dark: '#000',  // Black dots
            light: '#0000' // Transparent background
          },
          margin:2,
          errorCorrectionLevel: 'M',
          width:self.fontSize *width
        }, function (error) {
          if (error) console.error(error)
        })
        let _DATA = canvas.toDataURL('image/png'), qrCodeImg = new Image()
        qrCodeImg.src = _DATA
        QRdatas.push(qrCodeImg)
      }
      setTimeout(()=>{
        for(let i=0; i<QRdatas.length; i++){
          ctx.drawImage(QRdatas[i], 0, (i*(width+0.4)+this.initY)*self.fontSize, self.fontSize *width, self.fontSize *width)
        }
        if(!key){
          this.QRimg = document.getElementById('QRContainer').toDataURL('image/png')
        }
      },0)
        
      
    },
  }
}
</script>

<style type="text/css" lang="less"  scoped>
  .page-main {background-color: #f9f9f9;}
  .form {
    padding-left: 0.3rem; 
    padding-right: 0.3rem;
    h1 {
      margin-top: 0.5rem;
      font-size: 0.6rem;
    }
    .QRcontainer {
      background-color: #fff;
      padding: 0.4rem;
      border-radius: 7px;
      box-shadow: 0 2px 6px #d9d9d9;
      h3 {
        font-size: 0.36rem;
      }
      font-size: 0.3rem;
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .title {
        font-size: 0.24rem;
        color: #666;
        margin-bottom: 0.06rem;
      }
      #canvasContainer {
        margin-bottom: 0.4rem;
      }
    }
  }
  .icon-tinkey {
    display: inline-block;
    width: 1rem;
    height: 0.3rem;
    background: url('../assets/img/icon_tinkey.png') no-repeat center;
    background-size: contain;
  }
  #canvas, #QRContainer {
    position: absolute;
    top: 0vh;
    right: -150vw;
    opacity: 0;
  }
  .tip-text {
    color: #666;
    font-size: 0.3rem;
    text-align: center;
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
