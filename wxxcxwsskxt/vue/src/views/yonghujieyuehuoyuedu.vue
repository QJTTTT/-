<template>
    <div class="views-yonghujieyuehuoyuedu">
        <div>
            <e-container> </e-container>
        </div>
        <div>
            <e-container>
                <div style="padding: 10px; background: #ffffff">
                    <el-table :data="tushujieyueList">
                        <el-table-column prop="jieyueyonghu" label="用户" width="180" />
                        <el-table-column prop="xingming" label="姓名" width="180" />
                        <el-table-column prop="count" label="借阅次数" sortable />
                    </el-table>
                </div>

                <v3-echarts :options="barOptions" width="100%" height="300px"></v3-echarts>
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
    const tushujieyueList = ref([]);
    const loadDatabaseList = async () => {
        var where = " 1=1 ";

        tushujieyueList.value = await DB.name("tushujieyue")
            .alias("tsj")
            .field("tsj.jieyueyonghu")
            .group("tsj.jieyueyonghu")
            .field("tsj.xingming")
            .group("tsj.xingming")
            .field("count(*) count")
            .order("count DESC")
            .where(where)
            .select();
    };

    loadDatabaseList();
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
                            name: s.xingming,
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
    .views-yonghujieyuehuoyuedu {
    }
</style>
