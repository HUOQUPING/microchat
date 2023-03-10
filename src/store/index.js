import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // WebIM管理员Token
        access_token: String,
        // 超级管理员列表
        superAdminArr: [],
        // 注册状态
        registerCode: 0,
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
        }, {
            name: "黑名单",
            arr: []
        }],
        //用户名
        userId: '用户名',
        //聊天内容
        charArr: [],
        //消息提醒
        msgTips:{},
        // 监听好友状态事件参数
        friendsEventVal: [],
        // 个人信息
        userInfo: {
            nickname: null,
            // 个性签名
            sign: null,
            // 性别
            gender: null,
            // 手机号码
            phone: null,
            // 出生日期
            birth: null
        },
        //对方的个人信息
        friendsInfo: {
            nickname: "未设置",
            // 个性签名
            sign: "未设置",
            // 性别
            gender: "未设置",
            // 手机号码
            phone: "未设置",
            // 出生日期
            birth: "未设置"
        },
        //聊天室
        chatRoom: [],
        //群详情
        groupInfo: [],
        //群成员
        groupMember: [],
        //聊天室详情
        chatRoomInfo: [],
        //聊天室成员
        chatRoomMember: [],
        //聊天记录
        chatHistoryArr:[]
    },
    getters: {
        // 监听好友状态事件的状态
        friendsEventStatus(state) {
            if (state.friendsEventVal.length == 0) {
                return false
            }
            if (state.friendsEventVal) {
                return true
            }
        },
    },
    mutations: {
        // 设置cookie
        setToken(state, token) {
            state.token = token
        },
        setSuperAdminList(state, arr) {
            state.superAdminArr = arr
        },
        setAccessToken(state, arr) {
            state.access_token = arr
        },
        // 保存好友列表
        setList(state, res) {
            let arr = res.filter((item) => {
                return !state.List[3].arr.some(t => t === item)
            })
            //延迟赋值，避免黑名单获取慢，没进行筛选
            setTimeout(() => {
                state.List[0].arr = arr
            }, 1000)

        },
        //设置个人信息
        setuserInfo(state, opt) {
            state.userInfo = opt
        },
        //获取个人信息
        getuserInfo(state, opt) {
            state.userInfo = opt
        },
        //设置好友信息
        getfriendsInfo(state, opt) {
            if (opt.nickname) {
                state.friendsInfo.nickname = opt.nickname
            } else {
                state.friendsInfo.nickname = "未设置"
            }
            if (opt.sign) {
                state.friendsInfo.sign = opt.sign
            } else {
                state.friendsInfo.sign = "未设置"
            }
            if (opt.gender) {
                state.friendsInfo.gender = opt.gender
            } else {
                state.friendsInfo.gender = "未设置"
            }
            if (opt.phone) {
                state.friendsInfo.phone = opt.phone
            } else {
                state.friendsInfo.phone = "未设置"
            }
            if (opt.birth) {
                state.friendsInfo.birth = opt.birth
            } else {
                state.friendsInfo.birth = "未设置"
            }
        },
        //获取好友列表
        addList(state, res) {
            state.List[0].arr.push(res)
        },
        //监听好友状态事件传参方法
        friendsEventValFunc(state, res) {
            state.friendsEventVal.map((t,i)=>{
                if (t.from == res.from){
                    state.friendsEventVal.splice(i,1)
                }
            })
            state.friendsEventVal = [...state.friendsEventVal, res]
        },
        /*
        // 监听好友状态事件的状态
        friendsEventStatusFunc(state, res) {
            state.friendsEventStatus = res
        },
        */
        //删除已经处理好友状态事件
        delFriendEventFunc(state, res) {
            state.friendsEventVal.map((t,i)=>{
                if (t.from == res){
                    state.friendsEventVal.splice(i,1)
                }
            })
        },
        //消息提醒
        msgTipsFunc(state,res){
            state.msgTips = res
        },
        //移除好友
        removeList(state, res) {
            state.List[0].arr = state.List[0].arr.filter(item => item !== res)
        },
        //获取全部群
        setGroupList(state, res) {
            state.List[1].arr = res
        },
        //获取黑名单
        setBlackList(state, res) {
            state.List[3].arr = res
        },
        //移除黑名单
        removeBlckList(state, res) {
            state.List[3].arr = state.List[3].arr.filter(item => item !== res)
        },
        //添加黑名单
        addBlackList(state, res) {
            state.List[3].arr.push(res)
        },
        //添加群时用
        addGroupList(state, res) {
            state.List[1].arr.push(res)
        },
        //加入聊天室
        setRoomList(state, res) {
            state.List[2].arr.push(res)
        },
        //设置用户id
        setUserId(state, name) {
            state.userId = name
        },
        //设置聊天内容
        setCharArr(state, msg) {
            let i = state.charArr.findIndex(item => item.to === msg.to)
            let l = state.charArr.findIndex(item => item.to === msg.from)
            if (l !== -1) {
                state.charArr[l].arr.push(msg)
            }
            if (i === -1) {
                let opt = {
                    to: msg.to,
                    from: msg.from,
                    arr: [],
                    ifFile: msg.ifFile
                }
                opt.arr.push(msg)
                state.charArr.push(opt)
            } else if (i !== -1) {
                state.charArr[i].arr.push(msg)
            }

        },
        //设置聊天室
        setChatRoom(state, msg) {
            state.chatRoom = msg
        },
        //设置群详情
        setGroupInfo(state, msg) {
            state.groupInfo = msg
        },
        //设置群成员
        setGroupMember(state, msg) {
            state.groupMember = msg
        },
        //移除群
        removeGroup(state, id) {
            state.List[1].arr = state.List[1].arr.filter(item => item.groupid !== id)
        },
        //移除群成员
        removeGroupMember(state, id) {
            state.groupMember = state.groupMember.filter(item => item !== id)
        },
        //聊天室详情
        chatRoomInfo(state, msg) {
            state.chatRoomInfo = msg
        },
        //聊天室成员
        chatRoomMember(state, msg) {
            state.chatRoomMember = msg
        },
        //移除聊天室
        removeChatRoom(state, id) {
            state.chatRoom = state.chatRoom.filter(item => item.id !== id)
        },
        //退出聊天室
        leaveChatRoom(state, id) {
            state.List[2].arr = state.List[2].arr.filter(item => item.id !== id)
        },
        //聊天记
        chatHistoryArr(state,msg){
            state.chatHistoryArr = msg.messages.reverse()
            // console.log('vuex取到聊天记录:',state.chatHistoryArr)
        }
    },
    actions: {},
    modules: {}
})
