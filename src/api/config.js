var env = 'dev'
var config = {
	domain:'dev.tinkey.net', //生产环境主域名
	root:'',
	wsroot:'',
}
var config = {
	domain: env === 'dev' ? 'dev.tinkey.net': '10.0.1.29:8080',
	root:''
}

config.root = 'http://'.concat(config.domain)
config.wsroot = window.location.protocol === 'https:' ? 'wss://': 'ws://'.concat(config.domain)


export default {
  root: config.root,
  wsroot: config.wsroot
}