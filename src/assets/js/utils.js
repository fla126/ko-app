import Vue from 'vue'
/*import store from '@/vuex'*/
import QRCode from '@/assets/js/qrcode'
import Config from '@/assets/js/config'

String.prototype.format = function () {
  var args = arguments
  return this.replace(/{(\d+)}/g, function (m, i) {
    return args[i] || ''
  })
}

String.prototype.toMoney = function () {
  let s = this.split('.')
  let s0 = s[0]
  let end = s0.length % 3
  let arr = []
  if (end != 0) {
    arr.push(s0.substring(0, end))
  }
  let count = Math.floor(s0.length / 3)
  if (count > 0) {
    s0 = s0.substring(end)
    do {
      arr.push(s0.substring(0, 3))
      s0 = s0.substring(3)
    } while (s0.length)
  }
  s[0] = arr.join(',')
  return s.join('.')
}

Date.prototype.format = function (format) {
  format = format || 'yyyy-MM-dd HH:mm:ss'
  let f = function (m) {
    return m < 10 ? `0${m}` : m
  }
  let str = format.replace('yyyy', this.getFullYear())
  str = str.replace('MM', f(this.getMonth() + 1))
  str = str.replace('dd', f(this.getDate()))
  str = str.replace('HH', f(this.getHours()))
  str = str.replace('mm', f(this.getMinutes()))
  str = str.replace('ss', f(this.getSeconds()))
  return str
}

let utils = {
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
}

/*const setDialog = function (component, opts) {
  let i18n = window.$i18n
  const DialogComponent = Vue.extend(component)
  opts = opts || {}
  var dialogComponent = new DialogComponent({
    store,
    i18n,
    el: document.createElement('div'),
    propsData: opts
  })
  opts.component = dialogComponent
  dialogComponent.$dialog = Vue.$koallDialog(opts)
  dialogComponent.$on('okCallback', opts.okCallback || function () {})
  dialogComponent.$on('errCallback', opts.errCallback || function () {})
  dialogComponent.$on('removeDialog', dialogComponent.$dialog.removeDialog)
  return dialogComponent
}
utils.setDialog = setDialog*/

/**
 * var qrcode = new QRCode(document.getElementById("qrcode"), {
 * text: "http://jindo.dev.naver.com/collie",
 * width: 128,
 * height: 128,
 * colorDark : "#000000",
 * colorLight : "#ffffff",
 * correctLevel : QRCode.CorrectLevel.H
 * })
 * qrcode.clear()
 * qrcode.makeCode("http://naver.com")
 */
const qrcode = function (dom, opts) {
  if (!dom) {
    return
  }
  dom.innerHTML = ''
  opts = opts || {}
  opts.width = opts.width || 120
  opts.height = opts.height || 120
  var qrcode = new QRCode(dom, opts)
  return qrcode
}
utils.qrcode = qrcode

const isPlainEmpty = function (obj) {
  let bool = true
  for (var i in obj) {
    bool = false
    break
  }
  return bool
}
utils.isPlainEmpty = isPlainEmpty

/**
 * 图片等比缩放
 */
const imgZoom = function (dom, url, width, height, callback) {
  var image = new Image()
  image.src = url
  var cw = dom.clientWidth || width
  var ch = dom.clientHeight || height
  image.onload = function () {
    var w = this.width
    var h = this.height
    let r = Math.max(w / cw, h / ch)
    this.width = w / r
    this.height = h / r
    dom.appendChild(image)
  }
}
utils.imgZoom = imgZoom

// 转化时间
const formatDate = function (val) {
  let reg = /(\d+)-(\d+)-(\d+)[ |T]?(\d+):(\d+):(\d+)/
  var mts = val.match(reg)
  return new Date(Number(mts[1]), Number(mts[2]) - 1, Number(mts[3]), Number(mts[4]), Number(mts[5]), Number(mts[6]))
}
utils.formatDate = formatDate

// 倒计时
const countDown = function (t, callbackFun) {
  var db = function (m) {
    return m < 10 ? '0' + m : m
  }
  function a() {
    t = Math.max(t - 1, 0)
    t <= 0 && clearInterval(interval)
    let m = db(Math.floor(t / 60))
    let s = db(Math.floor(t % 60))
    if (typeof callbackFun === 'function') {
      callbackFun(`${m}:${s}`)
    }
  }
  a()
  let interval = setInterval(a, 1000)
  return interval
}
utils.countDown = countDown

// 获取支付类型ICON
const getPayType = function (payType) {
  if (payType === 1) {
    return 'icon-bank'
  } else if (payType === 2) {
    return 'icon-alipay'
  } else if (payType === 3) {
    return 'icon-wechat'
  }
}
utils.getPayType = getPayType

// 移除结尾0
const removeEndZero = function (str) {
  if (!str) {
    return str
  }
  str = str.toString().split('.')
  if (str[1]) {
    str[1] = str[1].replace(/[0]+$/, '')
  }
  return str[1] && str[1].length ? str.join('.') : str.join('')
}
utils.removeEndZero = removeEndZero

// 限制上传图片大小，默认2M
const limitUploadImage = function (file, error, size) {
  let limitSize = (size || 2) * 1024 * 1024
  if (file.nodeName !== 'INPUT' && file.name && file.size) {
    if (file.size > limitSize) {
      typeof error === 'function' && error(`error_code.IMAGE_EXCEED_${size || 2}`)
      return false
    } else {
      return true
    }
  }
  let files = file.length ? file : file.files
  for (let i = 0; i < files.length; i++) {
    let f = files.item(i)
    if (f.size > limitSize) {
      typeof error === 'function' && error(`error_code.IMAGE_EXCEED_${size || 2}`)
      return false
    }
  }
  return true
}
utils.limitUploadImage = limitUploadImage

// 获取URL参数
const getUrlParams = function () {
  let search = location.search
  if (!search) {
    return {}
  }
  let ps = search.substring(1)
  if (!ps) {
    return {}
  }
  ps = ps.split('&')
  let params = {}
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i].split('=')
    if (p[0]) {
      params[p[0]] = p[1] || ''
    }
  }
  return params
}
utils.getUrlParams = getUrlParams

// 获取URL参数
const getUrlHashParams = function () {
  let hash = location.hash
  if (!hash) {
    return {}
  }
  if (hash.indexOf('?') === -1) {
    return {}
  }
  let ps = hash.substring(hash.indexOf('?') + 1)
  if (!ps) {
    return {}
  }
  ps = ps.split('&')
  let params = {}
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i].split('=')
    if (p[0]) {
      params[p[0]] = p[1] || ''
    }
  }
  return params
}
utils.getUrlHashParams = getUrlHashParams

// 获取光标位置
const getCursortPosition = function (dom) {
  var cursorPos = 0
  if (document.selection) {
    // IE Support
    dom.focus()
    var selectRange = document.selection.createRange()
    selectRange.moveStart ('character', -dom.value.length)
    cursorPos = selectRange.text.length;
  }else if (dom.selectionStart || dom.selectionStart == '0') {
    // Firefox support
    cursorPos = dom.selectionStart;
  }
  return cursorPos
}
utils.getCursortPosition = getCursortPosition

// 设置光标位置
const setCursortPosition = function (dom, pos){
  if(dom.setSelectionRange) {
    // IE Support
    dom.focus()
    dom.setSelectionRange(pos, pos)
  }else if (dom.createTextRange) {
    // Firefox support
    var range = dom.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}
utils.setCursortPosition = setCursortPosition

const uploadImage = function (e, size) {
  var target = e.target
  if (!target.value) {
    return
  }
  let imgCon = target.parentNode.previousElementSibling
  var imageUrl = null
  if (Config.imageType.test(target.files.item(0).name) === false) {
    Vue.$koallTipBox({icon: 'notification', message: this.$t('public0.public43')}) // 只能上传PNG或JPG图片
    target.value = ''
    return
  }
  let isTrue = utils.limitUploadImage(target, (msg) => {
    Vue.$koallTipBox({icon: 'notification', message: this.$t(msg)})
  }, size)
  if (!isTrue) {
    target.value = ''
    return
  }
  this[target.name.replace('1', '')] = target.value
  this.showObj[target.name.replace('1', '')] = true
  let cloneNode = target.cloneNode(true)
  if (target.nextElementSibling) {
    target.parentNode.removeChild(target.nextElementSibling)
  }
  cloneNode.name = target.name.replace('1', '')
  cloneNode.style.display = 'none'
  target.parentNode.appendChild(cloneNode)
  imgCon.innerHTML = ''
  utils.imgZoom(imgCon, window.URL.createObjectURL(target.files.item(0)))
}
utils.uploadImage = uploadImage

const formatSystemMessage = function (msg, isI18n) {
  if (isI18n === false) {
    return msg
  }
  msg = (msg || '').split(' ')
  let joinSplit = ' '
  if (msg.length === 1) {
    joinSplit = ''
    msg[0] = this.$t('error_code.' + msg[0])
  } else if (msg.length === 2) {
    msg[1] = this.$t('error_code.' + msg[1])
  } else if (msg.length === 3) {
    msg[0] = this.$t('error_code.' + msg[0])
    msg[2] = this.$t('error_code.' + msg[2])
  }
  return msg.join(joinSplit)
}
utils.formatSystemMessage = formatSystemMessage

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

utils.operateDepth = function (datas) {
  let aar = {asks: [], bids: []}
  datas.forEach((item) => {
    if ((item.direction || '').toString() === '1') { // 买
      item.newtotal = 0
      aar.bids.push(item)
    } else if ((item.direction || '').toString() === '2') { // 卖
      item.newtotal = 0
      aar.asks.push(item)
    }
  })
  return aar
}

/* 数字三位用豆号隔开 */
Vue.filter('numbean',function(n){
  var b=parseInt(n).toString();
  var len=b.length;
  if(len<=3){return b;}
  var r=len%3;
  return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
});

export default utils
