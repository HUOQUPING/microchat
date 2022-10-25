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
  methods: {
    login() {
      getUserConfig(this.username, this.password)
      setTimeout(() => {
        console.log('token', cookie.get('token'))
        this.setToken(cookie.get('token'))
      }, 500)
    },
    register() {
      regUser(this.username, this.password)
    },
    ...mapMutations(["setToken"]),
  }
}
</script>

<style scoped>

</style>