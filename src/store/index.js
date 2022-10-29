import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: String,
        //好友列表
        goodfriendsList:[],
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
            state.goodfriendsList = res
        },
        setUserName(state,name){
            state.userName = name
        },
        setCharArr(state,arr){
            state.charArr = arr
        }

    },
    actions: {},
    modules: {}
})
