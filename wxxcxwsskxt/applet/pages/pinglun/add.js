// pages/pinglun/add.js

const app = getApp();
const DB = require("../../request/db");
const store = require("../../request/module/pinglun");
const utils = require("../../utils/util");
const Schema = require("../../utils/validator");
const rule = require("../../utils/rule").default;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        form: {},
        errors: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: "评论添加",
        });
        if (!utils.empty(options)) {
            this.setData(options);
        }
        this.setData({
            channle: options.channle,
        });

        await this.loadInfo();

        this.setData({ "form.pinglunren": app.session("username") });
    },

    submit(callback) {
        if (this.data.loading) return;
        this.setData({
            loading: true,
            erros: {},
        });

        var form = utils.extend(true, {}, this.data.form);

        this.submitForm(form).then(
            (res) => {
                this.setData({
                    loading: false,
                });
                if (res.code == 0) {
                    wx.showToast({
                        title: "添加成功",
                        icon: "success",
                        duration: 1250,
                    });
                    if (this.data.channle) {
                        const eventChannel = this.getOpenerEventChannel();
                        eventChannel.emit("updateData", res.data);
                    }
                    if (utils.isFunction(callback)) {
                        callback(res.data);
                    } else {
                        setTimeout(() => {
                            wx.navigateBack();
                        }, 1250);
                    }
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: "error",
                        duration: 2000,
                    });
                }
            },
            (err) => {
                this.setData({
                    loading: false,
                });
                wx.showToast({
                    title: err.message,
                    icon: "error",
                    duration: 2000,
                });
            }
        );
    },
    checkForm(form) {
        return new Promise((resolve, reject) => {
            var rules = {};

            rules.pingfen = [{ required: true, message: "请填写评分" }];

            if (!utils.empty(rules)) {
                const validate = new Schema(rules);
                validate
                    .validate(form)
                    .then(resolve)
                    .catch((err) => {
                        var errors = err.errors;
                        var result = {};
                        for (var ci of errors) {
                            var key = "errors." + ci.field;
                            result[key] = ci.message;
                        }
                        reject(result);
                    });
            } else {
                resolve(true);
            }
        });
    },
    submitForm(form) {
        return new Promise((resolve, reject) => {
            this.checkForm(form)
                .then(() => {
                    store
                        .insert(form)
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((err) => {
                            reject(err.message);
                            console.log(err);
                        });
                })
                .catch((err) => {
                    reject(err.message);
                    console.log(err);
                    this.setData(err);
                    this.setData({
                        loading: false,
                    });
                });
        });
    },
    loadInfo() {
        return new Promise((resolve, reject) => {
            if (this.data.loading) {
                reject(new Error("加载中"));
                return;
            }

            // 获取模块得数据
            var form = store.createForm();
            this.setData({
                form,
            });

            resolve({ form });
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
});
