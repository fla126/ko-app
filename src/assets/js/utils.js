import api from '@/api/data'
import QRCode from '@/assets/js/qrcode'

let utils = {}

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

/**
 * 极速验证
 * @param {*} okCallback 
 */
let isGtDialogOpen = false
const gtValidate = function (okCallback) {
  if (isGtDialogOpen) {
    return
  }
  isGtDialogOpen = true
  const handler = function (captcha) {
    captcha.onReady(() => {
      captcha.verify()
    })
    captcha.onSuccess(() => {
      isGtDialogOpen = false
      let gtParams = captcha.getValidate()
      if (typeof okCallback === 'function') {
        okCallback({
          geetest_challenge: gtParams.geetest_challenge,
          geetest_validate: gtParams.geetest_validate,
          geetest_seccode: gtParams.geetest_seccode
        })
      }
    })
    captcha.onClose(() => {
      isGtDialogOpen = false
    })
    captcha.onError(() => {
      isGtDialogOpen = false
    })
  }
  // 调用 initGeetest 初始化参数
  // 参数1：配置参数
  // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
  let lang = window.localStorage.getItem('lang')
  if (lang === 'zhCHS') {
    lang = 'zh-cn'
  } else {
    lang = 'en'
  }
  api.getCaptchaServlet().then((res) => {
    res = JSON.parse(res.data.data)
    window.initGeetest({
      protocol:'http://',
      gt: res.gt,
      challenge: res.challenge,
      offline: !res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
      new_captcha: false,
      product: 'bind', // 产品形式，包括：float，popup
      width: '260px',
      height: '44px',
      lang: lang
    }, handler)
  })
}
utils.gtValidate = gtValidate

/**
 * 加密密码
 * @param {*} pwd 密码
 * @param {*} okCallback 成功回调函数
 */
const publickey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCI0+KZEQJ4eiT42gOZfVaIMMwD0neLsh1/BQlwVMJgXJUom6U/DkGPxY+1QOt8dnvjWZg+gNebblxe9N0oJp4grJSKdqNoj4P6Vmo3GnmFa6oDOpxOjBMSBBWMMU21ppssirPUDCESic8ND2FvsHTcTUWMzLzINh52CFTZCQuI/QIDAQAB'
const encryptPwd = function (pwd) {
  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(publickey)
  pwd = encrypt.encrypt(pwd)
  return pwd
}
utils.encryptPwd = encryptPwd

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
export default utils