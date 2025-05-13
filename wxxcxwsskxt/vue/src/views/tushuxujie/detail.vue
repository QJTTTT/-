<template>
    <div class="views-tushuxujie-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 图书续借详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="图书号"> {{ map.tushuhao }} </el-descriptions-item>
                        <el-descriptions-item label="图书名称"> {{ map.tushumingcheng }} </el-descriptions-item>
                        <el-descriptions-item label="图书类别">
                            <e-select-view module="tushuzhonglei" :value="map.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                        </el-descriptions-item>
                        <el-descriptions-item label="借阅单号"> {{ map.jieyuedanhao }} </el-descriptions-item>
                        <el-descriptions-item label="借阅用户"> {{ map.jieyueyonghu }} </el-descriptions-item>
                        <el-descriptions-item label="借阅时间"> {{ map.jieyueshijian }} </el-descriptions-item>
                        <el-descriptions-item label="归还时间"> {{ map.guihuanshijian }} </el-descriptions-item>
                        <el-descriptions-item label="续借到"> {{ map.xujiedao }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="续借备注"> {{ map.xujiebeizhu }} </el-descriptions-item>
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
    import { useTushuxujieFindById, canTushuxujieFindById } from "@/module";

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
     * @type {ETushuxujie}
     */
    const map = useTushuxujieFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canTushuxujieFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-tushuxujie-detail {
    }
</style>
