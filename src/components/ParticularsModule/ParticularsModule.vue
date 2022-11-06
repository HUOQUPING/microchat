<template>
  <div>
    <a-modal v-model="visible" :title="partUserName" :afterClose="handleCancel">
      <p><span v-if="partChatType === 'singleChat' ">用户id:</span>
        <span v-if="partChatType === 'groupChat' ">群组id:</span>
        <span v-if="partChatType === 'chatRoom' ">聊天室id:</span>
        {{partUserId}}</p>
<!--      好友模块-->
      <template slot="footer" v-if="partChatType === 'singleChat' ">
        <a-button  type="primary"  @click="handleCancel(1)">
          加入黑名单
        </a-button>
        <a-button  type="primary"  @click="handleCancel(2)">
          删除好友
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import './ParticularsModule.scss'
import {delFriends,addblackFriends} from "@/config/optionsIm";

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
      partUserId:null
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
      }
    },
  }
}
</script>

<style scoped>

</style>