<template>
  <div id="setup" class="page">
    <comp-top-back>{{$t('message.setup.setupName')}}</comp-top-back>
    <div class="common-content bg-white mt40 ft-c-gray">
      <div class="inner">
        <div class="box-cont " v-tap="{methods:$root.routeTo, to:'page-lang'}">
          <div class="item"><span class="f30">{{$t('message.setup.languages')}}</span></div>
          <i class="allow-right"></i>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">{{$t('message.setup.fiat')}}</span></div>
        </div>
        <div class="box-cont " >
          <div class="item"><span class="f30">WEB3</span></div>
        </div>
      </div>
    </div>

    <div class="w-space"></div>

    <div class="common-content bg-white mt60">
      <div class="inner">
        <mt-field   class="common-mt-field"   :placeholder="$t('message.setup.manageToken')" v-model="captcha">
          <img class="i-search" src="../../assets/img/mycenter/i_search.png" >
        </mt-field>
        <mt-checklist class="common-clear-style"
          align="right"
          v-model="values"
          :options="options">
        </mt-checklist>
      </div>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Field } from 'mint-ui';
  import { Checklist } from 'mint-ui';
  import { mapGetters, mapActions } from 'vuex'


  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component(Field.name, Field);
  Vue.component(Checklist.name, Checklist);
  export default {
    name:'page-ucenter-setup',
    data(){
      return {
        captcha:'',
        options:[],
        values:[],
      }
    },
    created(){
      this.getSetting()
    },
    mounted(){
      $(".common-clear-style").find(".mint-cell-wrapper:last").css('border-bottom','none')
    },
    watch:{
      values(n,o){
        if(o.length){
          var _currency = {}
          this.options.forEach((item)=>{
            _currency[item] = false
          })
          n.forEach((item)=>{
            _currency[item] = true
          })
          this.setCurrency(_currency)
        }
      },      
    },
    computed:{
      ...mapGetters(['getCurrency']),
    },
    methods:{
      ...mapActions(['setCurrency']),
      getSetting(){
        if(!this.options.length){
          setTimeout(()=>{
            let checked = []
            this.options = Object.keys(this.getCurrency)
            for(let key in this.getCurrency){
              if(this.getCurrency[key]){
                checked.push(key)
              }
            }
            this.values = checked
            this.getSetting()
          },100)
        }
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
</style>
