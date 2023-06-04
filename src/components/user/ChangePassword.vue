<template>
    <el-form class="login-box1" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <h3 class="login-title">修改密码</h3>
        <el-form-item label="原密码：" prop="oldPwd" class="title">
            <el-input type="password" show-password auto-complete="off" placeholder="请输入原密码" v-model="ruleForm.oldPwd"/>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPwd" class="title">
            <el-input type="password" show-password auto-complete="off" placeholder="请设置新密码" v-model="ruleForm.newPwd"/>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPwd" class="title">
            <el-input type="password" show-password auto-complete="off" placeholder="请确认新密码" v-model="ruleForm.checkPwd"/>
        </el-form-item>
        <el-form-item style="float: left; margin-left: 20px;">
            <el-button v-if="isStudent" type="primary" style="width: 100px;" @click="changeStuPassword()">保存</el-button>
            <el-button v-if="isTeacher" type="primary" style="width: 100px;" @click="changeTeaPassword()">保存</el-button>
            <el-button style="width: 100px; margin-left: 30px;" @click="reset()">重置</el-button>
        </el-form-item>
    </el-form>
</template>
  
  <script>
  import Vue from "vue";
  
  export default {
    name: "ChangePassword",
    data() {
      return {
        ruleForm: {
          oldPwd: '',
          newPwd: '',
          checkPwd:'',
        },
        correctPassword:2,//判断密码是否正确
        rules: {
          oldPwd: [
            { required: true, message: '请输入原密码'}
          ],
          newPwd: [
            { required: true, message: '请输入新密码'}
          ],
          checkPwd: [
            { required: true, message: '请再次确认密码'}
          ],
        }
      };
    },
    created() {

    },
    computed: {
        isStudent: function() {
            return sessionStorage.getItem('role') === 'student'
        },
        isTeacher: function () {
            return sessionStorage.getItem('role') === 'teacher'
        }
    },
    methods: {
        changeStuPassword: function(){
            const _this = this;
            if (_this.ruleForm.newPwd === _this.ruleForm.checkPwd) {
                let formData = new FormData()
                formData.append('id', JSON.parse(sessionStorage.getItem('user')).id)
                formData.append('oldPwd', _this.ruleForm.oldPwd)
                formData.append('newPwd', _this.ruleForm.newPwd)
                this.$axios.post('/user/stu/changePassword', formData, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    withCredentials: true
                }).then(function (response) {
                    //密码修改成功
                    if (response.data.code === '0000'){
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
                            message: '密码修改成功！',
                            type: 'success',
                            duration: 2000
                        });
                        _this.$router.push({name:"Login",params:{isReload: 'true',msg: '密码修改成功！'}});
                    }
                    //密码修改失败
                    else if (response.data.code === '0001') {
                        _this.$message({
                            message: '密码修改失败，请确保原密码输入正确！',
                            type: 'warning',
                            duration: 2000
                        });
                    }
                    // 这里是用户token不正确的回调
                    else if (response.data.code === '1002') {
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
                    _this.$message.error(response.data.msg)
                })
            } else {
                _this.$message({
                     message: '两次输入的新密码不一致!',
                     type: 'warning',
                     duration: 2000
                    });
            }
        },
        changeTeaPassword: function () {
            const _this = this;
            if (_this.ruleForm.newPwd === _this.ruleForm.checkPwd) {
                let formData = new FormData()
                formData.append('id', JSON.parse(sessionStorage.getItem('user')).id)
                formData.append('oldPwd', _this.ruleForm.oldPwd)
                formData.append('newPwd', _this.ruleForm.newPwd)
                this.$axios.post('/user/tea/changePassword', formData, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    withCredentials: true
                }).then(function (response) {
                    //密码修改成功
                    if (response.data.code === '0000'){
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
                            message: '密码修改成功！',
                            type: 'success',
                            duration: 2000
                        });
                        _this.$router.push({name:"Login",params:{isReload: 'true',msg: '密码修改成功！'}});
                    }
                    //密码修改失败
                    else if (response.data.code === '0001') {
                        _this.$message({
                            message: '密码修改失败，请确保原密码输入正确！',
                            type: 'warning',
                            duration: 2000
                        });
                    }
                    // 这里是用户token不正确的回调
                    else if (response.data.code === '1002') {
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
                    _this.$message.error(response.data.msg)
                })
            } else {
                _this.$message({
                     message: '两次输入的新密码不一致!',
                     type: 'warning',
                     duration: 2000
                    });
            }
        },
        reset: function(){
            this.ruleForm.oldPwd = '';
            this.ruleForm.newPwd = ''
            this.ruleForm.checkPwd = '';
        }
    }
}
  </script>
  
  <style scoped>
.login-box1 {
  border: 3px solid #0c4540;
  width: 450px;
  height: 300px;
  margin: 10px auto;
  padding: 30px 70px 5px 30px;
  border-radius: 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
.title {
  text-align: center;
  margin: 0 auto 25px auto;
  color: #303133;
}
  </style>
  