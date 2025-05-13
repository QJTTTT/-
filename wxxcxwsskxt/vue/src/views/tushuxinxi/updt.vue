<template>
    <div class="views-tushuxinxi-updt">
        <div>
            <el-card class="box-card">
                <template #header>
                    <div class="clearfix">
                        <span class="title"> 添加图书信息 </span>
                    </div>
                </template>

                <el-form :model="form" ref="formModel" :label-width="labelWidth" status-icon validate-on-rule-change>
                    <el-form-item label="图书号 " prop="tushuhao" :rules="[{required:true, message:'请填写图书号'}]">
                        <el-input type="text" placeholder="输入图书号" style="width: 450px" v-model="form.tushuhao" />
                    </el-form-item>

                    <el-form-item label="图书名称 " prop="tushumingcheng" required :rules="[{required:true, message:'请填写图书名称'}]">
                        <el-input type="text" placeholder="输入图书名称" style="width: 450px" v-model="form.tushumingcheng" />
                    </el-form-item>

                    <el-form-item label="图书类别 " prop="tushuleibie" required :rules="[{required:true, message:'请填写图书类别'}]">
                        <el-select v-model="form.tushuleibie"
                            ><e-select-option type="option" module="tushuzhonglei" value="id" label="fenleimingcheng"></e-select-option
                        ></el-select>
                    </el-form-item>

                    <el-form-item label="图片 " prop="tupian" required :rules="[{required:true, message:'请填写图片'}]">
                        <e-upload-image v-model="form.tupian" is-paste></e-upload-image>
                    </el-form-item>

                    <el-form-item
                        label="借阅金额 "
                        prop="jieyuejine"
                        required
                        :rules="[{required:true, message:'请填写借阅金额'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入借阅金额" style="width: 450px" v-model.number="form.jieyuejine" />
                    </el-form-item>

                    <el-form-item
                        label="图书库存 "
                        prop="tushukucun"
                        required
                        :rules="[{required:true, message:'请填写图书库存'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]"
                    >
                        <el-input type="number" placeholder="输入图书库存" style="width: 450px" v-model.number="form.tushukucun" />
                    </el-form-item>

                    <el-form-item label="ISBN号 " prop="isbnhao"> <el-input type="text" placeholder="输入ISBN号" style="width: 450px" v-model="form.isbnhao" /> </el-form-item>

                    <el-form-item label="作者 " prop="zuozhe" required :rules="[{required:true, message:'请填写作者'}]">
                        <el-input type="text" placeholder="输入作者" style="width: 450px" v-model="form.zuozhe" />
                    </el-form-item>

                    <el-form-item label="出版社 " prop="chubanshe" required :rules="[{required:true, message:'请填写出版社'}]">
                        <el-input type="text" placeholder="输入出版社" style="width: 450px" v-model="form.chubanshe" />
                    </el-form-item>

                    <el-form-item label="简介 " prop="jianjie"> <e-editor v-model="form.jianjie" @getContent="getjianjieContent"></e-editor> </el-form-item>

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
    import EEditor from "@/components/EEditor.vue";

    import { ref, reactive, computed } from "vue";
    import { useRoute } from "vue-router";
    import { session } from "@/utils/utils";
    import { ElMessage, ElMessageBox } from "element-plus";
    import { useTushuxinxiFindById, canTushuxinxiFindById, canTushuxinxiUpdate } from "@/module";

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
    const form = useTushuxinxiFindById(props.id);
    const emit = defineEmits(["success"]);
    const formModel = ref();
    const loading = ref(false);

    const submit = () => {
        formModel.value.validate().then((res) => {
            if (loading.value) return;
            loading.value = true;
            canTushuxinxiUpdate(form).then(
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

    const getjianjieContent = (v) => {
        form.jianjie = v;
    };
</script>

<style scoped lang="scss">
    .views-tushuxinxi-updt {
    }
</style>
