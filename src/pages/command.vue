<template>
  <div class="page">
    <mt-header class="all-header common-mt-header" title="口令">
    </mt-header>
    <div class="page-main" id="scroll" @click="setBlur($event)">
      <div>
        <div class="amount-container" v-tap="{methods:routeTo, to:'page-command-add'}">
          <h1><i></i><span>二次身份验证</span><i></i></h1>
        </div>
       <!-- <div class="search-container" id="searchContainer">
          <input type="search" :class="{active:currencySearchText.length, hidden:isSearchFixed}"  :placeholder="$t('message.currencySearch')" v-model="currencySearchText">
        </div>-->
        <ul class="currency-list mt40">
          <li>
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36"> 123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>

          <li>
            <div><img src="../assets/img/i_com_number15.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36"> 123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
          <li>
            <div><img src="../assets/img/i_com_number.png"></div>
            <div><span class="f28 ft-c-gray">Sjafh3793rdkgvf</span></div>
            <div><img src="../assets/img/i_block.png"><span class="f36"> 123 456</span></div>
            <div><img src="../assets/img/i_copy.png"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import compWalletTop from '@/components/top_wallet'


  export default {
    name:'page-command',
    data(){
      return {
        currencySearchText:'',
        currencySearchTopText:'',
        currencyInitSearchPos:0,
        currencyCurrentSearchPos:0,
        scroll:false,
      }
    },
    mounted(){
      /* this.currencyInitSearchPos = $('#searchContainer').position().top + $('#searchContainer').height()
      setTimeout(this.initScroll,700) */
    },
    watch:{
      currencySearchTopText(_new,_old){
        this.currencySearchText = _new
      }
    },
    computed:{
      isSearchFixed(){
        return Math.abs(this.currencyCurrentSearchPos)>this.currencyInitSearchPos ? true:false
      }
    },
    methods:{
      initScroll(){
        var self = this
        this.scroll = new IScroll('#scroll',{
          mouseWheel:true,
          click:true,
          probeType:2,
        });
        this.scroll.on('scroll',function(){
          self.currencyCurrentSearchPos = this.y
        })
        this.scroll.on('scrollEnd',function(){
          self.currencyCurrentSearchPos = this.y
        })
      },
      setBlur(e){
        if(e.target.tagName!='input'){
          $('.search-container input').blur()
        }
      },
      routeTo(args){
        this.$router.push({ name: args.to})
      }
    },
    components:{
      compWalletTop,
    }
  }

</script>
<style lang="less" scoped>
  .page-main {
    overflow-y: hidden;
  }
  .amount-container {
    height: 1.8rem;
    background-color: #4D7BF3;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    padding-left: 0.6rem;
    padding-top: 0.5rem;
    border-radius: 0.3em;
    position: relative;
    color: #fff;
    letter-spacing: 1px;
    overflow: hidden;
    box-shadow: 0 0.05rem 0.1rem 0.01rem #d4dbef;
    &:before {
      content: '';
      position: absolute;
      background-color: rgba(255,255,255,.2);
      width: 4rem;
      height: 4rem;
      top: -2rem;
      right: -2.5rem;
      transform: rotate(45deg);
    }
    &:after {
      content: '';
      position: absolute;
      background-color: rgba(255,255,255,.2);
      width: 5rem;
      height: 5rem;
      top: 1rem;
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
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-image:url('../assets/img/i_card_add.png');
        margin-bottom: -0.08rem;
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

  .search-container {
    padding: 0.2rem 0.3rem 0.15rem 0.3rem;
    background-color: #fff;
    input {
      width: 100%;
      text-align: center;
      font-size: 0.28rem;
      color: #333333;
      border: none;
      padding: 0.1rem 0.15rem;
      background: url('../assets/img/sousuo@3x.png') no-repeat center top;
      background-size: auto 0.5rem;
      &:focus {
        outline: none;
      }
      &.active {
        background: transparent;
      }
      &.hidden {
        visibility: hidden;
      }
    }
    &.fixed {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 1000;
    }
  }
  .currency-list {
    background-color: #F9F9F9;
    height: 10rem;
    li {
      border-top: 1px solid #eaebec;
      border-bottom: 1px solid #fff;
      padding:0.48rem 0.3rem 0.3rem 0.3rem;
      list-style: none;
      display: flex;
      &:first-of-type {
        border-top-color: #e4e5e7;
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
        img{
          width: .26rem;
          height: .26rem;
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
</style>
