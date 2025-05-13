<template>
    <div class="views-tushujieyue-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加图书借阅 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="图书号 " prop="tushuhao"> {{ form.tushuhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书名称 " prop="tushumingcheng"> {{ form.tushumingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书类别 " prop="tushuleibie">
                        <e-select-view module="tushuzhonglei" :value="form.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="图片 " prop="tupian"> <e-img :src="form.tupian" style="max-width: 120px" /> </el-form-item>

                    <el-form-item v-if="isRead" label="作者 " prop="zuozhe"> {{ form.zuozhe }} </el-form-item>

                    <el-form-item v-if="isRead" label="出版社 " prop="chubanshe"> {{ form.chubanshe }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅金额 " prop="jieyuejine" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{form.jieyuejine}}
                    </el-form-item>

                    <el-form-item label="借阅单号 " prop="jieyuedanhao" :rules="[{required:true, message:'请填写借阅单号'}]">
                        <el-input type="text" placeholder="输入借阅单号" style="width: 450px" v-model="form.jieyuedanhao" />
                    </el-form-item>

                    <el-form-item label="借阅时间 " prop="jieyueshijian" :rules="[{required:true, message:'请填写借阅时间'}]">
                        <el-date-picker v-model="form.jieyueshijian" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="归还时间 " prop="guihuanshijian" :rules="[{required:true, message:'请填写归还时间'}]">
                        <el-date-picker v-model="form.guihuanshijian" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="姓名 " prop="xingming" required :rules="[{required:true, message:'请填写姓名'}]">
                        <el-input type="text" placeholder="输入姓名" style="width: 450px" v-model="form.xingming" />
                    </el-form-item>

                    <el-form-item label="电话 " prop="dianhua" required :rules="[{required:true, message:'请填写电话'}, {validator:rule.checkPhone, message:'请输入正确手机号码'}]">
                        <el-input type="text" placeholder="输入电话" style="width: 450px" v-model="form.dianhua" />
                    </el-form-item>

                    <el-form-item label="借阅用户 " prop="jieyueyonghu"> <el-input v-model="form.jieyueyonghu" readonly style="width: 250px"></el-input> </el-form-item>

                    <el-form-item v-if="btnText">
                        <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                    </el-form-item>
                </el-form></el-card
            >
        </div>
    </div>
</template>

<script setup>
    import http from "@/utils/ajax/http";
    import DB from "@/utils/db";
    import rule from "@/utils/rule";
    import router from "@/router";

    import { ref, reactive, computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useTushujieyueFindById, canTushujieyueFindById, canTushujieyueUpdate, canTushuxinxiFindById } from "@/module";
    import { extend } from "@/utils/extend";

    const route = useRoute();
    const props = defineProps({
        id: [String, Number],
        btnText: {
            type: String,
            default: "保存",
        },
        isRead: {
            type: Boolean,
            default: true,
        },
        isHouxu: {
            type: Boolean,
            default: true,
        },
        labelWidth: {
            type: String,
            default: "140px",
        },
    });
    const form = useTushujieyueFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canTushujieyueUpdate(form).then(
                (res) => {
                    loading.value = false;
                    if (res.code == 0) {
                        emit("success", res.data);
                        if (props.isHouxu) {
                            ElMessage.success("更新成功");
                            router.go(-1);
                        }
                    } else {
                        ElMessageBox.alert(res.msg);
                    }
                },
                (err) => {
                    loading.value = false;
                    ElMessageBox.alert(err.message);
                }
            );
        });
    };

    const readMap = reactive({});
    watch(
        () => form.tushuxinxiid,
        (id) => {
            canTushuxinxiFindById(id).then((res) => {
                extend(readMap, res);
            });
        }
    );
</script>

<style scoped lang="scss">
    .views-tushujieyue-updt {
    }
</style>
