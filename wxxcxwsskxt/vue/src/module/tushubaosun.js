import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canTushuxinxiFindById } from "./tushuxinxi";

/**
 * 响应式的对象数据
 * @return {ETushubaosun}
 */

export const TushubaosunCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        tushuhao: "",
        tushumingcheng: "",
        tushuleibie: "",
        baosunbianhao: rule.getID(),
        baosunshuliang: "",
        baosunshuoming: "",
        jingshouren: $session.username,
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["tushuxinxiid", "tushuhao", "tushumingcheng", "tushuleibie"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETushubaosunForm>}
 */
export const canTushubaosunCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = TushubaosunCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushuxinxiFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushuxinxiid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取图书报损 模块的表单字段数据
 * @return {ETushubaosunForm}
 */
export const useTushubaosunCreateForm = (id) => {
    const form = TushubaosunCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canTushuxinxiFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.tushuxinxiid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canTushubaosunSelect = (filter, result) => {
    http.post("/api/tushubaosun/selectPages").then((res) => {
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
export const useTushubaosunSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushubaosunSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushubaosun>}
 */
export const canTushubaosunFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushubaosun/findById", { id }).then((res) => {
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
 * @return {ETushubaosun}
 */
export const useTushubaosunFindById = (id) => {
    var form = reactive({});

    canTushubaosunFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushubaosun} data
 * @return {Promise<EResponseData<ETushubaosun>>}
 */
export const canTushubaosunInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushubaosun/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushubaosun_insert", res.data);
                        event.emit("tushubaosun_change", res.data);
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
 * @param {ETushubaosun} data
 * @return {Promise<EResponseData<ETushubaosun>>}
 */
export const canTushubaosunUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushubaosun/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushubaosun_update", res.data);
                        event.emit("tushubaosun_change", res.data);
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
export const canTushubaosunDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushubaosun/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushubaosun_delete", res.data);
                        event.emit("tushubaosun_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
