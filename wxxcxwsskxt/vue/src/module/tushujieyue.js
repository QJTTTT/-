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
 * @return {ETushujieyue}
 */

export const TushujieyueCreateForm = () => {
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
        tupian: "",
        zuozhe: "",
        chubanshe: "",
        jieyuejine: "",
        jieyuedanhao: rule.getID(),
        jieyueshijian: rule.date("Y-m-d H:i:s"),
        guihuanshijian: rule.date("Y-m-d H:i:s"),
        xingming: "",
        dianhua: "",
        jieyueyonghu: $session.username,
        jieyuezhuangtai: "借阅成功",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = ["tushuxinxiid", "tushuhao", "tushumingcheng", "tushuleibie", "tupian", "zuozhe", "chubanshe", "jieyuejine"];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETushujieyueForm>}
 */
export const canTushujieyueCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = TushujieyueCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushuxinxiFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushuxinxiid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取图书借阅 模块的表单字段数据
 * @return {ETushujieyueForm}
 */
export const useTushujieyueCreateForm = (id) => {
    const form = TushujieyueCreateForm();
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

export const canTushujieyueSelect = (filter, result) => {
    http.post("/api/tushujieyue/selectPages").then((res) => {
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
export const useTushujieyueSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushujieyueSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushujieyue>}
 */
export const canTushujieyueFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushujieyue/findById", { id }).then((res) => {
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
 * @return {ETushujieyue}
 */
export const useTushujieyueFindById = (id) => {
    var form = reactive({});

    canTushujieyueFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushujieyue} data
 * @return {Promise<EResponseData<ETushujieyue>>}
 */
export const canTushujieyueInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushujieyue/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushujieyue_insert", res.data);
                        event.emit("tushujieyue_change", res.data);
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
 * @param {ETushujieyue} data
 * @return {Promise<EResponseData<ETushujieyue>>}
 */
export const canTushujieyueUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushujieyue/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushujieyue_update", res.data);
                        event.emit("tushujieyue_change", res.data);
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
export const canTushujieyueDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushujieyue/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushujieyue_delete", res.data);
                        event.emit("tushujieyue_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
