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

//消息回调
WebIm.conn.addEventHandler("eventName", {
    onOpened: function () {
    },                  //连接成功回调
    onClosed: function () {
    },                  //连接关闭回调
    onTextMessage: function (message) {
        //id 会话id msg 内容 time 时间戳 from 发送方 to 接收方 chatType 会话类型

        store.commit("setCharArr", message)
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

//好友请求回调
WebIm.conn.addEventHandler("contactEvent", {
    // 当前用户收到好友请求。用户 B 向用户 A 发送好友请求，用户 A 收到该事件。
    onContactInvited: function (msg) {
        console.log(msg)
    },
    // 当前用户被其他用户从联系人列表上移除。用户 B 将用户 A 从联系人列表上删除，用户 A 收到该事件。
    onContactDeleted: function (msg) {
        console.log(msg)
    },
    // 当前用户新增了联系人。用户 B 向用户 A 发送好友请求，用户 A 同意该请求，用户 A 收到该事件，而用户 B 收到 `onContactAgreed` 事件。
    onContactAdded: function (msg) {
        console.log(msg)
    },
    // 当前用户发送的好友请求被拒绝。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，拒绝加好友，则用户 A 收到该事件。
    onContactRefuse: function (msg) {
        console.log(msg)
    },
    // 当前用户发送的好友请求经过了对方同意。用户 A 向用户 B 发送好友请求，用户 B 收到好友请求后，同意加好友，则用户 A 收到该事件。
    onContactAgreed: function (msg) {
        console.log(msg)
    },
});

//账号密码登录
export let getUserConfig = (userId, password) => {
    WebIm.conn.open({user: userId, pwd: password}).then((res) => {
        console.log(res)
        let msg = {
            token: res.accessToken,
            userId: userId
        }
        cookie.set('token', JSON.stringify(msg), 1)
        store.commit("setUserId", userId)
        getUserInfo(userId)
        console.log("账号登录成功")
    }).catch((err) => {
        console.log(err)
    })
}

//账号token登录
export let tokenLogin = (userId, asscctoken) => {
    WebIm.conn.open({user: userId, accessToken: asscctoken}).then((res) => {
        store.commit("setUserId", userId)
        getGoodFriends()
        getGroups()
        getRooms()
        getUserInfo(userId)
        blackFriends()
        console.log("token登录", res)
    }).catch((reason) => {
        console.log("login fail", reason);
    });
}

//注册
export let regUser = (userId, password) => {
    const options = {
        username: userId,
        password: password,
        nickname: userId,
    };
    WebIm.conn.registerUser(options).then((res) => {
        console.log(res.application)
        store.state.registerCode = 200
    }).catch((err) => {
            let errorData = JSON.parse(err.data);
            if (errorData.error === 'duplicate_unique_property_exists') {
                console.log('用户已存在！');
                store.state.registerCode = 400
            } else if (errorData.error === 'illegal_argument') {
                if (errorData.error_description === 'USERNAME_TOO_LONG') {
                    console.log('用户名超过64个字节！')
                } else {
                    console.log('用户名不合法！')
                }
            } else if (errorData.error === 'unauthorized') {
                console.log('注册失败，无权限！')
            } else if (errorData.error === 'resource_limited') {
                console.log('您的App用户注册数量已达上限,请升级至企业版！')
            }

        }
    );
}

//退出
export let close = () => {
    WebIm.conn.close()
    cookie.delete('token')
}

//获取好友列表
export let getGoodFriends = () => {
    WebIm.conn.getContacts().then((res) => {
        setTimeout(() => {
            store.commit('setList', res.data)
        },1000)
        console.log("好友列表", res.data)
    })
}

//获取群列表
export let getGroups = () => {
    //needAffiliations needRole 不知道什么参数 文档为true 获取不到 为false 才能获取
    WebIm.conn.getJoinedGroups({
        pageNum: 1,
        pageSize: 20,
        needAffiliations: false,
        needRole: false,
    }).then((res) => {
        store.commit('setGroupList', res.data)
        console.log("群列表", res.data)
    })
}

//获取聊天室
export let getRooms = () => {
    let opt = {
        pagenum: 1,
        pagesize: 20
    }
    WebIm.conn.getChatRooms(opt).then((res) => {
        store.commit("setChatRoom", res.data)
        console.log("聊天室", res.data)
    })
}

//发送消息
export let sendMessage = (msg, chatType, ID, useName) => {
//msg 发送的内容  chatType 会话类型  ID 接收方
    let option = {
        type: "txt",
        msg: msg,
        from: useName,
        to: ID,
        chatType: chatType
    }

    let Msg = WebIm.message.create(option)
    WebIm.conn.send(Msg).then(() => {
        console.log(`${ID}已经接收到消息`)
        //id 会话id msg 内容 time 时间戳 from 发送方 to 接收方 chatType 会话类型
        store.commit("setCharArr", Msg)
    }).catch((e) => {
        console.log("发送失败", e)
    })
}

//获取个人信息
export let getUserInfo = (id) => {
    //第一个参数用户id，第二个想要查询的内容
    WebIm.conn.fetchUserInfoById(id).then((res) => {
        console.log('获取个人信息', res.data)
        store.commit("setUserMsg", res.data)
    })
}

// 设置个人信息
export let setUserInfo = (option) => {
    console.log(option)
    WebIm.conn.updateUserInfo(option).then((res) => {
        console.log('设置个人信息', res)
    })
}

//加好友
export let addContact = (id) => {
    WebIm.conn.addContact(id, '加个好友呗!')
}

//加群
export let joinGroup = (opt) => {
    WebIm.conn.joinGroup(opt).then((res) => {
        console.log("已发送群申请", res)
    })
}

//聊天记录
export let chatHistory = () => {
    WebIm.conn.getConversationlist().then((res) => {
        console.log('调出聊天记录', res)
    })
}

//创建群
export let SetupGroup = (groupname, desc, ifpublic, approval) => {
//groupname 群名字 desc 群简介 ifpublic 是否公开 approval 是否需要批准
    let opt = {
        data: {
            groupname: groupname,
            desc: desc,
            mebers: store.state.userId,
            public: ifpublic === 1,
            approval: approval === 1,
            allowinvites: true,
            inviteNeedConfirm: true,
            maxusers: 500
        }
    }
    WebIm.conn.createGroup(opt).then((res) => {
        console.log("已创建群聊", res)
        store.commit("addGroupList", groupname)
    })
}

//删除好友
export let delFriends = (id) => {
    store.state.List[0].arr = store.state.List[0].arr.filter(item => item !== id)
    WebIm.conn.deleteContact(id)
}

//获取黑名单
export let blackFriends = () => {
    WebIm.conn.getBlocklist().then((res) => {
        console.log("黑名单", res.data)
        store.commit("setBlackList", res.data)
    })
}

//移出黑名单
export let removeblackFrinends = (id) => {
    WebIm.conn.removeUserFromBlocklist({
        name: id
    })
    store.commit("removeBlckList", id)
    store.commit("addList", id)
    console.log(id, "已移除黑名单")
}

//加入黑名单
export let addblackFriends = (id) => {
    WebIm.conn.addUsersToBlocklist({
        name: id
    })
    console.log(id, "已加入黑名单")
    store.commit("removeList", id)
    store.commit("addBlackList", id)
}

//加入聊天室
export let addChatRoom = (id, name) => {
    let opt = {
        roomId: id,
        message: 'reason'
    }
    WebIm.conn.joinChatRoom(opt).then((res) => {
        let opt = {
            ...res.data,
            name: name
        }
        store.commit('setRoomList', opt)
        console.log("已加入聊天室", res)
    })
}

//获取群详情
export let getGroupInfo = (id) => {
    let opt = {
        groupId:id
    }
    WebIm.conn.getGroupInfo(opt).then((res) => {
        store.commit("setGroupInfo",res.data[0])
        console.log("群详情",res.data)
        getGroupList(id)
    })
}

//获取群成员列表
export let getGroupList = (id) => {
    let pageNum = 1
    let pageSize = 100
    let opt = {
        pageNum:pageNum,
        pageSize:pageSize,
        groupId: id
    }
    WebIm.conn.listGroupMembers(opt).then((res) => {
        store.commit("setGroupMember",res.data.reverse())
        console.log("群成员列表",res.data)
    })
}

//解散群组
export let dissolveGroup = (id) => {
    let opt = {
        groupId:id
    }
    WebIm.conn.destroyGroup(opt).then((res) => {
        store.commit("removeGroup",id)
        console.log("群组已经解散",res)
    })
}

//群踢人
export let removeGroupMemver = (gid,uid) => {
    let opt = {
        groupId:gid,
        username:uid
    }
    WebIm.conn.removeGroupMember(opt).then((res) => {
        store.commit("removeGroupMember",uid)
        console.log(`${uid}已被提出${gid}`,res)
    })
}

//退出群聊
export let leaveGroup = (id) => {
    let opt = {
        groupId:id
    }
    WebIm.conn.leaveGroup(opt).then((res) => {
        store.commit("removeGroup",id)
        console.log("已退出群聊",res)
    })
}

//获取聊天室详情
export let getChatRoomInfo = (id) => {
    let opt = {
        chatRoomId:id
    }
    WebIm.conn.getChatRoomDetails(opt).then((res) => {
        store.commit("chatRoomInfo",res.data[0])
        getChatRoomMember(id)
        console.log("聊天室详情",res.data[0])
    })
}

//聊天室成员
export let getChatRoomMember = (id) => {
    let option = {
        pageNum: 1,
        pageSize: 10,
        chatRoomId: id
    }
    WebIm.conn.listChatRoomMembers(option).then(res => {
        store.commit("chatRoomMember",res.data)
        console.log("聊天室成员",res.data)
    })
}

//踢出聊天室
export let removeChatRoomMember = (cid,uid) => {
    let opt = {
        chatRoomId:cid,
        username:uid
    }
    WebIm.conn.removeChatRoomMember(opt).then(res => {
        console.log(`已将${uid}移除${cid}`,res)
    })
}

//退出聊天室
export let leaveChatRoom = (id) => {
    let opt = {
        roomId:id
    }
    WebIm.conn.leaveChatRoom(opt).then(res => {
        store.commit("leaveChatRoom",id)
        console.log("已退出聊天室",res)
    })
}

//解散聊天室
export let dissolveChatRoom = (id) => {
    let opt = {
        chatRoomId:id
    }
    WebIm.conn.destroyChatRoom(opt).then(res => {
        store.commit("removeChatRoom",id)
        console.log("已解散聊天室",res)
    })
}



