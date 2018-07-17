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
    getPhonePlatform(){ //获取前端系统环境
    	var u = navigator.userAgent;
    	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    	var type=""
    	if(isAndroid){
    	  type="android"
    	}
    	if(isiOS){
    	  type="ios"
    	}
    	if(type==""){
    	  type="h5"
    	}
    	return type;
    },
    scanner(success, error){ //扫描二维码公共函数
    	var plat = this.getPhonePlatform()
    	if (plat === 'android') {
	        cordova.plugins.barcodeScanner.scan(
	            function (result) {
	            	console.log(result)
	                success && success(result.text);
	            },
	            function (ex) {
	                error && error(ex);
	            }
	        );
	    } else if (plat === 'ios') {
	        cordova.exec(function (result) {
	            success && success(result);
	        }, function (ex) {
	            error && error("调用OC插件失败: " + msg);
	        }, "CDVScan", "recognize", ["将二维码放入框内, 即可自动扫描"]);
	    }

    },
    toFixed (value, fixed) { //截取位数
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
	      	var publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer)
	      	address = bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)
	      } else {
	        address = publicKeys.map((item)=>{
        		var publicKeyBuffer = new Buffer(item, 'hex')
		      	var publicKeyHash = bitcoin.crypto.hash160(publicKeyBuffer)
		      	return bitcoin.address.toBase58Check(publicKeyHash, bitcoin.networks.bitcoin.pubKeyHash)
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
	fitLen(num, length){ //固定显示长度不足补0
		num = '000000000'+num
		return num.slice(num.length-length)
	}
}