import { saveToken } from "../util"

export default {
  login(state, payload) {
    state.user = payload.user
    state.token = payload.token
    // 将token和用户信息进行缓存
    saveToken(payload.token, payload.user)
  },
  // 保存被提交的购物车id
  saveCartId(state, payload) {
    state.cartIds = payload
  },
  // 清空被提交的购物车id
  clearCartIds(state) {
    state.cartIds = []
  }
}