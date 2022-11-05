<template>
  <div>
    <a-modal v-model="Groupvisible" :title="title" :afterClose="afterClose" >
      <div v-if="GroupModalstatus === 1">
        <p><a-input placeholder="输入群名字" v-model="Groupname"/></p>
        <p><a-textarea
            v-model="txt"
            placeholder="请输入群简介"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        /></p>

        <span>群组类型</span>
        <p>
          <a-radio-group v-model="value" @change="onChange">
            <a-radio :value="1">
              公开群
            </a-radio>
            <a-radio :value="2">
              私有群
            </a-radio>
          </a-radio-group>
        </p>

        <span>加群权限</span>
        <p>
          <a-radio-group v-model="value2" @change="onChange">
            <a-radio :value="1">
              需审批
            </a-radio>
            <a-radio :value="2">
              随便加
            </a-radio>
          </a-radio-group>
        </p>
      </div>

      <template #footer>
        <a-button type="primary" @click="creatGroupOrRoom">
         创建
        </a-button>
      </template>
    </a-modal>
  </div>
</template>


<!-- 创建群/聊天室-->
<script>
import './EstabIish.scss'
import {SetupGroup} from "@/config/optionsIm";

export default {
  name: "EstabIish",
  data() {
    return {
      Groupvisible: false,
      title:null,
      //群简介
      txt:'',
      //群类型
      value: 1,
      //加群权限
      value2:1,
      // 群名字
      Groupname:''
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
      this.Groupvisible = false
      this.$emit('grouphandle', this.Groupvisible)
    },
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
    creatGroupOrRoom(){
      if (this.GroupModalstatus === 1){
      //  判断为创建群
        if (this.Groupname.trim()){
          SetupGroup(this.Groupname,this.txt,this.value,this.value2)
          this.$message.success('群聊已经创建成功');
          this.Groupvisible = false
        }else {
          this.$message.error('请输入群聊名称');
        }
      }
    }
  }
}
</script>

<style scoped>

</style>