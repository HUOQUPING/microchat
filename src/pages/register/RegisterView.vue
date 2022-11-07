<script src="../../config/optionsIm.js"></script>
<template>
  <a-layout>
    <div class="register">
      <div class="main">
        <div class="input-box">
          <div class="theme">
            <h3>畅聊</h3>
          </div>
          <!-- 注册 -->
          <div class="userId">
            <a-input placeholder="用户名" v-model="userId">
              <a-icon slot="prefix" type="user"/>
            </a-input>
          </div>
          <!-- 密码 -->
          <div class="passwd">
            <a-input-password
                placeholder="密码"
                v-model="password"
            >
              <a-icon slot="prefix" type="lock"/>
            </a-input-password>
          </div>
          <!-- 确认密码 -->
          <div class="phoneNum">
            <a-input
                placeholder="手机号码"
                v-model="phoneNum"
            >
              <a-icon slot="prefix" type="phone"/>
            </a-input>
          </div>

          <!-- 手机验证码 -->
          <div class="verification-code">
            <a-input
                class="verificationCode"
                type="text"
                placeholder="手机验证码"
                :style="{width:'55%'}"
                v-model="phoneSMSCode"
            >
              <a-icon slot="prefix" type="mobile"/>
            </a-input>
            <!-- 获取验证码按钮 -->
            <a-button
                type="primary"
                v-show="countdownBtn"
                @click="getSMSCode"
            >
              获取验证码
            </a-button>
            <a-button
                type="primary"
                v-show="!countdownBtn"
                disabled
            >
              {{ countdown }}秒后再次获取
            </a-button>
          </div>

          <!-- 注册按钮 -->
          <div class="register-btn">
            <a-button type="primary" class="register-btn" @click="userRegister"
            >注册
            </a-button
            >
          </div>

          <div class="to-login">
            <span @click="$router.push('/login')" style="cursor: pointer">有账号，点击登入</span>
          </div>
        </div>

        <!-- 随机一言 -->
        <AWord></AWord>
      </div>
    </div>
  </a-layout>
</template>

<script>
// 验证码组件
import "./RegisterView.scss";
import cookie from "vue-cookie";
import _ from 'lodash'
import {mapState, mapMutations} from "vuex";
import {regUser} from "@/config/optionsIm.js"
import {getAdminToken, getSMS} from "@/api/axiosGetData";

import AWord from "@/components/AWord/AWord";

export default {
  name: "RegisterView",
  components: {AWord},
  data() {
    return {
      // 用户Id
      userId: "",
      // 密码
      password: "",
      // 手机号码
      phoneNum: null,
      // 倒计时时间
      countdown: 60,
      // 是否触发获取验证码按钮
      countdownBtn: true,
      // 随机数
      ranomNum: _.random(1000, 9999),
      // 手机验证码
      phoneSMSCode: null,
    };
  },
  computed: {
    ...mapState(['registerCode'])
  },
  watch: {
    registerCode(nV) {
      if (nV == 200) {
        this.$message.success('注册成功')
        setTimeout(()=>{
          this.$router.push('/')
        },500)
      }
      if (nV == 400){
        this.$message.error('用户已存在！')
      }
      setTimeout(()=>{
        this.$store.state.registerCode = 0
      },100)
    }
  },
  created() {
    // 检测当有token时跳转到index
    if (cookie.get('token')) {
      this.$router.push(`/index`)
    }
    if (this.$route.query.state) {
      this.$message.error('客官您尚未登录,请进行登录!')
    }
  },
  mounted() {
    if (cookie.get('token')) {
      this.$router.push('/index')
      console.log('已有账号请去主页登入');
    }
    getAdminToken()
  },

  methods: {
    //获取验证码方法
    getSMSFunc() {
      if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.phoneNum)) {
        this.counDownNum()
        getSMS(this.phoneNum, this.ranomNum)
      } else {
        this.$message.error('请检查您的手机号码是否输入正确');
      }
    },
    //获取验证码节流
    getSMSCode: _.throttle(function () {
      this.getSMSFunc()
    }, 1000),
    // 倒计时
    counDownNum() {
      console.log('counDownNum')
      this.countdownBtn = false
      let timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        }
        if (this.countdown == 0) {
          console.log('countdown End')
          this.countdownBtn = true
          this.countdown = 60
          clearInterval(timer)
        }
      }, 1000)
    },
    // 注册方法
    userRegister() {
      if (this.userId && this.password && this.phoneNum && this.ranomNum == this.phoneSMSCode) {
        regUser(this.userId, this.password)
      } else {
        this.$message.error('验证码不正确');
      }
    },
    ...mapMutations(["setToken"]),
  },
};
</script>