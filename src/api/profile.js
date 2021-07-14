import $http from './request'

// 注册
export const register = data => $http({ url: '/user/save', method: 'POST', data })

// 登录
export const login = data =>$http({ url: '/user/login', method: 'POST', data })