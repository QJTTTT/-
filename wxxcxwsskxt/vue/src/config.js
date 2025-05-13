/**
 * 服务器后端地址 格式为：http://{IP地址}:{端口号}
 * @type {string}
 */
let service_url = "http://localhost:8088";

/**
 * 系统配置信息
 */
const config = {
    service_url,
    title: "微信小程序网上书库系统",
    /**
     * 登录地址
     */
    login_url: "/api/user/login",
    /**
     * token获取用户信息地址
     */
    token_login: "/api/user/tokenLogin",
    /**
     * 退出登录地址
     */
    logout_login: "/api/user/logout",
    /**
     * 查询数据
     */
    query_url: "/api/user/query",
    /**
     * 查询数据
     */
    select_url: "/api/user/select",

    uploadUrl: "/api/user/upload_re",

    /**
     * 修改密码地址
     */
    user_mod_post: "/api/user/editPassword",

    captch_url: "/api/user/captch",
};

export default config;
