<template>
  <div class="page">
    <comp-top-back>
      <span class="selected-title"></span>
    </comp-top-back>
    <div class="page-main">
      <ul class="pament-detail">
        <li>
          <h1>{{cointype | uppercase}}收款<span>{{cointype | uppercase}}01</span></h1>
          <p>收款金额</p>
          <p><input id="gatherInput" placeholder="请输入收款金额" type="tel" v-model="amount"></p>
        </li>
        <li class="text-center">
          <p>{{address}}</p>
          <p><canvas id="canvas"></canvas></p>
        </li>

      </ul>
      <div class="step-next" :class="{fixed:collapsed}">
        <mt-button type="primary" size="large" v-tap="{methods:copyAddress}">复制地址</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import data from '@/api/data'
import compTopBack from '@/components/common/top_back'
import QRCode from 'qrcode'
import { Field,Toast } from 'mint-ui';

Vue.component(Field.name, Field);


export default {
  name:'page-wallet-gather',
  data(){
    return {
      amount:'',
      address:'1MzziGBa7tNNzMwVJMPEjAfM1wRcvSGZu5',
      collapsed:true,
      cointype:'',
    }
  },
  created(){

  },
  mounted(){
    this.cointype = this.$route.query.type || 'btc'
    QRCode.toCanvas(document.getElementById('canvas'), this.address, {
      color: {
        dark: '#000',  // Black dots
        light: '#0000' // Transparent background
      },
      width:Math.round(window.innerWidth*0.6)
    }, function (error) {
      if (error) console.error(error)
    })
    $('#gatherInput').focus(()=>{
      this.collapsed = false
    })
    $('#gatherInput').blur(()=>{
      setTimeout(()=>{
        this.collapsed = true
      },100)
    })
  },
  updated(){

  },
  methods:{
    copyAddress(args){
      copyTextToClipboard(this.address)
    }
  },
  components:{
    compTopBack,
  }
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea")
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try { var msg = document.execCommand('copy') ? '成功' : '失败'
    Toast('复制内容 ' + msg)
  } catch (err) {
    Toast('不能使用这种方法复制内容')
  }
  document.body.removeChild(textArea)
}

</script>
<style lang="less" scoped>
.page-main {
  overflow-y: hidden;
  background-color: #f9f9f9;
}
.text-center {
  text-align: center;
}
.pament-detail {
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

</style>
