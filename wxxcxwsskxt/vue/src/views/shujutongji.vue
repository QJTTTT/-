<template>
    <div class="views-shujutongji">
        <div>
            <e-container> </e-container>
        </div>
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">图书借阅数据</h3>
                    <div class="sidebar-widget-body">
                        <div style="padding: 10px; background: #ffffff">
                            <el-table :data="tushujieyueList">
                                <el-table-column prop="tushumingcheng" label="图书名称" width="180" />
                                <el-table-column prop="count" label="借阅次数" sortable />
                            </el-table>
                        </div>

                        <v3-echarts :options="barOptions" width="100%" height="300px"></v3-echarts>
                    </div>
                    <!-- /.sidebar-widget-body -->
                </div>
            </e-container>
        </div>
        <div>
            <e-container>
                <div class="title-modelbox-widget1">
                    <h3 class="section-title">分类借阅数据</h3>
                    <div class="sidebar-widget-body">
                        <div style="padding: 10px; background: #ffffff">
                            <el-table :data="tushujieyueList1">
                                <el-table-column prop="fenleimingcheng" label="分类名称" width="180" />
                                <el-table-column prop="count" label="借阅次数" sortable />
                            </el-table>
                        </div>

                        <v3-echarts :options="barOptions1" width="100%" height="300px"></v3-echarts>
                    </div>
                    <!-- /.sidebar-widget-body -->
                </div>
            </e-container>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";

    import { ref, reactive, computed, unref } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";

    const route = useRoute();
    const tushujieyueList1 = ref([]);
    const loadDatabaseList = async () => {
        var where = " 1=1 ";

        tushujieyueList1.value = await DB.name("tushujieyue")
            .alias("tsj")
            .joinLeft("tushuzhonglei tsz", "tsj.tushuleibie=tsz.id")
            .field("tsz.fenleimingcheng")
            .group("tsz.fenleimingcheng")
            .field("count(tsj.id) count")
            .order("count DESC")
            .where(where)
            .select();
    };

    loadDatabaseList();
    const tushujieyueList = ref([]);
    const loadDatabaseList1 = async () => {
        var where = " 1=1 ";

        tushujieyueList.value = await DB.name("tushujieyue")
            .alias("tsj")
            .field("tsj.tushumingcheng")
            .group("tsj.tushumingcheng")
            .field("count(*) count")
            .order("count DESC")
            .where(where)
            .select();
    };

    loadDatabaseList1();
    const barOptions = computed(() => {
        var list = unref(tushujieyueList);
        return {
            title: {
                text: "",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}：{c},{d}%",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "图书借阅数量",
                    type: "pie",
                    radius: "50%",
                    data: list.map((s) => {
                        return {
                            value: parseFloat(s.count),
                            name: s.tushumingcheng,
                        };
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
    });
    const barOptions1 = computed(() => {
        var list = unref(tushujieyueList1);
        return {
            title: {
                text: "",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}：{c},{d}%",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "图书借阅数量",
                    type: "pie",
                    radius: "50%",
                    data: list.map((s) => {
                        return {
                            value: parseFloat(s.count),
                            name: s.fenleimingcheng,
                        };
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
    });
</script>

<style scoped lang="scss">
    .views-shujutongji {
    }
</style>
