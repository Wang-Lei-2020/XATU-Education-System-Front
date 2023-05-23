<template>
    <div class="page">
        <el-row>
            <span class="title"><i class="el-icon-arrow-right"></i>课程列表</span>
            <div class="titlebox board-blue"></div>
        </el-row>
        <el-row>
            <Table
                    :columns="Columns"
                    :data="rTableData"
                    :pagination="pagination"
                    @getData="getHomeWorkList"
                    :loading="loading"
                    @rowClick="rowClick"
                    :isPaginationShow="true"

                    :formData="formData"
                    :formButtons="formButtons"
            >
                <!--    </el-table-column>-->
            </Table>
            <el-button size="mini" class="back" @click="showCourseCard">返回</el-button>
        </el-row>
    </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";

export default {
    name: "CourseList",
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
                {prop: "number", label: "课程号", sortable: true},
                {prop: "name", label: "课程名称",},
                {prop: "school", label: "开课院系"},
                {prop: "teacher", label: "主讲教师"},
            ],
            rTableData: [
                {
                    number: "M510007B",
                    name: "软件工程经济学",
                    school: "软件学院",
                    teacher: "邸晓飞"
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
        rowClick(val) {
            console.log(val);
            this.$router.push({name: 'HomePage'});
        },
        showCourseCard() {
            this.$router.push({name: 'CoursePlatform'});
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