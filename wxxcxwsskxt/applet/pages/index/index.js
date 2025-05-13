// index.js
// 获取应用实例
import DB from "../../request/db";
const app = getApp();
const utils = require("../../utils/util");
import {
    httpGet
} from '../../request/request'
Page({
    mixins: [require("../../utils/myMixin")],
    data: {},
    onLoad(option) {
        wx.setNavigationBarTitle({
            title: "主页",
        });
        if (!utils.empty(option)) {
            this.setData(option);
        }
        DB.name("lunbotu")
            .order("id desc")
            .limit(5)
            .select()
            .then((res) => {
                this.setData({ bhtList: res });
            });
        DB.name("tushuxinxi")
            .limit("4")
            .order("jieyuecishu desc")
            .select()
            .then((res) => {
                const st = app.include("/request/module/tushuxinxi");
                var lists = res;
                st.formatDataList(lists);

                this.setData({
                    tushuxinxilist1: lists,
                });
            });



            
        // 混合协同推荐算法
        httpGet("/api/filter/selectAll").then(res => {
            const st = app.include("/request/module/tushuxinxi");
            var lists = res.data;
            st.formatDataList(lists);

            this.setData({
                tushuxinxilist2: lists,
            });
        });

    },
    onShow() {},
});
