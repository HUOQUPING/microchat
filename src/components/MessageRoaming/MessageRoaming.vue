<template>
  <div>
    <a-modal title="聊天记录" :visible="visible" :footer="null" @cancel="handleCancel" :afterClose="handleCancel">
      <div v-for="msg in messageRom" :key="msg.id">
        <p>{{msg.msg}}</p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import './MessageRoaming.scss'
export default {
  name: "MessageRoaming",
  data(){
    return {
      visible: false,
      messageRom: [],
    }
  },
  props:['roamingStatus','message'],
  watch:{
    roamingStatus(nV){
      this.visible = nV
      console.log(this.messageRom)
    },
    message(nV){
      this.messageRom = nV
    }
  },
  methods:{
    handleCancel() {
      this.visible = false;
      this.$emit("roamStatus",this.visible)
    },
  }
}
</script>

<style scoped>

</style>