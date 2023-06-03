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
                    :formButtonsLoc = "formButtonsLoc"

                    :formData="formData"
                    :formButtons="formButtons"
            >
                <template v-slot:action="scope">
                    <el-button
                        size="small"
                        type="text"
                        @click="courseEnter(scope)"
                        class="qgreen"
                    >进入
                    </el-button>
                </template>
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
                {prop: "courseNum", label: "课程号", sortable: true},
                {prop: "courseName", label: "课程名称"},
                {prop: "courseIndex", label: "课程序号"},
                {slot: "action", label: "操作", width: "250px", align: "center"},
                {prop: "schoolVal", label: "开课院系"},
                {prop: "teacherName", label: "主讲教师"},

            ],
            rTableData: [],
            formData: [
                {prop: "number", label: "课程号", type: 'Input', width: '240px'},
                {prop: "name", label: "课程名称", type: 'Input', width: '240px'},
            ],
            formButtonsLoc :"right",
            formButtons: [
                {
                    label: '查询', action: 'submit',type:"primary",
                    call: (data) => {
                        //返回表单数据
                        console.log(data)
                        const _this = this
                        let courseNum = ""
                        let courseName = ""
                        if(data.name != undefined) courseName = data.name
                        if(data.number != undefined) courseNum = data.number
                        if (_this.isTeacher) {
                            //获取当前角色课程
                            this.$axios.get('/homework/platform/tec/page', {
                                params: {
                                    userId: _this.userId,
                                    courseNum: courseNum,
                                    courseName:courseName
                                }
                            }).then((res) => {
                                console.log("课程列表", res.data.data)
                                _this.rTableData = res.data.data
                            })

                        } else {
                            //获取当前角色课程
                            _this.$axios.get('/homework/platform/stu/page', {
                                params: {
                                    userId: _this.userId,
                                    courseNum: courseNum,
                                    courseName:courseName
                                }
                            }).then((res) => {
                                console.log("课程列表", res.data.data)
                                _this.rTableData = res.data.data
                            })
                        }
                    }
                },
                {
                    label: '重置', action: 'reset',type:"primary",
                    call: () => {
                        console.log('reset')
                    }
                },],
            userId: "",
            isTeacher: false,
        };
    },
    created() {
        //登录角色
        if (this.$store.state.isLogin) {
            const role = sessionStorage.getItem('role')
            this.isTeacher = role == "teacher"
            const user = sessionStorage.getItem('user')
            this.userId = JSON.parse(user).number
        } else this.$message.error('登录会话已过期')

        this.getHomeWorkList()
    },
    methods: {
        getHomeWorkList() {
            if (this.isTeacher) {
                //获取当前角色课程
                this.$axios.get('/homework/platform/tec/page', {
                    params: {
                        userId: this.userId
                    }
                }).then((res) => {
                    console.log("课程列表", res.data.data)
                    this.rTableData = res.data.data
                })

            } else {
                //获取当前角色课程
                this.$axios.get('/homework/platform/stu/page', {
                    params: {
                        userId: this.userId
                    }
                }).then((res) => {
                    console.log("课程列表", res.data.data)
                    this.rTableData = res.data.data
                })
            }

        },
        rowClick(val) {
            console.log(val);
        },
        showCourseCard() {
            this.$router.push({name: 'CoursePlatform'});
        },
        courseEnter(val){
            console.log(val);
            sessionStorage.setItem("courseNum",val.rows.courseNum)
            sessionStorage.setItem("courseIndex",val.rows.courseIndex)
            this.$router.push({name: 'HomePage'});
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