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
    }
}