<template>
    <div class="views-tushuxinxi-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 图书信息详情 </span>
                    </div>
                </template>

                <div id="printdetail">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item label="图书号"> {{ map.tushuhao }} </el-descriptions-item>
                        <el-descriptions-item label="图书名称"> {{ map.tushumingcheng }} </el-descriptions-item>
                        <el-descriptions-item label="图书类别">
                            <e-select-view module="tushuzhonglei" :value="map.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                        </el-descriptions-item>
                        <el-descriptions-item label="图片"> <e-img :src="map.tupian" class="detail-image" style="max-width: 120px" /> </el-descriptions-item>
                        <el-descriptions-item label="借阅金额"> {{ map.jieyuejine }} </el-descriptions-item>
                        <el-descriptions-item label="图书库存"> {{ map.tushukucun }} </el-descriptions-item>
                        <el-descriptions-item label="ISBN号"> {{ map.isbnhao }} </el-descriptions-item>
                        <el-descriptions-item label="作者"> {{ map.zuozhe }} </el-descriptions-item>
                        <el-descriptions-item label="出版社"> {{ map.chubanshe }} </el-descriptions-item>
                        <el-descriptions-item label="借阅次数"> {{ map.jieyuecishu }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border>
                        <el-descriptions-item label="简介"> <div v-html="map.jianjie"></div> </el-descriptions-item>
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
    import { useTushuxinxiFindById, canTushuxinxiFindById } from "@/module";

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
     * @type {ETushuxinxi}
     */
    const map = useTushuxinxiFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canTushuxinxiFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-tushuxinxi-detail {
    }
</style>
