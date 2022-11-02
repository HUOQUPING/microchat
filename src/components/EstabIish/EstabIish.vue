<template>
  <div>
    <a-modal v-model="Groupvisible" :title="title" :afterClose="afterClose" >

      <template #footer>
        <a-button type="primary" >
         创建
        </a-button>
      </template>
    </a-modal>
  </div>
</template>


<!-- 创建群/聊天室-->
<script>
import './EstabIish.scss'
export default {
  name: "EstabIish",
  data() {
    return {
      Groupvisible: false,
      title:null
    }
  },
  props:['GroupStatus','GroupModalstatus'],
  watch:{
    GroupStatus(nV){
      this.Groupvisible = nV
    },
    GroupModalstatus(nV){
      if (nV === 1){
        this.title = "创建群"
      }else if (nV === 2){
        this.title = "创建聊天室"
      }
    }
  },
  methods:{
    afterClose(){
      this.visible = false
      this.$emit('grouphandle', false)
    },
  }
}
</script>

<style scoped>

</style>