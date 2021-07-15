import axios from 'axios'
import {toast} from '../util'

// 异常处理方法
const handleError = (err) => {
  if (err.code == 400) {
    toast(err.message)
  }
  if (err.code == 401) {
    toast(err.message)
    window.location.href='/login'
  }
}


// 对axios进行二次封装
export default (config) => {
  // 创建axios实例
  const instanse = axios.create({
    baseURL: 'http://localhost:3000'
  })

  // 响应拦截 
  instanse.interceptors.response.use(response => {
    return response.data
  }, err => {
    handleError(err.response.data)
  })

  return instanse(config)
}