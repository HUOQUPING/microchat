<template>
    <!--      空白内容-->
    <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}"
        :class="{blank : userID === null}"
    >
      <span v-show="userID === null" class="blankTitle">畅聊</span>

        <div :style="{width: '100%',height:'100%'}" v-show="userID !== null" class="chatContent" >
          <a-page-header :style="{border: '1px solid rgb(235, 237, 240)',padding: '10px 24px'}"
                         :title="userid">
<!--            设置按钮-->
          <a-icon type="ellipsis" class="trigger setting" :style="{fontSize:'26px'}" @click="showpart"/>

          </a-page-header>
<!--          聊天框-->
          <div class="titleContent" ref="listContent">
            <ul v-for="(n,i) in this.$store.state.charArr" :key="i" v-show="n.to === sendID">
              <li v-for="(nn,i) in n.arr" :key="i">
                <span :class="{rightIcon:nn.from === username,leftIcon:nn.from !== username}">
                    <a-avatar shape="square" icon="user"/>
                  <span v-if="nn.from === username && nn.chatType === 'singleChat'">{{nn.from}}</span>
                  <span v-if="nn.from !== username  && nn.chatType === 'singleChat'">{{nn.from}}</span>
                  <span v-if="nn.chatType !== 'singleChat' ">{{nn.from}}</span>
                </span>

                  <span
                      :class="{right:nn.from === username,left:nn.from !== username}">
                  {{nn.msg}}</span>

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
              <a-icon type="smile" />
            </a-tooltip>
<!--            发送文件-->
            <a-tooltip placement="bottom" :mouseEnterDelay="1">
              <template #title>
                <span :style="{fontSize:'12px'}">发送文件</span>
              </template>
              <a-icon type="folder" />
            </a-tooltip>
<!--            聊天记录-->
            <a-tooltip placement="bottom" :mouseEnterDelay="1" @click="chatHis">
              <template #title>
                <span :style="{fontSize:'12px'}">聊天记录</span>
              </template>
              <a-icon type="message" />
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
      <particulars-module :showpart="showPart"
                          :chatType="chatType"
                          :userName="userID"
                          :userID="sendID"
                          @showpartStatus="showpartStatus">
      </particulars-module>

    </a-layout-content>



</template>

<script>
import './ChatContent.scss'
import {sendMessage,chatHistory} from "@/config/optionsIm";
import ParticularsModule from "@/components/ParticularsModule/ParticularsModule";
import {getUserInfo,getGroupInfo,getChatRoomInfo} from "@/config/optionsIm";

export default {
  name: "ChatContent",
  components:{ParticularsModule},
  data(){return {
    username: null,
    userID:  null,
    text:'',
    chatType:null,
    sendID:null,
    visible:false,
  //  详情
    showPart:false
  }},
  props:['userid','type','sendid'],
  watch:{
    userid(nV){
      this.userID = nV
    },
    type(nV){
      this.chatType = nV

    },
    sendid(nV){
      this.sendID = nV
    }
  },

  methods:{
    sendMsg(){
      let text = this.text.trim()
      if (text){
        this.username = this.$store.state.userId
        sendMessage(text,this.chatType,this.sendID,this.username)
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.listContent.scrollTop = this.$refs.listContent.scrollHeight
          })
        },100)

        this.text = ''
      }
      console.log("聊天内容",this.$store.state.charArr)
    },

    chatHis(){
      chatHistory()
    },

    showpart(){
      this.showPart = true
      if (this.chatType === "singleChat"){
        getUserInfo(this.sendID)
      }else if (this.chatType === "groupChat") {
        getGroupInfo(this.sendID)
      }else if (this.chatType === "chatRoom"){
        getChatRoomInfo(this.sendID)
      }
    },
    showpartStatus(val){
      this.showPart = val
    }
  },
}
</script>

<style scoped >
</style>