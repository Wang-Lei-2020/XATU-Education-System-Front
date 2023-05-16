<template>
  <div class="page">
    <el-row>
      <el-col :span="14">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="通知公告" name="first"> </el-tab-pane>
        </el-tabs>
        <el-button size="mini" class="showNotice">更多 >></el-button>
      </el-col>

      <el-col :span="8" :offset="2">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="互动提醒" name="first">
            <el-row>
              <!-- <el-tree
                :data="treedata"
                :props="defaultProps"
                @node-click="handleNodeClick"
              ></el-tree> -->
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程列表" name="first">
            <el-row
              v-for="(rows, index) in courseCardList"
              :key="index"
            >
              <el-col v-for="course in rows" :key="course.number" :span="8">
                <CourseCard
                  :number="course.number"
                  :courseName="course.courseName"
                  :teacherName="course.teacherName"
                ></CourseCard>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-button size="mini" class="showCourse">查看我的全部课程</el-button>
    </el-row>
  </div>
</template>

<script>
import CourseCard from "@/components/homework/CourseCard.vue";
export default {
  name: "CoursePlatform",
  components: { CourseCard },
  data() {
    return {
      activeName: "first",
      courseCardList: [],
      cardRowNum: 3,
      noiteNum: 10,
      homeworkCourseList: ["软件工程概论", "计算机网络"],
      courseList: [
        { number: "ANi12390", courseName: "软件工程概论", teacherName: "aaa" },
        {
          number: "ANi124900",
          courseName: "计算机组成原理",
          teacherName: "bbb",
        },
        { number: "ANi1249000", courseName: "计算机网络", teacherName: "bbb" },
        {
          number: "ANi12400",
          courseName: "中国近代史纲要",
          teacherName: "ccc",
        },
        {
          number: "ANi12000",
          courseName: "概率论与数理统计",
          teacherName: "ddd",
        },
        { number: "ANi120000", courseName: "离散数学", teacherName: "eee" },
        {
          number: "ANi12004",
          courseName: "软件工工程导论",
          teacherName: "fff",
        },
      ],
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    //待完成作业课程数、列表
    // if (this.homeworkCourseList.length != 0) {
    //   this.treedata.push({
    //     label: this.homeworkCourseList.length + "门课程有代作业",
    //     children: [],
    //   });
    //   this.homeworkCourseList.forEach(function (item) {
    //     console.log(item);
    //     this.treedata[0].children.push(item);
    //   });
    // }

    //根据登录用户获取courseList

    //Card展示
    let arrTmp = [];
    this.courseList.forEach((item, index) => {
      arrTmp.push(item);
      if ((index + 1) % this.cardRowNum === 0) {
        this.courseCardList.push(arrTmp);
        arrTmp = [];
      }
    });
    if (arrTmp.length != 0) this.courseCardList.push(arrTmp);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  computed: {},
};
</script>

<style>
.page {
  padding: 10px;
}
.showCourse {
  position: absolute;
  right: 20px;
  top: 5px;
  color: #e6a23c;
  font-weight: 600;
  font-size: 14px;
}
.showNotice {
  position: absolute;
  left: 50%;
  top: 5px;
  color: #e6a23c;
  font-weight: 600;
  font-size: 14px;
}
</style>