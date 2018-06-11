<template>
  <div class="page">
    <comp-top-back :class="'line'" :back="false">口令</comp-top-back>
    <div class="page-main" id="scroll">
      <div>
        <div class="command-container" v-tap="{methods:$root.routeTo, to:'page-command-add'}">
          <h1><i></i><span>二次身份验证</span><i>+ 添加</i></h1>
        </div>
        <ul class="command-list unselected mt40">
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>

          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number15.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>

          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number15.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>

          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number15.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li @touchstart="showControlButton($event)" @touchend="clearLoop" v-tap="{methods:hideCP}">
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36">&nbsp;&nbsp;123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
        </ul>
        <transition enter-active-class="animated short fadeIn" leave-active-class="animated short fadeOut">
        <ul class="control-panel" id="controlPanel" v-show="showCP">
          <li v-tap="{methods:showRecordEditor}">编辑</li>
          <li v-tap="{methods:delRecord}">删除</li>
        </ul>
        </transition>
      </div>
    </div>
    <command-editor :show="showEditorLayer" :hideFunction="hideEditorLayer" :cname="cname"></command-editor>
  </div>
</template>
<script>
import commandEditor from '@/components/common/command_editor'

  export default {
    name:'page-command',
    data(){
      return {
        scroll:false,
        loop:0,
        showCP:false,
        showEditorLayer:false,
        cname:'Sjafh3793rdkgvf'
      }
    },
    mounted(){
      setTimeout(this.initScroll,700) 
    },
    methods:{
      initScroll(){
        var self = this
        this.scroll = new IScroll('#scroll',{
          mouseWheel:true,
          tap:true
        });
      },
      showControlButton(event) {
          clearInterval(this.loop);//再次清空定时器，防止重复注册定时器
          this.loop=setTimeout(()=>{
              var $container = $(event.target).parents('li:first'), $tar = $('#controlPanel')
              $tar.data('tar',$container).css('top',Math.round($container.position().top+$container.height()))
              $container.siblings('.active').removeClass('active')
              $container.addClass('active')
              this.showCP = true
          },500);
      },
      clearLoop(args) {
          clearInterval(this.loop);
      },
      hideCP(){
        this.showCP = false
      },
      showRecordEditor(args){ //编辑操作
        var self = this
        var _tar = $('#controlPanel').data('tar')
        this.hideCP()
        this.showEditorLayer = true
      },
      delRecord(args){ //删除操作
        this.hideCP()
        if(confirm('确定要删除此项口令吗？')){
          var self = this
          var _tar = $('#controlPanel').data('tar')
          _tar.slideUp(function(){
            this.remove()
            self.scroll.refresh()
          })
        }
      },
      hideEditorLayer(cname){ //隐藏编辑对话框
        this.showEditorLayer = false
        if(cname && typeof(cname)=='string'){
          // 回传编辑数据
          console.log(cname)
        }
      },
    },
    components:{
      commandEditor,
    }
  }

</script>
<style lang="less" scoped>
  .page-main {
    overflow-y: hidden;
  }
  .command-container {
    height: 1.8rem;
    background-color: #4D7BF3;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    margin-top: 0.4rem;
    padding-left: 0.6rem;
    padding-top: 0.5rem;
    border-radius: 0.3em;
    position: relative;
    color: #fff;
    letter-spacing: 1px;
    overflow: hidden;
    box-shadow: 0 0.05rem 0.1rem 0.01rem #d4dbef;
    &:after {
      content: '';
      position: absolute;
      background-color: rgba(255,255,255,.2);
      width: 5rem;
      height: 5rem;
      top: -0.5rem;
      right: -2.5rem;
      transform: rotate(45deg);
    }
    h1 {
      font-size: 0.6rem;
      span {
        font-size: 0.32rem;
        margin-left: .5rem;
      }
      i:first-child {

        display: inline-block;
        height: 0.47rem;
        width: 0.58rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-image:url('../assets/img/i_card_left.png');
        margin-bottom: -0.08rem;
      }
      i:last-child{
        margin-left: 1.3rem;
        display: inline-block;
        height: 0.47rem;
        width: 1.2rem;
        border: 1px solid #fff;
        font-size: 0.28rem;
        font-style: normal;
        text-align: center;
        line-height: 0.47rem;
      }
    }
    h2 {
      font-size: 0.32rem;
    }
    p{
      margin-top: 0.1rem;
      font-size: 0.28rem;
    }
  }
  .command-list {
    background-color: #F9F9F9;
    > li {
      border-top: 1px solid #eaebec;
      border-bottom: 1px solid #fff;
      padding:0.48rem 0.3rem 0.3rem 0.3rem;
      position: relative;
      list-style: none;
      display: flex;
      &:first-of-type {
        border-top:none;
      }
      &:hover, &.active  {
        background-color: #ebeff7;
      }
      >div:first-child {
        &:last-of-type {
          text-align: right;
        }
        img {
          width: 0.6rem;
          height: 0.6rem;
          margin-right: 0.3rem;
          object-fit: contain;
          object-position: center;
          vertical-align: bottom;
        }
        span:first-of-type {
          color: #333;
          font-size: 0.32rem;
        }
        span:last-of-type {
          color: #98999C;
          font-size: 0.24rem;
        }
      }
      >div:nth-child(2) {
        span {
          line-height: .7rem;
        }
      }
      >div:nth-child(3) {
        color: #00CC33;
        img{
          width: .28rem;
          height: .28rem;
          margin-top: .2rem;
          margin-left: 1rem;
        }
      }
      >div:nth-child(4) {
        img{
          width: .31rem;
          height: .39rem;
          margin-top: .1rem;
          margin-left: .8rem;
        }
      }
    }
  }
  .control-panel {
    position: absolute;
    width: 2rem;
    left: 0;
    right: 0;
    top: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    &.up {
      top: auto;
      bottom: 1.1rem;
    }
    > li  {
      line-height: 0.8rem;
      font-size: 0.28rem;
      padding-left: 1.1rem;
      background:#fff no-repeat 0.35rem center;
      background-size: auto 0.36rem;
      box-shadow: 0 2px 5px #ccc;
      &:hover{
        background-color: #f4f4f4;
      }
      &:first-of-type {
        background-image: url('../assets/img/bianji-icon@3x.png');
        border-bottom: 1px solid #ecedee;
      }
      &:last-of-type {
        background-image: url('../assets/img/del-icon@3x.png');
      }
    }
  }
</style>
