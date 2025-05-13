<template>
    <div class="views-tushucaigou-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 图书采购详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="图书号"> {{ map.tushuhao }} </el-descriptions-item>
                        <el-descriptions-item label="图书名称"> {{ map.tushumingcheng }} </el-descriptions-item>
                        <el-descriptions-item label="图书类别">
                            <e-select-view module="tushuzhonglei" :value="map.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                        </el-descriptions-item>
                        <el-descriptions-item label="采购编号"> {{ map.caigoubianhao }} </el-descriptions-item>
                        <el-descriptions-item label="供应商"> {{ map.gongyingshang }} </el-descriptions-item>
                        <el-descriptions-item label="采购价格"> {{ map.caigoujiage }} </el-descriptions-item>
                        <el-descriptions-item label="采购数量"> {{ map.caigoushuliang }} </el-descriptions-item>
                        <el-descriptions-item label="采购小计"> {{ map.caigouxiaoji }} </el-descriptions-item>
                        <el-descriptions-item label="经手人"> {{ map.jingshouren }} </el-descriptions-item>
                        <el-descriptions-item label="采购时间"> {{ map.addtime }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="采购备注"> {{ map.caigoubeizhu }} </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="no-print" v-if="isShowBtn">
                    <el-button @click="$router.go(-1)">返回</el-button>
                    <el-button @click="$print('#printdetail')">打印</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";

    import { ref, reactive, watch, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { extend } from "@/utils/extend";
    import { useTushucaigouFindById, canTushucaigouFindById } from "@/module";

    const route = useRoute();
    const props = defineProps({
        id: {
            type: [Number, String],
        },
        isShowBtn: {
            type: Boolean,
            default: true,
        },
    });

    /**
     * 获取详情页面的一行数据,当url参数id变更时，当url参数id变更时，自动更新map中的数据
     * @type {ETushucaigou}
     */
    const map = useTushucaigouFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canTushucaigouFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-tushucaigou-detail {
    }
</style>
