<template>
  <div  class="page">
    <comp-top-back :class="'line'" :back="true" >
      {{$t('message.mycenter.wallet')}}
      <span class="header-right"><img v-if="getUsbkeyStatus" v-tap="{methods:$root.routeTo, to:'page-addwallet'}" class="uwallet-right-img" src="../../assets/img/mycenter/i_nav_add.png"/></span>
    </comp-top-back>

    <div class="page-main" id="scroll" v-show="getWalletList.length">
      <section>
            <div v-for="(token,i) in getShowCurrency" class="uwallet-box " :key="i">
              <h1 class="uwallet-h1 mt25 f30">{{token}}</h1>
              <div class="uwallet-content w-content m-box1 mt25 f24">
                <div class="inner">
                  <section v-for="(wallet,j) in getWalletList" class="one" :key="j">
                    <span >{{wallet.name || token+$root.fitLen(j+1,2)}}</span>
                    <span>{{$root.getAddress(token,wallet.publicKey)}}</span>
                    <span> <button class="tin-btn-default" :class="[checkFrozen(token,wallet.publicKey)?'tin-btn-green':'tin-btn-blue']" v-tap="{methods:toggleFrozen, token:token, publicKey:wallet.publicKey}">{{checkFrozen(token,wallet.publicKey)? $t('message.wallet.unfrozen'):$t('message.wallet.frozen')}}</button>
                     </span>
                  </section>
                </div>
              </div>
            </div>
        <div style="height:.7rem">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { MessageBox,Toast} from 'mint-ui'
var walletFrozenSetting = JSON.parse(localStorage.getItem('walletFrozenSetting') || '{}')

export default {
    name: "page-uwallet",  
    data(){
    return {
      scroll:false,
      WFSetting:walletFrozenSetting
    }
  },
  created(){
    
  },
  mounted(){
    setTimeout(this.initScroll,700);
  },
  computed:{
    ...mapGetters(['getUsbkeyStatus','getWalletList','getShowCurrency','getFactoryCode']),
  },
  methods:{
    ...mapActions(['setWalletList']),
    checkFrozen(token, publicKey){ //检查钱包币种是否被冻结 fid 硬件id号 publicKey 公钥 token 币种
      var fid = this.getFactoryCode
      return this.WFSetting[fid] && this.WFSetting[fid][publicKey] && this.WFSetting[fid][publicKey][token]
    },
    toggleFrozen(args){ //冻结、解冻钱包
      console.log(this.WFSetting)
      var token = args.token, publicKey = args.publicKey
      MessageBox.confirm(this.$t('message.wallet.wok'),this.$t('message.cmd.confirmTitle'),{confirmButtonText:this.$t('message.cmd.yes'),cancelButtonText:this.$t('message.cmd.no')}).then(action => {
        var fid = this.getFactoryCode, status = this.checkFrozen(token, publicKey)
        if(!this.WFSetting[fid]){
          Vue.set(this.WFSetting, fid, {})
        }
        if(!this.WFSetting[fid][publicKey]){
          Vue.set(this.WFSetting[fid], publicKey, {})
        }
        Vue.set(this.WFSetting[fid][publicKey], token, !status)
        localStorage.setItem('walletFrozenSetting',JSON.stringify(this.WFSetting))
      })
    },
    initScroll(){
      var self = this
      this.scroll = new IScroll('#scroll',{
        // mouseWheel:true,
        tap:true
      });
     },
  }
}
</script>

<style type="text/css" lang="less" scoped >
  .page-main{
    overflow-y: hidden;
    background-color: #F9F9F9;
  }
  .header-right{
    position: absolute;
    right: .3rem;
    img.uwallet-right-img{
      width: .4rem;
      height: .4rem;
      margin-top: .07rem;
    }
  }

  .uwallet-content .one{
    display: flex;
    justify-content: space-between;
    border-bottom:.02rem solid #ecedee;
    padding: 0.2rem 0rem;
    span:nth-of-type(1){
      width: 1rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    span:nth-of-type(2){
       width: 3rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
  }
  .uwallet-content .one span{
     line-height: .45rem;
  }
  .uwallet-content .one:last-child{
    border-bottom: 0;
  }
  .m-box1,.m-box2{
    background-color:white;
  }
  .m-box2{
    margin-top: .4rem;
    color: #4d7bf3;
  }

  .uwallet-box h1{
    padding-left: .3rem;
  }
  .w-content>.inner{
    padding: 0 .3rem;
  }

</style>
