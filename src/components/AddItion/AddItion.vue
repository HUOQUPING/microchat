<template>
  <div>
    <a-modal v-model="visible" title="Basic Modal" :afterClose="afterClose" :maskClosable="false">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <a-button key="back" @click="afterClose">Return</a-button>
        <a-button key="submit" type="primary" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
</template>

<!-- 添加好友/群-->
<script>
import './AddItion.scss'

export default {
  name: "AddItion",
  data() {
    return {
      visible: false,
    }
  },
  watch: {
    status(nV) {
      this.visible = nV
    },
  },
  props: ['status'],
  methods: {
    handleOk(e) {
      console.log(e);
      this.visible = false;
      this.$emit('addhandle', false)
    },
    afterClose(){
      this.visible = false
      this.$emit('addhandle', false)
    }
  },
}
</script>

<style scoped>

</style>