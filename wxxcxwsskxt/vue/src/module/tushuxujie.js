import http from "@/utils/ajax/http";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";
import { reactive, ref, unref } from "vue";
import rule from "@/utils/rule";
import { extend, isArray } from "@/utils/extend";
import { ElMessageBox } from "element-plus";
import router from "@/router";
import event from "@/utils/event";

import { canTushujieyueFindById } from "./tushujieyue";

/**
 * 响应式的对象数据
 * @return {ETushuxujie}
 */

export const TushuxujieCreateForm = () => {
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
        jieyuedanhao: "",
        jieyueyonghu: $session.username,
        jieyueshijian: "",
        guihuanshijian: "",
        xujiedao: rule.date("Y-m-d H:i:s"),
        xujiebeizhu: "",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["tushujieyueid", "tushuhao", "tushumingcheng", "tushuleibie", "jieyuedanhao", "jieyueyonghu", "jieyueshijian", "guihuanshijian"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETushuxujieForm>}
 */
export const canTushuxujieCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = TushuxujieCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushujieyueFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushujieyueid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取图书续借 模块的表单字段数据
 * @return {ETushuxujieForm}
 */
export const useTushuxujieCreateForm = (id) => {
    const form = TushuxujieCreateForm();
    const formReactive = reactive(form);

    const readMap = reactive({});
    canTushujieyueFindById(id).then(
        (map) => {
            exportForm(formReactive, map);
            extend(readMap, map);
            formReactive.tushujieyueid = map.id;
        },
        (err) => {
            ElMessageBox.alert(err.message);
        }
    );
    return { form: formReactive, readMap };
};

export const canTushuxujieSelect = (filter, result) => {
    http.post("/api/tushuxujie/selectPages").then((res) => {
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
export const useTushuxujieSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushuxujieSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushuxujie>}
 */
export const canTushuxujieFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushuxujie/findById", { id }).then((res) => {
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
 * @return {ETushuxujie}
 */
export const useTushuxujieFindById = (id) => {
    var form = reactive({});

    canTushuxujieFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushuxujie} data
 * @return {Promise<EResponseData<ETushuxujie>>}
 */
export const canTushuxujieInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuxujie/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxujie_insert", res.data);
                        event.emit("tushuxujie_change", res.data);
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
 * @param {ETushuxujie} data
 * @return {Promise<EResponseData<ETushuxujie>>}
 */
export const canTushuxujieUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuxujie/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxujie_update", res.data);
                        event.emit("tushuxujie_change", res.data);
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
export const canTushuxujieDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushuxujie/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxujie_delete", res.data);
                        event.emit("tushuxujie_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
