<template>
  <div class="container">
    <p>评教系统</p>
    <Table :columns="Columns" :data="rTableData" :pagination="pagination" @getData="getCourseScoreList" :loading="loading"
      :isPaginationShow="true" :formData="formData" :formButtons="formButtons">
      <template v-slot:course="scope">
        <span>{{ scope.rows.courseNum }} {{ scope.rows.name }} [{{ scope.rows.courseIndex }}]</span>
      </template>
      <!-- <template v-slot:action="scope">
          <el-button type="text" size="small"
            >修改 + {{ scope.rows.term }}</el-button
          >
        </template> -->
      <template v-slot:evalscore="scope">
        <el-input v-model="scope.rows.input" placeholder="请输入成绩"></el-input>
      </template>
      <template v-slot:eval="scope">
        <button @click="evaluate(scope.rows.course, scope.rows.input)">评教</button>
      </template>
    </Table>


  </div>
</template>
  
<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";
import Vue from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "EvalCourse",
  components: {
    Table,
  },
  data() {
    return {
      Columns: [
        { index: true, label: "序号" }, //封装的序号列，生成从1开始自增的序号
        //table-column的属性应该都可以定义在这里，这里没有一一测试
        { prop: "course", label: "课程编码" },
        { prop: "courseName", label: "课程名" },
        { prop: "teacherName", label: "上课教师", width: "300" },
        { slot: "evalscore", prop: "input", label: "评教成绩" },
        { slot: "eval", label: "评教" },
        //自定义列用插槽，例如标签、操作
        // { slot: "tag", prop: "status", label: "状态"},
        // { slot: "action", label: "操作", width: "100" },
      ],
      rTableData: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      formData: [
        // {
        //   prop: "course",
        //   label: "课程名",
        //   type: 'Input',
        //   width: '240px'
        // },
      ],
      formButtons: [
        // {
        //   label: '查询',
        //   type: 'primary',
        //   action: 'submit',
        //   call: (data) => {
        //     this.getCourseScoreList(data);
        //   }
        // },
      ]
    };
  },
  computed: {
    isTeacher: function () {
      return Vue.$cookies.get("role") === "teacher";
    },
  },
  created() {
    if (this.$route.params.isReload === "true") {
      this.$router.go(0);
    }
  },
  mounted() {
    // this.getCourseScoreList();
    this.getUnScoreCourseList()
  },
  methods: {

    evaluate(course, score) {
      const student = this.$store.state.number;
      console.log(score)
      if (score >= 100 || score <= 0) {
        alert("成绩输入区间不合法")
        return
      }
      this.$axios.post(`/evaluation/studentScoreTeacher?student=${student}&score=${score}&course=${course}`,{
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      })
        .then((res) => {
          console.log(res)
          if (res.data.code === "0") {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          }
          // 这里需要刷新一下表单
          this.getUnScoreCourseList()
        })
    },
    getUnScoreCourseList() {
      this.rTableData = []
      const student = this.$store.state.number;
      this.$axios.post(`/evaluation/studentGetUnscoreCourse?student=${student}`,{
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      })
        .then((res) => {
          console.log(res)
          const newData = res.data.data.map(item => {
            return { ...item, input: "" };
          });
          this.rTableData = newData;
          this.pagination.total = res.data.total;
          this.loading = false;
        })
    },

    // getCourseScoreList(msg) {
    //   const studentNumber = this.$store.state.number;
    //   let current, size, course;
    //   if (msg === undefined) {
    //     current = this.pagination.current;
    //     size = this.pagination.size;
    //   } else {
    //     current = msg.current;
    //     size = msg.size;
    //     course = msg.course
    //   }
    //   if (course === '') {
    //     course = undefined
    //   }
    //   this.$axios
    //     .get("/course/score/list", {
    //       params: {
    //         studentNumber,
    //         pageNum: current,
    //         pageSize: size,
    //         course
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       //注意这里的 rTableData应该对应后端传来的数据List
    //       // {code: '0000', msg: '成功', data: Array(5), total: 7, current: 1}
    //       this.rTableData = res.data.data;
    //       this.pagination.total = res.data.total;
    //       this.loading = false;
    //     });
    // },
  },
};
</script>
  
<style scoped>
.container {
  padding: 10px;
}
</style>
  