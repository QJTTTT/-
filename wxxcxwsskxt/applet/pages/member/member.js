// index.js
// 获取应用实例
import DB from "../../request/db";
const app = getApp();
const utils = require("../../utils/util");

Page({
    mixins: [require("../../utils/myMixin")],
    data: {},
    onLoad(option) {
        wx.setNavigationBarTitle({
            title: "个人中心",
        });
        if (!utils.empty(option)) {
            this.setData(option);
        }
    },
    onShow() {
        app.totakLogin().then(() => {
            this.setData({
                $session: utils.extend({}, app.globalData.userInfo, app.globalData.userInfo.object),
            });
        });
    },
});
