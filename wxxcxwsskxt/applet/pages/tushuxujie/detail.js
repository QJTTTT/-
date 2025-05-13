// pages/tushuxujie/detail.js

const app = getApp();
const DB = require("../../request/db");
const store = require("../../request/module/tushuxujie");
const utils = require("../../utils/util");
var http = require("../../request/request");

Page({
    mixins: [require("../../utils/myMixin")],
    /**
     * 页面的初始数据
     */
    data: {
        id: "",

        map: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: "图书续借",
        });
        if (!utils.empty(options)) {
            this.setData(options);
        }
    },
    async onShow() {
        var map = await this.loadDetail();
    },
    loadDetail() {
        return new Promise((resolve, reject) => {
            if (this.data.loading) {
                reject(new Error("加载中"));
                return;
            }
            this.setData({
                loading: true,
            });
            store
                .dispatch("findById", this.data.id)
                .then((map) => {
                    store.formatData(map); // 数据格式化
                    this.setData({
                        loading: false,
                        map: map,
                    });

                    resolve(map);
                })
                .catch((err) => {
                    this.setData({
                        loading: false,
                    });
                    wx.showToast({
                        title: err.message,
                        icon: "error",
                        duration: 2000,
                    });
                });
        });
    },
});
