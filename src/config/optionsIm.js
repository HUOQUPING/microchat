import cookie from 'vue-cookie'
import WebIm from 'easemob-websdk'
import store from "@/store";
import config from "@/webim.config";

WebIm.config = config;
WebIm.conn = new WebIm.connection({
    // 注意这里的 "K" 需大写。
    appKey: '1183221025099577#demo',
    isHttpDNS: WebIm.config.isHttpDNS,
    isMultiLoginSessions: WebIm.config.isMultiLoginSessions,
    https: WebIm.config.https,
    url: WebIm.config.socketServer,
    apiUrl: WebIm.config.restServer,
    isAutoLogin: WebIm.config.isAutoLogin,
    autoReconnectNumMax: WebIm.config.autoReconnectNumMax,
    autoReconnectInterval: WebIm.config.autoReconnectInterval,
    delivery: WebIm.config.delivery,
    useOwnUploadFun: WebIm.config.useOwnUploadFun

})

WebIm.conn.addEventHandler("eventName",{
    onOpened: function () {
    },                  //连接成功回调
    onClosed: function () {
    },                  //连接关闭回调
    onTextMessage: function (message) {
        //id 会话id msg 内容 time 时间戳 from 发送方 to 接收方 chatType 会话类型
        store.commit("setCharArr",message)
    },    //收到文本消息
    onEmojiMessage: function (message) {
        console.log(message)
    },   //收到表情消息
    onPictureMessage: function (message) {
        console.log(message)
    }, //收到图片消息
    onCmdMessage: function (message) {
        console.log(message)
    },     //收到命令消息
    onAudioMessage: function (message) {
        console.log(message)
    },   //收到音频消息
    onLocationMessage: function (message) {
        console.log(message)
    },//收到位置消息
    onFileMessage: function (message) {
        console.log(message)
    },    //收到文件消息
    onCustomMessage: function (message) {
        console.log(message)
    },  //收到自定义消息
    onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIm.utils.parseDownloadResponse.call(WebIm.conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIm.utils.download.call(WebIm.conn, option);
    },   //收到视频消息
    onPresence: function (message) {
        console.log(message)
    },       //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {
        console.log(message)
    },         //处理好友申请
    onInviteMessage: function (message) {
        console.log(message)
    },  //处理群组邀请
    onOnline: function () {
    },                  //本机网络连接成功
    onOffline: function () {
    },                 //本机网络掉线
    onError: function (message) {
        console.log(message)
    },          //失败回调
    onBlacklistUpdate: function (list) {       //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onRecallMessage: function (message) {
        console.log(message)
    },      //收到撤回消息回调
    onReceivedMessage: function (message) {
        console.log(message)
    },    //收到消息送达服务器回执
    onDeliveredMessage: function (message) {
        console.log(message)
    },   //收到消息送达客户端回执
    onReadMessage: function (message) {
        console.log(message)
    },        //收到消息已读回执
    onCreateGroup: function (message) {
        console.log(message)
    },        //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {
        console.log(message)
    },       //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    onChannelMessage: function (message) {
        console.log(message)
    }      //收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
});

//账号密码登录
export let getUserConfig = (username, password) => {
    WebIm.conn.open({user: username, pwd: password}).then((res) => {
        console.log(res)
        let msg = {
            token: res.accessToken,
            userId: username
        }
        cookie.set('token', JSON.stringify(msg), 1)
        store.commit("setUserName", username)
        console.log("账号登录")
    }).catch((err) => {
        console.log(err)
    })
}

//账号token登录
export let tokenLogin = (username, asscctoken) => {
    WebIm.conn.open({user: username, accessToken: asscctoken}).then((res) => {
        store.commit("setUserName", username)
        getGoodFriends()
        getGroups()
        getRooms()
        console.log("token登录", res)
    }).catch((reason) => {
        console.log("login fail", reason);
    });
}


//注册
export let regUser = (username, password) => {
    WebIm.conn.registerUser({username: username, password: password}).then((res) => {
        console.log(res)
        console.log('注册成功')
    }).catch((err) => {
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
        store.commit('setGoodFriendsList', res.data)
        console.log("好友列表",res.data)
    })
}

//获取群列表
export let getGroups = () => {
    WebIm.conn.getJoinedGroups( {
        pageNum: 1,
        pageSize: 20,
        needAffiliations: false,
        needRole: false,
    }).then((res) => {
        store.commit('setGroupList', res.data)
        console.log("群列表",res.data)
    })
}

//获取聊天室
export  let getRooms  = () => {
    let opt = {
        pagenum:1,
        pagesize:20
    }
    WebIm.conn.getChatRooms(opt).then((res) => {
        store.commit('setRoomList', res.data)
        console.log("聊天室",res.data)
    })
}

//获取个人信息
export let getUser = (id) => {
    //第一个参数用户id，第二个想要查询的内容
    WebIm.conn.fetchUserInfoById(id).then((res) => {
        console.log(res)
    })
}

//发送消息
export let sendMessage = (msg, chatType, ID,useName) => {
//msg 发送的内容  chatType 会话类型  ID 接收方
    let option = {
        type: "txt",
        msg: msg,
        from:useName,
        to: ID,
        chatType: chatType
    }

    let Msg = WebIm.message.create(option)
    WebIm.conn.send(Msg).then(() => {
        console.log(`${ID}已经接收到消息`)
        //id 会话id msg 内容 time 时间戳 from 发送方 to 接收方 chatType 会话类型
        store.commit("setCharArr",Msg)
    }).catch((e) => {
        console.log("发送失败", e)
    })

    // WebIm.conn.getConversationlist().then((res) => {
    //     console.log("漫游消息",res)
    // })
}

//存储消息
export  let setMsgArr = () => {

}






