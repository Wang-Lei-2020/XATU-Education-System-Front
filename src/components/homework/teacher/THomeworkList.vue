<template>
    <div class="page">
        <el-row>
            <span class="title"><i class="el-icon-d-arrow-right"></i>课程作业</span>
            <div class="titlebox board-blue"/>
        </el-row>
        <el-row>
            <div >
                <el-button
                    size="small"
                    @click="UploadHomework(scope)"
                    class="qgreen"
                >发布作业
                </el-button>
            </div>

        </el-row>
        <el-row>
            <Table
                    :isFormShow="false"
                    :columns="Columns"
                    :data="rTableData"
                    :pagination="pagination"
                    @getData="getHomeWorkList"
                    :loading="loading"
                    @changeCurrent="changeCurrent"
                    @rowClick="rowClick"
                    :isPaginationShow="true"

                    :formData="formData"
                    :formButtons="formButtons"
            >
                <template v-slot:tag="scope">
                    <el-tag type="success">
                        {{scope.rows.status}}
                    </el-tag>
                </template>
                <template v-slot:action="scope">
                    <el-button
                            size="small"
                            @click="homeworkCommit(scope)"
                            class="qgreen"
                    >批改
                    </el-button>
                    <el-button
                        size="small"
                        @click="homeworkEdit(scope)"
                        class="qgreen"
                    >编辑
                    </el-button>
                    <el-button
                        size="small"
                        @click="homeworkDelete(scope)"
                        class="qgreen"
                    >删除
                    </el-button>
                </template>

            </Table>
        </el-row>

    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";

export default {
    name: "THomeworkList",
    components: {Table},
    data() {
        return {
            loading: false,
            pagination: {
                current: 1, //当前页
                size: 5, //页面大小、规定页数为5、10、20、30
                total: 0, //数据总个数
            },
            Columns: [
                {selection: true},
                {index: true},
                {prop: "title", label: "作业标题", sortable: true},
                {prop: "teacher", label: "发布人",},
                {prop: "deadline", label: "提交截止时间"},
                {slot:"tag", prop: "status", label: "状态"},
                {slot:"action",  label: "操作"},
            ],
            rTableData: [
                {
                    title: "小作业",
                    teacher: "邸晓飞",
                    deadline: "2023-05-31 00:00",
                    status: "进行",
                    score:"--"
                }
            ],
            formData: [
                {prop: "number", label: "课程号", type: 'Input', width: '240px'},
                {prop: "name", label: "课程名称", type: 'Input', width: '240px'},
            ],
            formButtons: [
                {
                    label: '提交', type: 'primary', action: 'submit',
                    call: (data) => {
                        //返回表单数据
                        console.log(data)
                        //提交表单api
                    }
                },
                {
                    label: '重置', type: 'primary', action: 'reset',
                    call: () => {
                        console.log('reset')
                    }
                },],
        };
    },
    created() {
    },
    methods: {
        getHomeWorkList() {

        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        homeworkCommit(val){
            console.log(val);
            this.$router.push({name: 'StudentHomeworkList'});
        },
        homeworkEdit(val){
            console.log(val);
        },
        homeworkDelete(val){
            console.log(val);
        },
        UploadHomework(){
            this.$router.push({name: 'AddHomework'});
        }
    },
    computed: {},
};
</script>

<style>
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

</style>