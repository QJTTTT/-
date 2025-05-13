// pages/tushuxinxi/list.js

import DB from "../../request/db";
const utils = require("../../utils/util");
const store = require("../../request/module/tushuxinxi");

const app = getApp();

Page({
    mixins: [require("../../utils/myMixin")],
    /**
     * 页面的初始数据
     */
    data: {
        lists: [],
        search: {
            keyword: "",
            tushuhao: "",
            tushumingcheng: "",
            tushuleibie: "",
            zuozhe: "",
            chubanshe: "",
            page: 1, // 当前页
            pagesize: 12, // 页大小
            orderby: "id", // 默认排序
            sort: "DESC", // 倒序方式排序
        },
        totalPages: 0,
        totalCount: 0,
        total: {},
        tushuleibieList: [],

        orderOptions: [
            { value: "id", text: "默认排序" },
            { value: "tushukucun", text: "图书库存排序" },

            { value: "jieyuecishu", text: "借阅次数排序" },

            { value: "jieyuejine", text: "借阅金额排序" },
        ],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        wx.setNavigationBarTitle({
            title: "书籍信息列表",
        });

        if (!utils.empty(option)) {
            this.setData(option);
        }

        // 动态加载后台选项数据
        DB.name("tushuzhonglei")
            .field("id as value")
            .field("fenleimingcheng as text")
            .select()
            .then((res) => {
                var list = [{ value: "", text: "全部图书类别" }, ...res];

                this.setData({
                    tushuleibieList: list,
                });
            });
    },
    onShow() {
        if (utils.checkGoLogin()) {
            return;
        }
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
            .dispatch("query", this.data.search)
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
    onSelectSearch(e) {
        this.onInput(e);
        this.setData({
            lists: [],
        });
        this.loadList(1);
    },
    onListOrderBy(e) {
        this.setData({
            "search.orderby": e.detail,
            lists: [],
        });
        this.loadList(1);
    },
    onSearchtushuxinxi() {
        this.setData({
            lists: [],
        });
        this.loadList(1);
    },
});
