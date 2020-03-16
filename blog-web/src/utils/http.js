import axios from 'axios'
import api from './api'
import { Message } from 'element-ui'

// axios默认配置
axios.defaults.timeout = 5000 // 超时时间
axios.defaults.baseURL = api.defaultUrl // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 整理数据
axios.defaults.transformRequest = function(data) {
  //data = Qs.stringify(data);
  data = JSON.stringify(data)
  return data
}

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.errorno == -1) {
      Message.error(res.message || '接口请求异常')
      return Promise.reject(res.message || '接口请求异常')
    } else {
      return Promise.resolve(res.data || res)
    }
  },
  (error) => {
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)
export default axios
