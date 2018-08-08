import ajax from '@/api/index'
let domain = ``
let api = {}

// 注册用户
const registerUser = function (data, success, error) {
  ajax.post(`tinkey/api/tinkeyUser/addUser`, data, success, error)
}
api.registerUser = registerUser
  
// 发送验证码
const sendSmsUser = function (data, success, error) {
  ajax.post(`tinkey/api/tinkeyUser/sendSms`, data, success, error)
}
api.sendSmsUser = sendSmsUser

export default api