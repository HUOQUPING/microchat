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
        setCharArr(state,arr){
            state.charArr.push(arr)
        }

    },
    actions: {},
    modules: {}
})
