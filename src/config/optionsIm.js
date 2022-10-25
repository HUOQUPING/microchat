import cookie from 'vue-cookie'
import WebIm from 'easemob-websdk'

WebIm.conn = new WebIm.connection({
    // 注意这里的 "K" 需大写。
    appKey: '1183221025099577#demo',
})



export let getUserConfig = (username, password) => {
    console.log(username, password)
    WebIm.conn.open({user: username, pwd: password}).then((res) => {
        console.log(res)
        alert(res.accessToken)
        cookie.set('token',res.accessToken,1)
    }).catch((e) => {
        console.log(e)
        alert('N')
    })
}




