// components/upload/avatar.js
const utils = require("../../utils/util");
import { uploadFile } from "../../request/upload";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            observer(val) {
                this.setValue(val);
            },
            value: "",
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        src: "",
        sdkType: "",
    },
    ready() {
        console.log("ready");
        var sdkType = utils.getInfoType();
        this.setData({
            sdkType: sdkType,
        });
        this.setValue(this.data.value);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         *
         * @param {String|Array<String>} val
         */
        setValue(val) {
            var arr = val;
            if (!utils.isArray(val)) {
                arr = val.split(",").filter((s) => s.trim());
            }
            if (arr.length > 0) {
                this.setData({
                    src: utils.formatImageSrc(arr[0]),
                });
            } else {
                this.setData({
                    src: "",
                });
            }
        },
        // 通过能力获取头像，这个需要上传到服务器中保存
        chooseAvatar(e) {
            uploadFile(e.detail.avatarUrl).then(
                (filepath) => {
                    this.$emit(filepath.data);
                },
                (err) => {
                    console.error(err);
                }
            );
        },
        getUserProfile(e) {
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            wx.getUserProfile({
                desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    var info = res.userInfo;
                    this.$emit(info.avatarUrl, info.nickName);
                },
                fail: (err) => {
                    console.error(err);
                },
            });
        },
        $emit(avatarUrl, nickname = "") {
            this.triggerEvent("input", avatarUrl);
            if (nickname) this.triggerEvent("nickname", nickname);
        },
        afterRead(event) {
            const { file } = event.detail;
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            if (utils.isArray(file)) {
                utils.each(file, (i, o) => {
                    this.uploadFile(o);
                });
            } else {
                this.uploadFile(file);
            }
        },
        uploadFile(file) {
            uploadFile(file)
                .then((res) => {
                    if (res.code == 0) {
                        this.$emit(res.data);
                    }
                })
                .catch((err) => {
                    wx.showToast({
                        title: "上传失败" + file.name,
                    });
                });
        },
    },
});
