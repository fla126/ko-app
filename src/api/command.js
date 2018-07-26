import api from '@/api/index'
import wallet from "./wallet";
import mycenter from "./mycenter";
let command = {}
let domain = 'http://localhost:8080/'


// 1 、通过id查询
const commandInfo =function ( id,success, error) {
  api.get(`${api.Allurl}/com/${id}`, (res) => {
    if(res.code===100){
      success && success(res.extend.command)
    }else{
      error && error(res.msg)
    }
  }, error)
}
command.commandInfo = commandInfo

// 2、获取口令列表
const getlist = function ( success, error) {
  api.get(`${api.Allurl}/com/getAll`, (res) => {
    success && success(res.extend.list)
  }, error)
}
command.getlist = getlist

//3、保存口令
const save=function (data, success, error) {
  api.post(`${api.Allurl}/com/save`,data, (res) => {
    if(res.code===100){
      success && success(res.msg)
    }else{
      error && error(res.msg)
    }
  }, error)
}
command.save = save

// 4 、通过id删除
const del =function ( id,success, error) {
  api.get(`${api.Allurl}/com/del?id=${id}`, (res) => {
    if(res.code===100){
      success && success(res.extend.command)
    }else{
      error && error(res.msg)
    }
  }, error)
}
command.del = del

//5、更新口令
const update=function (data, success, error) {
  api.post(`${api.Allurl}/com/update`,data, (res) => {
    if(res.code===100){
      success && success(res.msg)
    }else{
      error && error(res.msg)
    }
  }, error)
}
command.update = update
export default command
