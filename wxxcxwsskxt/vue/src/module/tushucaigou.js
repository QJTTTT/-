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
 * @return {ETushucaigou}
 */

export const TushucaigouCreateForm = () => {
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
        caigoubianhao: rule.getID(),
        gongyingshang: "",
        caigoujiage: "",
        caigoushuliang: "",
        caigoubeizhu: "",
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
 * @return {Promise<ETushucaigouForm>}
 */
export const canTushucaigouCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = TushucaigouCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushuxinxiFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushuxinxiid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取图书采购 模块的表单字段数据
 * @return {ETushucaigouForm}
 */
export const useTushucaigouCreateForm = (id) => {
    const form = TushucaigouCreateForm();
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

export const canTushucaigouSelect = (filter, result) => {
    http.post("/api/tushucaigou/selectPages").then((res) => {
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
export const useTushucaigouSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushucaigouSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushucaigou>}
 */
export const canTushucaigouFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushucaigou/findById", { id }).then((res) => {
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
 * @return {ETushucaigou}
 */
export const useTushucaigouFindById = (id) => {
    var form = reactive({});

    canTushucaigouFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushucaigou} data
 * @return {Promise<EResponseData<ETushucaigou>>}
 */
export const canTushucaigouInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushucaigou/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushucaigou_insert", res.data);
                        event.emit("tushucaigou_change", res.data);
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
 * @param {ETushucaigou} data
 * @return {Promise<EResponseData<ETushucaigou>>}
 */
export const canTushucaigouUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushucaigou/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushucaigou_update", res.data);
                        event.emit("tushucaigou_change", res.data);
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
export const canTushucaigouDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushucaigou/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushucaigou_delete", res.data);
                        event.emit("tushucaigou_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
