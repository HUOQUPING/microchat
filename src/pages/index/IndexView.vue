<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
<!--      搜索框-->
      <div class="logo">
        <a-input-search />
      </div>
<!--      列表-->
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user"/><span>好友</span></span>
          <a-menu-item key="1">
            Option 1
          </a-menu-item>
          <a-menu-item key="2">
            Option 2
          </a-menu-item>
          <a-menu-item key="3">
            Option 3
          </a-menu-item>
          <a-menu-item key="4">
            Option 4
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team"/><span>群组</span></span>
          <a-menu-item key="5">
            Option 5
          </a-menu-item>
          <a-menu-item key="6">
            Option 6
          </a-menu-item>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="mail"/><span>Navigation One</span></span>
          <a-menu-item key="9">
            Option 9
          </a-menu-item>
          <a-menu-item key="10">
            Option 10
          </a-menu-item>
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
          <a-menu-item key="12">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-menu>

    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
        />
<!--        用户弹出栏-->
        <a-popover placement="bottomRight" >
          <template slot="content">
            <p>个人信息</p>
            <p>退出</p>
          </template>
          <template slot="title">
            <span>用户名</span>
          </template>
          <span style="float: right;margin-right: 16px">
            <a-badge dot><a-avatar shape="square" icon="user"/></a-badge>
          </span>
        </a-popover>
      </a-layout-header>

<!--      内容-->
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import cookie from "vue-cookie";
import './indexView.scss'

export default {
  name: "IndexView",
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    token() {
      return cookie.get('token')
    }
  }
}
</script>

<style scoped>

</style>