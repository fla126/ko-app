//自定义Vue过滤器集合

import Vue from 'vue'

//小写转大写过滤器
Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

/* 全局过滤器时间 时间截转 2018-12-02 10：10：12 */
Vue.filter('date',function(inputTime){
  var date = new Date(Number(inputTime));
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
});