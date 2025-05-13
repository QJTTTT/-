// pages/tushuxujie/add.js

const app = getApp();
const DB = require("../../request/db");
const store = require("../../request/module/tushuxujie");
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
        readMap: {},

        showxujiedao: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: "图书续借添加",
        });
        if (!utils.empty(options)) {
            this.setData(options);
        }

        await this.loadInfo();
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
            var readMap = this.data.readMap;

            rules.xujiedao = [{ required: true, message: "请填写续借到" }];

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
            this.checkForm(form, this.data.readMap)
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
                    if (this.data.form.xujiedao) {
                        this.setData({
                            currentxujiedao: new Date(this.data.form.xujiedao).getTime(),
                        });
                    }
                    store.loadInfo(res.tushujieyueid).then((rs) => {
                        this.setData({
                            readMap: rs.readMap,
                        });
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

    onClosexujiedao() {
        this.setData({
            showxujiedao: false,
        });
    },
    onShowxujiedao() {
        this.setData({
            showxujiedao: true,
        });
    },
});
