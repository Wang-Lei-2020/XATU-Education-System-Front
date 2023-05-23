<template>
    <div id="table">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="请选择方案" label-width="100px">
                <el-upload
                        ref="upload"
                        action=""
                        :on-remove="handleRemove"
                        :on-change="fileChange"
                        :on-preview="handlePreview"
                        :before-upload="beforeAvatarUpload"
                        :before-remove="beforeRemove"
                        :auto-upload="false"
                        multiple
                        :file-list="upload.fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>

    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "FileUpload",
    data() {
        return {
            // 非多个禁用
            multiple: true,
            // 文件下载列表
            dataFileList: [],
            // 表单参数
            form: {},
            // 表单校验
            rules: {},
            // 上传参数
            upload: {
                // 是否禁用上传
                isUploading: false,
                // 设置上传的请求头部
                // headers: {Authorization: "Bearer " + getToken()},
                // 上传的地址
                // url: process.env.VUE_APP_BASE_API + "/system/treatment/upload",
                // 上传的文件列表
                fileList: []
            },

        };
    },

    methods: {
        /** 文件预上传格式限制 */
        beforeAvatarUpload() {
            // const isJPG = file.type === 'image/jpeg'
            // const isPng = file.type === 'image/png'
            // const isLt2M = file.size / 1024 / 1024 < 2
            //
            // if (!isJPG && !isPng) {
            //     this.$message.error('上传图片只能是 JPG或png 格式!')
            // }
            // if (!isLt2M) {
            //     this.$message.error('上传图片大小不能超过 2MB!')
            // }
            // return (isJPG || isPng) && isLt2M
        },
        /** 文件移除时 */
        handleRemove(file, fileList) {
            for (const i in this.picList) {
                if (this.picList[i].key === file.uid) {
                    this.picList.splice(i, 1)
                }
            }
            this.upload.fileList = fileList
        },
        // 文件改变时
        fileChange(file, fileList) {
            this.upload.fileList = fileList
        },
        // 文件移除之前
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handlePreview(file) {
            console.log(file.uuid);
            var url = axios.defaults.baseURL + "/homework/download?fileIndex=" + file.uuid + "&fileName="+file.name
            window.open(url)
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                console.log(valid);
                if (valid) {
                    if (this.form.tId != null) {
                        this.upload.fileList.forEach(file => {
                            let formData = new FormData()
                            formData.append('file', file.raw)
                            axios.post('/homework/upload', formData)
                                .then(res => res.data)
                                .then(data => {
                                    console.log(data)
                                    file.uuid = data.data;
                                })
                        })
                        // updateTreatment(formData).then(response => {
                        //     this.msgSuccess("修改成功");
                        //     this.open = false;
                        //     this.getList();
                        // });
                    } else {
                        this.upload.fileList.forEach(file => {
                            let formData = new FormData()
                            formData.append('file', file.raw)
                            axios.post('/homework/upload', formData)
                                .then(res => res.data)
                                .then(data => {
                                    console.log(data)
                                    file.uuid = data.data;
                                })
                        })
                        // formData.append("snakebiteType", this.form.snakebiteType)
                        // formData.append("programmeName", this.form.programmeName)
                        // formData.append("programmeDescribe", this.form.programmeDescribe)
                        // formData.append("orgCode", this.form.orgCode)
                        // formData.append("orgName", this.form.orgName)
                        // addTreatment(formData).then(response => {
                        //     this.msgSuccess("新增成功");
                        //     this.open = false;
                        //     this.getList();
                        // });
                    }
                }
            });
        },
        // 取消按钮
        cancel() {
            this.reset();
        },

    }
};
</script>

<style scoped>
</style>
