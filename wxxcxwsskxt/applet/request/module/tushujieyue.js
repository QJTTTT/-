import { httpGet, httpPost } from "../request";
import rule from "../../utils/rule";
const utils = require("../../utils/util");

const readStore = require("./tushuxinxi");

const app = getApp();

const { handlerKeyValue, remove, findIndex, isArray, extend } = utils;
const state = {
    status: 0,
    lists: [],
    objLists: {},
};

var actions = {};
const mutations = {
    setLists(state, data) {
        state.lists = data;
        state.objLists = handlerKeyValue(data);
    },
    setStatus(state, data) {
        state.status = data;
    },
    push(state, data) {
        state.lists.push(data);
        state.objLists[data.id] = data;
    },
    insert(state, data) {
        // 从头部插入数据
        state.lists.unshift(data);
        state.objLists[data.id] = data;
    },
    update(state, data) {
        if (!data.id || !state.objLists[data.id]) return;
        extend(state.objLists[data.id], data); // 合并数据
    },
    replace(state, data) {
        // 判断是否存在，存在则插入，不存在则
        if (!state.objLists[data.id]) {
            // 不存在，则插入数据
            state.lists.unshift(data);
            state.objLists[data.id] = data;
        } else {
            extend(state.objLists[data.id], data); // 合并数据
        }
    },
    delete(state, listIds) {
        for (var i = 0; i < listIds.length; i++) {
            var index = findIndex(state.lists, (r) => r.id == listIds[i]);
            if (index !== false) {
                remove(state.lists, index);
            }
        }
    },
};

var content = (actions = {
    selectAll() { // 获取所有数据
        return new Promise((resolve, reject) => {
            if (content.state.status == 0) {
                content.commit("setStatus", 1);
                httpGet("/api/tushujieyue/selectAll").then(
                    (res) => {
                        if (res.code == 0) {
                            content.commit("setLists", res.data);
                            content.commit("setStatus", 2);
                            resolve(res.data);
                        } else {
                            content.commit("setStatus", 0);
                        }
                    },
                    (err) => {
                        reject(err);
                        content.commit("setStatus", 0);
                    }
                );
            } else if (content.state.status == 1) {
                // 等待数据完成
                var callbackFunc = () => {
                    var status = content.state.status;
                    if (status == 1) {
                        setTimeout(callbackFunc, 20);
                    } else if (status == 2) {
                        resolve(content.state.lists);
                    } else {
                        reject(new Error("估计网络出错了"));
                    }
                };
                setTimeout(callbackFunc, 20);
            } else {
                resolve(content.state.lists);
            }
        });
    },
    findById(id) {
        return new Promise((resolve, reject) => {
            httpGet("/api/tushujieyue/findById", { id }).then((res) => {
                if (res.code == 0) {
                    resolve(res.data);
                } else {
                    reject(res.msg);
                }
            });
        });
    },

    query(data) {
        // 分页查询数据
        return new Promise((resolve, reject) => {
            httpPost("/api/tushujieyue/selectPages", data).then(
                (res) => {
                    if (res.code == 0) {
                        resolve(res);
                    } else {
                        reject(res.msg);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    },

    queryjieyueyonghu(data) {
        // 分页查询数据
        return new Promise((resolve, reject) => {
            httpPost("/api/tushujieyue/selectPagesJieyueyonghu", data).then(
                (res) => {
                    if (res.code == 0) {
                        resolve(res);
                    } else {
                        reject(res.msg);
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });
    },
    update(data) {
        // 更新数据
        return new Promise((resolve, reject) => {
            httpPost("/api/tushujieyue/update", data).then(
                (res) => {
                    if (res.code == 0) {
                        if (content.state.status == 0) {
                            content.dispatch("selectAll");
                        } else {
                            content.commit("update", res.data);
                        }
                    }
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    },
    insert(data) {
        // 插入数据
        return new Promise((resolve, reject) => {
            httpPost("/api/tushujieyue/insert", data).then(
                (res) => {
                    if (res.code == 0) {
                        if (content.state.status == 0) {
                            content.dispatch("selectAll");
                        } else {
                            content.commit("insert", res.data);
                        }
                    }
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    },
    delete(data) {
        // 删除数据
        return new Promise((resolve, reject) => {
            httpPost("/api/tushujieyue/delete", isArray(data) ? data : [data]).then(
                (res) => {
                    if (res.code == 0) {
                        if (content.state.status == 0) {
                            content.dispatch("selectAll");
                        } else {
                            content.commit("delete", data);
                        }
                    }
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    },

    state: state,
    commit(name, data) {
        if (mutations[name]) {
            mutations[name](state, data);
        }
    },
    dispatch(name, data) {
        if (actions[name]) {
            return actions[name](data);
        }
    },
    formatDataList(lists) {
        for (var map of lists) {
            this.formatData(map);
        }
    },
    // 格式化数据
    formatData(map) {
        if (map.tupian) {
            map.tupian = map.tupian
                .split(",")
                .filter((s) => s)
                .map((s) => utils.formatImageSrc(s));
        }
    },
    createForm() {
        var $get = utils.getCurrentRouteQuery();
        const app = getApp();

        var form = {
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
            xingming: app.session("xingming"),
            dianhua: app.session("shouji"),
            jieyueyonghu: app.session("username"),
            jieyuezhuangtai: "借阅成功",
            tushuxinxiid: 0,
        };
        return form;
    },
    loadInfo(id, readMap = null) {
        return new Promise((resolve, reject) => {
            var obj = this.createForm();
            function getData(data) {
                var autoText = ["tushuxinxiid", "tushuhao", "tushumingcheng", "tushuleibie", "tupian", "zuozhe", "chubanshe", "jieyuejine"];
                for (var txt of autoText) {
                    obj[txt] = data[txt];
                }
                obj.tushuxinxiid = id;

                resolve({ form: obj, readMap: data });
            }
            if (readMap) {
                getData(readMap);
            } else {
                readStore
                    .dispatch("findById", id)
                    .then((data) => {
                        getData(data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    },
});

module.exports = actions;
