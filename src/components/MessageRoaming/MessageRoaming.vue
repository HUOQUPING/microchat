<template>
  <div>
    <a-modal title="历史记录" :visible="visible" :footer="null" @cancel="handleCancel" :afterClose="handleCancel">
      <p>aaa</p>
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
    }
  },
  props:['roamingStatus'],
  watch:{
    roamingStatus(nV){
      this.visible = nV
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