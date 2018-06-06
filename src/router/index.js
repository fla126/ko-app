import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import index from '@/pages/index'
import wallet from '@/pages/wallet'
import command from '@/pages/command'
import ucenter from '@/pages/ucenter'
import walletDetail from '@/pages/wallet_detail'
import walletPayment from '@/pages/wallet_payment'
import walletPaymentConfirm from '@/pages/wallet_payment_confirm'
import walletGather from '@/pages/wallet_gather'
import uinfo from '@/pages/mycenter/uinfo'

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
        { path: 'uinfo', name:uinfo.name, component: uinfo } // 个人信息
      ]
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
