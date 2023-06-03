<template>
    <div class="page">
        <el-row>
            <div class="htitile">
                <el-row>
                    <span style="font-size: 24px;color: #000;">{{homework.title}}</span>
                    <span class="text1" style=" color: #f84e5e; margin-left: 51px;">{{homework.deadline}} 提交截止</span>
                </el-row>
                <el-row style="margin-top: 20px">
                    <span class="text1">{{homework.teacher}}发布</span>
                    <span class="divide"></span>
                    <span class="text1"> 作业满分{{homework.grade}}</span>
                    <span class="divide"></span>
                    <span class="text1" v-if="homework.isRepeat == 0">允许多次提交</span>
                    <span class="text1" v-if="homework.isRepeat == 1">仅允许提交一次</span>
                </el-row>
            </div>

        </el-row>
        <el-row>
            <div class="hcontent">
                <h3>作业内容</h3>
                <div v-html="homework.content"></div>
            </div>

        </el-row>
        <el-row>
            <el-divider></el-divider>
            <Form
                    :formWidth="formWidth"
                    :formData="formData"
                    :buttons="formButtons"
                    :formButtonsLoc ="formButtonsLoc"
                    :inline=false
                    class="form"
            >
            </Form>
        </el-row>
    </div>
</template>
<script>
import Form from "@/components/common/CustomForm/CustomForm.vue"

export default {
    components: {Form},
    name: "TeacherHomeworkPage",
    data() {
        return {
            homework:{},
            editorOption: {
                modules: {
                    toolbar: {
                        container: [],
                    },
                },
                readyOnly: true,
                theme: 'snow',
            },
            formWidth: "100px",
            formData: [
                {
                    prop: "score", label: "作业得分", type: 'Input_number', width: '200px',
                    rules: [{required: true, message: '请输入作业得分', trigger: 'blur'}]
                },

            ],
            formButtonsLoc:"center",
            formButtons: [
                {
                    label: '提交',
                    action: 'submit',
                    call: (data) => {
                        console.log(data)
                        const _this = this
                        if(data.score >  _this.homework.grade)
                            _this.$message.error('作业成绩应该低于最高分');
                        //发布作业
                        let formData = new FormData()
                        formData.append('homework', _this.homework.homework)
                        formData.append('studentNumber', _this.homework.student)
                        formData.append('score', data.score)
                        _this.$axios.post('/homework/score', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                            withCredentials: true
                        }).then(function (response) {
                            // 这里是处理正确的回调
                            console.log(response)
                            _this.$message.success('提交成功')
                            _this.$router.push({name: 'StudentHomeworkList'})
                        }).catch(function (response) {
                            // 这里是处理错误的回调
                            _this.$message.error('提交失败');
                            console.log(response)
                        })
                    },
                    style: 'margin-left:30%',
                },
                {
                    label: '返回',
                    action: 'reset',
                    call: () => {
                        const _this = this
                        _this.$router.push({name: 'StudentHomeworkList'})
                    },
                }
            ],

        };
    },
    methods: {
        focus(event) {
            event.enable(false);  //设置富文本编辑器不可编辑
        },
        timeChange(time) {
            var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        }
    },
    created() {
        console.log("作业信息", this.$route.params.homework)
        this.homework = this.$route.params.homework
        this.homework.deadline = this.timeChange(this.homework.deadline)
    }

}
</script>
<style>
.htitile {
    background-color: rgb(234, 234, 234);
    margin: 10px 20px;
    padding: 25px 40px;
//border: 2px solid red; border-radius: 10px;
}

.hcontent {
    margin: 10px 20px;
}

.editor {
    margin: 10px 15px;
}

.text1 {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    color: #000;
}

.action {
    margin-left: 45%;
}

.divide {
    border-left: 2px solid black;
    margin: 0px 40px;
}


</style>
