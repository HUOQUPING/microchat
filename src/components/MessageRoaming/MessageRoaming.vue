<template>
  <div>
    <a-modal title="聊天记录"  :visible="visible" :footer="null" @cancel="handleCancel" :afterClose="handleCancel">
      <ul class="chatHistory">
        <li v-for="msg in chatHistoryArr" :key="msg.id" >
          <div><a-avatar shape="square" icon="user" /></div>
          <div>
            {{ msg.from }}
            <p class="text">{{ msg.msg }}</p>
          </div>
          <div>
            <span>{{ getHistoryTime(msg.time) }}</span>
          </div>
        </li>
      </ul>

    </a-modal>
  </div>
</template>

<script>
import './MessageRoaming.scss'
import {mapState} from "vuex";
export default {
  name: "MessageRoaming",
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState(['chatHistoryArr'])
  },
  props: ['roamingStatus'],
  watch: {
    roamingStatus(nV) {
      this.visible = nV
      console.log(this.messageRom)
    },
  },
  methods: {
    handleCancel() {
      this.visible = false;
      this.$emit("roamStatus", this.visible)
    },
    getHistoryTime(timestamp) {
      return new Date(parseInt(timestamp)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    }
  }
}
</script>

<style scoped>

</style>