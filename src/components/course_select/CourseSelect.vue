<template>
  <div class="container">
    <div class="select-panel" v-if="selectAvailable">
      <p>当前已选课</p>
      <el-table :data="selectedList" border style="width: 100%"
      :cell-style="{padding: '3px 0'}" :header-cell-style="{padding: '6px 0'}">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="courseNum" label="课程号" width="90"></el-table-column>
        <el-table-column label="课堂">
          <template v-slot="scope">
            <span>{{ scope.row.name + ' ' + scope.row.courseIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="课容量" width="64" :resizable="false"></el-table-column>
        <el-table-column prop="remain" label="课余量" width="64" :resizable="false"></el-table-column>
        <el-table-column label="选课说明" width="120">
          <template v-slot="scope">
            <div class="overflow-text" :title="scope.row.info">{{ scope.row.info }}</div>
          </template>
        </el-table-column>
        <el-table-column label="学时/学分" width="90">
          <template v-slot="scope">
            <span>{{ scope.row.creditHour + '/' + scope.row.credit }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assessment" label="考试类型" width="90"></el-table-column>
        <el-table-column prop="teacher" label="上课教师" width="120"></el-table-column>
        <el-table-column label="时间地点" width="200">
          <template v-slot="scope">
            <span>{{ parseCourseTime(scope.row.dayTime, scope.row.hourPeriod) + '/' + scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button @click="handleUnselectCourse(scope.row)" type="text" size="small">退选</el-button>
          </template>
        </el-table-column>
      </el-table>

      <p>选课</p>
      <el-table :data="availableList" border style="width: 100%"
      :cell-style="{padding: '3px 0'}" :header-cell-style="{padding: '6px 0'}">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="courseNum" label="课程号" width="90"></el-table-column>
        <el-table-column label="课堂">
          <template v-slot="scope">
            <span>{{ scope.row.name + ' ' + scope.row.courseIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="课容量" width="64" :resizable="false"></el-table-column>
        <el-table-column prop="remain" label="课余量" width="64" :resizable="false"></el-table-column>
        <el-table-column label="选课说明" width="120">
          <template v-slot="scope">
            <div class="overflow-text" :title="scope.row.info">{{ scope.row.info }}</div>
          </template>
        </el-table-column>
        <el-table-column label="学时/学分" width="90">
          <template v-slot="scope">
            <span>{{ scope.row.creditHour + '/' + scope.row.credit }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assessment" label="考试类型" width="90"></el-table-column>
        <el-table-column prop="teacher" label="上课教师" width="120"></el-table-column>
        <el-table-column label="时间地点" width="200">
          <template v-slot="scope">
            <span>{{ parseCourseTime(scope.row.dayTime, scope.row.hourPeriod) + '/' + scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="scope">
            <el-button v-if="scope.row.selected === 1" type="text" size="small" disabled>已选</el-button>
            <el-button v-else-if="scope.row.remain === 0" type="text" size="small" disabled>无余量</el-button>
            <el-button @click="handleSelectCourse(scope.row)" type="text" size="small" v-else>选课</el-button>
          </template>
        </el-table-column>
      </el-table>

      <p>冲突课程</p>
      <el-table :data="conflictingList" border style="width: 100%" :span-method="handleSpanConflictingTable" :row-class-name="tableRowClassName"
      :cell-style="{padding: '3px 0'}" :header-cell-style="{padding: '6px 0'}">
        <el-table-column prop="courseNum" label="课程号" width="90"></el-table-column>
        <el-table-column label="课堂">
          <template v-slot="scope">
            <span>{{ scope.row.name + ' ' + scope.row.courseIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="capacity" label="课容量" width="64" :resizable="false"></el-table-column>
        <el-table-column prop="remain" label="课余量" width="64" :resizable="false"></el-table-column>
        <el-table-column label="选课说明" width="120">
          <template v-slot="scope">
            <div class="overflow-text" :title="scope.row.info">{{ scope.row.info }}</div>
          </template>
        </el-table-column>
        <el-table-column label="学时/学分" width="90">
          <template v-slot="scope">
            <span>{{ scope.row.creditHour + '/' + scope.row.credit }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assessment" label="考试类型" width="90"></el-table-column>
        <el-table-column prop="teacher" label="上课教师" width="120"></el-table-column>
        <el-table-column label="时间地点" width="200">
          <template v-slot="scope">
            <span>{{ parseCourseTime(scope.row.dayTime, scope.row.hourPeriod) + '/' + scope.row.location }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="select-panel-disable" v-else>
      选课暂未开放
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CourseSelect",
  components: {},
  data() {
    return {
      selectAvailable: false,
      // 可选课程列表
      availableList: [],
      // 冲突课程列表
      conflictingList: [],
      // 已选课程列表
      selectedList: [],
      query: {
        pageNum: 1,
        pageSize: 20
      }
    }
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
    console.log('mounted!');

    this.$axios.get('/sys/task/status').then(res => {
      if(res.data.code === '0000') {
        this.selectAvailable = (res.data.data === 1);
        if(this.selectAvailable) {
          this.refreshData();
        }
      } 
      // 这里是用户token不正确的回调
      else if (res.data.code === '1002') {
        this.handleUnLogin(res);
      }
      else {
        this.selectAvailable = false;
        this.$message.error('获取选课任务失败');
      }
    })
  },
  methods: {
    parseCourseTime(week, index) {
      const weekMap = {
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六',
        7: '星期日'
      };
      return `${weekMap[week]},第${index}节`;
    },
    /** 冲突课程表格，设置分组标题行的class */
    tableRowClassName({ row }) {
      if (row.fullLine === 1) {
        return 'full-line-row';
      }
      return '';
    },
    /** 冲突课程表格，设置分组标题行，一整行为合并单元格 */
    handleSpanConflictingTable({ row, columnIndex }) {
      if(row.fullLine === 1) {
        if(columnIndex === 0) {
          return [1, 9];
        } else {
          return [0, 0];
        }
      }
    },
    /** 刷新数据 */
    refreshData() {
      this.listAvailableCourse();
      this.listConflictingCourse();
      this.listSelectedCourse();
    },
    /** 获取冲突课程 */
    listConflictingCourse() {
      const studentNumber = this.$store.state.number
      this.$axios.get('/course/conflicting/list', {
        params: {
          studentNumber
        }
      }).then(res => {
        if(res.data.code === '0000') {
          const conflictingMap = res.data.data;
          let resultList = [];
          for(const key in conflictingMap) {
            resultList.push({courseNum: key, fullLine: 1});
            resultList = resultList.concat(conflictingMap[key]);
          }
          this.conflictingList = resultList;
        }
      })
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
    /** 获取已选课程 */
    listSelectedCourse() {
      const studentNumber = this.$store.state.number
      this.$axios.get('/course/selected/list', {
        params: {
          studentNumber
        }
      }).then(res => {
        res;
        this.selectedList = res.data.data;
      })
    },
    /** 获取可选课程 */
    listAvailableCourse() {
      const studentNumber = this.$store.state.number
      this.$axios.get('/course/available/list', {
        params: {
          studentNumber,
          ...this.query
        }
      }).then(res => {
        this.availableList = res.data.data;
      })
    },
    /** 选课 */
    handleSelectCourse(row) {
      const studentNumber = this.$store.state.number
      const formData = new FormData();
      formData.append('studentNumber', parseInt(studentNumber));
      formData.append('courseNum', row.courseNum);
      formData.append('courseIndex', row.courseIndex);
      this.$axios.post('/course/select', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        res;
        this.$message.success('选课成功');
        this.refreshData();
      }).catch(err => {
        console.log(err);
        this.$message.error('选课失败');
      })
    },
    /** 退选课 */
    handleUnselectCourse(row) {
      const studentNumber = this.$store.state.number;
      const formData = new FormData();
      formData.append('studentNumber', parseInt(studentNumber));
      formData.append('courseNum', row.courseNum);
      formData.append('courseIndex', row.courseIndex);
      this.$axios.post('/course/unselect', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        res;
        this.$message.success('退课成功');
        this.refreshData();
      }).catch(err => {
        console.log(err);
        this.$message.error('退课失败');
      })
    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
}
/* 冲突课程表格，分组标题行 */
>>>.el-table .full-line-row {
  background: #f0f9eb;
}
/* 超出部分省略号显示 */
.overflow-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
