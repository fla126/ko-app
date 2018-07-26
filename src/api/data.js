import axios from 'axios'
import config from './config'

//请求加入随机参数
var $ajax = axios.create({
	params: {
		_r: new Date().getTime()
	}
})
var url = {
	login: config.root + "/api/user/login", //手机号用户登录地址
	currency:`${config.root}/tinkey/cloud/tinkeySymbol/findAllEnable`, //获取币种列表地址
	symbolExchange :`${config.root}/tinkey/cloud/tinkeySymbolExchange/findSymbolExchange`, //交易市场接口地址
	feeRange(currency){return `${config.root}/api/feerange/${currency}`}, //获取对应币种的推荐矿工费地址
	balance(address){return `${config.root}/tinkey/cloud/tinkeyTrans/getBalance/${address}`}, //获取币种钱包地址余额地址
	transList(page){return `${config.root}/tinkey/cloud/tinkeyTrans/findTransList/10/${page}`}, //获取钱包地址交易记录
	message:`${config.root}/tinkey/cloud/tinkeyMessage/`, //获取消息中心记录
	nonce(address){return `${config.root}/tinkey/cloud/tinkeyTrans/getNonce/${address}`}, //获取币种Nonce值地址
	createTrans:`${config.root}/tinkey/cloud/tinkeyTrans/createTrans`, //创建新的交易地址
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
	},
	getSymbolExchange(){
		return $ajax.get(url.symbolExchange)
	},
	getFeeRange(currency){
		return $ajax.get(url.feeRange(currency))
	},
	getBalance(token, address, wallet, callback){
		var getData = $ajax.get(url.balance(address))
		return callback(token,wallet,getData)
	},
	getTransList(address,page){
		return $ajax.post(url.transList(page),{fromAddress:address })
	},
	getMessage(addrs, sign){
		return $ajax.post(url.message,{
			addrs:addrs,
			sign:sign
		})
	},
	getNonce(address){
		return $ajax.get(url.nonce(address))
	},
	createTrans(params){
		return $ajax({
		  method: 'post',
		  url: url.createTrans,
		  contentType: "application/json;charset=utf-8",
		  data:params
		})
	},
}