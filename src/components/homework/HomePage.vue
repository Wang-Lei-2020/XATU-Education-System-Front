<template>
  <div>
    <el-row>
        <el-col :span = 8>
            <el-row>
                <span class="title">教师信息</span>
                <div class="infobox board-blue">
                    <el-row><span class="title">· </span><span class="text">教师姓名：</span></el-row>
                    <el-row><span class="title">· </span><span class="text">所属院系：</span></el-row>
                    <el-row><span class="title">· </span><span class="text">个人简介：</span></el-row>
                </div>
            </el-row>
            <el-row>
                <span class="title">课程信息</span>
                <div class="infobox board-blue">
                    <el-row><span class="title">· </span><span class="text">课程所属院系：</span></el-row>
                    <el-row><span class="title">· </span><span class="text">选课学生数：</span></el-row>
                    <el-row><span class="title">· </span><span class="text">课程通知数：</span></el-row>
                    <el-row><span class="title">· </span><span class="text">课程作业数：</span></el-row>
                </div>
            </el-row>
        </el-col>
        <el-col :span = 14 :offset=1>
            <el-row>
                <span class="title"><i class="el-icon-arrow-right"></i>课程介绍</span>
                <div class="rightbox board-blue">
                    <el-row><span class="text">课程介绍</span></el-row>
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