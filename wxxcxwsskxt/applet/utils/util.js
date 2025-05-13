const config = require('./constants');
const ext = require('./extend.js');
const { isFunction, isArray, isObject, inArray, isString, empty, isset} = ext
import {httpGet} from '../request/request';


const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}


function getCurrentRouteQuery()
{
    try{
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1];
        return currentPage.options;
    }catch(e){
    }
    return {};
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

const handlerKeyValue = list => {
    var result = {};
    for (var i = 0; i < list.length; i++) {
        var ci = list[i];
        result[ci.id] = ci;
    }
    return result;
}

function findIndex(arr, callback) {
    if (!isFunction(callback)) {
        throw new Error('findObject第二个参数是回调函数');
    }
    for (var i in arr) {
        var ci = arr[i];
        if (callback(ci, i)) {
            return i;
        }
    }
    return false;
}

export function substr(str , length)
{
    if(!str) return "";
    var s = formatHtml(str);
    if(s.length > length){
        return s.substr(0,length)+'...';
    }
    return s;
}



function findObject(arr, callback) {
    if (!isFunction(callback)) {
        throw new Error('findObject第二个参数是回调函数');
    }
    for (var i in arr) {
        var ci = arr[i];
        if (callback(ci, i)) {
            return ci;
        }
    }
    return false;
}


function remove(arr, key) {
    if (isObject(key) || isArray(key)) {
        var index = findIndex(arr, r => r === key);
        if (index !== false) {
            remove(arr, index)
        }
    } else {
        arr.splice(key, 1);
    }
}

function formatImageSrc(value) {
    if(isArray(value)){
        value = value[0];
    }
    if (!value) return '';
    if (value.indexOf("data:image") === 0) {
        return value
    }
    if (value.indexOf('/') === 0) {
        return config.fileHost + value;
    }

    var url = value;

    if (!url.match(/^https?:\/\//ig)) {
        return config.fileHost + '/' + value;
    }
    return url;
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        match = match.replace(/src="(.*?)"/ig, function ($0, $1) {
            var src = formatImageSrc($1);
            return `src="${src}"`
        });
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
    return newContent;
}

function formatHtml( html )
{
    var regex = /(<([^>]+)>)/ig;
    return html.replace(regex , '');
}

function model(content){
    return new Promise((resolve , reject)=>{
        wx.showModal({
            title: '温馨提示：',
            content: content,
            success(re){
                if(re.confirm){
                    resolve()
                }else{
                    reject(re.confirm);
                }
            },
            fail:err=>{
                reject(err);
            }
        })
    })
}



export const setCache = (key, data) => {
    wx.setStorageSync(key, data)
}

export const getCache = (key) => {
    return wx.getStorageSync(key)
}

export const removeCache = (key) => {
    wx.removeStorageSync(key)
}

/**
 * 版本号比较
 * @param {String} version1
 * @param {String} version2
 * @return {number}
 */
export function compareVersions(version1, version2) {
    // 将版本号字符串分割成数组
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);

    // 获取最小的版本号部分长度
    const maxLength = Math.min(v1Parts.length, v2Parts.length);

    for (let i = 0; i < maxLength; i++) {
        // 如果某个版本号部分不存在，则视为 0
        const v1 = v1Parts[i] || 0;
        const v2 = v2Parts[i] || 0;

        if (v1 > v2) {
            return 1; // version1 大于 version2
        } else if (v1 < v2) {
            return -1; // version1 小于 version2
        }
    }

    return 0; // 两个版本号相等
}

/**
 * 获取微信小程序获取用户昵称和头像的类型
 */
export function getInfoType()
{
    var sdkVersion = getSdkVersion();
    var sdkType;
    if(compareVersions(sdkVersion,'2.21.2') >= 0){
        sdkType = 'choose';
    }else if(compareVersions(sdkVersion,'2.10.4') >= 0){
        sdkType = 'profile';
    }else{
        // 最老的版本获取方式
        sdkType = 'info';
    }
    return sdkType;
}


var openid = '';
export function getWxOpenid()
{
    return new Promise((resolve,reject)=>{
        if(openid){
            resolve(openid);
        }else{
            wx.login({
                success:(res)=>{
                    httpGet(config.wxopenid , {code:res.code,t:Date.now()}).then(res=>{
                        if(res.code == 0){
                            openid = res.data;
                            resolve(openid);
                        }else{
                            reject(res.msg);
                        }
                    }).catch(err=>{
                        reject(err.message);
                    });
                },
                fail:(err)=>{
                    reject(err.errMsg);
                }
            })
        }
    });
}

export function wxLogin(){
    return new Promise((resolve,reject)=>{

        wx.login({
            success: (res) => {
                httpGet( config.wxlogin , {code:res.code,t:Date.now()}).then(res=>{
                    // 保存当前openid
                    if(res.code == 5){
                        openid = res.msg;
                    }
                    resolve(res);
                },err=>{
                    reject(err);
                })
            },
            fail:(err=>{
                reject(err);
            })
        })
    });

}

/**
 * 获取当前微信sdk版本号，做版本兼容
 * @return {String}
 */
export function getSdkVersion(){
    var info;
    if(wx.getAppBaseInfo){
        info = wx.getAppBaseInfo();
    }else{
        info = wx.getSystemInfoSync();
    }
    return info.SDKVersion;
}

var loginTimer = null;
function checkGoLogin()
{
    const app = getApp();
    if(!app.isLogin()){
        clearTimeout(loginTimer);
        setTimeout(()=>{
            wx.redirectTo({
                url: '/pages/login/login',
            });
        },200);
        return true;
    }
    return false;
}

module.exports = {
    checkGoLogin,
    formatTime,
    findIndex,
    findObject,
    model,
    handlerKeyValue,
    remove,
    formatImageSrc,
    substr,
    getCurrentRouteQuery,
    formatRichText,
    formatHtml,
    setCache,
    compareVersions,
    getSdkVersion,
    getInfoType,
    wxLogin,
    getWxOpenid,
    getCache,
    removeCache,
    ...ext
}
