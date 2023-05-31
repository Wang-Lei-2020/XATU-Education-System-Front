<template>
    <div class="page">
        <el-row>
            <span class="title"><i class="el-icon-d-arrow-right"></i>课程作业提交列表</span>
            <div class="titlebox board-blue"/>
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
                            @click="homeworkSubmit(scope)"
                            class="qgreen"
                    >查看
                    </el-button>
                </template>

            </Table>
        </el-row>

    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";

export default {
    name: "StudentHomeworkList",
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
                {prop: "student", label: "姓名", sortable: true},
                {prop: "number", label: "学号",},
                {prop: "status", label: "状态",slot:"tag"},
                {prop: "submit_time", label: "提交时间"},
                {slot:"action",  label: "查看内容"},
                {prop: "score", label: "作业得分"},
            ],
            rTableData: [
                {
                    student: "蒋泽群",
                    number: "22126357",
                    submit_time: "/",
                    status: "未提交",
                    score:"--"
                }
            ],
            formData: [
                {prop: "student", label: "姓名", type: 'Input', width: '240px'},
                {prop: "number", label: "学号", type: 'Input', width: '240px'},
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
        homeworkSubmit(val){
            console.log(val);
            this.$router.push({name: 'TeacherHomeworkPage'});
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