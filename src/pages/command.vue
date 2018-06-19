<template>
  <div class="page">
    <comp-top-back :class="'line'" :back="false">
      <transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
        <div class="connect-status" v-show="!$store.state.usbkeyStatus"><span></span>{{$t("message.usbkeyStatus.disconnect")}}</div>
      </transition>
      <transition enter-active-class="animated short fadeInUp" leave-active-class="animated short fadeOutUp">
        <div class="connect-status" v-show="$store.state.usbkeyStatus"><span class="active"></span>{{$t("message.usbkeyStatus.connected")}}</div>
      </transition>
      {{$t('message.cmd.passcode')}}
    </comp-top-back>
    <div class="page-main" id="scroll">
      <div>
        <div class="command-container" v-tap="{methods:$root.routeTo, to:'page-command-add'}">
          <h1><i></i><span>{{$t('message.cmd.twofa')}}</span><i>+ {{$t('message.cmd.add')}}</i></h1>
        </div>
        <ul class="command-list unselected mt40" id="commandList" @touchstart="hideCP">
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
          <li @touchstart="activeLayer($event)" @touchend="clearLoop">
            <div class="progress" data-second="5"><span></span><span class="left"><i></i></span><span class="right"><i></i></span><span>{{(timer+5)%30}}</span></div>
            <div>Sjafh3793rdkgvf</div>
            <div><i v-tap="{methods:showControlButton}"></i><span class="f36">123111</span></div>
            <div><i class="btn-copy" :data-clipboard-text="'i love you '"></i></div>
          </li>
        </ul>
        <div class="pb40"></div>
        <transition enter-active-class="animated short fadeIn" leave-active-class="animated short fadeOut">
        <ul class="control-panel" id="controlPanel" v-show="showCP">
          <li v-tap="{methods:showRecordEditor}">{{$t('message.cmd.edit')}}</li>
          <li v-tap="{methods:delRecord}">{{$t('message.cmd.delete')}}</li>
        </ul>
        </transition>
      </div>
    </div>
    <ul class="command-list unselected fixed" id="tempContainer" v-show="isDrag"></ul>
    <command-editor :show="showEditorLayer" :hideFunction="hideEditorLayer" :cname="cname"></command-editor>
  </div>
</template>
<script>
import commandEditor from '@/components/common/command_editor'
import ClipboardJS from 'clipboard'
import { Toast,MessageBox  } from 'mint-ui'

  export default {
    name:'page-command',
    data(){
      return {
        scroll:false,
        showCP:false,
        showEditorLayer:false,
        cname:'Sjafh3793rdkgvf',
        timer:0,
        isDrag:false,
        dragTarget:Object,
        currentPos:0, //拖动对象所处的位置
        init:{
          init_y:0, //拖动起始点y坐标
          init_scroll_top:0, //拖动起始点滚动偏移量
          init_CL_y:0, //口令列表初始位置
          init_CL_li_height:0, //口令列表单列高度
        } 

      }
    },
    mounted(){
      this.init.init_CL_y = $('#commandList').offset().top
      this.init.init_CL_li_height = $('#commandList li:first').outerHeight()
      setInterval(()=>{
        this.timer += 1
      },1000)
      this.initCountDown()
      this.initCopy()
      this.initSortable()
      setTimeout(this.initScroll,1000)
    },
    watch:{
      currentPos(n, o){ //当位置发生跳转时，进行排序动作
        var $tar
        if(n>=0){
          $tar = $('#commandList li').not(this.dragTarget).eq(n)
        } else {
          $tar = $('#commandList li').not(this.dragTarget).eq(0)
        }
        if($tar.length){
          if(n>=0){
            $tar.after(this.dragTarget)
          } else {
            $tar.before(this.dragTarget)
          }
        }
      }
    },
    methods:{
      initScroll(){
        var self = this
        this.scroll = new IScroll('#scroll',{
          mouseWheel:true,
          tap:true,
          click:true
        });
      },
      showControlButton(args) {
        var $container = $(args.event.target).parents('li:first'), $tar = $('#controlPanel')
        $tar.data('tar',$container).css('top',Math.round($container.position().top+$container.height()))
        $container.siblings('.active').removeClass('active')
        $container.addClass('active')
        this.showCP = true
      },
      initSortable(){
        var self = this
        $('#tempContainer').on('touchstart',function(e){
          e.preventDefault()
          e.stopPropagation()
          if (e.targetTouches.length == 1) {
            var touch = e.targetTouches[0];  // 把元素放在手指所在的位置
            self.init.init_y = touch.pageY
            self.init.init_scroll_top = self.scroll.y
          }
          
        }).on('touchmove',function(e){
          e.preventDefault()
          e.stopPropagation()
          if (e.targetTouches.length == 1) {
            var touch = e.targetTouches[0], scroll_dist  // 把元素放在手指所在的位置
            $(this).css("top",(touch.pageY- parseInt($(this).height())/2 + 'px'));
            scroll_dist = self.init.init_scroll_top-(touch.pageY - self.init.init_y)
            scroll_dist = scroll_dist > 0 ? 0: scroll_dist
            scroll_dist = scroll_dist < self.scroll.maxScrollY  ? self.scroll.maxScrollY: scroll_dist
            self.scroll.scrollTo(0, scroll_dist)
            var _pos = Math.floor(($(e.currentTarget).offset().top - self.init.init_CL_li_height/2 - (self.init.init_CL_y+scroll_dist))/self.init.init_CL_li_height)
            self.currentPos = _pos
          }
        }).on('touchend',function(e){
          var $drag = $('#tempContainer')
          self.dragTarget.html($drag.find('li').html())
          self.isDrag = false
          $drag.empty()
        })
      },
      activeLayer(event) {
          clearInterval(this.loop);//再次清空定时器，防止重复注册定时器
          this.loop=setTimeout(()=>{
              var $container = $(event.target).parents('li:first'), $drag = $('#tempContainer')
              $drag.append($container.clone()).css('top',$container.offset().top+'px')
              $container.empty()
              this.isDrag = true
              this.dragTarget = $container
          },500);
      },
      clearLoop(args) {
          clearInterval(this.loop);
      },
      hideCP(){
        this.showCP = false
        if(this.isDrag){
          var $drag = $('#tempContainer')
          this.dragTarget.html($drag.find('li').html())
          this.isDrag = false
          $drag.empty()
        }
      },
      showRecordEditor(args){ //编辑操作
        var self = this
        var _tar = $('#controlPanel').data('tar')
        this.hideCP()
        this.showEditorLayer = true
      },
      delRecord(args){ //删除操作
        var self = this
        this.hideCP()
        MessageBox({
          title:this.$t('message.cmd.confirmTitle'),
          message:this.$t('message.cmd.deleteConfirm'),
          showCancelButton: true,
          showConfirmButton:true,
          cancelButtonText:this.$t('message.cmd.no'),
          confirmButtonText:this.$t('message.cmd.yes'),
        }).then(action => {
          if(action=='confirm'){
            var _tar = $('#controlPanel').data('tar')
            _tar.slideUp(function(){
              this.remove()
              self.scroll.refresh()
            })
          }
        })
      },
      hideEditorLayer(cname){ //隐藏编辑对话框
        this.showEditorLayer = false
        if(cname && typeof(cname)=='string'){
          // 回传编辑数据
          console.log(cname)
        }
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
      initCountDown(){
        //初始化倒计时进度圆环
        $('.progress').each((index,ele)=>{
          var _right = $(ele).find('.right i'), _left = $(ele).find('.left i'), _second = $(ele).data('second')
          if(_second<=15){
            _right.css({'-webkit-animation-delay':-_second+'s','animation-delay':-_second+'s'})
          } else {
            _right.parent().addClass('full')
            _left.css({'-webkit-animation-delay':-(_second-15)+'s','animation-delay':-(_second-15)+'s'})
          }
          this.startProgress(ele,_second)
        })
      },
      startProgress(ele,second){
        //倒计时圆环循环函数
        var _right = $(ele).find('.right'), _left = $(ele).find('.left')
        if(!_right.hasClass('full')){
          _right.addClass('active')
          _right.one('webkitAnimationEnd animationend',()=>{
            _right.removeClass('active')
            _right.find('i').removeAttr('style')
            _right.addClass('full')
            _left.addClass('active')
            _left.one('webkitAnimationEnd animationend',()=>{
              _right.removeClass('full')
              _left.removeClass('active')
            })
          })
        } else {
          _left.addClass('active')
          _left.one('webkitAnimationEnd animationend',()=>{
            _right.removeClass('full')
            _left.find('i').removeAttr('style')
            _left.removeClass('active')
          })
        }
        setTimeout(()=>{
          this.startProgress(ele,0)
        },30-second)
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
      display: inline-block;
      vertical-align: middle;
      width: 0.5rem;
      height: 0.5rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: auto 100%;
      background-image: url('../assets/img/shebeiweilianjie@3x.png');
      margin-right: 0.15rem;
      &.active {
        background-image: url('../assets/img/shebeiyilianjie@3x.png');
      }
    }
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
    &.fixed {
      position: absolute;
      left: 0;
      right: 0;
      top: 1rem;
      box-shadow: 0 0.05rem 0.2rem #ccc
    }
    > li {
      border-top: 1px solid #eaebec;
      border-bottom: 1px solid #fff;
      padding:0.48rem 0.3rem 0.3rem 0.3rem;
      height: 1.38rem;
      position: relative;
      list-style: none;
      display: flex;
      &:first-of-type {
        border-top:none;
      }
      &.active  {
        background-color: #ebeff7;
        > div:first-child span:last-of-type {
          background-color: #ebeff7;
        }
      }
      >div:first-child {
        width: 0.6rem;
        margin-right: 0.3rem;
        position: relative;
        span:nth-of-type(1),span:nth-of-type(2),span:nth-of-type(3),span:nth-of-type(4) {
          position: absolute;
          width: 0.6rem;
          height: 0.6rem;
          left: 0;
          top: 0;
          border-radius: 50%;
        }
        span:nth-of-type(2),span:nth-of-type(3) {
          i {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #ddd;
          }
          &.active i{
            animation: progress 15000ms linear;
            animation-fill-mode: forwards;
          }
          &.full i{
            transform: rotate(-180deg);
          }
        }
        span:nth-of-type(1) {
          background-color: #00CC33;
        }
        span:nth-of-type(2) {
          clip:rect(0,0.3rem,auto,0);
          i {
            clip:rect(0,0.3rem,auto,0);
          }
        }
        span:nth-of-type(3) {
          clip:rect(0,auto,auto,0.3rem);
          i {
            clip:rect(0,auto,auto,0.3rem);
          }
        }
        span:nth-of-type(4) {
          width: 0.48rem;
          height: 0.48rem;
          left: 0.06rem;
          top: 0.06rem;
          background-color: #f9f9f9;
          color: #00CC33;
          text-align: center;
          line-height: 0.5rem;
          font-size: 0.24rem;
        }
      }
      >div:nth-child(2) {
        width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
        color: #666;
        line-height: 0.6rem;
      }
      >div:nth-child(3) {
        width: 3rem;
        margin-left: 0.1rem;
        color: #00CC33;
        i{
          display: inline-block;
          width: 0.9rem;
          height: .28rem;
          margin-top: .2rem;
          background: url('../assets/img/i_block.png') no-repeat center;
          background-size: contain;
        }
      }
      >div:nth-child(4) {
        i{
          display: inline-block;
          width: .31rem;
          height: .39rem;
          margin-top: .14rem;
          background: url('../assets/img/i_copy.png') no-repeat center;
          background-size: contain;
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

  @keyframes progress {
    from {
      transform: rotate(-360deg);
    }
    to {
      transform: rotate(-180deg);
    }
  }
</style>
