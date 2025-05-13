// pages/footer/footer.js
var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {},
    options: {
        styleIsolation: "apply-shared",
    },
    /**
     * 组件的初始数据
     */
    data: {
        tabBar: [
            {
                url: "/pages/index/index",
                icon: {
                    class: "ee-icon ee-icon-shouye",
                    style: "",
                },
                name: "主页",
            },
            {
                url: "/pages/tushuxinxi/list",
                icon: {
                    class: "ee-icon ee-icon-shuku",
                    style: "",
                },
                name: "书库",
            },
            {
                url: "/pages/tousujianyi/add",
                icon: {
                    class: "ee-icon ee-icon-yijianfankui",
                    style: "",
                },
                name: "反馈",
            },
            {
                url: "/pages/member/member",
                icon: {
                    class: "ee-icon ee-icon-wode",
                    style: "",
                },
                name: "我的",
            },
        ],
        Selected: 0,
    },
    attached() {
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1];
        var url = currentPage.route;
        for (var i in this.data.tabBar) {
            var vn = this.data.tabBar[i];
            if (vn.url == "/" + url) {
                this.setData({
                    Selected: i,
                });
                break;
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {},
});
