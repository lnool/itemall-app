import $http from './request'

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

// 删除
export const delCart = (data, token) => $http({
  url: '/cart',
  method: 'delete',
  headers: {
    common: {
      Authorization: token
    }
  },
  data
})