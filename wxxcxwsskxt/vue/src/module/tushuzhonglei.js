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
 * @return {ETushuzhonglei}
 */

export const TushuzhongleiCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        fenleimingcheng: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETushuzhongleiForm>}
 */
export const canTushuzhongleiCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = TushuzhongleiCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取图书种类 模块的表单字段数据
 * @return {ETushuzhongleiForm}
 */
export const useTushuzhongleiCreateForm = () => {
    const form = TushuzhongleiCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canTushuzhongleiSelect = (filter, result) => {
    http.post("/api/tushuzhonglei/selectPages").then((res) => {
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
export const useTushuzhongleiSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushuzhongleiSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushuzhonglei>}
 */
export const canTushuzhongleiFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushuzhonglei/findById", { id }).then((res) => {
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
 * @return {ETushuzhonglei}
 */
export const useTushuzhongleiFindById = (id) => {
    var form = reactive({});

    canTushuzhongleiFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushuzhonglei} data
 * @return {Promise<EResponseData<ETushuzhonglei>>}
 */
export const canTushuzhongleiInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuzhonglei/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuzhonglei_insert", res.data);
                        event.emit("tushuzhonglei_change", res.data);
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
 * @param {ETushuzhonglei} data
 * @return {Promise<EResponseData<ETushuzhonglei>>}
 */
export const canTushuzhongleiUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuzhonglei/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuzhonglei_update", res.data);
                        event.emit("tushuzhonglei_change", res.data);
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
export const canTushuzhongleiDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushuzhonglei/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuzhonglei_delete", res.data);
                        event.emit("tushuzhonglei_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
