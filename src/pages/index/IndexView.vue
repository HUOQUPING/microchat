<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <!--      搜索框-->
        <div class="logo">
          <a-input-search ref="search"/>
        </div>
        <!--      列表-->
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" :default-open-keys="['sub1']">

          <a-sub-menu :key="i" v-for="(n,i) in List">
            <span slot="title" v-if="n.name === '好友'"><a-icon type="user"/><span>{{ n.name }}</span></span>
            <span slot="title" v-if="n.name === '群组'"><a-icon type="team"/><span>{{ n.name }}</span></span>
            <span slot="title" v-if="n.name === '聊天室'"><a-icon type="usergroup-add"/><span>{{ n.name }}</span></span>

            <a-menu-item v-for="(nn,i) in n.arr" :key="nn.id ?? nn.groupid ?? i"
                         @click="getUserID(nn.name ?? nn.groupname ?? nn,n.name,nn.id ?? nn.groupid ?? nn)">
              {{ nn.name ?? nn.groupname ?? nn }}
            </a-menu-item>

          </a-sub-menu>

        </a-menu>

      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
              class="trigger"
              :style="{padding:'0',margin:'0 24px 0 24px',lineHeight:'0'}"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
          />

          <!--        添加好友/群-->
          <a-popover placement="bottom">
            <template slot="content">
              <p :style="{textAlign:'center'}" @click="showModal(1)">添加好友</p>
              <p :style="{textAlign:'center'}" @click="showModal(2)">添加群</p>
            </template>
            <a-icon type="user-add" class="trigger"
                    :style="{margin:'0 24px 0 0',lineHeight:'0',padding: '0'}"/>
          </a-popover>

          <!--        创建群/聊天室-->
          <a-popover placement="bottom">
            <template slot="content">
              <p :style="{textAlign:'center'}" @click="showGroupModal(1)">创建群</p>
              <p :style="{textAlign:'center'}" @click="showGroupModal(2)">创建聊天室</p>
            </template>
            <a-icon type="usergroup-add"
                    class="trigger" :style="{margin:'0 24px 0 0',lineHeight:'0',padding: '0'}"/>
          </a-popover>

          <!--        用户弹出栏-->

          <a-popover placement="bottomRight">
            <template slot="content">
              <p @click="ifShow = true">个人信息</p>
              <p @click="closed">退出</p>
            </template>
            <template slot="title">
              <span>{{ this.$store.state.userId ?? '用户名' }}</span>
            </template>
            <span style="float: right;margin-right: 16px">
            <a-badge><a-avatar shape="square" icon="user"/></a-badge>
          </span>
          </a-popover>

          <!--          消息提示-->
          <span style="float: right;" class="trigger">
             <a-badge :dot="show">
                <a-icon type="bell" :style="{fontSize:'18px'}"/>
              </a-badge>
        </span>

        </a-layout-header>


        <!--    个人信息-->
        <personal-information :show="ifShow" @onclose="onclose"></personal-information>
        <!--      聊天框-->
        <chat-content :userid="UserID" :type="chatType" :sendid="sendID"></chat-content>
      </a-layout>
    </a-layout>

<!--    添加好友群-->
    <add-ition :status="visible" @addhandle="addhandle" :addstatus="addstatus"></add-ition>
<!--    创建群聊天室-->
    <estab-iish :group-status="groupstatus" @grouphandle="grouphandle" :GroupModalstatus="GroupModalstatus"></estab-iish>
  </div>
</template>

<script>
import cookie from "vue-cookie";
import './indexView.scss'
import {close, tokenLogin} from "@/config/optionsIm";
import {mapState} from 'vuex'
import PersonalInformation from "@/components/PersonalInformation/PersonalInformation";
import ChatContent from "@/components/ChatContent/ChatContent";
import AddItion from "@/components/AddItion/AddItion";
import EstabIish from "@/components/EstabIish/EstabIish";

export default {
  name: "IndexView",
  components: {PersonalInformation, ChatContent, AddItion,EstabIish},

  data() {
    return {
      collapsed: false,
      ifShow: false,
      //接收方名字
      UserID: null,
      //会话类型
      chatType: null,
      //接收方id
      sendID: null,
      //单人聊天
      SingleChat: "singleChat",
      //群聊
      GroupChat: "groupChat",
      //聊天室
      ChatRoom: "chatRoom",
      //小圆点显示
      show: true,
      //添加好友框状态
      visible: false,
      //创建群框状态
      groupstatus:false,
      //判断是添加好友还是群
      addstatus:null,
      //判断是创建群还是聊天室
      GroupModalstatus:null
    }
  },
  created() {
    let userMsg = JSON.parse(cookie.get('token'))
    tokenLogin(userMsg.userId, userMsg.token)
  },
  computed: {
    ...mapState(['List', 'userId']),
    token() {
      return cookie.get('token')
    },
  },
  methods: {
    closed() {
      close()
      setTimeout(() => {
        this.$router.replace('/')
      }, 500)

    },
    onclose(val) {
      this.ifShow = val
    },

    //  获取用户id
    getUserID(id, name, ID) {
      this.UserID = id
      this.sendID = ID
      if (name === "好友") {
        this.chatType = this.SingleChat
      } else if (name === "群组") {
        this.chatType = this.GroupChat
      } else if (name === "聊天室") {
        this.chatType = this.ChatRoom
      }
    },

    //显示添加好友框
    showModal(num) {
      if (num === 1){
        this.addstatus = num
      }else if (num === 2){
        this.addstatus = num
      }
      this.visible = true;
    },
    addhandle(val) {
      this.visible = val
    },
    //显示创建群框
    showGroupModal(num){
      if (num === 1){
        this.GroupModalstatus = num
      }else if (num === 2){
        this.GroupModalstatus = num
      }
      this.groupstatus = true
    },
    grouphandle(val) {
      this.groupstatus = val
  }
  }
}
</script>

<style scoped>

</style>