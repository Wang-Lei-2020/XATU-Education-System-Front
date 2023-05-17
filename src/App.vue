<template>
    <div id="app">
      <div v-if="photoFlag">
        <el-dialog
            title="修改头像"
            :visible="photoFlag"
            width="40%">
          <ChangePhoto></ChangePhoto>
        </el-dialog>
      </div>

      <el-container>
        <el-header class="header">
          <!-- 学生端系统的header -->
          <el-row v-if="this.$route.path !== '/TeacherLogin' && !isTeacher"
                  style="height: 100%; background-color: #324b4e; width: 100%;">
            <el-col :span="2" style="min-height: 100%">
            </el-col>
            <el-col :span="5" style="min-height: 100%" >
              <el-col :span="3" style="min-height: 100%; min-width: 60px">
                <img style="height: 56px;margin-right: 8%; cursor:pointer;" src="./assets/logo.png" alt="logo" @click="toHome" >
              </el-col>
              <el-col :span="18" style="min-height: 100%">
                <div style="color: gold; margin-top: 17px; cursor:pointer; font-size: 15px;"  @click="toHome">
                  雄安交通职业技术学院教务系统
                </div>
              </el-col>
            </el-col>
            <el-col v-if= !isSysLoginPath :span="4" style="min-height: 100%">
              <div style="color: white; margin-top: 17px; margin-left:20px">
                学生端
              </div>
            </el-col>
            <el-col v-if= isSysLoginPath :span="4" style="min-height: 100%">
              <div style="color: white; margin-top: 17px; margin-left:20px">
                系统管理端
              </div>
            </el-col>
            <el-col :span="9" style="min-height: 100%">
            </el-col>
            <el-col :span="2" style="min-height: 100%">
              <el-menu v-if="getLoginState" style="background-color: transparent" mode="horizontal">
                    <el-submenu index="1" style="float: left;">
                      <template v-slot:title>
                        <el-avatar :src="getPhotoUrl"></el-avatar>
                        {{getUsername}}
                      </template>
                      <el-menu-item index="3-1" v-on:click="toHome">主页</el-menu-item>
                      <el-menu-item index="3-2" v-on:click="ChangePhoto">修改头像</el-menu-item>
                      <el-menu-item index="3-3" v-on:click="onLogout">注销</el-menu-item>
                    </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
  
          <!-- 教师端系统的header -->
          <el-row v-else
                  style="height: 100%; background-color: darkslateblue; width: 100%;">
            <el-col :span="2" style="min-height: 100%">
            </el-col>
            <el-col :span="5" style="min-height: 100%">
              <el-col :span="3" style="min-height: 100%; min-width: 60px">
                <img style="height: 56px;margin-right: 8%" src="./assets/logo.png" alt="logo">
              </el-col>
              <el-col :span="18" style="min-height: 100%">
                <div style="color: gold; margin-top: 17px; font-size: 15px;">
                    雄安交通职业技术学院教务系统
                </div>
              </el-col>
            </el-col>
            <el-col :span="4" style="min-height: 100%">
              <div style="color: white; margin-top: 17px">
                
              </div>
            </el-col>
            <el-col :span="9" style="min-height: 100%">
            </el-col>
            <el-col :span="2" style="min-height: 100%">
              <el-menu v-if="getLoginState" style="background-color: transparent" mode="horizontal">
                <el-submenu index="1" style="float: left;">
                  <template v-slot:title>
                    <el-avatar :src="getPhotoUrl"></el-avatar>
                    {{getUsername}}
                  </template>
                  <el-menu-item index="3-1" v-on:click="ChangePhoto">修改头像</el-menu-item>
                  <el-menu-item index="3-3" v-on:click="onLogout">注销</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-header>
  
          <el-main v-if="getLoginState" class="main">
            <el-col :span="4">
              <el-row class="tac">
                <el-menu
                    v-if="this.$route.path !== '/' && this.$route.path !== '/register'"
                    router
                    :default-active="this.$route.path"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                >
                  <el-submenu index="1">
                    <template v-slot:title>
                      <i class="el-icon-location"></i>
                      <span>选课系统</span>
                    </template>
                    <el-menu-item v-if="!isTeacher" class="submenu" index="/course_select/schedule">
                      <template v-slot:title>
                        <i class="el-icon-zoom-in"></i>
                        <span>课程表</span>
                      </template>
                    </el-menu-item>
                    <el-menu-item v-if="!isTeacher" class="submenu" index="/course_select/select">
                      <template v-slot:title>
                        <i class="el-icon-zoom-in"></i>
                        <span>选课</span>
                      </template>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item v-if="!isTeacher" class="submenu" index="/courseplatform">
                    <template v-slot:title>
                      <i class="el-icon-document"></i>
                      <span>课程平台</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item v-if="!isTeacher" class="submenu" index="/evaluation">
                    <template v-slot:title>
                      <i class="el-icon-edit"></i>
                      <span>评教系统</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item v-if="!isTeacher" class="submenu" index="/schedule">
                    <template v-slot:title>
                      <i class="el-icon-loading"></i>
                      <span>学科进度</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item v-if="!isTeacher" class="submenu" index="/userInfo">
                    <template v-slot:title>
                      <i class="el-icon-info"></i>
                      <span>个人信息</span>
                    </template>
                  </el-menu-item>
                </el-menu>
              </el-row>
            </el-col>
            <el-col v-if="getLoginState" :span="20">
              <router-view></router-view>
            </el-col>
          </el-main>
          <el-main v-if="!getLoginState" class="main">
            <router-view></router-view>
          </el-main>
  
        <el-footer class="footer">
          <el-backtop></el-backtop>
          <div style="text-align: center;color:#5a5959;margin-top: 35px">版权所有© 北京交通大学软件学院</div>
        </el-footer>
      </el-container>
    </div>
  </template>
  
  
  <script>
  import ChangePhoto from "@/components/ChangePhoto";
  import Vue from "vue";
  
  export default {
    name: "App",
    components:{ChangePhoto},
    data() {
      return {
        photoFlag:false
      }
    },
    created() {
        //每次刷新时vuex中数据丢失，再从session中获取
        this.isLogin();
        this.ver();
    },
    computed: {
      // 计算属性的 getter
      getUsername: function () {
        if(!this.$store.state.isLogin){
          return "未登录";
        }else{
          return this.$store.state.name;
        }
      },
      getLoginState: function (){
        return this.$store.state.isLogin;
      },
      getPhotoUrl: function(){
        if(sessionStorage.getItem("photoUrl") !== "null") {
          return sessionStorage.getItem("photoUrl");
        }
        else{
          return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        }
      },
      getRole: function(){
        return sessionStorage.getItem("role");
      },
      isTeacher: function(){
        return sessionStorage.getItem("role") === "teacher";
      },
      isSysLoginPath: function(){
        return this.$route.path === "/sysLogin";
      }
    },
  
    methods: {
        //判断是否已经登录状态
        isLogin() {
            //判断sessionStorage中是否有登录信息
            if (sessionStorage.getItem("user") != null && sessionStorage.getItem("userToken")) {
                //存在登录信息就从sessionStorage中提取状态再传值给vuex中
                this.$store.commit("userStatus", sessionStorage.getItem("user"));
            } else {
                //登录不成功就将vuex中的state清空
                this.$store.commit("userStatus", null);
            }
            //返回登录状态islogin
            return this.$store.getters.isLogin;
        },
        //通过登录状态来判断用户是否登录执行相关的操作
        ver() {
            if (this.$route.path !== "/sysLogin") {
                if (this.$store.state.isLogin) {
                    this.$notify({
                        title: '系统提示',
                        message: '欢迎用户：' + this.$store.state.number + this.$store.state.name,
                        position: 'bottom-right',
                        type: 'success', //提醒类型
                        duration: 2000  //持续时间
                    });
                } else {
                    //如果没有登录就返回登录界面
                    this.$router.push("/");
                    // this.$message({
                    //         message: '警告，请登录账户',
                    //         type: 'warning'
                    // });
                }
            }
            else {
                //删除vuex中存储的用户信息
                this.$store.dispatch('setUser', null)
                //删除session中存储的信息
                sessionStorage.clear()
                //删除cookie中存储的信息
                const cookies = Vue.$cookies.keys();
                for (let i = 0; i < cookies.length; i++) {
                    Vue.$cookies.remove(cookies[i])
                }
            }
        },

        onLogout: function () {
            const _this = this;
            let formData = new FormData()
            formData.append('id', JSON.parse(sessionStorage.getItem('user')).id)
            console.log(formData)
            this.$axios.post('/user/stu/logout',formData,{
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                withCredentials: true
            }).then(function (response) {
                if(response.data.code === '0000'){
                    //删除vuex中存储的用户信息
                    _this.$store.dispatch('setUser', null)
                    //删除session中存储的信息
                    sessionStorage.clear()
                    //删除cookie中存储的信息
                    const cookies = Vue.$cookies.keys();
                    for (let i = 0; i < cookies.length; i++) {
                        Vue.$cookies.remove(cookies[i])
                    }
  
                    _this.$message({
                        message: '登出成功！',
                        type: 'success',
                        duration: 2000
                    });
                    _this.$router.push({name:"Login",params:{isReload: 'true',msg: '登出成功！'}});
                }
            }).catch(function (response) {
                // 这里是处理错误的回调
                console.log(response)
            })
        },

        // toRegister: function () {
        //     let flag = false;
        //     this.$store.commit('login', flag);
        //     // localStorage.clear();
        //     const cookies = Vue.$cookies.keys();
        //     for (let i = 0; i < cookies.length; i++) {
        //         Vue.$cookies.remove(cookies[i])
        //     }
  
        //     console.log(this.$route.path);
        //     if (this.$route.path !== "/register") {
        //         this.$router.push({name:"Register",params:{isReload: 'true'}});
        //     }
        // },

        toHome: function () {
            if (this.$route.path !== "/home") {
                this.$router.push({name:"Home",params:{isReload: 'true'}});
            }
        },

        ChangePhoto: function(){
            this.photoFlag = true;
        },
      
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    }
}
  </script>
  
  <style scoped>
  .header, .footer, .main {
    padding: 0;
  }
  
  .main {
    min-height: calc(100vh - 121px)
  }
  </style>
  