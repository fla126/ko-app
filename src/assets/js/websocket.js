import Config from '@/api/config'
(function (KLineWebSocket) {
  if (typeof module === 'object') {
    module.exports = KLineWebSocket
  } else {
    window.KLineWebSocket = KLineWebSocket
  }
})(function (opts) {
  /*订阅指定推送相关设置及参数,subscribe为空数组则订阅全部
    "subscribe":["new_transaction", "depth","..."]
  * @param kline K线图
  * @param account 帐户信息
  * @param market 市场信息
  * @param depth 深度
  * @param last_price 24小时最新价
  * @param user_new_orderbook 用户当前委托
  * @param user_history_orderbook 用户历史委托
  * @param new_transaction 最新成交
  * @param valuation 估值*/
  opts = opts || {}
  let port = '9501'
  let isLeavePage = false

  let webSocket = null
  function sendMessage () {
    if (opts.type === 'global') {
      webSocket && webSocket.send(`{"event":"addChannel","channel":"global","api_token":""}`)
      return
    }
    // webSocket && webSocket.send(`{"event":"addChannel","channel":"kline","api_token":"${apiToken}","period":"${period}","symbol":"${symbol}","isZip":"false","subscribe":${subscribe}}`)
  }
  let curTime = null

  function createWebSocket () {
    let ws = new WebSocket(`${Config.wsroot}/ws${port}`)
    ws.onopen = function () {
      console.log(`open websocket:${port}`)
      this.send(1)
      sendMessage()
    }
    ws.onmessage = function (res) {
      try {
        res = JSON.parse(res.data)
        if (res == 1) {
          // 每隔3秒发送一次心跳
          setTimeout(() => {
            this.send(1)
          }, 3000)
          return
        }
        opts.callback && opts.callback(res)
      } catch (ex) {
        console.warn(ex)
      }
    }
    ws.onclose = function () {
      console.log(`close websocket:${port}`)
      typeof opts.onClose === 'function' && opts.onClose()
      setTimeout(function () {
        if (isLeavePage) {
          return
        }
        webSocket = createWebSocket()
      }, 3000)
    }
    ws.onerror = function () {
      console.log(`error websocket:${port}`)
    }
    return ws
  }
  webSocket = createWebSocket()

  return {
    close () {
      isLeavePage = true
      webSocket && webSocket.close()
    }
  }
})
