import config from './webim.config'
import websdk from 'easemob-websdk'



// 初始化IM SDK
let WebIm = {};
WebIm = window.WebIm = websdk;
WebIm.config = config;
WebIm.conn = new WebIm.connection({
    isReport: false,
    appKey: WebIm.config.appkey,
    isMultiLoginSessions: WebIm.config.isMultiLoginSessions,
    https: WebIm.config.https,
    isAutoLogin: true,
    heartBeatWait: WebIm.config.heartBeatWait,
    autoReconnectNumMax: WebIm.config.autoReconnectNumMax,
    autoReconnectInterval: WebIm.config.autoReconnectInterval,
    isStropheLog: WebIm.config.isStropheLog,
    delivery: WebIm.config.delivery,
});


export default WebIm