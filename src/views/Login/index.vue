<template>
  <div class="login">
    <van-nav-bar title="登录" class="login-nav"/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        clearable
        required
        name="mobile"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[
          {
            required: true,
            pattern: /^\d{11}$/,
            message: '请输入手机号码',
            trigger: 'onChange',
          },
        ]"
      />

      <van-field
        v-model="code"
        clearable
        required
        name="code"
        label="验证吗"
        placeholder="请填写验证码"
        :rules="[
          { required: true, pattern: /^\d{6}$/, message: '请填写验证码' },
        ]"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isloading"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin } from "../../api/user";

export default {
  name: "Login",
  data() {
    return {
      mobile: "13688888888",
      code: "246810",
      isloading: false,
    };
  },
  methods: {
    //点击登录事件
    async onSubmit(values) {
      //加载动画
      this.isloading = true;
      try {
        const res = await userLogin(values);
        //将token保存到vuex
        this.$store.commit("setUse", res);
        //跳转到hom页面
        this.$router.back();
      } catch (error) {
        this.$toast("出错啦");
      }
      //加载动画
      this.isloading = false;
    },
  },
};
</script>

<style lang="less" scoped>

</style>
