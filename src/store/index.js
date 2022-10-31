import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: String,
        //列表
        List:[ {
            name:"好友",
            arr:[]
        },{
            name:"群组",
            arr:[]
        },{
            name:"聊天室",
            arr:[]
        }],
        //用户名
        userName:'用户名',
        //聊天内容
        charArr:[]
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setGoodFriendsList(state,res){
            state.List[0].arr = res
        },
        setGroupList(state,res){
            state.List[1].arr = res
        },
        setRoomList(state,res){
            state.List[2].arr = res
        },
        setUserName(state,name){
            state.userName = name
        },
        setCharArr(state,msg){
            let i = state.charArr.findIndex(item => item.to === msg.to)
            if (i === -1){
                let opt = {
                    to:msg.to,
                    arr:[]
                }
                opt.arr.push(msg)
                state.charArr.push(opt)
            }else if (i !== -1){
                state.charArr[i].arr.push(msg)
            }
        }

    },
    actions: {},
    modules: {}
})
