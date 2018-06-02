var config = {
	domain:'imagelee.com', //生产环境主域名
	root:''
}

var pattern = new RegExp(config.domain)
if(!pattern.test(location.href)){
    //开发环境
    config.domain='localhost:3000'
}

config.root = 'http://'.concat(config.domain)

export default {
  root: config.root,
}
