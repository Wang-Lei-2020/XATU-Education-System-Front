<template>
    <div class="page">
        <el-row>
            <div style="float: right">
                <el-button size="small" @click="downloadList">导出签到表</el-button>
                <el-button size="small" @click="ImportScore">导入平时成绩</el-button>
            </div>
        </el-row>
        <el-row>
            <Table
                    :isFormShow="false"
                    :columns="Columns"
                    :data="rTableData"
                    :pagination="pagination"
                    @getData="getStudentList"
                    :loading="loading"
                    @changeCurrent="changeCurrent"
                    @rowClick="rowClick"
                    :isPaginationShow="true"
            >
            </Table>
        </el-row>
        <el-dialog title="导入平时成绩" :visible.sync="dialogFormVisible">
            <import-usual :course="course" :courseIndex="courseIndex" />
        </el-dialog>
    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";
import ImportUsual from './ImportUsual.vue';

export default {
    name: "StudentList",
    components: {Table, ImportUsual},
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
            ],
            rTableData: [
                {
                    student: "蒋泽群",
                    number: "22126357",
                }
            ],
            dialogFormVisible: false,
            course: 'C10004',
            courseIndex: 1,
        };
    },
    created() {
    },
    methods: {
        getStudentList() {

        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        //导出学生签到表
        downloadList(){

        },
        //导入平时成绩
        ImportScore(){
            this.dialogFormVisible = true;
        }
    },
    computed: {},
};
</script>

<style scoped>
.page {
    padding: 10px;
}
</style>