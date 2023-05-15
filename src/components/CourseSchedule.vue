<template>
  <div>
    <div class="bar">
      <el-button size="mini" @click="printScheduleToPDF()">打印</el-button>
    </div>
    <!-- 课程表 -->
    <div class="schedule-table" ref="schedule-table">
      <el-table :data="scheduleTable" border style="width: 100%"
      :cell-style="{padding: '3px 0'}" :header-cell-style="{padding: '6px 0'}" :row-style="{height: '100px'}">
        <el-table-column label="">
          <template v-slot="scope">
            <span>第{{ scope.$index + 1 }}节</span>
          </template>
        </el-table-column>
        <el-table-column prop="mon" label="周一">
          <template v-slot="scope">
            <template v-if="scope.row.mon">
              <div class="course-num">{{scope.row.mon.courseNum}} [{{scope.row.mon.courseIndex}}]</div>
              <div class="course-name">{{scope.row.mon.name}} - {{scope.row.mon.teacher}}</div>
              <div class="course-location">{{scope.row.mon.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="tue" label="周二">
          <template v-slot="scope">
            <template v-if="scope.row.tue">
              <div class="course-num">{{scope.row.tue.courseNum}} [{{scope.row.tue.courseIndex}}]</div>
              <div class="course-name">{{scope.row.tue.name}} - {{scope.row.tue.teacher}}</div>
              <div class="course-location">{{scope.row.tue.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="wedn" label="周三">
          <template v-slot="scope">
            <template v-if="scope.row.wedn">
              <div class="course-num">{{scope.row.wedn.courseNum}} [{{scope.row.wedn.courseIndex}}]</div>
              <div class="course-name">{{scope.row.wedn.name}} - {{scope.row.wedn.teacher}}</div>
              <div class="course-location">{{scope.row.wedn.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="thur" label="周四">
          <template v-slot="scope">
            <template v-if="scope.row.thur">
              <div class="course-num">{{scope.row.thur.courseNum}} [{{scope.row.thur.courseIndex}}]</div>
              <div class="course-name">{{scope.row.thur.name}} - {{scope.row.thur.teacher}}</div>
              <div class="course-location">{{scope.row.thur.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="fri" label="周五">
          <template v-slot="scope">
            <template v-if="scope.row.fri">
              <div class="course-num">{{scope.row.fri.courseNum}} [{{scope.row.fri.courseIndex}}]</div>
              <div class="course-name">{{scope.row.fri.name}} - {{scope.row.fri.teacher}}</div>
              <div class="course-location">{{scope.row.fri.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sat" label="周六">
          <template v-slot="scope">
            <template v-if="scope.row.sat">
              <div class="course-num">{{scope.row.sat.courseNum}} [{{scope.row.sat.courseIndex}}]</div>
              <div class="course-name">{{scope.row.sat.name}} - {{scope.row.sat.teacher}}</div>
              <div class="course-location">{{scope.row.sat.location}}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sun" label="周日">
          <template v-slot="scope">
            <template v-if="scope.row.sun">
              <div class="course-num">{{scope.row.sun.courseNum}} [{{scope.row.sun.courseIndex}}]</div>
              <div class="course-name">{{scope.row.sun.name}} - {{scope.row.sun.teacher}}</div>
              <div class="course-location">{{scope.row.sun.location}}</div>
            </template>
          </template>
        </el-table-column>
      </el-table>
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
  data() {
    return {
      scheduleTable: [],
    }
  },
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
  mounted() {
    this.getSchedule();
  },
  methods: {
    /** 获取课程表 */
    getSchedule() {
      // TODO 冲突课程只会显示一个
      const studentNumber = this.$store.state.number;
      this.$axios.get('/course/schedule/get', {
        params: {
          studentNumber
        }
      }).then(res => {
        console.log(res.data);
        this.scheduleTable = res.data.data;
      })
    },
    /** 打印课程表 */
    printScheduleToPDF() {
      // TODO 打印不显示边框
      print({
        printable: this.$refs['schedule-table'],
        type: 'html',
        targetStyle: ['*'],
        scanStyles: false
      });
    }
  }
}
</script>

<style scoped>
.schedule-table {
  padding: 10px;
}
</style>
