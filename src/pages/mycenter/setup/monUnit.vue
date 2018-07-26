<template>
  <div class="page">
    <comp-top-back>{{$t('message.setup.monunit')}}<span class="save-btn" v-tap="{methods:saveFiat}">{{$t('message.setup.save')}}</span></comp-top-back>
    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:changeFiat, t:'CNY'}">
          <div class="item"><span class="f30">CNY</span><i class="tick" v-show="fiat=='CNY'"></i></div>
        </div>
        <div class="box-cont " v-tap="{methods:changeFiat, t:'USD'}">
          <div class="item"><span class="f30">USD</span><i class="tick" v-show="fiat=='USD'"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name:'page-monUnit',
    data(){
      return {
        fiat:''
      }
    },
    created(){
      this.fiat = this.getFiat
    },
    computed:{
      ...mapGetters(['getFiat'])
    },
    methods:{
      ...mapActions(['setFiat']),
      changeFiat(args){
        this.fiat = args.t
      },
      saveFiat(args){
        this.setFiat(this.fiat)
        this.$router.replace({name:'page-ucenter-setup'})
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
