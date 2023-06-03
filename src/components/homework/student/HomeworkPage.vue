<template>
    <div class="page">
        <el-row>
            <div class="htitile">
                <el-row>
                    <span style="font-size: 24px;color: #000;">{{studentHomework.title}}</span>
                    <span class="text1" style=" color: #f84e5e; margin-left: 51px;">{{studentHomework.deadline}} 提交截止</span>
                </el-row>
                <el-row style="margin-top: 20px">
                    <span class="text1">{{studentHomework.teacher}}发布</span>
                    <span class="divide"></span>
                    <span class="text1"> 作业满分{{studentHomework.grade}}</span>
                    <span class="divide"></span>
                    <span class="text1" v-if="studentHomework.isRepeat == 0">允许多次提交</span>
                    <span class="text1" v-if="studentHomework.isRepeat == 1">仅允许提交一次</span>
                </el-row>
            </div>

        </el-row>
        <el-row>
            <div class="hcontent">
                <h3>作业内容</h3>
                <div v-html="studentHomework.homeworkContent"></div>
            </div>

        </el-row>
        <el-row>
            <el-divider></el-divider>
            <div class="editor">
                <Editor
                    @eidtContent="eidtContent"
                    :detail="detail"
                ></Editor>
            </div>
            <div class="action">
                <el-button size="mini" @click="submit" v-if="studentHomework.isRepeat == 0 || studentHomework.status == 0">提交</el-button>
                <el-button size="mini" @click="cancel">取消</el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
import Editor from "../HomeworkEditor.vue"

export default {
    components: {Editor,},
    data() {
        return {
            studentHomework: {},
            editorOption: {
                modules: {
                    toolbar: {
                        container: [],
                    },
                },
                readyOnly: true,
                theme: 'snow',
            },
            content:"",
            detail:""
        };
    },
    methods: {
        focus(event) {
            event.enable(false);  //设置富文本编辑器不可编辑
        },
        submit(){
            if(this.content == "")
                _this.$message.error('作业内容不能为空');
            const _this = this
            //发布作业
            let formData = new FormData()
            formData.append('homework', this.studentHomework.homework)
            formData.append('studentNumber', this.studentHomework.student)
            formData.append('content', this.content)
            _this.$axios.post('/homework/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }).then(function (response) {
                // 这里是处理正确的回调
                console.log(response)
                _this.$message.success('提交成功')
                _this.$router.push({name: 'HomeworkList'})
            }).catch(function (response) {
                // 这里是处理错误的回调
                _this.$message.error('提交失败');
                console.log(response)
            })

            // alert("提交成功")
            // this.$router.push({name: 'HomeworkList'})
        },
        cancel(){
            this.$router.push({name: 'HomeworkList'})
        },
        eidtContent(val){
            // console.log(val)
            this.content = val
        }
    },
    created() {
        console.log("作业信息", this.$route.params.studentHomework)
        this.studentHomework = this.$route.params.studentHomework
        this.detail = this.$route.params.studentHomework.content
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
.action{
    margin-left: 45%;
}

.divide {
    border-left: 2px solid black;
    margin: 0px 40px;
}


</style>
