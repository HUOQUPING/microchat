<template>
  <div>
    <a-drawer
        title="设置你的个人信息"
        :width="360"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            姓名-->
            <a-form-item label="姓名">
              <a-input
                  placeholder="请输入姓名"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            用户id-->
            <a-form-item label="用户ID">
              <a-input :disabled="true" v-model="this.$store.state.userName"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            个性签名-->
            <a-form-item label="个性签名">
              <a-input
                  placeholder="无个性，不签名"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            性别-->
            <a-form-item label="性别">
              <a-select
                  placeholder="请选择你的性别"
              >
                <a-select-option value="男">
                  男
                </a-select-option>
                <a-select-option value="女">
                  女
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            手机号码-->
            <a-form-item label="手机号码">
              <a-input
                  placeholder="请输入你的手机号码"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
            <!--            出生日期-->
            <a-form-item label="出生日期">
              <a-date-picker
                  style="width: 100%"
                  :get-popup-container="trigger => trigger.parentNode"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
          :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Cancel
        </a-button>
        <a-button type="primary" @click="onClose">
          Submit
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import './PersonalInformation.scss'

export default {
  name: "PersonalInformation",
  data(){
    return {
      form: this.$form.createForm(this),
      visible: false,
    }
  },
  watch: {
    show(nV){
      this.visible = nV
    },
  },

  props:['show'],
  methods:{
    onClose() {
      this.visible = false;
      this.$emit('onclose',this.visible)
    },
  },
}
</script>

<style scoped>

</style>