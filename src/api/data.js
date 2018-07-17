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
	currency:`${config.root}/api/currency`, //获取币种列表地址
	marketList :`${config.root}/api/v2/trade/market`, //交易市场接口地址
	UTXO :`${config.root}/api/UTXO`, //获取UTXO列表地址
	feeRange(currency){return `${config.root}/api/feerange/${currency}`}, //获取对应币种的推荐矿工费地址
	ETHBalance(address){return `${config.root}:3005/getBalance/${address}`}, //获取ERC20币种钱包地址对应的数量地址
	BTCBalance(address){return `${config.root}:3006/getBalance/${address}`}, //获取BTC币种钱包地址对应的数量地址
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
	getMarketList(){
		return $ajax.get(url.marketList)
	},
	getUTXO(){
		return $ajax.get(url.UTXO)
	},
	getFeeRange(currency){
		return $ajax.get(url.feeRange(currency))
	},
	getBalance(token, address, wallet, callback){
		var getData = null
		switch(token){
			case 'BTC':
				getData = $ajax.get(url.BTCBalance(address))
				break
			default:
				getData = $ajax.get(url.ETHBalance(address))
		}
		return callback(token,wallet,getData)
	},
}