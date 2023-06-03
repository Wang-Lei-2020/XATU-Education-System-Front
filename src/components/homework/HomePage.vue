<template>
  <div>
    <el-row>
        <el-col :span = 8>
            <el-row>
                <span class="title">教师信息</span>
                <div class="infobox board-blue">
                    <el-row><span class="title">· </span><span class="text">教师姓名：{{teacher.name}}</span></el-row>
                    <el-row><span class="title">· </span><span class="text">所属院系：{{teacher.schoolVal}}</span></el-row>
                    <el-row><span class="title">· </span><span class="text">个人简介：</span></el-row>
                </div>
            </el-row>
            <el-row>
                <span class="title">课程信息</span>
                <div class="infobox board-blue">
                    <el-row><span class="title">· </span><span class="text">课程所属院系：{{course.schoolVal}}</span></el-row>
                    <el-row><span class="title">· </span><span class="text">选课学生数：{{studentSum}}</span></el-row>
                    <el-row><span class="title">· </span><span class="text">课程通知数：0</span></el-row>
                    <el-row><span class="title">· </span><span class="text">课程作业数：{{homeworkSum}}</span></el-row>
                </div>
            </el-row>
        </el-col>
        <el-col :span = 14 :offset=1>
            <el-row>
                <span class="title"><i class="el-icon-arrow-right"></i>课程介绍</span>
                <div class="rightbox board-blue">
                    <el-row><span class="text">{{course.info}}</span></el-row>
                </div>
            </el-row>
            <el-row>
                <span class="title"><i class="el-icon-arrow-right"></i>课程通知</span>
                <div class="rightbox board-blue">
                </div>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomePage",
    data() {
        return {
            course:{},
            teacher:{},
            studentSum:0,
            homeworkSum:0

        };

    },
    created() {
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
        //获取课程学生数
        this.$axios.get('/homework/platform/studentNum', {
            params: {
                courseNumber: sessionStorage.getItem("courseNum"),
                courseIndex: sessionStorage.getItem("courseIndex")
            }
        }).then((res) => {
            this.studentSum = res.data.data
        })
        //获取课程作业数
        this.$axios.get('/homework/count', {
            params: {
                courseNumber: sessionStorage.getItem("courseNum"),
                courseIndex: sessionStorage.getItem("courseIndex")
            }
        }).then((res) => {
            this.homeworkSum = res.data.data
        })
    }

};
</script>

<style>
.title{
    font-weight:bold;
    margin: 10px;
}
.rightbox{
    padding: 10px;
    margin: 10px;
    height: 200px;
}
.infobox{
    background-color: rgb(225, 225, 225);
    padding: 10px;
    margin: 10px;
}
.board-blue{
    border-top: 2px solid rgb(47, 150, 204);
}
.text{
    font-size: small;
}
</style>