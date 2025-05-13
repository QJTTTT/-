<template>
    <div class="views-liulanjilu-list">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 浏览记录查询 </span>
                    </div>
                </template>

                <div class="form-search">
                    <el-form @submit.prevent.stop :inline="true" size="small">
                        <el-form-item label="图书号">
                            <el-input v-model="search.tushuhao"></el-input>
                        </el-form-item>
                        <el-form-item label="图书名称">
                            <el-input v-model="search.tushumingcheng"></el-input>
                        </el-form-item>
                        <el-form-item label="图书类别">
                            <el-select v-model="search.tushuleibie"
                                ><el-option label="请选择" value=""></el-option
                                ><e-select-option type="option" module="tushuzhonglei" value="id" label="fenleimingcheng"></e-select-option
                            ></el-select>
                        </el-form-item>
                        <el-form-item label="浏览用户">
                            <el-input v-model="search.liulanyonghu"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchSubmit" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <el-table border :data="lists" style="width: 100%" @sort-change="sortChange" highlight-current-row>
                    <el-table-column type="index" label="#"></el-table-column>
                    <!-- 序号 -->

                    <el-table-column prop="tushuhao" label="图书号" width="180">
                        <template #default="{row}"> {{ row.tushuhao }} </template>
                    </el-table-column>
                    <el-table-column prop="tushumingcheng" label="图书名称"width="180">
                        <template #default="{row}"> {{ row.tushumingcheng }} </template>
                    </el-table-column>
                    <el-table-column prop="tushuleibie" label="图书类别" width="180">
                        <template #default="{row}"> <e-select-view module="tushuzhonglei" :value="row.tushuleibie" select="id" show="fenleimingcheng"></e-select-view> </template>
                    </el-table-column>
                    <el-table-column prop="liulanyonghu" label="浏览用户" width="180">
                        <template #default="{row}"> {{ row.liulanyonghu }} </template>
                    </el-table-column>
                    <el-table-column prop="addtime" label="浏览时间">
                        <template #default="{row}"> {{ row.addtime.substring(0,19) }} </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="250">
                        <template #default="{row}">
                            <el-button-group>
                                <el-tooltip effect="dark" content="详情" placement="top-start"
                                    ><el-button type="info" :icon="InfoFilled" size="small" @click="$router.push('/admin/liulanjilu/detail?id='+row.id)">详情</el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="编辑" placement="top-start"
                                    ><el-button type="success" :icon="Edit" size="small" @click="$router.push('/admin/liulanjilu/updt?id='+row.id)">编辑</el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="删除" placement="top-start"
                                    ><el-button type="danger" :icon="Delete" size="small" @click="deleteItems(row.id)">删除</el-button>
                                </el-tooltip>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="e-pages" style="margin-top: 10px; text-align: center">
                    <el-pagination
                        @current-change="loadList"
                        :page-sizes="[12, 24, 36, 48,60]"
                        v-model:current-page="search.page"
                        v-model:page-size="search.pagesize"
                        @size-change="sizeChange"
                        layout="total, sizes, prev, pager, next"
                        :total="totalCount"
                    >
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import router from "@/router";

    import { ref, reactive, watch, unref, onBeforeMount } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { canLiulanjiluSelect, useLiulanjiluSelect, canLiulanjiluDelete } from "@/module";
    import { extend } from "@/utils/extend";
    import { ElMessageBox, ElMessage } from "element-plus";
    import { InfoFilled, Edit, Delete } from "@element-plus/icons-vue";

    const route = useRoute();
    const search = reactive({
        tushuxinxiid: "",
        tushuhao: "",
        tushumingcheng: "",
        tushuleibie: "",
        liulanyonghu: "",
        page: 1, // 当前页
        pagesize: 12, // 每页行数
        orderby: "id", // 排序字段
        sort: "desc", // 排序类型
    });
    extend(search, route.query);
    // 链接参数变化时更新这些内容
    watch(
        () => route.query,
        () => {
            extend(search, route.query);
            loadList(1);
        },
        { deep: true }
    );

    // 总行数
    const totalCount = ref(0);
    /**
     * 列表数据
     * @type {ELiulanjilu[]}
     */
    const lists = ref([]);
    // 加载状态
    const loading = ref(false);

    // 排序操作
    const sortChange = (e) => {
        console.log(e);
        if (e.order == null) {
            search.orderby = "id";
            search.sort = "desc";
        } else {
            search.orderby = e.prop;
            search.sort = e.order == "ascending" ? "asc" : "desc";
        }
        loadList(1);
    };
    // 设置页数多少
    const sizeChange = (e) => {
        search.pagesize = e;
        loadList(1);
    };

    const deleteItems = (ids) => {
        return new Promise((resolve, reject) => {
            ElMessageBox.confirm("确定删除？")
                .then((res) => {
                    canLiulanjiluDelete(ids).then((res) => {
                        if (res.code == 0) {
                            ElMessage.success("删除成功");
                            loadList(search.page);
                            resolve(res.data);
                        } else {
                            ElMessage.error(res.msg);
                        }
                    });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    // 加载浏览记录列表方法
    const loadList = (page) => {
        // 加载
        if (unref(loading)) return;
        loading.value = true;
        search.page = page;

        http.post("/api/liulanjilu/selectPages", search).then(
            (res) => {
                loading.value = false;
                if (res.code == 0) {
                    var data = res.data;
                    lists.value = data.lists.records;
                    totalCount.value = data.lists.total;
                }
            },
            (err) => {
                loading.value = false;
                ElMessage.error(err.message);
            }
        );
    };

    onBeforeMount(() => {
        loadList(1);
    });
    const searchSubmit = () => {
        loadList(1);
    };
</script>

<style scoped lang="scss">
    .views-liulanjilu-list {
    }
</style>
