<template>
  <div class="register">
    <van-sticky>
      <nav-bar class="nav-bar" style="transition: '0.5s'">
        <div slot="center">注册</div>
      </nav-bar>
    </van-sticky>

    <van-form @submit="onSubmit" class="form">
      <van-field name="avatar" label="头像" label-align="center">
        <template #input>
          <van-uploader v-model="user.avatar" max-count="1" />
        </template>
      </van-field>
      <van-field
        v-model="user.nickName"
        name="nickName"
        label="昵称"
        label-align="center"
        :rules="[{ pattern: NICKNAME.test, message: NICKNAME.msg }]"
      />
      <van-field
        v-model="user.phone"
        name="phone"
        type="tel"
        label="手机号"
        label-align="center"
        :rules="[{ pattern: PHONE.test, message: PHONE.msg }]"
      />
      <van-field
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :rules="[{ pattern: CODE.test, message: CODE.msg }]"
      >
        <template #button>
          <van-button size="mini" color="#00BFC0" type="primary" native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        label-align="center"
        name="password"
        :rules="[{ pattern: PASSWORD.test, message: PASSWORD.msg }]"
      />
      <van-field
        v-model="user.email"
        name="email"
        label="邮箱"
        label-align="center"
        :rules="[{ pattern: EMAIL.test, message: EMAIL.msg }]"
      />
      <van-field name="gander" label="性别" label-align="center">
        <template #input>
          <van-radio-group v-model="user.gander" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 15px 0; padding: 0 20px">
        <van-button round block color="#00BFC0" size="small" native-type="submit"
          >注册</van-button
        >
        <div class="link">
          已有账号？去
          <router-link to="/login">登录</router-link>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { PHONE, PASSWORD, NICKNAME, EMAIL, CODE, toast } from "../../util";
import { register } from "../../api";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      user: {
        gander: "1",
      },
      code: null,
      PHONE,
      PASSWORD,
      NICKNAME,
      EMAIL,
      CODE,
    };
  },
  methods: {
    async onSubmit(user) {
      if (user.avatar.length == 0) {
        toast("头像不能为空");
        return;
      }
      // 创建表单数据对象
      const formData = new FormData();
      formData.set("phone", user.phone);
      formData.set("avatar", user.avatar[0].file);
      formData.set("email", user.email);
      formData.set("nickName", user.nickName);
      formData.set("gander", user.gander);
      formData.set("password", user.password);
      const data = await register(formData);
      if (data) {
        // 跳转登录页面
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register {
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
    .link {
      text-align: center;
      line-height: 50px;

      font-size: 12px;
      a {
        color: #a1a4aa;
        text-decoration: none;
      }
    }
  }
}
</style>
