/**
 * 发送首页请求
 */
import $http from './request'

// 请求首页数据
export const queryHome = () => $http({ url: '/home' })


// 请求商品数据
export const queryGoods = (params) => $http({
  url: '/home/goods', params
})

// 请求商品详情
export const queryDetail = (params) => $http({
  url: '/home/detail', params
})

// 添加购物车
export const saveCart = (data,token)=> $http({
  url:'/cart',
  method:'POST',
  headers:{
    common:{
      Authorization:token
    }
  },
  data
})