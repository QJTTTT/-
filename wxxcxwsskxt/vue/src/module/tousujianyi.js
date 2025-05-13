import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

/**
 * 响应式的对象数据
 * @return {ETousujianyi}
 */

export const TousujianyiCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        xingming: $session.xingming,
        lianxidianhua: $session.shouji,
        fankuileixing: "",
        fankuineirong: "",
        fankuiyonghu: $session.username,
        fankuizhuangtai: "待回复",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETousujianyiForm>}
 */
export const canTousujianyiCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = TousujianyiCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取投诉建议 模块的表单字段数据
 * @return {ETousujianyiForm}
 */
export const useTousujianyiCreateForm = () => {
    const form = TousujianyiCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canTousujianyiSelect = (filter, result) => {
    http.post("/api/tousujianyi/selectPages").then((res) => {
        if (res.code == 0) {
            extend(result, res.data);
        } else {
            ElMessageBox.alert(res.msg);
        }
    });
};

/**
 * 获取分页数据
 * @param filter
 */
export const useTousujianyiSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTousujianyiSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETousujianyi>}
 */
export const canTousujianyiFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tousujianyi/findById", { id }).then((res) => {
            if (res.code == 0) {
                resolve(res.data);
            } else {
                reject(new Error(res.msg));
            }
        }, reject);
    });
};

/**
 * 根据id 获取一行数据
 * @param id
 * @return {ETousujianyi}
 */
export const useTousujianyiFindById = (id) => {
    var form = reactive({});

    canTousujianyiFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETousujianyi} data
 * @return {Promise<EResponseData<ETousujianyi>>}
 */
export const canTousujianyiInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tousujianyi/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tousujianyi_insert", res.data);
                        event.emit("tousujianyi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据数据更新数据库
 * @param {ETousujianyi} data
 * @return {Promise<EResponseData<ETousujianyi>>}
 */
export const canTousujianyiUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tousujianyi/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tousujianyi_update", res.data);
                        event.emit("tousujianyi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

/**
 * 根据id 或者列表id
 * @param {number|number[]} id
 * @return {Promise<EResponseData<string>>}
 */
export const canTousujianyiDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tousujianyi/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tousujianyi_delete", res.data);
                        event.emit("tousujianyi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
