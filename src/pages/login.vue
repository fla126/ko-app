<template>
  <div class="page">
    <comp-top-back></comp-top-back>
    <div class="login-top"><i></i></div>
    <div class="login-form">
      <div>
        <p><i class="mobile"></i><input type="text" name="username" v-model="username" maxlength="20" :placeholder="$t('message.login.usernamePlaceholder')"></p>
        <p><i class="password"></i><input type="password" name="password" v-model="password" maxlength="20" :placeholder="$t('message.login.passwordPlaceholder')"><i class="clear-password" v-tap="{methods:resetPW}"></i></p>
        <div class="findpw"><router-link :to="{name:'reset-password'}" tag="span">{{$t('message.login.forgot')}}</router-link></div>
        <div class="login-btn"><mt-button type="primary" size="large" v-tap="{methods:login}">{{$t('message.login.login')}}</mt-button></div>
        <div class="reg-btn">{{$t('message.login.noAccount')}} <router-link :to="{name:'register'}">{{$t('message.login.register')}}</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import Tip from '@/components/common/tip.js'
import api from '@/api/data'
import utils from '@/assets/js/utils'
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'login',
  data(){
  	return {
      locked: false,//锁
      username:'',
  		password:'',
      hurl:'' //回调地址
  	}
  },
  created(){
    this.hurl = decodeURIComponent(this.$route.query.hurl || '')
  },
  computed:{
    ...mapGetters([]),
  },
  methods:{
    ...mapActions(['setApiToken','setUserInfo']),
    resetPW(){
      this.password = ''
    },
    login(args){
      $('.login-form input').blur()
      this.username = $.trim(this.username)
      this.password = $.trim(this.password)
      if(!this.$root.ismobile(this.username) && !this.$root.isemail(this.username)){
        Tip({type:'danger',title:this.$t('message.login.error'), message:this.$t('message.login.accountError')})
        $('.login-form input[name=username]').focus()
        return
      }
      if(!this.$root.trim(this.password,1)){
        Tip({type:'danger',title:this.$t('message.login.error'), message:this.$t('message.login.passwordError')})
        $('.login-form input[name=password]').focus()
        return
      }
      if (this.locked) {
        return
      }
      // utils.gtValidate((gtParams) => {
      //   this.locked = true
      //   let formData = new FormData()
      //   formData.append('username', this.username)
      //   formData.append('password', utils.encryptPwd(this.password))
      //   for (var i in gtParams) {
      //     formData.append(i, gtParams[i])
      //   }
        this.locked = true
        let formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', utils.encryptPwd(this.password))
        formData.append('requestType', 'mobile')
        api.login(formData).then((res) => {
          this.locked = false
          if (res.data.rst===1) {
            let apiToken = res.data.data.Authorization
            this.setApiToken(apiToken)
            this.setUserInfo({username:this.username})
            if(this.hurl){
              this.$router.replace(this.hurl)
            } else {
              this.$router.replace({name:'page-wallet'})
            }
          } else {
            this.password = ''
            Tip({type:'danger',title:this.$t('message.login.error'), message:this.$t('message.init.invalidPassword')})
          }
        })
      // })


    }
  },
  components:{    
   
  }
}

</script>
<style lang="less" scoped>

.login-top {
  height: 4.6rem;
  position: relative;
  i {
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    left: 0;
    top: 1.3rem;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    background: url('../assets/logo.png') no-repeat center;
    background-size: contain;
  }
}
.login-form {
  padding-left: 0.45rem;
  padding-right: 0.45rem;
  p {
    padding-bottom: 0.22rem;
    padding-left: 0.75rem;
    position: relative;
    line-height: 0.5rem;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 1px solid #eaebec;
      border-top: 1px solid #fff;
    }
    i {
      position: absolute;
      width: 0.5rem;
      height: 0.5rem;
      background: no-repeat center;
      background-size: contain;
      vertical-align: middle;
      &.mobile {
        background-image: url('../assets/img/shoujihao@3x.png');
        left: 0;
      }
      &.password {
        background-image: url('../assets/img/mima@3x.png');
        left: 0;
      }
      &.clear-password {
        background-image: url('../assets/img/mimabukejian@3x.png');
        right: 0;
      }
    }
    input {
      width: 5rem;
      border: none;
      border-left: 1px solid #666666;
      background-color: transparent;
      padding-left: 0.4rem;
      font-size: 0.28rem;
      &::placeholder {
        color: #666;
      }
    }
    &:nth-of-type(2){
      margin-top: 0.9rem;
    }
  }
  .findpw {
    text-align: right;
    color: #666;
    margin-top: 0.32rem;
  }
  .login-btn {
    margin-top: 1.1rem;

  }
  .reg-btn {
    margin-top: 0.5rem;
    text-align: center;
    color: #585858;
    a {
      color: #4D7BF3;
    }
  }
}
</style>