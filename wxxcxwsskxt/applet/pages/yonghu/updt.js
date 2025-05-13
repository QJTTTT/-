// pages/yonghu/add.js

const app = getApp();
const DB = require("../../request/db");
const store = require("../../request/module/yonghu");
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
            title: "编辑个人资料",
        });
        if (!utils.empty(options)) {
            this.setData(options);
        }
        this.setData({
            channle: options.channle,
        });

        await this.loadInfo();

        if (options.openid) {
            this.setData({
                bindWxOpenid: true,
            });
        }
    },

    getNickname(e) {
        var nickname = e.currentTarget.dataset.nickname;
        this.setDataObj(nickname, e.detail);
    },

    submit(callback) {
        if (this.data.loading) return;
        this.setData({
            loading: true,
            erros: {},
        });

        var form = utils.extend(true, {}, this.data.form);
        if (this.data.bindWxOpenid && this.data.openid) {
            form.openid = this.data.openid;
        }

        this.submitForm(form).then(
            (res) => {
                this.setData({
                    loading: false,
                });
                if (res.code == 0) {
                    wx.showToast({
                        title: "更新成功",
                        icon: "success",
                        duration: 1250,
                    });
                    const eventChannel = this.getOpenerEventChannel();
                    eventChannel.emit("updateData", res.data);

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

            rules.yonghuming = [
                { required: true, message: "请填写用户名" },
                { validator: rule.checkRemote, message: "内容重复了", checktype: "update", module: "yonghu", col: "yonghuming", id: form.id, trigger: "blur" },
            ];

            rules.xingming = [{ required: true, message: "请填写姓名" }];

            rules.shouji = [{ validator: rule.checkPhone, message: "请输入正确手机号码" }];

            rules.touxiang = [{ required: true, message: "请填写头像" }];

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
                        .update(form)
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

            // 更新数据,获取数据
            this.setData({
                loading: true,
            });
            store
                .dispatch("findById", this.data.id)
                .then((res) => {
                    this.setData({
                        loading: false,
                    });
                    this.setData({
                        form: res,
                    });

                    resolve({ form: res });
                })
                .catch((err) => {
                    this.setData({
                        loading: false,
                    });
                    console.log(err);
                    reject(err);
                });
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
});
