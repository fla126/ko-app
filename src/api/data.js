import axios from 'axios'
import config from './config'

//请求加入随机参数
var $ajax = axios.create({
	headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
	params: {
		_r: new Date().getTime()
	}
})

var $ajaxForm = axios.create({
	headers:{
        'Content-Type': 'multipart/form-data'
    },
	params: {
		_r: new Date().getTime()
	}
})
var url = {
	login: `${config.root}/tinkey/api/login/jwt`, //用户登录地址
	userInfo: `${config.root}/tinkey/api/getUserInfo`, //用户信息获取地址
	captchaServlet: `${config.root}/tinkey/api/tinkeyUser/startCaptchaServlet`, //获取验证码地址

	currency:`${config.root}/tinkey/cloud/tinkeySymbol/findAllEnable`, //获取币种列表地址
	symbolExchange :`${config.root}/tinkey/cloud/tinkeySymbolExchange/findSymbolExchange`, //交易市场接口地址
	feeRange(currency){return `${config.root}/api/feerange/${currency}`}, //获取对应币种的推荐矿工费地址
	balance:`${config.root}/tinkey/cloud/tinkeyTrans/getBalance`, //获取币种钱包地址余额地址
	transList(page){return `${config.root}/tinkey/cloud/tinkeyTrans/findTransList/10/${page}`}, //获取钱包地址交易记录
	message:`${config.root}/tinkey/cloud/tinkeyMessage/`, //获取消息中心记录
	nonce(address){return `${config.root}/tinkey/cloud/tinkeyTrans/getNonce/${address}`}, //获取币种Nonce值地址
	utxo(address){return `${config.root}/tinkey/cloud/tinkeyTrans/getUtxo/${address}`}, //获取BTC币种utxo值地址
	createTrans:`${config.root}/tinkey/cloud/tinkeyTrans/createTrans`, //创建新的交易地址
	BTCTestAddress:`${config.root}/tinkey/cloud/tinkeyTrans/getAddress`, //获取BTC测试钱包地址
}

export default {
	login(data) {
		return $ajaxForm.post(url.login, data)
	},
	getCaptchaServlet(){
		return $ajax.get(url.captchaServlet)
	},
	getUserInfo(data) {
		return $ajax.get(url.userInfo)
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
	getBalance(token, address, wallet, callback, contractAddr,factoryCode){
		var getData = $ajax.post(url.balance,{
			address:address,
			contractAddr:contractAddr,
			factoryCode:factoryCode,
			symbol:token
		})
		return callback(token,wallet,getData)
	},
	getTransList(address,page){
		return $ajax.post(url.transList(page),{operateAddressList:address })
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
	getUtxo(address){
		return $ajax.get(url.utxo(address))
	},
	createTrans(params){
		return $ajax.post(url.createTrans,params)
	},
	getBTCTestAddress(publickey){
		return $ajax.post(url.BTCTestAddress,{
			biz:0,
			pubkey:publickey,
			net:0
		})
	},
}