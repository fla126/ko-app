var env = 'dev'
var config = {
	domain:'imagelee.com', //生产环境主域名
	root:'',
	wsroot:'',
}
var config = {
	domain: env === 'dev' ? '10.0.2.180': 'dev.koall.io',
	root:''
}

config.root = window.location.protocol+'//'.concat(config.domain)
config.wsroot = window.location.protocol === 'https:' ? 'wss://': 'ws://'.concat(config.domain)


export default {
  root: config.root,
  wsroot: config.wsroot
}