//index.js
//获取应用实例
import { request, httpPost, httpGet } from "../../request/request.js";
const utils = require("../../utils/util.js");
const app = getApp();
const bus = require("../../utils/event");

Page({
    data: {
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        registers: [
            {
                btn: "注册用户",
                type: "primary",
                url: "/pages/yonghu/add",
            },
        ],

        rules: ["用户"],
        form: {
            cx: "",
            username: "",
            pwd: "",
        },
    },
    onLoad: function () {
        this.setData({
            "form.cx": this.data.rules[0],
        });
    },
    // 登录提交
    login(e) {
        wx.showLoading({
            title: "登录",
        });
        httpPost("/api/user/login", this.data.form)
            .then((res) => {
                wx.hideLoading({
                    success: (res) => {},
                });
                if (res.code == 0) {
                    var data = res.data;
                    this.setLoginState(data);
                } else {
                    wx.showModal({
                        title: "温馨提示",
                        content: res.msg,
                    });
                }
            })
            .catch((err) => {});
    },
    // 登录结束
    goUrl2(e) {
        this.setData({
            showDialog: false,
        });
        this.goUrl(e);
    },
    // 微信快捷登录
    wxlogin(e) {
        utils
            .wxLogin()
            .then((res) => {
                if (res.code == 0) {
                    this.setLoginState(res.data);
                } else if (res.code == 5) {
                    this.setData({
                        showDialog: true,
                        openid: res.msg,
                        message: "微信账号尚未注册，去注册一个吧",
                    });
                } else {
                    wx.showModal({
                        title: "提示",
                        content: res.msg,
                        showCancel: false,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    },
    setLoginState(data) {
        app.globalData.userInfo = data.session;
        app.globalData.user = data.session.object;
        app.globalData.token = data.token;
        wx.setStorageSync("token", data.token);
        wx.setStorageSync("userInfo", data.session);
        bus.emit("login");
        wx.showToast({
            title: "登录成功",
        });
        wx.reLaunch({
            url: "/pages/index/index",
        });
    },
});
