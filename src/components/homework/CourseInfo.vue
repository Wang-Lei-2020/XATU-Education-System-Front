<template>
    <div>
        <el-tabs tab-position="right" style="height: 100%">
            <el-tab-pane label="课程介绍">
                <el-row>
                    <span class="title"><i class="el-icon-d-arrow-right"></i>课程介绍</span>
                    <div class="box board-blue">
                        <el-row><span class="text">{{course.info}}</span></el-row>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="教学大纲">
                <el-row>
                    <span class="title"><i class="el-icon-d-arrow-right"></i>教学大纲</span>
                    <div class="box board-blue">
                        <el-row><span class="text">教学大纲</span></el-row>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="教学日历">
                <el-row>
                    <span class="title"><i class="el-icon-d-arrow-right"></i>教学日历</span>
                    <div class="box board-blue">
                        <el-row><span class="text">教学日历</span></el-row>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane v-if="isTeacher" label="学生列表">
                <el-row>
                    <span class="title"><i class="el-icon-d-arrow-right"></i>学生列表</span>
                    <div class="box board-blue">
                        <el-row>
                            <StudentList></StudentList>
                        </el-row>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="教师信息">
                <el-row>
                    <span class="title"><i class="el-icon-d-arrow-right"></i>教师信息</span>
                    <div class="box board-blue">
                        <el-row>
                            <el-descriptions class="margin-top" :column="1" border>
                                <el-descriptions-item label="用户名" labelClassName="label">
                                    {{teacher.name}}
                                </el-descriptions-item>
                                <el-descriptions-item label="所属院系" labelClassName="label">
                                    {{teacher.schoolVal}}
                                </el-descriptions-item>
                                <el-descriptions-item label="职称" labelClassName="label">
                                    {{teacher.titleVal}}
                                </el-descriptions-item>
                                <el-descriptions-item label="邮件地址" labelClassName="label">
                                    N/A
                                </el-descriptions-item>
                                <el-descriptions-item label="个人网址" labelClassName="label">
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-row>
                    </div>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import StudentList from "@/components/homework/teacher/StudentList.vue";
export default {
    name: "CourseInfo",
    components:{StudentList},
    data() {
        return {
            role:"",
            userId:"",
            isTeacher: false,
            course:{},
            teacher:{}
        };
    },
    created() {
        //登录角色
        if (this.$store.state.isLogin) {
            const role = sessionStorage.getItem('role')
            this.isTeacher = role == "teacher"
            const user = sessionStorage.getItem('user')
            this.userId = JSON.parse(user).number;
        } else this.$message.error('登录会话已过期')

        //获取当前角色课程
        this.$axios.get('/homework/platform/info', {
            params: {
                courseNumber: sessionStorage.getItem("courseNum"),
                courseIndex: sessionStorage.getItem("courseIndex")
            }
        }).then((res) => {
            // console.log("课程信息",res.data.data)
            this.course = res.data.data
        })
        //获取课程老师信息
        this.$axios.get('/homework/platform/tec/info', {
            params: {
                courseNumber: sessionStorage.getItem("courseNum"),
                courseIndex: sessionStorage.getItem("courseIndex")
            }
        }).then((res) => {
            // console.log("老师",res.data.data)
            this.teacher = res.data.data
        })
    },

};
</script>

<style>
.title {
    font-weight: bold;
    margin: 10px;
}

.box {
    padding: 10px;
    margin: 10px;
    height: 300px;
    width: 80%;
}

.board-blue {
    border-top: 2px solid rgb(47, 150, 204);
}

.margin-top {
    margin-top: 10px;
}

.label {
    width: 200px;
}

.text {
    font-size: small;
}
</style>