import cookie from 'vue-cookie'
import WebIm from 'easemob-websdk'

WebIm.conn = new WebIm.connection({
    // 注意这里的 "K" 需大写。
    appKey: '1183221025099577#demo',
})

export let getUserConfig = (username, password) => {
    WebIm.conn.open({user:username,pwd:password}).then((res) => {
        console.log(res)
        console.log('登录成功')
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




