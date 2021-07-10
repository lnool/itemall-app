import $http from './request'
export const queryCategory = () => $http({ url: '/category' })

export const queryCategorysub = params => $http({ url: '/category/sub', params })