<template>
  <div class="page">
    <comp-top-back>{{$t('message.setup.languages')}} <span class="save-btn" v-tap="{methods:saveLang}">{{$t('message.setup.save')}}</span></comp-top-back>
    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:changeLang, t:'zhCHS'}">
          <div class="item"><span class="f30">简体中文</span><i class="tick" v-show="lang=='zhCHS'"></i></div>
        </div>
        <div class="box-cont " v-tap="{methods:changeLang, t:'en'}">
          <div class="item"><span class="f30">English</span><i class="tick" v-show="lang=='en'"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name:'page-lang',
    data(){
      return {
        lang:''
      }
    },
    created(){
      this.lang = this.getLang
    },
    computed:{
      ...mapGetters(['getLang']),
    },
    methods:{
      ...mapActions(['setLang']),
      changeLang(args){
        this.lang = args.t
      },
      saveLang(args){
        this.setLang(this.lang)
        window.$i18n.locale = this.lang
        this.$router.push({name:'page-ucenter-setup'})
      }
    },
  }

</script>
<style type="text/css" lang="less" scoped >
  .box-cont{
    display: flex;
    align-items: center;
    height: .85rem;
    border-bottom: .02rem solid #ecedee;
    position: relative;
    .item{
      width: 50%;
    }
    .item:nth-child(2){
      text-align: right;
      img.nav_right{
        width: .17rem;
        height: .32rem;
      }
    }
  }

  .box-cont:last-child{
    border-bottom:0;
  }
  .save-btn {
    position: absolute;
    right: 0.3rem;
    color: #4d7bf3;
    font-size: 0.32rem;
  }
</style>
