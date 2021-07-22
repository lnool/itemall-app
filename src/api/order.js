import $http from './request'

// 添加订单
export const saveOrder = (data, token) => $http({
  url: '/order',
  method: 'POST',
  headers: {
    common: {
      Authorization: token
    }
  },
  data
})

// 查询order数据
export const queryOrder = (params, token) => $http({
  url: '/order',
  method: 'get',
  headers: {
    common: {
      Authorization: token
    }
  },
  params
})

export const queryOne = (params, token) => $http({
  url: '/order/queryOne',
  method: 'get',
  headers: {
    common: {
      Authorization: token
    }
  },
  params
})

export const pay =  (data, token) => $http({
  url: '/order/pay',
  method: 'POST',
  headers: {
    common: {
      Authorization: token
    }
  },
  data
})

// 删除订单
export const delOrder =  (data, token) => $http({
  url: '/order/del',
  method: 'POST',
  headers: {
    common: {
      Authorization: token
    }
  },
  data
})


// 取消订单
export const cancel =  (data, token) => $http({
  url: '/order/cancel',
  method: 'POST',
  headers: {
    common: {
      Authorization: token
    }
  },
  data
})