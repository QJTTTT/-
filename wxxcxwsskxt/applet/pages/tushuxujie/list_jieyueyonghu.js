// pages/tushuxujie/list.js

import DB from "../../request/db";
const utils = require("../../utils/util");
const store = require("../../request/module/tushuxujie");

const app = getApp();

Page({
    mixins: [require("../../utils/myMixin")],
    /**
     * 页面的初始数据
     */
    data: {
        lists: [],
        search: {
            tushuhao: "",
            tushumingcheng: "",
            tushuleibie: "",
            jieyuedanhao: "",
            jieyueyonghu: "",
            jieyueshijian_start: "",
            jieyueshijian_end: "",
            xujiedao_start: "",
            xujiedao_end: "",
            page: 1, // 当前页
            pagesize: 12, // 页大小
            orderby: "id", // 默认排序
            sort: "DESC", // 倒序方式排序
        },
        totalPages: 0,
        totalCount: 0,
        total: {},
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        wx.setNavigationBarTitle({
            title: "图书续借",
        });

        if (!utils.empty(option)) {
            this.setData(option);
        }
    },
    onShow() {
        this.data.lists = [];
        this.loadList(1);
    },

    loadList(page) {
        if (this.data.loading) return;
        this.setData({
            "search.page": page,
            loading: true,
        });
        store
            .dispatch("queryjieyueyonghu", this.data.search)
            .then((res) => {
                this.setData({
                    loading: false,
                });
                if (res.code == 0) {
                    var data = res.data;
                    var lists = data.lists.records;

                    store.formatDataList(lists);
                    this.handlerListData(lists);
                    lists = this.data.lists.concat(lists);
                    this.setData({
                        totalCount: data.lists.total,
                        totalPages: data.lists.pages,
                    });
                    this.setData({
                        lists: lists,
                    });
                }
            })
            .catch((err) => {
                this.setData({
                    loading: false,
                });
            });
    },
    handlerListData(lists) {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            lists: [],
        });
        this.loadList(1);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.totalPages > this.data.search.page) {
            this.loadList(this.data.search.page + 1);
        }
    },
    goBack() {
        wx.navigateBack({
            delta: 1,
        });
    },
    removeItem(e) {
        var id = e.target.dataset.id;
        var lists = this.data.lists;
        wx.showModal({
            title: "温馨提示",
            content: "确定删除该数据？此操作不可恢复",
            success: (res) => {
                if (res.confirm) {
                    store.dispatch("delete", [id]).then((res) => {
                        if (res.code == 0) {
                            var index = utils.findIndex(lists, (o) => o.id == id);
                            if (index !== false) {
                                utils.remove(lists, index);
                                this.setData({
                                    lists: lists,
                                });
                            }
                        }
                    });
                }
            },
        });
    },
});
