// pages/tushuxinxi/detail.js

const app = getApp();
const DB = require("../../request/db");
const store = require("../../request/module/tushuxinxi");
const utils = require("../../utils/util");
var http = require("../../request/request");

Page({
    mixins: [require("../../utils/myMixin")],
    /**
     * 页面的初始数据
     */
    data: {
        id: "",

        is_shoucang: false,
        shoucangCount: 0,

        map: {},
        commitRate: 5,

        commitList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: "图书信息",
        });
        if (!utils.empty(options)) {
            this.setData(options);
        }
    },
    async onShow() {
        if (utils.checkGoLogin()) {
            return;
        }

        var map = await this.loadDetail();

        this.loadCommit();
        http.httpGet("/api/tushuxinxi/webDetail", { id: map.id });
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

                    DB.name("shoucang")
                        .where("biao", "tushuxinxi")
                        .where("xwid", map.id)
                        .count()
                        .then((res) => {
                            this.setData({
                                shoucangCount: res,
                            });
                        });
                    if (app.session("username")) {
                        DB.name("shoucang")
                            .where("biao", "tushuxinxi")
                            .where("xwid", map.id)
                            .where("username", app.session("username"))
                            .count()
                            .then((res) => {
                                this.setData({
                                    is_shoucang: res > 0,
                                });
                            });
                    }

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
    onShoucangChange() {
        if (this.loading) return;
        this.loading = true;
        var map = this.data.map;

        http.httpPost("/api/shoucang/insert", {
            biao: "tushuxinxi",
            xwid: map.id,
            biaoti: map.tushumingcheng,
        })
            .then((res) => {
                if (res.code == 0) {
                    if (this.data.is_shoucang) {
                        wx.showToast({
                            title: "已取消收藏",
                        });
                        this.setData({
                            is_shoucang: false,
                            shoucangCount: this.data.shoucangCount - 1,
                        });
                    } else {
                        wx.showToast({
                            title: "已收藏",
                        });
                        this.setData({
                            is_shoucang: true,
                            shoucangCount: this.data.shoucangCount + 1,
                        });
                    }
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: "error",
                    });
                }
                this.loading = false;
            })
            .catch((err) => {
                this.loading = false;
                wx.showToast({
                    title: err.message,
                    icon: "error",
                });
            });
    },

    submitCommitForm(form) {
        form.biaoid = this.data.id;
        form.pinglunneirong = this.data.commitContent;
        form.pingfen = this.data.commitRate;
        form.biaoti = this.data.map.tushumingcheng;

        if (!this.data.commitContent.trim()) {
            wx.showModel({
                title: "温馨提示",
                content: "请填写评论内容",
                showCancel: false,
            });
            return;
        }
        this.setData({
            commitContent: "",
            commitImages: "",
        });
        const commitStore = app.include("/request/module/pinglun");
        commitStore
            .dispatch("insert", form)
            .then((res) => {
                if (res.code == 0) {
                    wx.showToast({
                        title: "评论成功",
                        icon: "success",
                        duration: 2000,
                    });
                    this.loadCommit && this.loadCommit();
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon: "error",
                        duration: 2000,
                    });
                }
            })
            .catch((e) => {
                wx.showToast({
                    title: e.message,
                    icon: "error",
                    duration: 2000,
                });
            });
    },

    submitCommit(e) {
        const commitForm = app.include("/request/module/pinglun");
        var form = commitForm.createForm();
        form.biao = "tushuxinxi";
        this.submitCommitForm(form);
    },

    loadCommit() {
        DB.name("pinglun")
            .alias("p")
            .field("p.*")
            .joinLeft("yonghu u0", "u0.yonghuming = p.pinglunren")
            .field("(CASE  WHEN u0.xingming is not null THEN u0.xingming  ELSE '' END) nickname")
            .field("(CASE  WHEN u0.touxiang is not null THEN u0.touxiang  ELSE '' END) headimgurl")
            .field("(CASE  WHEN u0.id is not null THEN u0.id  ELSE 0 END) userid")
            .where("p.biaoid", this.data.id)
            .where("p.biao", "tushuxinxi")
            .select()
            .then((res) => {
                const st = app.include("/request/module/pinglun");
                st.formatDataList(res);
                this.setData({
                    commitList: res,
                });
            });
    },
});
