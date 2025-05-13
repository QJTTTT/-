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
 * @return {EJieyueguihuan}
 */

export const JieyueguihuanCreateForm = () => {
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
        jieyuedanhao: "",
        jieyueshijian: "",
        xingming: "",
        dianhua: "",
        jieyueyonghu: $session.username,
        jieyuejine: "",
        guihuanshijian: "",
        shijiguihuanshijian: rule.date("Y-m-d H:i:s"),

        iszf: "否",
    };

    return form;
};

function exportForm(form, readMap) {
    var autoText = [
        "tushujieyueid",
        "tushuhao",
        "tushumingcheng",
        "tushuleibie",
        "tupian",
        "zuozhe",
        "chubanshe",
        "jieyuedanhao",
        "jieyueshijian",
        "xingming",
        "dianhua",
        "jieyueyonghu",
        "jieyuejine",
        "guihuanshijian",
    ];
    for (var txt of autoText) {
        form[txt] = readMap[txt];
    }
}

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<EJieyueguihuanForm>}
 */
export const canJieyueguihuanCreateForm = (id, readMap) => {
    return new Promise(async (resolve, reject) => {
        var form = JieyueguihuanCreateForm();
        if (!readMap || !readMap.id) {
            readMap = await canTushujieyueFindById(id).catch(reject);
        }
        exportForm(form, readMap);
        form.tushujieyueid = readMap.id;
        resolve({ form, readMap });
    });
};

/**
 * 响应式获取借阅归还 模块的表单字段数据
 * @return {EJieyueguihuanForm}
 */
export const useJieyueguihuanCreateForm = (id) => {
    const form = JieyueguihuanCreateForm();
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

export const canJieyueguihuanSelect = (filter, result) => {
    http.post("/api/jieyueguihuan/selectPages").then((res) => {
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
export const useJieyueguihuanSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canJieyueguihuanSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<EJieyueguihuan>}
 */
export const canJieyueguihuanFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/jieyueguihuan/findById", { id }).then((res) => {
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
 * @return {EJieyueguihuan}
 */
export const useJieyueguihuanFindById = (id) => {
    var form = reactive({});

    canJieyueguihuanFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {EJieyueguihuan} data
 * @return {Promise<EResponseData<EJieyueguihuan>>}
 */
export const canJieyueguihuanInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/jieyueguihuan/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("jieyueguihuan_insert", res.data);
                        event.emit("jieyueguihuan_change", res.data);
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
 * @param {EJieyueguihuan} data
 * @return {Promise<EResponseData<EJieyueguihuan>>}
 */
export const canJieyueguihuanUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/jieyueguihuan/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("jieyueguihuan_update", res.data);
                        event.emit("jieyueguihuan_change", res.data);
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
export const canJieyueguihuanDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/jieyueguihuan/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("jieyueguihuan_delete", res.data);
                        event.emit("jieyueguihuan_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};
