const config = {
  domain: process.env.NODE_ENV === 'development' ? 'dev.koall.io' : location.host.split(':')[0],
  otcdomain: process.env.NODE_ENV === 'development' ? 'http://10.0.2.180:83/' : `http://${location.host.split(':')[0]}:83/`,
  imageType: /\.(jpg|png|jpeg|bmp)/i,
  protocol: window.location.protocol === 'https:' ? 'wss://': 'ws://'
}

export default config
