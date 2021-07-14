<template>
  <div class="login">
    <van-sticky>
      <nav-bar class="nav-bar" style="transition: '0.5s'">
        <div slot="center">登录</div>
      </nav-bar>
    </van-sticky>

    <img src="@/assets/img/logo.png" alt="">
    <van-form @submit="login" class="form">
      <van-field
        v-model="user.phone"
        name="phone"
        type="tel"
        label="手机号"
        label-align="center"
        :rules="[{ pattern: PHONE.test, message: PHONE.msg }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        label-align="center"
        name="password"
        :rules="[{ pattern: PASSWORD.test, message: PASSWORD.msg }]"
      />
      <div style="margin: 15px 0; padding: 0 20px">
        <van-button round block color="#00BFC0" size="small" native-type="submit"
          >登 录</van-button
        >
        <div class="link">
          没有账号？去
          <router-link to="/register">注册</router-link>
        </div>
         <div class="link">
           忘记密码
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { PHONE, PASSWORD, toast } from "../../util";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  data() {
    return {
      PHONE,
      PASSWORD,
      user: {},
    };
  },
  methods: {
    // 映射vuex 中actions中的方法
    ...mapActions(['_login']),
    async login(){
      await this._login(this.user)
      this.$router.replace('/profile')
    }
  },
  components: { NavBar },
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100vh;
  background: white;
  z-index: 10;
  .nav-bar {
    background: #00bfc0;
    color: white;
  }
  .form {
    padding: 20px 0;
    background: white;
    padding: 50px 0;
    .link {
      text-align: center;
      line-height: 50px;
      font-size: 12px;
      a {
        color: #a1a4aa;
        text-decoration: none;
      }
    }
    .link:last-child{
      line-height: 0;
    }
  }
}
</style>
