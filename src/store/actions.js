import { login } from "../api";
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

  }
}