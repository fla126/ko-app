<template>
  <div  class="page wrap">

    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.wallet.addWallet')}}
    </comp-top-back>

    <div class="common-content mt10">
       <div class="inner">
         <section class="item">
                <h1 class="f36 mt40">{{$t('message.wallet.addWallet')}}</h1>
                <h2 class="f24 mt60 ft-c-gray30">{{$t('message.wallet.token')}}</h2>
          <div class="styled-select mt20">
             <select class="select f24  ft-c-gray">
               <option>BTC</option>
               <option>ETH</option>
               <option>BARK</option>
             </select>
          </div>
         </section>
         <div class="hr"></div>
       </div>
    </div>

    <div class="common-content mt10">
      <div class="inner">
        <section class="item" style="padding-bottom: .1rem;">
          <h2 class="f24 mt50 ft-c-gray30">{{$t('message.wallet.walletName')}}</h2>
          <input class="common-input-default f30 mt20"  placeholder="Wynne07" />
        </section>
        <div class="hr"></div>
      </div>
    </div>

    <!--<div class="column is-12">
      <label class="label" for="email">Email</label>
      <p class="control">
        <input name="email"
               type="text"
               placeholder="Email"
               v-validate
               data-rules="required|email"
               :class="{  'input': true,'is-danger': errors.has('email')}">
        <span class="help is-danger" v-show="errors.has('email')" >{{ errors.first('email') }}要</span>
      </p>
    </div>-->
    <footer>
        <div class="common-content footer mt100">
           <div class="inner">
              <p class="f20 ft-c-red">{{$t('message.wallet.topInfo')}}</p>
              <mt-button class="mt20" size="large" type="primary" @click="addFun" >{{$t('message.wallet.add')}}</mt-button>
           </div>
        </div>
    </footer>
    <wallet-add :show="showEditorLayer" :hideFunction="hideEditorLayer" :cname="cname"></wallet-add>
  </div>
</template>

<script>
  import Vue from 'vue'
  // import walletAdd from '@/components/common/wallet_pwd_add'
  import { Button } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Header } from 'mint-ui';
  import { Toast,MessageBox  } from 'mint-ui'
  import Tip from '@/components/common/tip.js'

  // import VeeValidate, { Validator } from 'vee-validate'
  // import messages  from 'vee-validate/dist/locale/zh_CN.js'


  const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
  };
  // Vue.use(VeeValidate,config);

  Vue.component(Button.name, Button);
  Vue.component(Header.name, Header);
  Vue.component(Cell.name, Cell);
  Vue.component(Toast.name, Toast);
  Vue.component(MessageBox.name, MessageBox);
    export default {
      name: "page-addwallet",
      components:{
         // walletAdd,
      },
      data(){
          return{
            showEditorLayer:false,
            cname:'',
          }
      },
      mounted(){
        Tip({
          type:'success',//
          title:'Success',
          message:'congratulation'
        })
      },
      methods:{
        hideEditorLayer(cname){ //隐藏编辑对话框
          this.showEditorLayer = false
          if(cname && typeof(cname)=='string'){
            // 回传编辑数据
            console.log(cname)
          }
        },
        routeTo(args){
          this.$router.push({ name: args.to})
        },
        addFun(){
          Toast('提示信息');
          this.showEditorLayer = true
        }
      },
    }
</script>

<style type="text/css" lang="less" scoped >
.common-content{
  .hr{
    border-top: .01rem solid #eaebec;
  }
}
.styled-select  {
  overflow: hidden;
  background: url("../../assets/img/i_down.png") no-repeat right;
  background-size: .26rem .15rem;
  select{
    background: transparent;
    width: 100%;
    border: 0;
    height: .6rem;
    line-height: .5rem;
    -webkit-appearance: none;
  }
}

/*.select{
  width:100%;
  height: .5rem;
  border:0;
  background: #f9f9f9;
  padding: .1rem;
}*/
.select:focus {
  outline:none;
  border: 0;
}
.common-input-default{
  padding:.1rem 0;
  width: 100%;
  border: 0;
  background: bottom;
}

.common-input-default:focus {
  outline:none;
  border: 0;
}

  .item{
    border-bottom: .01rem solid #fff;
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: .3rem;
    text-align: center;
  }
.footer button{
 background-color: #4d7bf3;
}
</style>
