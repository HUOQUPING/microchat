<template>
  <div>
    <a-drawer
        title="个人信息"
        :width="360"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
    >
      <a-form :form="form" layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            姓名-->
            <a-form-item label="昵称">
              <a-input
                  placeholder="请输入昵称"
                  v-model="userInfo.nickname"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            用户id-->
            <a-form-item label="用户ID">
              <a-input :disabled="true" v-model="this.$store.state.userId"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="20">
<!--            个性签名-->
            <a-form-item label="个性签名">
              <a-input
                  placeholder="无个性，不签名" v-model="userInfo.signature"
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
                  v-model="userInfo.sex"
              >
                <a-select-option value="1">
                  男
                </a-select-option>
                <a-select-option value="2">
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
                  placeholder="请输入你的手机号码" v-model="userInfo.phoneNumber"
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
                  v-model="userInfo.dateOfBirth"
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
          取消
        </a-button>
        <a-button type="primary" @click="submit">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import './PersonalInformation.scss'
import {setUserInfo} from '@/config/optionsIm'
import {mapState} from "vuex";

export default {
  name: "PersonalInformation",
  data(){
    return {
      form: this.$form.createForm(this),
      visible: false,
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  watch: {
    show(nV){
      this.visible = nV
    }
  },
  props:['show'],
  methods:{
    // 传参到父组件，否则下次打开个人信息要双击
    onClose() {
      this.visible = false;
      this.$emit('onclose',this.visible)
    },
    // 修改个人信息
    submit(){
      if (this.userInfo){
        setUserInfo(this.userInfo)
      }
      this.$message.success('修改成功')
      this.onClose()
    }
  },
}
</script>

<style scoped>

</style>