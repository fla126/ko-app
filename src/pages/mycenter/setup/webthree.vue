<template>
  <div  class="page">
    <comp-top-back>{{$t('message.setup.webset')}}<span class="save-btn" v-tap="{methods:saveWeb}">{{$t('message.setup.save')}}</span></comp-top-back>
    <div class="page-main">
      <ul class="addcmd-detail">
        <li>
          <p>WALLET SERVICE URL</p>
          <p><input id="account" maxlength="25" :placeholder="webUrl" type="text" v-model="url"></p>
        </li>
        <li>
          <p class="default" v-tap="{methods:setDefault}" >{{$t('message.setup.defaulturl')}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Tip from '@/components/common/tip.js'
  export default {
    name:'page-webthree',
    data(){
      return {
        collapsed:true,
        webUrl:'https://web3.token.im',
        default:'https://web3.token.im22',
        url:''
      }
    },
    created(){
     /* if(!this.getWebThree){
        this.setWebThree(this.default)
      }*/
      //this.webUrl = this.getWebThree
    },
    computed:{
      ...mapGetters(['getWebThree'])
    },
    mounted(){

    },
    methods:{
      ...mapActions(['setWebThree']),
      saveWeb(){
        if(!this.$root.isurl(this.url)){
          Tip({type:'danger',title:this.$t('message.login.error'), message:'请输入正确的url'})
          $('#account').focus()
          return
        }
        this.setWebThree(this.url)
        this.$router.push({name:'page-ucenter-setup'})
      },
      setDefault(){
        this.setWebThree(this.default)
        this.webUrl=this.default;
        this.url='';
      }
    },
  }

</script>
<style type="text/css" lang="less" scoped >
  .addcmd-detail {
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
        p{
          text-align: center;
          color: #4d7bf3;
           font-size:0.32rem
        }
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

  .save-btn {
    position: absolute;
    right: 0.3rem;
    color: #4d7bf3;
    font-size: 0.32rem;
  }
</style>
