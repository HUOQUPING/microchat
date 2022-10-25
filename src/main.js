import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $axios from 'vue-axios-plugin'
import websdk from 'easemob-websdk'
import webimconfig from "@/webim.config.js";

Vue.use($axios, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})

// 环信
// 环信
let WebIM = window.WebIM = websdk;
WebIM.config = webimconfig;
// 环信实例
var conn = WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isHttpDNS: WebIM.config.isHttpDNS,
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  isStropheLog: WebIM.config.isStropheLog,
  delivery: WebIM.config.delivery
})
// 账号密码登录配置
/*
var optionsIm = {
  apiUrl: WebIM.config.apiURL,
  user: '', //换成自己申请的账号就行，密码也需要换
  pwd: '',
  appKey: WebIM.config.appkey,
  success: function (re) {
    console.log('登陆成功')
  },
  error: function (err) {
    console.log(err)
  }
}
*/

Vue.prototype.$WebIM = WebIM;
Vue.prototype.$imconn = conn
Vue.prototype.$imoption = optionsIm;

Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
