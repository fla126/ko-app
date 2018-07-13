import api from '@/api/index'
let domain = 'http://localhost:8080/'
let wallet = {}

// 钱包金额信息
const walletInfo =function ( success, error) {
  api.get(`http://localhost:3003/walletInfo`, (res) => {
    success && success(res)
  }, error)
}
wallet.walletInfo = walletInfo

// 获取对应币种钱包
const getWalletByCoin = function ( success, error) {
  api.get(`${api.Allurl}/rec/getAll`, (res) => {
    success && success(res)
  }, error)
}
wallet.getWalletByCoin = getWalletByCoin
export default wallet
