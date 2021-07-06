import axios from 'axios'

// 对axios进行二次封装
export default (config)=>{
  // 创建axios实例
  const instanse = axios.create({
    baseURL:'http://localhost:3000'
  })

  // 响应拦截 
  instanse.interceptors.response.use(response=>{
    return response.data
  })

  return instanse(config)
}