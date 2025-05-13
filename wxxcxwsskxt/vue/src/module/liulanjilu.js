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
 * @return {ELiulanjilu}
 */

export const LiulanjiluCreateForm = () => {
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
        liulanyonghu: $session.username,
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
 * @return {Promise<ELiulanjiluForm>}
 */
export const canLiulanjiluCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = LiulanjiluCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushuxinxiFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushuxinxiid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取浏览记录 模块的表单字段数据
 * @return {ELiulanjiluForm}
 */
export const useLiulanjiluCreateForm = (id) => {
    const form = LiulanjiluCreateForm();
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

export const canLiulanjiluSelect = (filter, result) => {
    http.post("/api/liulanjilu/selectPages").then((res) => {
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
export const useLiulanjiluSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canLiulanjiluSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ELiulanjilu>}
 */
export const canLiulanjiluFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/liulanjilu/findById", { id }).then((res) => {
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
 * @return {ELiulanjilu}
 */
export const useLiulanjiluFindById = (id) => {
    var form = reactive({});

    canLiulanjiluFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ELiulanjilu} data
 * @return {Promise<EResponseData<ELiulanjilu>>}
 */
export const canLiulanjiluInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/liulanjilu/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liulanjilu_insert", res.data);
                        event.emit("liulanjilu_change", res.data);
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
 * @param {ELiulanjilu} data
 * @return {Promise<EResponseData<ELiulanjilu>>}
 */
export const canLiulanjiluUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/liulanjilu/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liulanjilu_update", res.data);
                        event.emit("liulanjilu_change", res.data);
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
export const canLiulanjiluDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/liulanjilu/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("liulanjilu_delete", res.data);
                        event.emit("liulanjilu_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
