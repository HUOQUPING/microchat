<template>
  <div class="a-word">
    <div class="text">
      <p>{{ hitokoto }}</p>
      <span>--{{ author }}</span>
    </div>
  </div>
</template>

<script>
import './AWord.scss'

export default {
  name: "AWord",
  data() {
    return {
      //每日一言
      hitokoto: '',
      //作者
      author: '',
    }
  },
  created() {
    this.gethitokoto()
  },
  methods: {
    async gethitokoto() {
      let {data} = await this.$axios.get('https://v1.hitokoto.cn')
      this.hitokoto = data.hitokoto
      if (data.from_who === null) {
        this.author = data.from
      } else {
        this.author = data.from_who
      }
    }
  }
}
</script>

<style scoped>

</style>