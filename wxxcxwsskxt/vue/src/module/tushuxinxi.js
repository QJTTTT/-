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
 * @return {ETushuxinxi}
 */

export const TushuxinxiCreateForm = () => {
    var route = unref(router.currentRoute);
    const userStore = useUserStore();
    const $session = userStore.session;
    if (!route.query) {
        route = useRoute();
    }
    const form = {
        tushuhao: rule.getID(),
        tushumingcheng: "",
        tushuleibie: "",
        tupian: "",
        jieyuejine: "",
        tushukucun: "",
        isbnhao: "",
        zuozhe: "",
        chubanshe: "",
        jieyuecishu: "0",
        jianjie: "",
    };

    return form;
};

/**
 * 异步模式获取数据
 * @param id
 * @param readMap
 * @return {Promise<ETushuxinxiForm>}
 */
export const canTushuxinxiCreateForm = () => {
    return new Promise(async (resolve, reject) => {
        var form = TushuxinxiCreateForm();
        resolve({ form });
    });
};

/**
 * 响应式获取图书信息 模块的表单字段数据
 * @return {ETushuxinxiForm}
 */
export const useTushuxinxiCreateForm = () => {
    const form = TushuxinxiCreateForm();
    const formReactive = reactive(form);

    return { form: formReactive };
};

export const canTushuxinxiSelect = (filter, result) => {
    http.post("/api/tushuxinxi/selectPages").then((res) => {
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
export const useTushuxinxiSelect = (filter) => {
    const result = reactive({
        lists: [],
        total: {},
    });
    canTushuxinxiSelect(filter, result);
    return result;
};

/**
 * 根据
 * @param id
 * @return {Promise<ETushuxinxi>}
 */
export const canTushuxinxiFindById = (id) => {
    return new Promise((resolve, reject) => {
        // 读取后台数据
        http.get("/api/tushuxinxi/findById", { id }).then((res) => {
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
 * @return {ETushuxinxi}
 */
export const useTushuxinxiFindById = (id) => {
    var form = reactive({});

    canTushuxinxiFindById(id).then((res) => {
        extend(form, res);
    });
    return form;
};

/**
 * 根据数据,插入到数据库中
 * @param {ETushuxinxi} data
 * @return {Promise<EResponseData<ETushuxinxi>>}
 */
export const canTushuxinxiInsert = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuxinxi/insert", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxinxi_insert", res.data);
                        event.emit("tushuxinxi_change", res.data);
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
 * @param {ETushuxinxi} data
 * @return {Promise<EResponseData<ETushuxinxi>>}
 */
export const canTushuxinxiUpdate = (data) => {
    return new Promise((resolve, reject) => {
        http.post("/api/tushuxinxi/update", data)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxinxi_update", res.data);
                        event.emit("tushuxinxi_change", res.data);
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
export const canTushuxinxiDelete = (id) => {
    var res = [];
    if (!isArray(id)) {
        res.push(id);
    } else {
        res = id;
    }

    return new Promise((resolve, reject) => {
        http.post("/api/tushuxinxi/delete", res)
            .json()
            .then(
                (res) => {
                    resolve(res);
                    if (res.code == 0) {
                        event.emit("tushuxinxi_delete", res.data);
                        event.emit("tushuxinxi_change", res.data);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
    });
};

export const useTushuxinxishoucang = (id, iss, count) => {
    const is_shoucang = iss ? iss : ref(false);
    const shoucangCount = count ? count : ref(0);

    http.get("/api/tushuxinxi/getshoucang", { id }).then((res) => {
        if (res.code == 0) {
            is_shoucang.value = res.data.is_shoucang;
            shoucangCount.value = res.data.shoucangCount;
        }
    });

    return { is_shoucang, shoucangCount };
};
