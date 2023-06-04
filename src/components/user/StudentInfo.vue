<template>
    <div>
      <el-dialog
          title="修改密码"
          :visible.sync="ChangePasswordFlag"
          :before-close="handleClose"
          width="40%">
        <ChangePassword></ChangePassword>
      </el-dialog>
  
      <el-container>
        <el-aside width="15%"></el-aside>
        <el-main class="register-main"
                 style="margin-top: 10px;margin-bottom: 10px;width: 400px;height:100%;vertical-align: center">
          <h1 style="color: #409EFF;text-align: center">个人信息</h1>
  
          <el-form :model="user" :rules="rules" ref="updateData" label-width="20%">
            <el-row>
                <el-col :span="12">
                    <img :src = "getPhotoUrl" style="height: 280px; width: 280px; margin: 10px 0 0 100px;"/>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-form-item label="姓名：" style="margin: 10px 0 0 20px;">
                            <el-input v-model="user.name" type="text" autocomplete="off" disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="学号：" style="margin: 10px 0 0 20px;">
                            <el-input v-model="user.number" type="text" autocomplete="off"  disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="学院：" style="margin: 10px 0 0 20px;">
                            <el-input v-model="user.schoolValue" type="text" autocomplete="off" disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="班级：" style="margin: 10px 0 0 20px;">
                            <el-input v-model="user.classNumber" type="text" autocomplete="off" disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="籍贯：" style="margin: 10px 0 0 17px;">
                            <el-input v-model="user.household" type="text" autocomplete="off" disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="入学日期:" style="margin: 10px 0 0 17px;">
                            <el-input v-model="user.enrollmentTime" type="text" autocomplete="off" disabled
                            size="medium" style="width: 60%"></el-input>
                        </el-form-item>
                    </el-row>
            </el-col>
          </el-row>

            <el-form-item label="性别：" prop="sex" style="margin: 10px 0 15px 10px;" required>
              <el-select v-model="user.sex" placeholder="请选择性别" style="width: 80%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生日：" prop="birth" style="margin: 10px 0 15px 10px;" required>
                <el-date-picker
                  v-model="user.birth"
                  type="date"
                  style="width: 80%"
                  placeholder="选择日期"
                  clearable>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="民族：" prop="nation" style="margin: 10px 0 15px 10px;" required>
                <nation-select :nationValue="user.nation" @onChange="nationSearchChange" style="width: 80%" placeholder="请输入民族"></nation-select>
            </el-form-item>

            <el-form-item label-width="0">
              <el-button type="primary" @click="save()" style="margin-left: 20%;width:100px">保存</el-button>
              <el-button type="danger" @click="clearForm" style="margin-left: 3%;width:100px">清空</el-button>
              <el-button type="success" @click="changePassword()" style="float: right;margin-right: 18%;width:100px">修改密码</el-button>
              <div class="clearBox"></div>
            </el-form-item>
          </el-form>
        </el-main>
        <el-aside width="25%"></el-aside>
      </el-container>
    </div>
  </template>
  
  <script>
  import { provinceAndCityData, codeToText } from 'element-china-area-data'; 
  import NationSelect from "@/components/sys/NationSelect";
  import ChangePassword from "@/components/user/ChangePassword";
  import Vue from "vue";
  
  export default {
    name: "StudentInfo",
    components: {ChangePassword, NationSelect},
    data() {
      return {
        user: {
            id:"",
            name: "",
            number: "",
            school: "",
            classNumber: "",
            enrollmentTime: "",
            sex: "",
            birth: "",
            nation: "",
            household: "",
        },
        ChangePasswordFlag: false,
        options: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女',
        }],

        //籍贯组件
        householdOptions: provinceAndCityData, // 省市二级联动（不带“全部”选项）
        selectedOptions: [],
        pro: '广东省',

        rules: { //prop的名字必须和user中的名字一样！！！
            sex: [
                { required: true, message: '请输入性别'}
            ],
            birth: [
                { required: true, message: '请输入生日'}
            ],
            nation: [
                { required: true, message: '请输入民族'}
            ],
            household: [
                { required: true, message: '请输入籍贯'}
            ]
        }
      }
    },
    created() {
      if (this.$route.params.isReload === 'true') {
        this.$router.go(0);
      }
      this.getUserInfo();
    },
    computed: {
        getPhotoUrl: function(){
            if(sessionStorage.getItem("photoUrl") !== "null") {
                return sessionStorage.getItem("photoUrl");
            }
            else{
                return "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            }
        },
    },
    methods: {
      getUserInfo: function(){
        this.user.id = JSON.parse(sessionStorage.getItem('user')).id;
        this.user.name = JSON.parse(sessionStorage.getItem('user')).name;
        this.user.number = JSON.parse(sessionStorage.getItem('user')).number;
        this.user.school = JSON.parse(sessionStorage.getItem('user')).school;
        this.user.schoolValue = JSON.parse(sessionStorage.getItem('user')).schoolValue;
        this.user.classNumber = JSON.parse(sessionStorage.getItem('user')).classNumber;
        this.user.enrollmentTime = this.getDate(JSON.parse(sessionStorage.getItem('user')).enrollmentTime);
        this.user.sex = JSON.parse(sessionStorage.getItem('user')).sex;
        this.user.birth = JSON.parse(sessionStorage.getItem('user')).birth;
        this.user.nation = JSON.parse(sessionStorage.getItem('user')).nation;
        this.user.household = JSON.parse(sessionStorage.getItem('user')).household;
      },
      // 时间转换
      getDate(timestamp) {
        if (!timestamp) {
            return '-'
        }
        var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
        var D = (date.getDate() + 1 < 10 ? '0' + date.getDate()  : date.getDate()) + ' '
        return Y + M + D
      },
      nationSearchChange(val) {
        this.user.nation = val;
      },
      save: function() {
        this.$refs["updateData"].validate(valid =>{
            if(valid){
                const _this = this;
                this.$axios.post('/user/stu/update', {
                    "id" : _this.user.id,
                    "sex" : _this.user.sex,
                    "birth" : _this.user.birth,
                    "nation" : _this.user.nation,
                }, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    withCredentials: true
                }).then(function (response) {
                    // 这里是处理正确的回调
                    if(response.data.code === '0000'){
                         //将用户名放入sessionStorage中
                         sessionStorage.setItem("user", JSON.stringify(response.data.data));
                         //将用户名放入vuex中
                         _this.$store.dispatch("setUser", JSON.stringify(response.data.data));
                         _this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                    else if(response.data.code === '1002') {
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
                            message: response.data.msg + '！请重新登录！',
                            type: 'warning',
                            duration: 2000
                        });
                        _this.$router.go(0)
                        _this.$router.push({name:"Login",params:{isReload: 'true',msg: response.data.msg + '！请重新登录！'}});
                    }
                }).catch(function (response) {
                    // 这里是处理错误的回调
                    _this.$message.error(response.data.message)
                })
            }
        })
      },
      clearForm: function () {
        this.user.sex = "";
        this.user.birth = "";
        this.user.nation = "";
      },
      changePassword: function(){
        this.ChangePasswordFlag = true;
      },
      handleClose(done) {
        done();
      },
      householdChange(val) {
      this.user.household = codeToText[val[0]] + codeToText[val[1]];
    },
    }
  }
  </script>
  
  <style scoped>
  .register-main {
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding-top: 20px;
  }
  
  .clearBox {
    clear: both;
  }
  </style>
  