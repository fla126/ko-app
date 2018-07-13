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
	marketList :`${config.root}/api/v2/trade/market`, //交易市场接口地址
	walletList :`${config.root}/api/wallet`, //获取用户钱包列表
	UTXO :`${config.root}/api/UTXO`, //获取UTXO列表
	feeRange(currency){ return `${config.root}/api/feerange/${currency}`}, //获取对应币种的推荐矿工费
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
	getWalletList(){
		return $ajax.get(url.walletList)
	},
	getUTXO(){
		return $ajax.get(url.UTXO)
	},
	getFeeRange(currency){
		return $ajax.get(url.feeRange(currency))
	},
}