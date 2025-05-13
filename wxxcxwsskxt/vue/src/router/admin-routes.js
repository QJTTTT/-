import { session } from "@/utils/utils";

export default [
    {
        path: "pay",
        name: "AdminPay",
        component: () => import("@/views/zhifu/zhifu.vue"),
        meta: { authLogin: true },
    },

    {
        path: "lunbotu",
        name: "AdminlunbotuList",
        component: () => import("@/views/lunbotu/list.vue"),
        meta: { title: "轮播图列表", authLogin: true },
    },

    {
        path: "lunbotu/add",
        name: "AdminlunbotuAdd",
        component: () => import("@/views/lunbotu/add.vue"),
        meta: { title: "添加轮播图", authLogin: true },
    },
    {
        path: "lunbotu/updt",
        name: "AdminlunbotuUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/lunbotu/updt.vue"),
        meta: { title: "编辑轮播图", authLogin: true },
    },
    {
        path: "admins",
        name: "AdminadminsList",
        component: () => import("@/views/admins/list.vue"),
        meta: { title: "管理员列表", authLogin: true },
    },

    {
        path: "admins/add",
        name: "AdminadminsAdd",
        component: () => import("@/views/admins/add.vue"),
        meta: { title: "添加管理员", authLogin: true },
    },
    {
        path: "admins/updt",
        name: "AdminadminsUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/admins/updt.vue"),
        meta: { title: "编辑管理员", authLogin: true },
    },
    {
        path: "admins/updtself",
        name: "AdminadminsUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/admins/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "yonghu",
        name: "AdminyonghuList",
        component: () => import("@/views/yonghu/list.vue"),
        meta: { title: "用户列表", authLogin: true },
    },

    {
        path: "yonghu/add",
        name: "AdminyonghuAdd",
        component: () => import("@/views/yonghu/add.vue"),
        meta: { title: "添加用户", authLogin: true },
    },
    {
        path: "yonghu/updt",
        name: "AdminyonghuUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/yonghu/updt.vue"),
        meta: { title: "编辑用户", authLogin: true },
    },
    {
        path: "yonghu/updtself",
        name: "AdminyonghuUpdtSelf",
        props: (route) => ({ id: session("id") }),
        component: () => import("@/views/yonghu/updtself.vue"),
        meta: { title: "更新个人资料", authLogin: true },
    },
    {
        path: "yonghu/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminyonghuDetail",
        component: () => import("@/views/yonghu/detail.vue"),
        meta: { title: "用户详情", authLogin: true },
    },
    {
        path: "tushuzhonglei",
        name: "AdmintushuzhongleiList",
        component: () => import("@/views/tushuzhonglei/list.vue"),
        meta: { title: "图书种类列表", authLogin: true },
    },

    {
        path: "tushuzhonglei/add",
        name: "AdmintushuzhongleiAdd",
        component: () => import("@/views/tushuzhonglei/add.vue"),
        meta: { title: "添加图书种类", authLogin: true },
    },
    {
        path: "tushuzhonglei/updt",
        name: "AdmintushuzhongleiUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushuzhonglei/updt.vue"),
        meta: { title: "编辑图书种类", authLogin: true },
    },
    {
        path: "tushuxinxi",
        name: "AdmintushuxinxiList",
        component: () => import("@/views/tushuxinxi/list.vue"),
        meta: { title: "图书信息列表", authLogin: true },
    },

    {
        path: "tushuxinxi/add",
        name: "AdmintushuxinxiAdd",
        component: () => import("@/views/tushuxinxi/add.vue"),
        meta: { title: "添加图书信息", authLogin: true },
    },
    {
        path: "tushuxinxi/updt",
        name: "AdmintushuxinxiUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushuxinxi/updt.vue"),
        meta: { title: "编辑图书信息", authLogin: true },
    },
    {
        path: "tushuxinxi/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintushuxinxiDetail",
        component: () => import("@/views/tushuxinxi/detail.vue"),
        meta: { title: "图书信息详情", authLogin: true },
    },
    {
        path: "tushujieyue",
        name: "AdmintushujieyueList",
        component: () => import("@/views/tushujieyue/list.vue"),
        meta: { title: "图书借阅列表", authLogin: true },
    },

    {
        path: "tushujieyue/jieyueyonghu",
        name: "AdmintushujieyueListjieyueyonghu",
        component: () => import("@/views/tushujieyue/jieyueyonghu.vue"),
        meta: { title: "图书借阅列表", authLogin: true },
    },

    {
        path: "tushujieyue/add",
        name: "AdmintushujieyueAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushujieyue/add.vue"),
        meta: { title: "添加图书借阅", authLogin: true },
    },
    {
        path: "tushujieyue/updt",
        name: "AdmintushujieyueUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushujieyue/updt.vue"),
        meta: { title: "编辑图书借阅", authLogin: true },
    },
    {
        path: "tushujieyue/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintushujieyueDetail",
        component: () => import("@/views/tushujieyue/detail.vue"),
        meta: { title: "图书借阅详情", authLogin: true },
    },
    {
        path: "tushuxujie",
        name: "AdmintushuxujieList",
        component: () => import("@/views/tushuxujie/list.vue"),
        meta: { title: "图书续借列表", authLogin: true },
    },

    {
        path: "tushuxujie/jieyueyonghu",
        name: "AdmintushuxujieListjieyueyonghu",
        component: () => import("@/views/tushuxujie/jieyueyonghu.vue"),
        meta: { title: "图书续借列表", authLogin: true },
    },

    {
        path: "tushuxujie/add",
        name: "AdmintushuxujieAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushuxujie/add.vue"),
        meta: { title: "添加图书续借", authLogin: true },
    },
    {
        path: "tushuxujie/updt",
        name: "AdmintushuxujieUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushuxujie/updt.vue"),
        meta: { title: "编辑图书续借", authLogin: true },
    },
    {
        path: "tushuxujie/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintushuxujieDetail",
        component: () => import("@/views/tushuxujie/detail.vue"),
        meta: { title: "图书续借详情", authLogin: true },
    },
    {
        path: "jieyueguihuan",
        name: "AdminjieyueguihuanList",
        component: () => import("@/views/jieyueguihuan/list.vue"),
        meta: { title: "借阅归还列表", authLogin: true },
    },

    {
        path: "jieyueguihuan/jieyueyonghu",
        name: "AdminjieyueguihuanListjieyueyonghu",
        component: () => import("@/views/jieyueguihuan/jieyueyonghu.vue"),
        meta: { title: "借阅归还列表", authLogin: true },
    },

    {
        path: "jieyueguihuan/add",
        name: "AdminjieyueguihuanAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/jieyueguihuan/add.vue"),
        meta: { title: "添加借阅归还", authLogin: true },
    },
    {
        path: "jieyueguihuan/updt",
        name: "AdminjieyueguihuanUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/jieyueguihuan/updt.vue"),
        meta: { title: "编辑借阅归还", authLogin: true },
    },
    {
        path: "jieyueguihuan/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminjieyueguihuanDetail",
        component: () => import("@/views/jieyueguihuan/detail.vue"),
        meta: { title: "借阅归还详情", authLogin: true },
    },
    {
        path: "pinglun",
        name: "AdminpinglunList",
        component: () => import("@/views/pinglun/list.vue"),
        meta: { title: "评论列表", authLogin: true },
    },

    {
        path: "pinglun/pinglunren",
        name: "AdminpinglunListpinglunren",
        component: () => import("@/views/pinglun/pinglunren.vue"),
        meta: { title: "评论列表", authLogin: true },
    },

    {
        path: "pinglun/updt",
        name: "AdminpinglunUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/pinglun/updt.vue"),
        meta: { title: "编辑评论", authLogin: true },
    },
    {
        path: "tousujianyi",
        name: "AdmintousujianyiList",
        component: () => import("@/views/tousujianyi/list.vue"),
        meta: { title: "投诉建议列表", authLogin: true },
    },

    {
        path: "tousujianyi/fankuiyonghu",
        name: "AdmintousujianyiListfankuiyonghu",
        component: () => import("@/views/tousujianyi/fankuiyonghu.vue"),
        meta: { title: "投诉建议列表", authLogin: true },
    },

    {
        path: "tousujianyi/add",
        name: "AdmintousujianyiAdd",
        component: () => import("@/views/tousujianyi/add.vue"),
        meta: { title: "添加投诉建议", authLogin: true },
    },
    {
        path: "tousujianyi/updt",
        name: "AdmintousujianyiUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tousujianyi/updt.vue"),
        meta: { title: "编辑投诉建议", authLogin: true },
    },
    {
        path: "tushucaigou",
        name: "AdmintushucaigouList",
        component: () => import("@/views/tushucaigou/list.vue"),
        meta: { title: "图书采购列表", authLogin: true },
    },

    {
        path: "tushucaigou/jingshouren",
        name: "AdmintushucaigouListjingshouren",
        component: () => import("@/views/tushucaigou/jingshouren.vue"),
        meta: { title: "图书采购列表", authLogin: true },
    },

    {
        path: "tushucaigou/add",
        name: "AdmintushucaigouAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushucaigou/add.vue"),
        meta: { title: "添加图书采购", authLogin: true },
    },
    {
        path: "tushucaigou/updt",
        name: "AdmintushucaigouUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushucaigou/updt.vue"),
        meta: { title: "编辑图书采购", authLogin: true },
    },
    {
        path: "tushucaigou/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintushucaigouDetail",
        component: () => import("@/views/tushucaigou/detail.vue"),
        meta: { title: "图书采购详情", authLogin: true },
    },
    {
        path: "tushubaosun",
        name: "AdmintushubaosunList",
        component: () => import("@/views/tushubaosun/list.vue"),
        meta: { title: "图书报损列表", authLogin: true },
    },

    {
        path: "tushubaosun/jingshouren",
        name: "AdmintushubaosunListjingshouren",
        component: () => import("@/views/tushubaosun/jingshouren.vue"),
        meta: { title: "图书报损列表", authLogin: true },
    },

    {
        path: "tushubaosun/add",
        name: "AdmintushubaosunAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushubaosun/add.vue"),
        meta: { title: "添加图书报损", authLogin: true },
    },
    {
        path: "tushubaosun/updt",
        name: "AdmintushubaosunUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/tushubaosun/updt.vue"),
        meta: { title: "编辑图书报损", authLogin: true },
    },
    {
        path: "tushubaosun/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdmintushubaosunDetail",
        component: () => import("@/views/tushubaosun/detail.vue"),
        meta: { title: "图书报损详情", authLogin: true },
    },
    {
        path: "shoucang",
        name: "AdminshoucangList",
        component: () => import("@/views/shoucang/list.vue"),
        meta: { title: "收藏列表", authLogin: true },
    },

    {
        path: "shoucang/username",
        name: "AdminshoucangListusername",
        component: () => import("@/views/shoucang/username.vue"),
        meta: { title: "收藏列表", authLogin: true },
    },

    {
        path: "liulanjilu",
        name: "AdminliulanjiluList",
        component: () => import("@/views/liulanjilu/list.vue"),
        meta: { title: "浏览记录列表", authLogin: true },
    },

    {
        path: "liulanjilu/liulanyonghu",
        name: "AdminliulanjiluListliulanyonghu",
        component: () => import("@/views/liulanjilu/liulanyonghu.vue"),
        meta: { title: "浏览记录列表", authLogin: true },
    },

    {
        path: "liulanjilu/add",
        name: "AdminliulanjiluAdd",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/liulanjilu/add.vue"),
        meta: { title: "添加浏览记录", authLogin: true },
    },
    {
        path: "liulanjilu/updt",
        name: "AdminliulanjiluUpdt",
        props: (route) => ({ id: route.query.id }),
        component: () => import("@/views/liulanjilu/updt.vue"),
        meta: { title: "编辑浏览记录", authLogin: true },
    },
    {
        path: "liulanjilu/detail",
        props: (route) => ({ id: route.query.id }),
        name: "AdminliulanjiluDetail",
        component: () => import("@/views/liulanjilu/detail.vue"),
        meta: { title: "浏览记录详情", authLogin: true },
    },

    {
        path: "shujutongji",
        name: "Pageshujutongji",
        component: () => import("@/views/shujutongji.vue"),
        meta: { title: "数据统计", authLogin: true },
    },
    {
        path: "yonghujieyuehuoyuedu",
        name: "Pageyonghujieyuehuoyuedu",
        component: () => import("@/views/yonghujieyuehuoyuedu.vue"),
        meta: { title: "用户借阅活跃度", authLogin: true },
    },
];
