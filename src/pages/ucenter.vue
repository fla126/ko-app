<template>
  <div class="page">
    <comp-top-back :class="'line'" :back="false" >
        {{$t('message.mycenter.center')}}
      <span class="header-right"><img v-tap="{methods:$root.routeTo, to:'page-ucenter-setup'}" class="uwallet-right-img" src="../assets/img/shezhi_icon@3x.png"/></span>
    </comp-top-back>
    <div class="page-main">
      <div class="common-content u-box1 mt40">
         <div class="inner" v-tap="{methods:goUinfo}">
              <ul>
                <li><img src="../assets/img/mycenter/i_b_000.png"/></li>
                <li>
                  <span class="f36" v-if="hasLogin">{{getUserInfo.username}}</span>
                  <span class="f36" v-else>{{$t('message.login.noLogin')}}</span>
                  <span class="f24" v-if="getUsbkeyStatus">{{$t('message.uinfo.tinkey')}}: {{displayFactoryCode}}</span>
                  <span class="f24" v-else>{{$t('message.uinfo.tinkey')}}: {{$t('message.usbkeyStatus.disconnect')}}</span>
                </li>
                <li><img  src="../assets/img/mycenter/i_right_nav.png"/></li>
              </ul>
         </div>
      </div>

      <div class="common-content bg-white mt40" id="uclist">
        <div class="inner">
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'activity-invite-poster'}">
            <div class="item"><img src="../assets/img/activity/invite/activity-icon@3x.png" ></div>
            <div class="item"><span>{{$t('message.activity.invite.joinActivity')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-mall'}">
            <div class="item"><img src="../assets/img/activity/invite/mall-icon@3x.png" ></div>
            <div class="item"><span>{{$t('message.activity.invite.getTinkey')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-mytinkey'}">
            <div class="item"><img src="../assets/img/activity/invite/icon-tinkey.png" ></div>
            <div class="item"><span>{{$t('message.activity.invite.myTinkey')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-msg'}">
            <div class="item"><img src="../assets/img/mycenter/i_b_002.png" ></div>
            <div class="item"><span>{{$t('message.mycenter.msg')}}<i class="red-dot" v-if="getHasMessage"></i></span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-record'}">
            <div class="item"><img src="../assets/img/mycenter/i_b_003.png" ></div>
            <div class="item"><span>{{$t('message.mycenter.rec')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-uwallet'}">
            <div class="item"><img src="../assets/img/mycenter/i_b_004.png" ></div>
            <div class="item"><span>{{$t('message.mycenter.wallet')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-backup'}">
            <div class="item"><img src="../assets/img/mycenter/i_b_005.png" ></div>
            <div class="item"><span>{{$t('message.mycenter.backup')}}</span></div>
          </div>
        </div>
      </div>

      <div class="common-content bg-white mt40">
        <div class="inner">
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-help'}">
            <div class="item"><img class="left5"  src="../assets/img/mycenter/i_b_006.png" ></div>
            <div class="item"><span class="f30">{{$t('message.mycenter.help')}}</span></div>
          </div>
          <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-about'}">
            <div class="item"><img class="left6"  src="../assets/img/mycenter/i_b_007.png" ></div>
            <div class="item"><span class="f30">{{$t('message.mycenter.about')}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JsCookies from 'js-cookie'

export default {
  name:'page-ucenter',
  data(){
    return {
      hasLogin:false
    }
  },
  created(){
    this.hasLogin = JsCookies.get('api_token')?true:false
  },
  mounted(){
    $('#uclist .box-cont').on('touchstart',(e)=>{
      $(e.currentTarget).addClass('active')
      setTimeout(()=>{
        $(e.currentTarget).removeClass('active')
      },250)
    })
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getUserInfo','getFactoryCode','getHasMessage']),
    displayFactoryCode(){
      return this.getFactoryCode.slice(0,13)+'****'+this.getFactoryCode.slice(this.getFactoryCode.length-6)
    }
  },
  methods:{
    goUinfo(){
      var apiToken = JsCookies.get('api_token')
      if(!apiToken){
        this.$router.push({name:'login', query:{hurl:encodeURIComponent(this.$route.fullPath)}})
      } else {
        this.$router.push({name:'page-uinfo'})
      }
    }
  }
}

</script>
<style type="text/css" lang="less"  scoped >
  .page-main{
    background-color: #f9f9f9;
  }
  .header-right{
    position: absolute;
    right: .3rem;
    img.uwallet-right-img{
      width: .5rem;
      height: .5rem;
    }
  }
  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    font-size: 0.3rem;
    border-bottom:.02rem solid #ecedee;
    &.active {
      background-color: #f3f3f3;
    }
    .item:first-child{
      width: .4rem;
    }
    .item{
      height: .4rem;
      span{
        line-height: .4rem;
        margin-left: .35rem;
        position: relative;
      }
    }
  }
  .box-cont:last-child{
    border-bottom:0;
  }
.u-box1 {
  background-color: #4d7bf3;
  ul{
     display: flex;
     padding: .55rem 0;
     justify-content: space-between;
  }
  li{
      height: .75rem;
    }
  li:nth-child(1) img{
    margin-top: .2rem;
    width: .54rem;
    height: .46rem;
  }
  li:nth-child(2){
    width: 5rem;
    height: .75rem;
    span:nth-child(1){
       color: #ffffff;
    }
    span:nth-child(2){
      color: #becffa;
      display: block;
    }
  }
  li:nth-child(3) img{
    margin-top: .2rem;
    width: .22rem;
    height: .42rem;
  }
}
.red-dot {position: absolute; right: -0.2rem; top: 0; background-color: red; width: 5px; height: 5px; border-radius: 50%;}
</style>
