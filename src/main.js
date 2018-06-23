// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' // 处理http请求
import store from './store' // 状态管理
import vueTap from 'v-tap'
import VueI18n from 'vue-i18n' //多语言处理模块
import commonMethods from './api/methods'
import VConsole   from 'vconsole'

require('./api/directive') //引入全局自定义指令集
require('./api/filter') //引入全局自定义过滤器

import LangEn from './lang/en' //英文包
import LangZhCHS from './lang/zhCHS' //简体中文包
import LangZhCHT from './lang/zhCHT' //繁体中文包

import compTopBack from '@/components/common/top_back'

Vue.use(vueTap)
Vue.use(VueI18n)

Vue.component(compTopBack.name, compTopBack);

var vConsole = new VConsole()

//请求加入随机参数
var $ajax = axios.create({
  params: {
    _r: new Date().getTime()
  }
})

Vue.prototype.$ajax = $ajax
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'zhCHS',
  messages: {
    'en': LangEn,
    'zhCHS': LangZhCHS,
    'zhCHT': LangZhCHT
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  },
  methods:commonMethods,
})