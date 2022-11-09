<template>
  <div>
    <a-modal title="消息" :visible="visible" :footer="null" @cancel="handleCancel">
      <!-- 空数据显示 -->
      <div v-if="!friendsEventStatus">
        <a-empty description="暂无消息......"/>
      </div>
      <!-- 渲染数据 -->
      <div class="msg-box" v-else>
        <ul>
          <li v-for="(t,i) in friendsEventVal" :key="i">
            <!-- 头像 -->
            <div class="icon">
              <a-avatar shape="square" size="large" icon="user"/>
            </div>
            <!-- 文本 -->
            <div class="text-box">
              <!-- 添加者姓名 -->
              <h3>{{ t.from }}</h3>
              <!-- 添加者请求添加好友信息 -->
              <span>{{ t.status }}</span>
            </div>
            <!-- 按钮 -->
            <div class="btn-box">
              <a-button type="primary" size="small" @click="agreeAddFunc(t.from)">同意添加</a-button>
              <a-button type="danger" size="small" @click="refuseAddFunc(t.from)">拒绝添加</a-button>
            </div>
          </li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>

<script>
import './MessageReceipt.scss'
import {mapGetters, mapState} from "vuex";
import {agreeAdd,refuseAdd} from '@/config/optionsIm'

export default {
  name: "MessageReceipt",
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState(['friendsEventVal']),
    ...mapGetters(['friendsEventStatus'])
  },
  props: ['messageStatus'],
  watch: {
    messageStatus(nV) {
      this.visible = nV
    }
  },
  methods: {
    handleCancel() {
      this.visible = false;
      this.$emit("MsgStatus", this.visible)
    },
    //同意添加好友
    agreeAddFunc(userId){
      agreeAdd(userId)
    },
    //拒绝添加好友
    refuseAddFunc(userId){
      refuseAdd(userId)
    },
  }
}
</script>

<style scoped>

</style>