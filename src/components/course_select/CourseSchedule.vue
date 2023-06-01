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
            <div>第{{ scope.$index + 1 }}节</div>
            <div>{{getHourInfo(scope.$index + 1)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="mon" label="周一">
          <template v-slot="scope">
            <template v-if="scope.row['1']">
              <schedule-ceil :course="scope.row['1']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="tue" label="周二">
          <template v-slot="scope">
            <template v-if="scope.row['2']">
              <schedule-ceil :course="scope.row['2']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="wedn" label="周三">
          <template v-slot="scope">
            <template v-if="scope.row['3']">
              <schedule-ceil :course="scope.row['3']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="thur" label="周四">
          <template v-slot="scope">
            <template v-if="scope.row['4']">
              <schedule-ceil :course="scope.row['4']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="fri" label="周五">
          <template v-slot="scope">
            <template v-if="scope.row['5']">
              <schedule-ceil :course="scope.row['5']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sat" label="周六">
          <template v-slot="scope">
            <template v-if="scope.row['6']">
              <schedule-ceil :course="scope.row['6']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="sun" label="周日">
          <template v-slot="scope">
            <template v-if="scope.row['7']">
              <schedule-ceil :course="scope.row['7']" :mode="mode" />
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import print from "print-js";
import ScheduleCeil from './ScheduleCeil.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CourseSchedule",
  components: {
    ScheduleCeil
  },
  data() {
    return {
      scheduleTable: [],
      mode: 0,
      hourMap: []
    }
  },
  computed: {
    isTeacher: function(){
      return sessionStorage.getItem("role") === "teacher";
    },
    isStudent: function(){
      return sessionStorage.getItem("role") === "student";
    },
    isSystem: function(){
      return (sessionStorage.getItem("role") === "system" || this.$route.path === "/sysLogin");
    }
  },
  created() {
    if (this.$route.params.isReload === 'true') {
      this.$router.go(0);
    }
  },
  mounted() {
    if(this.isTeacher) {
      this.mode = 1;
    } else if(this.isStudent) {
      this.mode = 0;
    } else if(this.isSystem) {
      this.mode = 2;
    }
    this.getSchedule();
    this.$axios.get('/course/enums/hour').then(res => {
      this.hourMap = res.data.data;
    })
  },
  methods: {
    getHourInfo(index) {
      return this.hourMap[index - 1].desc;
    },
    handleUnLogin(response) {
      // 这里是用户token不正确的回调
      //删除vuex中存储的用户信息
      this.$store.dispatch('setUser', null);
      //删除session中存储的信息
      sessionStorage.clear();
      //删除cookie中存储的信息
      const cookies = Vue.$cookies.keys();
      for (let i = 0; i < cookies.length; i++) {
          Vue.$cookies.remove(cookies[i]);
      }

      this.$message({
          message: response.data.msg + '！请重新登录！',
          type: 'warning',
          duration: 2000
      });
      this.$router.push({name:"Login",params:{isReload: 'true',msg: response.data.msg + '！请重新登录！'}});
    },
    /** 获取课程表 */
    getSchedule() {
      console.log(this.mode);
      if(this.isStudent) {
        const studentNumber = this.$store.state.number;
        this.$axios.get('/course/schedule/get', {
          params: {
            studentNumber
          }
        }).then(res => {
          if(res.data.code === '0000') {
            console.log(res.data);
            this.scheduleTable = res.data.data;
          } else if(res.data.code === '1002') {
            this.handleUnLogin(res);
          }
        })
      } else if(this.isTeacher) {
        const teacherNumber = this.$store.state.number;
        this.$axios.get('/course/schedule/teacher/get', {
          params: {
            teacherNumber
          }
        }).then(res => {
          if(res.data.code === '0000') {
            console.log(res.data);
            this.scheduleTable = res.data.data;
          }
          else if(res.data.code === '1002') {
            this.handleUnLogin(res);
          }
        })
      }
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
