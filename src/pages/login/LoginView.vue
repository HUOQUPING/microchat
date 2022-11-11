<template>
  <a-layout>
    <div class="login">
      <div class="main">
<!--        登录-->
        <div class="input-box">
          <div class="logo">
            <h3>畅聊</h3>
          </div>
          <div class="username">
            <a-input placeholder="用户名" v-model="userId" @keydown.enter="login">
              <a-icon slot="prefix" type="user"/>
            </a-input>
          </div>
          <div class="passwd">
            <a-input-password placeholder="密码" v-model="password" @keydown.enter="login">
              <a-icon slot="prefix" type="lock"/>
            </a-input-password>
          </div>
          <div class="login-btn">
            <a-button type="primary" class="login-btn" @click="login">登录</a-button>
          </div>
          <div class="to-register">
            <span @click="$router.push('/register')" style="cursor: pointer">还没账号？点击注册</span>
          </div>
        </div>

<!--        每日一言-->
<!--        <div class="a-word">
          <div class="text">
            <p>{{ hitokoto }}</p>
            <span>&#45;&#45;{{ author }}</span>
          </div>
        </div>-->
        <AWord></AWord>
      </div>
    </div>
  </a-layout>
</template>

<script>
import './LoginView.scss'
import {getUserConfig,getGoodFriends,getGroups,blackFriends} from '@/config/optionsIm.js'
import cookie from 'vue-cookie'
import {mapMutations} from 'vuex'
import AWord from "@/components/AWord/AWord";

export default {
  name: "loginView",
  data() {
    return {
      userId: '',
      password: '',
    }
  },
  components:{
    AWord
  },
  created() {
    // 检测当有token时跳转到index
    if (cookie.get('token')){
      this.$router.push(`/index`)
    }
    if (this.$route.query.state){
      this.$message.error('客官您尚未登录,请进行登录!')
    }
  },
  methods: {
    login() {
      getUserConfig(this.userId, this.password)
      // 这里setTimeout是防止获取token有的时候会获取慢
      setTimeout(() => {
        // 将token存入vuex
        this.setToken(cookie.get('token'))
        if (cookie.get('token')){
          this.$message.success('客官欢迎您回来！')
        }else {
          this.$message.error('客官您的账号密码不对哦,请再输入试试。')
        }

        // 判断是否是从别的地方没权限跳转过来的
        if (this.$route.query.state) {
          this.goBack()
          return
        }
        this.$router.push(`/index`)
        getGoodFriends()
        getGroups()
        blackFriends()
      }, 500)
    },
    // 配合检测是否从别处进入网站
    goBack() {
      setTimeout(() => {
        this.$router.push(this.$route.query.redirect)
      }, 500)
    },
    ...mapMutations(["setToken"]),
  }
}
</script>
