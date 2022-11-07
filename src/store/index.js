import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // WebIM管理员Token
        access_token:String,
        // 注册状态
        registerCode:0,
        // 用户token
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
        },{
            name: "黑名单",
            arr:[]
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
        userMsg:[],
        //聊天室
        chatRoom:[]
    },
    getters: {},
    mutations: {
        // 设置cookie
        setToken(state, token) {
            state.token = token
        },
        // 保存好友列表
        setList(state, res) {
              let arr  = res.filter((item) => {
                return !state.List[3].arr.some(t => t === item)
            })
            //延迟赋值，避免黑名单获取慢，没进行筛选
            setTimeout(() => {
                state.List[0].arr = arr
            },1000)

        },
        addList(state,res){
            state.List[0].arr.push(res)
        },
        removeList(state,res){
            state.List[0].arr = state.List[0].arr.filter(item => item !== res)
        },
        //获取全部群
        setGroupList(state, res) {
            state.List[1].arr = res
        },
        //获取黑名单
        setBlackList(state,res){
            state.List[3].arr = res
        },
        removeBlckList(state,res){
            state.List[3].arr = state.List[3].arr.filter(item => item !== res)
        },
        addBlackList(state,res){
            state.List[3].arr.push(res)
        },
        //添加群时用
        addGroupList(state,res){
            state.List[1].arr.push(res)
        },
        //加入聊天室
        setRoomList(state, res) {
            state.List[2].arr.push(res)
        },
        setUserId(state, name) {
            state.userId = name
        },
        setCharArr(state, msg) {
            let i = state.charArr.findIndex(item => item.to === msg.to)
            let l = state.charArr.findIndex(item => item.to === msg.from)
            if (l !== -1){
                state.charArr[l].arr.push(msg)
            }
            if (i === -1) {
                let opt = {
                    to: msg.to,
                    from:msg.from,
                    arr: []
                }
                opt.arr.push(msg)
                state.charArr.push(opt)
            } else if (i !== -1) {
                state.charArr[i].arr.push(msg)
            }

        },
        setUserMsg(state,msg){
            state.userMsg = msg
        },
        setChatRoom(state,msg){
            state.chatRoom = msg
        }
    },
    actions: {},
    modules: {}
})
