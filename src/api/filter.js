//自定义Vue过滤器集合

import Vue from 'vue'

//小写转大写过滤器
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})