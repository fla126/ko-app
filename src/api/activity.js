import ajax from '@/api/index'
let domain = ``
let api = {}

/**
 * 我的Tinkey
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const getMyTinkeyList = function (page, show, data, success, error) {
  ajax.get(`tinkey/api/my/tinkeyList/${page}/${show}`, data, success, error)
}
api.getMyTinkeyList = getMyTinkeyList

/**
 * 我的购买记录
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const getMyOrderList = function (page, show, data, success, error) {
  ajax.get(`tinkey/api/my/orderList/${page}/${show}`, data, success, error)
}
api.getMyOrderList = getMyOrderList

/**
 * 获取产品列表
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const getProductList = function (data, success, error) {
  ajax.get(`tinkey/api/sell/product`, data, success, error)
}
api.getProductList = getProductList

/**
 * 获取国家列表
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const getCountriesList = function (data, success, error) {
  ajax.get(`tinkey/api/country`, data, success, error)
}
api.getCountriesList = getCountriesList

/**
 * 我的购物车
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const getCartsList = function (data, success, error) {
  ajax.get(`tinkey/api/cart`, data, success, error)
}
api.getCartsList = getCartsList

/**
 * 创建购物车
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const createCart = function (data, success, error) {
  ajax.post(`tinkey/api/cart`, data, success, error)
}
api.createCart = createCart

/**
 * 更新购物车
 * @param {*} data 参数
 * @param {*} success 成功回调函数
 * @param {*} error 失败回调函数
 */
const updateCart = function (data, success, error) {
  ajax.put(`tinkey/api/cart`, data, success, error)
}
api.updateCart = updateCart

// 邀请活动
const getInvitationActivity = function (success, error) {
  ajax.post(`${domain}tinkey/api/userManage/invitationActivity/findUserInvitationActivityIfBuy`, success, error)
}
api.getInvitationActivity = getInvitationActivity

// 创建订单
const createOrder = function (data, success, error) {
  ajax.post(`${domain}tinkey/api/order/createOrder`, data, success, error)
}
api.createOrder = createOrder

// 查询油费
const conpostage = function (data, success, error) {
  ajax.get(`tinkey/api/sell/postage`, data, success, error)
}
api.conpostage = conpostage

// 获取ETH支付方式
const conETHPaytype = function (success, error) {
  ajax.get(`${domain}tinkey/api/appPayType/eth`, success, error)
}
api.conETHPaytype = conETHPaytype

// 获取superNode支付方式
const conSuperNode = function (success, error) {
  ajax.get(`${domain}tinkey/api/appPayType/superNode`, success, error)
}
api.conSuperNode = conSuperNode

// 获取订单详情
const getOrderDetail = function (data, success, error) {
  ajax.get(`tinkey/api/order`, data, success, error)
}
api.getOrderDetail = getOrderDetail

// 我已付款
const paid = function (data, success, error) {
  ajax.post(`${domain}tinkey/api/sell/AppPaid`, data, success, error)
}
api.paid = paid

// 查询ETH对RMB的换算价格
const price = function (data, success, error) {
  ajax.get(`${domain}tinkey/api/price`, data, success, error)
}
api.price = price

export default api