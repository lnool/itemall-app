import $http from './request'
// 查询购物车列表
export const queryCart = (params, token) => $http({
  url: '/cart',
  headers: {
    common: {
      Authorization: token
    }
  },
  params
})