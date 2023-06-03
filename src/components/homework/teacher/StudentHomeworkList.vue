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
                    <el-tag v-if="scope.rows.status == 0"  >
                        未提交
                    </el-tag>
                    <el-tag v-if="scope.rows.status == 1" type="success" >
                        已提交
                    </el-tag>
                </template>
                <template v-slot:action="scope">
                    <el-button
                            size="small"
                            @click="homeworkSubmit(scope)"
                            class="qgreen"
                            :disabled="scope.rows.status == 0 ? true:false"
                    >查看
                    </el-button>
                </template>

            </Table>
            <el-button size="mini" class="back" @click="back">返回</el-button>
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
                {prop: "studentName", label: "姓名", sortable: true},
                {prop: "student", label: "学号",},
                {prop: "status", label: "状态",slot:"tag"},
                {prop: "updateTime", label: "提交时间"},
                {slot:"action",  label: "查看内容"},
                {prop: "score", label: "作业得分"},
            ],
            rTableData: [],
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
        this.getHomeWorkList()
    },
    methods: {
        getHomeWorkList() {
            //获取学生列表
            this.$axios.get('/homework/tec/list', {
                params: {
                    homework: sessionStorage.getItem("homework"),
                    courseNumber: sessionStorage.getItem("courseNum"),
                    courseIndex: sessionStorage.getItem("courseIndex")
                }
            }).then((res) => {
                console.log("学生列表",res.data.data)
                this.rTableData = res.data.data
                this.rTableData.forEach(function (element){
                    if(element.score == null)
                        element.score = "--"
                })
                // this.rTableData = res.data.data;
            })

        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        homeworkSubmit(val){
            console.log(val);
            this.$router.push({name: 'TeacherHomeworkPage',params:{homework:val.rows}});
        },
        back(){
            this.$router.push({name: 'THomeworkList'});
            sessionStorage.removeItem("homework");
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