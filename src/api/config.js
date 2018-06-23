var env = 'dev'
var config = {
	domain:'imagelee.com', //生产环境主域名
	root:''
}
var config = {
	domain: env === 'dev' ? 'localhost:3001': 'hdj.13322.com',
	root:''
}

config.root = 'http://'.concat(config.domain)


export default {
  root: config.root,
}