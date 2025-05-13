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
 * @return {EPinglun}
 */

export const PinglunCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        biao: route.query?.biao,
        biaoid: route.query?.biaoid,
        biaoti: route.query?.biaoti,
        pingfen: "",
        pinglunneirong: "",
        pinglunren: $session.username,
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EPinglunForm>}
 */
export const canPinglunCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = PinglunCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取评论 模块的表单字段数据
 * @return {EPinglunForm}
 */
export const usePinglunCreateForm = () => {
    const form = PinglunCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canPinglunSelect = (filter, result) => {
    http.post("/api/pinglun/selectPages").then((res) => {
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
export const usePinglunSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canPinglunSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EPinglun>}
 */
export const canPinglunFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/pinglun/findById", { id }).then((res) => {
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
 * @return {EPinglun}
 */
export const usePinglunFindById = (id) => {
    var form = reactive({});

    canPinglunFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EPinglun} data
 * @return {Promise<EResponseData<EPinglun>>}
 */
export const canPinglunInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/pinglun/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pinglun_insert", res.data);
                        event.emit("pinglun_change", res.data);
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
 * @param {EPinglun} data
 * @return {Promise<EResponseData<EPinglun>>}
 */
export const canPinglunUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/pinglun/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pinglun_update", res.data);
                        event.emit("pinglun_change", res.data);
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
export const canPinglunDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/pinglun/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("pinglun_delete", res.data);
                        event.emit("pinglun_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
