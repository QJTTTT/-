export default [
    {
        label: "个人中心",
        to: "",
        children: [
            {
                label: "修改个人资料",
                to: { path: "/admin/yonghu/updtself" },
            },
            {
                label: "修改密码",
                to: { path: "/admin/mod" },
            },
        ],
    },
];
