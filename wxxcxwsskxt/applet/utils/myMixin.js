

import {extend} from './extend';
const utils = require('./util');

module.exports = {
  data: {  },
  onLoad(options){
    const app = getApp();
    this.setData({
      $session:utils.extend({},app.globalData.userInfo ||{},app.globalData.userInfo?.object||{}),
      $get:options
    });
  },
  onShow () {
    console.log('Log from mixin!')
  },
  goBack(){
    wx.navigateBack({
      delta:1
    })
  },
 }