<template>
  <div class="container">
    <Table
      :columns="Columns"
      :data="rTableData"
      :pagination="pagination"
      @getData="getCourseScoreList"
      :loading="loading"
      :isPaginationShow="true"
      :formData="formData"
      :formButtons="formButtons"
    >
      <template v-slot:course="scope">
        <span>{{ scope.rows.courseNum }} {{ scope.rows.name }} [{{scope.rows.courseIndex}}]</span>
      </template>
      <!-- <template v-slot:action="scope">
        <el-button type="text" size="small"
          >修改 + {{ scope.rows.term }}</el-button
        >
      </template> -->
    </Table>
  </div>
</template>

<script>
import Table from "@/components/common/CustomTable/CustomTable.vue";
import Vue from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CourseScore",
  components: {
    Table,
  },
  data() {
    return {
      Columns: [
        { index: true, label: "序号" }, //封装的序号列，生成从1开始自增的序号
        //table-column的属性应该都可以定义在这里，这里没有一一测试
        { prop: "term", label: "学年", width: "200" },
        { slot: "course", label: "课程" },
        { prop: "credit", label: "学分", width: "100" },
        { prop: "score", label: "成绩", width: "100" },
        { prop: "usual", label: "平时成绩", width: "100" },
        { prop: "level", label: "等级", width: "100" },
        { prop: "teacher", label: "上课教师", width: "300" },
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
        {
          prop: "course",
          label: "课程名",
          type: 'Input',
          width: '240px'
        },
      ],
      formButtons: [
        {
          label: '查询',
          type: 'primary',
          action: 'submit',
          call: (data) => {
            this.getCourseScoreList(data);
          }
        },
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
    this.getCourseScoreList();
  },
  methods: {
    getCourseScoreList(msg) {
      const studentNumber = this.$store.state.number;
      let current, size, course;
      if (msg === undefined) {
        current = this.pagination.current;
        size = this.pagination.size;
      } else {
        current = msg.current;
        size = msg.size;
        course = msg.course
      }
      if(course === '') {
        course = undefined
      }
      this.$axios
        .get("/course/score/list", {
          params: {
            studentNumber,
            pageNum: current,
            pageSize: size,
            course
          },
        })
        .then((res) => {
          console.log(res.data);
          //注意这里的 rTableData应该对应后端传来的数据List
          // {code: '0000', msg: '成功', data: Array(5), total: 7, current: 1}
          this.rTableData = res.data.data;
          this.pagination.total = res.data.total;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
