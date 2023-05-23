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
                        <el-menu-item index="/coursepage/homeworklist">课程作业</el-menu-item>
                    </el-menu>
                    <div class="backicon">
                        <img src="@/assets/images/back.png" style="cursor: pointer;" height="30" width="30" @click="back">
                    </div>
                    <div class="courseName"><span>软件工程经济学</span></div>
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
            paths: this.$router.currentRoute.fullPath,
        };
    },
    created() {
        // console.log(this.$router.currentRoute)
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        back() {
            this.$router.push({name: 'CoursePlatform'})
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