// pages/member/pay.js
import DB from "../../request/db";
const app = getApp();
const utils = require("../../utils/util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        payType: "weixin",
        ordersn: "1234",
        zongji: 123456,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        wx.setNavigationBarTitle({
            title: "订单支付",
        });
        if (!utils.empty(option)) {
            this.setData(option);
        }
        console.log(option);
    },

    onPaymentOrder(e) {
        wx.showLoading({
            title: "支付中",
            mask: true,
        });
        setTimeout(() => {
            const { httpGet } = app.include("/request/request");

            httpGet("/api/payment", this.data)
                .then((res) => {
                    wx.hideLoading({});
                    if (res.code == 0) {
                        wx.showModal({
                            title: "温馨提示：",
                            content: "支付成功",
                            showCancel: false,
                            success: () => {
                                wx.navigateBack();
                            },
                        });
                    } else {
                        wx.showModal({
                            title: "温馨提示：",
                            content: "支付失败：" + res.msg,
                            showCancel: false,
                        });
                    }
                })
                .catch((e) => {
                    wx.hideLoading({});
                    wx.showModal({
                        title: "温馨提示：",
                        content: "支付失败：" + e.message,
                        showCancel: false,
                    });
                });
        }, 2000);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},
});
