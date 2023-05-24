<template>
    <div>

        <div class="local-quill-editor">
            <quill-editor
                    ref="QuillEditor"
                    v-model="content"
                    :options="editorOption"
                    class="editor"
                    @blur="onEditorBlur"
                    @focus="onEditorFocus"
                    @change="onEditorChange"
            >
                >
            </quill-editor>
        </div>
        <!--        :headers="{Authorization: 'bearer ' + userInfo.token}"-->
        <div class="picture" v-show=false>
            <el-upload
                    class="uploadImg"
                    :multiple="false"
                    :showUploadList="false"
                    :action="actionPath"
                    :data="postData"
                    :on-success="imageUploadSuccess"
                    accept="image/jpeg,image/gif,image/png,image/bmp"
                    :before-upload="beforeAvatarUpload"
            >
                <!--                accept="image/jpeg,image/gif,image/png,image/bmp"-->
                <!--                :before-upload="beforeAvatarUpload"-->
                <el-button class="elbtn">上传图片</el-button>
            </el-upload>
        </div>

        <div class="file" v-show=false>
            <el-upload
                class="uploadFile"
                :multiple="false"
                :showUploadList="false"
                :action="actionPath"
                :data="postData"
                :on-success="fileUploadSuccess"
            >
                <!--                accept="image/jpeg,image/gif,image/png,image/bmp"-->
                <!--                :before-upload="beforeAvatarUpload"-->
                <el-button class="elbtn">上传图片</el-button>
            </el-upload>
        </div>

    </div>

</template>

<script>
// import Form from '@/components/common/CustomForm/CustomForm.vue'

// import axios from "axios";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
import {genUpToken} from "@/components/user/qiniuToken";
import {Quill} from 'vue-quill-editor'

import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);


// 自定义插入a链接
var Link = Quill.import('formats/link')

class FileBlot extends Link {
    // 继承Link Blot
    static create(value) {
        let node = undefined
        if (value && !value.href) {
            // 适应原本的Link Blot
            node = super.create(value)
        } else {
            // 自定义Link Blot
            node = super.create(value.href)
            node.setAttribute('download', value.innerText);  // 左键点击即下载
            node.innerText = value.innerText
            node.download = value.innerText
        }
        return node
    }
}

FileBlot.blotName = 'link'
FileBlot.tagName = 'A'
Quill.register(FileBlot)

const toolbarOptions = [
    //加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['bold', 'italic', 'underline', 'strike'],
    // 引用  代码块-----['blockquote', 'code-block']
    ['blockquote', 'code-block'],
    // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{header: 1}, {header: 2}],
    // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{list: 'ordered'}, {list: 'bullet'}],
    // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{script: 'sub'}, {script: 'super'}],
    // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{indent: '-1'}, {indent: '+1'}],
    // 文本方向-----[{'direction': 'rtl'}]
    [{direction: 'rtl'}],
    // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{size: ['small', false, 'large', 'huge']}],
    // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{color: []}, {background: []}],
    // 字体种类-----[{ font: [] }]
    [{font: []}],
    // 对齐方式-----[{ align: [] }]
    [{align: []}],
    // 清除文本格式-----['clean']
    ['clean'],
    // 链接、图片、视频-----['link', 'image', 'video']
    ['link', 'image'],
]

export default {
    name: "HomeworkEditor",
    components: {quillEditor},
    props: {
        detail: {//父组件传入的值
            type: String,
            default: ''
        },
    },
    data() {
        return {
            content: '',
            editorOption: {
                modules: {
                    imageDrop: true, //图片拖拽
                    imageResize: {
                        displayStyles: {// 放大缩小
                            backgroundColor: "black",
                            border: "none",
                            color: "white",
                        },
                        modules: ["Resize", "DisplaySize", "Toolbar"],
                    },
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    // alert('点击了上传图片')
                                    document.querySelector('.uploadImg .elbtn').click()
                                } else {
                                    this.quill.format('image', false);
                                }
                            },
                            'link': function (value) {
                                if (value) {
                                    // alert('点击了上传图片')
                                    document.querySelector('.uploadFile .elbtn').click()
                                }
                            }
                        },
                    },

                },
                readyOnly: false, //是否只读
                syntax: true, //语法检测
                theme: 'snow',
                placeholder: '请输入正文'
            },

            actionPath: 'https://upload-z1.qiniup.com',

            postData: {
                token: "",
            },
            qiniuaddr: "http://cdn.wanglei99.xyz",
            uploadPicUrl: ""

        };
    },
    created() {
        var token;
        var policy = {};
        var bucketName = 'wanglei2022';
        var AK ='hNl-AywgdWuBco20kCxR6rPMUB-uOV8Hlih7o_gI';
        var SK = 'LZOs_CcKGSsPac8krncFZFJU38Hgd6lCipLZli6x';
        var deadline = Math.round(new Date().getTime() / 1000) + 3600;
        policy.scope = bucketName;
        policy.deadline = deadline;
        token = genUpToken(AK, SK, policy);
        this.postData.token = token;
    },
    mounted() {
        this.content = this.detail
        console.log("content",this.content);
    },
    methods: {
        // 失去焦点事件
        onEditorBlur() {
            // console.log('editor blur!', quill)
        },
        // 获得焦点事件
        onEditorFocus() {
            // console.log('editor focus!', quill)
        },
        // 内容改变事件
        onEditorChange({ html}) {
            // console.log('quill', quill, html, text)
            // console.log('html', html)
            // console.log('text', text)
            this.$emit('eidtContent', html)
        },
        /** 文件预上传格式限制 */
        beforeAvatarUpload(file) {
            const isPNG = file.type === "image/png";
            const isJPEG = file.type === "image/jpeg";
            const isJPG = file.type === "image/jpg";
            //可以上传pdf等文件
            // let extension = file.name.substring(file.name.lastIndexOf('.')+1)
            // const isPDF = extension === "pdf";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPNG && !isJPEG && !isJPG) {
                this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
                return false;
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG | isJPEG | isPNG) && isLt2M;
        },
        imageUploadSuccess(response) {
            console.log(response)
            let quill = this.$refs.QuillEditor.quill
            let imgUrl = `${this.qiniuaddr}/${response.key}`;
            let length = quill.getSelection().index
            // 插入图片，res为服务器返回的图片链接地址
            quill.insertEmbed(length, 'image', imgUrl)
            // 调整光标到最后
            quill.setSelection(length + 1)
        },
        fileUploadSuccess(response,file){
            console.log(response)
            let quill = this.$refs.QuillEditor.quill
            let fileUrl = `${this.qiniuaddr}/${response.key}`;
            // 获取光标所在位置
            let length = quill.getSelection().index
            // 插入文件，res为服务器返回的文件链接地址
            quill.insertEmbed(length, 'link', {href: fileUrl, innerText: file.name}) //**注意这里 - 插入文件地址的方式**
            // 调整光标到最后
            quill.setSelection(length + 1)
        }

    }
};
</script>

<style scoped>
.local-quill-editor {
    height: 300px;
}

.editor {
    height: 250px;
    //padding: 10px;
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
    height: 125px;
    overflow: auto;
}
</style>
