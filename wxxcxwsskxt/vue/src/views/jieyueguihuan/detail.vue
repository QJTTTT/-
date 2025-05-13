<template>
    <div class="views-jieyueguihuan-detail">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 借阅归还详情 </span>
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
                        <el-descriptions-item label="作者"> {{ map.zuozhe }} </el-descriptions-item>
                        <el-descriptions-item label="出版社"> {{ map.chubanshe }} </el-descriptions-item>
                        <el-descriptions-item label="借阅单号"> {{ map.jieyuedanhao }} </el-descriptions-item>
                        <el-descriptions-item label="借阅时间"> {{ map.jieyueshijian }} </el-descriptions-item>
                        <el-descriptions-item label="姓名"> {{ map.xingming }} </el-descriptions-item>
                        <el-descriptions-item label="电话"> {{ map.dianhua }} </el-descriptions-item>
                        <el-descriptions-item label="借阅用户"> {{ map.jieyueyonghu }} </el-descriptions-item>
                        <el-descriptions-item label="借阅金额"> {{ map.jieyuejine }} </el-descriptions-item>
                        <el-descriptions-item label="归还时间"> {{ map.guihuanshijian }} </el-descriptions-item>
                        <el-descriptions-item label="实际归还时间"> {{ map.shijiguihuanshijian }} </el-descriptions-item>
                        <el-descriptions-item label="借阅天数"> {{ map.jieyuetianshu }} </el-descriptions-item>
                        <el-descriptions-item label="借阅费用"> {{ map.jieyuefeiyong }} </el-descriptions-item>
                        <el-descriptions-item label="超时罚金"> {{ map.chaoshifajin }} </el-descriptions-item>
                        <el-descriptions-item label="总费用"> {{ map.zongfeiyong }} </el-descriptions-item>
                        <el-descriptions-item label="是否准时"> {{ map.shifouzhunshi }} </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions direction="vertical" class="margin-top" :column="1" border> </el-descriptions>
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
    import { useJieyueguihuanFindById, canJieyueguihuanFindById } from "@/module";

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
     * @type {EJieyueguihuan}
     */
    const map = useJieyueguihuanFindById(props.id);
    watch(
        () => props.id,
        (id) => {
            canJieyueguihuanFindById(id).then((res) => {
                extend(map, res);
            });
        }
    );
    // end 获取详情页面的一行数据
</script>

<style scoped lang="scss">
    .views-jieyueguihuan-detail {
    }
</style>
