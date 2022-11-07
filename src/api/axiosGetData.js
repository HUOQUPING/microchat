import axios from 'axios'
import store from "@/store";

/**
 * 获取WebIM管理员的token
 */
export const getAdminToken = () => {
    const options = {
        method: 'POST',
        url: 'http://a1.easecdn.com/1183221025099577/demo/token',
        data: {
            grant_type: 'client_credentials',
            client_id: 'YXA6iODtHdgbTNycDtlNHQrdtA',
            client_secret: 'YXA6Qv71u9Hgfh3ZOdgipuRhKQz9Z-I',
            ttl: '360'
        }
    };
    axios.request(options).then(function (response) {
        store.state.access_token = response.data.access_token
        if (store.state.access_token) {
            console.log('access_token')
        }
    }).catch(function (error) {
        console.error(error);
    });
}

/**
 * 获取超级管理员权限
 * @param {String} userId [用户Id]
 */

export const getSuperAdmin = (userId) => {
    const options = {
        method: 'POST',
        url: 'http://a1.easemob.com/1183221025099577/demo/chatrooms/super_admin',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${store.state.access_token}`,
        },
        data: {superadmin: userId}
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

/**
 * 获取验证码
 * @param {Number} phoneNum [要发送验证码的手机号]
 * @param {Number} code [随机验证码]
 */

export const getSMS = (phoneNum, code) => {
    const options = {
        method: 'POST',
        url: 'http://a1.easecdn.com/1183221025099577/demo/sms/send',
        headers: {
            Authorization: `Bearer ${store.state.access_token}`,
            'Content-Type': 'application/json'
        },
        data: {mobiles: [phoneNum], tid: '1080', tmap: {code: code}}
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

}