<template>
  <div>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible >
<!--      搜索框-->
      <div class="logo">
        <a-input-search ref="search"/>
      </div>
<!--      列表-->
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user"/><span>好友</span></span>
          <a-menu-item v-for="n in goodfriendsList" :key="n" @click="getUserID(n,SingleChat)">
            {{n}}
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
          <span slot="title"><a-icon type="usergroup-add" /><span>聊天室</span></span>
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
            <p @click="ifShow = true" >个人信息</p>
            <p @click="closed">退出</p>
          </template>
          <template slot="title">
            <span>{{userName ?? '用户名'}}</span>
          </template>
          <span style="float: right;margin-right: 16px">
            <a-badge><a-avatar shape="square" icon="user"/></a-badge>
          </span>
        </a-popover>
      </a-layout-header>
<!--    个人信息-->
      <personal-information :show="ifShow" @onclose="onclose"></personal-information>
<!--      聊天框-->
      <chat-content :userid="UserID" :type="chatType"></chat-content>
    </a-layout>
  </a-layout>

  </div>
</template>

<script>
import cookie from "vue-cookie";
import './indexView.scss'
import {close,tokenLogin} from "@/config/optionsIm";
import {mapState} from 'vuex'
import PersonalInformation from "@/components/ PersonalInformation/PersonalInformation";
import ChatContent from "@/components/ChatContent/ChatContent";

export default {
  name: "IndexView",
  components:{PersonalInformation,ChatContent},

  data() {
    return {
      collapsed: false,
      ifShow:false,
      UserID:null,
      //会话类型
      chatType:null,
      //单人聊天
      SingleChat:"singleChat",
      //群聊
      GroupChat:"groupChat",
      //聊天室
      ChatRoom:"chatRoom",
    }
  },
  created() {
    let userMsg = JSON.parse(cookie.get('token'))
    tokenLogin(userMsg.userId,userMsg.token)
  },
  computed: {
    ...mapState(['goodfriendsList','userName']),
    token() {
      return cookie.get('token')
    },
  },
  methods:{
      closed(){
        close()
        setTimeout(()=>{
          this.$router.replace('/')
        },500)

      },
      onclose(val){
        this.ifShow = val
      },

  //  获取用户id
    getUserID(id,chatType){
        this.UserID = id
        this.chatType = chatType
    },
  },
}
</script>

<style scoped>

</style>