import { delCart, login } from "../api";
import { queryToken } from "../util";

export default {
  async _login({ commit }, payload) {
    const obj = queryToken()
    if (obj.token) {
      commit('login', obj)
    } else {
      const data = await login(payload)
      if (data) commit('login', data.data)
    }
  },
  async clearCartIds({ state, commit }) {
    let { user, cartIds, token } = state
    user = user || queryToken().user
    const t = token || queryToken().token
    await delCart({ id: cartIds, uid:user.id }, t)
    commit('clearCartIds')
  }
}