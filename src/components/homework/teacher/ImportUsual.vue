<template>
    <div>
            <el-form :model="form" inline>
                <el-form-item label="学号列名" :label-width="formLabelWidth">
                    <el-input v-model="form.numberColumn"></el-input>
                </el-form-item>
                <el-form-item label="成绩列名" :label-width="formLabelWidth">
                    <el-input v-model="form.usualColumn"></el-input>
                </el-form-item>
            </el-form>
            <el-upload
                class="uploadFile"
                :multiple="false"
                :show-file-list="false"
                :action="actionPath"
                :data="form"
                :on-success="fileUploadSuccess"
                :with-credentials="true"
            >
                <el-button class="elbtn" type="primary">上传Excel</el-button>
            </el-upload>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ImportUsual",
    components: {},
    data() {
        return {
            form: {
                numberColumn: '学号',
                usualColumn: '成绩',
                course: '',
                courseIndex: 1
            },
            formLabelWidth: '120px',
            actionPath: axios.defaults.baseURL + '/course/score/usual/import',
        };
    },
    props: {
        course: {
            default: ''
        },
        courseIndex: {
            default: 1
        }
    },
    created() {
    },
    mounted() {
        this.form.course = this.course;
        this.form.courseIndex = this.courseIndex;
    },
    methods: {
        fileUploadSuccess(res) {
            if(res.code === '0000') {
                this.$message.success("导入成绩成功");
            } else {
                this.$message.error(res.msg);
            }
        },
    },
    computed: {},
};
</script>

<style scoped>
</style>