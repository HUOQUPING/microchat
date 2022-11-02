import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: String,
        //列表
        List: [{
            name: "好友",
            arr: []
        }, {
            name: "群组",
            arr: []
        }, {
            name: "聊天室",
            arr: []
        }],
        //用户名
        userId: '用户名',
        //聊天内容
        charArr: [],
        // 个人信息
        userInfo: {
            nickname: '',
            // 个性签名
            signature: '',
            // 性别
            sex: '',
            // 手机号码
            phoneNumber: '',
            // 出生日期
            dateOfBirth: ''
        },
        //查询个人信息
        userMsg:[]
    },
    getters: {},
    mutations: {
        // 设置cookie
        setToken(state, token) {
            state.token = token
        },
        // 保存好友列表
        setList(state, res) {
            state.List[0].arr = res
        },
        setGroupList(state, res) {
            state.List[1].arr = res
        },
        setRoomList(state, res) {
            state.List[2].arr = res
        },
        setUserId(state, name) {
            state.userId = name
        },
        setCharArr(state, msg) {
            let i = state.charArr.findIndex(item => item.to === msg.to)
            if (i === -1) {
                let opt = {
                    to: msg.to,
                    arr: []
                }
                opt.arr.push(msg)
                state.charArr.push(opt)
            } else if (i !== -1) {
                state.charArr[i].arr.push(msg)
            }
        }

    },
    actions: {},
    modules: {}
})
