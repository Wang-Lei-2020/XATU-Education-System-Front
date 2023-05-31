<template>
    <div class="page">
        <el-row>
            <div class="htitile">
                <el-row>
                    <span style="font-size: 24px;color: #000;">小作业</span>
                    <span class="text1" style=" color: #f84e5e; margin-left: 51px;">2023-05-31 00:00 提交截止</span>
                </el-row>
                <el-row style="margin-top: 20px">
                    <span class="text1">邸晓飞发布</span>
                    <span class="divide"></span>
                    <span class="text1"> 作业满分100</span>
                    <span class="divide"></span>
                    <span class="text1">仅允许提交一次</span>
                </el-row>
            </div>

        </el-row>
        <el-row>
            <div class="hcontent">
                <h3>作业内容</h3>
                <div v-html="content"></div>
            </div>

        </el-row>
        <el-row>
            <el-divider></el-divider>
            <Form
                    :formWidth="formWidth"
                    :formData="formData"
                    :buttons="formButtons"
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
    data() {
        return {
            name: "TeacherHomeworkPage",
            content: "答案",
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
                    rules: [{required: true, message: '请输入分数占比', trigger: 'blur'},
                        {min: 1, max: 100, type: "number", message: '分数在1-100之间', trigger: 'blur'}]
                },
                {
                    prop: 'comment', type: 'Textarea', label: '评价', width: '300px', maxlength:"50"
                },

            ],
            formButtons: [
                {
                    label: '发布',
                    type: 'primary',
                    action: 'submit',
                    call: (data) => {
                        console.log(data)
                    },
                    style: 'margin-left:30%'
                }
            ],

        };
    },
    methods: {
        focus(event) {
            event.enable(false);  //设置富文本编辑器不可编辑
        },
    },
    created() {
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
