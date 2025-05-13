<template>
    <div class="views-tushucaigou-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加图书采购 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item v-if="isRead" label="图书号 " prop="tushuhao"> {{ form.tushuhao }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书名称 " prop="tushumingcheng"> {{ form.tushumingcheng }} </el-form-item>

                    <el-form-item v-if="isRead" label="图书类别 " prop="tushuleibie">
                        <e-select-view module="tushuzhonglei" :value="form.tushuleibie" select="id" show="fenleimingcheng"></e-select-view>
                    </el-form-item>

                    <el-form-item label="采购编号 " prop="caigoubianhao" :rules="[{required:true, message:'请填写采购编号'}]">
                        <el-input type="text" placeholder="输入采购编号" style="width: 450px" v-model="form.caigoubianhao" />
                    </el-form-item>

                    <el-form-item label="供应商 " prop="gongyingshang" required :rules="[{required:true, message:'请填写供应商'}]">
                        <el-input type="text" placeholder="输入供应商" style="width: 450px" v-model="form.gongyingshang" />
                    </el-form-item>

                    <el-form-item
                        label="采购价格 "
                        prop="caigoujiage"
                        required
                        :rules="[{required:true, message:'请填写采购价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入采购价格" style="width: 450px" v-model.number="form.caigoujiage" />
                    </el-form-item>

                    <el-form-item
                        label="采购数量 "
                        prop="caigoushuliang"
                        required
                        :rules="[{required:true, message:'请填写采购数量'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入采购数量" style="width: 450px" v-model.number="form.caigoushuliang" />
                    </el-form-item>

                    <el-form-item label="采购备注 " prop="caigoubeizhu"> <el-input type="textarea" v-model="form.caigoubeizhu"></el-input> </el-form-item>

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
    import { useTushucaigouFindById, canTushucaigouFindById, canTushucaigouUpdate, canTushuxinxiFindById } from "@/module";
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
    const form = useTushucaigouFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canTushucaigouUpdate(form).then(
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
    .views-tushucaigou-updt {
    }
</style>
