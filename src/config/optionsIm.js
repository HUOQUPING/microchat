import cookie from 'vue-cookie'
import WebIm from 'easemob-websdk'
import store from "@/store";

WebIm.conn = new WebIm.connection({
    // 注意这里的 "K" 需大写。
    appKey: '1183221025099577#demo',
})

export let getUserConfig = (username, password) => {
    WebIm.conn.open({user:username,pwd:password}).then((res) => {
        console.log(res)
        cookie.set('token',res.accessToken,1)
    }).catch((err) => {
        console.log(err)
    })
}

export let regUser = (username,password)=>{
    WebIm.conn.registerUser({username:username,password:password}).then((res)=>{
        console.log(res)
        console.log('注册成功')
    }).catch((err)=>{
        console.log(err)
    })
}

//退出
export let close = () => {
    WebIm.conn.close()
    cookie.delete('token')
}


//获取好友列表
export let getGoodFriends = () => {
    WebIm.conn.getContacts().then((res) => {
        console.log(res.data)
        store.commit('setGoodFriendsList',res.data)
    })
}

//获取个人信息
export  let getUser = () => {
    WebIm.conn.fetchUserInfoById("admin").then((res) => {
        console.log(res)
    })
}




