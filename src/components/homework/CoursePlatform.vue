<template>
    <div class="page">
        <el-row style="height: 200px">
            <el-col :span="14">
                <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="通知公告" name="first"></el-tab-pane>
                </el-tabs>
                <el-button size="mini" class="showNotice">更多 >></el-button>
            </el-col>

            <el-col :span="8" :offset="2">
                <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="互动提醒" name="first">
                        <el-row>
                            <el-tree
                                    :data="treedata"
                                    :props="defaultProps"
                                    @node-click="handleNodeClick"
                            ></el-tree>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="课程列表" name="first">
                        <div class="coursepane">
                            <el-row
                                    v-for="(rows, index) in courseCardList"
                                    :key="index"
                            >
                                <el-col v-for="course in rows" :key="course.courseNum" :span="8">
                                    <CourseCard
                                            :course="course"
                                    ></CourseCard>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-button size="mini" class="showCourse" @click="showCourseList">查看我的全部课程</el-button>
        </el-row>
    </div>
</template>

<script>
import CourseCard from "@/components/homework/CourseCard.vue";

export default {
    name: "CoursePlatform",
    components: {CourseCard},
    data() {
        return {
            userId: "",
            isTeacher: false,
            activeName: "first",
            courseCardList: [],
            cardRowNum: 3,
            noiteNum: 10,
            homeworkCourseList: [],
            courseList: [],
            treedata: [],
            defaultProps: {
                children: "children",
                label: "label",
            },

        };
    },
    created() {
        //登录角色
        if (this.$store.state.isLogin) {
            const role = sessionStorage.getItem('role')
            this.isTeacher = role == "teacher"
            const user = sessionStorage.getItem('user')
            this.userId = JSON.parse(user).number
        } else this.$message.error('登录会话已过期')


        if(this.isTeacher){
            //获取当前角色课程
            this.$axios.get('/homework/platform/tec/page', {
                params: {
                    userId: this.userId
                }
            }).then((res) => {
                // console.log("课程列表",res.data.data)
                this.courseList = res.data.data
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
            })

            //待批改作业课程数、列表
            // this.$axios.get('/homework/platform/tec/task', {
            //     params: {
            //         userId: this.userId
            //     }
            // }).then((res) => {
            //     console.log("待完成作业课程",res.data.data)
            //     this.homeworkCourseList = res.data.data
            //     if (this.homeworkCourseList.length != 0) {
            //         let children = [];
            //         this.homeworkCourseList.forEach(function (item) {
            //             children.push({
            //                 label: item.courseName,
            //                 children: []
            //             });
            //         });
            //
            //         this.treedata.push({
            //             label: this.homeworkCourseList.length + "门课程有待批改作业",
            //             children: children,
            //         });
            //     }
            // })

        }else{
            //获取当前角色课程
            this.$axios.get('/homework/platform/stu/page', {
                params: {
                    userId: this.userId
                }
            }).then((res) => {
                // console.log("课程列表",res.data.data)
                this.courseList = res.data.data
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
            })

            //待完成作业课程数、列表
            this.$axios.get('/homework/platform/task', {
                params: {
                    userId: this.userId
                }
            }).then((res) => {
                console.log("待完成作业课程",res.data.data)
                this.homeworkCourseList = res.data.data
                if (this.homeworkCourseList.length != 0) {
                    let children = [];
                    this.homeworkCourseList.forEach(function (item) {
                        children.push({
                            label: item.courseName,
                            children: []
                        });
                    });

                    this.treedata.push({
                        label: this.homeworkCourseList.length + "门课程有待提交作业",
                        children: children,
                    });
                }
            })
        }


    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        showCourseList() {
            this.$router.push({name: 'CourseList'});
        },
        getHomeWorkList() {

        },
        changeCurrent(val) {
            console.log(val);

        },
        rowClick(val) {
            console.log(val);
        },
        //树形组件点击事件
        handleNodeClick(data,node) {
            if(node.isLeaf){
                // console.log("data",data.label);
                let courseNum=""
                let courseIndex=""
                this.homeworkCourseList.forEach(function (item) {
                    console.log(item)
                    if(item.courseName == data.label){
                        // console.log(item)
                        courseNum = item.courseNum
                        courseIndex = item.courseIndex
                    }
                });
                sessionStorage.setItem("courseNum",courseNum)
                sessionStorage.setItem("courseIndex",courseIndex)
                this.$router.push({name: 'HomePage'});

            }
        }
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

.back {
    margin-top: 20px !important;
    margin-left: 50% !important;
}
</style>