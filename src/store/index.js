import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: String,
        //列表
        GoodFriendsList:[],
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
            state.GoodFriendsList = res
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
