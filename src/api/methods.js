import numUtils from '@/assets/js/numberUtils'
import bitcore,{Address} from 'bitcore-lib'
import util from 'ethereumjs-util'

export default {
	test(){
		
	},
	routeTo(args){ //自定义公共路由函数
		if(args.replace){
			this.$router.replace({ name: args.to, query:args.params})
		} else {
			this.$router.push({ name: args.to, query:args.params})
		}
    	
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
    scanner(success){ //扫描二维码公共函数
    	var config = {
		  preferFrontCamera : false, // iOS and Android 前置摄像头
		  showFlipCameraButton : false, // iOS and Android 翻转摄像头按钮
		  showTorchButton : false, // iOS and Android  灯光按钮
		  torchOn: false, // Android, launch with the torch switched on (if available) 开启灯光
		  saveHistory: false, // Android, save scan history (default false)
		  prompt : this.$t('message.walletDetail.placeQrcode'), // Android
		  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
		  orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device 横竖屏
		  disableAnimations : true, // iOS
		  disableSuccessBeep: false // iOS and Android
		}
		if (config.formats) {
		    config.formats = config.formats.replace(/\s+/g, '');
		}
		config = [ config ]
		console.log(config)

    	cordova.exec((res)=>{
    	  console.log(res)
          !res.cancelled && success && success(res)
    	}, (error)=>{
    	  console.log(error)
    	}, 'BarcodeScanner', 'scan', config)
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
	      	address = new bitcore.PublicKey(publicKeys).toAddress().toString()
	      } else {
	        address = publicKeys.map((item)=>{
		      	return new bitcore.PublicKey(item).toAddress().toString()
	        }).join(',')
	      }
	      break
	    default:
	      //ERC20代币通用地址生成方法
	      if(publicKeys.constructor == String){
	      	address = '0x' + util.bufferToHex(util.sha3('0x' + publicKeys)).slice(26);
	      } else {
	        address = publicKeys.map((item)=>{
				return '0x' + util.bufferToHex(util.sha3('0x' + item)).slice(26)
	        }).join(',')
	      }
	      break
	  }
	  return address
	},
	fitLen(num, length){ //固定显示长度不足补0
		num = '000000000'+num
		return num.slice(num.length-length)
	},
	countDown(t, callbackFun) {
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
	},
	humanTime(msec) { //时间格式人性化
      var days = parseInt(msec / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt(msec / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      var minutes = parseInt(msec / 1000 / 60 % 60, 10); //计算剩余的分钟
      var second = parseInt(msec / 1000 % 60, 10); //计算剩余的分钟
      var days_f = this.$root.fitLen(days, 1);
      var hours_f = this.$root.fitLen(hours, 2);
      var minutes_f = this.$root.fitLen(minutes, 2);
      var second_f = this.$root.fitLen(second, 2);
      var result = `${second_f}秒`;
      result = minutes>0 ? `${minutes_f}分`+result:result;
      result = hours  >0 ? `${hours_f}小时`+result:result;
      result = days   >0 ? `${days_f}天`+result:result;
      return result
    },
}