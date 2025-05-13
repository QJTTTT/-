<template>
    <div class="views-tushubaosun-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加图书报损 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="图书号 " prop="tushuhao"> {{ form.tushuhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书名称 " prop="tushumingcheng"> {{ form.tushumingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书类别 " prop="tushuleibie">
                        <e-select-view module="tushuzhonglei" :value="form.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item label="报损编号 " prop="baosunbianhao" :rules="[{required:true, message:'请填写报损编号'}]">
                        <el-input type="text" placeholder="输入报损编号" style="width: 450px" v-model="form.baosunbianhao" />
                    </el-form-item>

                    <el-form-item
                        label="报损数量 "
                        prop="baosunshuliang"
                        required
                        :rules="[{required:true, message:'请填写报损数量'}, {validator:rule.checkNumber, message:'输入一个有效数字'}, {validator:rule.checkMin, value:1}, {validator:rule.checkMax, value:readMap.tushukucun}]"
                    >
                        <el-input type="number" placeholder="输入报损数量" style="width: 450px" v-model.number="form.baosunshuliang" />
                    </el-form-item>

                    <el-form-item label="报损说明 " prop="baosunshuoming" required :rules="[{required:true, message:'请填写报损说明'}]">
                        <el-input type="text" placeholder="输入报损说明" style="width: 450px" v-model="form.baosunshuoming" />
                    </el-form-item>

                    <el-form-item label="经手人 " prop="jingshouren"> <el-input v-model="form.jingshouren" readonly style="width: 250px"></el-input> </el-form-item>

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
    import { useTushubaosunFindById, canTushubaosunFindById, canTushubaosunUpdate, canTushuxinxiFindById } from "@/module";
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
    const form = useTushubaosunFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canTushubaosunUpdate(form).then(
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
    .views-tushubaosun-updt {
    }
</style>
