// app.js
import { httpGet } from "./request/request";

require("./utils/mixins");
require("./utils/geohash");
const bus = require("./utils/event");

App({
    onLaunch() {
        this.globalData.token = wx.getStorageSync("token");
        this.globalData.userInfo = wx.getStorageSync("userInfo");
        this.globalData.user = this.globalData.userInfo?.object;

        this.totakLogin().then(
            () => {
                bus.emit("login");
            },
            (err) => {
                console.log(err.message);
            }
        );
    },
    include(path) {
        return require("." + path);
    },
    isLogin() {
        return this.globalData.token;
    },
    session(name) {
        if (this.globalData.userInfo == null) {
            return null;
        }
        if (this.globalData.userInfo[name]) {
            return this.globalData.userInfo[name];
        }
        if (this.globalData.user && this.globalData.user[name]) {
            return this.globalData.user[name];
        }
        return null;
    },
    user(name) {
        return this.globalData.user[name];
    },
    totakLogin() {
        return new Promise((resolve, reject) => {
            if (this.globalData.token) {
                // 获取信息,并检测是否登录
                httpGet("/api/user/tokenLogin", { token: this.globalData.token })
                    .then((res) => {
                        if (res.code == 0) {
                            var session = res.data.session;
                            var token = res.data.token;

                            wx.setStorageSync("token", token);
                            wx.setStorageSync("userInfo", session);

                            this.globalData.token = token;
                            this.globalData.userInfo = session;
                            this.globalData.user = session.object;

                            resolve();
                        } else {
                            this.globalData.token = "";
                            this.globalData.userInfo = null;
                            this.globalData.user = {};
                            wx.removeStorage({
                                key: "token",
                            });
                            wx.removeStorage({
                                key: "userInfo",
                            });
                            wx.removeStorage({
                                key: "user",
                            });
                            reject(new Error("token已过期"));
                        }
                    })
                    .catch((err) => {
                        wx.removeStorage({
                            key: "token",
                        });
                        wx.removeStorage({
                            key: "userInfo",
                        });
                        wx.removeStorage({
                            key: "user",
                        });
                    });
            } else {
                reject(new Error("没有登录"));
            }
        });
    },
    logout() {
        wx.removeStorage({
            key: "token",
        });
        wx.removeStorage({
            key: "userInfo",
        });
        wx.removeStorage({
            key: "user",
        });
        this.globalData.userInfo = null;
        this.globalData.token = null;
        this.globalData.user = {};
        bus.emit("logout");
    },

    globalData: {
        userInfo: null,
        token: null,
        userList: {},
        user: {},
    },
});
