import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import guide from '@/pages/guide'
import login from '@/pages/login'
import register from '@/pages/register'
import resetPassword from '@/pages/reset_password'
import index from '@/pages/index'
import wallet from '@/pages/wallet'
import command from '@/pages/command'
import commandAdd from '@/pages/command/cmd_add'
import ucenter from '@/pages/ucenter'
import walletDetail from '@/pages/wallet_detail'
import walletPayment from '@/pages/wallet_payment'
import walletPaymentConfirm from '@/pages/wallet_payment_confirm'
import walletGather from '@/pages/wallet_gather'
import uinfo from '@/pages/mycenter/uinfo'
import message from '@/pages/mycenter/message'
import backup from '@/pages/mycenter/backup'
import setup from '@/pages/mycenter/setup'
import record from '@/pages/mycenter/record'
import uwallet  from '@/pages/mycenter/uwallet '
import addwallet  from '@/pages/mycenter/addwallet '
import help  from '@/pages/mycenter/help'
import about  from '@/pages/mycenter/about'
import pwd  from '@/pages/pwd/pwd_index'
Vue.use(Router)

// const Foo = r => require.ensure([], ()=>r(require('../components/foo.vue')), 'group-foo')
// const Bar = r => require.ensure([], ()=>r(require('../components/bar.vue')), 'group-foo')
//文件分开打包组件引用方法

const scrollBehavior = (to, from, savedPosition) => { //滚动行为
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}


const router = new Router({
  linkActiveClass: 'active',
  base: __dirname,
  //mode: 'history', // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  scrollBehavior,
  routes: [{
      path: '/',
      name: index.name,
      component: index,
      children:[
        { path: '',  redirect:{ name: 'page-wallet' }},
        { path: 'wallet', name:wallet.name, component: wallet },
        { path: 'command', name:command.name, component: command },
        { path: 'ucenter', name:ucenter.name, component: ucenter },
        { path: 'uinfo', name:uinfo.name, component: uinfo }, // 个人中心--信息
        { path: 'message', name:message.name, component: message }, // 个人中心--消息
        { path: 'backup', name:backup.name, component: backup }, // 个人中心--备份
        { path: 'setup', name:setup.name, component: setup }, // 个人中心--设置
        { path: 'record', name:record.name, component: record }, // 个人中心--记录
        { path: 'uwallet', name:uwallet.name, component: uwallet  }, // 个人中心--钱包
        { path: 'addwallet', name:addwallet.name, component: addwallet  }, // 个人中心--钱包
        { path: 'help', name:help.name, component: help  }, // 个人中心--帮助
        { path: 'about', name:about.name, component: about  }, // 个人中心--关于我们
      ]
    },
      {
      path:'/command-add', //口令
      name: commandAdd.name,
      component: commandAdd
    },
    {
      path:'/guide', //引导页面
      name: guide.name,
      component: guide
    },
    {
      path:'/login', //登录页面
      name: login.name,
      component: login
    },
    {
      path:'/register', //注册页面
      name: register.name,
      component: register
    },
    {
      path:'/reset-password', //重置密码页面
      name: resetPassword.name,
      component: resetPassword
    },
    {
      path:'/wallet-detail', //钱包详情
      name: walletDetail.name,
      component: walletDetail
    },
    {
      path: '/wallet-payment', //钱包转账
      name: walletPayment.name,
      component: walletPayment
    },
    {
      path: '/wallet-payment-confirm', //钱包转账确认
      name: walletPaymentConfirm.name,
      component: walletPaymentConfirm
    },
    {
      path: '/wallet-gather', //钱包收款
      name: walletGather.name,
      component: walletGather
    },
    /*{
      path: '/recordDetail/:rid',
      name: recordDetail.name,
      component: recordDetail
    },
    /*{
      path: '/prizeResult',
      name: prizeResult.name,
      component: prizeResult
    }*/
  ]
})

/**
 * @desc 全局监听路由变化
 */
router.beforeEach((to, from, next) => {
  store.commit('updateHistoryLength') // 变化时更新路由切换长度
  next()
})

export default router
