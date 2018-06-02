import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import index from '@/pages/index'


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
      component: index
    },
    /*{
      path:'/introduce',
      name: introduce.name,
      component: introduce
    },
    {
      path: '/record',
      name: record.name,
      component: record
    },
    {
      path: '/recordDetail/:rid',
      name: recordDetail.name,
      component: recordDetail
    },
    {
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