<template>
    <div class="views-tushuxujie-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加图书续借 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="图书号 " prop="tushuhao"> {{ form.tushuhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书名称 " prop="tushumingcheng"> {{ form.tushumingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书类别 " prop="tushuleibie">
                        <e-select-view module="tushuzhonglei" :value="form.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item v-if="isRead" label="借阅单号 " prop="jieyuedanhao"> {{ form.jieyuedanhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅用户 " prop="jieyueyonghu"> {{ form.jieyueyonghu }} </el-form-item>

                    <el-form-item v-if="isRead" label="借阅时间 " prop="jieyueshijian"> {{ form.jieyueshijian }} </el-form-item>

                    <el-form-item v-if="isRead" label="归还时间 " prop="guihuanshijian"> {{ form.guihuanshijian }} </el-form-item>

                    <el-form-item label="续借到 " prop="xujiedao" :rules="[{required:true, message:'请填写续借到'}]">
                        <el-date-picker v-model="form.xujiedao" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期"> </el-date-picker>
                    </el-form-item>

                    <el-form-item label="续借备注 " prop="xujiebeizhu"> <el-input type="textarea" v-model="form.xujiebeizhu"></el-input> </el-form-item>

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
    import { useTushuxujieCreateForm, canTushuxujieInsert } from "@/module";

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
    const { form, readMap } = useTushuxujieCreateForm(props.id);
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
                    canTushuxujieInsert(form).then(
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
    .views-tushuxujie-add {
    }
</style>
