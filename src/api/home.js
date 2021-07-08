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