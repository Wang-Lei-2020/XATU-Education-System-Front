<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-menu
            :default-active="$router.path"
            class="courseMenu"
            mode="horizontal"
            background-color="#fff"
            text-color="#545c64"
            active-text-color="#000"
            router
          >
            <el-menu-item index="/coursepage/homepage" style="margin-left: 70%"
              >首页</el-menu-item
            >
            <el-menu-item index="/coursepage/info">基本信息</el-menu-item>
            <el-menu-item index="/coursepage/homeworklist">课程作业</el-menu-item>
          </el-menu>
          <div class="courseName"><span>计算机网络</span></div>
        </el-row>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "CoursePage",
  data() {
    return {
    };
  },
  created(){
    this.$router.path = "/coursepage/homepage";
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style>
.courseName {
  position: absolute;
  left: 5%;
  top: 20px;
  color: #2c1088;
  font-weight: 600;
  font-size: 20px;
}
</style>