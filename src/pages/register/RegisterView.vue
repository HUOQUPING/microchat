<template>
  <div class="registerbox">
    <div class="theme">
      <h3>畅聊</h3>
    </div>
    <!-- 注册 -->
    <div class="username">
      <a-input placeholder="用户名" v-model="username">
        <a-icon slot="prefix" type="user" />
      </a-input>
    </div>
    <!-- 密码 -->
    <div class="passwd">
      <a-input-password
        placeholder="密码"
        v-model="password1"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input-password>
    </div>
    <!-- 确认密码 -->
    <div class="passwd">
      <a-input-password
        placeholder="确认密码"
        v-model="password2"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input-password>
    </div>

    <!-- 手机验证码 -->
<!--    <div class="verification-code">-->
<!--      <a-input-->
<!--          class="verificationCode"-->
<!--          type="text"-->
<!--          placeholder="手机验证码"-->
<!--          :style="{width:'55%'}"-->
<!--      >-->
<!--        <a-icon slot="prefix" type="mobile" />-->
<!--      </a-input>-->
<!--    </div>-->

    <!-- 验证码 -->
    <div class="verification-code">
      <a-input
          class="verificationCode"
          type="text"
          placeholder="验证码"
          v-model="captchacode"
          :style="{width:'55%'}"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <canvas id="captcha" class="captcha" ref="captcha"></canvas>
    </div>

    <!-- 注册按钮 -->
    <div class="register-btn">
      <a-button type="primary" class="register-btn" click="userRegist"
        >注册</a-button
      >
    </div>

    <div class="to-login">
      <span @click="$router.go('/')" style="cursor: pointer">有账号，点击登入</span>
    </div>
  </div>
</template>

<script>
// 验证码组件
import CaptchaMini from "captcha-mini";
import {regUser} from "@/config/optionsIm.js"
import cookie from "vue-cookie";
import {mapMutations} from "vuex";
import "./RegisterView.scss";

export default {
  name: "RegisterView",

  data() {
    return {
      username: "",
      password1: "",
      password2: "",
      captchacode: "",
    };
  },

  mounted() {
     if(cookie.get('token')){
        this.$router.push('/index')
        console.log('已有账号请去主页登入');
     }

    this.initCaptcha();
  },

  methods: {
    initCaptcha() {
      var captcha = new CaptchaMini({
        lineWidth: 5, //线条宽度
        lineNum: 6, //线条数量
        dotR: 2, //点的半径
        dotNum: 25, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 60, //字体大小
        fontFamily: ["Georgia", "微软雅黑", "Helvetica", "Arial"], //字体类型
        fontStyle: "stroke", //字体绘制方法，有fill和stroke
        content: "ABCDEFGHJKLMNOPQRSTUVWXYZ234567890", //验证码内容
        length: 4, //验证码长度
      });
      captcha.draw(this.$refs.captcha, (r) => {
        this.captcha = r; // 可通过 this.captcha 使用当前验证码（校验用户输入对否等）
      });
    },
    // userregist(){
    //   if(!this.username.trim()){
    //      alert("请输入用户名")
    //   }else if(!this.password1.trim()||!this.password2.trim()){
    //      alert("请输入密码")
    //   }else if(!this.captchacode.trim()){
    //      alert("请填写验证码")
    //   }
    // }

    userRegist() {
      regUser(this.username,this.password1,this.password2)
    },

    ...mapMutations(["setToken"]),
  },
};
</script>
