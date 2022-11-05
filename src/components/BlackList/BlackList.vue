<template>
  <div>
    <a-modal v-model="blackvisible" title="黑名单" :afterClose="afterClose">
      <template slot="footer">
        <a-button key="back" @click="handleCancel(1)">
          否
        </a-button>
        <a-button key="submit" type="primary" @click="handleCancel(2)">
          是
        </a-button>
      </template>
      <p>是否将{{id}}移出黑名单</p>
    </a-modal>
  </div>
</template>

<script>
import './BlackList.scss'
import {removeblackFrinends} from "@/config/optionsIm";

export default {
  name: "BlackList",
  data(){
    return {
      blackvisible:false,
      id:null
    }
  },
  props:["blackstatus","blackid"],
  watch:{
    blackstatus(nV){
      this.blackvisible = nV
    },
    blackid(nV){
      this.id = nV
    }
  },
  methods:{
    afterClose(){
      this.blackvisible = false
      this.$emit('blackvisible', this.blackvisible)
    },
    handleCancel(num){
      this.blackvisible = false
      this.$emit('blackvisible', this.blackvisible)
      if (num === 2){
        removeblackFrinends(this.id)
        this.$message.success("已经移出黑名单")
      }
    }
  }
}
</script>

<style scoped>

</style>