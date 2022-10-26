<template>
  <div class="main">
    username:<input type="text" name="username" v-model="username">
    password: <input type="password" name="password" v-model="password">
    <!--
    TODO
    尚未开通短信验证码功能
    -->
    <button @click="login">SUB1</button>
    <button @click="register">SUB2</button>
  </div>
</template>

<script>
import {getUserConfig, regUser} from '@/config/optionsIm.js'
import cookie from 'vue-cookie'
import {mapMutations} from 'vuex'

export default {
  name: "loginView",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  created() {
    if (cookie.get('token')){
      this.$router.push('/index')
    }
  },
  methods: {
    login() {
      getUserConfig(this.username, this.password)
      // 这里setTimeout是防止获取token有的时候会获取慢
      setTimeout(() => {
        // 将token存入vuex
        this.setToken(cookie.get('token'))
        // 判断是否是从别的地方没权限跳转过来的
        if (this.$route.query.state) {
          this.goBack()
          return
        }
        this.$router.push('/index')
      }, 100)
    },
    register() {
      regUser(this.username, this.password)
    },
    goBack() {
      setTimeout(() => {
        this.$router.push(this.$route.query.redirect)
      }, 500)
    },
    ...mapMutations(["setToken"]),
  }
}
</script>

<style scoped>

</style>