<template>
  <div>
    <a-modal v-model="visible" :title="title" :afterClose="afterClose" >
<!--      <a-input-search placeholder="请输入ID号" enter-button @search="onSearch" />-->
      <a-input-search placeholder="请输入ID号" @search="onSearch" v-model="value"/>
      <template #footer>
        <a-button key="back" @click="handleError">
          取消
        </a-button>
        <a-button key="submit" type="primary"  @click="handleOk" >
          发送
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<!-- 添加好友/群-->
<script>
import './AddItion.scss'
import {addContact,joinGroup} from "@/config/optionsIm";

export default {
  name: "AddItion",
  data() {
    return {
      visible: false,
      //输入框的值
      value:'',
    //  标题
      title:null
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
        addContact(value)
      }else if (this.addstatus === 2){
        let opt = {
          groupId:value,
          message:`我是${this.$store.state.userId}`
        }
        joinGroup(opt)
      }
      this.success()
    },
    success() {
      this.$message.success('发送请求成功');
    },
  },
}
</script>

<style scoped>

</style>