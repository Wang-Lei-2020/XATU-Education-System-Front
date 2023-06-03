<template>
  <div class="card">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }">
          <img src="@/assets/images/course.png" class="image" />
          <div style="padding: 14px">
            <el-row>
              <el-link
                target="_blank"
                @click="showCoursePage()"
                ><span class="title-decoration">{{ course.courseName }}</span></el-link
              >
            </el-row>
            <el-row>
              <el-col :span=6><div class="text">课程编号：</div></el-col>
              <el-col :span=6
                ><div class="text">{{ course.courseNum }}</div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span=6><div class="text">主讲教师：</div></el-col>
              <el-col :span=6
                ><div class="text">{{ course.teacherName }}</div></el-col
              >
            </el-row>
            <div class="bottom clearfix">
              <el-button  size="small" class="button" @click="showCoursePage()">进入课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course:{
        courseNum:String,
        courseName:String,
        teacherName:String,
        courseIndex:String
    }
  },
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods:{
    showCoursePage(){
        sessionStorage.setItem("courseNum",this.course.courseNum)
        sessionStorage.setItem("courseIndex",this.course.courseIndex)
        this.$router.push({name:'HomePage'})
    }
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 10px;
  margin-left: 10px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: left;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card{
  padding-right: 10px;
  margin: 10px;
}
.title-decoration {
  font-size:large;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 5px;
  text-decoration: underline;
}
.text{
    font-size: small;
    margin-left: 10px;
    margin-top: 5px;
}
</style>