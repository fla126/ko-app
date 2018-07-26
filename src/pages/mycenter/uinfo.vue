<template>
  <div id="uinfo" class="page">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.uinfo.userInfo')}}
    </comp-top-back>
    <div class="page-main">
      <div class="common-content bg-white mt40 ft-c-gray">
        <div class="inner">
          <div class="box-cont " >
            <div class="item"><span class="f30">{{$t('message.uinfo.account')}}</span></div>
            <div class="item"><span class="f30">{{$t('message.mycenter.unknown')}}</span></div>
          </div>
          <div class="box-cont " >
            <div class="item"><span class="f30">{{$t('message.uinfo.tinkeyId')}}</span></div>
            <div class="item"><span class="f30">{{getFactoryCode}}</span></div>
          </div>
          <div class="box-cont " >
            <div class="item"><span class="f30">{{$t('message.uinfo.walletNum')}}</span></div>
            <div class="item"><span class="f30">{{getWalletList.length}}</span></div>
          </div>
          <div class="box-cont " @click="isdown=!isdown" >
            <div class="item"><span class="f30">{{$t('message.uinfo.addr')}}</span><img class="nav_right" src="../../assets/img/mycenter/i_question.png"/></div>
            <div class="item" > <img  :class="[{nav_right:true},{isdown:isdown}]" src="../../assets/img/mycenter/i_nav_right.png"/></div>

          </div>

        </div>
      </div>
      <transition enter-active-class="animated short fadeIn" >
          <ul v-show="isdown" class="address_ul f24 mt10" >
            <li v-for="item in FAddr" :class="'btn-copy'" :data-clipboard-text="item.address"><span>{{item.name}}</span><span>{{item.token}}</span><span>{{displayAdress(item.address)}}</span></li>
            
          </ul>
      </transition>
      <div  class="common-content bg-white  ft-c-gray " :class="[isdown ? 'mt10' : 'mt40']">
        <div class="inner">
          <div class="box-cont " >
            <div class="item"><span class="f30 ft-c-blue">{{$t('message.uinfo.updatePwd')}}</span></div>
          </div>
          <div class="box-cont " >
            <div class="item"><span class="f30 ft-c-blue">{{$t('message.uinfo.logOut')}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import ClipboardJS from 'clipboard'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "page-uinfo",
  data(){
    return {
      isdown:false,
      FAddr:[]
    }
  },
  created(){
    var FAddr = JSON.parse(localStorage.getItem('frequentlyAddr') || '{}'), fid = this.getFactoryCode
    FAddr = FAddr[fid] || {}
    var _FAddr = []
    for(let item in FAddr){
      var _obj = {address:item}
      Object.assign(_obj, FAddr[item])
      _FAddr.push(_obj)
    }
    if(_FAddr.length > 1)
    this.FAddr = _FAddr.sort((obj1, obj2)=>{
        return obj1.count < obj2.count
    }).slice(0,5)
  },
  mounted(){
    this.initCopy()
  },
  computed:{
    ...mapGetters(['getFactoryCode','getWalletList']),
  },
  methods:{
    displayAdress(address){
      return address.slice(0,12)+'.......'+address.slice(address.length-9)
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
  }
}
</script>

<style type="text/css" lang="less" scoped >
.page-main {
  overflow-y: auto;
  background-color: #F9F9F9;
}
img{}
img.isdown{
  transform: rotate(90deg);
  transform-origin: 25% 50%;
  transition: transform .2s ease-in;
}



.box-cont{
  display: flex;
  align-items: center;
  height: .85rem;
  border-bottom: .02rem solid #ecedee;
  .item{
    width: 50%;
  }
  .item:first-child{
    img.nav_right{
      margin-left: .2rem;
      width: .26rem;
      height: .26rem;
    }
  }
  .item:nth-child(2){
    text-align: right;
    img.nav_right{
      transform-origin: 25% 50%;
      transition: transform .2s ease-in;
      width: .17rem;
      height: .32rem;
    }
  }
}
.box-cont:last-child{
  border-bottom:0;
}

.address_ul{
  padding: 0.15rem .3rem;

  li{
    display: flex;
    justify-content: space-between;
    line-height: .6rem;
  }
}

</style>
