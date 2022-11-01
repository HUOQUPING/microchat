<template>
  <div >
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<!-- 添加好友/群-->
<script>
import './AddItion.scss'
export default {
  name: "AddItion",
  data(){
    return {
      visible: false,
    }
  },
  watch:{
    status(nV){
      this.visible = nV
    }
  },
  props:['status'],
  methods:{
    handleOk(e) {
      console.log(e);
      this.visible = false;
      this.$emit('addhandle',this.visible)
    },
  },
}
</script>

<style scoped>

</style>