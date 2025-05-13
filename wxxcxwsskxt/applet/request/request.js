const constants = require("../utils/constants.js");

export function httpPost(url, data, params) {
    return request({
        url,
        data: JSON.stringify(data),
        method: "post",
        ...params,
    });
}

export function httpGet(url, query, params) {
    return request({
        url,
        data: query,
        method: "GET",
        ...params,
    });
}

function formatHttp(value) {
    if (!value) return "";
    if (value.indexOf("data:image") === 0) {
        return value;
    }
    if (value.indexOf("/") === 0) {
        return constants.host + value;
    }
    var url = value;
    if (!url.match(/^https?:\/\//gi)) {
        return constants.host + "/" + value;
    }
    return url;
}

export function request(params) {
    params.url = formatHttp(params.url);
    var app = getApp();
    var token = app && app.globalData && app.globalData.token ? app.globalData.token : wx.getStorageSync("token");
    let authorization = token || "";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: authorization,
            },
            success: (res) => {
                if (res.statusCode === 401) {
                    var util = app.include("/utils/util");
                    util.checkGoLogin();
                    reject(new Error("未登录"));
                    return;
                }
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
}
