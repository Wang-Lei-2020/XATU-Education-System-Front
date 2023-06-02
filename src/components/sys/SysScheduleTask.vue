<template>
  <div>
    <el-form :model="searchData" ref="searchData" label-width="100px">
      <el-row style="margin-top:40px">
        <el-col :span="6" >
          <el-form-item label="学年" prop="term">
            <el-input v-model="searchData.term"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时段" prop="number">
            <el-select v-model="searchData.period" placeholder="请选择" clearable>
              <el-option
                v-for="item in periods"
                :key="item.desc"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:20px">   
        <el-col :span="3" :offset="1">
          <el-button type="primary" icon="el-icon-plus"  @click="add" style="font-size: 18px">新增</el-button>
        </el-col>
        <el-col :span="3" :offset="0">
          <el-button type="primary" icon="el-icon-search" @click="handleQuery" style="font-size: 18px">查询</el-button>
        </el-col>
      </el-row>     
    </el-form>

    <el-table
      :data="tableDatas"
      border
      style="width: 100%;font-size: 16px">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="term"
        label="学年"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="periodStr"
        label="时段"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="info"
        label="说明">
      </el-table-column>
      <el-table-column
        align="center"
        prop="beginTime"
        label="开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="endTime"
        label="结束时间"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="statusStr"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="240">
          <template #default="scope">
            <el-button @click="open(scope.row)" type="text" size="small" style="font-size: 15px">删除</el-button>
            <el-button @click="Update(scope.row)"  type="text" size="small" style="font-size: 15px" :disabled="scope.row.statusStr !== '未开始'">编辑</el-button>
            <el-button @click="StartTask(scope.row)"  type="text" size="small" style="font-size: 15px" :disabled="scope.row.statusStr !== '未开始'">立即开始</el-button>
            <el-button @click="StopTask(scope.row)"  type="text" size="small" style="font-size: 15px" :disabled="scope.row.statusStr !== '进行中'">立即停止</el-button>
          </template>
      </el-table-column>

    </el-table>
  <!--分页组件-->
    <div style="text-align: right">
      <el-row>
        <el-col :span="24">
            <el-pagination
            style="margin: 15px 0px"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="size"
            :current-page="now"
            :page-sizes="[2, 4, 6, 8, 10]"
            @current-change="findPage"
            @size-change="findSize"
            :total="total"
            >
            </el-pagination>
        </el-col>
      </el-row>
    </div>
    <!--修改对话框-->
    <el-dialog customClass="customWidth"
      :modal="true"
      :visible="dialogVisible"
      width="60%"
      :title="Title"
      @close="closeUpdate"
    >
       <!--"修改"对话框中的表单-->
      <div style="margin-right: 20px">
        <el-form :model="updateData" :rules="rules" ref="updateData" label-width="100px">
          <el-row>
            <el-col :span="10">
                <el-form-item label="学年" prop="term">
                  <el-input v-model="updateData.term"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时段" prop="period">
                <el-select v-model="updateData.period" placeholder="请选择">
                  <el-option
                    v-for="item in periods"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
                <!-- <el-input   v-model="updateData.school"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="说明" prop="info">
                <el-input v-model="updateData.info"></el-input>
              </el-form-item>
            </el-col>                        
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="起止时间" prop="duration">
                <el-date-picker
                    v-model="updateData.duration"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>                        
          </el-row>
        </el-form>
      </div>
         <!-- 底部按钮 slot="footer" -->
      <div  class="dialog-footer">
        <el-row>
          <el-col :span="6" :offset="8">
            <el-button @click="closeUpdate">取 消</el-button>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-button type="primary" @click="handlerAddOk">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--添加对话框-->
    <el-dialog customClass="customWidth"
      :modal="true"
      :visible="addDialogVisible"
      width="60%"
      :title="Title1"
      @close="addDialogVisible = false"
    >
       <!--"添加"对话框中的表单-->
      <div style="margin-right: 20px">
        <el-form :model="addData" :rules="rules" ref="addData" label-width="100px">
          <el-row>
            <el-col :span="10">
                <el-form-item label="学年" prop="term">
                  <el-input v-model="addData.term"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时段" prop="period">
                <el-select v-model="addData.period" placeholder="请选择">
                  <el-option
                    v-for="item in periods"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="说明" prop="info">
                <el-input v-model="addData.info"></el-input>
              </el-form-item>
            </el-col>                        
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="起止时间" prop="duration">
                <el-date-picker
                    v-model="addData.duration"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>                        
          </el-row>
        </el-form>
      </div>
         <!-- 底部按钮 slot="footer" -->
      <div  class="dialog-footer">
        <el-row>
          <el-col :span="6" :offset="8">
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-button type="primary" @click="addScheduleTask">确 定</el-button>
          </el-col>
        </el-row>

      </div>
    </el-dialog>
  </div>

</template>


<script>
import Vue from "vue";
export default {
  data() {
    return {
      total: 0,
      now: 1,
      size: 8,
      tableDatas: [],

      periods: [{code: 1, desc: '春'}, {code: 2, desc: '秋'}],

      addDialogVisible:false,
      Title1:"添加选课任务",
      addData:{},

      multipleSelection:[], //多选时绑定的数据

      //查询数据
      searchData:{
        pageNum : this.now,
        pageSize : this.size,
      },

      updateData:{}, //"修改"对话框中表单数据的初始化
      dialogVisible:false, //"修改"对话框是否可见
      Title:"修改选课任务", //"修改"对话框的标题
      rules:{ //表单验证
        term:[{ required:true,message:'学年不能为空',trigger:'blur'}],
        period:[{required:true,message:'时段不能为空',trigger:'blur'}],
        duration:[{required:true,message:'起止时间不能为空',trigger:'blue'}]
      }
    };
  },
  methods: {
    //删除弹出框
    open(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Delete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //删除操作
    Delete(row) {
      console.log(row);
      this.$axios.post('/sys/task/delete', null, {	
        params: {	// 请求参数拼接在url上
          id: row.id
        }
      }).then(res => {
        if(res.data.code == "0000"){
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message({
            type:"error",
            message:'删除失败!',
            offset:100,
            center:true,
          })
        }
      })      
      this.clearSearchData();
    },
    closeUpdate(){
      this.dialogVisible = false;
      this.showAllScheduleInfo();
    },
    // 第n页信息
    findPage(now_page) { 
      //用来处理当前页的方法,page为当前页
      this.now = now_page;
      this.showAllScheduleInfo(now_page, this.size);
    },
    findSize(now_size) {
      //用来处理每页条数的方法,size为当前页条数
      this.size = now_size;
      this.showAllScheduleInfo(this.now, now_size);
    },
    //清空查询表单
    clearSearchData(){
      this.searchData = {};
      this.now = 1;
      this.showAllScheduleInfo();
    },
    handleQuery() {
      this.showAllScheduleInfo();
    },
    // 展示所有的用户信息
    showAllScheduleInfo(current, size) {
      //异步请求显示所有数据
      this.searchData.pageNum = current ? current : this.now;
      this.searchData.pageSize = size ? size : this.size;
      console.log("searchData",this.searchData)
      this.$axios.get('/sys/task/list', {
        params: this.searchData
      }).then(response =>{
        const _this = this;
        if (response.data.code === "0000"){
            // console.log(response.data.data);
            this.tableDatas = response.data.data;
            this.total = response.data.total;
        }
        // 这里是用户token不正确的回调
        else if (response.data.code === '1002') {
            //删除vuex中存储的用户信息
            _this.$store.dispatch('setUser', null);
            //删除session中存储的信息
            sessionStorage.clear();
            //删除cookie中存储的信息
            const cookies = Vue.$cookies.keys();
            for (let i = 0; i < cookies.length; i++) {
                Vue.$cookies.remove(cookies[i]);
            }
  
            _this.$message({
                message: response.data.msg + '！请重新登录！',
                type: 'warning',
                duration: 2000
            });
            _this.$router.push({name:"SysLogin",params:{isReload: 'true',msg: response.data.msg + '！请重新登录！'}});
          }
      })
    },
    Update(row){ //点击"修改"按钮弹出修改对话框
      let self = this;
      console.log("row",row);
      self.dialogVisible = true;
      self.updateData = row;
      self.updateData.duration = [new Date(row.beginTime), new Date(row.endTime)];
    },
    handlerAddOk(){ //修改对话框上的"确定"按钮
      let self = this;
      this.$refs["updateData"].validate(valid =>{
        if (valid){
          self.updateData.beginTime = self.updateData.duration[0];
          self.updateData.endTime = self.updateData.duration[1];
          self.updateData.createTime = undefined;
          self.updateData.updateTime = undefined;
          this.$axios.post('/sys/task/update', self.updateData).then(res => {
            console.log("response",res)
            if(res.data.code == "0000"){
              self.$message({
                type:"success",
                message:"操作成功",
                offset:100,
                center:true,
              })
            }else{
              self.$message({
                type:"error",
                message:res.data.msg,
                offset:100,
                center:true,
              })
            }
            self.dialogVisible = false;
          });
          this.clearSearchData();
        }
      })
    },
    add(){ //点击"修改"按钮弹出修改对话框
      this.addDialogVisible = true;
      this.addData = {};
      // this.form.nation = '';
      this.photoUrl = '';
      console.log("addData",this.addData);
    },
    addScheduleTask(){ //修改对话框上的"确定"按钮
      console.log("addData",this.addData);
      this.$refs["addData"].validate(valid =>{
        if(valid){
          this.addData.beginTime = this.addData.duration[0];
          this.addData.endTime = this.addData.duration[1];
          let self = this;
          this.$axios.post('/sys/task/add', self.addData).then(res => {
            console.log("response",res)
            if(res.data.code == "0000"){
              self.$message({
                type:"success",
                message:"操作成功",
                offset:100,
                center:true,
              })
            }else{
              self.$message({
                type:"error",
                message:res.data.msg,
                offset:100,
                center:true,
              })
            }
            self.addDialogVisible = false;
            this.now = 1;
            this.showAllScheduleInfo();
          });        
        }   
      })
    },
    StartTask(row) {
      this.$axios.post('/sys/task/start', null, {	
        params: {	// 请求参数拼接在url上
          id: row.id
        }
      }).then(res => {
        if(res.data.code == "0000"){
          console.log(res)
          this.$message({
            type: 'success',
            message: '开始成功!'
          });
          this.showAllScheduleInfo();
        }else{
          console.log(res.data)
          this.$message({
            type:"error",
            message:'开始失败!',
            offset:100,
            center:true,
          })
        }
      })      
    },
    StopTask(row) {
      this.$axios.post('/sys/task/stop', null, {	
        params: {	// 请求参数拼接在url上
          id: row.id
        }
      }).then(res => {
        if(res.data.code == "0000"){
          console.log(res)
          this.$message({
            type: 'success',
            message: '停止成功!'
          });
          this.showAllScheduleInfo();
        }else{
          this.$message({
            type:"error",
            message:'停止失败!',
            offset:100,
            center:true,
          })
        }
      })      
    }
  },
  created() {
    if(!this.$store.state.isLogin) {
      this.$router.push({name: 'SysLogin', params: {isReload: 'true'}});
    }

    this.showAllScheduleInfo();
  },
};
</script>

<style scoped>
</style>