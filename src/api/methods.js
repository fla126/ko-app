import numUtils from '@/assets/js/numberUtils'
import {Address} from 'bitcore-lib'
import {keccak256} from 'js-sha3'
import bitcoin from 'bitcoinjs-lib'

export default {
	routeTo(args){ //自定义公共路由函数
    	this.$router.push({ name: args.to, query:args.params})
    },
    trim(str,len){ //去除空格并验证数据是否达到指定字符串长度
	    var string=str.replace(/^\s+|\s+$/g,"");
	    if(string!='')
	    	return (string.length>=len)?true:false;
	    else
	    	return false;
    },
    ismobile(str){ //检测手机号码的合法性
	    if(str.length != 11){
	    	return false;
	    }else{
	        var t=/^(13\d{9})|(14\d{9})|(15\d{9})|(17\d{9})|(18\d{9})|(0\d{10,11})$/;
	        return t.test(str);
        }
    },
    scanner(func){ //扫描二维码公共函数
    	uexScanner.open(func)
    },
    toFixed (value, fixed) {
		if(isNaN(Number(value))){
			return value
		} else {
			return numUtils.BN(value || 0).toFixed(fixed)
		}
	},
	getAddress(currency, publicKeys){ //由公钥生成钱包地址,增加币种应调整此函数
	  var address
	  switch(currency){
	    case 'BTC':
	      if(publicKeys.constructor == String){
	      	var publicKeyBuffer = new Buffer(publicKeys, 'hex')
	      	var publicKey = bitcoin.ECPair.fromPublicKeyBuffer(publicKeyBuffer)
	        address = new bitcoin.ECPair(null, publicKey.Q, { compressed: false }).getAddress()
	      } else {
	        address = publicKeys.map((item)=>{
        		var publicKeyBuffer = new Buffer(item, 'hex')
        		var publicKey = bitcoin.ECPair.fromPublicKeyBuffer(publicKeyBuffer)
        	    return new bitcoin.ECPair(null, publicKey.Q, { compressed: false }).getAddress()
	        }).join(',')
	      }
	      break
	    default:
	      //ERC20代币通用地址生成方法
	      if(publicKeys.constructor == String){
	        address = keccak256(publicKeys)
	        address = "0x"+Buffer.from(address, 'hex').slice(-20).toString('hex')
	      } else {
	        address = publicKeys.map((item)=>{
				var _address = keccak256(item)
				_address = "0x"+Buffer.from(_address, 'hex').slice(-20).toString('hex')
				return _address
	        }).join(',')
	      }
	      break
	  }
	  return address
	},
}