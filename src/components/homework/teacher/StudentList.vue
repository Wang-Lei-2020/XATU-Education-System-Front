<template>
    <div class="page">
        <el-row>
            <div style="float: right">
                <el-button size="small" @click="exportAllExcel">导出签到表</el-button>
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
        <el-dialog title="导入平时成绩" :visible="dialogFormVisible" @close='closeDialog'>
            <import-usual :course="course" :courseIndex="courseIndex" />
        </el-dialog>
    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";
import ImportUsual from './ImportUsual.vue';
import * as XLSX from "xlsx";

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
                {prop: "name", label: "姓名", sortable: true},
                {prop: "number", label: "学号",sortable: true},
                {prop: "schoolVal", label: "学院"},
                {prop: "classNumber", label: "班级"},
            ],
            rTableData: [],
            dialogFormVisible: false,
            course: sessionStorage.getItem("courseNum"),
            courseIndex: sessionStorage.getItem("courseIndex"),
        };
    },
    created() {
        this.getStudentList()
    },
    methods: {
        getStudentList() {
            //获取学生列表
            this.$axios.get('/homework/platform/tec/studentList', {
                params: {
                    courseNumber: sessionStorage.getItem("courseNum"),
                    courseIndex: sessionStorage.getItem("courseIndex"),
                    current: this.pagination.current,
                    pageSize: this.pagination.size
                }
            }).then((res) => {
                console.log("学生列表",res.data.data)
                this.rTableData = res.data.data
            })

        },
        changeCurrent(val) {
            console.log(val);
        },
        rowClick(val) {
            console.log(val);
        },
        //导出学生签到表
        exportAllExcel() {
            let tableData = [
                ['序号','姓名', '学号', '学院', '班级']//导出表头
            ] // 表格表头
            this.rTableData.forEach((item, index) => {
                let rowData = []
                //导出内容的字段
                rowData = [
                    index + 1,
                    item.name,
                    item.number,
                    item.schoolVal,
                    item.classNumber,
                ]
                tableData.push(rowData)
            })
            let workSheet = XLSX.utils.aoa_to_sheet(tableData);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, '作品名称') // 工作簿名称
            let name = '签到表' + '.xlsx'
            XLSX.writeFile(bookNew, name) // 保存的文件名
        },
        //导入平时成绩
        ImportScore(){
            this.dialogFormVisible = true
        },
        closeDialog(){
            this.dialogFormVisible = false
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