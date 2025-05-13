<template>
    <div class="views-jieyueguihuan-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加借阅归还 </span>
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

                    <el-form-item v-if="isRead" label="借阅单号 " prop="jieyuedanhao"> {{ form.jieyuedanhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅时间 " prop="jieyueshijian"> {{ form.jieyueshijian }} </el-form-item>

                    <el-form-item v-if="isRead" label="姓名 " prop="xingming"> {{ form.xingming }} </el-form-item>

                    <el-form-item v-if="isRead" label="电话 " prop="dianhua"> {{ form.dianhua }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅用户 " prop="jieyueyonghu"> {{ form.jieyueyonghu }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅金额 " prop="jieyuejine" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                        {{form.jieyuejine}}
                    </el-form-item>

                    <el-form-item v-if="isRead" label="归还时间 " prop="guihuanshijian"> {{ form.guihuanshijian }} </el-form-item>

                    <el-form-item label="实际归还时间 " prop="shijiguihuanshijian" :rules="[{required:true, message:'请填写实际归还时间'}]">
                        <el-date-picker v-model="form.shijiguihuanshijian" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

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

    import { ref, reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useJieyueguihuanCreateForm, canJieyueguihuanInsert } from "@/module";

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
    const { form, readMap } = useJieyueguihuanCreateForm(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);
    var submit = () => {
        return new Promise((resolve, reject) => {
            formModel.value
                .validate()
                .then((res) => {
                    if (loading.value) return;
                    loading.value = true;
                    canJieyueguihuanInsert(form).then(
                        (res) => {
                            loading.value = false;
                            if (res.code == 0) {
                                emit("success", res.data);
                                if (props.isHouxu) {
                                    ElMessage.success("添加成功");
                                    router.go(-1);
                                }
                            } else {
                                ElMessageBox.alert(res.msg);
                            }
                            resolve(res);
                        },
                        (err) => {
                            loading.value = false;
                            ElMessageBox.alert(err.message);
                            reject(err);
                        }
                    );
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
</script>

<style scoped lang="scss">
    .views-jieyueguihuan-add {
    }
</style>
