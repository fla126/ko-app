import axios from 'axios'
import config from './config'

//请求加入随机参数
var $ajax = axios.create({
	params: {
		_r: new Date().getTime()
	}
})

var url = {
	login: config.root + "/api/user/login", //手机号用户登录
	currency:`${config.root}/api/currency`, //获取币种列表
}

export default {
	login(account, password, code) {
		return $ajax.post(url.login, {
			mobile: account,
			password: password,
			code: code
		})
	},
	getCurrency(){
		return $ajax.get(url.currency)
	}
}