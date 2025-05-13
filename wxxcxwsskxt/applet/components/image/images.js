const { isArray, empty } = require("../../utils/extend");
const { formatImageSrc } = require("../../utils/util");
// components/image/images.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        images: {
            type: String,
            observer(newVal, oldVal) {
                this.loadImages(newVal);
            },
        },
        column: {
            type: Number,
            value: 4,
            observer(newVal) {
                this.loadWidth(newVal);
            },
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageList: [],
        width: "",
    },
    ready() {
        this.loadImages(this.data.images);
        this.loadWidth(this.data.column);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        clickItem(e) {
            var index = e.currentTarget.dataset.index;
            wx.previewImage({
                urls: this.data.imageList,
                current: this.data.imageList[index],
            });
        },
        loadWidth(column) {
            var width = (750 - 30 * (column - 1)) / column;
            this.setData({
                width: "calc( (100% - 30rpx * (" + column + " - 1) ) / " + column + " )",
            });
        },
        loadImages(images) {
            var imageList = [];
            if (!empty(images)) {
                if (isArray(images)) {
                    imageList = images.filter((s) => s.trim());
                } else {
                    imageList = images.split(",").filter((s) => s.trim());
                }
            }
            imageList = imageList.map((s) => formatImageSrc(s));
            this.setData({
                imageList,
            });
        },
    },
});
