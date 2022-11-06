<template>
  <div>
    <a-modal v-model="visible" :title="title" :afterClose="afterClose" >
<!--      <a-input-search placeholder="请输入ID号" enter-button @search="onSearch" />-->
      <a-input-search placeholder="请输入ID号" @search="onSearch" v-model="value" v-if="addstatus !== 3"/>
      <ul v-if="addstatus === 3">
        <li v-for="n in this.$store.state.chatRoom" :key="n.id"
            class="chatRoom"
            :class="{active:actIndex === n.id}"
            @click="addChatRoom(n.id,n.name)"><p>{{n.name}}</p></li>
      </ul>
      <template #footer>
        <a-button key="back" @click="handleError" v-if="addstatus !== 3">
          取消
        </a-button>
        <a-button key="submit" type="primary"  @click="handleOk" v-if="addstatus !== 3">
          发送
        </a-button>
        <a-button key="submit" type="primary"  @click="handleChatRoom" v-if="addstatus === 3">
          加入
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<!-- 添加好友/群-->
<script>
import './AddItion.scss'
import {addContact,joinGroup,addChatRoom} from "@/config/optionsIm";

export default {
  name: "AddItion",
  data() {
    return {
      visible: false,
      //输入框的值
      value:'',
    //  标题
      title:null,
      //高亮下标
      actIndex:null,
    // 聊天室名字
      chatRoomName:''
    }
  },
  watch: {
    status(nV) {
      this.visible = nV
    },
    addstatus(nV){
      if (nV === 1){
        this.title = "添加好友"
      }else if (nV === 2){
        this.title = "添加群"
      }else if (nV === 3){
        this.title = "添加聊天室"
      }
    }
  },
  props: ['status','addstatus'],
  methods: {
    handleOk() {
      this.visible = false;
      this.$emit('addhandle', false)
      if (this.value.trim()){
        this.onSearch(this.value.trim())
      }
    },
    handleError(){
      this.visible = false;
      this.$emit('addhandle', false)
    },
    afterClose(){
      this.visible = false
      this.$emit('addhandle', false)
    },
    onSearch(value) {
      if (this.addstatus === 1){
        //加好友
        addContact(value)
      }else if (this.addstatus === 2){
        //加群
        let opt = {
          groupId:value,
          message:`我是${this.$store.state.userId}`
        }
        joinGroup(opt)
      }else if (this.addstatus === 3){
      // 加聊天室
        console.log(this.addstatus)
      }
      this.success()
    },
    success() {
      this.$message.success('发送请求成功');
    },
    addChatRoom(id,name){
      this.actIndex = id
      this.chatRoomName = name
      console.log(id)
    },
    handleChatRoom(){
      this.visible = false;
      this.$emit('addhandle', false)
      addChatRoom(this.actIndex,this.chatRoomName)
    }
  },
}
</script>

<style scoped>

</style>