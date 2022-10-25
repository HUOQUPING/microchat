<template>
  <div class="main">
    username:<input type="text" name="username" v-model="username">
    password: <input type="password" name="password" v-model="password">
    <button @click="clickFunc">SUB</button>
  </div>
</template>

<script>
import {getUserConfig} from '@/config/optionsIm.js'

export default {
  name: "loginView",
  data() {
    return {
      username: '',
      password: '',
      ck: ''
    }
  },
  methods: {
    clickFunc() {
      getUserConfig(this.username, this.password)
    }
  }
}
</script>

<style scoped>

</style>