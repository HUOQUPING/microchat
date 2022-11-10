<template>
  <!--      空白内容-->
  <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}"
      :class="{blank : userID === null}"
  >
    <span v-show="userID === null" class="blankTitle">畅聊</span>

    <div :style="{width: '100%',height:'100%'}" v-show="userID !== null" class="chatContent">
      <a-page-header :style="{border: '1px solid rgb(235, 237, 240)',padding: '10px 24px'}"
                     :title="userid">
        <!--            设置按钮-->
        <a-icon type="ellipsis" class="trigger setting" :style="{fontSize:'26px'}" @click="showpart"/>

      </a-page-header>
      <!--          聊天框-->
      <div class="titleContent" ref="listContent">
        <ul v-for="(n,i) in this.$store.state.charArr" :key="i" v-show="n.to === sendID">
          <li v-for="(nn,i) in n.arr" :key="i">
            <!-- 头像 -->
            <span :class="{rightIcon:nn.from === username,leftIcon:nn.from !== username}">
                    <a-avatar shape="square" icon="user"/>
                  <span v-if="nn.from === username && nn.chatType === 'singleChat'">{{ nn.from }}</span>
                  <span v-if="nn.from !== username  && nn.chatType === 'singleChat'">{{ nn.from }}</span>
                  <span v-if="nn.chatType !== 'singleChat' ">{{ nn.from }}</span>
                </span>
            <!-- 文本消息 -->
            <span v-if="!nn.ext.key1"
                  :class="{right:nn.from === username,left:nn.from !== username}">
                  {{ nn.msg }}</span>
            <!-- 文件消息 -->
            <div v-else :class="{fileRight:nn.from === username,fileLeft:nn.from !== username}" class="file-box">
              <p class="title">文件</p>
              <h3>{{ nn.msg }}</h3>
              <!-- TODO:点击下载按钮目前仅为装饰作用 -->
              <span class="click-download">点击下载</span>
            </div>
          </li>
        </ul>
      </div>
      <!--          图标框-->
      <div class="iconContent">
        <!--            表情-->
        <a-tooltip placement="bottom" :mouseEnterDelay="1">
          <template #title>
            <span :style="{fontSize:'12px'}">表情</span>
          </template>
          <a-icon type="smile"/>
        </a-tooltip>
        <!--            图片-->
        <a-tooltip placement="bottom" :mouseEnterDelay="1">
          <template #title>
            <span :style="{fontSize:'12px'}">图片</span>
          </template>
          <a-icon type="picture"/>
        </a-tooltip>
        <!--            发送文件-->
        <a-tooltip placement="bottom" :mouseEnterDelay="1" :style="{position:'relative'}">
          <template #title>
            <span :style="{fontSize:'12px'}">发送文件</span>
          </template>
          <label>
            <a-icon type="folder"/>
            <input type="file" id="file" @change="previewFile($event)">
          </label>
        </a-tooltip>
        <!--            聊天记录-->
        <a-tooltip placement="bottom" :mouseEnterDelay="1" @click="chatHisFrom">
          <template #title>
            <span :style="{fontSize:'12px'}">聊天记录</span>
          </template>
          <a-icon type="message"/>
        </a-tooltip>
      </div>
      <!--          输入框-->
      <div class="titleInput">
        <a-textarea
            @keydown.ctrl.enter.native="sendMsg"
            :bordered="false" :style="{border: 'none',outline:'none'}" v-model="text" :max-length="196"/>


        <a-tooltip placement="top" :mouseEnterDelay="1" trigger="focus">
          <template #title v-if="text === '' ">
            <span :style="{fontSize:'12px'}">不能输入为空</span>
          </template>
          <a-tooltip placement="bottom" :mouseEnterDelay="1">
            <template #title>
              <span :style="{fontSize:'12px'}">按Enter换行,按Ctrl+Enter发送</span>
            </template>
            <a-button class="enterBtn" @click="sendMsg">发送</a-button>
          </a-tooltip>
        </a-tooltip>
      </div>
    </div>

    <!--      详情-->
    <particulars-module
        :showpart="showPart"
        :chatType="chatType"
        :userName="userID"
        :userID="sendID"
        @showpartStatus="showpartStatus">
    </particulars-module>

    <!--消息漫游-->
    <message-roaming
        :roamingStatus="roamingStatus"
        @roamStatus="roamStatus">
    </message-roaming>

  </a-layout-content>


</template>

<script>
import './ChatContent.scss'
import MessageRoaming from "@/components/MessageRoaming/MessageRoaming";
import {sendMessage, getmessage} from "@/config/optionsIm";
import ParticularsModule from "@/components/ParticularsModule/ParticularsModule";
import {getUserInfo, getGroupInfo, getChatRoomInfo} from "@/config/optionsIm";

export default {
  name: "ChatContent",
  components: {ParticularsModule, MessageRoaming},
  data() {
    return {
      username: null,
      userID: null,
      text: '',
      chatType: null,
      sendID: null,
      visible: false,
      //  详情
      showPart: false,
      roamingStatus: false,
      //文件
      fileList: []
    }
  },
  props: ['userid', 'type', 'sendid'],
  watch: {
    userid(nV) {
      this.userID = nV
    },
    type(nV) {
      this.chatType = nV
    },
    sendid(nV) {
      this.sendID = nV
    }
  },

  methods: {
    sendMsg() {
      let text = this.text.trim()
      if (text) {
        this.username = this.$store.state.userId
        sendMessage(text, this.chatType, this.sendID, this.username, false)
        // 发送消息默认拉到底部
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.listContent.scrollTop = this.$refs.listContent.scrollHeight
          })
        }, 150)

        this.text = ''
      }
      console.log("聊天内容", this.$store.state.charArr)
    },
    //点击聊天记录弹出   bug：点第二次才显示当前会话记录
    chatHisFrom() {
      this.roamingStatus = true
      let options = {
        targetId: this.sendid,
        pageSize: 10,
        cursor: -1,
        chatType: this.chatType,
        searchDirection: "up",
      };
      getmessage(options)
    },


    roamStatus(val) {
      this.roamingStatus = val
    },

    showpart() {
      this.showPart = true
      if (this.chatType === "singleChat") {
        getUserInfo(this.sendID, 2)
      } else if (this.chatType === "groupChat") {
        getGroupInfo(this.sendID)
      } else if (this.chatType === "chatRoom") {
        getChatRoomInfo(this.sendID)
      }
    },
    showpartStatus(val) {
      this.showPart = val
    },
    //上传文件
    previewFile(e) {
      if (e.srcElement.files.length > 0) {
        this.username = this.$store.state.userId
        sendMessage(e.srcElement.files[0].name, this.chatType, this.sendID, this.username, true)
      }
      // 发送消息默认拉到底部
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.listContent.scrollTop = this.$refs.listContent.scrollHeight
        })
      }, 180)
    }
  },
}
</script>

<style scoped>
</style>