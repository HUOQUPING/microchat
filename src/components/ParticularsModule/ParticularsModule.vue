<template>
  <div>
    <a-modal v-model="visible" :title="partUserName" :afterClose="handleCancel">
      <p><span v-if="partChatType === 'singleChat' ">用户id:</span>
        <span v-if="partChatType === 'groupChat' ">群组id:</span>
        <span v-if="partChatType === 'chatRoom' ">聊天室id:</span>
        {{partUserId}}</p>

<!--      群内容模块-->
      <p v-if="partChatType === 'groupChat'">群主:
        {{this.$store.state.groupInfo.owner}}</p>
      <p v-if="partChatType === 'groupChat'">群成员列表:</p>
      <a-menu mode="inline"  v-if="partChatType === 'groupChat'">
        <a-menu-item v-for="n in this.$store.state.groupMember"
                     @click="groupmemberID = n.owner ?? n.member"
                     :key="n.owner ?? n.member">
          <span class="nav-text" >
            {{n.owner ?? n.member}}<span v-if="n.owner">(群主)</span></span>
        </a-menu-item>
      </a-menu>
      <template slot="footer">
        <!--      好友模块-->
        <a-button  type="primary"  @click="handleCancel(1)" v-if="partChatType === 'singleChat' ">
          加入黑名单
        </a-button>
        <a-button  type="primary"  @click="handleCancel(2)" v-if="partChatType === 'singleChat' ">
          删除好友
        </a-button>
<!--        群模块-->
      <!--        群主-->
        <a-button  type="primary"  @click="handleCancel(3)"
                   v-if="partChatType === 'groupChat' && this.$store.state.groupInfo.owner === this.$store.state.userId">
          解散该群
        </a-button>
        <a-button  type="primary"  @click="handleCancel(4)"
                   v-if="partChatType === 'groupChat' && this.$store.state.groupInfo.owner === this.$store.state.userId">
          踢出群聊
        </a-button>
      <!--        成员-->
        <a-button  type="primary"  @click="handleCancel(5)"
                   v-if="partChatType === 'groupChat' && !this.$store.state.groupInfo.owner">
          退出群聊
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import './ParticularsModule.scss'
import {delFriends,addblackFriends,dissolveGroup,removeGroupMemver,leaveGroup} from "@/config/optionsIm";

export default {
  name: "ParticularsModule",
  props:["showpart","chatType","userName","userID"],
  data(){
    return {
      //是否显示
      visible: false,
      //会话类型
      partChatType:null,
      //名字
      partUserName:null,
      //id
      partUserId:null,
      //当前选中的群成员
      groupmemberID:null
    }
  },
  watch:{
    showpart(nV){
      this.visible = nV
    },
    userID(nV){
      this.partUserId = nV
    },
    chatType(nV){
      this.partChatType = nV
    },
    userName(nV){
      this.partUserName = nV
    },
  },
  methods: {
    handleCancel(num) {
      this.visible = false;
      this.$emit("showpartStatus",this.visible)

      if (num === 2){
        delFriends(this.partUserId)
        this.$message.success("已成功删除该好友")
      }else if (num === 1){
        addblackFriends(this.partUserId)
        this.$message.success("已成功加入黑名单")
      }else if (num === 3){
        dissolveGroup(this.partUserId)
        this.$message.success("已成功解散群聊")
      }else if (num === 4){
        if (this.groupmemberID !== this.$store.state.userId) {
          removeGroupMemver(this.partUserId,this.groupmemberID)
          this.$message.success("已成功提出群聊")
        }else {
          this.$message.error("不能踢自己噢")
        }
      }else if (num === 5){
        leaveGroup(this.partUserId)
        this.$message.success("已成功退出群聊")
      }
    },
  }
}
</script>

<style scoped>

</style>