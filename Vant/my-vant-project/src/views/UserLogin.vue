<template>
  <div class="Login-Page">
    <van-nav-bar title="用户登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <router-link class="link" to="/register">注册账号</router-link>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/storage'
export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      const { data } = await login(values)
      this.$toast.success('登录成功')
      setToken(data.token)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
