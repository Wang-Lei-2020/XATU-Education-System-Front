<template>
    <div>
        <el-container>
            <el-header>
                <el-row>
                    <el-menu
                            :default-active="paths"
                            class="courseMenu"
                            mode="horizontal"
                            background-color="#fff"
                            text-color="#545c64"
                            active-text-color="#000"
                            router
                    >
                        <el-menu-item index="/coursepage/homepage" style="margin-left: 70%"
                        >首页
                        </el-menu-item
                        >
                        <el-menu-item index="/coursepage/info">基本信息</el-menu-item>
                        <el-menu-item v-if="isTeacher" index="/coursepage/thomeworklist">课程作业</el-menu-item>
                        <el-menu-item v-else index="/coursepage/homeworklist">课程作业</el-menu-item>
                    </el-menu>
                    <div class="backicon">
                        <img src="../../assets/images/back.png" style="cursor: pointer;" height="30" width="30" @click="back">
                    </div>
                    <div class="courseName"><span>{{course.courseName}}</span></div>
                </el-row>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "CoursePage",
    data() {
        return {
            role:"",
            userId:"",
            isTeacher:false,
            paths: this.$router.currentRoute.fullPath,
            course:{}
        };
    },
    created() {
        // console.log(this.$router.currentRoute)
        //登录角色
        if (this.$store.state.isLogin) {
            const role = sessionStorage.getItem('role')
            this.isTeacher = role == "teacher"
            const user = sessionStorage.getItem('user')
            this.userId = JSON.parse(user).number;
        } else this.$message.error('登录会话已过期')

        // console.log(sessionStorage.getItem("courseNum"))
        // console.log(sessionStorage.getItem("courseIndex"))

        //获取当前角色课程
        this.$axios.get('/homework/platform/info', {
            params: {
                courseNumber: sessionStorage.getItem("courseNum"),
                courseIndex: sessionStorage.getItem("courseIndex")
            }
        }).then((res) => {
            // console.log("课程信息",res.data.data)
            this.course = res.data.data;
        })

        // this.paths = this.paths+"/homepage"
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        back() {
            this.$router.push({name: 'CoursePlatform'})
            sessionStorage.removeItem("courseNum")
            sessionStorage.removeItem("courseIndex")
        }
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

.backicon {
    position: absolute;
    left: 1%;
    top: 20px;
}

</style>