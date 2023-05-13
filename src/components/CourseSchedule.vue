<template>
  <div>
    <div class="bar">
      <el-button size="mini" @click="printScheduleToPDF()">打印</el-button>
      <el-button size="mini"><a href="#">导出为Excel</a></el-button>
    </div>
    <div class="schedule-table" ref="schedule-table">
      hello this is table
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import print from "print-js";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CourseSchedule",
  components: {},
  computed: {
    isTeacher: function () {
      return Vue.$cookies.get('role') === "teacher";
    }
  },
  created() {
    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
  },
  methods: {
    getSchedule() {
      this.$axios.get('/course/schedule/get').then(res => {
        console.log(res);
      })
    },
    exportScheduleByExcel() {

    },
    printScheduleToPDF() {
      print({
        printable: this.$refs['schedule-table'],
        type: 'html'
      });
    }
  }
}
</script>

<style scoped></style>
