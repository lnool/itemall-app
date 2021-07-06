/**
 * 发送首页请求
 */
import $http from './request'

// 请求首页数据
export const queryHome = () => $http({ url: '/home' })