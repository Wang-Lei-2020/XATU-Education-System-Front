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
                    :inline=false
                    class="form"
            >
                <template v-slot:editor>
                    <Editor
                            class="editor"
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
    name:"AddHomework",
    components: {Form, Editor},
    data() {
        return {
            formWidth: "150px",
            formData: [
                {
                    prop: "title", label: "作业标题", type: 'Input', width: '500px', placeholder: '请填写作业标题', maxlength:"20",
                    rules: [{required: true, message: '请输入作业标题', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}]
                },
                {
                    prop: "ratio", label: "分数占比", type: 'Input_number', width: '100px',
                    rules: [{required: true, message: '请输入分数占比', trigger: 'blur'},
                        {min: 1, max: 100, type: "number",message: '分数占比在1-100之间', trigger: 'blur'}]
                },
                {
                    prop: 'deadline',
                    type: 'Datetime',
                    label: '截止时间',
                    placeholder: '请选择截止时间',
                    default: new Date(),
                    rules: [{required: true, message: '请输入截止时间', trigger: 'blur'}]
                },
                {
                    prop: 'ismulcommit', type: 'Radio', label: '是否可以重复提交', default: '0',
                    options: [{label: '可以重复提交', value: '0'}, {label: '只能提交一次', value: '1'}]
                },
                {
                    type: "slot", slot_name: "editor",prop:'content'
                }

            ],
            formButtons: [
                {
                    label: '发布',
                    type: 'primary',
                    action: 'submit',
                    call: (data) => {
                        console.log(data)
                    },
                    style:'margin-left:30%'
                }
            ],


        };
    },
    methods: {
        eidtContent(val) {
            console.log(val)
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