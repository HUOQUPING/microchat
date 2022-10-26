import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: String,
        goodfriendsList:[],
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setGoodFriendsList(state,res){
            state.goodfriendsList = res
        }

    },
    actions: {},
    modules: {}
})
