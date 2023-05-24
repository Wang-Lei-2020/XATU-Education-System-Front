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
            <div class="editor">
                <Editor
                    @eidtContent="eidtContent"
                ></Editor>
            </div>
            <div class="action">
                <el-button size="mini" @click="submit">提交</el-button>
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
            content: "<h2>要求：</h2><h2>（1）个人完成</h2><h2>（2）将解答写在纸上</h2><h2>（3）5月31日课上提交</h2><p><img src=\"http://cdn.wanglei99.xyz/FraYnRVJ-C9J2w72dEeLH9Rj1sDi\"></p>",
            editorOption: {
                modules: {
                    toolbar: {
                        container: [],
                    },
                },
                readyOnly: true,
                theme: 'snow',
            },
        };
    },
    methods: {
        focus(event) {
            event.enable(false);  //设置富文本编辑器不可编辑
        },
        submit(){
            alert("提交成功")
            this.$router.push({name: 'HomeworkList'})

        },
        cancel(){
            this.$router.push({name: 'HomeworkList'})
        },
        eidtContent(val){
            console.log(val)
        }
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
.action{
    margin-left: 45%;
}

.divide {
    border-left: 2px solid black;
    margin: 0px 40px;
}


</style>
