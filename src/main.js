import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $axios from 'vue-axios-plugin'
import 'ant-design-vue/dist/antd.css';
import Antd from "ant-design-vue";

import WebIm from './utils/WebIm.js';

Vue.use(Antd)
Vue.use($axios, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})


new Vue({
  WebIm,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
