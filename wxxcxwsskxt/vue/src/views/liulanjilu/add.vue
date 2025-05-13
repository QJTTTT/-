<template>
    <div class="views-liulanjilu-add">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加浏览记录 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="图书号 " prop="tushuhao"> {{ form.tushuhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书名称 " prop="tushumingcheng"> {{ form.tushumingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书类别 " prop="tushuleibie">
                        <e-select-view module="tushuzhonglei" :value="form.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item label="浏览用户 " prop="liulanyonghu"> <el-input v-model="form.liulanyonghu" readonly style="width: 250px"></el-input> </el-form-item>

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
    import { useLiulanjiluCreateForm, canLiulanjiluInsert } from "@/module";

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
    const { form, readMap } = useLiulanjiluCreateForm(props.id);
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
                    canLiulanjiluInsert(form).then(
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
    .views-liulanjilu-add {
    }
</style>
