export default [
    {
        label: "账号管理",
        to: "",
        children: [
            {
                label: "管理员账号管理",
                to: { path: "/admin/admins" },
            },
            {
                label: "管理员账号添加",
                to: { path: "/admin/admins/add" },
            },
            {
                label: "密码修改",
                to: { path: "/admin/mod" },
            },
        ],
    },
    {
        label: "用户管理",
        to: "",
        children: [
            {
                label: "用户添加",
                to: { path: "/admin/yonghu/add" },
            },
            {
                label: "用户查询",
                to: { path: "/admin/yonghu" },
            },
        ],
    },
    {
        label: "图书种类管理",
        to: "",
        children: [
            {
                label: "图书种类添加",
                to: { path: "/admin/tushuzhonglei/add" },
            },
            {
                label: "图书种类查询",
                to: { path: "/admin/tushuzhonglei" },
            },
        ],
    },
    {
        label: "图书信息管理",
        to: "",
        children: [
            {
                label: "图书信息添加",
                to: { path: "/admin/tushuxinxi/add" },
            },
            {
                label: "图书信息查询",
                to: { path: "/admin/tushuxinxi" },
            },
            {
                label: "图书采购查询",
                to: { path: "/admin/tushucaigou" },
            },
            {
                label: "图书报损查询",
                to: { path: "/admin/tushubaosun" },
            },
        ],
    },
    {
        label: "图书借阅管理",
        to: "",
        children: [
            {
                label: "图书借阅查询",
                to: { path: "/admin/tushujieyue" },
            },
            {
                label: "图书续借查询",
                to: { path: "/admin/tushuxujie" },
            },
            {
                label: "借阅归还查询",
                to: { path: "/admin/jieyueguihuan" },
            },
        ],
    },
    {
        label: "投诉建议管理",
        to: "",
        children: [
            {
                label: "投诉建议查询",
                to: { path: "/admin/tousujianyi" },
            },
        ],
    },
    {
        label: "数据统计管理",
        to: "",
        children: [
            {
                label: "图书借阅数据",
                to: { path: "/admin/shujutongji" },
            },
            {
                label: "用户借阅数据",
                to: { path: "/admin/yonghujieyuehuoyuedu" },
            },
        ],
    },
    {
        label: "系统管理",
        to: "",
        children: [

            {
                label: "轮播图添加",
                to: { path: "/admin/lunbotu/add" },
            },
            {
                label: "轮播图查询",
                to: { path: "/admin/lunbotu" },
            },
            {
                label: "评论管理",
                to: { path: "/admin/pinglun" },
            },
        ],
    },
];
