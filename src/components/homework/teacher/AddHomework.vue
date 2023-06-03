<template>
    <div class="page">
        <el-row>
            <span class="title"><i class="el-icon-d-arrow-right"></i>作业发布</span>
            <div class="titlebox board-blue"/>
        </el-row>
        <el-row>
            <Form
                    :formWidth="formWidth"
                    :formData="formData"
                    :buttons="formButtons"
                    :formButtonsLoc = "formButtonsLoc"
                    :inline=false
                    class="form"
            >
                <template v-slot:editor>
                    <Editor
                            class="editor"
                            :detail="detail"
                            @eidtContent="eidtContent"
                    ></Editor>
                </template>
            </Form>
        </el-row>
    </div>
</template>
<script>
import Form from "@/components/common/CustomForm/CustomForm.vue"
import Editor from "../HomeworkEditor.vue"

export default {
    name: "AddHomework",
    components: {Form, Editor},
    data() {
        return {
            formWidth: "150px",
            formData: [
                {
                    prop: "title",
                    label: "作业标题",
                    type: 'Input',
                    width: '500px',
                    placeholder: '请填写作业标题',
                    maxlength: "20",
                    rules: [{required: true, message: '请输入作业标题', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}]
                },
                {
                    prop: "grade", label: "作业总分", type: 'Input_number', width: '100px',
                    rules: [{required: true, message: '请输入作业总分', trigger: 'blur'},
                        {min: 1, max: 100, type: "number", message: '作业总分在1-100之间', trigger: 'blur'}]
                },
                {
                    prop: "ratio", label: "分数占比", type: 'Input_number', width: '100px',
                    rules: [{required: true, message: '请输入分数占比', trigger: 'blur'},
                        {min: 1, max: 100, type: "number", message: '分数占比在1-100之间', trigger: 'blur'}]
                },
                {
                    prop: 'deadline',
                    type: 'Datetime',
                    label: '截止时间',
                    placeholder: '请选择截止时间',
                    default: new Date(),
                    format:"yyyy-MM-dd hh",
                    valueFormat:"yyyy-MM-dd hh:mm:ss",
                    pickerOptions:{
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }},
                    rules: [{required: true, message: '请输入截止时间', trigger: 'blur'}]
                },
                {
                    prop: 'isRepeat', type: 'Radio', label: '是否可以重复提交', default: 0,
                    options: [{label: '可以重复提交', value: 0}, {label: '只能提交一次', value: 1}]
                },
                {
                    type: "slot", slot_name: "editor", prop: 'content'
                }

            ],
            formButtonsLoc:"center",
            formButtons: [
                {
                    label: '发布',
                    action: 'submit',
                    style: 'margin-left:30%',
                    call: (data) => {
                        const _this = this
                        data.content = _this.content
                        console.log(data)
                        const deadline = _this.timestampToTime(data.deadline)

                        console.log(deadline)
                        //发布作业
                        let formData = new FormData()
                        formData.append('content', data.content)
                        formData.append('deadline', deadline)
                        formData.append('isRepeat', data.isRepeat)
                        formData.append('ratio', data.ratio)
                        formData.append('grade', data.grade)
                        formData.append('title', data.title)
                        formData.append('courseNum', sessionStorage.getItem("courseNum"))
                        formData.append('courseIndex', sessionStorage.getItem("courseIndex"))
                        formData.append('teacher', JSON.parse(sessionStorage.getItem('user')).name)
                        if(_this.update){
                            formData.append('homeworkNum',  this.$route.params.homework.homework)
                            _this.$axios.post('/homework/update', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                                withCredentials: true
                            }).then(function (response) {
                                // 这里是处理正确的回调
                                console.log(response)
                                _this.$message.success('发布成功')
                                _this.$router.push({name: 'THomeworkList'})
                            }).catch(function (response) {
                                // 这里是处理错误的回调
                                _this.$message.error('发布失败');
                                console.log(response)
                            })
                        }else{
                            _this.$axios.post('/homework/insert', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                },
                                withCredentials: true
                            }).then(function (response) {
                                // 这里是处理正确的回调
                                console.log(response)
                                _this.$message.success('发布成功')
                                _this.$router.push({name: 'THomeworkList'})
                            }).catch(function (response) {
                                // 这里是处理错误的回调
                                _this.$message.error('发布失败');
                                console.log(response)
                            })
                        }
                    },
                },
                {
                    label: '返回',
                    action: 'reset',
                    call: () => {
                        const _this = this
                        _this.$router.push({name: 'THomeworkList'})
                    },
                }
            ],
            content: "",
            detail: "",
            update:false
        };
    },
    created() {
        console.log("作业信息", this.$route.params.homework)
        if (this.$route.params.homework != undefined) {
            this.update=true
            this.formData[0].default = this.$route.params.homework.title
            this.formData[1].default = this.$route.params.homework.grade
            this.formData[2].default = this.$route.params.homework.ratio
            this.formData[3].default = new Date(this.$route.params.homework.deadline.replace(/-/g, "/"))
            this.formData[4].default = this.$route.params.homework.isRepeat
            this.detail = this.$route.params.homework.content
        }
    },
    methods: {
        eidtContent(val) {
            this.content = val
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
            return Y + M + D + h + m + s;
        }
    }

}
</script>

<style scoped>
.page {
    padding: 10px;
}

.back {
    margin-top: 20px !important;
    margin-left: 40% !important;
}

.title {
    font-weight: bold;
    margin: 10px;
}

.titlebox {
    padding: 10px;
    margin: 10px;
}

.board-blue {
    border-top: 2px solid rgb(47, 150, 204);
}

.editor {
    margin-left: -60px;
    margin-bottom: 50px;
}
</style>