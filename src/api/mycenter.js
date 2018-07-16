import api from '@/api/index'
import command from "./command";
let mycenter = {}
let domain = 'http://localhost:8080/'
// 1、系统消息（1、收款2、转账3系统记录、4交易记录(收款和转账) ）
const getMsgs = function (data, success, error) {
  api.get(`${api.Allurl}/rec/getAll`, data,(res) => {
    if(res.code===100){
       success && success(res.extend.list)
    }else{
       error && error(res.msg)
    }
  }, error)
}
mycenter.getMsgs = getMsgs

//2、保存消息记录
const saveMsg=function (data, success, error) {
  api.post(`${api.Allurl}/rec/save`,data, (res) => {
    if(res.code===100){
       success && success(res.msg)
    }else{
       error && error(res.msg)
    }
  }, error)
}
mycenter.saveMsg = saveMsg

//3、保存消息记录
const getmsginfo=function (id, success, error) {
  api.get(`${api.Allurl}/rec/record/${id}`,(res) => {
    if(res.code===100){
      success && success(res.extend.recordsinfo)
    }else{
      error && error(res.msg)
    }
  }, error)
}
mycenter.getmsginfo = getmsginfo

//3、钱包
const getwallsList=function ( success, error) {
  api.get(`${api.Allurl}/wallet/getAll`,(res) => {
    if(res.code===100){
      success && success(res.extend.list)
    }else{
      error && error(res.msg)
    }
  }, error)
}
mycenter.getwallsList = getwallsList

//4、钱包更新
const wupdate=function (data, success, error) {
  api.post(`${api.Allurl}/wallet/update`,data, (res) => {
    if(res.code===100){
      success && success(res.msg)
    }else{
      error && error(res.msg)
    }
  }, error)
}
mycenter.wupdate = wupdate

//5、保存钱
const wsave=function (data, success, error) {
  api.post(`${api.Allurl}/wallet/save`,data,(res) => {
    if(res.code===100){
      success && success(res.msg)
    }else{
      error && error(res.msg)
    }
  }, error)
}
mycenter.wsave = wsave


export default mycenter
