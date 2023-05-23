<template>
  <div>
    <el-tabs tab-position="right" style="height: 100%">
      <el-tab-pane label="课程介绍">
        <el-row>
          <span class="title"
            ><i class="el-icon-d-arrow-right"></i>课程介绍</span
          >
          <div class="box board-blue">
            <el-row><span class="text">课程介绍</span></el-row>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="教学大纲">
        <el-row>
          <span class="title"
            ><i class="el-icon-d-arrow-right"></i>教学大纲</span
          >
          <div class="box board-blue">
            <el-row><span class="text">教学大纲</span></el-row>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="教学日历">
        <el-row>
          <span class="title"
            ><i class="el-icon-d-arrow-right"></i>教学日历</span
          >
          <div class="box board-blue">
            <el-row><span class="text">教学日历</span></el-row>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="教师信息">
        <el-row>
          <span class="title"
            ><i class="el-icon-d-arrow-right"></i>教师信息</span
          >
          <div class="box board-blue">
            <el-row>
              <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item label="用户名" labelClassName="label">
                    邸晓飞
                </el-descriptions-item>
                <el-descriptions-item label="所属院系" labelClassName="label">
                  软件学院
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
export default {
  nmae: "CourseInfo",
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
  height: 200px;
  width: 80%;
}
.board-blue {
  border-top: 2px solid rgb(47, 150, 204);
}
.margin-top {
  margin-top: 10px;
}
.label{
  width: 200px;
}
.text{
    font-size: small;
}
</style>