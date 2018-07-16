import axios from 'axios'

let api = {}

api.Allurl='http://10.0.1.45:8080'
// 添加请求拦截器
/*axios.interceptors.request.use(function (config) {
  config.headers.common['header'] = 'Access-Control-Allow-Origin:*'
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})*/

const get = function (url, data, success, error) {
  if (typeof data === 'function') {
    error = success
    success = data
    data = {}
  }
  axios.get(url, {
    params: data
  }).then((res) => {
    if (!res) { return }
    success && success(res.data)
  }).catch((res) => {
    console.warn(res)
    error && error(res.response && res.response.data && res.response.data.length < 500 ? res.response.data : 'Server_Error', res)
  })
}
api.get = get

const post = function (url, data, success, error) {
  if (typeof data === 'function') {
    error = success
    success = data
    data = {}
  }
  axios.post(url, data).then((res) => {
    if (!res) { return }
    success && success(res.data)
  }).catch((res) => {
    console.warn(res)
    error && error(res.response && res.response.data && res.response.data.length < 500 ? res.response.data : 'Server_Error', res)
  })
}
api.post = post

const del = function (url, data, success, error) {
  if (typeof data === 'function') {
    error = success
    success = data
    data = {}
  }
  axios.delete(url, {
    data: data
  }).then((res) => {
    if (!res) { return }
    success && success(res.data)
  }).catch((res) => {
    console.warn(res)
    error && error(res.response && res.response.data && res.response.data.length < 500 ? res.response.data : 'Server_Error', res)
  })
}
api.delete = del

const put = function (url, data, success, error) {
  if (typeof data === 'function') {
    error = success
    success = data
    data = {}
  }
  axios.put(url, data).then((res) => {
    if (!res) { return }
    success && success(res.data)
  }).catch((res) => {
    console.warn(res)
    error && error(res.response && res.response.data && res.response.data.length < 500 ? res.response.data : 'Server_Error', res)
  })
}
api.put = put

const postForm = function (url, data, success, error) {
  if (typeof data === 'function') {
    error = success
    success = data
    data = {}
  }
  axios.post(url, data).then((res) => {
    if (!res) { return }
    success && success(res.data)
  }).catch((res) => {
    console.warn(res)
    error && error(res.response && res.response.data && res.response.data.length < 500 ? res.response.data : 'Server_Error', res)
  })
}
api.postForm = postForm

export default api
