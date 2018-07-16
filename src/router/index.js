import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import init from '@/pages/init'
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
import msginfo from '@/pages/mycenter/msginfo'// 交易记录详细
import backup from '@/pages/mycenter/backup'
import setup from '@/pages/mycenter/setup'
import monUnit from '@/pages/mycenter/setup/monUnit'
import record from '@/pages/mycenter/record'
import uwallet  from '@/pages/mycenter/uwallet '
import addwallet  from '@/pages/mycenter/addwallet '
import help  from '@/pages/mycenter/help'
import mustRead  from '@/pages/mycenter/help/mustRead'
import walletbackup  from '@/pages/mycenter/help/walletbackup'/*备份说明*/
import walletUse  from '@/pages/mycenter/help/walletUse'/*使用说明*/
import problem  from '@/pages/mycenter/help/problem'/*常见问题*/
import contact  from '@/pages/mycenter/help/contact'/*联系我们*/
import about  from '@/pages/mycenter/about'
import agreement  from '@/pages/mycenter/about/agreement'/*用户协议*/
import privacy  from '@/pages/mycenter/about/privacy'/*隐私条款*/
import join  from '@/pages/mycenter/about/join'/*隐私条款*/
import pwd  from '@/pages/pwd/pwd_index'
import Lang  from '@/pages/mycenter/setup/lang'
import webthree  from '@/pages/mycenter/setup/webthree'/*web3设置*/
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
        // { path: '',  redirect:{ name: 'page-wallet' }},
        { path: 'wallet', name:wallet.name, component: wallet },
        { path: 'command', name:command.name, component: command },
        { path: 'ucenter', name:ucenter.name, component: ucenter }
      ]
    },
    { path: '/uinfo', name:uinfo.name, component: uinfo }, // 个人中心--信息
    { path: '/message', name:message.name, component: message }, // 个人中心--消息
    { path: '/msginfo', name:msginfo.name, component: msginfo }, // 个人中心--消息
    { path: '/backup', name:backup.name, component: backup }, // 个人中心--备份
    { path: '/setup', name:setup.name, component: setup }, // 个人中心--设置
    { path: '/monUnit', name:monUnit.name, component: monUnit }, // 个人中心--设置--货币单位
    { path: '/webthree', name:webthree.name, component: webthree }, // 个人中心--设置--web3设置

    { path: '/record', name:record.name, component: record }, // 个人中心--记录
    { path: '/uwallet', name:uwallet.name, component: uwallet  }, // 个人中心--钱包
    { path: '/addwallet', name:addwallet.name, component: addwallet  }, // 个人中心--添加钱包
    { path: '/help', name:help.name, component: help  }, // 个人中心--帮助
    { path: '/mustRead', name:mustRead.name, component: mustRead  }, // 帮助--新手必读
    { path: '/walletbackup', name:walletbackup.name, component: walletbackup  }, // 帮助--钱包备份
    { path: '/walletUse', name:walletUse.name, component: walletUse  }, // 帮助--钱包使用
    { path: '/problem', name:problem.name, component: problem  }, // 帮助--常见问题
    { path: '/contact', name:contact.name, component: contact  }, // 帮助--联系我们
    { path: '/about', name:about.name, component: about  }, // 个人中心--关于我们
    { path: '/agreement', name:agreement.name, component: agreement  }, // 关于我们-用户协议
    { path: '/privacy', name:privacy.name, component: privacy}, // 关于我们-用户协议
    { path: '/join', name:join.name, component: join}, // 关于我们-用户协议
    {
      path:'/command-add', //添加口令
      name: commandAdd.name,
      component: commandAdd
    },
    {
      path:'/init', //初始化页面
      name: init.name,
      component: init
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
      path:'/wallet-detail/:currency?', //钱包详情
      name: walletDetail.name,
      component: walletDetail
    },
    {
      path: '/wallet-payment/:currency?/:idx?', //钱包转账
      name: walletPayment.name,
      component: walletPayment
    },
    {
      path: '/wallet-payment-confirm/:currency/:idx?', //钱包转账确认
      name: walletPaymentConfirm.name,
      component: walletPaymentConfirm
    },
    {
      path: '/wallet-gather/:currency?', //钱包收款
      name: walletGather.name,
      component: walletGather
    },
    {path: '/lang', name: Lang.name, component: Lang },
    {path: '*', redirect:{ name: 'page-wallet' } },
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
