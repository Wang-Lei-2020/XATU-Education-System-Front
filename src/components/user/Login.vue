<template>
    <div>
      <div class="login_form">
        <el-container>
          <el-aside width="30%"></el-aside>
          <el-main class="login-main"
                   style="margin-top:8%;margin-bottom:14%;width: 200%;height: 80%;vertical-align: center">
            <h1 style="color: #409EFF;text-align: center">登录</h1>
            <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="20%">
              <el-form-item label="学号/工号" prop="number" required>
              <el-input v-model="loginForm.number" type="text" autocomplete="off" placeholder="请输入学号/工号" clearable
                          size="medium" style="width: 90%"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" required>
                <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" clearable
                          size="medium" style="width: 90%"></el-input>
              </el-form-item>
             <el-form-item label="角色" prop="role" required>
               <el-select v-model="loginForm.role" placeholder="请选择角色" style="width: 90%">
                 <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" >
                 </el-option>
               </el-select>
             </el-form-item>
              <el-form-item label-width="0">
                <el-button type="primary" @click="onLogin" style="margin-left: 37%;width:150px">登录</el-button>
                <div class="clearBox"></div>
              </el-form-item>
            </el-form>
          </el-main>
          <el-aside width="30%"></el-aside>
        </el-container>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
      return {
        user: {},
        loginForm: {
          number: '',
          password: '',
          role: 'student'
        },
        rules: { //prop的名字必须和rules中的名字一样！！！
          number: [
            { required: true, message: '请输入学号/工号' }
          ],
          password: [
            { required: true, message: '请输入密码'}
          ],
          role: [
            { required: true, message: '请选择角色'}
          ],
        },
        roleOptions: [{
          value: 'student',
          label: '学生'
        }, {
          value: 'teacher',
          label: '教师',
        }],
      }
    },
    created() {
      if(this.$store.state.isLogin) {
        this.$router.push({name: 'Home', params: {isReload: 'true'}});
      }
  
      if (this.$route.params.isReload === 'true') {
        this.$router.go(0);
      }
    },
    methods: {
      onLogin: function () {
        const _this = this;
        if (_this.loginForm.role === "student") {
            _this.onStuLogin();
        }
        else if (_this.loginForm.role === "teacher") {
            _this.onTeaLogin();
        }
      },
      onStuLogin: function () {
        const _this = this
        let formData = new FormData();
        formData.append('number', _this.loginForm.number);
        formData.append('password', _this.loginForm.password);
        this.$axios.post('/user/stu/login', formData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          // 这里是处理正确的回调
          if (response.data.code === '0000') {
            //将用户名放入sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(response.data.data));
            sessionStorage.setItem("userToken", response.data.data.userToken);
            sessionStorage.setItem("role", "student");
            sessionStorage.setItem("photoUrl", response.data.data.photoUrl);

            //将用户名放入vuex中
            _this.$store.dispatch("setUser", JSON.stringify(response.data.data));
            _this.$store.dispatch("setToken", response.data.data.userToken);
            _this.$router.push({name: 'Home', params: {isReload: 'true'}});
          }else{
            _this.$message.error('账号或密码错误');
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        });
      },
      onTeaLogin: function () {
        const _this = this
        let formData = new FormData();
        formData.append('number', _this.loginForm.number);
        formData.append('password', _this.loginForm.password);
        this.$axios.post('/user/tea/login', formData, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          // 这里是处理正确的回调
          if (response.data.code === '0000') {
            //将用户名放入sessionStorage中
            sessionStorage.setItem("user", JSON.stringify(response.data.data));
            sessionStorage.setItem("userToken", response.data.data.userToken);
            sessionStorage.setItem("role", "teacher");
            sessionStorage.setItem("photoUrl", response.data.data.photoUrl);

            //将用户名放入vuex中
            _this.$store.dispatch("setUser", JSON.stringify(response.data.data));
            _this.$store.dispatch("setToken", response.data.data.userToken);
            _this.$router.push({name: 'Home', params: {isReload: 'true'}});
          }else{
            _this.$message.error('账号或密码错误');
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
          console.log(response)
        });
      },
    }
  }
  </script>
  
  <style scoped>
  .login-main {
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: rgba(255,255,255,0.9);
  }
  
  .login_form{
    width: 100%;
    height: 100%;
    /*padding: 16px 16px 0 16px;*/
    background-image: url("@/assets/思源楼.png");
    background-size: cover;
    background-position: center center;
  }
  
  .clearBox {
    clear: both;
  }
  </style>
  