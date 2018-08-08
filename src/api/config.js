var env = 'dev'

var config = {
	domain: env === 'dev' ? 'dev.tinkey.net': 'www.tinkey.io', //数据中心接口地址
}

config.root = 'http://'.concat(config.domain)
config.wsroot = window.location.protocol === 'https:' ? 'wss://': 'ws://'.concat(config.domain)


export default {
  env:env,
  root: config.root,
  wsroot: config.wsroot,
}